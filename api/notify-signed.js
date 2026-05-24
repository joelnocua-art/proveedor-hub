/* ═══ notify-signed — Proveedor Hub ═══
 * Vercel Serverless Function: envía correo de notificación cuando se
 * recibe una cotización firmada.
 *
 * Variables de entorno requeridas en Vercel:
 *   RESEND_API_KEY  — API key de resend.com (gratis hasta 3 000 correos/mes)
 *
 * POST /api/notify-signed
 * Body JSON: { saleNum, clientName, clientNit, total, items, signedBy, pdfUrl }
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { saleNum, clientName, clientNit, total, items, signedBy, pdfUrl } = req.body || {};

  if (!saleNum || !clientName) {
    return res.status(400).json({ error: 'saleNum y clientName son requeridos' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    return res.status(500).json({ error: 'RESEND_API_KEY no configurada en Vercel' });
  }

  function esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function fmtCOP(value) {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency', currency: 'COP', minimumFractionDigits: 0
    }).format(Number(value) || 0);
  }

  const itemList = Array.isArray(items) ? items : [];

  const itemRows = itemList.map(it => `
    <tr>
      <td style="padding:8px 12px;border:1px solid #2d3748;color:#e8eaf6;">${esc(it.nombre_sku || '')}</td>
      <td style="padding:8px 12px;border:1px solid #2d3748;font-family:monospace;color:#e8eaf6;">${esc(it.serial || '—')}</td>
      <td style="padding:8px 12px;border:1px solid #2d3748;color:#e8eaf6;">${esc(it.marca || '—')}</td>
      <td style="padding:8px 12px;border:1px solid #2d3748;color:#e8eaf6;">${esc(it.modelo || '—')}</td>
      <td style="padding:8px 12px;border:1px solid #2d3748;text-align:center;color:#e8eaf6;">${Number(it.cantidad) || 1}</td>
    </tr>`).join('');

  const now = new Date().toLocaleDateString('es-CO', {
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;background:#0d0d1a;color:#e8eaf6;margin:0;padding:20px;">
  <div style="max-width:640px;margin:0 auto;background:#1a1a2e;border-radius:12px;overflow:hidden;border:1px solid #2d3748;">

    <div style="background:linear-gradient(135deg,#1a1a3e,#0d1b4a);padding:28px 32px;border-bottom:1px solid #2d3748;">
      <div style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#00e5c8;margin-bottom:8px;">BIA Energy — Venta de Activos</div>
      <div style="font-size:22px;font-weight:800;color:#ffffff;">Cotización Firmada Recibida</div>
      <div style="font-size:14px;color:#9ca3af;margin-top:4px;">${esc(saleNum)} • ${esc(now)}</div>
    </div>

    <div style="padding:24px 32px;border-bottom:1px solid #2d3748;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding-bottom:12px;vertical-align:top;width:50%;">
            <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#9ca3af;margin-bottom:4px;">Cliente</div>
            <div style="font-size:16px;font-weight:700;color:#ffffff;">${esc(clientName)}</div>
            ${clientNit ? `<div style="font-size:13px;color:#9ca3af;margin-top:2px;">NIT: ${esc(clientNit)}</div>` : ''}
          </td>
          <td style="padding-bottom:12px;vertical-align:top;">
            <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#9ca3af;margin-bottom:4px;">Valor Total</div>
            <div style="font-size:22px;font-weight:800;color:#00e5c8;">${fmtCOP(total)}</div>
          </td>
        </tr>
      </table>
      ${signedBy ? `<div style="font-size:13px;color:#9ca3af;margin-top:4px;">Procesado por: <span style="color:#e8eaf6;">${esc(signedBy)}</span></div>` : ''}
    </div>

    <div style="padding:24px 32px;border-bottom:1px solid #2d3748;">
      <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#9ca3af;margin-bottom:12px;">
        Equipos vendidos (${itemList.length} ítem${itemList.length !== 1 ? 's' : ''})
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <thead>
          <tr style="background:#0d1b4a;">
            <th style="padding:10px 12px;border:1px solid #2d3748;text-align:left;color:#00e5c8;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;">SKU / Nombre</th>
            <th style="padding:10px 12px;border:1px solid #2d3748;text-align:left;color:#00e5c8;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;">Serial</th>
            <th style="padding:10px 12px;border:1px solid #2d3748;text-align:left;color:#00e5c8;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;">Marca</th>
            <th style="padding:10px 12px;border:1px solid #2d3748;text-align:left;color:#00e5c8;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;">Modelo</th>
            <th style="padding:10px 12px;border:1px solid #2d3748;text-align:center;color:#00e5c8;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;">Cant.</th>
          </tr>
        </thead>
        <tbody>
          ${itemRows || '<tr><td colspan="5" style="padding:16px;text-align:center;color:#9ca3af;">Sin ítems registrados</td></tr>'}
        </tbody>
      </table>
    </div>

    ${pdfUrl ? `
    <div style="padding:20px 32px;border-bottom:1px solid #2d3748;">
      <a href="${pdfUrl}" style="display:inline-flex;align-items:center;gap:8px;background:rgba(91,107,255,0.15);border:1px solid rgba(91,107,255,0.3);color:#818cf8;padding:10px 18px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;">
        📎 Ver cotización firmada (PDF)
      </a>
    </div>` : ''}

    <div style="padding:20px 32px;background:#0d0d1a;">
      <div style="font-size:12px;color:#4b5563;">Este correo fue generado automáticamente por Proveedor Hub — BIA Energy.</div>
      <div style="font-size:12px;color:#4b5563;margin-top:4px;">Acción requerida: emitir factura para ${esc(clientName)}.</div>
    </div>
  </div>
</body>
</html>`;

  const cc = ['laura.gomez@bia.app', 'joel.nocua@bia.app'];
  if (signedBy && signedBy.includes('@') && !cc.includes(signedBy)) {
    cc.push(signedBy);
  }

  const payload = {
    from: 'Proveedor Hub <ventas@bia.app>',
    to: ['daniela.carvajal@bia.app'],
    cc,
    subject: `[${saleNum}] Cotización firmada — ${clientName} — ${fmtCOP(total)}`,
    html,
  };

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[notify-signed] Resend error:', errorText);
      return res.status(500).json({ error: 'Error al enviar correo: ' + errorText });
    }

    const data = await response.json();
    return res.status(200).json({ ok: true, emailId: data.id });
  } catch (err) {
    console.error('[notify-signed] Fetch error:', err);
    return res.status(500).json({ error: err.message });
  }
}
