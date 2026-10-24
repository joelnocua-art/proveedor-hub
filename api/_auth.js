/* ═══ Auth helper — Proveedor Hub ═══
 * Valida la sesión de Supabase que el frontend manda en
 *   Authorization: Bearer <access_token>
 * consultando GET {SUPABASE_URL}/auth/v1/user. Solo deja pasar correos
 * corporativos (@bia.app / @bia.com) y, si se pide, ciertos roles.
 *
 * El rol se lee de app_metadata.role: user_metadata lo puede editar el
 * propio usuario con supabase.auth.updateUser(), app_metadata solo la
 * service role key (lo escribe POST /api/users).
 *
 * Los archivos con "_" en api/ no se publican como endpoints en Vercel.
 */

const SUPABASE_URL = 'https://fepivzcobbdybztuiyge.supabase.co';
// Anon key pública (la misma de supabase-client.js): solo identifica el
// proyecto ante el gateway de Supabase, no da permisos por sí sola.
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlcGl2emNvYmJkeWJ6dHVpeWdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4ODkxMDMsImV4cCI6MjA4OTQ2NTEwM30.ZwUjlkqiucO3bzLW-Rw4CGUS3N4wsNFrjLl2ZyPa4PU';

const ALLOWED_DOMAINS = ['@bia.app', '@bia.com'];

// Admin de arranque (igual que en script.js) mientras los roles se pasan a
// app_metadata: puede entrar a /api/users y volver a guardar los demás.
const BOOTSTRAP_ADMIN = 'joel.nocua@bia.app';

export function getUserRole(user) {
  const role = user?.app_metadata?.role;
  if (role) return role;
  return (user?.email || '').toLowerCase() === BOOTSTRAP_ADMIN ? 'admin' : null;
}

// Devuelve el usuario de Supabase si la sesión es válida. Si no, ya
// respondió 401/403 y devuelve null: el handler solo tiene que hacer return.
export async function requireUser(req, res, { roles } = {}) {
  const header = req.headers.authorization || '';
  const match = header.match(/^Bearer\s+(\S+)$/i);
  if (!match) {
    res.status(401).json({ success: false, error: 'Sesión requerida. Inicia sesión de nuevo.' });
    return null;
  }

  let user;
  try {
    const resp = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: {
        'apikey': process.env.SUPABASE_ANON_KEY || SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${match[1]}`
      }
    });
    if (resp.status === 401 || resp.status === 403) {
      res.status(401).json({ success: false, error: 'Sesión inválida o vencida. Inicia sesión de nuevo.' });
      return null;
    }
    if (!resp.ok) {
      res.status(502).json({ success: false, error: 'No se pudo validar la sesión con Supabase (' + resp.status + ').' });
      return null;
    }
    user = await resp.json();
  } catch (err) {
    console.error('[auth] Error validando sesión:', err);
    res.status(502).json({ success: false, error: 'No se pudo validar la sesión con Supabase.' });
    return null;
  }

  const email = (user?.email || '').toLowerCase();
  if (!ALLOWED_DOMAINS.some(d => email.endsWith(d))) {
    res.status(403).json({ success: false, error: 'Acceso exclusivo para cuentas @bia.app o @bia.com.' });
    return null;
  }

  if (roles && !roles.includes(getUserRole(user))) {
    res.status(403).json({ success: false, error: 'No tienes permiso para esta acción (rol requerido: ' + roles.join(', ') + ').' });
    return null;
  }

  return user;
}
