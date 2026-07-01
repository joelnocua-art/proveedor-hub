#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_calibracion_standalone.py — Genera SOLO la hoja "📅 Calibraciones"
en un archivo .xlsx propio, reutilizando build_calibracion() de add_sheet.py
(con sus FÓRMULAS VIVAS: SUMIFS en el resumen, =F*G / =ROUND(H*0.19,0) / =H+I
en el detalle).

Uso:
  # Con tu CSV real descargado de Metabase (card #75406):
  python3 scripts/build_calibracion_standalone.py --csv data_calib/calibraciones_meta.csv

  # Sin CSV → usa datos de MUESTRA para verificar que las fórmulas están vivas:
  python3 scripts/build_calibracion_standalone.py --demo

  # Salida personalizada:
  python3 scripts/build_calibracion_standalone.py --csv ... --out Calibraciones.xlsx

El CSV debe traer (nombres flexibles, se auto-detectan):
  mes, categoria, codigo, descripcion, valor_unitario, cantidad_equipos,
  subtotal, iva, costo_total_con_iva
"""
import argparse, csv, json, sys, tempfile, os
from pathlib import Path

ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(Path(__file__).parent))

# ── Datos de MUESTRA (solo para --demo: estructura real, valores ilustrativos) ──
# 7 meses (Jun–Dic 2026) · TC / TP / Medidor. Reemplázalos con tu CSV real.
DEMO_ROWS = [
    # mes,        categoria, codigo,  descripcion,                 valor_unitario, cantidad_equipos
    ("2026-06", "TC",      "TC-001", "TC Transformador Corriente",  185000, 42),
    ("2026-06", "TP",      "TP-001", "TP Transformador Potencial",  210000, 18),
    ("2026-06", "Medidor", "MED-01", "Medidor trifásico",           320000, 55),
    ("2026-07", "TC",      "TC-001", "TC Transformador Corriente",  185000, 60),
    ("2026-07", "TP",      "TP-001", "TP Transformador Potencial",  210000, 25),
    ("2026-07", "Medidor", "MED-01", "Medidor trifásico",           320000, 70),
    ("2026-08", "TC",      "TC-001", "TC Transformador Corriente",  185000, 38),
    ("2026-08", "TP",      "TP-001", "TP Transformador Potencial",  210000, 14),
    ("2026-08", "Medidor", "MED-01", "Medidor trifásico",           320000, 49),
    ("2026-09", "TC",      "TC-001", "TC Transformador Corriente",  185000, 51),
    ("2026-09", "TP",      "TP-001", "TP Transformador Potencial",  210000, 22),
    ("2026-09", "Medidor", "MED-01", "Medidor trifásico",           320000, 63),
    ("2026-10", "TC",      "TC-001", "TC Transformador Corriente",  185000, 33),
    ("2026-10", "TP",      "TP-001", "TP Transformador Potencial",  210000, 11),
    ("2026-10", "Medidor", "MED-01", "Medidor trifásico",           320000, 40),
    ("2026-11", "TC",      "TC-001", "TC Transformador Corriente",  185000, 28),
    ("2026-11", "TP",      "TP-001", "TP Transformador Potencial",  210000,  9),
    ("2026-11", "Medidor", "MED-01", "Medidor trifásico",           320000, 36),
    ("2026-12", "TC",      "TC-001", "TC Transformador Corriente",  185000, 19),
    ("2026-12", "TP",      "TP-001", "TP Transformador Potencial",  210000,  7),
    ("2026-12", "Medidor", "MED-01", "Medidor trifásico",           320000, 24),
]

def demo_calib_data():
    out = []
    for mes, cat, cod, desc, vu, cant in DEMO_ROWS:
        out.append({
            "mes": mes, "categoria": cat, "codigo": cod, "descripcion": desc,
            "valor_unitario": vu, "cantidad_equipos": cant,
        })
    return out

def csv_calib_data(csv_path):
    rows = []
    with open(csv_path, newline="", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for r in reader:
            # se pasa tal cual; build_calibracion usa _get() con matching flexible
            rows.append({k.strip(): v for k, v in r.items() if k})
    if not rows:
        sys.exit(f"⚠  El CSV {csv_path} no tiene filas.")
    print(f"📥 CSV leído: {len(rows)} filas · columnas: {', '.join(rows[0].keys())}")
    return rows

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--csv", help="Ruta al CSV de Metabase (card #75406)")
    ap.add_argument("--demo", action="store_true", help="Usar datos de muestra")
    ap.add_argument("--out", default=str(ROOT / "Calibraciones.xlsx"),
                    help="Archivo .xlsx de salida")
    args = ap.parse_args()

    if args.csv:
        calib = csv_calib_data(args.csv)
        origen = f"CSV: {args.csv}"
    elif args.demo:
        calib = demo_calib_data()
        origen = "DATOS DE MUESTRA (reemplazar con --csv)"
    else:
        ap.error("Indica --csv <archivo> o --demo")

    # build_calibracion lee de /tmp/kb_data.json vía _load_kb_data()
    tmp = Path(tempfile.gettempdir()) / "kb_data.json"
    json.dump({"calib_data": calib}, open(tmp, "w"), ensure_ascii=False)

    # Importar DESPUÉS de escribir el cache (por si add_sheet cachea al import)
    import add_sheet
    # Forzar que _load_kb_data lea nuestro tmp (limpiar cache real si existe)
    real_cache = ROOT / "scripts" / "kb_data_cache.json"
    if real_cache.exists():
        # Inyectar calib_data en el cache real sin perder lo demás
        try:
            existing = json.load(open(real_cache))
        except Exception:
            existing = {}
        existing["calib_data"] = calib
        json.dump(existing, open(tmp, "w"), ensure_ascii=False)

    from openpyxl import Workbook
    wb = Workbook()
    wb.remove(wb.active)  # quitar hoja vacía por defecto

    # Apuntar _load_kb_data a nuestro tmp de forma determinística
    add_sheet._load_kb_data = lambda: {"calib_data": calib}

    add_sheet.build_calibracion(wb)

    # Color de pestaña como en el libro maestro
    ws = wb["📅 Calibraciones"]
    ws.sheet_properties.tabColor = add_sheet.TAB_COLORS.get("📅 Calibraciones", "009688")

    wb.save(args.out)
    print(f"\n✅ Generado: {args.out}")
    print(f"   Fuente: {origen}")
    print("   Las celdas contienen FÓRMULAS vivas (SUMIFS / =F*G / =ROUND(*0.19,0) / =H+I).")
    print("   Ábrelo y haz clic en cualquier celda del resumen o detalle para verlas.")

if __name__ == "__main__":
    main()
