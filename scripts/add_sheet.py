# -*- coding: utf-8 -*-
"""
add_sheet.py  —  BIA Energy · KB Proveedor Hub
Agrega o REEMPLAZA una sola hoja sobre el Excel existente, sin regenerar
las demás. Cada hoja nueva se registra como una función build_<nombre>.

Uso:
    python3 scripts/add_sheet.py --sheet operador
    python3 scripts/add_sheet.py --sheet operador --file KB_BIA_Proveedores.xlsx

Hojas disponibles:
    operador   → 🏢 Homologación x Operador
"""
import argparse, json
from pathlib import Path
from collections import defaultdict
from openpyxl import load_workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.table import Table, TableStyleInfo

ROOT = Path(__file__).parent.parent

# ─── Carga de datos (kb_data + providers.json) ───────────────────
def _load_kb_data():
    for p in (ROOT/"scripts"/"kb_data_cache.json", Path("/tmp/kb_data.json")):
        if Path(p).exists():
            return json.load(open(p))
    return {}

def _load_providers():
    pj = ROOT/"providers.json"
    return json.load(open(pj)) if pj.exists() else []

def _norm(s):
    """Normaliza nombre de proveedor para hacer matching entre fuentes."""
    s = (s or "").upper()
    for tok in [" SAS"," S.A.S."," S.A.S"," S.A."," LTDA"," INGENIERIA"," TEC"," 1 "," - ","-"]:
        s = s.replace(tok," ")
    return " ".join(s.split())

# ─── PALETA (igual que build_excel.py) ───────────────────────────
NAVY="1A2138";TEAL="00B8A0";TEAL_LT="D6F5F0";GOLD="E8A13A";GOLD_LT="FBEFD8"
RED="E24A5B";RED_LT="FBE3E6";GREEN="2EA56A";GREEN_LT="DDF3E8"
GREY_LT="F2F4F8";WHITE="FFFFFF";TXT="1A2138"
def fill(c): return PatternFill("solid", fgColor=c)
def font(sz=11,b=False,color=TXT,name="Calibri"): return Font(name=name,size=sz,bold=b,color=color)
thin=Side(style="thin",color="C8CEDC")
border_all=Border(left=thin,right=thin,top=thin,bottom=thin)
center=Alignment(horizontal="center",vertical="center",wrap_text=True)
left=Alignment(horizontal="left",vertical="center",wrap_text=True)

def style_header(ws,ncols,row=3,fillc=NAVY,txtc=WHITE,h=30):
    ws.row_dimensions[row].height=h
    for c in range(1,ncols+1):
        cell=ws.cell(row=row,column=c)
        cell.fill=fill(fillc);cell.font=font(11,True,txtc)
        cell.alignment=center;cell.border=border_all

def banner(ws,title,subtitle,ncols):
    ws.merge_cells(start_row=1,end_row=1,start_column=1,end_column=ncols)
    ws.merge_cells(start_row=2,end_row=2,start_column=1,end_column=ncols)
    t=ws.cell(1,1,title);t.fill=fill(NAVY);t.font=font(18,True,WHITE);t.alignment=Alignment(horizontal="left",vertical="center",indent=1)
    s=ws.cell(2,1,subtitle);s.fill=fill(TEAL);s.font=font(10,True,WHITE);s.alignment=Alignment(horizontal="left",vertical="center",indent=1)
    ws.row_dimensions[1].height=34;ws.row_dimensions[2].height=20

# Orden y colores de TODAS las pestañas (incluye las nuevas)
TAB_ORDER=["📘 Inicio","🔎 Buscador","📋 Catálogo Maestro","💰 Proveedor + Barato",
           "🚚 Lead Times","📦 Inventario","🔌 Especificaciones","🔄 Homologación",
           "🏢 Homologación x Operador","🤝 Condiciones Comerciales","📞 Contactos",
           "📝 Pendiente Jarri","📈 Insights"]
TAB_COLORS={"📘 Inicio":NAVY,"🔎 Buscador":GOLD,"📋 Catálogo Maestro":TEAL,
            "💰 Proveedor + Barato":GREEN,"🚚 Lead Times":"5B6BFF","📦 Inventario":"8855CC",
            "🔌 Especificaciones":"00A0C8","🔄 Homologación":"E8A13A",
            "🏢 Homologación x Operador":"C8553A","🤝 Condiciones Comerciales":"B8860B",
            "📞 Contactos":"2EA56A","📝 Pendiente Jarri":RED,"📈 Insights":NAVY}

# ════════════════════════════════════════════════════════════════
# HOJA 🏢 — HOMOLOGACIÓN POR OPERADOR DE RED
# Fuente: investigación web jun-2026 (normas técnicas oficiales de cada OR)
# Modelo Colombia: cada OR publica su norma; equipo se homologa por
# cumplimiento de norma + certificación ONAC, NO por lista pública de marcas.
# ════════════════════════════════════════════════════════════════
OPERADORES=[
    # (Operador, Grupo, Norma técnica, Clase Medidor, Clase TC/TP, Proceso de homologación, Fuente)
    ("EPM","Grupo EPM","RA8-030 Rev.4 (2021) + NTC 5019-2018",
     "0.2S / 0.5S","TC 0.5S · NTC 2205/2207",
     "Cumplir RA8-030 + certificado de conformidad ONAC (CIDET) + calibración ISO 17025. Aprobación previa de muestra.",
     "epm.com.co/proveedores-y-contratistas"),
    ("CENS (Norte de Santander)","Grupo EPM","Cap.6 Norma Técnica · RA8-030",
     "0.2S / 0.5S","TC 0.5S · NTC 2205/2207",
     "Misma norma del Grupo EPM. Certificación ONAC + cumplimiento CREG 038.",
     "cens.com.co"),
    ("CHEC (Caldas)","Grupo EPM","RA8-030 Rev.4",
     "0.2S / 0.5S","TC 0.5S · NTC 2205/2207",
     "Misma norma del Grupo EPM. Certificación ONAC + cumplimiento CREG 038.",
     "chec.com.co"),
    ("EDEQ (Quindío)","Grupo EPM","RA8-030 Rev.4 + RA6-021",
     "0.2S / 0.5S","TC 0.5S · NTC 2205/2207",
     "Norma Grupo EPM. RA6-021 para medidor de control/respaldo. Certificación ONAC.",
     "edeq.com.co"),
    ("ESSA (Santander)","Grupo EPM","RA8-028 Rev.0",
     "0.2S / 0.5S","TC 0.5S · NTC 2205/2207",
     "Norma propia RA8-028 (alineada al Grupo EPM). Certificación ONAC + CREG 038.",
     "essa.com.co/proveedores"),
    ("Afinia (Caribe)","Grupo EPM","Marco CREG 038 + norma Grupo EPM",
     "0.2S / 0.5S","TC 0.5S","Cumplimiento CREG 038 + certificación ONAC. Verificar norma local vigente.",
     "afinia.com.co"),
    ("Codensa / Enel Colombia","Enel","GSSP001 (medidores polifásicos) · ET924 (TC barra pasante)",
     "0.2S / 0.5S","TC 0.5S · ET924",
     "Aprobación de muestra previa a fabricación. Garantía mínima 5 años. Inspección en fábrica. Portal Likinormas.",
     "likinormas.enelcol.com.co"),
    ("EMCALI (Cali)","EMCALI","NOP-PM-CA-028 v3 · Cap.4 Instalación y Medida",
     "Según CREG 038","TC/TP según CREG 038",
     "Cumplir CREG 038 + norma EMCALI. Certificación ONAC.",
     "emcali.com.co"),
    ("Celsia (Tolima / Valle)","Celsia","Código de Medida (CREG 080) + Normas Técnicas",
     "Según CREG 038/080","TC/TP según código",
     "Cumplimiento código de medida + CREG 038. Certificación ONAC.",
     "celsia.com/normas-tecnicas"),
    ("Air-e (Atlántico/Magdalena/Guajira)","Air-e","Marco CREG 038",
     "0.2S / 0.5S","TC 0.5S","Cumplimiento CREG 038 + certificación ONAC. Verificar norma local vigente.",
     "aire.com.co"),
]

def build_operador(wb):
    title="🏢 Homologación x Operador"
    if title in wb.sheetnames: del wb[title]
    ws=wb.create_sheet(title)
    ws.sheet_view.showGridLines=False
    COLS=[("Operador de Red",30),("Grupo",14),("Norma Técnica",38),
          ("Clase Medidor",14),("Clase TC / TP",22),
          ("Proceso de Homologación",58),("Fuente",30)]
    banner(ws,"  🏢 Homologación por Operador de Red",
           "  Qué exige cada OR para aprobar equipos de medida · base común: CREG 038-2014 + RETIE + certificación ONAC (CIDET)",
           len(COLS))
    for i,(n,w) in enumerate(COLS,1):
        ws.cell(3,i,n); ws.column_dimensions[get_column_letter(i)].width=w
    style_header(ws,len(COLS),3)
    rr=4
    for op in OPERADORES:
        for ci,v in enumerate(op,1):
            cc=ws.cell(rr,ci,v); cc.border=border_all; cc.font=font(10)
            cc.alignment=center if ci in (2,4) else left
        if "Grupo EPM" in op[1]:
            ws.cell(rr,2).fill=fill(TEAL_LT)
        rr+=1
    last=rr-1
    tab=Table(displayName="HomologOperador",ref=f"A3:{get_column_letter(len(COLS))}{last}")
    tab.tableStyleInfo=TableStyleInfo(name="TableStyleLight9",showRowStripes=True)
    ws.add_table(tab)
    ws.freeze_panes="A4"
    # Nota aclaratoria
    nota=("⚠️ IMPORTANTE: Los operadores NO publican listas de marcas aprobadas. La homologación es POR PRODUCTO: "
          "el equipo debe cumplir la norma del OR + tener certificado de conformidad ONAC (ej. CIDET) y calibración ISO 17025. "
          "Codensa y EPM además exigen aprobación previa de una muestra. SELDA (CIDET ONAC 09-CPR-004) es el proveedor confirmado.")
    ws.cell(last+2,1,nota).font=font(9,False,"7A8094")
    ws.cell(last+2,1).alignment=left
    ws.merge_cells(start_row=last+2,end_row=last+3,start_column=1,end_column=len(COLS))
    print(f"🏢 Homologación x Operador OK: {len(OPERADORES)} operadores")

# ════════════════════════════════════════════════════════════════
# HOJA 🤝 — CONDICIONES COMERCIALES POR PROVEEDOR
# Auto: # SKUs que cotiza, lead time real, estado, notas.
# Plantilla (Por confirmar): plazo pago, descuento, pedido mínimo, garantía.
# ════════════════════════════════════════════════════════════════
def build_condiciones(wb):
    from openpyxl.worksheet.datavalidation import DataValidation
    title="🤝 Condiciones Comerciales"
    if title in wb.sheetnames: del wb[title]
    ws=wb.create_sheet(title)
    ws.sheet_view.showGridLines=False

    D=_load_kb_data(); provs=_load_providers()
    offers=D.get('offers_by_sku',{}); lead_times=D.get('lead_times',{})

    # # SKUs que cotiza cada proveedor (por nombre de oferta)
    prov_sku=defaultdict(set)
    for sid,offs in offers.items():
        for o in offs:
            if o.get('price'): prov_sku[o['provider']].add(sid)
    # Lead time real (limpio, sin pruebas) indexado por nombre normalizado
    lt_norm={}
    for k,v in lead_times.items():
        if any(x in k.upper() for x in ('PRUEB','TEST')): continue
        lt_norm[_norm(k)]=v
    # Index providers.json por nombre normalizado
    pj_norm={}
    for p in provs:
        pj_norm[_norm(p.get('empresa',''))]=p

    def match(name, table):
        n=_norm(name)
        if n in table: return table[n]
        for k,v in table.items():
            if k and (k in n or n in k): return v
        return None

    COLS=[("Proveedor",30),("# SKUs que cotiza",16),("Lead Time (días)",15),
          ("Plazo de Pago",16),("Descuento Volumen",17),("Pedido Mínimo",15),
          ("Garantía",14),("Estado",12),("Notas",46)]
    banner(ws,"  🤝 Condiciones Comerciales por Proveedor",
           "  Lead time y # SKUs son reales · Plazo de pago / descuento / pedido mínimo / garantía: completar con comercial",
           len(COLS))
    for i,(n,w) in enumerate(COLS,1):
        ws.cell(3,i,n); ws.column_dimensions[get_column_letter(i)].width=w
    style_header(ws,len(COLS),3)

    # Solo proveedores que cotizan (comercialmente activos), ordenados por # SKUs
    rows=sorted(prov_sku.items(), key=lambda x:-len(x[1]))
    rr=4
    for prov_name, sids in rows:
        pj=match(prov_name, pj_norm) or {}
        empresa=pj.get('empresa') or prov_name
        lt=match(prov_name, lt_norm)
        estado=pj.get('estado','')
        notas=(pj.get('observaciones') or '')
        vals=[empresa, len(sids), lt if lt else "Por confirmar",
              "Por confirmar","Por confirmar","Por confirmar","Por confirmar",
              estado, notas]
        for ci,v in enumerate(vals,1):
            cc=ws.cell(rr,ci,v if v!='' else None); cc.border=border_all; cc.font=font(10)
            cc.alignment=left if ci in (1,9) else center
        rr+=1
    last=rr-1
    tab=Table(displayName="Condiciones",ref=f"A3:{get_column_letter(len(COLS))}{last}")
    tab.tableStyleInfo=TableStyleInfo(name="TableStyleLight9",showRowStripes=True)
    ws.add_table(tab)
    ws.freeze_panes="A4"
    # Estado ACTIVO en verde
    from openpyxl.formatting.rule import CellIsRule
    ws.conditional_formatting.add(f"H4:H{last}",CellIsRule(operator='equal',formula=['"ACTIVO"'],fill=fill(GREEN_LT),font=font(10,True,GREEN)))
    # "Por confirmar" en dorado (cols D-G)
    for col in ("C","D","E","F","G"):
        ws.conditional_formatting.add(f"{col}4:{col}{last}",CellIsRule(operator='equal',formula=['"Por confirmar"'],fill=fill(GOLD_LT),font=font(10,False,GOLD)))
    ws.cell(last+2,1,"Lead time y # SKUs vienen de datos reales. Las celdas 'Por confirmar' las completa el equipo comercial con cada proveedor.").font=font(9,False,"7A8094")
    ws.merge_cells(start_row=last+2,end_row=last+2,start_column=1,end_column=len(COLS))
    print(f"🤝 Condiciones Comerciales OK: {last-3} proveedores activos")

# ─── REGISTRO DE HOJAS ────────────────────────────────────────────
BUILDERS={
    "operador": build_operador,
    "condiciones": build_condiciones,
}

def reorder_and_color(wb):
    wb._sheets.sort(key=lambda s: TAB_ORDER.index(s.title) if s.title in TAB_ORDER else 99)
    for s in wb._sheets:
        if s.title in TAB_COLORS: s.sheet_properties.tabColor=TAB_COLORS[s.title]

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument("--sheet",required=True,choices=list(BUILDERS.keys()),help="Hoja a agregar/reemplazar")
    ap.add_argument("--file",default=str(ROOT/"KB_BIA_Proveedores.xlsx"))
    args=ap.parse_args()

    path=Path(args.file)
    if not path.exists():
        print(f"❌ No existe {path}. Genera primero el Excel completo con build_excel.py")
        return
    wb=load_workbook(path)
    BUILDERS[args.sheet](wb)
    reorder_and_color(wb)
    wb.save(path)
    print(f"✓ Guardado: {path}")
    print("Hojas:",[s.title for s in wb._sheets])

if __name__=="__main__":
    main()
