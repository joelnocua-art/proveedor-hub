// dashboard-charts.js
document.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.page !== 'home') return;

  // Wait for Supabase Data to load
  const checkData = setInterval(() => {
    if (window._sbData && window._sbData.loaded) {
      clearInterval(checkData);
      renderDashboard();
    }
  }, 100);

  function renderDashboard() {
    const quotes = typeof getAllQuotes === 'function' ? getAllQuotes() : [];
    const providers = typeof getAllProviders === 'function' ? getAllProviders() : [];

    renderQuotesByMonth(quotes);
    renderProvidersByCity(providers);
    renderRecentQuotes(quotes);
  }

  function getThemeColors() {
    const isDark = document.body.dataset.theme === 'dark';
    return {
      text: isDark ? '#e2e4ed' : '#2d2a26',
      grid: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(45,42,38,0.05)',
      primary: '#4355e8',
      accent: '#00b8a3',
      danger: '#e8364e',
      warning: '#e6a000',
      tooltipBg: isDark ? 'rgba(30,34,53,0.95)' : 'rgba(255,255,255,0.95)',
      tooltipText: isDark ? '#ffffff' : '#000000',
    };
  }

  function renderQuotesByMonth(quotes) {
    const ctx = document.getElementById('chartQuotesByMonth');
    if (!ctx) return;

    // Group quotes by month (YYYY-MM)
    const counts = {};
    quotes.forEach(q => {
      let m;
      if (q.fecha) {
        // Try parsing YYYY-MM-DD
        const parts = q.fecha.split('-');
        if (parts.length >= 2) {
          m = `${parts[0]}-${parts[1]}`;
        }
      }
      if (!m) {
        const d = new Date();
        m = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      }
      counts[m] = (counts[m] || 0) + 1;
    });

    const sortedKeys = Object.keys(counts).sort();
    const labels = sortedKeys.map(k => k); // Just keep YYYY-MM
    const data = sortedKeys.map(k => counts[k]);
    const colors = getThemeColors();

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels.length ? labels : ['Sin datos'],
        datasets: [{
          label: 'Cotizaciones',
          data: data.length ? data : [0],
          backgroundColor: colors.primary,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: colors.tooltipBg,
            titleColor: colors.tooltipText,
            bodyColor: colors.tooltipText,
            borderColor: colors.grid,
            borderWidth: 1
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: colors.text } },
          y: { grid: { color: colors.grid }, ticks: { color: colors.text, stepSize: 1, precision: 0 } }
        }
      }
    });
  }

  function renderProvidersByCity(providers) {
    const ctx = document.getElementById('chartProvidersByCity');
    if (!ctx) return;

    const counts = {};
    providers.forEach(p => {
      const city = (p.ciudad || 'No especificada').trim();
      counts[city] = (counts[city] || 0) + 1;
    });

    // Top 5 cities + "Otros"
    const sorted = Object.entries(counts).sort((a,b) => b[1] - a[1]);
    let labels = [];
    let data = [];
    if (sorted.length > 5) {
      labels = sorted.slice(0, 5).map(x => x[0]);
      data = sorted.slice(0, 5).map(x => x[1]);
      let others = sorted.slice(5).reduce((sum, x) => sum + x[1], 0);
      labels.push('Otras');
      data.push(others);
    } else {
      labels = sorted.map(x => x[0]);
      data = sorted.map(x => x[1]);
    }

    const colors = getThemeColors();
    const palette = [colors.primary, colors.accent, colors.warning, colors.danger, '#6f42c1', '#6c757d'];

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels.length ? labels : ['Sin datos'],
        datasets: [{
          data: data.length ? data : [1],
          backgroundColor: data.length ? palette : [colors.grid],
          borderWidth: 0,
          cutout: '65%'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'right', labels: { color: colors.text, boxWidth: 12, font: {size: 11} } },
          tooltip: {
            backgroundColor: colors.tooltipBg,
            titleColor: colors.tooltipText,
            bodyColor: colors.tooltipText,
            borderColor: colors.grid,
            borderWidth: 1
          }
        }
      }
    });
  }

  function renderRecentQuotes(quotes) {
    const el = document.getElementById('recentQuotes');
    if (!el) return;

    if (!quotes || !quotes.length) {
      el.innerHTML = '<div class="muted">Sin cotizaciones registradas aún.</div>';
      return;
    }

    // Sort by fecha descending
    const sorted = [...quotes].sort((a,b) => (b.fecha||'').localeCompare(a.fecha||''));
    const top5 = sorted.slice(0, 5);

    let html = '';
    top5.forEach(q => {
      // Escape helper
      const esc = s => String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      
      const isResp = q.estado_respuesta === 'respondida';
      const badgeStyle = isResp 
        ? 'background:rgba(0,179,107,0.15); color:#00b36b;' 
        : 'background:rgba(230,160,0,0.15); color:#e6a000;';
      const badgeText = isResp ? 'Respondida' : 'Pendiente';

      html += `<div style="display:flex; justify-content:space-between; align-items:center; padding:12px; border:1px solid var(--border); border-radius:var(--r-md); margin-bottom:8px; background:var(--surface-0);">
        <div style="flex:1; min-width:0; margin-right:12px;">
          <div style="font-weight:600; font-size:13px; color:var(--text); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
            ${esc(q.descripcion)}
          </div>
          <div style="font-size:11px; color:var(--muted); margin-top:2px;">
            ${esc(q.empresa)} • ${esc(q.fecha) || 'Sin fecha'}
          </div>
        </div>
        <div>
          <span style="font-size:10px; padding:3px 8px; border-radius:12px; font-weight:700; ${badgeStyle}">
            ${badgeText}
          </span>
        </div>
      </div>`;
    });

    el.innerHTML = html;
  }
});
