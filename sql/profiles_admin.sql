-- ═══ Políticas admin + trigger auto-creación de perfiles ═══
-- Corre este SQL DESPUÉS de haber corrido add_profiles.sql
--
-- Agrega columna email a profiles (si no existe)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email TEXT;

-- Permite que admin/supply lean todos los perfiles
CREATE POLICY "Admins can read all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('admin', 'supply')
  );

-- Permite que admin/supply actualicen cualquier perfil
CREATE POLICY "Admins can update profiles"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('admin', 'supply')
  );

-- Trigger: crea perfil automáticamente al registrarse cualquier usuario
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    'viewer'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Poblar perfiles de usuarios ya existentes que no tienen perfil aún
INSERT INTO public.profiles (id, email, full_name, role)
SELECT u.id, u.email, u.raw_user_meta_data->>'full_name', 'viewer'
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;
