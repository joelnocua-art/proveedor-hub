# -*- coding: utf-8 -*-
"""
calib_from_csv.py  —  BIA Energy · KB Proveedor Hub
Lee el CSV descargado de la card de calibraciones de Metabase (#75406) y
agrega/actualiza la hoja 📅 Calibraciones en el Excel, sin tocar las demás.

Uso:
    python3 scripts/calib_from_csv.py
    python3 scripts/calib_from_csv.py --csv data_calib/calibraciones_meta.csv
    python3 scripts/calib_from_csv.py --csv ruta.csv --file KB_BIA_Proveedores.xlsx

Flujo: descargas el CSV de Metabase → lo pones en data_calib/ → corres esto.
"""
import csv, json, argparse, sys
from pathlib import Path

ROOT = Path(__file__).parent.parent

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--csv", default=str(ROOT / "data_calib" / "calibraciones_meta.csv"))
    ap.add_argument("--file", default=str(ROOT / "KB_BIA_Proveedores.xlsx"))
    args = ap.parse_args()

    csv_path = Path(args.csv)
    if not csv_path.exists():
        print(f"❌ No existe el CSV: {csv_path}")
        print("   Descarga la card #75406 de Metabase como CSV y guárdalo ahí.")
        sys.exit(1)

    with open(csv_path, encoding="utf-8-sig") as f:
        rows = list(csv.DictReader(f))
    print(f"📄 CSV leído: {len(rows)} filas · columnas: {', '.join(rows[0].keys()) if rows else '—'}")

    # Guardar en el cache que lee add_sheet.build_calibracion
    cache_path = ROOT / "scripts" / "kb_data_cache.json"
    cache = {}
    if cache_path.exists():
        try: cache = json.loads(cache_path.read_text())
        except: cache = {}
    cache["calib_data"] = rows
    cache_path.write_text(json.dumps(cache, ensure_ascii=False, default=str, indent=2))
    print(f"💾 Cache actualizado: {cache_path}")

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
