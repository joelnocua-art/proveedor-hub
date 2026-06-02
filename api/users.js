/* ═══ Users API — Proveedor Hub ═══
 * Vercel Serverless Function para gestión de usuarios.
 * Usa SUPABASE_SERVICE_ROLE_KEY para bypass de RLS.
 *
 * GET  /api/users  → Lista todos los usuarios con su perfil
 * POST /api/users  → Actualiza rol/área de un usuario { userId, role, area }
 */

const SUPABASE_URL = 'https://fepivzcobbdybztuiyge.supabase.co';

export default async function handler(req, res) {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    return res.status(500).json({ error: 'SUPABASE_SERVICE_ROLE_KEY no configurada en Vercel.' });
  }

  const headers = {
    'apikey': serviceKey,
    'Authorization': `Bearer ${serviceKey}`,
    'Content-Type': 'application/json'
  };

  // ── GET: listar usuarios ──
  if (req.method === 'GET') {
    try {
      const authResp = await fetch(`${SUPABASE_URL}/auth/v1/admin/users?per_page=500`, { headers });
      if (!authResp.ok) {
        const errText = await authResp.text();
        return res.status(500).json({
          error: 'Auth Admin API falló (' + authResp.status + '): ' + errText.substring(0, 200) +
            ' — Usa la service_role JWT key (eyJ...) desde "Legacy anon, service_role API keys" en Supabase.'
        });
      }
      const authData = await authResp.json();
      const authUsers = authData.users || authData || [];

      const users = authUsers.map(u => {
        // role/area guardados en user_metadata (vía Admin API)
        const meta = u.user_metadata || u.raw_user_meta_data || {};
        return {
          id: u.id,
          email: u.email || '',
          full_name: meta.full_name || '',
          avatar_url: meta.avatar_url || null,
          created_at: u.created_at,
          last_sign_in: u.last_sign_in_at,
          role: meta.role || null,
          area: meta.area || null
        };
      });

      users.sort((a, b) => (a.email || '').localeCompare(b.email || ''));
      return res.status(200).json({ users });

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // ── POST: actualizar rol/área via Auth Admin API ──
  if (req.method === 'POST') {
    const { userId, role, area } = req.body || {};
    if (!userId || !role) {
      return res.status(400).json({ error: 'userId y role son requeridos.' });
    }

    const validRoles = ['admin', 'supply', 'sales', 'viewer'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: 'Rol inválido. Opciones: ' + validRoles.join(', ') });
    }

    try {
      // Leer metadata existente para no pisar otros campos
      const getResp = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${userId}`, { headers });
      if (!getResp.ok) {
        const err = await getResp.text();
        return res.status(500).json({ error: 'No se encontró el usuario: ' + err.substring(0, 200) });
      }
      const authUser = await getResp.json();
      const existingMeta = authUser.user_metadata || authUser.raw_user_meta_data || {};

      // Actualizar user_metadata con el nuevo rol/área
      const updateResp = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${userId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          user_metadata: {
            ...existingMeta,
            role,
            area: area || null
          }
        })
      });

      if (!updateResp.ok) {
        const err = await updateResp.text();
        return res.status(500).json({ error: 'Error al actualizar usuario (Admin API): ' + err.substring(0, 300) });
      }

      return res.status(200).json({ ok: true });

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
