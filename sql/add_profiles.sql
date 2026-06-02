-- ═══ Tabla profiles — roles de usuario ═══
-- Corre este SQL en el SQL Editor de Supabase.
--
-- Roles disponibles:
--   admin   → acceso total (igual que supply + gestión de usuarios a futuro)
--   supply  → acceso total a todos los módulos
--   sales   → solo módulo de ventas + dashboard
--   viewer  → solo dashboard (rol por defecto para cuentas nuevas)

CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   TEXT,
  area        TEXT,
  role        TEXT NOT NULL DEFAULT 'viewer'
                   CHECK (role IN ('admin', 'supply', 'sales', 'viewer')),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: cada usuario solo puede leer su propio perfil
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Los roles se asignan manualmente desde el dashboard de Supabase.
-- Para asignar un rol:
--   UPDATE public.profiles SET role = 'supply', area = 'Supply' WHERE id = '<user_uuid>';
--
-- Para ver todos los usuarios registrados con su rol:
--   SELECT u.email, p.full_name, p.area, p.role
--   FROM auth.users u
--   LEFT JOIN public.profiles p ON p.id = u.id
--   ORDER BY u.created_at DESC;
