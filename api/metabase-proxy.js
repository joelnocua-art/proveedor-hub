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
  return cachedCardId;
}

// ─── Fetch + normalización de todas las filas ──────────────────────────
async function fetchAllRows(apiKey) {
  if (cachedRows && (Date.now() - cacheTime) < CACHE_TTL_MS) {
    return cachedRows;
  }

  const cardId = await discoverCardId(apiKey);

  const resp = await fetch(`${METABASE_URL}/api/card/${cardId}/query`, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({})
  });

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`Card ${cardId} query failed (${resp.status}): ${errText.substring(0, 300)}`);
  }

  const result = await resp.json();
  const cols = result.data?.cols || [];
  const rows = result.data?.rows || [];

  // Mapa flexible nombre→índice (acepta tanto el nombre interno como el display)
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

  const normalized = rows.map(row => ({
    codigo_bia: getCol(row, ['Código BIA', 'codigo_bia', 'code_bia', 'CodigoBIA']),
    razon_social: getCol(row, ['Razón social', 'razon_social', 'razón_social', 'RazonSocial']),
    operador_red: getCol(row, ['Operador de Red', 'operador_de_red', 'operador_red']),
    nombre_sku: getCol(row, ['nombre_sku', 'Nombre SKU', 'sku', 'SKU']),
    serial: getCol(row, ['serial', 'Serial']),
    marca: getCol(row, ['Marca', 'marca']),
    modelo: getCol(row, ['Modelo', 'modelo']),
    precio_unitario: Number(getCol(row, ['Precio unitario', 'precio_unitario', 'PrecioUnitario'])) || 0,
    estado: getCol(row, ['Estado', 'estado']),
    fecha_instalacion: getCol(row, ['Fecha de instalación', 'fecha_instalacion'])
  }));

  cachedRows = normalized;
  cacheTime = Date.now();
  return normalized;
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
          const haystack = (row.razon_social + ' ' + row.codigo_bia).toLowerCase();
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

    // ── Equipos por código BIA ──
    if (type === 'equipment') {
      if (!codigo_bia) {
        return res.status(400).json({
          success: false,
          error: 'codigo_bia es requerido para type=equipment'
        });
      }

      const equipment = rows
        .filter(r => r.codigo_bia === codigo_bia)
        .map(r => ({
          codigo_bia: r.codigo_bia,
          razon_social: r.razon_social,
          nombre_sku: r.nombre_sku,
          serial: r.serial,
          marca: r.marca,
          modelo: r.modelo,
          precio_unitario: r.precio_unitario,
          estado: r.estado,
          operador_red: r.operador_red
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
