# -*- coding: utf-8 -*-
"""
metabase_sync.py  —  BIA Energy · KB Proveedor Hub
Descarga sku_catalog, sku_offers, inventory y lead_times desde Metabase
y regenera KB_BIA_Proveedores.xlsx automáticamente.

Uso:
    python3 scripts/metabase_sync.py

Configuración (variables de entorno o archivo .env):
    METABASE_URL          https://metabase.bia.app   (sin barra final)
    METABASE_API_KEY      mb_xxxxxxxxxxxxxxxxxxxx     (API Key de Metabase ≥ 0.51)
    METABASE_SKU_TABLE    sku_catalog                 (nombre o ID de tabla)
    METABASE_OFFERS_TABLE sku_offers
    METABASE_INV_TABLE    inventory_items             (tabla WMS/inventario)
    METABASE_PROV_TABLE   providers
    METABASE_DB_ID        1                           (ID de la base en Metabase)
    OUTPUT_XLSX           KB_BIA_Proveedores.xlsx     (relativo al proyecto)
"""

import os, sys, json, requests
from pathlib import Path
from collections import defaultdict

# ──────────────────────────────────────────────────────────────────
# 0.  CONFIGURACIÓN
# ──────────────────────────────────────────────────────────────────
ROOT = Path(__file__).parent.parent

def _env(key, default=None):
    # Buscar primero en .env del proyecto
    env_file = ROOT / ".env"
    if env_file.exists():
        for line in env_file.read_text().splitlines():
            if line.startswith(key + "="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    return os.environ.get(key, default)

METABASE_URL    = (_env("METABASE_URL") or "https://bia.metabaseapp.com").rstrip("/")
API_KEY         = _env("METABASE_API_KEY") or ""
DB_ID           = int(_env("METABASE_DB_ID") or 1)
SKU_TABLE       = _env("METABASE_SKU_TABLE")    or "sku_catalog"
OFFERS_TABLE    = _env("METABASE_OFFERS_TABLE") or "sku_offers"
INV_TABLE       = _env("METABASE_INV_TABLE")    or "inventory_items"
PROV_TABLE      = _env("METABASE_PROV_TABLE")   or "providers"
OUTPUT_XLSX     = ROOT / (_env("OUTPUT_XLSX") or "KB_BIA_Proveedores.xlsx")
KB_DATA_JSON    = ROOT / "scripts" / "kb_data_cache.json"

if not API_KEY:
    print("❌ Faltan METABASE_URL o METABASE_API_KEY en .env o variables de entorno")
    print("   Crea el archivo .env con las credenciales (ver .env.example)")
    sys.exit(1)

HEADERS = {
    "X-Api-Key": API_KEY,
    "Content-Type": "application/json",
}

# ──────────────────────────────────────────────────────────────────
# 1.  HELPERS METABASE API
# ──────────────────────────────────────────────────────────────────

def _get_table_id(table_name_or_id):
    """Devuelve el ID numérico de una tabla dado su nombre o id."""
    if str(table_name_or_id).isdigit():
        return int(table_name_or_id)
    r = requests.get(f"{METABASE_URL}/api/database/{DB_ID}/metadata", headers=HEADERS, timeout=30)
    r.raise_for_status()
    tables = r.json().get("tables", [])
    name_lower = table_name_or_id.lower()
    for t in tables:
        if t["name"].lower() == name_lower or t.get("display_name","").lower() == name_lower:
            return t["id"]
    available = [t["name"] for t in tables]
    raise ValueError(f"Tabla '{table_name_or_id}' no encontrada en DB {DB_ID}. Disponibles: {available}")


def query_table(table_name_or_id, limit=50000):
    """
    Trae TODAS las filas de una tabla de Metabase via /api/dataset.
    Retorna lista de dicts {col: valor}.
    """
    tid = _get_table_id(table_name_or_id)
    payload = {
        "database": DB_ID,
        "type": "query",
        "query": {
            "source-table": tid,
            "limit": limit,
        }
    }
    print(f"  ⬇  Descargando tabla '{table_name_or_id}' (id={tid}) …")
    r = requests.post(f"{METABASE_URL}/api/dataset", headers=HEADERS, json=payload, timeout=120)
    r.raise_for_status()
    data = r.json()
    if "error" in data:
        raise RuntimeError(f"Error Metabase al consultar '{table_name_or_id}': {data['error']}")
    cols   = [c["name"] for c in data["data"]["cols"]]
    result = [dict(zip(cols, row)) for row in data["data"]["rows"]]
    print(f"     → {len(result)} filas")
    return result


def query_card(card_id):
    """
    Ejecuta una pregunta/card guardada en Metabase y devuelve lista de dicts.
    Útil si ya tienes una consulta SQL guardada en Metabase.
    """
    print(f"  ⬇  Ejecutando card #{card_id} …")
    r = requests.post(f"{METABASE_URL}/api/card/{card_id}/query", headers=HEADERS, timeout=120)
    r.raise_for_status()
    data = r.json()
    if "error" in data:
        raise RuntimeError(f"Error Metabase al ejecutar card {card_id}: {data['error']}")
    cols   = [c["name"] for c in data["data"]["cols"]]
    result = [dict(zip(cols, row)) for row in data["data"]["rows"]]
    print(f"     → {len(result)} filas")
    return result

# ──────────────────────────────────────────────────────────────────
# 2.  DESCARGAR DATOS
# ──────────────────────────────────────────────────────────────────

def download_data():
    print("\n📡 Conectando a Metabase:", METABASE_URL)

    # Verificar conexión
    try:
        r = requests.get(f"{METABASE_URL}/api/health", timeout=10)
        r.raise_for_status()
        print("  ✅ Metabase OK:", r.json().get("status","?"))
    except Exception as e:
        print(f"  ❌ No se pudo conectar: {e}")
        sys.exit(1)

    sku_catalog  = query_table(SKU_TABLE)
    sku_offers   = query_table(OFFERS_TABLE)
    inventory    = query_table(INV_TABLE)
    providers    = query_table(PROV_TABLE)
    return sku_catalog, sku_offers, inventory, providers

# ──────────────────────────────────────────────────────────────────
# 3.  TRANSFORMAR → kb_data
# ──────────────────────────────────────────────────────────────────

TIPO_SIMPLE = {
    'Medidor':'Medidor','Celda De Medidor':'Celda Medidor',
    'Transformador De Corriente':'TC','Transformador De Corriente BM':'TC',
    'Transformador De Potencial':'TPS','Banco Condensador':'Banco Condensador',
    'Condensador':'Condensador',
}
PAIS_MAP = {
    'HEXING':'China','INHEMETER':'China','JA SOLAR':'China','GROWATT':'China',
    'LANDISGYR':'Suiza','LANDIS':'Suiza','PRYSMIAN':'Italia','PROELCO':'Colombia',
    'ADLER':'Colombia','INPEL':'Colombia','DISPROEL':'Colombia','METROBIT':'Colombia',
    'EMSI':'Colombia','DISICO':'Colombia','SELDA':'Colombia','LAUMAYER':'Colombia',
    '4S':'Colombia','ACJ':'Colombia',
}
PROV_CERT = {
    "SELDA":     {"creg":"Sí","retie":"Sí","homol":"Sí",
                  "nota":"Certificado CIDET (ONAC 09-CPR-004), cumple RETIE. Homologado por operadores."},
    "PROELCO":   {"creg":"Por confirmar","retie":"Por confirmar","homol":"Por confirmar",
                  "nota":"Distribuidor con catálogo público. Solicitar certificado CREG/CIDET."},
    "EMSI TECH": {"creg":"Por confirmar","retie":"Por confirmar","homol":"Por confirmar",
                  "nota":"Importador EMSI Ltd (China), marca MICROSTAR. Solicitar certificación."},
    "4S":        {"creg":"Por confirmar","retie":"Por confirmar","homol":"Por confirmar",
                  "nota":"Sin info pública. Confirmar si distribuye medidores certificados."},
    "ACJ":       {"creg":"Por confirmar","retie":"Por confirmar","homol":"Por confirmar",
                  "nota":"Sin info pública. Verificar línea de medición y certificados."},
    "ADLER":     {"creg":"Por confirmar","retie":"Por confirmar","homol":"Por confirmar",
                  "nota":"Materiales/automatización. Solicitar certificados si aplica a medición."},
    "DISICO":    {"creg":"Por confirmar","retie":"Por confirmar","homol":"Por confirmar",
                  "nota":"Fabricante TCs. Solicitar certificado de conformidad."},
    "LAUMAYER":  {"creg":"Por confirmar","retie":"Por confirmar","homol":"Por confirmar",
                  "nota":"Condensadores/tableros. Solicitar certificados si aplica."},
}

def pais_for(prov):
    p = (prov or "").upper().strip()
    for k, v in PAIS_MAP.items():
        if k in p: return v
    return "Por confirmar"

def cert_for(prov):
    p = (prov or "").upper().strip()
    for k, c in PROV_CERT.items():
        if k in p: return c
    return None

def lookup_lead(prov, lead_times):
    if not prov: return ""
    p = prov.upper().strip()
    def norm(s):
        return s.replace(" SAS","").replace(" S.A.S.","").replace(" S.A.S","").replace(" S.A.","").replace(" INGENIERIA","").replace(" - ","").replace("-","").strip()
    pn = norm(p)
    for k, days in lead_times.items():
        if norm(k) == pn or norm(k) in pn or pn in norm(k): return days
    return ""

def build_kb_data(sku_catalog, sku_offers, inventory, providers):
    print("\n🔧 Procesando datos …")

    # lead times desde providers
    lead_times = {}
    for pr in providers:
        pname = (pr.get("name") or pr.get("provider") or "").upper().strip()
        lt = pr.get("lead_time") or pr.get("lead_time_dias") or pr.get("it")
        if pname and lt:
            try: lead_times[pname] = int(lt)
            except: pass

    # sku index
    sku_type = {}
    sku_name_map = {}
    for s in sku_catalog:
        sid = str(s.get("id") or s.get("sku_id") or "")
        sku_type[sid] = s.get("category") or "Otros"
        sku_name_map[sid] = s.get("sku") or s.get("name") or s.get("referencia") or sid

    # inventario por sku_id
    inv_by_sku = defaultdict(lambda: {"asignado":0,"disponible":0,"vencido":0,"pend_cert":0,"no_encontrado":0,"total":0})
    for it in inventory:
        sid = str(it.get("sku_id") or it.get("sku") or "").strip()
        if not sid: continue
        est = (it.get("estado") or it.get("status") or "").strip().upper()
        d = inv_by_sku[sid]; d["total"] += 1
        if est in ("INSTALADO","ASIGNADO"): d["asignado"] += 1
        elif est == "DISPONIBLE": d["disponible"] += 1
        elif est in ("AVERIADO","VENDIDO"): d["vencido"] += 1
        elif est == "PENDIENTE CERTIFICADOS": d["pend_cert"] += 1
        elif est == "NO ENCONTRADO": d["no_encontrado"] += 1

    # ofertas por sku_id
    offers_by_sku = defaultdict(list)
    for o in sku_offers:
        p = (o.get("provider") or "").upper()
        if "TEST" in p or "PRUEB" in p or "JEJET" in p: continue
        sid = str(o.get("sku_id") or "")
        offers_by_sku[sid].append({
            "provider": o.get("provider") or "",
            "price": o.get("price") or o.get("precio") or 0,
        })

    # construir filas maestras
    rows = []
    for s in sku_catalog:
        sid  = str(s.get("id") or s.get("sku_id") or "")
        cat  = s.get("category") or "Otros"
        tipo = TIPO_SIMPLE.get(cat, cat)
        ref  = sku_name_map.get(sid, sid)
        offs = offers_by_sku.get(sid, [])
        iv   = inv_by_sku.get(sid, {"asignado":0,"disponible":0,"vencido":0,"pend_cert":0})
        cdp  = round(iv["asignado"] / 180, 3) if iv["asignado"] > 0 else 0
        dias = round(iv["disponible"] / cdp, 0) if cdp > 0 else ""

        base = {
            "Tipo": tipo, "Referencia": ref,
            "Inv_Asignado": iv["asignado"], "Inv_Disponible": iv["disponible"],
            "Inv_Vencido": iv["vencido"], "Pend_Certificado": iv.get("pend_cert", 0),
            "Consumo_Diario": cdp, "Dias_Inventario": dias,
            "CREG_038": "", "RETIE_2024": "", "Homologado": "", "Detalle_Homologacion": "",
        }
        if offs:
            for o in offs:
                prov = o["provider"]
                c = cert_for(prov)
                row = dict(base)
                row["Proveedor"]  = prov
                row["Precio_COP"] = o["price"] or ""
                row["Pais"]       = pais_for(prov)
                row["LeadTime_Dias"] = lookup_lead(prov, lead_times)
                if c:
                    row["CREG_038"] = c["creg"]; row["RETIE_2024"] = c["retie"]
                    row["Homologado"] = c["homol"]; row["Detalle_Homologacion"] = c["nota"]
                rows.append(row)
        else:
            row = dict(base)
            row["Proveedor"] = ""; row["Precio_COP"] = ""
            row["Pais"] = ""; row["LeadTime_Dias"] = ""
            rows.append(row)

    print(f"  → {len(rows)} filas maestras")
    return {
        "rows": rows,
        "inv_by_sku": dict(inv_by_sku),
        "sku_type": sku_type,
        "sku_name": sku_name_map,
        "lead_times": lead_times,
        "offers_by_sku": dict(offers_by_sku),
    }

# ──────────────────────────────────────────────────────────────────
# 4.  GENERAR EXCEL (reutiliza build_full.py con datos en memoria)
# ──────────────────────────────────────────────────────────────────

def build_excel(D, out_path):
    """Genera el Excel completo desde el dict D (mismo formato que kb_data.json)."""
    # Guardar temporalmente en /tmp para reutilizar build_full.py
    import tempfile
    tmp = Path(tempfile.mktemp(suffix=".json"))
    tmp.write_text(json.dumps(D, ensure_ascii=False, default=str))

    # Ejecutar build_full.py apuntando al json temporal y al xlsx de salida
    import subprocess
    build_script = Path(__file__).parent.parent / "scripts" / "build_excel.py"
    if not build_script.exists():
        build_script = Path("/tmp/build_full.py")  # fallback

    result = subprocess.run(
        [sys.executable, str(build_script), "--data", str(tmp), "--out", str(out_path)],
        capture_output=True, text=True
    )
    tmp.unlink(missing_ok=True)

    if result.returncode != 0:
        print("  ⚠ build_excel stderr:", result.stderr[-1000:])
    print(result.stdout.strip())
    return result.returncode == 0

# ──────────────────────────────────────────────────────────────────
# 5.  MAIN
# ──────────────────────────────────────────────────────────────────

def main():
    print("=" * 60)
    print("  BIA Energy — KB Proveedor Hub · Sync desde Metabase")
    print("=" * 60)

    sku_catalog, sku_offers, inventory, providers = download_data()
    D = build_kb_data(sku_catalog, sku_offers, inventory, providers)

    # Guardar cache JSON (útil para regenerar Excel sin volver a descargar)
    KB_DATA_JSON.parent.mkdir(parents=True, exist_ok=True)
    KB_DATA_JSON.write_text(json.dumps(D, ensure_ascii=False, default=str, indent=2))
    print(f"\n💾 Cache guardado: {KB_DATA_JSON}")

    # Generar Excel
    print(f"\n📊 Generando Excel → {OUTPUT_XLSX} …")
    ok = build_excel(D, OUTPUT_XLSX)
    if ok:
        print(f"\n✅ Listo: {OUTPUT_XLSX}")
    else:
        print("\n⚠ Excel generado con advertencias (revisar output arriba)")

if __name__ == "__main__":
    main()
