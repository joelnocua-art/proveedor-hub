/* Proveedor Hub — Shared Components */

// Focus trap for modals
function trapFocus(el) {
  const f = el.querySelectorAll('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])');
  if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  el._trap = e => {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
    else { if (document.activeElement === last) { e.preventDefault(); first.focus(); } }
  };
  el.addEventListener('keydown', el._trap);
  first.focus();
}
function releaseFocus(el) { if (el._trap) { el.removeEventListener('keydown', el._trap); delete el._trap; } }

// Escape closes modals
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const m = document.querySelector('.modal-backdrop.open');
    if (m) { m.classList.remove('open'); const modal = m.querySelector('.modal'); if (modal) releaseFocus(modal); }
  }
});

// Global search
function setupGlobalSearch() {
  const input = document.getElementById('global-search');
  const results = document.getElementById('global-search-results');
  if (!input || !results) return;
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 2) { results.style.display = 'none'; return; }
    const matches = [];
    if (typeof getAllProviders === 'function') {
      getAllProviders().forEach(p => {
        if ([p.empresa, p.rut, p.representante, p.ciudad, p.servicios_productos].join(' ').toLowerCase().includes(q))
          matches.push({ type: 'Proveedor', name: p.empresa, url: 'provider_detail.html?it=' + encodeURIComponent(p.it) });
      });
    }
    if (typeof getAllQuotes === 'function') {
      getAllQuotes().forEach(qo => {
        if ([qo.empresa, qo.descripcion].join(' ').toLowerCase().includes(q))
          matches.push({ type: 'Cotización', name: (qo.empresa || '') + ' — ' + (qo.descripcion || ''), url: 'quote_detail.html?it=' + encodeURIComponent(qo.it) });
      });
    }
    if (!matches.length) { results.innerHTML = '<div style="padding:12px 16px;color:var(--text-3);font-size:13px;">Sin resultados</div>'; results.style.display = 'block'; return; }
    results.innerHTML = matches.slice(0, 8).map(m =>
      '<a href="' + m.url + '" style="display:flex;align-items:center;justify-content:space-between;padding:10px 16px;text-decoration:none;color:var(--text);border-bottom:1px solid rgba(255,255,255,0.04);" onmouseover="this.style.background=\'rgba(255,255,255,0.06)\'" onmouseout="this.style.background=\'\'">' +
        '<span style="font-size:13px;font-weight:500;">' + escapeHtml(m.name) + '</span>' +
        '<span style="font-size:11px;color:var(--text-3);padding:2px 8px;border-radius:6px;background:rgba(255,255,255,0.06);">' + escapeHtml(m.type) + '</span></a>'
    ).join('');
    results.style.display = 'block';
  });
  document.addEventListener('click', e => { if (!e.target.closest('#global-search') && !e.target.closest('#global-search-results')) results.style.display = 'none'; });
}

// Fix table scopes for a11y
function fixTableScopes() { document.querySelectorAll('th').forEach(th => { if (!th.hasAttribute('scope')) th.setAttribute('scope', 'col'); }); }

// Auto focus trap on modals
document.addEventListener('DOMContentLoaded', () => {
  fixTableScopes();
  setupGlobalSearch();
  injectThemeToggle();
  injectNotificationBadges();
  const obs = new MutationObserver(muts => {
    muts.forEach(m => {
      if (m.target.classList?.contains('modal-backdrop')) {
        const modal = m.target.querySelector('.modal');
        if (m.target.classList.contains('open') && modal) trapFocus(modal);
        else if (modal) releaseFocus(modal);
      }
    });
  });
  document.querySelectorAll('.modal-backdrop').forEach(b => obs.observe(b, { attributes: true, attributeFilter: ['class'] }));
});

// ─── Theme Toggle (Light/Dark) ───
function injectThemeToggle() {
  var saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  document.body.setAttribute('data-theme', saved);
  var footer = document.querySelector('.sidebar-footer');
  if (!footer) return;
  var toggle = document.createElement('div');
  toggle.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:8px 10px;margin-bottom:8px;border:1px solid var(--border);border-radius:10px;cursor:pointer;user-select:none;font-size:12px;color:var(--text-2);';
  toggle.innerHTML = '<span id="themeLabel">' + (saved === 'light' ? 'Modo claro' : 'Modo oscuro') + '</span><div id="themeIcon" style="width:36px;height:20px;border-radius:10px;background:' + (saved === 'light' ? 'var(--accent)' : 'var(--surface-2)') + ';position:relative;transition:background .25s;"><div style="width:16px;height:16px;border-radius:50%;background:#fff;position:absolute;top:2px;transition:left .25s;left:' + (saved === 'light' ? '18px' : '2px') + ';box-shadow:0 1px 3px rgba(0,0,0,0.3);"></div></div>';
  toggle.onclick = function() {
    var cur = document.documentElement.getAttribute('data-theme') || 'dark';
    var next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    document.body.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    var label = document.getElementById('themeLabel');
    var icon = document.getElementById('themeIcon');
    if (label) label.textContent = next === 'light' ? 'Modo claro' : 'Modo oscuro';
    if (icon) {
      icon.style.background = next === 'light' ? 'var(--accent)' : 'var(--surface-2)';
      icon.firstChild.style.left = next === 'light' ? '18px' : '2px';
    }
  };
  footer.insertBefore(toggle, footer.firstChild);
}

// ─── Notification Badges ───
function injectNotificationBadges() {
  function checkBadges() {
    var pending = [];
    try { pending = JSON.parse(localStorage.getItem('pendingProviderResponses') || '[]'); } catch(e) {}
    var count = Array.isArray(pending) ? pending.length : 0;
    // Badge on Cotizaciones nav link
    var navLinks = document.querySelectorAll('.nav a[data-nav="quotes"]');
    navLinks.forEach(function(link) {
      var existing = link.querySelector('.nav-badge');
      if (existing) existing.remove();
      if (count > 0) {
        var badge = document.createElement('span');
        badge.className = 'nav-badge';
        badge.style.cssText = 'display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:18px;border-radius:9px;font-size:10px;font-weight:700;background:var(--danger);color:#fff;padding:0 5px;margin-left:auto;';
        badge.textContent = count;
        link.appendChild(badge);
      }
    });
    // Also check new responses from extraQuotes that are recent
    var extra = [];
    try { extra = JSON.parse(localStorage.getItem('extraQuotes') || '[]'); } catch(e) {}
    var recentResponses = extra.filter(function(q) {
      if (!q.fecha_respuesta) return false;
      var rDate = new Date(q.fecha_respuesta);
      var now = new Date();
      return (now - rDate) < 3600000; // within last hour
    });
    // Badge on Comparativo link if there are recent adjudication-ready items
    var cmpLinks = document.querySelectorAll('.nav a[data-nav="compare"]');
    cmpLinks.forEach(function(link) {
      var existing = link.querySelector('.nav-badge');
      if (existing) existing.remove();
      if (recentResponses.length > 0) {
        var badge = document.createElement('span');
        badge.className = 'nav-badge';
        badge.style.cssText = 'display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:18px;border-radius:9px;font-size:10px;font-weight:700;background:var(--accent);color:#0a0d1a;padding:0 5px;margin-left:auto;';
        badge.textContent = recentResponses.length;
        link.appendChild(badge);
      }
    });
  }
  checkBadges();
  setInterval(checkBadges, 5000);
}
