/* ═══ Metabase Proxy — Proveedor Hub ═══
 * Vercel Serverless Function que actúa como intermediario seguro
 * entre el browser y la API de Metabase.
 *
 * Variables de entorno requeridas en Vercel:
 *   METABASE_API_KEY  — la API key generada en Metabase
 *
 * Endpoints:
 *   GET /api/metabase-proxy?type=clients&q=<búsqueda>
 *     → Devuelve clientes (sedes) únicos. q puede ser código BIA o razón social.
 *
 *   GET /api/metabase-proxy?type=companies&q=<búsqueda>
 *     → Agrupa por razón social y devuelve las sedes de cada empresa, para
 *       poder cotizar varias sedes de la misma compañía de una sola vez.
 *
 *   GET /api/metabase-proxy?type=equipment&codigo_bia=<código[,código2,...]>
 *     → Devuelve todos los equipos del cliente (acepta varias sedes).
 *
 *   GET /api/metabase-proxy?debug=1
 *     → Devuelve metadata del dataset (cardId, totalRows, sample, etc.)
 *
 *   GET /api/metabase-proxy?debug=1&raw=<término>
 *     → Busca <término> en TODAS las columnas originales de la card
 *       (sin pasar por pick()/normalizeRow). Útil para diagnosticar
 *       si un código BIA existe en la card pero con otro nombre de
 *       columna, o si simplemente no está en el dataset filtrado.
 *
 * Fuente: Dashboard 11584, tab 12706 (Asignadas-Instaladas).
 * Usa el endpoint /query/json (export) que NO tiene límite de 2000 filas.
 */

import { getAssetOwnership } from '../data/asset-ownership.mjs';

const METABASE_URL = 'https://bia.metabaseapp.com';
const DASHBOARD_ID = 11584;
const TAB_ID = 12706;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutos

let cachedCardId = null;
let cachedRows = null;
let cachedRawRecords = null;
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

// Nombres de columna confirmados vía /api/card/:id/query/json (export) —
// las columnas que vienen de una tabla unida (join) en la card 51119
// se exportan con el nombre de la tabla de origen antepuesto, ej.
// "Activacion Global - codigo_bia → Razon Social De La Empresa".
function normalizeRow(r) {
  const serial = pick(r, ['serial', 'Serial']);
  return {
    // 'RENTEK' | 'BIA' | null — quién es dueño del activo. Los equipos
    // Rentek NO se pueden vender (ver data/asset-ownership.mjs).
    propiedad:         getAssetOwnership(serial),
    codigo_bia:        pick(r, ['Código BIA- Final', 'codigo_bia', 'Código BIA', 'code_bia', 'bia_code']),
    razon_social:      pick(r, ['Activacion Global - codigo_bia → Razon Social De La Empresa', 'razon_social_de_la_empresa', 'Razón social', 'razon_social']),
    operador_red:      pick(r, ['Activacion Global - codigo_bia → Operador De Red', 'operador_de_red', 'Operador de Red', 'operador_red']),
    nombre_sku:        pick(r, ['nombre_sku', 'Nombre SKU', 'sku']),
    serial:            serial,
    marca:             pick(r, ['brand', 'Marca', 'marca']),
    modelo:            pick(r, ['model', 'Modelo', 'modelo']),
    precio_unitario:   Number(pick(r, ["Precios SKU's - nombre_sku → precio_sheet", 'precio_sheet', 'Precio unitario', 'precio_unitario'])) || 0,
    estado:            pick(r, ['state', 'Estado', 'estado', 'Estado Contrato']),
    ciudad:            pick(r, ['ciudad', 'Ciudad']),
    frontera:          pick(r, ['nombre_de_la_frontera', 'Nombre De La Frontera']),
    titulo:            pick(r, ['titulo', 'Titulo']),
    propiedad_activos: pick(r, ['Bd Telemedida - Codigo Interno Odoobia → Propiedad De Activos', 'Propiedad de Activos']),
    fecha_instalacion: pick(r, ['Bd Telemedida - Codigo Interno Odoobia → Fecha Instalación (mm/dd/yyyy)', 'Fecha Instalación\n(MM/DD/YYYY)', 'Fecha de instalación', 'fecha_instalacion']),
    fecha_ingreso:     pick(r, ['Bd Telemedida - Codigo Interno Odoobia → Fecha Ingreso (mm/dd/aa)', 'Fecha \nIngreso\n(mm/dd/aa)', 'Fecha de ingreso']),
    fecha_retiro:      pick(r, ['Bd Telemedida - Codigo Interno Odoobia → Fecha Retiro (mm/dd/aa)', 'Fecha Retiro \n(mm/dd/aa)', 'Fecha de retiro'])
  };
}

// ─── Helper: ¿la fila coincide con el término buscado? ─────────────────
// Se busca por código BIA (CO0100...) y por razón social, porque el
// vendedor casi siempre conoce el nombre de la empresa, no el código.
function matchesClient(row, searchQuery) {
  const codigo = String(row.codigo_bia || '').toLowerCase();
  const razon  = String(row.razon_social || '').toLowerCase();
  return codigo.includes(searchQuery) || razon.includes(searchQuery);
}

// ─── Helper: deduplicar equipos — la card 51119 repite cada fila por un
// join que hace fan-out (mismo equipo, misma info, aparece 2 veces) ────────
function dedupeEquipment(list) {
  const seen = new Set();
  const result = [];
  for (const item of list) {
    const key = [item.codigo_bia, item.nombre_sku, item.serial].join('|');
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }
  return result;
}

// ─── Helper: convertir formato cols+rows a lista de objetos con nombre ────
function rowsToRecords(cols, rows) {
  return rows.map(rowArr => {
    const obj = {};
    cols.forEach((c, idx) => {
      if (c.name) obj[c.name] = rowArr[idx];
      if (c.display_name && obj[c.display_name] === undefined) obj[c.display_name] = rowArr[idx];
    });
    return obj;
  });
}

// ─── Fetch todas las filas — bypassea el límite de 2000 filas ─────────────
//
// Estrategia principal: el endpoint de exportación /query/json ejecuta la
// card sin el límite por defecto de 2000 filas ("bare rows") que sí aplica
// /api/card/:id/query y /api/dataset. Si por lo que sea no está disponible
// (permisos, versión de Metabase), caemos a los métodos anteriores — pero
// esos SIEMPRE devuelven máximo 2000 filas, así que un código que exista
// más allá de esa ventana no aparecerá.
async function fetchAllRows(apiKey) {
  if (cachedRows && (Date.now() - cacheTime) < CACHE_TTL_MS) {
    return cachedRows;
  }

  const cardId = await discoverCardId(apiKey);
  let records = null;

  // Intento 1: endpoint de exportación (sin límite de 2000 filas)
  try {
    const resp = await fetch(`${METABASE_URL}/api/card/${cardId}/query/json`, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({})
    });
    if (resp.ok) {
      const data = await resp.json();
      if (Array.isArray(data) && data.length > 0) records = data;
    }
  } catch (_) { /* fallback abajo */ }

  // Intento 2 (fallback): dataset con constraints altos
  if (!records) {
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
            const cols = dsResult.data?.cols || [];
            const rows = dsResult.data?.rows || [];
            if (rows.length > 0) records = rowsToRecords(cols, rows);
          }
        }
      }
    } catch (_) { /* fallback abajo */ }
  }

  // Intento 3 (último fallback): query estándar del card (max 2000 filas)
  if (!records) {
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
    records = rowsToRecords(result.data?.cols || [], result.data?.rows || []);
  }

  cachedRows = records.map(normalizeRow);
  cachedRawRecords = records;
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

      // Búsqueda cruda: ?debug=1&raw=<término> busca en TODAS las columnas
      // originales (antes de pick()), para detectar mismatches de nombre
      // de columna o filas excluidas por el filtro propio de la card.
      const rawTerm = (req.query.raw || '').toString().trim().toLowerCase();
      if (rawTerm) {
        const records = cachedRawRecords || [];
        const matches = [];
        for (const record of records) {
          const hasMatch = Object.values(record).some(v => String(v ?? '').toLowerCase().includes(rawTerm));
          if (hasMatch) {
            matches.push(record);
            if (matches.length >= 10) break;
          }
        }
        return res.status(200).json({
          success: true,
          cardId,
          totalRows: rows.length,
          rawColumnNames: records[0] ? Object.keys(records[0]) : [],
          rawSearchTerm: rawTerm,
          rawMatchCount: matches.length,
          rawMatches: matches
        });
      }

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

    // ── Clientes (sedes) únicos — busca por código BIA o razón social ──
    if (type === 'clients') {
      const searchQuery = (q || '').toLowerCase().trim();
      const seen = new Set();
      const clients = [];

      for (const row of rows) {
        if (!row.codigo_bia) continue;
        if (seen.has(row.codigo_bia)) continue;

        if (searchQuery && !matchesClient(row, searchQuery)) continue;

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

    // ── Empresas con sus sedes — para cotizar varias sedes de una compañía ──
    // Agrupa por razón social; cada sede es un código BIA con su conteo de
    // equipos y cuántos de ellos son Rentek (no vendibles).
    if (type === 'companies') {
      const searchQuery = (q || '').toLowerCase().trim();
      const companies = new Map();

      for (const row of rows) {
        if (!row.codigo_bia) continue;
        if (searchQuery && !matchesClient(row, searchQuery)) continue;

        // Sin razón social la sede se muestra bajo su propio código.
        const razonSocial = (row.razon_social || '').trim();
        const key = razonSocial.toLowerCase() || `__sin_nombre__${row.codigo_bia}`;

        if (!companies.has(key)) {
          companies.set(key, { razon_social: razonSocial, sedes: new Map() });
        }
        const company = companies.get(key);
        if (!company.razon_social && razonSocial) company.razon_social = razonSocial;

        if (!company.sedes.has(row.codigo_bia)) {
          company.sedes.set(row.codigo_bia, {
            codigo_bia:   row.codigo_bia,
            operador_red: row.operador_red || '',
            // La card repite filas por el fan-out del join, así que los
            // equipos se cuentan por clave única, no por fila.
            vistos:       new Set(),
            rentek:       new Set()
          });
        }
        const sede = company.sedes.get(row.codigo_bia);
        const equipoKey = [row.nombre_sku, row.serial].join('|');
        sede.vistos.add(equipoKey);
        if (row.propiedad === 'RENTEK') sede.rentek.add(equipoKey);
      }

      const result = Array.from(companies.values())
        .map(c => ({
          razon_social: c.razon_social,
          total_sedes:  c.sedes.size,
          sedes: Array.from(c.sedes.values())
            .map(s => ({
              codigo_bia:     s.codigo_bia,
              operador_red:   s.operador_red,
              equipos:        s.vistos.size,
              equipos_rentek: s.rentek.size
            }))
            .sort((a, b) => String(a.codigo_bia).localeCompare(String(b.codigo_bia)))
        }))
        .sort((a, b) => String(a.razon_social).localeCompare(String(b.razon_social)));

      return res.status(200).json({
        success: true,
        count: result.length,
        companies: result.slice(0, 20)
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

      // Acepta varias sedes separadas por coma: codigo_bia=CO01...,CO05...
      const targetCodes = new Set(
        codigo_bia.split(',').map(c => c.trim()).filter(Boolean)
      );
      const equipment = dedupeEquipment(rows
        .filter(r => targetCodes.has((r.codigo_bia || '').trim()))
        .map(r => ({
          codigo_bia:        r.codigo_bia,
          propiedad:         r.propiedad,
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
        })));

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
      const equipment = dedupeEquipment(rows
        .filter(r => String(r.serial || '').toLowerCase().includes(term))
        .map(r => ({
          codigo_bia:        r.codigo_bia,
          propiedad:         r.propiedad,
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
        }))).slice(0, 30);

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
