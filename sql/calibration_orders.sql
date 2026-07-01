-- ═══ calibration_orders — Proveedor Hub ═══
-- Tabla para el módulo de Calibraciones: órdenes de calibración de equipos.
-- Correr este script en el SQL editor de Supabase.

CREATE TABLE IF NOT EXISTS calibration_orders (
  id                  uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  numero              text UNIQUE NOT NULL,          -- CAL-YYYY-NNN
  mes_programado      text NOT NULL,                 -- 'YYYY-MM'
  tipo_equipo         text NOT NULL,                 -- 'TC' | 'TP' | 'Medidor' | 'Todos'
  cantidad_equipos    integer DEFAULT 0,
  costo_estimado      numeric(14, 2) DEFAULT 0,
  proveedor_nombre    text NOT NULL,
  proveedor_email     text,
  proveedor_contacto  text,
  notas               text,
  status              text DEFAULT 'pendiente',      -- 'pendiente' | 'programada' | 'en_proceso' | 'completada' | 'cancelada'
  certificado_url     text,                          -- URL pública en Storage
  completada_at       timestamptz,
  completada_by       text,                          -- email de quien registró la completitud
  created_at          timestamptz DEFAULT now(),
  created_by          text                           -- email del responsable
);

-- Índices útiles para filtrado
CREATE INDEX IF NOT EXISTS idx_calib_status  ON calibration_orders (status);
CREATE INDEX IF NOT EXISTS idx_calib_mes     ON calibration_orders (mes_programado);
CREATE INDEX IF NOT EXISTS idx_calib_tipo    ON calibration_orders (tipo_equipo);

-- Row Level Security
ALTER TABLE calibration_orders ENABLE ROW LEVEL SECURITY;

-- Permitir lectura y escritura a usuarios autenticados
CREATE POLICY "calib_authenticated_all"
  ON calibration_orders FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Permitir lectura a anon (para que el frontend sin sesión pueda ver las órdenes)
-- Si quieres restringir a sólo autenticados, elimina esta policy.
CREATE POLICY "calib_anon_read"
  ON calibration_orders FOR SELECT
  TO anon
  USING (true);

-- Bucket de Storage para certificados de calibración
-- Crear manualmente en Supabase Dashboard → Storage → New bucket
-- Nombre: certificados-calibracion
-- Configuración: Public bucket (para URLs públicas) o Private (con signed URLs)

-- Script de verificación:
-- SELECT count(*) FROM calibration_orders;
