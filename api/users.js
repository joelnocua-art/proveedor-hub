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
      // Listar usuarios de auth.users via Admin API
      const authResp = await fetch(`${SUPABASE_URL}/auth/v1/admin/users?per_page=500`, { headers });
      if (!authResp.ok) {
        const errText = await authResp.text();
        // Si falla el admin API (key format inválido), intentar solo con profiles
        const profFallback = await fetch(`${SUPABASE_URL}/rest/v1/profiles?select=*`, {
          headers: { ...headers, 'Prefer': 'return=representation' }
        });
        if (profFallback.ok) {
          const profs = await profFallback.json();
          const users = (Array.isArray(profs) ? profs : []).map(p => ({
            id: p.id, email: p.email || '', full_name: p.full_name || '',
            avatar_url: null, created_at: p.created_at, last_sign_in: null,
            role: p.role || null, area: p.area || null
          }));
          return res.status(200).json({ users, warning: 'Admin API no disponible — usando solo perfiles. Actualiza SUPABASE_SERVICE_ROLE_KEY con la key JWT (eyJ...) desde Legacy API Keys en Supabase.' });
        }
        return res.status(500).json({ error: 'Auth Admin API falló (' + authResp.status + '): ' + errText.substring(0, 200) + ' — Usa la service_role JWT key (eyJ...) desde la pestaña "Legacy anon, service_role API keys" en Supabase.' });
      }
      const authData = await authResp.json();
      const authUsers = authData.users || authData || [];

      // Listar perfiles existentes (bypassa RLS con service key)
      const profResp = await fetch(`${SUPABASE_URL}/rest/v1/profiles?select=*`, {
        headers: { ...headers, 'Prefer': 'return=representation' }
      });
      const profiles = profResp.ok ? await profResp.json() : [];
      const profMap = {};
      (Array.isArray(profiles) ? profiles : []).forEach(p => { profMap[p.id] = p; });

      const users = authUsers.map(u => ({
        id: u.id,
        email: u.email || '',
        full_name: u.user_metadata?.full_name || u.raw_user_meta_data?.full_name || '',
        avatar_url: u.user_metadata?.avatar_url || u.raw_user_meta_data?.avatar_url || null,
        created_at: u.created_at,
        last_sign_in: u.last_sign_in_at,
        role: profMap[u.id]?.role || null,
        area: profMap[u.id]?.area || null
      }));

      users.sort((a, b) => (a.email || '').localeCompare(b.email || ''));
      return res.status(200).json({ users });

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // ── POST: actualizar rol/área ──
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
      // Obtener email del usuario desde auth
      const authResp = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${userId}`, { headers });
      const authUser = authResp.ok ? await authResp.json() : null;
      const email = authUser?.email || '';
      const fullName = authUser?.user_metadata?.full_name || authUser?.raw_user_meta_data?.full_name || '';

      const payload = {
        role,
        area: area || null,
        updated_at: new Date().toISOString()
      };

      // Try PATCH first (update existing profile)
      const patchResp = await fetch(
        `${SUPABASE_URL}/rest/v1/profiles?id=eq.${encodeURIComponent(userId)}`,
        {
          method: 'PATCH',
          headers: { ...headers, 'Prefer': 'return=representation' },
          body: JSON.stringify(payload)
        }
      );

      if (!patchResp.ok) {
        const err = await patchResp.text();
        return res.status(500).json({ error: 'Error al actualizar perfil (PATCH): ' + err.substring(0, 300) });
      }

      const patched = await patchResp.json();

      // If no rows updated, profile doesn't exist yet — INSERT it
      if (!Array.isArray(patched) || patched.length === 0) {
        const insertResp = await fetch(`${SUPABASE_URL}/rest/v1/profiles`, {
          method: 'POST',
          headers: { ...headers, 'Prefer': 'return=representation' },
          body: JSON.stringify({ id: userId, email, full_name: fullName, ...payload })
        });
        if (!insertResp.ok) {
          const err = await insertResp.text();
          return res.status(500).json({ error: 'Error al crear perfil (INSERT): ' + err.substring(0, 300) });
        }
      }

      return res.status(200).json({ ok: true });

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
