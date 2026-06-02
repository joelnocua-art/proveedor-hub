/* ═══ Supabase Client — Proveedor Hub ═══ */

const SUPABASE_URL = 'https://fepivzcobbdybztuiyge.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlcGl2emNvYmJkeWJ6dHVpeWdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4ODkxMDMsImV4cCI6MjA4OTQ2NTEwM30.ZwUjlkqiucO3bzLW-Rw4CGUS3N4wsNFrjLl2ZyPa4PU';

// Initialize client (supabase-js loaded via CDN)
let _sb = null;
function getSupabase() {
  if (!_sb && window.supabase) {
    _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  }
  return _sb;
}

// 
// ═══ DATA CACHE ═══
// Load from Supabase once, keep in memory for fast sync access
window._sbData = {
  providers: null,
  skuCatalog: null,
  skuOffers: null,
  quotes: null,
  providerResponses: null,
  adjudications: null,
  salesRequests: null,
  loaded: false
};

async function sbLoadAll() {
  const sb = getSupabase();
  if (!sb) { console.warn('[Supabase] Client not ready'); return false; }

  let errors = [];

  // Fetch all tables concurrently
  try {
    const [
      { data: provs, error: e1 },
      { data: skus, error: e2 },
      { data: offers, error: e3 },
      { data: quotes, error: e4 },
      { data: adjs, error: e5 },
      { data: responses, error: e6 }
    ] = await Promise.all([
      sb.from('providers').select('*').order('empresa'),
      sb.from('sku_catalog').select('*').order('sku'),
      sb.from('sku_offers').select('*'),
      sb.from('quotes').select('*').order('created_at', { ascending: false }),
      sb.from('adjudications').select('*'),
      sb.from('provider_responses').select('*').order('responded_at', { ascending: false })
    ]);

    // 1. Providers
    if (e1) { console.warn('[Supabase] Providers error:', e1); errors.push('providers'); }
    else {
      window._sbData.providers = (provs || []).map(p => ({
        it: String(p.id), empresa: p.empresa || '', rut: p.rut || '', direccion: p.direccion || '',
        categoria: p.categoria || '', estado: p.estado || '', representante: p.representante || '',
        celular_telefono: p.celular_telefono || '', celular: p.celular_telefono || '',
        ciudad: p.ciudad || '', correo_electronico: p.correo_electronico || '', correo: p.correo_electronico || '',
        pagina_web: p.pagina_web || '', catalogo: p.catalogo || '', tiempos_respuesta: p.tiempos_respuesta || '',
        servicios_productos: p.servicios_productos || '', observaciones: p.observaciones || '', _supaId: p.id
      }));
    }

    // 2. SKUs
    if (e2) { console.warn('[Supabase] SKU error:', e2); errors.push('sku_catalog'); }
    else {
      window._sbData.skuCatalog = (skus || []).map(s => ({
        ...s,
        sku: s.sku || s.name // Map legacy front-end expected property
      }));
    }

    // 3. Offers
    if (e3) { console.warn('[Supabase] Offers error:', e3); errors.push('sku_offers'); }
    else {
      const offerMap = {};
      (offers || []).forEach(o => {
        const key = String(o.sku_id);
        if (!offerMap[key]) offerMap[key] = [];
        offerMap[key].push({ provider: o.provider, price_sin_iva: Number(o.price || o.price_sin_iva) || 0 });
      });
      window._sbData.skuOffers = offerMap;
    }

    // 4. Quotes
    if (e4) { console.warn('[Supabase] Quotes error:', e4); errors.push('quotes'); }
    else {
      window._sbData.quotes = (quotes || []).map(q => ({
        it: String(q.id), empresa: q.empresa || '', fecha: q.fecha || '', descripcion: q.descripcion || '',
        und: q.und || 1, pu_sin_iva: Number(q.pu_sin_iva) || 0, pu_con_iva: Number(q.pu_con_iva) || 0,
        ciudad_entrega: q.ciudad_entrega || '', fecha_entrega: q.fecha_entrega || '', observaciones: q.observaciones || '',
        cotizacion_nombre: q.cotizacion_nombre || '', cotizacion_batch: q.cotizacion_batch || '',
        tiempo_entrega_dias: q.tiempo_entrega_dias || 0, garantia_meses: q.garantia_meses || 0,
        condiciones_pago: q.condiciones_pago || '', observaciones_prov: q.observaciones_prov || '',
        fecha_respuesta: q.fecha_respuesta || '', estado_respuesta: q.estado_respuesta || 'pendiente', _supaId: q.id
      }));
    }

    // 5. Adjudications
    if (e5) { console.warn('[Supabase] Adjudications error:', e5); errors.push('adjudications'); }
    else {
      const adjMap = {};
      (adjs || []).forEach(a => { adjMap[a.cotizacion_nombre + '::' + a.sku] = a.provider; });
      window._sbData.adjudications = adjMap;
    }

    // 6. Provider Responses
    if (e6) { console.warn('[Supabase] Responses error:', e6); errors.push('provider_responses'); }
    else window._sbData.providerResponses = responses || [];

  } catch (err) {
    console.warn('[Supabase] Parallel load failed (fatal):', err);
    return false;
  }

  // Always mark as loaded so the app uses whatever Supabase data succeeded
  window._sbData.loaded = true;
  console.log('[Supabase] Data loaded:', window._sbData.providers.length, 'providers,', (window._sbData.skuCatalog||[]).length, 'SKUs,', Object.keys(window._sbData.skuOffers||{}).length, 'SKUs with prices,', (window._sbData.quotes||[]).length, 'quotes,', Object.keys(window._sbData.adjudications||{}).length, 'adjudications');
  if (errors.length) console.warn('[Supabase] Tables that failed to load:', errors.join(', '));
  return true;
}

// ═══ WRITE FUNCTIONS ═══

async function sbInsertQuotes(quotesArray) {
  const sb = getSupabase();
  if (!sb) return false;
  const rows = quotesArray.map(q => ({
    cotizacion_nombre: q.cotizacion_nombre || '',
    cotizacion_batch: q.cotizacion_batch || '',
    empresa: q.empresa || '',
    descripcion: q.descripcion || '',
    und: q.und || 1,
    pu_sin_iva: q.pu_sin_iva || 0,
    pu_con_iva: q.pu_con_iva || 0,
    ciudad_entrega: q.ciudad_entrega || '',
    fecha: q.fecha || '',
    fecha_entrega: q.fecha_entrega || '',
    observaciones: q.observaciones || '',
    estado_respuesta: 'pendiente'
  }));
  const { data, error } = await sb.from('quotes').insert(rows).select();
  if (error) { console.error('[Supabase] Insert quotes error:', error); return false; }
  // Update cache
  if (data) {
    data.forEach(q => {
      window._sbData.quotes.push({
        it: String(q.id), empresa: q.empresa, fecha: q.fecha, descripcion: q.descripcion,
        und: q.und, pu_sin_iva: Number(q.pu_sin_iva), pu_con_iva: Number(q.pu_con_iva),
        ciudad_entrega: q.ciudad_entrega, fecha_entrega: q.fecha_entrega,
        observaciones: q.observaciones, cotizacion_nombre: q.cotizacion_nombre,
        cotizacion_batch: q.cotizacion_batch, estado_respuesta: 'pendiente', _supaId: q.id
      });
    });
  }
  return true;
}

async function sbDeleteQuotesByName(name) {
  const sb = getSupabase();
  if (!sb) return false;
  const { error } = await sb.from('quotes').delete().eq('cotizacion_nombre', name);
  if (error) { console.error('[Supabase] Delete error:', error); return false; }
  window._sbData.quotes = window._sbData.quotes.filter(q => q.cotizacion_nombre !== name);
  return true;
}

async function sbUpdateQuote(supaId, updates) {
  const sb = getSupabase();
  if (!sb) return false;
  const { error } = await sb.from('quotes').update(updates).eq('id', supaId);
  if (error) { console.error('[Supabase] Update quote error:', error); return false; }
  // Update cache
  const q = window._sbData.quotes.find(x => String(x._supaId) === String(supaId));
  if (q) Object.assign(q, updates);
  return true;
}

async function sbInsertProvider(prov) {
  const sb = getSupabase();
  if (!sb) return null;
  // Solo enviar las columnas que existen en la base de datos:
  const row = {
    empresa: prov.empresa || '',
    rut: prov.rut || '',
    direccion: prov.direccion || '',
    categoria: prov.categoria || '',
    estado: prov.estado || '',
    representante: prov.representante || '',
    celular_telefono: prov.celular || prov.celular_telefono || '',
    ciudad: prov.ciudad || '',
    correo_electronico: prov.correo || prov.correo_electronico || '',
    pagina_web: prov.pagina_web || '',
    catalogo: prov.catalogo || '',
    tiempos_respuesta: prov.tiempos_respuesta || '',
    servicios_productos: prov.servicios_productos || '',
    observaciones: prov.observaciones || ''
  };
  const { data, error } = await sb.from('providers').insert([row]).select();
  if (error) { console.error('[Supabase] Insert provider error:', error); return null; }
  if (data && data[0]) {
    const p = data[0];
    const mapped = { it: String(p.id), empresa: p.empresa, rut: p.rut, direccion: p.direccion, categoria: p.categoria, estado: p.estado, representante: p.representante, celular_telefono: p.celular_telefono, celular: p.celular_telefono, ciudad: p.ciudad, correo_electronico: p.correo_electronico, correo: p.correo_electronico, pagina_web: p.pagina_web, catalogo: p.catalogo, tiempos_respuesta: p.tiempos_respuesta, servicios_productos: p.servicios_productos, observaciones: p.observaciones, _supaId: p.id };
    window._sbData.providers.push(mapped);
    return mapped;
  }
  return null;
}

async function sbUpdateProvider(supaId, updates) {
  const sb = getSupabase();
  if (!sb) return false;
  // Extraer unicamente columnas de la base de datos
  const payload = {};
  if (updates.empresa !== undefined) payload.empresa = updates.empresa;
  if (updates.rut !== undefined) payload.rut = updates.rut;
  if (updates.direccion !== undefined) payload.direccion = updates.direccion;
  if (updates.categoria !== undefined) payload.categoria = updates.categoria;
  if (updates.estado !== undefined) payload.estado = updates.estado;
  if (updates.representante !== undefined) payload.representante = updates.representante;
  if (updates.celular !== undefined || updates.celular_telefono !== undefined) payload.celular_telefono = updates.celular_telefono || updates.celular;
  if (updates.ciudad !== undefined) payload.ciudad = updates.ciudad;
  if (updates.correo !== undefined || updates.correo_electronico !== undefined) payload.correo_electronico = updates.correo_electronico || updates.correo;
  if (updates.pagina_web !== undefined) payload.pagina_web = updates.pagina_web;
  if (updates.catalogo !== undefined) payload.catalogo = updates.catalogo;
  if (updates.tiempos_respuesta !== undefined) payload.tiempos_respuesta = updates.tiempos_respuesta;
  if (updates.servicios_productos !== undefined) payload.servicios_productos = updates.servicios_productos;
  if (updates.observaciones !== undefined) payload.observaciones = updates.observaciones;

  const { error } = await sb.from('providers').update(payload).eq('id', supaId);
  if (error) { console.error('[Supabase] Update provider error:', error); return false; }
  const p = window._sbData.providers.find(x => String(x._supaId) === String(supaId));
  if (p) {
    Object.assign(p, updates);
    if (updates.correo_electronico) p.correo = updates.correo_electronico;
    if (updates.celular_telefono) p.celular = updates.celular_telefono;
  }
  return true;
}

async function sbDeleteProvider(supaId) {
  const sb = getSupabase();
  if (!sb) return false;
  const { error } = await sb.from('providers').delete().eq('id', supaId);
  if (error) { console.error('[Supabase] Delete provider error:', error); return false; }
  window._sbData.providers = window._sbData.providers.filter(x => String(x._supaId) !== String(supaId));
  return true;
}

async function sbSetAdjudication(nombre, sku, provider) {
  const sb = getSupabase();
  if (!sb) return false;
  const { error } = await sb.from('adjudications').upsert({ cotizacion_nombre: nombre, sku: sku, provider: provider }, { onConflict: 'cotizacion_nombre,sku' });
  if (error) { console.error('[Supabase] Adjudication error:', error); return false; }
  // Update cache
  if (!window._sbData.adjudications) window._sbData.adjudications = {};
  window._sbData.adjudications[nombre + '::' + sku] = provider;
  return true;
}

async function sbGetAdjudications() {
  const sb = getSupabase();
  if (!sb) return {};
  const { data, error } = await sb.from('adjudications').select('*');
  if (error) return {};
  const map = {};
  (data || []).forEach(a => { map[a.cotizacion_nombre + '::' + a.sku] = a.provider; });
  return map;
}

async function sbUpsertOffer(skuId, provider, price_sin_iva) {
  const sb = getSupabase();
  if (!sb) return { success: false, errorMsg: 'Supabase no inicializado' };
  const { error } = await sb.from('sku_offers').upsert({ sku_id: skuId, provider, price: price_sin_iva }, { onConflict: 'sku_id,provider' });
  if (error) {
    console.error('[Supabase] Offer upsert error:', error);
    return { success: false, errorMsg: error.message || JSON.stringify(error) };
  }
  // Verify the row actually persisted (RLS can silently block writes with no error)
  const { data: check } = await sb.from('sku_offers').select('sku_id').eq('sku_id', skuId).eq('provider', provider).limit(1);
  if (!check || check.length === 0) {
    console.error('[Supabase] Offer NOT found after upsert — likely RLS blocking write. skuId:', skuId, 'provider:', provider);
    return { success: false, errorMsg: 'El precio no se guardó (permisos de base de datos bloqueando escritura). Ejecuta el SQL de permisos.' };
  }
  // Update cache (use String keys to match catalog IDs)
  const cacheKey = String(skuId);
  if (!window._sbData.skuOffers) window._sbData.skuOffers = {};
  if (!window._sbData.skuOffers[cacheKey]) window._sbData.skuOffers[cacheKey] = [];
  const list = window._sbData.skuOffers[cacheKey];
  const idx = list.findIndex(o => o.provider === provider);
  if (idx >= 0) list[idx].price_sin_iva = price_sin_iva;
  else list.push({ provider, price_sin_iva });
  return { success: true };
}

async function sbDeleteOffer(skuId, provider) {
  const sb = getSupabase();
  if (!sb) return { success: false };
  const { error } = await sb.from('sku_offers').delete().eq('sku_id', skuId).eq('provider', provider);
  if (error) { console.error('[Supabase] Offer delete error:', error); return { success: false }; }
  // Update cache (use String keys)
  const cacheKey = String(skuId);
  if (window._sbData.skuOffers && window._sbData.skuOffers[cacheKey]) {
    window._sbData.skuOffers[cacheKey] = window._sbData.skuOffers[cacheKey].filter(o => o.provider !== provider);
  }
  return { success: true };
}

// ═══ AUTH ═══
async function sbSubmitProviderResponse(batch, providerName, itemsData, conds) {
  const sb = getSupabase();
  if (!sb) return { ok: false, lastError: 'Supabase client no inicializado. La librería de base de datos no cargó.' };
  
  const insertList = itemsData.map(it => ({
    batch: batch || 'LEGACY_BATCH',
    provider: providerName || 'Desconocido',
    sku: it.sku || 'SKU Desconocido',
    price_sin_iva: it.price_sin_iva,
    price_con_iva: it.price_con_iva,
    delivery_days: it.delivery_days || conds.delivery_days || 0,
    warranty_months: conds.warranty_months,
    payment_terms: conds.payment_terms,
    notes: conds.notes,
    responded_at: conds.responded_at
  }));

  const { error } = await sb.from('provider_responses').insert(insertList);
  
  if (error) {
    console.error('[Supabase] provider_responses insert error:', error);
    return { ok: false, lastError: error.message || JSON.stringify(error) };
  }
  
  return { ok: true, lastError: null };
}

// ═══ AUTH ═══
async function sbGetUser() {
  const sb = getSupabase();
  if (!sb) return null;
  const { data } = await sb.auth.getUser();
  return data?.user || null;
}

async function sbSignIn(email, password) {
  const sb = getSupabase();
  if (!sb) return { error: 'Supabase not ready' };
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  return { data, error };
}

async function sbSignUp(email, password, fullName) {
  const sb = getSupabase();
  if (!sb) return { error: 'Supabase not ready' };
  const { data, error } = await sb.auth.signUp({ email, password, options: { data: { full_name: fullName } } });
  return { data, error };
}

async function sbGetProfile() {
  const sb = getSupabase();
  if (!sb) return null;
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return null;
  const { data, error } = await sb.from('profiles').select('*').eq('id', user.id).single();
  if (error || !data) return null;
  return data;
}

async function sbSignOut() {
  const sb = getSupabase();
  if (!sb) return;
  sessionStorage.removeItem('userRole');
  await sb.auth.signOut();
  window.location.href = 'index.html';
}

// Public API used by the login button (Google OAuth)
async function loginWithGoogle() {
  const sb = getSupabase();
  if (!sb || !sb.auth) {
    if (typeof showToast === 'function') {
      showToast('Error al iniciar con Google: Supabase no está listo', 'error');
    } else if (typeof alert === 'function') {
      alert('Error al iniciar con Google: Supabase no está listo');
    }
    return;
  }

  const { error } = await sb.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin
    }
  });
  if (error) {
    const msg = 'Error al iniciar con Google: ' + (error.message || String(error));
    if (typeof showToast === 'function') showToast(msg, 'error');
    else if (typeof alert === 'function') alert(msg);
  }
}

// ═══ SALES (Venta de Activos) ═══════════════════════════════════════════
//
// Tablas: sales_requests + sales_request_items
// Schema: ver /sql/sales_tables.sql

// Carga todas las solicitudes con sus items asociados.
// Devuelve un array plano de objetos compatibles con SALES_DATA del frontend.
async function sbLoadSales() {
  const sb = getSupabase();
  if (!sb) return [];
  const { data: requests, error } = await sb
    .from('sales_requests')
    .select('*, items:sales_request_items(*)')
    .order('created_at', { ascending: false });
  if (error) {
    console.warn('[Supabase] Sales load error:', error.message);
    return [];
  }
  const mapped = (requests || []).map(r => ({
    _supaId:    r.id,
    num:        r.numero,
    codigo_bia: r.cliente_codigo_bia || '',
    cliente:    r.cliente_razon_social || '',
    nit:        r.cliente_nit || '',
    rep:        r.cliente_rep || '',
    email:      r.cliente_email || '',
    telefono:   r.cliente_telefono || '',
    operador_red: r.cliente_operador_red || '',
    tipo_contrato: r.tipo_contrato || '',
    equipos:    (r.items || []).length,
    valor:      Number(r.valor_total) || 0,
    status:     r.status || 'cotizacion_generada',
    fecha:      r.fecha_cotizacion || (r.created_at ? r.created_at.split('T')[0] : ''),
    observaciones: r.observaciones || '',
    vigencia_dias: r.vigencia_dias || 30,
    items:      r.items || [],
    created_at: r.created_at,
    signed_quote_url: r.signed_quote_url || null,
    signed_at:  r.signed_at || null,
    signed_by:  r.signed_by || null,
    invoice_url:    r.invoice_url || null,
    invoice_number: r.invoice_number || null,
    invoice_at:     r.invoice_at || null,
    invoice_by:     r.invoice_by || null,
    payment_proof_url: r.payment_proof_url || null,
    payment_at:     r.payment_at || null,
    payment_by:     r.payment_by || null,
    dispatch_at:    r.dispatch_at || null,
    dispatch_by:    r.dispatch_by || null
  }));
  window._sbData.salesRequests = mapped;
  return mapped;
}

// Genera el siguiente número de solicitud: VTA-YYYY-NNN (NNN secuencial por año)
async function sbNextSalesNumber() {
  const sb = getSupabase();
  if (!sb) return 'VTA-' + new Date().getFullYear() + '-001';
  const year = new Date().getFullYear();
  const prefix = 'VTA-' + year + '-';
  const { data, error } = await sb
    .from('sales_requests')
    .select('numero')
    .like('numero', prefix + '%')
    .order('numero', { ascending: false })
    .limit(1);
  if (error || !data || data.length === 0) return prefix + '001';
  const last = data[0].numero;
  const lastN = parseInt(last.slice(prefix.length), 10) || 0;
  return prefix + String(lastN + 1).padStart(3, '0');
}

// Inserta una solicitud + sus items. Devuelve { ok, error, sale } con el objeto creado.
async function sbInsertSale(sale) {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Supabase no inicializado' };

  const numero = sale.numero || await sbNextSalesNumber();

  const requestRow = {
    numero,
    cliente_codigo_bia:   sale.codigo_bia || null,
    cliente_razon_social: sale.cliente || '',
    cliente_nit:          sale.nit || null,
    cliente_rep:          sale.rep || null,
    cliente_email:        sale.email || null,
    cliente_telefono:     sale.telefono || null,
    cliente_operador_red: sale.operador_red || null,
    tipo_contrato:        sale.tipo_contrato || null,
    valor_total:          Number(sale.valor) || 0,
    observaciones:        sale.observaciones || null,
    vigencia_dias:        sale.vigencia_dias || 30,
    fecha_cotizacion:     sale.fecha || new Date().toISOString().slice(0, 10),
    status:               sale.status || 'cotizacion_generada',
    created_by:           sale.created_by || null
  };

  const { data: created, error: reqErr } = await sb
    .from('sales_requests')
    .insert([requestRow])
    .select()
    .single();

  if (reqErr) {
    console.error('[Supabase] Insert sales_request error:', reqErr);
    return { ok: false, error: reqErr.message || 'Error al guardar la solicitud' };
  }

  // Insertar items asociados
  if (sale.items && sale.items.length > 0) {
    const itemRows = sale.items.map(it => ({
      sales_request_id: created.id,
      nombre_sku:    it.nombre_sku || '',
      serial:        it.serial || null,
      marca:         it.marca || null,
      modelo:        it.modelo || null,
      precio_base:   Number(it.precio_base) || 0,
      margen_pct:    Number(it.margen_pct) || 0,
      cantidad:      Number(it.cantidad) || 1,
      ciudad:        it.ciudad || null,
      frontera:      it.frontera || null,
      estado_equipo: it.estado || null
    }));
    const { error: itemsErr } = await sb.from('sales_request_items').insert(itemRows);
    if (itemsErr) {
      console.error('[Supabase] Insert sales items error:', itemsErr);
      // Rollback manual: borrar la request creada
      await sb.from('sales_requests').delete().eq('id', created.id);
      return { ok: false, error: 'Error al guardar los equipos: ' + (itemsErr.message || 'desconocido') };
    }
  }

  return { ok: true, sale: created };
}

// Elimina una solicitud (los items se borran en cascada por ON DELETE CASCADE)
async function sbDeleteSale(supaId) {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Supabase no inicializado' };
  const { error } = await sb.from('sales_requests').delete().eq('id', supaId);
  if (error) {
    console.error('[Supabase] Delete sale error:', error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

// Actualiza el status de una solicitud
async function sbUpdateSaleStatus(saleId, newStatus) {
  const sb = getSupabase();
  if (!sb) return { ok: false };
  const { error } = await sb
    .from('sales_requests')
    .update({ status: newStatus })
    .eq('id', saleId);
  if (error) {
    console.error('[Supabase] Update sale status error:', error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

// Sube el PDF firmado al bucket de Storage y devuelve la URL pública
async function sbUploadSignedQuote(supaId, num, file) {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Supabase no inicializado' };
  const path = `${num}/${Date.now()}.pdf`;
  const { data, error } = await sb.storage
    .from('cotizaciones-firmadas')
    .upload(path, file, { contentType: 'application/pdf', upsert: true });
  if (error) {
    console.error('[Supabase] Upload signed quote error:', error);
    return { ok: false, error: error.message };
  }
  const { data: urlData } = sb.storage
    .from('cotizaciones-firmadas')
    .getPublicUrl(data.path);
  return { ok: true, url: urlData.publicUrl };
}

// Marca la solicitud como firmada: status, URL del PDF, fecha y quien procesó
async function sbMarkAsSigned(supaId, signedBy, pdfUrl) {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Supabase no inicializado' };
  const { error } = await sb.from('sales_requests').update({
    status:           'firmada',
    signed_quote_url: pdfUrl || null,
    signed_at:        new Date().toISOString(),
    signed_by:        signedBy || null
  }).eq('id', supaId);
  if (error) {
    console.error('[Supabase] Mark as signed error:', error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

// Sube el PDF de la factura emitida al bucket de Storage y devuelve la URL pública
async function sbUploadInvoice(supaId, num, file) {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Supabase no inicializado' };
  const path = `${num}/${Date.now()}.pdf`;
  const { data, error } = await sb.storage
    .from('facturas-emitidas')
    .upload(path, file, { contentType: 'application/pdf', upsert: true });
  if (error) {
    console.error('[Supabase] Upload invoice error:', error);
    return { ok: false, error: error.message };
  }
  const { data: urlData } = sb.storage
    .from('facturas-emitidas')
    .getPublicUrl(data.path);
  return { ok: true, url: urlData.publicUrl };
}

// Marca la solicitud como factura emitida: status, URL del PDF, número, fecha y quién registró
async function sbMarkInvoiceEmitted(supaId, invoiceBy, pdfUrl, invoiceNumber) {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Supabase no inicializado' };
  const { error } = await sb.from('sales_requests').update({
    status:         'factura_emitida',
    invoice_url:    pdfUrl || null,
    invoice_number: invoiceNumber || null,
    invoice_at:     new Date().toISOString(),
    invoice_by:     invoiceBy || null
  }).eq('id', supaId);
  if (error) {
    console.error('[Supabase] Mark invoice emitted error:', error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

// Sube el PDF del comprobante de pago al bucket comprobantes-pago
async function sbUploadPaymentProof(supaId, num, file) {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Supabase no inicializado' };
  const path = `${num}/${Date.now()}.pdf`;
  const { data, error } = await sb.storage
    .from('comprobantes-pago')
    .upload(path, file, { contentType: 'application/pdf', upsert: true });
  if (error) {
    console.error('[Supabase] Upload payment proof error:', error);
    return { ok: false, error: error.message };
  }
  const { data: urlData } = sb.storage
    .from('comprobantes-pago')
    .getPublicUrl(data.path);
  return { ok: true, url: urlData.publicUrl };
}

// Marca la solicitud como pagada
async function sbMarkAsPaid(supaId, paymentBy, pdfUrl) {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Supabase no inicializado' };
  const { error } = await sb.from('sales_requests').update({
    status:            'pagada',
    payment_proof_url: pdfUrl || null,
    payment_at:        new Date().toISOString(),
    payment_by:        paymentBy || null
  }).eq('id', supaId);
  if (error) {
    console.error('[Supabase] Mark as paid error:', error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

// Marca la solicitud como despachada (cerrada)
async function sbMarkAsDispatched(supaId, dispatchBy) {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Supabase no inicializado' };
  const { error } = await sb.from('sales_requests').update({
    status:       'cerrada',
    dispatch_at:  new Date().toISOString(),
    dispatch_by:  dispatchBy || null
  }).eq('id', supaId);
  if (error) {
    console.error('[Supabase] Mark as dispatched error:', error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

console.log('[Supabase] Client module loaded');
