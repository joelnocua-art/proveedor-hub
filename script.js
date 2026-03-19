/*
  Proveedor Hub (static prototype)
  - Auth simulation via localStorage
  - Provider + quote management via in-memory base + localStorage for additions
  - Dashboard UI: sidebar + cards + modals
*/


// ── Toast notifications ────────────────────────────────────────────────────
function showToast(msg, durationOrType = 3000) {
  // durationOrType: number = duration ms, string = type ('success','error','info')
  const duration = typeof durationOrType === 'number' ? durationOrType : 3000;
  const type = typeof durationOrType === 'string' ? durationOrType : 'success';
  document.querySelectorAll('.hub-toast').forEach(t => t.remove());
  const t = document.createElement('div');
  t.className = 'hub-toast';
  t.textContent = msg;
  const color = type === 'error' ? 'rgba(220,53,69,0.92)' : type === 'info' ? 'rgba(91,107,255,0.92)' : 'rgba(0,180,100,0.92)';
  const border = type === 'error' ? 'rgba(255,80,100,0.4)' : type === 'info' ? 'rgba(120,130,255,0.4)' : 'rgba(0,220,120,0.4)';
  t.style.cssText = `position:fixed;bottom:28px;right:28px;z-index:9999;padding:14px 22px;border-radius:12px;
    font-size:14px;font-weight:500;color:#fff;backdrop-filter:blur(14px);
    box-shadow:0 8px 28px rgba(0,0,0,0.5);border:1px solid ${border};background:${color};
    animation:hubToastIn .25s ease;`;
  if (!document.getElementById('hub-toast-style')) {
    const s = document.createElement('style');
    s.id = 'hub-toast-style';
    s.textContent = '@keyframes hubToastIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}';
    document.head.appendChild(s);
  }
  document.body.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; setTimeout(() => t.remove(), 300); }, duration);
}

// ------------------------
// Auth
// ------------------------

function registerUser() {
  const name = document.getElementById('reg-name')?.value?.trim() || 'Usuario';
  const email = document.getElementById('reg-email')?.value?.trim();
  const password = document.getElementById('reg-password')?.value;

  if (!email || !password) {
    alert('Por favor completa el correo y la contraseña.');
    return;
  }

  localStorage.setItem('registeredUser', JSON.stringify({ name, email, password }));
  localStorage.setItem('currentUser', JSON.stringify({ name, email }));
  window.location.href = 'home.html';
}

function logout() {
  localStorage.removeItem('currentUser');
  if (typeof sbSignOut === 'function') { sbSignOut(); return; }
  window.location.href = 'index.html';
}

function checkLogin() {
  const user = localStorage.getItem('currentUser');
  const page = document.body?.dataset?.page || '';
  const pagePath = (window.location.pathname.split('/').pop() || '').toLowerCase();

  // Auth pages: login and register (check both data-page and pathname for flexibility)
  const isAuthPage = page === 'login' || page === 'register' 
    || pagePath === '' || pagePath === 'index' || pagePath === 'index.html' 
    || pagePath === 'register' || pagePath === 'register.html';

  // Public page: respuesta.html (provider response form)
  const isPublicPage = page === 'respuesta' || pagePath === 'respuesta' || pagePath === 'respuesta.html';

  if (isPublicPage) return; // No auth required

  if (!user && !isAuthPage) {
    window.location.href = 'index.html';
    return;
  }

  if (user && isAuthPage) {
    window.location.href = 'home.html';
    return;
  }
}

// ------------------------
// Layout helpers
// ------------------------

function toggleSidebar(forceOpen) {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const shell = document.querySelector('.app-shell');
  if (!sidebar || !shell) return;

  const isMobile = window.matchMedia('(max-width: 900px)').matches;

  // Mobile: overlay drawer
  if (isMobile) {
    if (!overlay) return;
    const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : !sidebar.classList.contains('open');
    if (shouldOpen) {
      sidebar.classList.add('open');
      overlay.classList.add('open');
    } else {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
    }
    return;
  }

  // Desktop: hide/show entire sidebar column
  const currentlyHidden = shell.classList.contains('sidebar-hidden');
  // If `forceOpen` is provided it means: true = show, false = hide.
  // Otherwise, toggle current state.
  const shouldShow = typeof forceOpen === 'boolean' ? forceOpen : currentlyHidden;
  shell.classList.toggle('sidebar-hidden', !shouldShow);
  // We intentionally do NOT toggle a dedicated class on the sidebar itself,
  // because some pages can end up with layout bleed (children overflowing)
  // when only the grid column is collapsed. CSS handles the sidebar hiding
  // via `.app-shell.sidebar-hidden .sidebar { ... }`.
  sidebar.classList.remove('open');
  overlay?.classList.remove('open');
}

function setActiveNav() {
  const page = document.body?.getAttribute('data-page');
  const links = document.querySelectorAll('.nav a[data-nav]');
  if (!page || !links.length) return;

  links.forEach((a) => {
    const key = a.getAttribute('data-nav');
    if (key === page) a.classList.add('active');
    else a.classList.remove('active');
  });
}

function renderUserChip() {
  const el = document.getElementById('userChip');
  if (!el) return;

  const user = safeJsonParse(localStorage.getItem('currentUser'));
  if (!user) {
    el.innerHTML = '';
    return;
  }

  const displayName = String(user.name || user.email || 'Usuario');
  const displayEmail = String(user.email || '');
  const initial = displayName.trim().charAt(0).toUpperCase() || 'U';

  const avatarHtml = user.avatar
    ? `<img src="${escapeHtml(String(user.avatar))}" style="width:28px;height:28px;border-radius:50%;margin-right:8px;vertical-align:-8px;object-fit:cover;" />`
    : `<span style="width:28px;height:28px;border-radius:50%;background:var(--accent);display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;margin-right:8px;vertical-align:-8px;">${escapeHtml(initial)}</span>`;

  el.innerHTML = `
    <div style="display:flex;align-items:center;">
      ${avatarHtml}
      <div style="min-width:0;">
        <div style="font-size:12px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(displayName)}</div>
        <div style="font-size:10px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(displayEmail)}</div>
      </div>
    </div>
  `;
}

// ------------------------
// Data helpers
// ------------------------

function safeJsonParse(s) {
  try {
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
}

// Simple deterministic hash for stable IDs (not cryptographic)
function hashCode(str) {
  const s = String(str ?? '');
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0; // 32-bit
  }
  // Convert to unsigned base36 for compactness
  return (h >>> 0).toString(36);
}

function escapeHtml(str) {
  return String(str || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function formatMoneyCOP(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return '-';
  return n.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
}

function getQueryParam(name) {
  try {
    const u = new URL(window.location.href);
    return u.searchParams.get(name);
  } catch {
    return null;
  }
}

function getExtraProviders() {
  const data = safeJsonParse(localStorage.getItem('extraProviders'));
  return Array.isArray(data) ? data : [];
}

function setExtraProviders(providers) {
  localStorage.setItem('extraProviders', JSON.stringify(providers || []));
}

function getHiddenProviderIds() {
  const data = safeJsonParse(localStorage.getItem('hiddenProviderIds'));
  return Array.isArray(data) ? data : [];
}

function getHiddenQuoteIds() {
  const data = safeJsonParse(localStorage.getItem('hiddenQuoteIds'));
  return Array.isArray(data) ? data : [];
}

function setHiddenQuoteIds(ids) {
  localStorage.setItem('hiddenQuoteIds', JSON.stringify(ids || []));
}

function setHiddenProviderIds(ids) {
  localStorage.setItem('hiddenProviderIds', JSON.stringify(ids || []));
}

function isExtraProvider(id) {
  return getExtraProviders().some((p) => String(p.it) === String(id));
}

// Provider overrides (edits that should apply even to base providers)
// Stored as an object keyed by provider `it`.
function getProviderOverrides() {
  const data = safeJsonParse(localStorage.getItem('providerOverrides'));
  return data && typeof data === 'object' && !Array.isArray(data) ? data : {};
}

function setProviderOverrides(map) {
  localStorage.setItem('providerOverrides', JSON.stringify(map || {}));
}

function applyProviderOverride(provider) {
  const p = provider || {};
  const overrides = getProviderOverrides();
  const ov = overrides[String(p.it)];
  if (!ov) return p;
  // Never allow override to change primary key
  const { it, ...rest } = ov;
  return { ...p, ...rest };
}

function getProviderPerfDefaults() {
  return { calidad: 3, entrega_dias: 7, garantia_meses: 12 };
}

function normalizeProviderPerf(p) {
  const d = getProviderPerfDefaults();
  const calidad = Number(p.calidad ?? d.calidad);
  const entrega = Number(p.entrega_dias ?? d.entrega_dias);
  const garantia = Number(p.garantia_meses ?? d.garantia_meses);
  return {
    calidad: Number.isFinite(calidad) ? Math.max(1, Math.min(5, Math.round(calidad))) : d.calidad,
    entrega_dias: Number.isFinite(entrega) ? Math.max(0, Math.round(entrega)) : d.entrega_dias,
    garantia_meses: Number.isFinite(garantia) ? Math.max(0, Math.round(garantia)) : d.garantia_meses,
  };
}

function getProviderById(id) {
  return getAllProviders().find((x) => String(x.it) === String(id)) || null;
}

function saveProviderOverride(id, patch) {
  const pid = String(id);
  const overrides = getProviderOverrides();
  overrides[pid] = { ...(overrides[pid] || {}), ...(patch || {}), it: pid };
  setProviderOverrides(overrides);
}

function clearProviderOverride(id) {
  const pid = String(id);
  const overrides = getProviderOverrides();
  if (overrides[pid]) {
    delete overrides[pid];
    setProviderOverrides(overrides);
  }
}

function getAllProviders() {
  // Use Supabase data if loaded
  if (window._sbData && window._sbData.loaded && window._sbData.providers) {
    return window._sbData.providers.map(p => {
      const perf = normalizeProviderPerf(p);
      return { correo: p.correo_electronico || p.correo || '', celular: p.celular_telefono || p.celular || '', ...p, ...perf };
    });
  }
  // Fallback to static files + localStorage
  const base = (typeof providersData !== 'undefined' && Array.isArray(providersData))
    ? providersData
    : (Array.isArray(window.providersData) ? window.providersData : []);
  const extra = getExtraProviders();
  const hidden = new Set(getHiddenProviderIds().map(String));
  return [...base, ...extra]
    .filter((p) => !hidden.has(String(p.it)))
    .map((p) => {
      const merged = applyProviderOverride(p);
      const perf = normalizeProviderPerf(merged);
      return {
        correo: merged.correo_electronico || merged.correo || '',
        celular: merged.celular_telefono || merged.celular || '',
        ...merged,
        ...perf
      };
    });
}

async function deleteProvider(id) {
  const pid = String(id);
  const ok = await sbDeleteProvider(pid);
  if (!ok) { showToast('Error al eliminar en Supabase', 'error'); return; }

  if (typeof renderProvidersTable === 'function') renderProvidersTable();
  if (typeof updateHomeKpis === 'function') updateHomeKpis();
}

function unhideAllProviders() {
  setHiddenProviderIds([]);
  if (typeof renderProvidersTable === 'function') renderProvidersTable();
  if (typeof updateHomeKpis === 'function') updateHomeKpis();
}

function ensureQuoteId(q, idx = 0) {
  if (q && q.it) return q;
  const key = [
    q?.empresa || '',
    q?.fecha || '',
    q?.descripcion || '',
    q?.und ?? '',
    q?.pu_sin_iva ?? '',
    q?.pu_con_iva ?? '',
    q?.ubicacion || '',
    idx,
  ].join('|');
  return { ...(q || {}), it: `bq_${hashCode(key)}` };
}

function getAllQuotes() {
  // Use Supabase data if loaded
  if (window._sbData && window._sbData.loaded && window._sbData.quotes) {
    return window._sbData.quotes;
  }
  // Fallback to static files + localStorage
  const baseRaw = (typeof quotesData !== 'undefined' && Array.isArray(quotesData))
    ? quotesData
    : (Array.isArray(window.quotesData) ? window.quotesData : []);
  const base = baseRaw.map((q, i) => ensureQuoteId(q, i));
  const extra = safeJsonParse(localStorage.getItem('extraQuotes'));
  const extraList = Array.isArray(extra) ? extra : [];
  const hidden = new Set(getHiddenQuoteIds().map(String));
  return [...base, ...extraList].map((q, i) => ensureQuoteId(q, base.length + i)).filter((q) => !hidden.has(String(q.it)));
}

function setExtraQuotes(quotes) {
  localStorage.setItem('extraQuotes', JSON.stringify(quotes || []));
}

function isExtraQuote(id) {
  const extra = safeJsonParse(localStorage.getItem('extraQuotes'));
  const list = Array.isArray(extra) ? extra : [];
  return list.some((q) => String(q.it) === String(id));
}

function deleteQuote(id) {
  const qid = String(id);
  if (isExtraQuote(qid)) {
    const extra = safeJsonParse(localStorage.getItem('extraQuotes'));
    const list = Array.isArray(extra) ? extra : [];
    setExtraQuotes(list.filter((q) => String(q.it) !== qid));
  } else {
    const hidden = new Set(getHiddenQuoteIds().map(String));
    hidden.add(qid);
    setHiddenQuoteIds([...hidden]);
  }
  if (typeof renderQuotesTable === 'function') renderQuotesTable();
  if (typeof updateHomeKpis === 'function') updateHomeKpis();

  // If the user is on the detail page, redirect back so the deletion is visible immediately.
  const page = document.body?.getAttribute('data-page');
  if (page === 'quote_detail') {
    window.location.href = 'quotes.html';
  }
}

function confirmDeleteQuote(id) {
  const q = getAllQuotes().find((x) => String(x.it) === String(id));
  if (!q) return;
  const action = isExtraQuote(id) ? 'eliminar' : 'ocultar';
  const ok = confirm(`¿Seguro que deseas ${action} esta cotización?\n\n${q.empresa}\n${q.descripcion}`);
  if (ok) deleteQuote(id);
}

// ------------------------
// Export helpers
// ------------------------

function downloadTextFile(filename, text, mime = 'text/plain') {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function toCsv(rows) {
  const esc = (v) => {
    const s = String(v ?? '');
    if (s.includes('"') || s.includes(',') || s.includes('\n') || s.includes('\r')) {
      return '"' + s.replaceAll('"', '""') + '"';
    }
    return s;
  };
  return rows.map((r) => r.map(esc).join(',')).join('\n');
}

function exportProvidersCsv() {
  const providers = getAllProviders();
  const header = [
    'it','empresa','rut','ciudad','direccion','categoria','estado','representante','celular','correo','pagina_web','servicios_productos','observaciones','calidad','entrega_dias','garantia_meses'
  ];
  const rows = [header].concat(
    providers.map((p) => header.map((k) => p[k] ?? ''))
  );
  downloadTextFile('proveedores.csv', toCsv(rows), 'text/csv;charset=utf-8');
}

function exportQuotesCsv(quotes) {
  const list = Array.isArray(quotes) ? quotes : getAllQuotes();
  const header = ['it','empresa','fecha','descripcion','und','pu_sin_iva','pu_con_iva','ubicacion','observaciones','otros'];
  const rows = [header].concat(list.map((q) => header.map((k) => q[k] ?? '')));
  downloadTextFile('cotizaciones.csv', toCsv(rows), 'text/csv;charset=utf-8');
}

function exportSingleQuoteCsv(id) {
  const q = getAllQuotes().find((x) => String(x.it) === String(id));
  if (!q) return;
  const header = ['it','empresa','fecha','descripcion','und','pu_sin_iva','pu_con_iva','ubicacion','observaciones','otros'];
  const row = header.map((k) => q[k] ?? '');
  const csv = toCsv([header, row]);
  downloadTextFile(`cotizacion_${String(q.it)}.csv`, csv, 'text/csv;charset=utf-8');
}

function exportCompareCsv(rows) {
  const header = ['proveedor','descripcion','precio_promedio_sin_iva','delta_vs_mejor','calidad','entrega_dias','garantia_meses','score_total'];
  const csvRows = [header].concat((rows || []).map((r) => [
    r.provider,
    r.desc,
    r.avgPrice,
    r.delta,
    r.calidad,
    r.entrega_dias,
    r.garantia_meses,
    r.score,
  ]));
  downloadTextFile('comparativo.csv', toCsv(csvRows), 'text/csv;charset=utf-8');
}

// ------------------------
// Providers page (cards + table)
// ------------------------

let providersViewMode = 'cards';

function setProvidersView(mode) {
  providersViewMode = mode === 'table' ? 'table' : 'cards';

  const cards = document.getElementById('providersCards');
  const tableWrap = document.getElementById('providersTableWrap');
  const btnCards = document.getElementById('viewCardsBtn');
  const btnTable = document.getElementById('viewTableBtn');

  if (providersViewMode === 'cards') {
    if (cards) cards.style.display = '';
    if (tableWrap) tableWrap.style.display = 'none';
    btnCards?.classList.add('btn-primary');
    btnTable?.classList.remove('btn-primary');
  } else {
    if (cards) cards.style.display = 'none';
    if (tableWrap) tableWrap.style.display = '';
    btnTable?.classList.add('btn-primary');
    btnCards?.classList.remove('btn-primary');
  }

  localStorage.setItem('providersViewMode', providersViewMode);
}

function getFilteredProviders() {
  const q = (document.getElementById('search-provider')?.value || '').toLowerCase();
  const city = (document.getElementById('filter-city')?.value || '').toLowerCase();
  const category = document.getElementById('filter-category')?.value || '';
  const state = document.getElementById('filter-state')?.value || '';

  return getAllProviders().filter((p) => {
    const haystack = [
      p.empresa,
      p.rut,
      p.representante,
      p.celular,
      p.correo,
      p.ciudad,
      p.direccion,
      p.servicios_productos,
      p.catalogo,
      p.observaciones,
    ]
      .map((x) => String(x || '').toLowerCase())
      .join(' | ');

    const matchQuery = !q || haystack.includes(q);
    const matchCity = !city || String(p.ciudad || '').toLowerCase().includes(city);
    const matchCategory = !category || String(p.categoria || '').toUpperCase() === category;
    const matchState = !state || String(p.estado || '').toUpperCase() === state;
    return matchQuery && matchCity && matchCategory && matchState;
  });
}

function renderProvidersCards(list) {
  const container = document.getElementById('providersCards');
  if (!container) return;

  if (!list.length) {
    container.innerHTML = `<div class="muted" style="grid-column: span 12; padding: 12px;">No se encontraron proveedores con los filtros actuales.</div>`;
    return;
  }

  container.innerHTML = list
    .map((p) => {
      const services = String(p.servicios_productos || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const tags = services.slice(0, 6).map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join('');
      const more = services.length > 6 ? `<span class="tag">+${services.length - 6}</span>` : '';

      const cat = String(p.categoria || '').toUpperCase();
      const st = String(p.estado || '').toUpperCase();

      const catClass = cat === 'DISPONIBLE' ? 'good' : 'warn';
      const stClass = st === 'ACTIVO' ? 'good' : 'warn';

      const deleteLabel = 'Eliminar';

      const perf = normalizeProviderPerf(p);

      return `
        <div class="card provider-card">
          <div class="card-body">
            <div class="provider-head">
              <div style="min-width:0;">
                <div class="provider-name" title="${escapeHtml(p.empresa)}">${escapeHtml(p.empresa)}</div>
                <div class="muted" style="font-size: 12px; margin-top: 6px;">RUT: ${escapeHtml(p.rut || '-')}</div>
                <div class="badges">
                  <span class="badge ${catClass}">${escapeHtml(cat || '—')}</span>
                  <span class="badge ${stClass}">${escapeHtml(st || '—')}</span>
                  ${p.ciudad ? `<span class="badge">${escapeHtml(p.ciudad)}</span>` : ''}
                </div>
              </div>
            </div>

            <div class="provider-meta">
              ${(p.correo || p.correo_electronico) ? `<div style="font-size:12px;color:var(--accent);"><b>✉</b> ${escapeHtml(p.correo || p.correo_electronico)}</div>` : `<div style="font-size:12px;color:var(--danger);font-weight:600;">⚠ Sin correo — <span style="cursor:pointer;text-decoration:underline;" onclick="event.stopPropagation();toggleProviderInlineEdit('${escapeHtml(p.it)}')">agregar</span></div>`}
              ${p.representante ? `<div style="font-size:12px;color:var(--text-2);"><b>Repr:</b> ${escapeHtml(p.representante)}</div>` : ''}
              ${(p.celular || p.celular_telefono) ? `<div style="color:var(--text-2);font-size:12px;">${escapeHtml(p.celular || p.celular_telefono)}</div>` : ''}
            </div>

            ${(tags || more) ? `<div class="tag-list">${tags}${more}</div>` : `<div class="muted" style="font-size:12px; margin-top: 10px;">Sin catálogo/servicios cargados.</div>`}

            <div class="card-actions">
              <a class="chip" href="provider_detail.html?it=${encodeURIComponent(String(p.it))}">Ficha</a>
              <button class="chip" onclick="openProviderModal('${escapeHtml(p.it)}')">Vista rápida</button>
              <button class="chip" onclick="toggleProviderInlineEdit('${escapeHtml(p.it)}')">Editar</button>
              <button class="chip danger" onclick="confirmDeleteProvider('${escapeHtml(p.it)}')">Eliminar</button>
            </div>

            <div class="inline-edit" id="inlineEdit-${escapeHtml(p.it)}" style="display:none; margin-top: 12px;">
              <div class="divider"></div>
              <div class="form-grid" style="margin-top: 12px;">
                <div class="col-12">
                  <label>Empresa</label>
                  <input class="input" id="ie-empresa-${escapeHtml(p.it)}" value="${escapeHtml(p.empresa)}" />
                </div>
                <div class="col-6">
                  <label>RUT</label>
                  <input class="input" id="ie-rut-${escapeHtml(p.it)}" value="${escapeHtml(p.rut || '')}" />
                </div>
                <div class="col-6">
                  <label>Ciudad</label>
                  <input class="input" id="ie-ciudad-${escapeHtml(p.it)}" value="${escapeHtml(p.ciudad || '')}" />
                </div>
                <div class="col-6">
                  <label>Categoría</label>
                  <select class="input" id="ie-categoria-${escapeHtml(p.it)}">
                    <option value="NUEVO" ${String(p.categoria||'').toUpperCase()==='NUEVO'?'selected':''}>NUEVO</option>
                    <option value="DISPONIBLE" ${String(p.categoria||'').toUpperCase()==='DISPONIBLE'?'selected':''}>DISPONIBLE</option>
                  </select>
                </div>
                <div class="col-6">
                  <label>Estado</label>
                  <select class="input" id="ie-estado-${escapeHtml(p.it)}">
                    <option value="ACTIVO" ${String(p.estado||'').toUpperCase()==='ACTIVO'?'selected':''}>ACTIVO</option>
                    <option value="INACTIVO" ${String(p.estado||'').toUpperCase()==='INACTIVO'?'selected':''}>INACTIVO</option>
                  </select>
                </div>
                <div class="col-6">
                  <label>Representante</label>
                  <input class="input" id="ie-representante-${escapeHtml(p.it)}" value="${escapeHtml(p.representante || '')}" />
                </div>
                <div class="col-6">
                  <label>Teléfono</label>
                  <input class="input" id="ie-celular-${escapeHtml(p.it)}" value="${escapeHtml(p.celular || '')}" />
                </div>
                <div class="col-6">
                  <label>Correo</label>
                  <input class="input" id="ie-correo-${escapeHtml(p.it)}" value="${escapeHtml(p.correo || '')}" />
                </div>
                <div class="col-6">
                  <label>Web</label>
                  <input class="input" id="ie-web-${escapeHtml(p.it)}" value="${escapeHtml(p.pagina_web || '')}" />
                </div>

                <div class="col-4">
                  <label>Calidad (1-5)</label>
                  <input class="input" type="number" min="1" max="5" step="1" id="ie-calidad-${escapeHtml(p.it)}" value="${escapeHtml(perf.calidad)}" />
                </div>
                <div class="col-4">
                  <label>Entrega (días)</label>
                  <input class="input" type="number" min="0" step="1" id="ie-entrega-${escapeHtml(p.it)}" value="${escapeHtml(perf.entrega_dias)}" />
                </div>
                <div class="col-4">
                  <label>Garantía (meses)</label>
                  <input class="input" type="number" min="0" step="1" id="ie-garantia-${escapeHtml(p.it)}" value="${escapeHtml(perf.garantia_meses)}" />
                </div>

                <div class="col-12">
                  <label>Servicios / Productos (coma)</label>
                  <textarea class="input" id="ie-servicios-${escapeHtml(p.it)}">${escapeHtml(p.servicios_productos || '')}</textarea>
                </div>
                <div class="col-12">
                  <label>Observaciones</label>
                  <textarea class="input" id="ie-observaciones-${escapeHtml(p.it)}">${escapeHtml(p.observaciones || '')}</textarea>
                </div>
              </div>

              <div style="display:flex; gap:10px; margin-top: 12px; flex-wrap:wrap;">
                <button class="btn btn-primary" type="button" onclick="saveProviderInlineEdit('${escapeHtml(p.it)}')">Guardar</button>
                <button class="btn" type="button" onclick="toggleProviderInlineEdit('${escapeHtml(p.it)}', true)">Cancelar</button>
                <button class="btn" type="button" onclick="clearProviderOverride('${escapeHtml(p.it)}'); renderProvidersTable();">Revertir cambios</button>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join('');
}

function renderProvidersTable() {
  const providers = getFilteredProviders();

  // Cards
  renderProvidersCards(providers);

  // Table
  const tableBody = document.getElementById('providersTableBody');
  if (tableBody) {
    tableBody.innerHTML = '';
    providers.forEach((p) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${escapeHtml(p.empresa)}</td>
        <td>${escapeHtml(p.rut || '')}</td>
        <td>${escapeHtml(p.ciudad || '')}</td>
        <td>${escapeHtml(p.categoria || '')}</td>
        <td>${escapeHtml(p.estado || '')}</td>
        <td>${escapeHtml(p.representante || '')}</td>
        <td>${escapeHtml(p.celular || '')}</td>
        <td>${escapeHtml(p.servicios_productos || '')}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  // Update count
  const countEl = document.getElementById('providersCount');
  if (countEl) countEl.textContent = String(providers.length);
}

function confirmDeleteProvider(id) {
  const provider = getAllProviders().find((p) => String(p.it) === String(id));
  if (!provider) return;

  const ok = confirm(`¿Seguro que deseas eliminar este proveedor?\n\n${provider.empresa}`);
  if (ok) deleteProvider(id);
}

function toggleProviderInlineEdit(id, forceClose = false) {
  const pid = String(id);
  const el = document.getElementById(`inlineEdit-${pid}`);
  if (!el) return;
  if (forceClose) {
    el.style.display = 'none';
    return;
  }
  el.style.display = el.style.display === 'none' || !el.style.display ? 'block' : 'none';
}

async function saveProviderInlineEdit(id) {
  const pid = String(id);

  const patch = {
    empresa: document.getElementById(`ie-empresa-${pid}`)?.value?.trim() || '',
    rut: document.getElementById(`ie-rut-${pid}`)?.value?.trim() || '',
    ciudad: document.getElementById(`ie-ciudad-${pid}`)?.value?.trim() || '',
    categoria: document.getElementById(`ie-categoria-${pid}`)?.value,
    estado: document.getElementById(`ie-estado-${pid}`)?.value,
    representante: document.getElementById(`ie-representante-${pid}`)?.value?.trim() || '',
    celular: document.getElementById(`ie-celular-${pid}`)?.value?.trim() || '',
    celular_telefono: document.getElementById(`ie-celular-${pid}`)?.value?.trim() || '',
    correo: document.getElementById(`ie-correo-${pid}`)?.value?.trim() || '',
    correo_electronico: document.getElementById(`ie-correo-${pid}`)?.value?.trim() || '',
    pagina_web: document.getElementById(`ie-web-${pid}`)?.value?.trim() || '',
    servicios_productos: document.getElementById(`ie-servicios-${pid}`)?.value || '',
    observaciones: document.getElementById(`ie-observaciones-${pid}`)?.value || '',
    calidad: Number(document.getElementById(`ie-calidad-${pid}`)?.value),
    entrega_dias: Number(document.getElementById(`ie-entrega-${pid}`)?.value),
    garantia_meses: Number(document.getElementById(`ie-garantia-${pid}`)?.value),
  };

  // Normalize performance fields
  const perf = normalizeProviderPerf(patch);
  patch.calidad = perf.calidad;
  patch.entrega_dias = perf.entrega_dias;
  patch.garantia_meses = perf.garantia_meses;

  const ok = await sbUpdateProvider(pid, patch);
  if (!ok) {
    showToast('Error al actualizar en Supabase', 'error');
    return;
  }

  showToast('Proveedor actualizado correctamente.');
  toggleProviderInlineEdit(pid, true);
  renderProvidersTable();
  if (typeof updateHomeKpis === 'function') updateHomeKpis();
}

function openProviderModal(id) {
  const modal = document.getElementById('providerModal');
  const title = document.getElementById('providerModalTitle');
  const body = document.getElementById('providerModalBody');
  if (!modal || !title || !body) return;

  const p = getAllProviders().find((x) => String(x.it) === String(id));
  if (!p) return;

  title.textContent = p.empresa || 'Proveedor';

  const services = String(p.servicios_productos || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const serviceTags = services.length
    ? `<div class="tag-list">${services.map((s) => `<span class="tag">${escapeHtml(s)}</span>`).join('')}</div>`
    : `<div class="muted" style="font-size: 12px;">Sin servicios/productos registrados.</div>`;

  const canEdit = true;
  const deleteLabel = isExtraProvider(id) ? 'Eliminar' : 'Ocultar';

  body.innerHTML = `
    <div class="grid-2">
      <div class="card">
        <div class="card-header"><div class="card-title">Información</div></div>
        <div class="card-body" style="font-size: 12px; color: var(--muted); line-height: 1.7;">
          <div><b>RUT:</b> ${escapeHtml(p.rut || '-')}</div>
          <div><b>Categoría:</b> ${escapeHtml(p.categoria || '-')}</div>
          <div><b>Estado:</b> ${escapeHtml(p.estado || '-')}</div>
          <div><b>Ciudad:</b> ${escapeHtml(p.ciudad || '-')}</div>
          <div><b>Dirección:</b> ${escapeHtml(p.direccion || '-')}</div>
        </div>
      </div>

      <div class="card">
        <div class="card-header"><div class="card-title">Contacto</div></div>
        <div class="card-body" style="font-size: 12px; color: var(--muted); line-height: 1.7;">
          <div><b>Representante:</b> ${escapeHtml(p.representante || '-')}</div>
          <div><b>Teléfono:</b> ${escapeHtml(p.celular || p.celular_telefono || '-')}</div>
          <div><b>Correo:</b> ${escapeHtml(p.correo_electronico || p.correo || '-')}${(!p.correo_electronico && !p.correo) ? ' <span style="color:var(--warning);font-size:11px;">⚠ sin correo</span>' : ''}</div>
          <div><b>Web:</b> ${p.pagina_web ? `<a class="chip" href="${escapeHtml(p.pagina_web)}" target="_blank" rel="noreferrer">Abrir</a>` : '<span class="muted">-</span>'}</div>
        </div>
      </div>
    </div>

    <div class="card" style="margin-top: 14px;">
      <div class="card-header"><div class="card-title">Servicios / Productos</div></div>
      <div class="card-body">${serviceTags}</div>
    </div>

    <div class="card" style="margin-top: 14px;">
      <div class="card-header"><div class="card-title">Observaciones</div></div>
      <div class="card-body" style="color: var(--muted); font-size: 12px; line-height: 1.7;">
        ${escapeHtml(p.observaciones || '—')}
      </div>
    </div>

    <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top: 14px;">
      ${canEdit ? `<button class="btn" onclick="openProviderEdit('${escapeHtml(id)}')">Editar</button>` : ''}
      <a class="btn" href="provider_detail.html?it=${encodeURIComponent(String(id))}">Abrir ficha</a>
      <a class="btn" href="quotes.html?provider=${encodeURIComponent(String(p.empresa||''))}">Crear cotización</a>
      <button class="btn btn-danger" onclick="confirmDeleteProvider('${escapeHtml(id)}')">${deleteLabel}</button>
      <button class="btn" onclick="closeProviderModal()">Cerrar</button>
    </div>

    <div class="muted" style="margin-top: 10px; font-size: 12px; line-height: 1.6;">
      Nota: los cambios que hagas aquí se guardan en tu navegador (localStorage). Si necesitas que la base sea compartida por todo el equipo, se requiere un backend.
    </div>
  `;

  modal.classList.add('open');
}

function closeProviderModal(ev) {
  const modal = document.getElementById('providerModal');
  if (!modal) return;

  // If click on backdrop
  if (ev && ev.target && ev.target !== modal) {
    // clicked inside modal content
    if (!ev.target.classList.contains('modal-backdrop')) return;
  }

  modal.classList.remove('open');
}

function openProviderEdit(id) {
  const p = getAllProviders().find((x) => String(x.it) === String(id));
  if (!p) return;
  const perf = normalizeProviderPerf(p);

  const body = document.getElementById('providerModalBody');
  if (!body) return;

  body.innerHTML = `
    <div class="card">
      <div class="card-header"><div class="card-title">Editar proveedor</div><div class="card-subtitle">Se guardará en tu navegador (localStorage).</div></div>
      <div class="card-body">
        <div class="form-grid">
          <div class="col-12">
            <label>Empresa</label>
            <input class="input" id="ep-empresa" value="${escapeHtml(p.empresa)}" />
          </div>
          <div class="col-6">
            <label>RUT</label>
            <input class="input" id="ep-rut" value="${escapeHtml(p.rut || '')}" />
          </div>
          <div class="col-6">
            <label>Ciudad</label>
            <input class="input" id="ep-ciudad" value="${escapeHtml(p.ciudad || '')}" />
          </div>
          <div class="col-6">
            <label>Categoría</label>
            <select class="input" id="ep-categoria">
              <option value="NUEVO" ${String(p.categoria||'').toUpperCase()==='NUEVO'?'selected':''}>NUEVO</option>
              <option value="DISPONIBLE" ${String(p.categoria||'').toUpperCase()==='DISPONIBLE'?'selected':''}>DISPONIBLE</option>
            </select>
          </div>
          <div class="col-6">
            <label>Estado</label>
            <select class="input" id="ep-estado">
              <option value="ACTIVO" ${String(p.estado||'').toUpperCase()==='ACTIVO'?'selected':''}>ACTIVO</option>
              <option value="INACTIVO" ${String(p.estado||'').toUpperCase()==='INACTIVO'?'selected':''}>INACTIVO</option>
            </select>
          </div>
          <div class="col-6">
            <label>Representante</label>
            <input class="input" id="ep-representante" value="${escapeHtml(p.representante || '')}" />
          </div>
          <div class="col-6">
            <label>Teléfono</label>
            <input class="input" id="ep-celular" value="${escapeHtml(p.celular || p.celular_telefono || '')}" />
          </div>
          <div class="col-6">
            <label>Correo electrónico</label>
            <input class="input" type="email" id="ep-correo" value="${escapeHtml(p.correo_electronico || p.correo || '')}" placeholder="correo@empresa.com" style="${(!p.correo_electronico && !p.correo) ? 'border-color:var(--warning);' : ''}" />
          </div>
          <div class="col-6">
            <label>Dirección</label>
            <input class="input" id="ep-direccion" value="${escapeHtml(p.direccion || '')}" />
          </div>
          <div class="col-6">
            <label>Página web</label>
            <input class="input" id="ep-web" value="${escapeHtml(p.pagina_web || '')}" placeholder="https://..." />
          </div>
          <div class="col-12">
            <label>Servicios/Productos (coma)</label>
            <textarea class="input" id="ep-servicios">${escapeHtml(p.servicios_productos || '')}</textarea>
          </div>
          <div class="col-4">
            <label>Calidad (1-5)</label>
            <input class="input" type="number" min="1" max="5" step="1" id="ep-calidad" value="${escapeHtml(perf.calidad)}" />
          </div>
          <div class="col-4">
            <label>Entrega (días)</label>
            <input class="input" type="number" min="0" step="1" id="ep-entrega" value="${escapeHtml(perf.entrega_dias)}" />
          </div>
          <div class="col-4">
            <label>Garantía (meses)</label>
            <input class="input" type="number" min="0" step="1" id="ep-garantia" value="${escapeHtml(perf.garantia_meses)}" />
          </div>
          <div class="col-12">
            <label>Observaciones</label>
            <textarea class="input" id="ep-observaciones">${escapeHtml(p.observaciones || '')}</textarea>
          </div>
        </div>

        <div style="display:flex; gap:10px; margin-top: 14px; flex-wrap:wrap;">
          <button class="btn btn-primary" onclick="saveProviderEdits('${escapeHtml(id)}')">Guardar cambios</button>
          <button class="btn" onclick="openProviderModal('${escapeHtml(id)}')">Cancelar</button>
        </div>
      </div>
    </div>
  `;
}

function saveProviderEdits(id) {
  const pid = String(id);
  const patch = {
    empresa: document.getElementById('ep-empresa')?.value?.trim() || '',
    rut: document.getElementById('ep-rut')?.value?.trim() || '',
    ciudad: document.getElementById('ep-ciudad')?.value?.trim() || '',
    categoria: document.getElementById('ep-categoria')?.value,
    estado: document.getElementById('ep-estado')?.value,
    representante: document.getElementById('ep-representante')?.value?.trim() || '',
    celular: document.getElementById('ep-celular')?.value?.trim() || '',
    correo_electronico: document.getElementById('ep-correo')?.value?.trim() || '',
    correo: document.getElementById('ep-correo')?.value?.trim() || '',
    direccion: document.getElementById('ep-direccion')?.value?.trim() || '',
    pagina_web: document.getElementById('ep-web')?.value?.trim() || '',
    servicios_productos: document.getElementById('ep-servicios')?.value || '',
    observaciones: document.getElementById('ep-observaciones')?.value || '',
    calidad: Number(document.getElementById('ep-calidad')?.value),
    entrega_dias: Number(document.getElementById('ep-entrega')?.value),
    garantia_meses: Number(document.getElementById('ep-garantia')?.value),
  };

  const perf = normalizeProviderPerf(patch);
  patch.calidad = perf.calidad;
  patch.entrega_dias = perf.entrega_dias;
  patch.garantia_meses = perf.garantia_meses;

  saveProviderOverride(pid, patch);
  openProviderModal(pid);
  renderProvidersTable();
}

// ------------------------
// New provider page
// ------------------------

function setupNewProviderForm() {
  const form = document.getElementById('new-provider-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const provider = {
      it: Date.now().toString(),
      rut: document.getElementById('np-rut').value.trim(),
      empresa: document.getElementById('np-empresa').value.trim(),
      direccion: document.getElementById('np-direccion').value.trim(),
      categoria: document.getElementById('np-categoria').value,
      estado: document.getElementById('np-estado').value,
      representante: document.getElementById('np-representante').value.trim(),
      celular: document.getElementById('np-celular').value.trim(),
      ciudad: document.getElementById('np-ciudad').value.trim(),
      correo: document.getElementById('np-correo').value.trim(),
      pagina_web: document.getElementById('np-web').value.trim(),
      catalogo: document.getElementById('np-catalogo').value.trim(),
      tiempos_respuesta: document.getElementById('np-tiempos').value.trim(),
      servicios_productos: document.getElementById('np-servicios').value,
      observaciones: document.getElementById('np-observaciones').value,
      calidad: Number(document.getElementById('np-calidad')?.value) || 3,
      entrega_dias: Number(document.getElementById('np-entrega')?.value) || 7,
      garantia_meses: Number(document.getElementById('np-garantia')?.value) || 12,
    };

    const extra = getExtraProviders();
    extra.push(provider);
    setExtraProviders(extra);

    alert('Proveedor guardado.');
    window.location.href = 'providers.html';
  });
}


// ------------------------
// Quotes page — Multi-provider, new fields
// ------------------------

// ---- Multi-provider selector state ----
let selectedProviders = []; // array of provider names

function clearProviderSelection() {
  selectedProviders = [];
  renderProvChips();
  renderMultiProvItems('');
}

function renderProvChips() {
  const chips = document.getElementById('provChips');
  const label = document.getElementById('multiProvLabel');
  if (!chips) return;
  chips.innerHTML = selectedProviders.map((name) => `
    <div class="prov-chip" data-prov="${escapeHtml(name)}">
      ${escapeHtml(name)}
      <button type="button" onclick="removeProvChip('${escapeHtml(name).replace(/'/g,"\\'")}')">×</button>
    </div>
  `).join('');
  if (label) {
    label.textContent = selectedProviders.length === 0
      ? 'Selecciona uno o varios proveedores...'
      : `${selectedProviders.length} proveedor(es) seleccionado(s)`;
    label.style.color = selectedProviders.length ? 'var(--text)' : '';
  }
}

function removeProvChip(name) {
  selectedProviders = selectedProviders.filter((p) => p !== name);
  renderProvChips();
  renderMultiProvItems(document.getElementById('multiProvSearch')?.value || '');
}

function renderMultiProvItems(filter) {
  const container = document.getElementById('multiProvItems');
  if (!container) return;
  const allProviders = getAllProviders().map((p) => p.empresa).filter(Boolean).sort((a, b) => a.localeCompare(b));
  const q = normalizeText(filter);
  const filtered = q ? allProviders.filter((n) => normalizeText(n).includes(q)) : allProviders;
  container.innerHTML = filtered.map((name) => {
    const checked = selectedProviders.includes(name);
    return `
      <div class="multi-prov-item${checked ? ' sku-row-selected' : ''}" data-prov-name="${escapeHtml(name)}">
        <input type="checkbox" ${checked ? 'checked' : ''} id="mprov_${escapeHtml(name).replace(/\s/g,'_')}" />
        <label for="mprov_${escapeHtml(name).replace(/\s/g,'_')}" style="cursor:pointer;flex:1;">${escapeHtml(name)}</label>
      </div>
    `;
  }).join('') || '<div style="padding:10px 14px; color:var(--muted); font-size:13px;">Sin resultados</div>';

  // Wire checkboxes
  container.querySelectorAll('.multi-prov-item').forEach((item) => {
    item.addEventListener('click', (e) => {
      if (e.target.tagName === 'INPUT') return; // handled by change
      const cb = item.querySelector('input[type=checkbox]');
      if (cb) { cb.checked = !cb.checked; cb.dispatchEvent(new Event('change')); }
    });
    const cb = item.querySelector('input[type=checkbox]');
    if (cb) {
      cb.addEventListener('change', () => {
        const name = item.getAttribute('data-prov-name') || '';
        if (cb.checked) {
          if (!selectedProviders.includes(name)) selectedProviders.push(name);
        } else {
          selectedProviders = selectedProviders.filter((p) => p !== name);
        }
        renderProvChips();
      });
    }
  });
}

function setupMultiProvDropdown() {
  const trigger = document.getElementById('multiProvTrigger');
  const list = document.getElementById('multiProvList');
  const search = document.getElementById('multiProvSearch');
  if (!trigger || !list) return;

  renderMultiProvItems('');

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = list.style.display !== 'none';
    list.style.display = open ? 'none' : 'block';
    if (!open) { search?.focus(); }
  });

  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      list.style.display = list.style.display !== 'none' ? 'none' : 'block';
    }
  });

  search?.addEventListener('input', () => renderMultiProvItems(search.value));

  document.addEventListener('click', (e) => {
    if (!document.getElementById('multiProvDropdown')?.contains(e.target)) {
      list.style.display = 'none';
    }
  });

  // Populate second-option datalist
  const segList = document.getElementById('segProvList');
  if (segList) {
    getAllProviders().forEach((p) => {
      const opt = document.createElement('option');
      opt.value = p.empresa;
      segList.appendChild(opt);
    });
  }
}

function setupQuotesForm() {
  const form = document.getElementById('quote-form');
  if (!form) return;

  const dateInput = document.getElementById('quote-date');
  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().slice(0, 10);
  }

  setupMultiProvDropdown();

  // Prefill from SKU page
  const prefill = safeJsonParse(localStorage.getItem('quotePrefill'));
  if (prefill && typeof prefill === 'object') {
    try {
      // Multi-provider prefill
      if (prefill.providers && Array.isArray(prefill.providers)) {
        selectedProviders = prefill.providers.slice();
        renderProvChips();
        renderMultiProvItems('');
      } else if (prefill.provider) {
        selectedProviders = [prefill.provider];
        renderProvChips();
        renderMultiProvItems('');
      }
      if (prefill.description) {
        const d = document.getElementById('quote-description');
        if (d) d.value = String(prefill.description);
      }
      if (prefill.und != null) {
        const u = document.getElementById('quote-und');
        if (u) u.value = String(prefill.und);
      }
      if (prefill.pu_sin_iva != null) {
        const p = document.getElementById('quote-pu-sin-iva');
        if (p) p.value = String(prefill.pu_sin_iva);
      }
      // Multi-sku: show first, queue rest
      if (prefill.skus && Array.isArray(prefill.skus) && prefill.skus.length > 0) {
        const first = prefill.skus[0];
        const d = document.getElementById('quote-description');
        if (d) d.value = String(first.sku || '');
        const p = document.getElementById('quote-pu-sin-iva');
        if (p && first.pu_sin_iva) p.value = String(first.pu_sin_iva);
        // Store remaining SKUs to queue
        if (prefill.skus.length > 1) {
          localStorage.setItem('pendingSkuQueue', JSON.stringify(prefill.skus.slice(1)));
          showToast(`📦 ${prefill.skus.length} SKUs en cola. Se guardarán uno por uno al enviar.`, 4000);
        }
      }
    } finally {
      localStorage.removeItem('quotePrefill');
    }
  }

  // SKU autocomplete
  setupQuoteSkuAutocomplete();

  // Email button
  document.getElementById('btnEnviarCorreo')?.addEventListener('click', () => {
    const desc = document.getElementById('quote-description')?.value?.trim() || '';
    const provs = selectedProviders.length ? selectedProviders : ['(sin proveedor)'];
    const und = document.getElementById('quote-und')?.value || '1';
    const ciudadEnt = document.getElementById('quote-ciudad-entrega')?.value || '';
    const fechaEnt = document.getElementById('quote-fecha-entrega')?.value || '';
    const codigoBia = document.getElementById('quote-codigo-bia')?.value || '';

    const subject = encodeURIComponent(`Solicitud de Cotización BIA Energy${codigoBia ? ' - ' + codigoBia : ''} - ${desc}`);
    const body = encodeURIComponent(
      `Estimado proveedor,\n\n` +
      `Por medio del presente correo, BIA Energy solicita cotización para el siguiente ítem:\n\n` +
      `${codigoBia ? '• Código BIA: ' + codigoBia + '\n' : ''}` +
      `• Descripción / Referencia: ${desc}\n` +
      `• Cantidad: ${und}\n` +
      `${ciudadEnt ? '• Ciudad de entrega: ' + ciudadEnt + '\n' : ''}` +
      `${fechaEnt ? '• Fecha de entrega requerida: ' + fechaEnt + '\n' : ''}` +
      `\nPor favor incluir en su respuesta:\n` +
      `  - Precio unitario (sin IVA y con IVA 19%)\n` +
      `  - Total\n` +
      `  - Fecha de entrega real\n` +
      `  - Garantía ofrecida (meses)\n` +
      `  - Ciudad / lugar de despacho\n` +
      `  - Condiciones comerciales\n\n` +
      `Muchas gracias,\nEquipo de Compras\nBIA Energy`
    );

    // Get emails of selected providers
    const allProvs = getAllProviders();
    const emails = selectedProviders
      .map((name) => allProvs.find((p) => p.empresa === name))
      .filter(Boolean)
      .map((p) => p.correo_electronico || p.correo)
      .filter(Boolean);

    const to = emails.length ? emails.join(',') : '';
    window.open(`mailto:${to}?subject=${subject}&body=${body}`, '_blank');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const provs = selectedProviders.length ? selectedProviders : [];
    if (!provs.length) {
      showToast('Selecciona al menos un proveedor.', 'error');
      return;
    }

    const skus = window._selectedQuoteSkus || [];
    if (!skus.length) {
      showToast('Agrega al menos un ítem del catálogo SKU.', 'error');
      return;
    }

    const fecha = document.getElementById('quote-date')?.value || new Date().toISOString().slice(0, 10);
    const ciudadEntrega = document.getElementById('quote-ciudad-entrega')?.value?.trim() || '';
    const fechaEntrega = document.getElementById('quote-fecha-entrega')?.value || '';
    const observaciones = document.getElementById('quote-observaciones')?.value?.trim() || '';
    const segEmpresa = document.getElementById('quote-seg-empresa')?.value?.trim() || '';
    const segPrecio = parseFloat(document.getElementById('quote-seg-precio')?.value) || 0;
    const segDesc = document.getElementById('quote-seg-descripcion')?.value?.trim() || '';

    const extra = safeJsonParse(localStorage.getItem('extraQuotes')) || [];
    let count = 0;

    provs.forEach(empresa => {
      skus.forEach(sku => {
        extra.push({
          it: Date.now().toString() + Math.random().toString(36).slice(2, 8),
          empresa, fecha,
          descripcion: sku.sku,
          und: sku.cantidad || 1,
          pu_sin_iva: 0, pu_con_iva: 0,
          ciudad_entrega: ciudadEntrega,
          fecha_entrega: fechaEntrega,
          observaciones,
          segunda_empresa: segEmpresa,
          segunda_precio: segPrecio,
          segunda_descripcion: segDesc,
        });
        count++;
      });
    });

    setExtraQuotes(extra);
    window._selectedQuoteSkus = [];
    renderSelectedQuoteSkus();
    form.reset();
    if (dateInput) dateInput.value = new Date().toISOString().slice(0, 10);
    clearProviderSelection();
    showToast('✓ ' + count + ' solicitud(es) guardada(s).', 'success');
    renderQuotesTable();
    if (typeof updateHomeKpis === 'function') updateHomeKpis();
  });

  // Search filter
  document.getElementById('quoteSearchInput')?.addEventListener('input', renderQuotesTable);
}

function setupQuoteSkuAutocomplete() {
  const input = document.getElementById('quote-description');
  const box = document.getElementById('quoteSkuSuggestions');
  if (!input || !box) return;

  const catalog = Array.isArray(window.skuCatalogData) ? window.skuCatalogData : [];
  let items = [], activeIndex = -1;

  function hide() { box.style.display = 'none'; box.innerHTML = ''; items = []; activeIndex = -1; }

  function inferCategoryPredicate(qNorm) {
    if (!qNorm) return null;
    if (qNorm === 'medidor' || qNorm.startsWith('medidor ')) return (c) => c.includes('medidor');
    if (qNorm === 'tc' || qNorm.startsWith('tc ') || qNorm.includes('corriente')) return (c) => c.includes('corriente');
    if (qNorm === 'tp' || qNorm.startsWith('tp ') || qNorm.includes('potencial')) return (c) => c.includes('potencial');
    return null;
  }

  function getSearchRemainder(qNorm) {
    const prefixes = ['medidor ', 'tc ', 'tp '];
    for (const p of prefixes) { if (qNorm.startsWith(p)) return qNorm.slice(p.length).trim(); }
    return qNorm;
  }

  function render() {
    const raw = String(input.value || '').trim();
    const qNorm = normalizeText(raw);
    if (qNorm.length < 2) { hide(); return; }

    const pred = inferCategoryPredicate(qNorm);
    const remainder = getSearchRemainder(qNorm);
    let pool = catalog;
    if (pred) pool = catalog.filter((x) => pred(normalizeText(String(x.category || ''))));
    const matches = pool
      .filter((x) => normalizeText(String(x.sku || '')).includes(remainder || qNorm))
      .slice(0, 20);

    if (!matches.length) { hide(); return; }
    items = matches;

    box.style.display = 'block';
    box.innerHTML = matches.slice(0, 10).map((m, i) => `
      <div class="suggestion-item ${i === activeIndex ? 'active' : ''}" data-idx="${i}">
        <div class="suggestion-title">${escapeHtml(String(m.sku || ''))}</div>
        <div class="muted suggestion-meta">${escapeHtml(String(m.category || ''))}</div>
      </div>
    `).join('');

    box.querySelectorAll('.suggestion-item').forEach((el) => {
      el.addEventListener('mousedown', (e) => {
        e.preventDefault();
        const idx = parseInt(el.getAttribute('data-idx') || '0');
        if (items[idx]) { input.value = items[idx].sku; hide(); }
      });
    });
  }

  input.addEventListener('input', render);
  input.addEventListener('blur', () => setTimeout(hide, 180));
  input.addEventListener('keydown', (e) => {
    if (!items.length) return;
    if (e.key === 'ArrowDown') { activeIndex = Math.min(activeIndex + 1, items.length - 1); render(); }
    if (e.key === 'ArrowUp') { activeIndex = Math.max(activeIndex - 1, 0); render(); }
    if (e.key === 'Enter' && activeIndex >= 0) { e.preventDefault(); input.value = items[activeIndex].sku; hide(); }
    if (e.key === 'Escape') hide();
  });
}

function renderQuotesTable() {
  const body = document.getElementById('quotesTableBody');
  if (!body) return;

  const searchQ = normalizeText(document.getElementById('quoteSearchInput')?.value || '');
  let quotes = getAllQuotes().slice().sort((a, b) => String(b.fecha || '').localeCompare(String(a.fecha || '')));

  if (searchQ) {
    quotes = quotes.filter((q) =>
      normalizeText(q.descripcion || '').includes(searchQ) ||
      normalizeText(q.codigo_bia || '').includes(searchQ) ||
      normalizeText(q.empresa || '').includes(searchQ)
    );
  }

  body.innerHTML = '';
  if (!quotes.length) {
    body.innerHTML = '<tr><td colspan="9" class="muted" style="text-align:center;padding:20px;">Sin cotizaciones registradas.</td></tr>';
    return;
  }

  quotes.forEach((q) => {
    const total = (Number(q.und) || 0) * (Number(q.pu_sin_iva) || 0);
    const tr = document.createElement('tr');

    const actions = document.createElement('div');
    actions.className = 'quote-row-actions';

    const view = document.createElement('a');
    view.className = 'chip';
    view.href = `quote_detail.html?it=${encodeURIComponent(String(q.it))}`;
    view.textContent = 'Ver';

    const del = document.createElement('button');
    del.className = 'chip danger';
    del.type = 'button';
    del.textContent = isExtraQuote(q.it) ? 'Eliminar' : 'Ocultar';
    del.addEventListener('click', () => confirmDeleteQuote(String(q.it)));

    actions.appendChild(view);
    actions.appendChild(del);

    const segBadge = q.segunda_empresa ? `<span class="badge-responded" style="font-size:10px;margin-left:4px;" title="2ª opción: ${escapeHtml(q.segunda_empresa)}">+2ª</span>` : '';

    tr.innerHTML = `
      <td style="font-weight:700;">${escapeHtml(q.empresa || '')}${segBadge}</td>
      <td class="muted">${escapeHtml(q.codigo_bia || '—')}</td>
      <td>${escapeHtml(q.descripcion || '')}</td>
      <td style="text-align:center;">${escapeHtml(String(q.und ?? ''))}</td>
      <td>${q.pu_sin_iva > 0 ? escapeHtml(formatMoneyCOP(q.pu_sin_iva)) : '<span class="muted">—</span>'}</td>
      <td>${total > 0 ? escapeHtml(formatMoneyCOP(total)) : '<span class="muted">—</span>'}</td>
      <td class="muted">${escapeHtml(q.ciudad_entrega || '—')}</td>
      <td class="muted">${escapeHtml(q.fecha_entrega_real || q.fecha_entrega || '—')}</td>
      <td></td>
    `;
    tr.lastElementChild.appendChild(actions);
    body.appendChild(tr);
  });
}

// Quote detail page
function setupQuoteDetailPage() {
  const container = document.getElementById('quoteDetail');
  if (!container) return;
  const id = getQueryParam('it');
  if (!id) { container.innerHTML = `<div class="muted">No se especificó la cotización.</div>`; return; }

  const q = getAllQuotes().find((x) => String(x.it) === String(id));
  if (!q) { container.innerHTML = `<div class="muted">No se encontró la cotización.</div>`; return; }

  const total_sin = (Number(q.und) || 0) * (Number(q.pu_sin_iva) || 0);
  const total_con = (Number(q.und) || 0) * (Number(q.pu_con_iva) || 0);
  const providerIt = getAllProviders().find((p) => String(p.empresa||'') === String(q.empresa||''))?.it;
  const providerLink = providerIt ? `provider_detail.html?it=${encodeURIComponent(String(providerIt))}` : null;

  container.innerHTML = `
    <div class="card">
      <div class="card-header">
        <div>
          <div class="card-title">Detalle de cotización</div>
          <div class="card-subtitle">ID: ${escapeHtml(q.it)} · Fecha: ${escapeHtml(q.fecha||'')}${q.codigo_bia ? ' · Código BIA: ' + escapeHtml(q.codigo_bia) : ''}</div>
        </div>
      </div>
      <div class="card-body">
        <div class="grid-2">
          <div>
            <div class="muted" style="font-size:12px;">Proveedor</div>
            <div style="font-weight:800;font-size:16px;">${escapeHtml(q.empresa||'')}</div>
            <div style="margin-top:8px;">${providerLink ? `<a class="chip" href="${providerLink}">Ver ficha del proveedor</a>` : '<span class="muted" style="font-size:12px;">Sin ficha</span>'}</div>
          </div>
          <div>
            <div class="muted" style="font-size:12px;">Descripción / Referencia</div>
            <div style="font-weight:700;">${escapeHtml(q.descripcion||'')}</div>
            <div class="muted" style="font-size:12px;margin-top:6px;">Ciudad de entrega: ${escapeHtml(q.ciudad_entrega||'—')}</div>
          </div>
        </div>
        <div class="divider" style="margin:14px 0;"></div>
        <div class="grid-2">
          <div class="kpi"><div class="kpi-label">Cantidad</div><div class="kpi-value">${escapeHtml(String(q.und??0))}</div></div>
          <div class="kpi"><div class="kpi-label">PU sin IVA</div><div class="kpi-value">${escapeHtml(formatMoneyCOP(q.pu_sin_iva))}</div></div>
          <div class="kpi"><div class="kpi-label">PU con IVA</div><div class="kpi-value">${escapeHtml(formatMoneyCOP(q.pu_con_iva))}</div></div>
          <div class="kpi"><div class="kpi-label">Total sin IVA</div><div class="kpi-value">${escapeHtml(formatMoneyCOP(total_sin))}</div></div>
          <div class="kpi"><div class="kpi-label">Total con IVA</div><div class="kpi-value">${escapeHtml(formatMoneyCOP(total_con))}</div></div>
          <div class="kpi"><div class="kpi-label">Garantía</div><div class="kpi-value">${escapeHtml(String(q.garantia_meses||0))} meses</div></div>
        </div>
        ${q.fecha_entrega || q.fecha_entrega_real ? `
        <div class="divider" style="margin:14px 0;"></div>
        <div class="grid-2">
          <div><div class="muted" style="font-size:12px;">Fecha entrega solicitada</div><div>${escapeHtml(q.fecha_entrega||'—')}</div></div>
          <div><div class="muted" style="font-size:12px;">Fecha entrega ofertada</div><div>${escapeHtml(q.fecha_entrega_real||'—')}</div></div>
        </div>` : ''}
        ${q.segunda_empresa ? `
        <div class="divider" style="margin:14px 0;"></div>
        <div style="border:1px dashed var(--border);border-radius:10px;padding:12px;">
          <div class="muted" style="font-size:11px;font-weight:700;text-transform:uppercase;margin-bottom:8px;">Segunda opción (homologable)</div>
          <div class="grid-2">
            <div><div class="muted" style="font-size:12px;">Proveedor alternativo</div><div style="font-weight:700;">${escapeHtml(q.segunda_empresa)}</div></div>
            <div><div class="muted" style="font-size:12px;">Precio alternativo</div><div>${escapeHtml(formatMoneyCOP(q.segunda_precio))}</div></div>
            ${q.segunda_descripcion ? `<div class="col-12"><div class="muted" style="font-size:12px;">Referencia alternativa</div><div>${escapeHtml(q.segunda_descripcion)}</div></div>` : ''}
          </div>
        </div>` : ''}
        ${q.observaciones ? `
        <div class="divider" style="margin:14px 0;"></div>
        <div><div class="muted" style="font-size:12px;">Observaciones</div><div style="white-space:pre-wrap;margin-top:6px;">${escapeHtml(q.observaciones)}</div></div>` : ''}
        <div style="display:flex;gap:10px;margin-top:16px;flex-wrap:wrap;">
          <a class="btn" href="quotes.html">Volver</a>
          <button class="btn btn-danger" type="button" id="quoteDetailDeleteBtn">${isExtraQuote(q.it)?'Eliminar':'Ocultar'}</button>
        </div>
      </div>
    </div>
  `;
  document.getElementById('quoteDetailDeleteBtn')?.addEventListener('click', () => confirmDeleteQuote(String(q.it)));
}

// ------------------------
// Compare page — full rebuild
// ------------------------

function setupCompare() {
  const selDesc = document.getElementById('compare-description');
  if (!selDesc) return;

  // Populate description dropdown
  function populateDescSelect() {
    const quotes = getAllQuotes();
    const descs = Array.from(new Set(quotes.map((q) => String(q.descripcion||'').trim()).filter(Boolean))).sort((a,b) => a.localeCompare(b));
    selDesc.innerHTML = `<option value="">Selecciona una referencia...</option>` + descs.map((d) => `<option value="${escapeHtml(d)}">${escapeHtml(d)}</option>`).join('');
  }

  // Populate código BIA dropdown
  function populateBiaSelect() {
    const selBia = document.getElementById('compare-codigo-bia');
    if (!selBia) return;
    const quotes = getAllQuotes();
    const codes = Array.from(new Set(quotes.map((q) => String(q.codigo_bia||'').trim()).filter(Boolean))).sort((a,b) => a.localeCompare(b));
    selBia.innerHTML = `<option value="">Todos los códigos BIA</option>` + codes.map((c) => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('');
  }

  populateDescSelect();
  populateBiaSelect();

  selDesc.addEventListener('change', renderComparative);
  document.getElementById('compare-codigo-bia')?.addEventListener('change', renderComparative);
  document.getElementById('btnRecalculate')?.addEventListener('click', renderComparative);

  renderComparative();
}

function getCompareWeights() {
  const wPrice = Number(document.getElementById('w-price')?.value);
  const wDel   = Number(document.getElementById('w-delivery')?.value);
  const wWar   = Number(document.getElementById('w-warranty')?.value);
  const wQual  = Number(document.getElementById('w-quality')?.value);
  const raw = {
    price:    Number.isFinite(wPrice) ? wPrice : 50,
    delivery: Number.isFinite(wDel)   ? wDel   : 25,
    warranty: Number.isFinite(wWar)   ? wWar   : 15,
    quality:  Number.isFinite(wQual)  ? wQual  : 10,
  };
  const sum = raw.price + raw.delivery + raw.warranty + raw.quality || 100;
  return { price: raw.price/sum, delivery: raw.delivery/sum, warranty: raw.warranty/sum, quality: raw.quality/sum };
}

function stars(n) {
  const x = Math.max(0, Math.min(5, Number(n)||0));
  return '★'.repeat(x) + '☆'.repeat(5-x);
}

function renderComparative() {
  const selDesc = document.getElementById('compare-description');
  const tbody   = document.getElementById('compareTableBody');
  const rank    = document.getElementById('compareRank');
  const kpis    = document.getElementById('compareKpis');
  if (!selDesc || !tbody) return;

  const desc  = selDesc.value;
  const biaCod = String(document.getElementById('compare-codigo-bia')?.value || '').trim();

  let quotes = getAllQuotes();
  if (desc)   quotes = quotes.filter((q) => String(q.descripcion||'').trim() === desc);
  if (biaCod) quotes = quotes.filter((q) => String(q.codigo_bia||'').trim() === biaCod);

  if (!quotes.length) {
    tbody.innerHTML = '';
    if (rank)  rank.innerHTML  = `<div class="muted">Sin cotizaciones para los filtros seleccionados.</div>`;
    if (kpis)  kpis.innerHTML  = '';
    return;
  }

  const weights = getCompareWeights();
  const providersByName = new Map(getAllProviders().map((p) => [String(p.empresa||'').trim(), p]));

  // Aggregate by provider: take the latest quote per provider
  const byProv = new Map();
  quotes.forEach((q) => {
    const key = String(q.empresa||'').trim();
    if (!key) return;
    if (!byProv.has(key)) byProv.set(key, []);
    byProv.get(key).push(q);
  });

  const rows = [];
  for (const [prov, qs] of byProv.entries()) {
    // Use latest quote (by fecha_entrega_real or fecha)
    const latest = qs.slice().sort((a,b) => String(b.fecha||'').localeCompare(String(a.fecha||'')))[0];
    const avgPrice = qs.reduce((s,q) => s + (Number(q.pu_sin_iva)||0), 0) / qs.length;
    const garantia = Number(latest.garantia_meses||0);
    const meta = providersByName.get(prov) || null;
    const perf = normalizeProviderPerf(meta||{});
    rows.push({
      provider: prov,
      descripcion: latest.descripcion || desc,
      codigo_bia: latest.codigo_bia || biaCod,
      und: Number(latest.und||1),
      pu_sin_iva: Number(latest.pu_sin_iva||0),
      pu_con_iva: Number(latest.pu_con_iva||0),
      total_sin_iva: (Number(latest.und||1)) * (Number(latest.pu_sin_iva||0)),
      ciudad_entrega: latest.ciudad_entrega || '',
      fecha_entrega: latest.fecha_entrega_real || latest.fecha_entrega || '',
      garantia_meses: garantia,
      avgPrice,
      calidad: perf.calidad,
      entrega_dias: perf.entrega_dias,
      observaciones: latest.observaciones || '',
      segunda_empresa: latest.segunda_empresa || '',
      segunda_precio: latest.segunda_precio || 0,
      segunda_descripcion: latest.segunda_descripcion || '',
    });
  }

  if (!rows.length) {
    tbody.innerHTML = `<tr><td colspan="11" class="muted" style="text-align:center;padding:16px;">Sin datos.</td></tr>`;
    if (rank) rank.innerHTML = `<div class="muted">Sin datos.</div>`;
    return;
  }

  // Normalize scoring (price: lower=better, delivery days: lower=better, warranty/quality: higher=better)
  const prices = rows.map((r) => r.avgPrice).filter((p) => p > 0);
  const minP = Math.min(...prices), maxP = Math.max(...prices);
  const pSpan = Math.max(1e-9, maxP - minP);

  // For delivery: parse fecha_entrega as date, days from today
  const today = new Date();
  function parseFechaTodays(f) {
    if (!f) return null;
    const d = new Date(f);
    if (isNaN(d)) return null;
    return Math.max(0, Math.round((d - today) / 86400000));
  }

  const deliveries = rows.map((r) => parseFechaTodays(r.fecha_entrega)).filter((d) => d !== null);
  const minDel = deliveries.length ? Math.min(...deliveries) : 0;
  const maxDel = deliveries.length ? Math.max(...deliveries) : 0;
  const delSpan = Math.max(1e-9, maxDel - minDel);

  const warranties = rows.map((r) => r.garantia_meses);
  const minWar = Math.min(...warranties), maxWar = Math.max(...warranties);
  const warSpan = Math.max(1e-9, maxWar - minWar);

  const scored = rows.map((r) => {
    const priceScore    = r.avgPrice > 0 ? 1 - (r.avgPrice - minP) / pSpan : 0.5;
    const delDays       = parseFechaTodays(r.fecha_entrega);
    const deliveryScore = delDays !== null && deliveries.length > 1 ? 1 - (delDays - minDel) / delSpan : 0.5;
    const warScore      = warSpan > 1e-8 ? (r.garantia_meses - minWar) / warSpan : 0.5;
    const qualScore     = (Math.max(1, Math.min(5, r.calidad)) - 1) / 4;
    const total = weights.price * priceScore + weights.delivery * deliveryScore + weights.warranty * warScore + weights.quality * qualScore;
    const score100 = Math.round(total * 100);
    return { ...r, score: score100, rating: Math.max(1, Math.min(5, Math.round((score100 / 100) * 4 + 1))), priceScore, deliveryScore };
  });

  scored.sort((a, b) => b.score - a.score);
  window.__lastCompareRows = scored;

  const best = scored[0];

  // --- KPIs ---
  if (kpis) {
    const totalCot = quotes.length;
    const bestPrice = best.pu_sin_iva > 0 ? formatMoneyCOP(best.pu_sin_iva) : '—';
    const totalPedido = best.total_sin_iva > 0 ? formatMoneyCOP(best.total_sin_iva) : '—';
    kpis.innerHTML = `
      <div class="compare-kpi"><div class="lbl">Cotizaciones</div><div class="val">${totalCot}</div></div>
      <div class="compare-kpi"><div class="lbl">Mejor precio</div><div class="val" style="color:var(--accent);">${bestPrice}</div></div>
      <div class="compare-kpi"><div class="lbl">Total (mejor opción)</div><div class="val">${totalPedido}</div></div>
      <div class="compare-kpi"><div class="lbl">Ganador</div><div class="val" style="font-size:15px;">${escapeHtml(best.provider)} ${stars(best.rating)}</div></div>
    `;
  }

  // --- Ranking cards ---
  if (rank) {
    const topScore = Math.max(1, scored[0].score);
    rank.innerHTML = scored.map((r, idx) => {
      const medalClass = idx === 0 ? 'g1' : idx === 1 ? 'g2' : idx === 2 ? 'g3' : 'gN';
      const fillPct = Math.round((r.score / topScore) * 100);
      const winLabel = idx === 0 ? `<span class="winner-badge">★ Mejor opción</span>` : '';
      const seg = r.segunda_empresa ? `<span style="font-size:11px;color:var(--muted);margin-left:6px;">2ª: ${escapeHtml(r.segunda_empresa)}</span>` : '';
      return `
        <div class="rank-row" style="display:flex;align-items:center;gap:12px;padding:12px;border:1px solid var(--border);border-radius:12px;${idx===0?'border-color:var(--accent);background:rgba(0,120,255,.06);':''}">
          <div class="rank-medal ${medalClass}">${idx+1}</div>
          <div style="flex:1;min-width:0;">
            <div style="font-weight:800;font-size:14px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
              ${escapeHtml(r.provider)} ${winLabel} ${seg}
            </div>
            <div class="muted" style="font-size:12px;margin-top:3px;">
              ${r.pu_sin_iva > 0 ? formatMoneyCOP(r.pu_sin_iva) + ' / ud' : '—'}
              ${r.fecha_entrega ? ' · Entrega: ' + escapeHtml(r.fecha_entrega) : ''}
              ${r.garantia_meses ? ' · Garantía: ' + r.garantia_meses + 'm' : ''}
              ${r.ciudad_entrega ? ' · ' + escapeHtml(r.ciudad_entrega) : ''}
            </div>
            <div style="margin-top:6px;height:6px;background:rgba(255,255,255,.08);border-radius:3px;overflow:hidden;">
              <div style="width:${fillPct}%;height:100%;background:${idx===0?'var(--accent)':'rgba(255,255,255,.2)'};border-radius:3px;"></div>
            </div>
          </div>
          <div style="text-align:right;flex-shrink:0;">
            <div class="stars-sm" title="Calificación ponderada">${escapeHtml(stars(r.rating))}</div>
            <div class="muted" style="font-size:12px;">${r.score}%</div>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- Detail table ---
  tbody.innerHTML = '';
  scored.forEach((r, idx) => {
    const tr = document.createElement('tr');
    if (idx === 0) tr.style.background = 'rgba(0,120,255,.06)';
    const totalFmt = r.total_sin_iva > 0 ? escapeHtml(formatMoneyCOP(r.total_sin_iva)) : '—';
    const priceFmt = r.pu_sin_iva > 0 ? escapeHtml(formatMoneyCOP(r.pu_sin_iva)) : '—';
    const winBadge = idx === 0 ? ' <span class="winner-badge" style="font-size:10px;">★</span>' : '';
    tr.innerHTML = `
      <td style="font-weight:700;">${escapeHtml(r.provider)}${winBadge}</td>
      <td>${escapeHtml(r.descripcion)}</td>
      <td class="muted">${escapeHtml(r.codigo_bia||'—')}</td>
      <td style="text-align:center;">${escapeHtml(String(r.und))}</td>
      <td>${priceFmt}</td>
      <td style="font-weight:700;">${totalFmt}</td>
      <td class="muted">${escapeHtml(r.ciudad_entrega||'—')}</td>
      <td class="muted">${escapeHtml(r.fecha_entrega||'—')}</td>
      <td>${r.garantia_meses ? r.garantia_meses + ' m' : '—'}</td>
      <td><b>${r.score}%</b></td>
      <td class="stars-sm">${escapeHtml(stars(r.rating))}</td>
    `;
    tbody.appendChild(tr);
  });
}

// ------------------------
// Provider detail page
// ------------------------
function exportSingleProviderCsv(id) {
  const p = getProviderById(id);
  if (!p) return;
  const header = ['it','empresa','rut','ciudad','direccion','categoria','estado','representante','celular_telefono','correo_electronico','pagina_web','servicios_productos','observaciones','calidad','entrega_dias','garantia_meses'];
  const rows = [header, header.map((k) => p[k] ?? '')];
  downloadTextFile(`proveedor_${String(p.it)}.csv`, toCsv(rows), 'text/csv;charset=utf-8');
}



// ------------------------
// SKU page — multi-select cart
// ------------------------

const skuCart = new Set(); // set of skuIds

function updateSkuCartTray() {
  const tray = document.getElementById('skuCartTray');
  const label = document.getElementById('cartCountLabel');
  if (!tray) return;
  if (skuCart.size === 0) {
    tray.classList.add('hidden');
  } else {
    tray.classList.remove('hidden');
    if (label) label.textContent = `${skuCart.size} SKU${skuCart.size > 1 ? 's' : ''} seleccionado${skuCart.size > 1 ? 's' : ''}`;
  }
}

function setupSkuPage() {
  const input      = document.getElementById('skuSearchInput');
  const form       = document.getElementById('skuSearchForm');
  const resultsEl  = document.getElementById('skuResults');
  const sugEl      = document.getElementById('skuSuggestions');
  const statsEl    = document.getElementById('skuStats');
  const categorySel= document.getElementById('skuCategoryFilter');

  if (!input || !form || !resultsEl) return;

  const catalog = Array.isArray(window.skuCatalogData) ? window.skuCatalogData : [];
  const catalogIndexed = catalog.map((x) => ({
    id: String(x.id ?? x.sku),
    sku: String(x.sku ?? ''),
    category: String(x.category ?? ''),
    status: String(x.status ?? ''),
    critical: Boolean(x.critical),
    skuNorm: normalizeText(String(x.sku ?? '')),
    categoryNorm: normalizeText(String(x.category ?? '')),
  })).filter((x) => x.sku);

  const OFFERS_KEY = 'skuOffersById';

  function displayCategoryLabel(cat) {
    const c = String(cat || '').trim();
    if (!c) return '';
    const map = {
      'Medidor': 'Medidores',
      'Transformador De Corriente': 'Transformadores de corriente',
      'Transformador De Potencial': 'Transformadores de potencial',
      'Transformador De Corriente BM': 'Transformadores de corriente (BM)',
      'Banco Condensador': 'Bancos de condensadores',
      'Condensador': 'Condensadores',
    };
    return map[c] || c;
  }

  function loadOffersStore() {
    // Use Supabase data if available
    if (window._sbData && window._sbData.loaded && window._sbData.skuOffers) {
      return window._sbData.skuOffers;
    }
    var store = {};
    try { var r = localStorage.getItem(OFFERS_KEY); store = r ? JSON.parse(r) : {}; if (typeof store !== 'object' || store === null) store = {}; } catch(e) { store = {}; }
    // Fallback: merge from window.skuOffersData (JS variable from sku_offers.js)
    if (Array.isArray(window.skuOffersData)) {
      for (var i = 0; i < window.skuOffersData.length; i++) {
        var entry = window.skuOffersData[i];
        var skuId = String(entry[0]);
        var offers = entry[1];
        if (!store[skuId] || !Array.isArray(store[skuId]) || store[skuId].length === 0) {
          store[skuId] = offers;
        }
      }
    }
    return store;
  }
  function saveOffersStore(store) { localStorage.setItem(OFFERS_KEY, JSON.stringify(store||{})); }
  function getOffersForSkuId(skuId) {
    const store = loadOffersStore();
    const arr = Array.isArray(store?.[skuId]) ? store[skuId] : [];
    return arr.map((o) => ({ provider: String(o.provider||'').trim(), price_sin_iva: Number(o.price_sin_iva)||0, updatedAt: o.updatedAt||'' })).filter((o) => o.provider && o.price_sin_iva > 0);
  }
  function upsertOffer(skuId, providerName, priceSinIva) {
    const provider = String(providerName||'').trim();
    const price = Number(priceSinIva);
    if (!provider || !(price > 0)) return { ok: false };
    const store = loadOffersStore();
    const list = Array.isArray(store[skuId]) ? store[skuId] : [];
    const pNorm = normalizeText(provider);
    const idx = list.findIndex((x) => normalizeText(String(x.provider||'')) === pNorm);
    const now = new Date().toISOString();
    if (idx >= 0) list[idx] = { ...list[idx], provider, price_sin_iva: price, updatedAt: now };
    else list.push({ provider, price_sin_iva: price, createdAt: now, updatedAt: now });
    store[skuId] = list;
    saveOffersStore(store);
    return { ok: true };
  }
  function deleteOffer(skuId, providerName) {
    const pNorm = normalizeText(String(providerName||'').trim());
    const store = loadOffersStore();
    const list = Array.isArray(store[skuId]) ? store[skuId] : [];
    const next = list.filter((x) => normalizeText(String(x.provider||'')) !== pNorm);
    if (next.length) store[skuId] = next; else delete store[skuId];
    saveOffersStore(store);
  }

  function getProviderNames() {
    try { return getAllProviders().map((p) => String(p.empresa||p.company||p.name||'').trim()).filter(Boolean); } catch { return []; }
  }
  const providerNames = Array.from(new Set(getProviderNames())).sort((a,b) => a.localeCompare(b));

  // Category filter
  if (categorySel) {
    const cats = Array.from(new Set(catalogIndexed.map((x) => x.category).filter(Boolean))).sort((a,b) => a.localeCompare(b));
    categorySel.innerHTML = `<option value="">Todas las categorías</option>` + cats.map((c) => `<option value="${escapeHtml(c)}">${escapeHtml(displayCategoryLabel(c))}</option>`).join('');
  }
  if (statsEl) {
    const catsCount = new Set(catalogIndexed.map((x) => x.category).filter(Boolean)).size;
    statsEl.textContent = `SKUs: ${catalogIndexed.length} · Categorías: ${catsCount} · ${window.SKU_CATALOG_GENERATED_AT || ''}`;
  }

  let activeSkuId = null;

  function hideSuggestions() { if (!sugEl) return; sugEl.style.display='none'; sugEl.innerHTML=''; }
  function getFilteredCatalog() {
    const sel = categorySel ? String(categorySel.value||'').trim() : '';
    if (!sel) return catalogIndexed;
    const selNorm = normalizeText(sel);
    return catalogIndexed.filter((x) => x.categoryNorm === selNorm);
  }

  function showSuggestions(matches) {
    if (!sugEl || !matches.length) { hideSuggestions(); return; }
    sugEl.style.display = 'block';
    sugEl.innerHTML = matches.slice(0,8).map((m) => {
      const count = getOffersForSkuId(m.id).length;
      return `<div class="suggestion-item" data-sku-id="${escapeHtml(m.id)}">
        <div class="suggestion-title">${escapeHtml(m.sku)}</div>
        <div class="muted suggestion-meta">${escapeHtml(displayCategoryLabel(m.category))} · ${count} prov.</div>
      </div>`;
    }).join('');
    sugEl.querySelectorAll('.suggestion-item').forEach((el) => {
      el.addEventListener('click', () => {
        const skuId = el.getAttribute('data-sku-id')||'';
        const match = catalogIndexed.find((x) => x.id === skuId);
        if (match) { input.value = match.sku; hideSuggestions(); renderSelectedSku(match.id); }
      });
    });
  }

  // --- Render catalog table with checkboxes ---
  function renderCatalogTable(list, title) {
    const rows = list.map((m) => {
      const offers = getOffersForSkuId(m.id).length;
      const checked = skuCart.has(m.id);
      return `
        <tr class="${checked?'sku-row-selected':''}">
          <td><div class="sku-row-check">
            <input type="checkbox" ${checked?'checked':''} data-cart-sku="${escapeHtml(m.id)}" />
          </div></td>
          <td style="font-weight:700;">${escapeHtml(m.sku)}</td>
          <td class="muted">${escapeHtml(displayCategoryLabel(m.category))}</td>
          <td style="text-align:center;">${offers}</td>
          <td style="text-align:right;white-space:nowrap;">
            <button class="btn btn-primary" type="button" style="padding:5px 10px;font-size:12px;" data-open-sku="${escapeHtml(m.id)}">Abrir</button>
          </td>
        </tr>
      `;
    }).join('');

    resultsEl.innerHTML = `
      <div class="muted" style="margin-bottom:8px;">${escapeHtml(title)} · ${list.length} SKU(s) · <span style="color:var(--accent);">${skuCart.size} seleccionado(s)</span></div>
      <div style="overflow:auto;">
        <table>
          <thead><tr><th style="width:32px;"></th><th>SKU</th><th>Categoría</th><th style="text-align:center;">Ofertas</th><th style="text-align:right;">Acción</th></tr></thead>
          <tbody>${rows || '<tr><td colspan="5" class="muted">Sin SKUs.</td></tr>'}</tbody>
        </table>
      </div>
    `;

    resultsEl.querySelectorAll('[data-cart-sku]').forEach((cb) => {
      cb.addEventListener('change', () => {
        const id = cb.getAttribute('data-cart-sku');
        if (cb.checked) skuCart.add(id); else skuCart.delete(id);
        updateSkuCartTray();
        const row = cb.closest('tr');
        if (row) row.classList.toggle('sku-row-selected', cb.checked);
      });
    });
    resultsEl.querySelectorAll('[data-open-sku]').forEach((btn) => {
      btn.addEventListener('click', () => renderSelectedSku(btn.getAttribute('data-open-sku')));
    });
  }

  function renderMatchesList(matches, query) {
    const items = matches.slice(0,30).map((m) => {
      const offers = getOffersForSkuId(m.id);
      const best = offers.length ? Math.min(...offers.map((o) => o.price_sin_iva)) : null;
      const checked = skuCart.has(m.id);
      return `
        <div class="card ${checked?'sku-row-selected':''}" style="margin-bottom:10px;">
          <div class="card-header" style="display:flex;align-items:center;gap:10px;">
            <input type="checkbox" ${checked?'checked':''} data-cart-sku="${escapeHtml(m.id)}" style="accent-color:var(--accent);width:16px;height:16px;" />
            <div style="flex:1;">
              <div class="card-title" style="font-size:14px;">${escapeHtml(m.sku)}</div>
              <div class="card-subtitle">${escapeHtml(displayCategoryLabel(m.category))} · Ofertas: ${offers.length}${best?` · Mejor: ${formatCOP(best)}`:''}</div>
            </div>
            <button class="btn btn-primary" type="button" style="padding:6px 10px;" data-open-sku="${escapeHtml(m.id)}">Abrir</button>
          </div>
        </div>
      `;
    }).join('');

    resultsEl.innerHTML = `<div class="muted" style="margin-bottom:10px;">Coincidencias: ${matches.length} · <span style="color:var(--accent);">${skuCart.size} seleccionado(s)</span></div>${items||'<div class="muted">Sin coincidencias.</div>'}`;

    resultsEl.querySelectorAll('[data-cart-sku]').forEach((cb) => {
      cb.addEventListener('change', () => {
        const id = cb.getAttribute('data-cart-sku');
        if (cb.checked) skuCart.add(id); else skuCart.delete(id);
        updateSkuCartTray();
        const card = cb.closest('.card');
        if (card) card.classList.toggle('sku-row-selected', cb.checked);
      });
    });
    resultsEl.querySelectorAll('[data-open-sku]').forEach((btn) => {
      btn.addEventListener('click', () => renderSelectedSku(btn.getAttribute('data-open-sku')));
    });
  }

  function renderSelectedSku(skuId) {
    const match = catalogIndexed.find((x) => x.id === String(skuId));
    if (!match) { resultsEl.innerHTML = `<div class="muted">SKU no encontrado.</div>`; return; }
    activeSkuId = match.id;

    const offers = getOffersForSkuId(match.id).slice().sort((a,b) => a.price_sin_iva - b.price_sin_iva);
    const best = offers.length ? offers[0].price_sin_iva : null;
    const inCart = skuCart.has(match.id);

    const offersRows = offers.map((o) => {
      const conIva = o.price_sin_iva * 1.19;
      return `
        <tr>
          <td style="font-weight:700;">${escapeHtml(o.provider)}</td>
          <td>${formatCOP(o.price_sin_iva)}</td>
          <td>${formatCOP(conIva)}</td>
          <td style="text-align:right;white-space:nowrap;">
            <button class="btn btn-primary" type="button" style="padding:6px 10px;" data-cotizar-provider="${escapeHtml(o.provider)}" data-cotizar-price="${o.price_sin_iva}">Cotizar</button>
            <button class="btn" type="button" style="padding:6px 10px;margin-left:6px;" data-del-offer="${escapeHtml(o.provider)}">Quitar</button>
          </td>
        </tr>
      `;
    }).join('');

    const providersDatalist = providerNames.length ? `<datalist id="skuProvidersList">${providerNames.map((p)=>`<option value="${escapeHtml(p)}"></option>`).join('')}</datalist>` : '';

    resultsEl.innerHTML = `
      <div class="card" style="margin-top:0;">
        <div class="card-header" style="display:flex;align-items:flex-start;gap:10px;">
          <div style="padding-top:4px;">
            <input type="checkbox" ${inCart?'checked':''} id="skuCartCheckbox" style="accent-color:var(--accent);width:18px;height:18px;cursor:pointer;" title="Agregar al carrito de cotización" />
          </div>
          <div style="flex:1;">
            <div class="card-title">${escapeHtml(match.sku)}</div>
            <div class="card-subtitle">${escapeHtml(displayCategoryLabel(match.category))}${match.critical?' · <b>Crítico</b>':''}${best?` · Mejor: ${formatCOP(best)}`:''}${inCart?' · <span style="color:var(--accent);font-weight:700;">✓ En selección</span>':''}</div>
          </div>
        </div>
        <div class="card-body">
          <div style="overflow:auto;">
            <table>
              <thead><tr><th>Proveedor</th><th>Sin IVA</th><th>Con IVA</th><th style="text-align:right;">Acciones</th></tr></thead>
              <tbody>${offersRows||`<tr><td colspan="4" class="muted">Sin ofertas. Agrega una abajo.</td></tr>`}</tbody>
            </table>
          </div>
          <div style="margin-top:14px;border-top:1px solid var(--border);padding-top:14px;">
            <div class="card-title" style="font-size:14px;margin-bottom:10px;">Agregar proveedor y precio</div>
            <form id="skuAddOfferForm" class="form-grid" autocomplete="off">
              <div class="col-8">
                <label for="skuOfferProvider">Proveedor</label>
                <input class="input" id="skuOfferProvider" list="skuProvidersList" placeholder="Proveedor..." />${providersDatalist}
              </div>
              <div class="col-4">
                <label for="skuOfferPrice">Precio sin IVA</label>
                <input class="input" id="skuOfferPrice" type="number" min="0" step="0.01" placeholder="0" />
              </div>
              <div class="col-12" style="display:flex;gap:10px;justify-content:flex-end;">
                <button class="btn btn-primary" type="submit">Guardar oferta</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;

    // Cart checkbox
    document.getElementById('skuCartCheckbox')?.addEventListener('change', (e) => {
      if (e.target.checked) skuCart.add(match.id); else skuCart.delete(match.id);
      updateSkuCartTray();
      showToast(e.target.checked ? `✓ "${match.sku}" agregado a la selección` : `"${match.sku}" removido de la selección`);
    });

    // Cotizar button
    resultsEl.querySelectorAll('[data-cotizar-provider]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const provider = btn.getAttribute('data-cotizar-provider')||'';
        const price = Number(btn.getAttribute('data-cotizar-price'))||0;
        prefillQuoteFromSku(provider, match.sku, price);
      });
    });

    // Delete offer
    resultsEl.querySelectorAll('[data-del-offer]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const provider = btn.getAttribute('data-del-offer')||'';
        if (!provider) return;
        if (!confirm(`¿Quitar la oferta de ${provider}?`)) return;
        deleteOffer(match.id, provider);
        renderSelectedSku(match.id);
      });
    });

    // Add offer form
    document.getElementById('skuAddOfferForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const prov  = document.getElementById('skuOfferProvider')?.value||'';
      const price = document.getElementById('skuOfferPrice')?.value||'';
      const res = upsertOffer(match.id, prov, price);
      if (!res.ok) { alert('Completa proveedor y precio (> 0).'); return; }
      renderSelectedSku(match.id);
    });
  }

  function runSearch(query) {
    const q = String(query||'').trim();
    const pool = getFilteredCatalog();
    if (!q) {
      const sel = categorySel ? String(categorySel.value||'').trim() : '';
      renderCatalogTable(pool, sel ? `SKUs: ${displayCategoryLabel(sel)}` : 'Todos los SKUs');
      return;
    }
    const qNorm = normalizeText(q);
    const exact = pool.find((x) => x.skuNorm === qNorm);
    if (exact) { renderSelectedSku(exact.id); return; }
    const matches = pool.filter((x) => x.skuNorm.includes(qNorm) || x.categoryNorm.includes(qNorm));
    if (!matches.length) { resultsEl.innerHTML = `<div class="muted">Sin coincidencias para <b>${escapeHtml(q)}</b>.</div>`; return; }
    if (matches.length === 1) { renderSelectedSku(matches[0].id); return; }
    renderMatchesList(matches, q);
  }

  input.addEventListener('input', () => {
    const q = input.value;
    const qNorm = normalizeText(q);
    if (!qNorm) { hideSuggestions(); runSearch(''); return; }
    const pool = getFilteredCatalog();
    // Show suggestions dropdown
    const sugMatches = pool.filter((x) => x.skuNorm.includes(qNorm) || x.categoryNorm.includes(qNorm));
    showSuggestions(sugMatches.slice(0,8));
    // ALSO show full results in Results panel when 2+ chars
    if (qNorm.length >= 2) {
      if (sugMatches.length === 0) {
        resultsEl.innerHTML = '<div class="muted">Sin coincidencias para <b>' + escapeHtml(q) + '</b>.</div>';
      } else if (sugMatches.length === 1) {
        renderSelectedSku(sugMatches[0].id);
      } else {
        renderMatchesList(sugMatches, q);
      }
    }
  });
  input.addEventListener('blur', () => setTimeout(hideSuggestions, 180));
  form.addEventListener('submit', (e) => { e.preventDefault(); hideSuggestions(); runSearch(input.value); });

  document.getElementById('skuClearBtn')?.addEventListener('click', () => {
    input.value = ''; activeSkuId = null; hideSuggestions();
    resultsEl.innerHTML = `<div class="muted">Busca un SKU para ver o registrar proveedores y precios.</div>`;
    input.focus();
  });

  document.getElementById('skuTopBtn')?.addEventListener('click', () => {
    const pool = getFilteredCatalog();
    const withOffers = pool.map((x) => ({...x, offerCount: getOffersForSkuId(x.id).length})).filter((x) => x.offerCount > 0).sort((a,b) => b.offerCount - a.offerCount).slice(0,12);
    if (!withOffers.length) { resultsEl.innerHTML = `<div class="muted">Sin ofertas registradas aún.</div>`; return; }
    renderMatchesList(withOffers, 'SKUs con ofertas');
  });

  categorySel?.addEventListener('change', () => {
    hideSuggestions();
    if (!String(input.value||'').trim()) {
      const pool = getFilteredCatalog();
      const sel = categorySel ? String(categorySel.value||'').trim() : '';
      renderCatalogTable(pool, sel ? `SKUs: ${displayCategoryLabel(sel)}` : 'Todos los SKUs');
      return;
    }
    if (activeSkuId && !getFilteredCatalog().some((x) => x.id === activeSkuId)) {
      activeSkuId = null;
      resultsEl.innerHTML = `<div class="muted">Filtro aplicado. Busca un SKU.</div>`;
    }
  });

  // Cart tray buttons
  document.getElementById('btnCotizarSeleccionados')?.addEventListener('click', () => {
    if (!skuCart.size) return;
    const skuIds = Array.from(skuCart);
    const skusPayload = skuIds.map((id) => {
      const match = catalogIndexed.find((x) => x.id === id);
      if (!match) return null;
      const offers = getOffersForSkuId(id);
      const bestOffer = offers.length ? offers.slice().sort((a,b) => a.price_sin_iva - b.price_sin_iva)[0] : null;
      return { sku: match.sku, skuId: id, pu_sin_iva: bestOffer?.price_sin_iva || 0, provider: bestOffer?.provider || '' };
    }).filter(Boolean);

    localStorage.setItem('quotePrefill', JSON.stringify({ skus: skusPayload, providers: [] }));
    window.location.href = 'quotes.html';
  });

  document.getElementById('btnLimpiarCarrito')?.addEventListener('click', () => {
    skuCart.clear();
    updateSkuCartTray();
    runSearch(input.value);
    showToast('Selección limpiada.');
  });

  const qp = getQueryParam('q');
  if (qp) { input.value = qp; runSearch(qp); }
  else { runSearch(''); }
}

function prefillQuoteFromSku(provider, sku, priceSinIva) {
  const payload = { provider, description: sku, und: 1, pu_sin_iva: priceSinIva };
  localStorage.setItem('quotePrefill', JSON.stringify(payload));
  window.location.href = 'quotes.html';
}




// ------------------------
// Utility & Page functions (restored)
// ------------------------

function normalizeText(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatCOP(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return '—';
  try {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);
  } catch (e) {
    return '$ ' + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}

function updateHomeKpis() {
  const providers = getAllProviders();
  const quotes = getAllQuotes();

  const totalProviders = providers.length;
  const activeProviders = providers.filter((p) => String(p.estado || '').toUpperCase() === 'ACTIVO').length;
  const totalQuotes = quotes.length;

  const uniqueDesc = new Set(quotes.map((q) => String(q.descripcion || '').trim()).filter(Boolean)).size;

  const elProviders = document.getElementById('kpiProviders');
  const elActive = document.getElementById('kpiActive');
  const elQuotes = document.getElementById('kpiQuotes');
  const elUnique = document.getElementById('kpiUnique');

  if (elProviders) elProviders.textContent = String(totalProviders);
  if (elActive) elActive.textContent = String(activeProviders);
  if (elQuotes) elQuotes.textContent = String(totalQuotes);
  if (elUnique) elUnique.textContent = String(uniqueDesc);

  const recent = document.getElementById('recentQuotes');
  if (recent) {
    const recentList = quotes
      .slice()
      .sort((a, b) => String(b.fecha || '').localeCompare(String(a.fecha || '')))
      .slice(0, 6);

    if (!recentList.length) {
      recent.textContent = 'Sin cotizaciones registradas aún.';
    } else {
      recent.innerHTML = recentList
        .map((q) => {
          return `
            <div style="display:flex; justify-content:space-between; gap: 10px; padding: 10px 12px; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; background: rgba(255,255,255,0.04); margin-bottom: 8px;">
              <div style="min-width:0;">
                <div style="font-weight:700; font-size: 12px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(q.descripcion || '')}</div>
                <div class="muted" style="font-size: 12px; margin-top: 4px;">${escapeHtml(q.empresa || '')} · ${escapeHtml(q.fecha || '')}</div>
              </div>
              <div style="font-weight:700; font-size: 12px; white-space:nowrap;">${escapeHtml(formatMoneyCOP(q.pu_sin_iva))}</div>
            </div>
          `;
        })
        .join('');
    }
  }
}

// ------------------------
// Init
// ------------------------


// ------------------------
// SKU page (search equipment -> providers + price)
// ------------------------

function setupProviderDetailPage() {
  const container = document.getElementById('providerDetail');
  if (!container) return;
  const id = getQueryParam('it');
  if (!id) {
    container.innerHTML = `<div class="muted">No se especificó el proveedor.</div>`;
    return;
  }
  const p = getProviderById(id);
  if (!p) {
    container.innerHTML = `<div class="muted">No se encontró el proveedor solicitado.</div>`;
    return;
  }
  const perf = normalizeProviderPerf(p);

  const quotes = getAllQuotes()
    .filter((q) => String(q.empresa||'').trim().toLowerCase() === String(p.empresa||'').trim().toLowerCase())
    .slice()
    .sort((a,b) => String(b.fecha||'').localeCompare(String(a.fecha||'')));

  const recent = quotes.slice(0, 8);

  // Top items from quotes
  const byDesc = new Map();
  quotes.forEach((q) => {
    const d = String(q.descripcion||'').trim();
    if (!d) return;
    if (!byDesc.has(d)) byDesc.set(d, []);
    byDesc.get(d).push(Number(q.pu_sin_iva) || 0);
  });
  const topItems = Array.from(byDesc.entries())
    .map(([d, prices]) => {
      const valid = prices.filter((x) => Number.isFinite(x) && x > 0);
      const avg = valid.length ? valid.reduce((a,b)=>a+b,0)/valid.length : 0;
      return { desc: d, avg };
    })
    .sort((a,b)=>b.avg - a.avg)
    .slice(0, 10);

  const deleteLabel = isExtraProvider(p.it) ? 'Eliminar' : 'Ocultar';

  container.innerHTML = `
    <div class="card">
      <div class="card-header">
        <div>
          <div class="card-title">${escapeHtml(p.empresa||'Proveedor')}</div>
          <div class="card-subtitle">RUT: ${escapeHtml(p.rut||'—')} · ID: ${escapeHtml(p.it)}</div>
        </div>
        <div class="topbar-actions">
          <a class="btn btn-primary" href="quotes.html?provider=${encodeURIComponent(String(p.empresa||''))}">Crear cotización</a>
        </div>
      </div>
      <div class="card-body">
        <div class="badges" style="margin-bottom: 12px;">
          <span class="badge">${escapeHtml(String(p.ciudad||'—'))}</span>
          <span class="badge ${String(p.categoria||'').toUpperCase()==='DISPONIBLE'?'good':'warn'}">${escapeHtml(String(p.categoria||'—').toUpperCase())}</span>
          <span class="badge ${String(p.estado||'').toUpperCase()==='ACTIVO'?'good':'warn'}">${escapeHtml(String(p.estado||'—').toUpperCase())}</span>
        </div>

        <div class="grid-3">
          <div class="kpi">
            <div class="kpi-label">Calidad</div>
            <div class="kpi-value">${escapeHtml(perf.calidad)} <span class="stars">${escapeHtml(stars(perf.calidad))}</span></div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Entrega (días)</div>
            <div class="kpi-value">${escapeHtml(perf.entrega_dias)}</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Garantía (meses)</div>
            <div class="kpi-value">${escapeHtml(perf.garantia_meses)}</div>
          </div>
        </div>

        <div class="divider" style="margin: 14px 0;"></div>

        <div class="grid-2">
          <div class="card">
            <div class="card-header"><div class="card-title">Contacto</div></div>
            <div class="card-body" style="line-height:1.8;">
              ${p.representante ? `<div><b>Representante:</b> ${escapeHtml(p.representante)}</div>` : '<div class="muted">Sin representante</div>'}
              ${p.celular ? `<div><b>Tel:</b> ${escapeHtml(p.celular)}</div>` : ''}
              ${p.correo ? `<div><b>Correo:</b> ${escapeHtml(p.correo)}</div>` : ''}
              ${p.pagina_web ? `<div><b>Web:</b> ${escapeHtml(p.pagina_web)}</div>` : ''}
              ${p.direccion ? `<div><b>Dirección:</b> ${escapeHtml(p.direccion)}</div>` : ''}
            </div>
          </div>
          <div class="card">
            <div class="card-header"><div class="card-title">Catálogo</div></div>
            <div class="card-body">
              ${(String(p.servicios_productos||'').trim())
                ? `<div class="tag-list">${String(p.servicios_productos||'').split(',').map((s)=>s.trim()).filter(Boolean).slice(0, 24).map((s)=>`<span class="tag">${escapeHtml(s)}</span>`).join('')}</div>`
                : `<div class="muted">Sin catálogo/servicios cargados.</div>`}
            </div>
          </div>
        </div>

        <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top: 12px;">
          <button class="btn" type="button" onclick="toggleProviderInlineEdit('${escapeHtml(p.it)}')">Editar (inline)</button>
          <button class="btn btn-danger" type="button" onclick="confirmDeleteProvider('${escapeHtml(p.it)}')">${deleteLabel}</button>
          <button class="btn" type="button" onclick="clearProviderOverride('${escapeHtml(p.it)}'); location.reload();">Revertir cambios</button>
          <a class="btn" href="providers.html">Volver</a>
        </div>

        <div class="inline-edit" id="inlineEdit-${escapeHtml(p.it)}" style="display:none; margin-top: 12px;">
          <div class="divider"></div>
          <div class="form-grid" style="margin-top: 12px;">
            <div class="col-12">
              <label>Empresa</label>
              <input class="input" id="ie-empresa-${escapeHtml(p.it)}" value="${escapeHtml(p.empresa)}" />
            </div>
            <div class="col-6">
              <label>RUT</label>
              <input class="input" id="ie-rut-${escapeHtml(p.it)}" value="${escapeHtml(p.rut || '')}" />
            </div>
            <div class="col-6">
              <label>Ciudad</label>
              <input class="input" id="ie-ciudad-${escapeHtml(p.it)}" value="${escapeHtml(p.ciudad || '')}" />
            </div>
            <div class="col-6">
              <label>Categoría</label>
              <select class="input" id="ie-categoria-${escapeHtml(p.it)}">
                <option value="NUEVO" ${String(p.categoria||'').toUpperCase()==='NUEVO'?'selected':''}>NUEVO</option>
                <option value="DISPONIBLE" ${String(p.categoria||'').toUpperCase()==='DISPONIBLE'?'selected':''}>DISPONIBLE</option>
              </select>
            </div>
            <div class="col-6">
              <label>Estado</label>
              <select class="input" id="ie-estado-${escapeHtml(p.it)}">
                <option value="ACTIVO" ${String(p.estado||'').toUpperCase()==='ACTIVO'?'selected':''}>ACTIVO</option>
                <option value="INACTIVO" ${String(p.estado||'').toUpperCase()==='INACTIVO'?'selected':''}>INACTIVO</option>
              </select>
            </div>
            <div class="col-6">
              <label>Representante</label>
              <input class="input" id="ie-representante-${escapeHtml(p.it)}" value="${escapeHtml(p.representante || '')}" />
            </div>
            <div class="col-6">
              <label>Teléfono</label>
              <input class="input" id="ie-celular-${escapeHtml(p.it)}" value="${escapeHtml(p.celular || '')}" />
            </div>
            <div class="col-6">
              <label>Correo</label>
              <input class="input" id="ie-correo-${escapeHtml(p.it)}" value="${escapeHtml(p.correo || '')}" />
            </div>
            <div class="col-6">
              <label>Web</label>
              <input class="input" id="ie-web-${escapeHtml(p.it)}" value="${escapeHtml(p.pagina_web || '')}" />
            </div>

            <div class="col-4">
              <label>Calidad (1-5)</label>
              <input class="input" type="number" min="1" max="5" step="1" id="ie-calidad-${escapeHtml(p.it)}" value="${escapeHtml(perf.calidad)}" />
            </div>
            <div class="col-4">
              <label>Entrega (días)</label>
              <input class="input" type="number" min="0" step="1" id="ie-entrega-${escapeHtml(p.it)}" value="${escapeHtml(perf.entrega_dias)}" />
            </div>
            <div class="col-4">
              <label>Garantía (meses)</label>
              <input class="input" type="number" min="0" step="1" id="ie-garantia-${escapeHtml(p.it)}" value="${escapeHtml(perf.garantia_meses)}" />
            </div>

            <div class="col-12">
              <label>Servicios / Productos (coma)</label>
              <textarea class="input" id="ie-servicios-${escapeHtml(p.it)}">${escapeHtml(p.servicios_productos || '')}</textarea>
            </div>
            <div class="col-12">
              <label>Observaciones</label>
              <textarea class="input" id="ie-observaciones-${escapeHtml(p.it)}">${escapeHtml(p.observaciones || '')}</textarea>
            </div>
          </div>
          <div style="display:flex; gap:10px; margin-top: 12px; flex-wrap:wrap;">
            <button class="btn btn-primary" type="button" onclick="saveProviderInlineEdit('${escapeHtml(p.it)}')">Guardar</button>
            <button class="btn" type="button" onclick="toggleProviderInlineEdit('${escapeHtml(p.it)}', true)">Cancelar</button>
          </div>
        </div>

        <div class="divider" style="margin: 16px 0;"></div>

        <div class="grid-2">
          <div class="card">
            <div class="card-header"><div class="card-title">Cotizaciones recientes</div><div class="card-subtitle">Últimas ${escapeHtml(Math.min(8, quotes.length))} de ${escapeHtml(quotes.length)}</div></div>
            <div class="card-body">
              ${recent.length ? `
                <div style="overflow:auto;">
                  <table class="table">
                    <thead><tr><th>Fecha</th><th>Descripción</th><th>PU sin IVA</th><th></th></tr></thead>
                    <tbody>
                      ${recent.map((rq) => `
                        <tr>
                          <td>${escapeHtml(rq.fecha||'')}</td>
                          <td>${escapeHtml(rq.descripcion||'')}</td>
                          <td>${escapeHtml(formatMoneyCOP(rq.pu_sin_iva))}</td>
                          <td><a class="chip" href="quote_detail.html?it=${encodeURIComponent(String(rq.it))}">Ver</a></td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              ` : `<div class="muted">Sin cotizaciones registradas para este proveedor.</div>`}
            </div>
          </div>
          <div class="card">
            <div class="card-header"><div class="card-title">Top ítems cotizados</div><div class="card-subtitle">Promedio PU sin IVA</div></div>
            <div class="card-body">
              ${topItems.length ? `
                <div style="overflow:auto;">
                  <table class="table">
                    <thead><tr><th>Descripción</th><th>Promedio</th></tr></thead>
                    <tbody>
                      ${topItems.map((ti) => `
                        <tr>
                          <td>${escapeHtml(ti.desc)}</td>
                          <td>${escapeHtml(formatMoneyCOP(ti.avg))}</td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              ` : `<div class="muted">Aún no hay datos.</div>`}
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}

// --- Quote SKU Multi-Selector ---
window._selectedQuoteSkus = [];

function setupQuoteSkuSelector() {
  var input = document.getElementById('quote-sku-search');
  var dropdown = document.getElementById('skuDropdown');
  var listEl = document.getElementById('selectedSkuList');
  if (!input || !dropdown) return;
  var catalog = Array.isArray(window.skuCatalogData) ? window.skuCatalogData : [];
  if (!catalog.length) { input.placeholder = 'Catálogo SKU no disponible'; return; }

  input.addEventListener('input', function() {
    var q = (input.value || '').trim().toLowerCase();
    if (q.length < 2) { dropdown.style.display = 'none'; return; }
    var matches = catalog.filter(function(item) {
      return ((item.sku || '') + ' ' + (item.category || '')).toLowerCase().indexOf(q) !== -1;
    }).slice(0, 15);
    if (!matches.length) {
      dropdown.innerHTML = '<div style="padding:12px 16px;color:var(--text-3);font-size:13px;">Sin resultados para "' + escapeHtml(q) + '"</div>';
      dropdown.style.display = 'block'; return;
    }
    dropdown.innerHTML = '';
    matches.forEach(function(item) {
      var already = window._selectedQuoteSkus.some(function(s) { return s.id === item.id; });
      var div = document.createElement('div');
      div.style.cssText = 'padding:10px 14px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.04);';
      if (already) div.style.opacity = '0.4';
      div.innerHTML = '<div><div style="font-weight:600;font-size:13px;color:var(--text);">' + escapeHtml(item.sku) + '</div><div style="font-size:11px;color:var(--text-3);">' + escapeHtml(item.category || '') + '</div></div><span style="font-size:11px;color:' + (already ? 'var(--text-3)' : 'var(--primary)') + ';">' + (already ? 'Ya agregado' : '+ Agregar') + '</span>';
      if (!already) {
        div.onmouseover = function() { div.style.background = 'rgba(255,255,255,0.06)'; };
        div.onmouseout = function() { div.style.background = ''; };
        div.onclick = function() {
          window._selectedQuoteSkus.push({ id: item.id, sku: item.sku, category: item.category, cantidad: 1 });
          renderSelectedQuoteSkus(); input.value = ''; dropdown.style.display = 'none';
          showToast(item.sku + ' agregado', 'success');
        };
      }
      dropdown.appendChild(div);
    });
    dropdown.style.display = 'block';
  });
  document.addEventListener('click', function(e) {
    if (!e.target.closest('#quote-sku-search') && !e.target.closest('#skuDropdown')) dropdown.style.display = 'none';
  });
  renderSelectedQuoteSkus();
}

function renderSelectedQuoteSkus() {
  var el = document.getElementById('selectedSkuList');
  if (!el) return;
  var skus = window._selectedQuoteSkus || [];
  if (!skus.length) { el.innerHTML = '<div class="muted" style="font-size:12px;padding:6px 0;">Escribe arriba para buscar y agregar ítems del catálogo.</div>'; return; }
  el.innerHTML = skus.map(function(s, i) {
    return '<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border:1px solid var(--border);border-radius:var(--r-sm);margin-bottom:6px;background:rgba(255,255,255,0.03);">' +
      '<div style="flex:1;min-width:0;"><div style="font-weight:600;font-size:13px;">' + escapeHtml(s.sku) + '</div><div style="font-size:11px;color:var(--text-3);">' + escapeHtml(s.category || '') + '</div></div>' +
      '<div style="display:flex;align-items:center;gap:6px;"><label style="font-size:11px;color:var(--text-2);margin:0;">Cant:</label><input type="number" min="1" value="' + s.cantidad + '" class="input" style="width:60px;text-align:center;padding:6px;" onchange="window._selectedQuoteSkus[' + i + '].cantidad=parseInt(this.value)||1" /></div>' +
      '<button type="button" onclick="window._selectedQuoteSkus.splice(' + i + ',1);renderSelectedQuoteSkus();" style="background:none;border:none;color:var(--danger);cursor:pointer;font-size:18px;padding:4px 8px;line-height:1;">×</button></div>';
  }).join('');
}

// ------------------------
// Compare page
// ------------------------

document.addEventListener('DOMContentLoaded', async () => {
  // Manejar redirect de OAuth (Google)
  try {
    if (typeof getSupabase === 'function') {
      const sb = getSupabase();
      if (sb && sb.auth && typeof sb.auth.onAuthStateChange === 'function') {
        sb.auth.onAuthStateChange((event, session) => {
          if (event === 'SIGNED_IN' && session) {
            const user = session.user;
            localStorage.setItem('currentUser', JSON.stringify({
              name: user.user_metadata?.full_name || user.email,
              email: user.email,
              avatar: user.user_metadata?.avatar_url || null
            }));
            const path = window.location.pathname;
            if (path === '/' || path.includes('index') || path.includes('login')) {
              window.location.href = 'home.html';
            }
          }
          if (event === 'SIGNED_OUT') {
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
          }
        });
      }
    }
  } catch (e) {
    console.error('Supabase auth state listener:', e);
  }

  const page = document.body.dataset.page || '';
  const isAuthPage = page === 'login' || page === 'register';
  const isPublicPage = page === 'respuesta' || page === '404';

  // Auth check with Supabase
  let sbUser = null;
  if (typeof sbGetUser === 'function') {
    try { sbUser = await sbGetUser(); } catch(e) { console.warn('Auth check failed:', e); }

    // Only redirect NON-auth pages if not logged in
    if (!isPublicPage && !isAuthPage && !sbUser) {
      window.location.href = 'index.html';
      return;
    }

    // Store user info for UI
    if (sbUser) {
      localStorage.setItem('currentUser', JSON.stringify({
        name: sbUser.user_metadata?.full_name || sbUser.email?.split('@')[0] || 'Usuario',
        email: sbUser.email || ''
      }));
    }
  } else {
    // Fallback: old localStorage check
    if (!isPublicPage && !isAuthPage && !localStorage.getItem('currentUser')) {
      window.location.href = 'index.html';
      return;
    }
  }

  setActiveNav();
  renderUserChip();

  // Load Supabase data before rendering pages
  if (typeof sbLoadAll === 'function' && !['login','register','respuesta','404'].includes(page)) {
    await sbLoadAll();
  }

  // Also make skuCatalogData available from Supabase
  if (window._sbData && window._sbData.loaded && window._sbData.skuCatalog) {
    window.skuCatalogData = window._sbData.skuCatalog;
  }

  // Providers page
  if (page === 'providers') {
    document.getElementById('search-provider')?.addEventListener('input', renderProvidersTable);
    document.getElementById('filter-city')?.addEventListener('input', renderProvidersTable);
    document.getElementById('filter-category')?.addEventListener('change', renderProvidersTable);
    document.getElementById('filter-state')?.addEventListener('change', renderProvidersTable);

    const savedMode = localStorage.getItem('providersViewMode');
    if (savedMode) providersViewMode = savedMode;

    document.getElementById('viewCardsBtn')?.addEventListener('click', () => setProvidersView('cards'));
    document.getElementById('viewTableBtn')?.addEventListener('click', () => setProvidersView('table'));

    setProvidersView(providersViewMode);
    renderProvidersTable();

    document.getElementById('exportProvidersBtn')?.addEventListener('click', () => exportProvidersCsv(getAllProviders()));
    document.getElementById('printProvidersBtn')?.addEventListener('click', () => window.print());
  }

  // New provider page
  if (page === 'new_provider') {
    setupNewProviderForm();
  }

  // Quotes page
  if (page === 'quotes') {
    setupQuotesForm();
    setupQuoteSkuSelector();
    renderQuotesTable();
    document.getElementById('exportQuotesBtn')?.addEventListener('click', () => exportQuotesCsv(getAllQuotes()));
  }

  // Quote detail
  if (page === 'quote_detail') {
    setupQuoteDetailPage();
  }

  // Compare page
  if (page === 'compare') {
    setupCompare();
  }

  // Provider detail
  if (page === 'provider_detail') {
    setupProviderDetailPage();
  }

  // Home page
  if (page === 'home') {
    updateHomeKpis();
  }

  // SKU page
  if (page === 'sku') {
    setupSkuPage();
  }
});
