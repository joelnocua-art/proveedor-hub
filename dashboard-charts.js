/* Proveedor Hub — Dashboard Charts, Alerts & Activity */

const CC = {
  primary: 'rgba(91,107,255,0.85)', primaryBg: 'rgba(91,107,255,0.15)',
  accent: 'rgba(0,229,200,0.85)', accentBg: 'rgba(0,229,200,0.10)',
  grid: 'rgba(255,255,255,0.06)', text: '#9da3c7',
  pal: ['rgba(91,107,255,0.8)','rgba(0,229,200,0.8)','rgba(255,190,61,0.8)','rgba(255,77,109,0.8)','rgba(0,212,138,0.8)','rgba(160,120,255,0.8)','rgba(255,150,80,0.8)','rgba(100,200,255,0.8)']
};

function initChartDefaults() {
  if (!window.Chart) return;
  Chart.defaults.color = CC.text;
  Chart.defaults.font.family = "'DM Sans', sans-serif";
  Chart.defaults.font.size = 12;
}

function renderQuotesByMonth() {
  const c = document.getElementById('chartQuotesByMonth');
  if (!c || !window.Chart) return;
  const quotes = getAllQuotes();
  const m = {};
  const now = new Date();
  for (let i = 11; i >= 0; i--) { const d = new Date(now.getFullYear(), now.getMonth() - i, 1); m[d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0')] = 0; }
  quotes.forEach(q => { const f = String(q.fecha || '').substring(0, 7); if (f in m) m[f]++; });
  const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  new Chart(c, { type: 'bar', data: { labels: Object.keys(m).map(k => { const [y,mo] = k.split('-'); return months[parseInt(mo)-1] + ' ' + y.slice(2); }), datasets: [{ label: 'Cotizaciones', data: Object.values(m), backgroundColor: CC.primaryBg, borderColor: CC.primary, borderWidth: 1.5, borderRadius: 6 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { grid: { color: CC.grid }, beginAtZero: true, ticks: { stepSize: 1 } } } } });
}

function renderProvidersByCity() {
  const c = document.getElementById('chartProvidersByCity');
  if (!c || !window.Chart) return;
  const cm = {};
  getAllProviders().forEach(p => { const city = (p.ciudad || 'Sin ciudad').trim() || 'Sin ciudad'; cm[city] = (cm[city] || 0) + 1; });
  const sorted = Object.entries(cm).sort((a, b) => b[1] - a[1]);
  const top = sorted.slice(0, 8);
  const other = sorted.slice(8).reduce((s, [, c]) => s + c, 0);
  if (other > 0) top.push(['Otros', other]);
  new Chart(c, { type: 'doughnut', data: { labels: top.map(([c]) => c), datasets: [{ data: top.map(([,v]) => v), backgroundColor: CC.pal.slice(0, top.length), borderColor: 'rgba(5,8,17,0.8)', borderWidth: 2 }] }, options: { responsive: true, maintainAspectRatio: false, cutout: '62%', plugins: { legend: { position: 'right', labels: { font: { size: 11 }, padding: 10 } } } } });
}

function renderTopProviders() {
  const c = document.getElementById('chartTopProviders');
  if (!c || !window.Chart) return;
  const pc = {};
  getAllQuotes().forEach(q => { const n = (q.empresa || '').trim(); if (n) pc[n] = (pc[n] || 0) + 1; });
  const sorted = Object.entries(pc).sort((a, b) => b[1] - a[1]).slice(0, 10);
  if (!sorted.length) return;
  new Chart(c, { type: 'bar', data: { labels: sorted.map(([n]) => n.length > 20 ? n.slice(0,18) + '…' : n), datasets: [{ data: sorted.map(([,v]) => v), backgroundColor: sorted.map((_,i) => CC.pal[i % CC.pal.length]), borderRadius: 6 }] }, options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { color: CC.grid }, beginAtZero: true }, y: { grid: { display: false } } } } });
}

function renderQualityPrice() {
  const c = document.getElementById('chartQualityPrice');
  if (!c || !window.Chart) return;
  const provAvg = {};
  getAllQuotes().forEach(q => { const n = (q.empresa || '').trim().toLowerCase(); const p = Number(q.pu_sin_iva); if (n && Number.isFinite(p) && p > 0) { if (!provAvg[n]) provAvg[n] = { sum: 0, count: 0 }; provAvg[n].sum += p; provAvg[n].count++; } });
  const data = getAllProviders().map(p => { const k = (p.empresa || '').trim().toLowerCase(); const a = provAvg[k]; if (!a) return null; const perf = normalizeProviderPerf(p); return { x: perf.calidad, y: Math.round(a.sum / a.count), r: Math.min(18, Math.max(5, a.count * 2)), label: p.empresa }; }).filter(Boolean).slice(0, 20);
  if (!data.length) return;
  new Chart(c, { type: 'bubble', data: { datasets: [{ data, backgroundColor: CC.accentBg, borderColor: CC.accent, borderWidth: 1.5 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ctx.raw.label + ': Calidad ' + ctx.raw.x + '/5 — ' + formatMoneyCOP(ctx.raw.y) } } }, scales: { x: { title: { display: true, text: 'Calidad (1-5)' }, grid: { color: CC.grid }, min: 0.5, max: 5.5 }, y: { title: { display: true, text: 'Precio prom. (COP)' }, grid: { color: CC.grid }, beginAtZero: true, ticks: { callback: v => v >= 1e6 ? (v/1e6).toFixed(1)+'M' : v >= 1e3 ? (v/1e3).toFixed(0)+'K' : v } } } } });
}

function renderAlerts() {
  const el = document.getElementById('alertsList');
  if (!el) return;
  const alerts = [];
  const providers = getAllProviders();
  const quotes = getAllQuotes();
  const now = new Date(), ms = 86400000;

  const old90 = quotes.filter(q => { const d = new Date(q.fecha); return !isNaN(d) && (now - d) > 90 * ms; });
  if (old90.length) alerts.push({ icon: 'warn', title: old90.length + ' cotizaciones con más de 90 días', desc: 'Precios podrían estar desactualizados.' });

  const noQ = providers.filter(p => !quotes.some(q => (q.empresa||'').trim().toLowerCase() === (p.empresa||'').trim().toLowerCase()));
  if (noQ.length) alerts.push({ icon: 'info', title: noQ.length + ' proveedores sin cotizaciones', desc: noQ.slice(0,3).map(p=>p.empresa).join(', ') + (noQ.length > 3 ? '...' : '') });

  const inactive = providers.filter(p => (p.estado||'').toUpperCase() === 'INACTIVO');
  if (inactive.length) alerts.push({ icon: 'warn', title: inactive.length + ' proveedores inactivos', desc: 'Considera reactivarlos o eliminarlos.' });

  const lowQ = providers.filter(p => normalizeProviderPerf(p).calidad <= 2);
  if (lowQ.length) alerts.push({ icon: 'danger', title: lowQ.length + ' proveedores con calidad baja', desc: lowQ.slice(0,3).map(p=>p.empresa).join(', ') });

  if (!alerts.length) alerts.push({ icon: 'ok', title: 'Todo al día', desc: 'No hay alertas pendientes.' });

  const icons = { warn: '⚠', danger: '✗', info: 'ℹ', ok: '✓' };
  const colors = { warn: 'rgba(255,190,61,0.12)', danger: 'rgba(255,77,109,0.12)', info: 'rgba(91,107,255,0.12)', ok: 'rgba(0,212,138,0.12)' };
  const textColors = { warn: 'var(--warning)', danger: 'var(--danger)', info: 'var(--primary)', ok: 'var(--success)' };
  el.innerHTML = alerts.map(a => '<div style="display:flex;gap:12px;padding:12px;border:1px solid rgba(255,255,255,0.06);border-radius:14px;margin-bottom:8px;background:rgba(255,255,255,0.02);"><div style="width:34px;height:34px;border-radius:10px;background:'+colors[a.icon]+';color:'+textColors[a.icon]+';display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;">'+icons[a.icon]+'</div><div><div style="font-weight:600;font-size:12.5px;">'+escapeHtml(a.title)+'</div><div style="font-size:11.5px;color:var(--text-2);margin-top:3px;">'+escapeHtml(a.desc)+'</div></div></div>').join('');
}

function renderActivityFeed() {
  const el = document.getElementById('activityFeed');
  if (!el) return;
  const quotes = getAllQuotes();
  const acts = quotes.slice().sort((a,b) => String(b.fecha||'').localeCompare(String(a.fecha||''))).slice(0, 10);
  if (!acts.length) { el.innerHTML = '<div class="muted">Sin actividad reciente. Registra cotizaciones para ver actividad.</div>'; return; }
  el.innerHTML = acts.map(q => '<div style="display:flex;gap:12px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04);"><div style="width:8px;height:8px;border-radius:50%;background:rgba(91,107,255,0.8);margin-top:5px;flex-shrink:0;"></div><div style="flex:1;"><div style="font-size:12.5px;">Cotización de <strong>'+escapeHtml(q.empresa||'')+'</strong> — '+escapeHtml(q.descripcion||'')+'</div><div style="font-size:11px;color:var(--text-3);margin-top:2px;">'+escapeHtml(q.fecha||'')+' · '+escapeHtml(formatMoneyCOP(q.pu_sin_iva))+'</div></div></div>').join('');
}

document.addEventListener('DOMContentLoaded', () => {
  var page = document.body?.dataset?.page || '';
  if (page !== 'home') return;
  console.log('[Dashboard] providers:', getAllProviders().length, 'quotes:', getAllQuotes().length);
  try { renderAlerts(); } catch(e) { console.error('renderAlerts:', e); }
  try { renderActivityFeed(); } catch(e) { console.error('renderActivityFeed:', e); }
  if (window.Chart) {
    initChartDefaults();
    setTimeout(renderQuotesByMonth, 100);
    setTimeout(renderProvidersByCity, 200);
    setTimeout(renderTopProviders, 300);
    setTimeout(renderQualityPrice, 400);
  } else {
    setTimeout(() => {
      if (window.Chart) { initChartDefaults(); renderQuotesByMonth(); renderProvidersByCity(); renderTopProviders(); renderQualityPrice(); }
      else console.warn('Chart.js not available');
    }, 2500);
  }
});
