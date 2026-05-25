-- ═══ Factura Emitida — Columnas y Storage ═══
-- Ejecutar en Supabase → SQL Editor → New query
--
-- Agrega columnas para registrar el PDF de la factura, número, fecha y quién la procesó.
-- También crea el bucket de Storage para almacenar los PDFs de facturas.

-- ─── Nuevas columnas en sales_requests ────────────────────────────────
ALTER TABLE sales_requests
  ADD COLUMN IF NOT EXISTS invoice_url    TEXT,
  ADD COLUMN IF NOT EXISTS invoice_number TEXT,
  ADD COLUMN IF NOT EXISTS invoice_at     TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS invoice_by     TEXT;

-- ─── Bucket de Supabase Storage ───────────────────────────────────────
-- Bucket público para que el detalle pueda mostrar un link directo al PDF.
INSERT INTO storage.buckets (id, name, public)
VALUES ('facturas-emitidas', 'facturas-emitidas', true)
ON CONFLICT (id) DO NOTHING;

-- ─── Políticas de Storage ─────────────────────────────────────────────
DROP POLICY IF EXISTS "Allow anon uploads on facturas-emitidas" ON storage.objects;
CREATE POLICY "Allow anon uploads on facturas-emitidas"
  ON storage.objects FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'facturas-emitidas');

DROP POLICY IF EXISTS "Allow anon reads on facturas-emitidas" ON storage.objects;
CREATE POLICY "Allow anon reads on facturas-emitidas"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'facturas-emitidas');
