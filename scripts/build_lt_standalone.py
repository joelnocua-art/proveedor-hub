#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_lt_standalone.py — Genera SOLO la hoja "🚚 Lead Times"
en un archivo .xlsx propio, reutilizando build_lead_times() de add_sheet.py.

Fórmulas vivas:
  · Resumen: AVERAGEIF / MINIFS / MAXIFS referenciando el detalle
  · Detalle: =IF(E{r}<=5,"🟢 Muy rápido",IF(E{r}<=15,"🟡 Medio","🔴 Lento"))

Uso:
  python3 scripts/build_lt_standalone.py
  python3 scripts/build_lt_standalone.py --out MiLeadTimes.xlsx
"""
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(Path(__file__).parent))

import add_sheet
from openpyxl import Workbook

def main():
    import argparse
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=str(ROOT / "LeadTimes.xlsx"))
    args = ap.parse_args()

    wb = Workbook()
    wb.remove(wb.active)

    add_sheet.build_lead_times(wb)

    ws = wb["🚚 Lead Times"]
    ws.sheet_properties.tabColor = add_sheet.TAB_COLORS.get("🚚 Lead Times", "5B6BFF")

    wb.save(args.out)
    print(f"\n✅ Generado: {args.out}")
    print("   Las fórmulas están vivas:")
    print("   · Resumen: AVERAGEIF/MINIFS/MAXIFS → detalle")
    print("   · Detalle col. H: =IF(E<=5,\"🟢 Muy rápido\",IF(E<=15,\"🟡 Medio\",\"🔴 Lento\"))")

if __name__ == "__main__":
    main()
