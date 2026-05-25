-- ═══ Cotización Firmada — Columnas y Storage ═══
-- Ejecutar en Supabase → SQL Editor → New query
--
-- Agrega columnas para registrar el PDF firmado, fecha y quién lo procesó.
-- También crea el bucket de Storage para almacenar los PDFs.

-- ─── Nuevas columnas en sales_requests ────────────────────────────────
ALTER TABLE sales_requests
  ADD COLUMN IF NOT EXISTS signed_quote_url TEXT,
  ADD COLUMN IF NOT EXISTS signed_at        TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS signed_by        TEXT;

-- ─── Bucket de Supabase Storage ───────────────────────────────────────
-- Bucket público para que los correos puedan incluir un link directo al PDF.
INSERT INTO storage.buckets (id, name, public)
VALUES ('cotizaciones-firmadas', 'cotizaciones-firmadas', true)
ON CONFLICT (id) DO NOTHING;

-- ─── Políticas de Storage ─────────────────────────────────────────────
DROP POLICY IF EXISTS "Allow anon uploads on cotizaciones-firmadas" ON storage.objects;
CREATE POLICY "Allow anon uploads on cotizaciones-firmadas"
  ON storage.objects FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'cotizaciones-firmadas');

DROP POLICY IF EXISTS "Allow anon reads on cotizaciones-firmadas" ON storage.objects;
CREATE POLICY "Allow anon reads on cotizaciones-firmadas"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'cotizaciones-firmadas');
