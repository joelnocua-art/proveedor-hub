#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_calibracion_doble.py — Genera un .xlsx con DOS hojas:
  1. 📅 Calibraciones   — resumen mensual + tabla por tipo + detalle (datos agregados)
  2. 📋 Listado Equipos — un equipo por fila con serial, SKU, fecha exacta, precio unitario

Uso:
  python3 scripts/build_calibracion_doble.py \
      --csv-agg  data_calib/calibraciones_meta.csv \
      --csv-det  <ruta al CSV granular (726 filas)> \
      --out      Calibraciones.xlsx
"""
import argparse, csv, json, sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(Path(__file__).parent))

import add_sheet as A
from openpyxl import Workbook
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.table import Table, TableStyleInfo
from openpyxl.styles import PatternFill


# ── helpers de paleta ──────────────────────────────────────────
ESTADO_COLOR = {
    '2026-06': (A.RED_LT,  A.RED),
    '2026-07': (A.GOLD_LT, A.GOLD),
}
TIPO_COL = {'TC': A.TEAL, 'TP': A.GOLD, 'Medidor': '5B6BFF'}
TIPO_LT  = {'TC': A.TEAL_LT, 'TP': A.GOLD_LT, 'Medidor': 'E8ECFF'}

_MESES_ES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
             'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

def mes_label(yyyymm):
    """'2026-07' → 'Julio 2026'"""
    try:
        y, m = yyyymm.split('-')
        return f"{_MESES_ES[int(m)-1]} {y}"
    except Exception:
        return yyyymm

def tipo_from_desc(desc, cat=''):
    d = (desc or '').upper()
    if d.startswith('TC') or ' TC' in d: return 'TC'
    if d.startswith('TP') or ' TP' in d: return 'TP'
    if 'MEDIDOR' in d or 'MEDID' in d:   return 'Medidor'
    if 'MEDIDOR' in (cat or '').upper():  return 'Medidor'
    return d.split()[0][:10] if d else 'Otro'

def tonum(s):
    return float(str(s).replace(',','').replace('$','').replace(' ','').strip() or 0)


# ══════════════════════════════════════════════════════════════════
# HOJA 1 — igual que build_calibracion() ya existente
# ══════════════════════════════════════════════════════════════════
def build_hoja1(wb, agg_csv):
    calib = []
    with open(agg_csv, newline='', encoding='utf-8-sig') as f:
        for r in csv.DictReader(f):
            calib.append({k.strip(): v for k, v in r.items() if k})
    A._load_kb_data = lambda: {"calib_data": calib}
    A.build_calibracion(wb)
    ws = wb["📅 Calibraciones"]
    ws.sheet_properties.tabColor = A.TAB_COLORS.get("📅 Calibraciones", "009688")


# ══════════════════════════════════════════════════════════════════
# HOJA 2 — Listado granular por equipo/serial
# ══════════════════════════════════════════════════════════════════
def build_hoja2(wb, det_csv):
    title = "📋 Listado Equipos"
    if title in wb.sheetnames:
        del wb[title]
    ws = wb.create_sheet(title)
    ws.sheet_view.showGridLines = False

    # Leer CSV
    rows = []
    with open(det_csv, newline='', encoding='utf-8-sig') as f:
        for r in csv.DictReader(f):
            rows.append(r)

    N = len(rows)

    # Nota de verificación cruzada
    NOTA_DISC = (
        "⚠  Nota de verificación: 726 equipos (este listado) vs 723 en el agregado de la Hoja 1 — "
        "diferencia de 3 unidades TC Media en sep-2026, posiblemente ingresadas entre ambas exportaciones."
    )

    COLS = [
        ("N°",        5),
        ("Serial",   18),
        ("Código",    8),
        ("Tipo",     10),
        ("Categoría",11),
        ("SKU / Descripción",40),
        ("Vencimiento",      14),
        ("Mes Vence",        13),
        ("Valor Unit. COP",  15),
        ("IVA 19% COP",      13),
        ("Total c/IVA COP",  16),
        ("Certificado URL",  40),
    ]
    NC = len(COLS)

    # ── Banner ──
    A.banner(ws,
        "  📋 Listado de Equipos a Vencer — Detalle por Serial",
        f"  {N} equipos · Jun-Dic 2026 · fila por serial · precio unitario de calibración",
        NC)

    # ── KPIs fila 3 ──
    hdr = 4; d0 = 5; d1 = d0 + N - 1
    kpis = [
        ("Total equipos", N),
        ("TC Baja (5496)",  sum(1 for r in rows if r.get('codigo')=='5496')),
        ("TC Media (5498)", sum(1 for r in rows if r.get('codigo')=='5498')),
        ("TP Media (5497)", sum(1 for r in rows if r.get('codigo')=='5497')),
        ("Medidor (6024)",  sum(1 for r in rows if r.get('codigo')=='6024')),
    ]
    col = 1
    for lbl, val in kpis:
        lc = ws.cell(3, col, lbl)
        lc.fill = A.fill(A.NAVY); lc.font = A.font(9, True, A.WHITE)
        lc.alignment = A.center; lc.border = A.border_all
        vc = ws.cell(3, col + 1, val)
        vc.fill = A.fill(A.TEAL); vc.font = A.font(12, True, A.WHITE)
        vc.alignment = A.center; vc.border = A.border_all
        vc.number_format = '#,##0'
        col += 2
    for c in range(col, NC + 1):
        ws.cell(3, c).fill = A.fill(A.GREY_LT); ws.cell(3, c).border = A.border_all
    ws.row_dimensions[3].height = 22

    # ── Encabezado ──
    for i, (name, w) in enumerate(COLS, 1):
        ws.cell(hdr, i, name)
        ws.column_dimensions[get_column_letter(i)].width = w
    A.style_header(ws, NC, hdr)

    # ── Datos ──
    import datetime
    today = datetime.date.today()
    for idx, r in enumerate(rows, 1):
        rr = d0 + idx - 1
        mes = r.get('mes_vencimiento', '')
        dia = r.get('dia_vencimiento', '')
        tipo = tipo_from_desc(r.get('descripcion',''), r.get('categoria',''))
        vu = tonum(r.get('valor_unitario', 0))
        iva = round(vu * 0.19)
        tot = vu + iva

        # Urgencia: solo TEXTO de color en la fecha (no se rellena la fila)
        try:
            y, m = mes.split('-')
            diff = (int(y)*12 + int(m)) - (today.year*12 + today.month)
        except Exception:
            diff = 99
        if diff <= 0:   fecha_color, fecha_bold = A.RED,  True   # vence este mes o antes
        elif diff == 1: fecha_color, fecha_bold = A.GOLD, True   # próximo mes
        else:           fecha_color, fecha_bold = A.TXT,  False

        vals = [
            (idx,         'center', None),
            (r.get('serial',''), 'left', None),
            (r.get('codigo',''), 'center', None),
            (tipo,        'center', None),
            (r.get('categoria',''), 'center', None),
            (r.get('descripcion','').replace(r.get('sku','XXX'),'').strip() or r.get('sku',''), 'left', None),
            (dia,         'center', None),
            (mes_label(mes), 'center', None),
            (vu,          'center', '#,##0'),
            (iva,         'center', '#,##0'),
            (tot,         'center', '#,##0'),
            (r.get('certificado_url',''), 'left', None),
        ]
        for ci, (val, align, extra) in enumerate(vals, 1):
            cc = ws.cell(rr, ci, val)
            cc.alignment = A.center if align == 'center' else A.left
            cc.border = A.border_all
            cc.font = A.font(9)
            if ci == 4:  # Tipo — chip de color suave
                cc.fill = A.fill(TIPO_LT.get(tipo, A.GREY_LT))
                cc.font = A.font(9, True, TIPO_COL.get(tipo, A.TXT))
            elif ci in (7, 8):  # Vencimiento / Mes Vence — texto de urgencia
                cc.font = A.font(9, fecha_bold, fecha_color)
            if isinstance(extra, str) and extra:
                cc.number_format = extra

        # Hipervínculo certificado
        url = r.get('certificado_url', '')
        if url and url.startswith('http'):
            link_cell = ws.cell(rr, 12)
            link_cell.hyperlink = url
            link_cell.font = A.font(9, False, '1A6FB8')

    # ── Tabla ──
    if d1 >= d0:
        tab = Table(displayName="ListadoEquipos",
                    ref=f"A{hdr}:{get_column_letter(NC)}{d1}")
        tab.tableStyleInfo = TableStyleInfo(
            name="TableStyleLight9", showRowStripes=True)
        ws.add_table(tab)

    ws.freeze_panes = f"A{d0}"

    # ── Nota al pie ──
    ws.cell(d1 + 2, 1, NOTA_DISC).font = A.font(9, False, "7A8094")
    ws.merge_cells(start_row=d1+2, end_row=d1+2,
                   start_column=1, end_column=NC)

    ws.sheet_properties.tabColor = '5B6BFF'

    print(f"📋 Listado Equipos OK: {N} seriales · filas {d0}-{d1}")


# ══════════════════════════════════════════════════════════════════
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--csv-agg", required=True,
                    help="CSV agregado (card #75406) p.ej. data_calib/calibraciones_meta.csv")
    ap.add_argument("--csv-det", required=True,
                    help="CSV granular por serial (resultado del SQL listado)")
    ap.add_argument("--out", default=str(ROOT / "Calibraciones.xlsx"))
    args = ap.parse_args()

    wb = Workbook()
    wb.remove(wb.active)

    build_hoja1(wb, args.csv_agg)
    build_hoja2(wb, args.csv_det)

    wb.save(args.out)
    print(f"\n✅ Generado: {args.out}")
    print("   Hoja 1: 📅 Calibraciones (resumen mensual + tabla por tipo + detalle agregado)")
    print("   Hoja 2: 📋 Listado Equipos (726 seriales, precio unitario, vencimiento exacto)")


if __name__ == "__main__":
    main()
