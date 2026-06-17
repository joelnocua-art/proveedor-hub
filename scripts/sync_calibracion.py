# -*- coding: utf-8 -*-
"""
sync_calibracion.py  —  BIA Energy · KB Proveedor Hub
Jala SOLO la card de calibraciones desde Metabase (#75406) y agrega/actualiza
la hoja 📅 Calibraciones en el Excel existente. No toca las demás hojas.

Uso:
    python3 scripts/sync_calibracion.py
    python3 scripts/sync_calibracion.py --card 75406 --file KB_BIA_Proveedores.xlsx

Requiere en .env (o variables de entorno):
    METABASE_URL          https://bia.metabaseapp.com   (opcional, ya por defecto)
    METABASE_API_KEY      mb_xxxxxxxxxxxxxxxxxxxx        (OBLIGATORIO)
    METABASE_CALIB_CARD   75406                          (opcional, ya por defecto)
"""
import os, sys, json, argparse
from pathlib import Path

ROOT = Path(__file__).parent.parent

def _env(key, default=None):
    env_file = ROOT / ".env"
    if env_file.exists():
        for line in env_file.read_text().splitlines():
            if line.strip().startswith(key + "="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    return os.environ.get(key, default)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--card", default=None, help="ID de la card de Metabase (default: METABASE_CALIB_CARD o 75406)")
    ap.add_argument("--file", default=str(ROOT / "KB_BIA_Proveedores.xlsx"))
    args = ap.parse_args()

    import requests

    url     = (_env("METABASE_URL") or "https://bia.metabaseapp.com").rstrip("/")
    api_key = _env("METABASE_API_KEY") or ""
    card_id = args.card or _env("METABASE_CALIB_CARD") or "75406"

    if not api_key:
        print("❌ Falta METABASE_API_KEY en .env")
        print("   1) Crea el archivo .env en la raíz del proyecto (copia de .env.example)")
        print("   2) Pega tu clave: METABASE_API_KEY=mb_xxxxxxxx")
        sys.exit(1)

    headers = {"X-Api-Key": api_key, "Content-Type": "application/json"}

    print(f"📡 Conectando a {url} …")
    print(f"⬇  Ejecutando card #{card_id} …")
    try:
        r = requests.post(f"{url}/api/card/{card_id}/query", headers=headers, timeout=120)
        r.raise_for_status()
        data = r.json()
    except Exception as e:
        print(f"❌ No se pudo ejecutar la card: {e}")
        sys.exit(1)

    if "error" in data:
        print(f"❌ Error de Metabase: {data['error']}")
        sys.exit(1)

    cols = [c["name"] for c in data["data"]["cols"]]
    rows = [dict(zip(cols, row)) for row in data["data"]["rows"]]
    print(f"   → {len(rows)} equipos descargados")
    print(f"   → columnas: {', '.join(cols)}")

    # Guardar/actualizar el cache que lee add_sheet.py
    cache_path = ROOT / "scripts" / "kb_data_cache.json"
    cache = {}
    if cache_path.exists():
        try: cache = json.loads(cache_path.read_text())
        except: cache = {}
    cache["calib_data"] = rows
    cache_path.write_text(json.dumps(cache, ensure_ascii=False, default=str, indent=2))
    print(f"💾 Cache actualizado: {cache_path}")

    # Generar/actualizar SOLO la hoja de calibraciones en el Excel existente
    path = Path(args.file)
    if not path.exists():
        print(f"❌ No existe {path}. Genera primero el Excel completo.")
        sys.exit(1)

    sys.path.insert(0, str(ROOT / "scripts"))
    import add_sheet
    from openpyxl import load_workbook

    wb = load_workbook(path)
    add_sheet.build_calibracion(wb)
    add_sheet.reorder_and_color(wb)
    wb.save(path)
    print(f"✅ Hoja 📅 Calibraciones actualizada en: {path}")

if __name__ == "__main__":
    main()
