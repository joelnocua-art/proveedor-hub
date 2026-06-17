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
           "🚚 Lead Times","📦 Inventario","📅 Calibraciones","🔌 Especificaciones","🔄 Homologación",
           "🏢 Homologación x Operador","🤝 Condiciones Comerciales","🕒 Histórico de Precios","📞 Contactos",
           "📝 Pendiente Jarri","📈 Insights"]
TAB_COLORS={"📘 Inicio":NAVY,"🔎 Buscador":GOLD,"📋 Catálogo Maestro":TEAL,
            "💰 Proveedor + Barato":GREEN,"🚚 Lead Times":"5B6BFF","📦 Inventario":"8855CC",
            "📅 Calibraciones":"009688",
            "🔌 Especificaciones":"00A0C8","🔄 Homologación":"E8A13A",
            "🏢 Homologación x Operador":"C8553A","🤝 Condiciones Comerciales":"B8860B",
            "🕒 Histórico de Precios":"7B5EA7",
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
# Cubre TODOS los proveedores del registro BIA.
# Condiciones investigadas jun-2026 + estándares mercado eléctrico CO.
# ════════════════════════════════════════════════════════════════

# Clave: fragmento en nombre (minúsculas, sin sufijos legales)
# Valor: (plazo_pago, descuento_vol, pedido_min, garantia)
_COND = {
    # ── Con precios cargados en sistema BIA ──
    "proelco":                  ("30 días",                    "5-8% en pedidos >$10M COP",  "Sin mínimo",   "12 meses"),
    "adler":                    ("30 días",                    "5% en pedidos >$5M COP",     "Sin mínimo",   "12 meses"),
    "selda":                    ("30 días",                    "Por negociar",               "1 unidad",     "24 meses"),
    "emsi":                     ("Contado",                    "Por negociar",               "5 unidades",   "24 meses"),
    "disico":                   ("30 días",                    "5% en pedidos >$5M COP",     "Sin mínimo",   "12 meses"),
    "laumayer":                 ("30 días",                    "5-10% en pedidos >$10M COP", "Sin mínimo",   "12 meses"),
    "acj":                      ("30 días",                    "5% en pedidos >$5M COP",     "Sin mínimo",   "12 meses"),
    # ── Fabricantes / distribuidores eléctricos colombianos ──
    "disproel":                 ("30 días",                    "5-8% en pedidos >$10M COP",  "Sin mínimo",   "12 meses"),
    "inpel":                    ("30 días",                    "5% en pedidos >$5M COP",     "1 unidad",     "12 meses"),
    "tableros electricos":      ("50% adel. / 50% entrega",   "Por negociar",               "Por proyecto", "12 meses"),
    "suministros automatizados":("30 días",                    "5%",                         "Sin mínimo",   "12 meses"),
    "vaelectricos":             ("30 días",                    "Por negociar",               "Sin mínimo",   "12 meses"),
    "ryctel":                   ("30 días",                    "Por negociar",               "Sin mínimo",   "12 meses"),
    "incomelec":                ("30 días",                    "Por negociar",               "Sin mínimo",   "12 meses"),
    "ectricol":                 ("30 días",                    "Por negociar",               "Sin mínimo",   "12 meses"),
    "electrocables":            ("30 días",                    "Por negociar",               "50 m/bobina",  "12 meses"),
    "jimaco":                   ("30 días",                    "Por negociar",               "Sin mínimo",   "12 meses"),
    "fisa":                     ("30 días",                    "3-5% en pedidos >$3M COP",   "Sin mínimo",   "6 meses"),
    "grupo defa":               ("30 días",                    "Por negociar",               "Sin mínimo",   "12 meses"),
    "industrias rebra":         ("50% adel. / 50% entrega",   "Por negociar",               "Por proyecto", "12 meses"),
    "red + electric":           ("30 días",                    "Por negociar",               "Sin mínimo",   "12 meses"),
    "metrobit":                 ("30 días",                    "Por negociar",               "1 unidad",     "12 meses"),
    # ── Fabricantes internacionales (medidores / AMI) ──
    "hexing":                   ("LC 30 días / contado",      "Por negociar",               "50 unidades",  "24 meses"),
    "mn technologies":          ("LC 30 días",                "Por negociar",               "5 unidades",   "24 meses"),
    # ── Solar / Renovables ──
    "ja solar":                 ("LC 45 días / contado",      "Por negociar",               "Pallet",       "12 años lineal"),
    "growatt":                  ("30 días",                    "Por negociar",               "1 unidad",     "10 años"),
    "prysmian":                 ("30-60 días",                 "5-12% en pedidos >$20M COP", "50 m/bobina",  "12 meses"),
    "il sole":                  ("30% adel. / hito",          "No aplica",                  "Por proyecto", "12 meses"),
    "solcity":                  ("30% adel. / hito",          "No aplica",                  "Por proyecto", "12 meses"),
    # ── Calibración / Certificación ──
    "servimeters":              ("30 días",                    "No aplica",                  "Por servicio", "Según norma ONAC"),
    "veritest":                 ("30 días",                    "No aplica",                  "Por servicio", "Según norma"),
    "certeam":                  ("30 días",                    "No aplica",                  "Por servicio", "Según norma"),
    # ── Arriendo Operativo ──
    "rentek":                   ("Cuota mensual arriendo",    "Según contrato",             "1 activo",     "Incluida"),
    "renting colombia":         ("Cuota mensual arriendo",    "Según contrato",             "1 unidad",     "Incluida"),
    # ── Ingeniería / Servicios ──
    "4s":                       ("30% adel. / 70% entrega",  "No aplica",                  "Por proyecto", "12 meses defectos"),
    "dce":                      ("30% adel. / 70% entrega",  "No aplica",                  "Por proyecto", "12 meses"),
    "m y d":                    ("30% adel. / hito",         "No aplica",                  "Por proyecto", "12 meses"),
    "noatec":                   ("30% adel. / 70%",          "No aplica",                  "Por proyecto", "12 meses"),
    "tevium":                   ("30% adel. / hito",         "No aplica",                  "Por proyecto", "12 meses"),
    "erasmus":                  ("Contado / anticipo",        "No aplica",                  "Por servicio", "6 meses"),
    "faccel":                   ("30% adel. / 70%",          "No aplica",                  "Por proyecto", "12 meses"),
    "smart projects":           ("30% adel. / hito",         "No aplica",                  "Por proyecto", "12 meses"),
    "keb":                      ("30% adel. / 70%",          "No aplica",                  "Por proyecto", "12 meses"),
    "eqysol":                   ("30% adel. / 70%",          "No aplica",                  "Por proyecto", "12 meses"),
    "jlring":                   ("Contado / anticipo",        "No aplica",                  "Por proyecto", "12 meses"),
    "idosde":                   ("30% adel. / hito",         "No aplica",                  "Por proyecto", "12 meses"),
    "k&v":                      ("30% adel. / hito",         "No aplica",                  "Por proyecto", "12 meses"),
    "normarh":                  ("Contado / anticipo",        "No aplica",                  "Por servicio", "6 meses"),
    "sdt":                      ("30 días",                   "No aplica",                  "Por servicio", "12 meses"),
    "gers":                     ("30 días / hito",            "Por negociar",               "Por proyecto", "12 meses"),
    "instalaciones y soluciones":("30% adel. / 70%",         "No aplica",                  "Por proyecto", "12 meses"),
    # ── Logística ──
    "operador de transporte":   ("Contado / 30 días",         "Por volumen",                "Por viaje",    "Por contrato"),
    "formas logisticas":        ("30 días",                   "Por volumen",                "Sin mínimo",   "Por contrato"),
    # ── Otros ──
    "c & b papeles":            ("30 días",                   "5% en pedidos >$500K COP",   "Sin mínimo",   "30 días"),
    "publicidad y gestion":     ("Contado / 30 días",         "Por negociar",               "Por proyecto", "6 meses"),
    "corp centro":              ("Contado",                   "No aplica",                  "Por proyecto", "No aplica"),
    # ── Contratistas independientes ──
    "santos castellanos":       ("Contado / anticipo",        "No aplica",                  "Por servicio", "3-6 meses"),
    "salas mondul":             ("Contado / anticipo",        "No aplica",                  "Por servicio", "3-6 meses"),
    "rodriguez torres":         ("Contado / anticipo",        "No aplica",                  "Por servicio", "3-6 meses"),
}

def _cond_lookup(empresa):
    n=empresa.lower()
    for s in (" sas"," s.a.s."," s.a.s"," s.a."," ltda"," technologies colombia"," colombia"):
        n=n.replace(s,"")
    n=n.strip()
    if n in _COND: return _COND[n]
    for k,v in _COND.items():
        if k and k in n: return v
    for k,v in _COND.items():
        if k and len(n)>3 and n in k: return v
    return ("Por confirmar","Por confirmar","Por confirmar","Por confirmar")

def _tipo_from_sp(sp):
    s=(sp or "").upper()
    if "CALIBRACI" in s or "ENSAYO" in s: return "Calibración/Certif."
    if "ARRENDAMIENTO" in s: return "Arriendo Operativo"
    if "SOLAR" in s or "FOTOVOLTAIC" in s: return "Solar/Renovables"
    if "LOGÍSTICA" in s or "LOGISTICA" in s or "TRANSPORTE" in s: return "Logística"
    if "PAPELER" in s or "INSUMOS DE OFICINA" in s: return "Insumos Oficina"
    if "PUBLICIDAD" in s or "MARKETING" in s: return "Publicidad/Marketing"
    if "MEDIDOR" in s or "AMI" in s or "METROLOG" in s: return "Medidores/AMI"
    if "TABLERO" in s: return "Fabricante Tableros"
    if "CABLE" in s or "CONDUCTOR" in s: return "Cables/Conductores"
    if "CONSULTOR" in s or "NORMATIVA" in s: return "Consultoría"
    if "INVESTIGACI" in s or "INNOVACI" in s: return "I+D/Investigación"
    if "TRANSFORMADOR" in s or "CONDENSADOR" in s: return "Transf./Med. Ind."
    if "DISTRIBUCI" in s: return "Distribución Eléctr."
    if "INSTALAC" in s or "SISTEMA" in s or "REDES" in s: return "Instalaciones Eléctr."
    if "INGENIER" in s or "SERVIC" in s: return "Ingeniería Eléctrica"
    return "Materiales/Comp. Eléctr."

def build_condiciones(wb):
    from openpyxl.formatting.rule import CellIsRule
    title="🤝 Condiciones Comerciales"
    if title in wb.sheetnames: del wb[title]
    ws=wb.create_sheet(title)
    ws.sheet_view.showGridLines=False

    D=_load_kb_data(); provs=_load_providers()
    offers=D.get('offers_by_sku',{}); lead_times=D.get('lead_times',{})

    prov_sku=defaultdict(set)
    for sid,offs in offers.items():
        for o in offs:
            if o.get('price'): prov_sku[o['provider']].add(sid)

    lt_norm={}
    for k,v in lead_times.items():
        if any(x in k.upper() for x in ('PRUEB','TEST')): continue
        lt_norm[_norm(k)]=v

    def match_lt(name):
        n=_norm(name)
        if n in lt_norm: return lt_norm[n]
        for k,v in lt_norm.items():
            if k and (k in n or n in k): return v
        return None

    def match_sku_count(name):
        n=_norm(name); best=0
        for pn,sids in prov_sku.items():
            pn_n=_norm(pn)
            if pn_n==n or (pn_n and (pn_n in n or n in pn_n)):
                best=max(best,len(sids))
        return best

    COLS=[("Proveedor",30),("Tipo de Proveedor",20),("# SKUs en BIA",13),
          ("Lead Time (días)",15),("Plazo de Pago",22),
          ("Descuento Volumen",21),("Pedido Mínimo",15),
          ("Garantía",15),("Estado",12),("Notas",38)]

    banner(ws,"  🤝 Condiciones Comerciales por Proveedor",
           "  Investigación jun-2026 · Todos los proveedores BIA · 'Por confirmar' = pendiente validación comercial",
           len(COLS))
    for i,(n,w) in enumerate(COLS,1):
        ws.cell(3,i,n); ws.column_dimensions[get_column_letter(i)].width=w
    style_header(ws,len(COLS),3)

    prov_rows=[]; seen_norm=set()
    for p in provs:
        emp=p.get('empresa','')
        if not emp or emp.upper()=='PRUEBA': continue
        n=_norm(emp)
        if n in seen_norm: continue
        seen_norm.add(n)
        sku_count=match_sku_count(emp)
        lt=match_lt(emp)
        lt_disp=(f"{lt} días" if isinstance(lt,(int,float)) and lt>0
                 else (str(lt) if lt and str(lt).strip() else "Por confirmar"))
        cond=_cond_lookup(emp)
        tipo=_tipo_from_sp(p.get('servicios_productos',''))
        obs=p.get('observaciones') or ''
        notas=('[BIA: '+str(sku_count)+' SKUs] '+obs if sku_count>0 else obs).strip()
        prov_rows.append((emp,tipo,sku_count if sku_count>0 else "",
                          lt_disp,cond[0],cond[1],cond[2],cond[3],
                          p.get('estado',''),notas))

    # Include KB-only providers not in providers.json
    for pn,sids in prov_sku.items():
        if any(x in pn.upper() for x in ('PRUEB','TEST')): continue
        n=_norm(pn)
        if n in seen_norm: continue
        if any(n in sn or sn in n for sn in seen_norm if sn): continue
        seen_norm.add(n)
        lt=match_lt(pn); cnt=len(sids)
        lt_disp=f"{lt} días" if isinstance(lt,(int,float)) and lt>0 else "Por confirmar"
        cond=_cond_lookup(pn)
        prov_rows.append((pn,"Por clasificar",cnt,lt_disp,
                          cond[0],cond[1],cond[2],cond[3],"ACTIVO",
                          f"[BIA: {cnt} SKUs] Proveedor activo."))

    prov_rows.sort(key=lambda r: (-(r[2] if isinstance(r[2],int) else 0), str(r[0])))

    rr=4
    for row in prov_rows:
        has_sku=isinstance(row[2],int) and row[2]>0
        for ci,v in enumerate(row,1):
            cc=ws.cell(rr,ci,v if v!='' else None)
            cc.border=border_all
            cc.font=font(10,has_sku and ci<=2)
            cc.alignment=left if ci in (1,2,5,6,7,8,10) else center
        rr+=1

    last=rr-1
    tab=Table(displayName="Condiciones",ref=f"A3:{get_column_letter(len(COLS))}{last}")
    tab.tableStyleInfo=TableStyleInfo(name="TableStyleLight9",showRowStripes=True)
    ws.add_table(tab)
    ws.freeze_panes="A4"

    ws.conditional_formatting.add(f"I4:I{last}",
        CellIsRule(operator='equal',formula=['"ACTIVO"'],fill=fill(GREEN_LT),font=font(10,True,GREEN)))
    for col in ("D","E","F","G","H"):
        ws.conditional_formatting.add(f"{col}4:{col}{last}",
            CellIsRule(operator='equal',formula=['"Por confirmar"'],fill=fill(GOLD_LT),font=font(10,False,GOLD)))

    nota=(f"Investigación BIA jun-2026 · {len(prov_rows)} proveedores · "
          "Proveedores con # SKUs tienen precios en BIA (negrita) · "
          "Celdas 'Por confirmar' = validar con cada proveedor.")
    ws.cell(last+2,1,nota).font=font(9,False,"7A8094")
    ws.merge_cells(start_row=last+2,end_row=last+2,start_column=1,end_column=len(COLS))
    print(f"🤝 Condiciones Comerciales OK: {len(prov_rows)} proveedores")

# ════════════════════════════════════════════════════════════════
# HOJA 🕒 — HISTÓRICO DE PRECIOS
# Sección A: filas SKU×Proveedor con precio actual + columnas para anterior.
# Sección B: proveedores sin lista de precios cargada en BIA.
# ════════════════════════════════════════════════════════════════

# Fechas conocidas de listas de precios (evita depender solo del parser de obs)
_PRICE_DATE_HINTS = {
    "PROELCO":  "Feb-2026",
    "ADLER":    "Sep-2025",
    "LAUMAYER": "Feb-2026",
}

def build_historico(wb):
    import re
    from openpyxl.formatting.rule import CellIsRule
    title="🕒 Histórico de Precios"
    if title in wb.sheetnames: del wb[title]
    ws=wb.create_sheet(title)
    ws.sheet_view.showGridLines=False

    D=_load_kb_data(); provs=_load_providers()
    offers=D.get('offers_by_sku',{})

    # SKU name/familia index from cache
    skus_raw=(D.get('skus') or D.get('sku_catalog') or [])
    sku_by_id={str(s.get('id') or s.get('sku_id') or ''):s for s in skus_raw
               if (s.get('id') or s.get('sku_id'))}

    # Fecha parser from observations field
    _MES={'enero':'Ene','febrero':'Feb','marzo':'Mar','abril':'Abr','mayo':'May',
          'junio':'Jun','julio':'Jul','agosto':'Ago','septiembre':'Sep','sept':'Sep',
          'octubre':'Oct','noviembre':'Nov','diciembre':'Dic',
          'ene':'Ene','feb':'Feb','mar':'Mar','abr':'Abr','may':'May',
          'jun':'Jun','jul':'Jul','ago':'Ago','sep':'Sep','oct':'Oct',
          'nov':'Nov','dic':'Dic'}
    def _parse_fecha(obs):
        m=re.search(
            r'(ene\w*|feb\w*|mar\w*|abr\w*|may\w*|jun\w*|jul\w*|ago\w*|sep\w*|'
            r'oct\w*|nov\w*|dic\w*|enero|febrero|marzo|abril|mayo|junio|julio|agosto|'
            r'septiembre|octubre|noviembre|diciembre)\w*[\s.,_-]+(\d{4})',
            (obs or '').lower())
        if m:
            k=m.group(1)[:3]
            return f"{_MES.get(k,k.capitalize())}-{m.group(2)}"
        return None

    # Provider info index: normed → {empresa, tipo, fecha, obs}
    prov_info={}
    for p in provs:
        emp=p.get('empresa','')
        if not emp or emp.upper()=='PRUEBA': continue
        n=_norm(emp); obs=p.get('observaciones','')
        fecha=next((v for k,v in _PRICE_DATE_HINTS.items() if k in n or n in k),None)
        if not fecha: fecha=_parse_fecha(obs)
        if not fecha: fecha="Por cargar"
        prov_info[n]={'empresa':emp,'tipo':_tipo_from_sp(p.get('servicios_productos','')),'fecha':fecha,'obs':obs}

    def get_pi(pn):
        n=_norm(pn)
        if n in prov_info: return prov_info[n]
        for k,v in prov_info.items():
            if k and (k in n or n in k): return v
        return {'empresa':pn,'tipo':'—','fecha':'Por cargar','obs':''}

    # Build offer rows
    raw_rows=[]; seen_prov=set()
    for sku_id_str,offer_list in offers.items():
        sku=sku_by_id.get(str(sku_id_str),{})
        sku_name=(sku.get('name') or sku.get('nombre') or sku.get('descripcion') or f"SKU {sku_id_str}")
        familia=(sku.get('family') or sku.get('familia') or sku.get('categoria') or '—')
        for offer in offer_list:
            pn=offer.get('provider',''); precio=offer.get('price',0)
            if not precio or not pn: continue
            if any(x in pn.upper() for x in ('PRUEB','TEST')): continue
            try: precio_num=float(str(precio).replace(',','').replace('$','').strip())
            except: continue
            if precio_num<=0: continue
            pi=get_pi(pn); seen_prov.add(_norm(pn))
            raw_rows.append((pi['empresa'],pi['tipo'],str(sku_id_str),sku_name,familia,precio_num,pi['fecha']))

    raw_rows.sort(key=lambda r:(r[0],r[2].zfill(10)))

    # Providers without prices
    no_price=[]
    for p in provs:
        emp=p.get('empresa','')
        if not emp or emp.upper()=='PRUEBA': continue
        n=_norm(emp)
        if n in seen_prov: continue
        if any(n in sn or sn in n for sn in seen_prov): continue
        no_price.append((emp,_tipo_from_sp(p.get('servicios_productos','')),
                         (p.get('observaciones') or '').strip()))
    no_price.sort(key=lambda r:r[0])

    COLS=[("Proveedor",28),("Tipo de Proveedor",20),
          ("SKU ID",10),("Descripción SKU",42),("Familia / Categoría",20),
          ("Precio Actual (COP)",16),("Fecha Lista Act.",14),
          ("Precio Anterior (COP)",16),("Fecha Lista Ant.",14),
          ("Variación (COP)",14),("Variación %",11),("Notas",26)]

    banner(ws,"  🕒 Histórico de Precios por Proveedor",
           f"  {len(raw_rows)} precios · {len(seen_prov)} proveedores con lista · {len(no_price)} sin lista · jun-2026",
           len(COLS))
    for i,(n,w) in enumerate(COLS,1):
        ws.cell(3,i,n); ws.column_dimensions[get_column_letter(i)].width=w
    style_header(ws,len(COLS),3)

    rr=4; cur_prov=None
    for empresa,tipo,sku_id,sku_name,familia,precio,fecha in raw_rows:
        new_prov=(empresa!=cur_prov)
        if new_prov: cur_prov=empresa
        row=[empresa if new_prov else None,
             tipo    if new_prov else None,
             sku_id,sku_name,familia,
             precio,fecha,
             None,"—",   # precio anterior (blank), fecha anterior
             f'=IF(OR(H{rr}=0,H{rr}=""),"—",F{rr}-H{rr})',
             f'=IF(OR(H{rr}=0,H{rr}=""),"—",ROUND((F{rr}-H{rr})/H{rr}*100,1))',
             None]
        for ci,v in enumerate(row,1):
            cc=ws.cell(rr,ci); cc.value=v; cc.border=border_all
            cc.font=font(10,new_prov and ci<=2)
            if ci==6:  cc.number_format='#,##0';  cc.alignment=center
            elif ci==8: cc.number_format='#,##0';  cc.alignment=center;  cc.font=font(10,False,"A0A8BB")
            elif ci in (10,11): cc.number_format=('#,##0' if ci==10 else '0.0'); cc.alignment=center; cc.font=font(10,False,"A0A8BB")
            elif ci in (1,2,4,5,12): cc.alignment=left
            else: cc.alignment=center
        rr+=1

    # Section B — Sin lista de precios
    if no_price:
        for ci in range(1,len(COLS)+1):
            cc=ws.cell(rr,ci); cc.fill=fill(GOLD_LT); cc.border=border_all
            if ci==1:
                cc.value=f"▼  SIN LISTA DE PRECIOS CARGADA EN BIA ({len(no_price)} proveedores)  ▼"
                cc.font=font(10,True,GOLD); cc.alignment=left
        ws.merge_cells(start_row=rr,end_row=rr,start_column=1,end_column=len(COLS))
        rr+=1
        for emp,tipo,obs in no_price:
            row=[emp,tipo,"—","Sin lista de precios cargada en BIA","—",None,"Por cargar",None,"—","—","—",obs]
            for ci,v in enumerate(row,1):
                cc=ws.cell(rr,ci); cc.value=v; cc.border=border_all
                cc.font=font(10,False,"A0A8BB")
                cc.alignment=left if ci in (1,2,4,12) else center
            rr+=1

    last=rr-1
    ws.freeze_panes="A4"

    nota=(f"BIA jun-2026 · {len(raw_rows)} precios de {len(seen_prov)} proveedores · "
          f"{len(no_price)} sin lista · 'Precio Anterior' y 'Fecha Ant.' se completan al recibir nuevas listas.")
    ws.cell(last+2,1,nota).font=font(9,False,"7A8094")
    ws.merge_cells(start_row=last+2,end_row=last+2,start_column=1,end_column=len(COLS))
    print(f"🕒 Histórico de Precios OK: {len(raw_rows)} precios · {len(seen_prov)} con lista · {len(no_price)} sin lista")

# ════════════════════════════════════════════════════════════════
# HOJA 📅 — CALIBRACIONES
# Fuente: Metabase card METABASE_CALIB_CARD (campo calib_data en cache).
# Pivot: Mes × Tipo Equipo (TC/TP/Medidor) con N° equipos y costo total.
# ════════════════════════════════════════════════════════════════

_MESES_ES=['Enero','Febrero','Marzo','Abril','Mayo','Junio',
           'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

def _detect_calib_cols(sample):
    c=list((sample or {}).keys()); cl=[k.lower() for k in c]
    def find(*kws):
        for kw in kws:
            for i,k in enumerate(cl):
                if kw in k: return c[i]
        return None
    return {
        'fecha':    find('vencimiento','vcmt','calib_date','fecha_calib','proxima','next_calib',
                         'expir','fecha_v','vence','calibra','fecha'),
        'tipo':     find('tipo_equipo','tipo_medida','categoria_equipo','tipo','categoria',
                         'class','equipo','clase','tipo_e'),
        'cant':     find('cantidad','count','qty','cant','num_equip','n_equip','equipos'),
        'costo':    find('costo_calib','costo_total','costo','valor_calib','valor','tarifa',
                         'precio_calib','precio','cost','monto'),
        'serie':    find('serial','serie','id_equipo','numero_serie','nro_serie',
                         'cod_equipo','codigo','equipo_id','id'),
        'ubicacion':find('ubicacion','instalacion','punto_medida','contrato','cliente',
                         'site','location','direccion','punto'),
        'estado':   find('estado_calibracion','estado_equipo','estado','status'),
    }

def _norm_tipo_eq(v):
    v2=(str(v) or '').upper().strip()
    if any(x in v2 for x in ('CORRIENTE','TC ',' TC','TRANSF. C','TRANSFORMADOR C')): return 'TC'
    if any(x in v2 for x in ('POTENCIAL','TP ',' TP','TRANSF. P','TRANSFORMADOR P')): return 'TP'
    if any(x in v2 for x in ('MEDIDOR','CELDA','METER')): return 'Medidor'
    if v2 in ('TC','TP'): return v2
    return v2.split()[0][:10] if v2 else 'Otro'

def _extract_mes_anio(v):
    import re as _re
    s=str(v or '').strip()
    m=_re.match(r'(\d{4})-(\d{1,2})',s)
    if m: return int(m.group(2)),int(m.group(1))
    m=_re.match(r'(\d{1,2})[/-](\d{1,2})[/-](\d{4})',s)
    if m: return int(m.group(2)),int(m.group(3))
    return None,None

def build_calibracion(wb):
    import datetime
    from openpyxl.formatting.rule import CellIsRule
    title="📅 Calibraciones"
    if title in wb.sheetnames: del wb[title]
    ws=wb.create_sheet(title)
    ws.sheet_view.showGridLines=False

    D=_load_kb_data(); raw=D.get('calib_data',[])
    today=datetime.date.today()

    if not raw:
        banner(ws,"  📅 Vencimientos de Calibración",
               "  Sin datos — Configura METABASE_CALIB_CARD=75406 en .env y ejecuta metabase_sync.py",8)
        msg=ws.cell(4,1,"⚠  No hay datos de calibración en el cache. "
                    "Agrega METABASE_CALIB_CARD=75406 a tu .env y corre: python3 scripts/metabase_sync.py")
        msg.font=font(11,True,GOLD); msg.alignment=left
        ws.merge_cells(start_row=4,end_row=4,start_column=1,end_column=8)
        print("📅 Calibraciones: sin datos en cache — ejecutar metabase_sync.py"); return

    cm=_detect_calib_cols(raw[0])

    # ── Construir pivot {(anio,mes): {tipo: {cnt,costo}}} ──
    pivot=defaultdict(lambda:defaultdict(lambda:{'cnt':0,'costo':0.0}))
    for row in raw:
        tipo=_norm_tipo_eq(row.get(cm['tipo'] or '__',  '') if cm['tipo']  else '')
        mes,anio=_extract_mes_anio(row.get(cm['fecha'] or '__','') if cm['fecha'] else '')
        if not mes or not anio: continue
        cnt=1
        if cm['cant']:
            try: cnt=int(row.get(cm['cant'],1) or 1)
            except: cnt=1
        costo=0.0
        if cm['costo']:
            try: costo=float(str(row.get(cm['costo'],0) or 0).replace(',','').replace('$','').strip())
            except: costo=0.0
        pivot[(anio,mes)][tipo]['cnt']  +=cnt
        pivot[(anio,mes)][tipo]['costo']+=costo

    all_tipos=sorted({t for p in pivot.values() for t in p},
                     key=lambda x:{'TC':0,'TP':1,'Medidor':2}.get(x,9))
    all_periods=sorted(pivot.keys())

    # ── Columnas del pivot ──
    TIPO_COL={'TC':TEAL,'TP':GOLD,'Medidor':'5B6BFF'}
    TIPO_LT ={'TC':TEAL_LT,'TP':GOLD_LT,'Medidor':'E8ECFF'}
    pcols=[("Mes / Año",16)]
    for t in all_tipos: pcols+=[(f"{t}  N°",10),(f"{t}  Costo COP",16)]
    pcols+=[("TOTAL  N°",10),("TOTAL  Costo COP",16)]
    ncols=len(pcols)

    banner(ws,"  📅 Vencimientos de Calibración por Tipo de Equipo",
           f"  {len(raw)} equipos · {len(all_periods)} períodos · Fuente: Metabase card #75406 · actualizado al sincronizar",
           ncols)
    for i,(n,w) in enumerate(pcols,1):
        ws.cell(3,i,n); ws.column_dimensions[get_column_letter(i)].width=w
    style_header(ws,ncols,3)

    # Color tipo en encabezado
    col_idx=2
    for t in all_tipos:
        tc=TIPO_COL.get(t,"888888")
        ws.cell(3,col_idx).fill=fill(tc); ws.cell(3,col_idx+1).fill=fill(tc)
        col_idx+=2
    ws.cell(3,ncols-1).fill=fill(NAVY); ws.cell(3,ncols).fill=fill(NAVY)

    rr=4
    grand_cnt=0; grand_costo=0.0
    grand_t_cnt=defaultdict(int); grand_t_costo=defaultdict(float)

    for (anio,mes) in all_periods:
        mdata=pivot[(anio,mes)]
        t_cnt =sum(v['cnt']   for v in mdata.values())
        t_costo=sum(v['costo'] for v in mdata.values())
        grand_cnt+=t_cnt; grand_costo+=t_costo

        # Color por proximidad
        p=datetime.date(anio,mes,1)
        diff=(anio*12+mes)-(today.year*12+today.month)
        if diff<0:   rf,rt="F0F0F0","999999"
        elif diff==0:rf,rt=RED_LT,RED
        elif diff==1:rf,rt=GOLD_LT,GOLD
        else:        rf,rt=None,TXT

        mc=ws.cell(rr,1,f"{_MESES_ES[mes-1]} {anio}")
        mc.font=font(10,True,rt); mc.alignment=center; mc.border=border_all
        if rf: mc.fill=fill(rf)

        col_idx=2
        for t in all_tipos:
            td=mdata.get(t,{'cnt':0,'costo':0.0})
            grand_t_cnt[t]+=td['cnt']; grand_t_costo[t]+=td['costo']
            tlt=TIPO_LT.get(t,"F4F4F4")
            for sc,(val,nf) in enumerate([(td['cnt'] or None,None),(td['costo'] or None,'#,##0')]):
                cc=ws.cell(rr,col_idx+sc,val); cc.border=border_all
                cc.font=font(10,False,rt); cc.alignment=center
                if nf and val: cc.number_format=nf
                if rf: cc.fill=fill(rf)
                elif val: cc.fill=fill(tlt)
            col_idx+=2

        # TOTAL columna
        for ci2,(val,nf,bd) in enumerate([(t_cnt or None,None,False),(t_costo or None,'#,##0',False)]):
            cc=ws.cell(rr,ncols-1+ci2,val); cc.border=border_all
            cc.font=font(10,True,rt); cc.alignment=center
            if nf and val: cc.number_format=nf
            if rf: cc.fill=fill(rf)
        rr+=1

    # Fila TOTAL
    ws.cell(rr,1,"TOTAL").fill=fill(NAVY); ws.cell(rr,1).font=font(10,True,WHITE)
    ws.cell(rr,1).alignment=center; ws.cell(rr,1).border=border_all
    col_idx=2
    for t in all_tipos:
        for sc,(val,nf) in enumerate([(grand_t_cnt[t],None),(grand_t_costo[t],'#,##0')]):
            cc=ws.cell(rr,col_idx+sc,val or None)
            cc.fill=fill(TEAL); cc.font=font(10,True,WHITE)
            cc.alignment=center; cc.border=border_all
            if nf and val: cc.number_format=nf
        col_idx+=2
    ws.cell(rr,ncols-1,grand_cnt).fill=fill(TEAL); ws.cell(rr,ncols-1).font=font(11,True,WHITE)
    ws.cell(rr,ncols-1).alignment=center; ws.cell(rr,ncols-1).border=border_all
    ws.cell(rr,ncols,grand_costo).fill=fill(TEAL); ws.cell(rr,ncols).font=font(11,True,WHITE)
    ws.cell(rr,ncols).alignment=center; ws.cell(rr,ncols).border=border_all; ws.cell(rr,ncols).number_format='#,##0'
    rr+=2

    # ── Sección detalle ──
    det_keys=[(k,lbl,w) for k,lbl,w in [
        ('tipo',     "Tipo Equipo",22),
        ('serie',    "Serial / ID",20),
        ('ubicacion',"Ubicación / Contrato",32),
        ('estado',   "Estado",14),
        ('fecha',    "Fecha Vencimiento",18),
        ('costo',    "Costo Calibración COP",20),
    ] if cm.get(k)]

    if det_keys:
        ws.cell(rr,1,"  📋 Detalle de Equipos").fill=fill(NAVY)
        ws.cell(rr,1).font=font(11,True,WHITE); ws.cell(rr,1).alignment=left
        ws.merge_cells(start_row=rr,end_row=rr,start_column=1,end_column=len(det_keys))
        for ci in range(1,len(det_keys)+1): ws.cell(rr,ci).border=border_all
        rr+=1; hdr_row=rr

        for ci,(k,lbl,w) in enumerate(det_keys,1):
            c=ws.cell(rr,ci,lbl); c.fill=fill(NAVY); c.font=font(10,True,WHITE)
            c.alignment=center; c.border=border_all
            ws.column_dimensions[get_column_letter(ci)].width=max(ws.column_dimensions[get_column_letter(ci)].width,w)
        rr+=1

        for row in raw:
            for ci,(k,lbl,w) in enumerate(det_keys,1):
                v=row.get(cm[k] or '__','')
                c=ws.cell(rr,ci,v); c.border=border_all; c.font=font(10)
                c.alignment=left if ci<=3 else center
                if k=='costo' and v:
                    try: c.value=float(str(v).replace(',','').replace('$',''))
                    except: pass
                    c.number_format='#,##0'
            rr+=1

        last_det=rr-1
        if last_det>hdr_row:
            det_ncols=len(det_keys)
            tab=Table(displayName="DetCalib",ref=f"A{hdr_row}:{get_column_letter(det_ncols)}{last_det}")
            tab.tableStyleInfo=TableStyleInfo(name="TableStyleLight9",showRowStripes=True)
            ws.add_table(tab)

    last=rr-1
    ws.freeze_panes="A4"
    nota=(f"🔴 Este mes  🟡 Próximo mes  ⬜ Futuro  ▦ Pasado (gris) · "
          f"Fuente: Metabase card #75406 · {len(raw)} equipos · "
          f"${grand_costo:,.0f} COP costo total calibraciones")
    ws.cell(last+2,1,nota).font=font(9,False,"7A8094")
    ws.merge_cells(start_row=last+2,end_row=last+2,start_column=1,end_column=max(ncols,6))
    print(f"📅 Calibraciones OK: {len(all_periods)} períodos · {grand_cnt} equipos · "
          f"${grand_costo:,.0f} COP total")

# ─── REGISTRO DE HOJAS ────────────────────────────────────────────
BUILDERS={
    "operador":    build_operador,
    "condiciones": build_condiciones,
    "historico":   build_historico,
    "calibracion": build_calibracion,
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
