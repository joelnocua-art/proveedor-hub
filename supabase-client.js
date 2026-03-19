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
  loaded: false
};

async function sbLoadAll() {
  const sb = getSupabase();
  if (!sb) { console.warn('[Supabase] Client not ready'); return false; }

  try {
    // Load providers
    const { data: provs, error: e1 } = await sb.from('providers').select('*').order('empresa');
    if (e1) throw e1;
    window._sbData.providers = (provs || []).map(p => ({
      it: String(p.id),
      empresa: p.empresa || '',
      rut: p.rut || '',
      direccion: p.direccion || '',
      categoria: p.categoria || '',
      estado: p.estado || '',
      representante: p.representante || '',
      celular_telefono: p.celular_telefono || '',
      celular: p.celular_telefono || '',
      ciudad: p.ciudad || '',
      correo_electronico: p.correo_electronico || '',
      correo: p.correo_electronico || '',
      pagina_web: p.pagina_web || '',
      catalogo: p.catalogo || '',
      tiempos_respuesta: p.tiempos_respuesta || '',
      servicios_productos: p.servicios_productos || '',
      observaciones: p.observaciones || '',
      _supaId: p.id
    }));

    // Load SKU catalog
    const { data: skus, error: e2 } = await sb.from('sku_catalog').select('*').order('sku');
    if (e2) throw e2;
    window._sbData.skuCatalog = skus || [];

    // Load offers
    const { data: offers, error: e3 } = await sb.from('sku_offers').select('*');
    if (e3) throw e3;
    // Group by sku_id
    const offerMap = {};
    (offers || []).forEach(o => {
      if (!offerMap[o.sku_id]) offerMap[o.sku_id] = [];
      offerMap[o.sku_id].push({ provider: o.provider, price_sin_iva: Number(o.price_sin_iva) || 0 });
    });
    window._sbData.skuOffers = offerMap;

    // Load quotes
    const { data: quotes, error: e4 } = await sb.from('quotes').select('*').order('created_at', { ascending: false });
    if (e4) throw e4;
    window._sbData.quotes = (quotes || []).map(q => ({
      it: String(q.id),
      empresa: q.empresa || '',
      fecha: q.fecha || '',
      descripcion: q.descripcion || '',
      und: q.und || 1,
      pu_sin_iva: Number(q.pu_sin_iva) || 0,
      pu_con_iva: Number(q.pu_con_iva) || 0,
      ciudad_entrega: q.ciudad_entrega || '',
      fecha_entrega: q.fecha_entrega || '',
      observaciones: q.observaciones || '',
      cotizacion_nombre: q.cotizacion_nombre || '',
      cotizacion_batch: q.cotizacion_batch || '',
      tiempo_entrega_dias: q.tiempo_entrega_dias || 0,
      garantia_meses: q.garantia_meses || 0,
      condiciones_pago: q.condiciones_pago || '',
      observaciones_prov: q.observaciones_prov || '',
      fecha_respuesta: q.fecha_respuesta || '',
      estado_respuesta: q.estado_respuesta || 'pendiente',
      _supaId: q.id
    }));

    window._sbData.loaded = true;
    console.log('[Supabase] Data loaded:', window._sbData.providers.length, 'providers,', window._sbData.skuCatalog.length, 'SKUs,', Object.keys(window._sbData.skuOffers).length, 'SKUs with prices,', window._sbData.quotes.length, 'quotes');
    return true;
  } catch(err) {
    console.error('[Supabase] Load error:', err);
    return false;
  }
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
  const { data, error } = await sb.from('providers').insert([prov]).select();
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
  const { error } = await sb.from('providers').update(updates).eq('id', supaId);
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

async function sbSignOut() {
  const sb = getSupabase();
  if (!sb) return;
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

console.log('[Supabase] Client module loaded');
