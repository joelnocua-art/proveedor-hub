/* ═══ Calibraciones Proxy — Proveedor Hub ═══
 * Vercel Serverless Function para el módulo de Calibraciones.
 * Consulta la card de Metabase (por defecto #75406) y devuelve
 * el cronograma de calibraciones agregado por mes + tipo de equipo.
 *
 * Variables de entorno requeridas en Vercel:
 *   METABASE_API_KEY       — API key de Metabase
 *   METABASE_CALIB_CARD    — ID de la card (default: 75406)
 *
 * Endpoints:
 *   GET /api/calibraciones-proxy?type=schedule
 *     → Devuelve [{mes, tipo, cantidad, costo_sin_iva, costo_con_iva}]
 *       agregado (un registro por mes × tipo).
 *
 *   GET /api/calibraciones-proxy?debug=1
 *     → Metadata: cardId, totalRows, sample, cacheAgeMs
 */

const METABASE_URL = 'https://bia.metabaseapp.com';

let cachedSchedule = null;
let cacheTime = 0;
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutos

// ─── Fetch raw rows from Metabase card ─────────────────────────────────
async function fetchRawRows(apiKey, cardId) {
  // Intento 1: /api/card/{id}/query (estándar, limit 2000)
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
  return {
    cols: result.data?.cols || [],
    rows: result.data?.rows || []
  };
}

// ─── Fuzzy column detector ──────────────────────────────────────────────
function detectCols(cols) {
  const idx = { mes: -1, tipo: -1, cantidad: -1, sin_iva: -1, con_iva: -1 };
  cols.forEach((c, i) => {
    const name = (c.name || c.display_name || '').toLowerCase().replace(/[\s_\-()$]/g, '');
    if (idx.mes === -1 && name.includes('mes')) idx.mes = i;
    if (idx.tipo === -1 && (name.includes('categoria') || name.includes('tipo') || name.includes('category'))) idx.tipo = i;
    if (idx.cantidad === -1 && name.includes('cantidad')) idx.cantidad = i;
    if (idx.con_iva === -1 && (name.includes('coniva') || name.includes('totalconiva') || name.includes('costoconiva'))) idx.con_iva = i;
    if (idx.sin_iva === -1 && (name.includes('subtotal') || name.includes('siniva') || name.includes('costosin'))) idx.sin_iva = i;
  });
  return idx;
}

// ─── Aggregate rows into schedule ──────────────────────────────────────
function buildSchedule(cols, rows) {
  const idx = detectCols(cols);
  const agg = {};

  for (const row of rows) {
    const mes   = String(row[idx.mes]  ?? '').trim();
    const tipo  = String(row[idx.tipo] ?? '').trim();
    if (!mes || !tipo) continue;

    const key = mes + '::' + tipo;
    if (!agg[key]) {
      agg[key] = { mes, tipo, cantidad: 0, costo_sin_iva: 0, costo_con_iva: 0 };
    }

    const parseNum = v => {
      if (v === null || v === undefined) return 0;
      return parseFloat(String(v).replace(/[,$\s]/g, '')) || 0;
    };

    agg[key].cantidad     += parseNum(row[idx.cantidad]);
    agg[key].costo_sin_iva += parseNum(row[idx.sin_iva]);
    agg[key].costo_con_iva += parseNum(row[idx.con_iva]);
  }

  // Normalise tipo names to TC / TP / Medidor
  const normalizeType = t => {
    const u = t.toUpperCase();
    if (u.startsWith('TC') || u.includes('CORRIENTE')) return 'TC';
    if (u.startsWith('TP') || u.includes('POTENCIAL') || u.includes('TENSION')) return 'TP';
    if (u.includes('MEDIDOR') || u.includes('METER')) return 'Medidor';
    return t; // preserve original if not matched
  };

  return Object.values(agg)
    .map(r => ({ ...r, tipo: normalizeType(r.tipo) }))
    .sort((a, b) => a.mes.localeCompare(b.mes) || a.tipo.localeCompare(b.tipo));
}

// ─── Main fetch with cache ──────────────────────────────────────────────
async function getSchedule(apiKey, cardId) {
  if (cachedSchedule && (Date.now() - cacheTime) < CACHE_TTL_MS) {
    return cachedSchedule;
  }

  const { cols, rows } = await fetchRawRows(apiKey, cardId);
  cachedSchedule = buildSchedule(cols, rows);
  cacheTime = Date.now();
  return cachedSchedule;
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

  const cardId = parseInt(process.env.METABASE_CALIB_CARD || '75406', 10);
  const { type, debug } = req.query;

  try {
    // Debug mode
    if (debug === '1') {
      const { cols, rows } = await fetchRawRows(apiKey, cardId);
      const schedule = buildSchedule(cols, rows);
      return res.status(200).json({
        success: true,
        cardId,
        totalRows: rows.length,
        totalScheduleRows: schedule.length,
        detectedCols: detectCols(cols),
        sampleRaw: rows[0] || null,
        sampleSchedule: schedule[0] || null,
        cacheAgeMs: Date.now() - cacheTime
      });
    }

    const schedule = await getSchedule(apiKey, cardId);

    if (type === 'schedule' || !type) {
      // Optional filters
      const { mes, tipo } = req.query;
      let result = schedule;
      if (mes) result = result.filter(r => r.mes === mes);
      if (tipo) result = result.filter(r => r.tipo === tipo);

      return res.status(200).json({
        success: true,
        count: result.length,
        schedule: result,
        cacheAgeMs: Date.now() - cacheTime
      });
    }

    return res.status(400).json({
      success: false,
      error: 'Parámetro "type" inválido. Usa: type=schedule | debug=1'
    });

  } catch (err) {
    console.error('[Calibraciones Proxy] Error:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Error desconocido al consultar Metabase.'
    });
  }
}
