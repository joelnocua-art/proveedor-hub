/* ═══ Metabase Proxy — Proveedor Hub ═══
 * Vercel Serverless Function que actúa como intermediario seguro
 * entre el browser y la API de Metabase.
 *
 * Variables de entorno requeridas en Vercel:
 *   METABASE_API_KEY  — la API key generada en Metabase
 *
 * Endpoints:
 *   GET /api/metabase-proxy?type=clients&q=<búsqueda>
 *     → Devuelve lista de clientes únicos (razón social + código BIA)
 *
 *   GET /api/metabase-proxy?type=equipment&codigo_bia=<código>
 *     → Devuelve todos los equipos asociados a ese cliente
 *
 * Fuente: Dashboard 11584, tab 12706 (Asignadas-Instaladas)
 */

const METABASE_URL = 'https://bia.metabaseapp.com';
const DASHBOARD_ID = 11584;
const TAB_ID = 12706;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutos

// Cache a nivel de módulo. Sobrevive entre invocaciones "warm" en Vercel
// (se pierde en cold start, pero eso solo agrega ~1s a la primera llamada).
let cachedCardId = null;
let cachedRows = null;
let cacheTime = 0;
let cachedCodigoFieldRef = null; // field_ref de codigo_bia para queries filtradas

// ─── Discovery del card ID ─────────────────────────────────────────────
async function discoverCardId(apiKey) {
  if (cachedCardId) return cachedCardId;

  const resp = await fetch(`${METABASE_URL}/api/dashboard/${DASHBOARD_ID}`, {
    headers: { 'x-api-key': apiKey, 'Accept': 'application/json' }
  });

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`Dashboard ${DASHBOARD_ID} fetch failed (${resp.status}): ${errText.substring(0, 300)}`);
  }

  const dashboard = await resp.json();
  const dashcards = dashboard.dashcards || dashboard.ordered_cards || [];

  // Filtrar solo cards del tab que nos interesa (o sin tab si no aplica)
  const tabCards = dashcards.filter(dc =>
    !dc.dashboard_tab_id || dc.dashboard_tab_id === TAB_ID
  );

  // Preferir card cuyo nombre incluya "precios" o "data" (la tabla principal)
  let target = tabCards.find(dc => {
    const name = (dc.card?.name || '').toLowerCase();
    return name.includes('precios') || name.includes('data') || name.includes('sku');
  });

  // Fallback: el card con más columnas (típicamente la tabla, no el KPI)
  if (!target) {
    let maxCols = 0;
    for (const dc of tabCards) {
      const numCols = (dc.card?.result_metadata || []).length;
      if (numCols > maxCols) {
        maxCols = numCols;
        target = dc;
      }
    }
  }

  if (!target?.card?.id) {
    throw new Error(`No se encontró card de datos en dashboard ${DASHBOARD_ID}, tab ${TAB_ID}. Cards disponibles: ${tabCards.length}`);
  }

  cachedCardId = target.card.id;

  // Intentar obtener field_ref desde result_metadata del dashboard
  const dashMeta = target.card.result_metadata || [];
  const dashCol = dashMeta.find(c =>
    c.name === 'codigo_bia' || (c.display_name || '').toLowerCase().includes('código bia')
  );
  if (dashCol) {
    if (typeof dashCol.id === 'number') {
      cachedCodigoFieldRef = ['field', dashCol.id, null];
    } else if (Array.isArray(dashCol.field_ref)) {
      cachedCodigoFieldRef = dashCol.field_ref;
    }
  }

  // Si no se obtuvo del dashboard, fetchar el card directamente (más completo)
  if (!cachedCodigoFieldRef) {
    try {
      const cardResp = await fetch(`${METABASE_URL}/api/card/${cachedCardId}`, {
        headers: { 'x-api-key': apiKey, 'Accept': 'application/json' }
      });
      if (cardResp.ok) {
        const card = await cardResp.json();
        const cardMeta = card.result_metadata || [];
        const cardCol = cardMeta.find(c =>
          c.name === 'codigo_bia' || (c.display_name || '').toLowerCase().includes('código bia')
        );
        if (cardCol) {
          if (typeof cardCol.id === 'number') {
            cachedCodigoFieldRef = ['field', cardCol.id, null];
          } else if (Array.isArray(cardCol.field_ref)) {
            cachedCodigoFieldRef = cardCol.field_ref;
          }
        }
      }
    } catch (_) { /* non-fatal, usará fallback */ }
  }

  return cachedCardId;
}

// ─── Normalizar un array de [cols, rows] de la API de Metabase ────────
function normalizeRows(cols, rows) {
  const colIndex = {};
  cols.forEach((c, idx) => {
    if (c.name) colIndex[c.name] = idx;
    if (c.display_name) colIndex[c.display_name] = idx;
  });
  function getCol(row, candidates) {
    for (const name of candidates) {
      if (colIndex[name] !== undefined) return row[colIndex[name]];
    }
    return null;
  }
  return rows.map(row => ({
    codigo_bia:       getCol(row, ['codigo_bia', 'Código BIA', 'code_bia', 'bia_code']),
    razon_social:     getCol(row, ['razon_social_de_la_empresa', 'Razón social', 'razon_social']),
    operador_red:     getCol(row, ['operador_de_red', 'Operador de Red', 'operador_red']),
    nombre_sku:       getCol(row, ['nombre_sku', 'Nombre SKU', 'sku']),
    serial:           getCol(row, ['serial', 'Serial']),
    marca:            getCol(row, ['brand', 'Marca', 'marca']),
    modelo:           getCol(row, ['model', 'Modelo', 'modelo']),
    precio_unitario:  Number(getCol(row, ['precio_sheet', 'Precio unitario', 'precio_unitario'])) || 0,
    estado:           getCol(row, ['state', 'Estado', 'estado', 'Estado Contrato']),
    ciudad:           getCol(row, ['ciudad', 'Ciudad']),
    frontera:         getCol(row, ['nombre_de_la_frontera', 'Nombre De La Frontera']),
    titulo:           getCol(row, ['titulo', 'Titulo']),
    propiedad_activos: getCol(row, ['Propiedad de Activos']),
    fecha_instalacion: getCol(row, ['Fecha Instalación\n(MM/DD/YYYY)', 'Fecha de instalación', 'fecha_instalacion']),
    fecha_ingreso:    getCol(row, ['Fecha \nIngreso\n(mm/dd/aa)', 'Fecha de ingreso']),
    fecha_retiro:     getCol(row, ['Fecha Retiro \n(mm/dd/aa)', 'Fecha de retiro'])
  }));
}

// ─── Ejecutar query al card y normalizar resultado ─────────────────────
async function runCardQuery(apiKey, cardId, body) {
  const resp = await fetch(`${METABASE_URL}/api/card/${cardId}/query`, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`Card query failed (${resp.status}): ${errText.substring(0, 300)}`);
  }
  const result = await resp.json();
  return normalizeRows(result.data?.cols || [], result.data?.rows || []);
}

// ─── Fetch filtrado por codigo_bia (todos los equipos del cliente) ─────
async function fetchEquipmentByClient(apiKey, codigoBia) {
  const cardId = await discoverCardId(apiKey);

  // Intento 1: query con parámetro de filtro (devuelve TODOS los registros del cliente)
  if (cachedCodigoFieldRef) {
    const filtered = await runCardQuery(apiKey, cardId, {
      parameters: [{
        type: 'string/=',
        value: [codigoBia],
        target: ['dimension', cachedCodigoFieldRef]
      }]
    });
    if (filtered.length > 0) return filtered;
    // Si vino vacío, podría ser que el filtro no funcionó; continúa con fallback
  }

  // Intento 2 (fallback): query sin filtro, filtrar en memoria
  // Cubre el caso donde field_ref no está disponible o el filtro no aplicó
  const all = await runCardQuery(apiKey, cardId, {});
  return all.filter(r => (r.codigo_bia || '').trim() === codigoBia.trim());
}

// ─── Fetch + normalización de todas las filas (para búsqueda de clientes) ─
async function fetchAllRows(apiKey) {
  if (cachedRows && (Date.now() - cacheTime) < CACHE_TTL_MS) {
    return cachedRows;
  }

  const cardId = await discoverCardId(apiKey);
  cachedRows = await runCardQuery(apiKey, cardId, {});
  cacheTime = Date.now();
  return cachedRows;
}

// ─── Handler ───────────────────────────────────────────────────────────
export default async function handler(req, res) {
  const apiKey = process.env.METABASE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      success: false,
      error: 'METABASE_API_KEY no está configurada en el servidor. Agrégala en Vercel → Settings → Environment Variables.'
    });
  }

  const { type, q, codigo_bia, debug } = req.query;

  try {
    const rows = await fetchAllRows(apiKey);

    // ── Modo debug: devuelve metadata para diagnosticar ──
    if (debug === '1') {
      // Re-fetch raw para ver los nombres exactos de columnas que manda Metabase
      const cardId = await discoverCardId(apiKey);
      const rawResp = await fetch(`${METABASE_URL}/api/card/${cardId}/query`, {
        method: 'POST',
        headers: { 'x-api-key': apiKey, 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({})
      });
      const raw = await rawResp.json();
      const cols = raw.data?.cols || [];
      return res.status(200).json({
        success: true,
        cardId,
        totalRows: rows.length,
        codigoFieldRef: cachedCodigoFieldRef,
        columnNames: cols.map(c => ({ name: c.name, display_name: c.display_name })),
        sampleRow: rows[0] || null,
        cacheAgeMs: Date.now() - cacheTime
      });
    }

    // ── Clientes únicos ──
    if (type === 'clients') {
      const searchQuery = (q || '').toLowerCase().trim();
      const seen = new Set();
      const clients = [];

      for (const row of rows) {
        if (!row.codigo_bia || !row.razon_social) continue;
        if (seen.has(row.codigo_bia)) continue;

        if (searchQuery) {
          const haystack = (row.codigo_bia + ' ' + row.razon_social).toLowerCase();
          if (!haystack.includes(searchQuery)) continue;
        }

        seen.add(row.codigo_bia);
        clients.push({
          codigo_bia: row.codigo_bia,
          razon_social: row.razon_social,
          operador_red: row.operador_red
        });
      }

      clients.sort((a, b) => (a.razon_social || '').localeCompare(b.razon_social || ''));

      return res.status(200).json({
        success: true,
        count: clients.length,
        clients: clients.slice(0, 30)
      });
    }

    // ── Equipos por código BIA (llamada filtrada directa, sin límite de caché) ──
    if (type === 'equipment') {
      if (!codigo_bia) {
        return res.status(400).json({
          success: false,
          error: 'codigo_bia es requerido para type=equipment'
        });
      }

      const allEquipment = await fetchEquipmentByClient(apiKey, codigo_bia);
      const equipment = allEquipment.map(r => ({
        codigo_bia:       r.codigo_bia,
        razon_social:     r.razon_social,
        nombre_sku:       r.nombre_sku,
        serial:           r.serial,
        marca:            r.marca,
        modelo:           r.modelo,
        precio_unitario:  r.precio_unitario,
        estado:           r.estado,
        operador_red:     r.operador_red,
        ciudad:           r.ciudad,
        frontera:         r.frontera,
        titulo:           r.titulo,
        propiedad_activos: r.propiedad_activos,
        fecha_instalacion: r.fecha_instalacion
      }));

      return res.status(200).json({
        success: true,
        count: equipment.length,
        equipment
      });
    }

    return res.status(400).json({
      success: false,
      error: 'Parámetro "type" inválido. Usa: type=clients | type=equipment&codigo_bia=... | debug=1'
    });

  } catch (err) {
    console.error('[Metabase Proxy] Error:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Error desconocido'
    });
  }
}
