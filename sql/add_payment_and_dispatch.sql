-- ═══ Comprobante de Pago + Despacho — Columnas y Storage ═══
-- Ejecutar en Supabase → SQL Editor → New query
--
-- Agrega columnas para registrar el comprobante de pago (subido por CX)
-- y el despacho de los equipos, más el bucket para los PDFs de comprobante.

-- ─── Nuevas columnas en sales_requests ────────────────────────────────
ALTER TABLE sales_requests
  ADD COLUMN IF NOT EXISTS payment_proof_url TEXT,
  ADD COLUMN IF NOT EXISTS payment_at        TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS payment_by        TEXT,
  ADD COLUMN IF NOT EXISTS dispatch_at       TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS dispatch_by       TEXT;

-- ─── Bucket de Supabase Storage ───────────────────────────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('comprobantes-pago', 'comprobantes-pago', true)
ON CONFLICT (id) DO NOTHING;

-- ─── Políticas de Storage ─────────────────────────────────────────────
DROP POLICY IF EXISTS "Allow anon uploads on comprobantes-pago" ON storage.objects;
CREATE POLICY "Allow anon uploads on comprobantes-pago"
  ON storage.objects FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'comprobantes-pago');

DROP POLICY IF EXISTS "Allow anon reads on comprobantes-pago" ON storage.objects;
CREATE POLICY "Allow anon reads on comprobantes-pago"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'comprobantes-pago');
