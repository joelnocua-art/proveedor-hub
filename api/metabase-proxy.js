/* ═══ Metabase Proxy — Proveedor Hub ═══
 * Vercel Serverless Function que actúa como intermediario seguro
 * entre el browser y la API de Metabase.
 *
 * Variables de entorno requeridas en Vercel:
 *   METABASE_API_KEY  — la API key generada en Metabase
 *
 * Endpoints:
 *   GET /api/metabase-proxy?type=clients&q=<búsqueda>
 *     → Devuelve clientes únicos. q puede ser código BIA o razón social.
 *
 *   GET /api/metabase-proxy?type=equipment&codigo_bia=<código>
 *     → Devuelve todos los equipos del cliente.
 *
 *   GET /api/metabase-proxy?debug=1
 *     → Devuelve metadata del dataset (cardId, totalRows, sample, etc.)
 *
 * Fuente: Dashboard 11584, tab 12706 (Asignadas-Instaladas).
 * Usa el endpoint /query/json (export) que NO tiene límite de 2000 filas.
 */

const METABASE_URL = 'https://bia.metabaseapp.com';
const DASHBOARD_ID = 11584;
const TAB_ID = 12706;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutos

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

  const tabCards = dashcards.filter(dc =>
    !dc.dashboard_tab_id || dc.dashboard_tab_id === TAB_ID
  );

  let target = tabCards.find(dc => {
    const name = (dc.card?.name || '').toLowerCase();
    return name.includes('precios') || name.includes('data') || name.includes('sku');
  });

  if (!target) {
    let maxCols = 0;
    for (const dc of tabCards) {
      const numCols = (dc.card?.result_metadata || []).length;
      if (numCols > maxCols) { maxCols = numCols; target = dc; }
    }
  }

  if (!target?.card?.id) {
    throw new Error(`No se encontró card de datos en dashboard ${DASHBOARD_ID}, tab ${TAB_ID}.`);
  }

  cachedCardId = target.card.id;
  return cachedCardId;
}

// ─── Mapear un objeto de Metabase a nuestro formato ────────────────────
function pick(obj, candidates) {
  for (const name of candidates) {
    if (obj[name] !== undefined && obj[name] !== null) return obj[name];
  }
  return null;
}

function normalizeRow(r) {
  return {
    codigo_bia:        pick(r, ['codigo_bia', 'Código BIA', 'code_bia', 'bia_code']),
    razon_social:      pick(r, ['razon_social_de_la_empresa', 'Razón social', 'razon_social']),
    operador_red:      pick(r, ['operador_de_red', 'Operador de Red', 'operador_red']),
    nombre_sku:        pick(r, ['nombre_sku', 'Nombre SKU', 'sku']),
    serial:            pick(r, ['serial', 'Serial']),
    marca:             pick(r, ['brand', 'Marca', 'marca']),
    modelo:            pick(r, ['model', 'Modelo', 'modelo']),
    precio_unitario:   Number(pick(r, ['precio_sheet', 'Precio unitario', 'precio_unitario'])) || 0,
    estado:            pick(r, ['state', 'Estado', 'estado', 'Estado Contrato']),
    ciudad:            pick(r, ['ciudad', 'Ciudad']),
    frontera:          pick(r, ['nombre_de_la_frontera', 'Nombre De La Frontera']),
    titulo:            pick(r, ['titulo', 'Titulo']),
    propiedad_activos: pick(r, ['Propiedad de Activos']),
    fecha_instalacion: pick(r, ['Fecha Instalación\n(MM/DD/YYYY)', 'Fecha de instalación', 'fecha_instalacion']),
    fecha_ingreso:     pick(r, ['Fecha \nIngreso\n(mm/dd/aa)', 'Fecha de ingreso']),
    fecha_retiro:      pick(r, ['Fecha Retiro \n(mm/dd/aa)', 'Fecha de retiro'])
  };
}

// ─── Helper: normalizar fila desde formato cols+rows ──────────────────
function normalizeRowFromCols(cols, rowArr) {
  const obj = {};
  cols.forEach((c, idx) => {
    if (c.name) obj[c.name] = rowArr[idx];
    if (c.display_name && obj[c.display_name] === undefined) obj[c.display_name] = rowArr[idx];
  });
  return normalizeRow(obj);
}

// ─── Fetch todas las filas — bypassea el límite de 2000 vía /api/dataset ───
//
// Estrategia: obtener el dataset_query del card (MBQL o SQL nativa) y
// ejecutarlo directamente vía /api/dataset con constraints altos para
// que Metabase no aplique el límite por defecto de 2000 filas.
async function fetchAllRows(apiKey) {
  if (cachedRows && (Date.now() - cacheTime) < CACHE_TTL_MS) {
    return cachedRows;
  }

  const cardId = await discoverCardId(apiKey);
  let cols = [];
  let rows = [];

  // Intento 1: dataset con constraints altos (bypassa límite por defecto)
  try {
    const cardResp = await fetch(`${METABASE_URL}/api/card/${cardId}`, {
      headers: { 'x-api-key': apiKey, 'Accept': 'application/json' }
    });
    if (cardResp.ok) {
      const card = await cardResp.json();
      if (card.dataset_query) {
        const dsResp = await fetch(`${METABASE_URL}/api/dataset`, {
          method: 'POST',
          headers: {
            'x-api-key': apiKey,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            ...card.dataset_query,
            constraints: {
              'max-results': 1000000,
              'max-results-bare-rows': 1000000
            }
          })
        });
        if (dsResp.ok) {
          const dsResult = await dsResp.json();
          cols = dsResult.data?.cols || [];
          rows = dsResult.data?.rows || [];
        }
      }
    }
  } catch (_) { /* fallback abajo */ }

  // Intento 2 (fallback): query estándar del card (max 2000 filas)
  if (rows.length === 0) {
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
    cols = result.data?.cols || [];
    rows = result.data?.rows || [];
  }

  cachedRows = rows.map(rowArr => normalizeRowFromCols(cols, rowArr));
  cacheTime = Date.now();
  return cachedRows;
}

// ─── Handler ───────────────────────────────────────────────────────────
export default async function handler(req, res) {
  const apiKey = process.env.METABASE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      success: false,
      error: 'METABASE_API_KEY no está configurada en el servidor.'
    });
  }

  const { type, q, codigo_bia, debug } = req.query;

  try {
    const rows = await fetchAllRows(apiKey);

    // ── Modo debug ──
    if (debug === '1') {
      const cardId = await discoverCardId(apiKey);
      // Conteo de codigos_bia únicos
      const uniqueCodes = new Set();
      for (const r of rows) if (r.codigo_bia) uniqueCodes.add(r.codigo_bia);
      return res.status(200).json({
        success: true,
        cardId,
        totalRows: rows.length,
        uniqueClients: uniqueCodes.size,
        sampleRow: rows[0] || null,
        cacheAgeMs: Date.now() - cacheTime
      });
    }

    // ── Clientes únicos — busca SOLO por código BIA ──
    if (type === 'clients') {
      const searchQuery = (q || '').toLowerCase().trim();
      const seen = new Set();
      const clients = [];

      for (const row of rows) {
        if (!row.codigo_bia) continue;
        if (seen.has(row.codigo_bia)) continue;

        if (searchQuery) {
          const haystack = String(row.codigo_bia).toLowerCase();
          if (!haystack.includes(searchQuery)) continue;
        }

        seen.add(row.codigo_bia);
        clients.push({
          codigo_bia:   row.codigo_bia,
          razon_social: row.razon_social || '',
          operador_red: row.operador_red
        });
      }

      clients.sort((a, b) => String(a.codigo_bia).localeCompare(String(b.codigo_bia)));

      return res.status(200).json({
        success: true,
        count: clients.length,
        clients: clients.slice(0, 30)
      });
    }

    // ── Equipos por código BIA — filtrado en memoria sobre TODAS las filas ──
    if (type === 'equipment') {
      if (!codigo_bia) {
        return res.status(400).json({
          success: false,
          error: 'codigo_bia es requerido para type=equipment'
        });
      }

      const targetCode = codigo_bia.trim();
      const equipment = rows
        .filter(r => (r.codigo_bia || '').trim() === targetCode)
        .map(r => ({
          codigo_bia:        r.codigo_bia,
          razon_social:      r.razon_social,
          nombre_sku:        r.nombre_sku,
          serial:            r.serial,
          marca:             r.marca,
          modelo:            r.modelo,
          precio_unitario:   r.precio_unitario,
          estado:            r.estado,
          operador_red:      r.operador_red,
          ciudad:            r.ciudad,
          frontera:          r.frontera,
          titulo:            r.titulo,
          propiedad_activos: r.propiedad_activos,
          fecha_instalacion: r.fecha_instalacion
        }));

      return res.status(200).json({
        success: true,
        count: equipment.length,
        equipment
      });
    }

    // ── Equipos por SERIAL — búsqueda parcial sobre TODAS las filas ──
    // Trae el equipo real (con su precio_unitario de Metabase) sin necesidad
    // de seleccionar primero el cliente.
    if (type === 'serial') {
      const term = (q || '').trim().toLowerCase();
      if (term.length < 2) {
        return res.status(400).json({
          success: false,
          error: 'q (serial) requiere al menos 2 caracteres'
        });
      }
      const equipment = rows
        .filter(r => String(r.serial || '').toLowerCase().includes(term))
        .slice(0, 30)
        .map(r => ({
          codigo_bia:        r.codigo_bia,
          razon_social:      r.razon_social,
          nombre_sku:        r.nombre_sku,
          serial:            r.serial,
          marca:             r.marca,
          modelo:            r.modelo,
          precio_unitario:   r.precio_unitario,
          estado:            r.estado,
          operador_red:      r.operador_red,
          ciudad:            r.ciudad,
          frontera:          r.frontera,
          titulo:            r.titulo,
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
      error: 'Parámetro "type" inválido. Usa: type=clients | type=equipment&codigo_bia=... | type=serial&q=... | debug=1'
    });

  } catch (err) {
    console.error('[Metabase Proxy] Error:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Error desconocido'
    });
  }
}
