-- ═══ Tablas de Venta de Activos — Proveedor Hub ═══
-- Ejecutar en Supabase → SQL Editor → New query
--
-- Crea las tablas necesarias para guardar solicitudes de venta y sus equipos.
-- Sigue el mismo patrón de RLS abierto que usan las otras tablas (providers, quotes, etc).

-- ─── Tabla principal de solicitudes de venta ──────────────────────────
CREATE TABLE IF NOT EXISTS sales_requests (
  id BIGSERIAL PRIMARY KEY,
  numero TEXT NOT NULL UNIQUE,

  -- Cliente (algunos campos vienen de Metabase, otros se llenan manual)
  cliente_codigo_bia TEXT,
  cliente_razon_social TEXT NOT NULL,
  cliente_nit TEXT,
  cliente_rep TEXT,
  cliente_email TEXT,
  cliente_telefono TEXT,
  cliente_operador_red TEXT,

  -- Cotización
  tipo_contrato TEXT,
  valor_total NUMERIC(15,2) NOT NULL DEFAULT 0,
  observaciones TEXT,
  vigencia_dias INTEGER DEFAULT 30,
  fecha_cotizacion DATE DEFAULT CURRENT_DATE,

  -- Status del flujo de ventas
  status TEXT NOT NULL DEFAULT 'cotizacion_generada',
  -- valores: nueva | cotizacion_generada | enviada | firmada | factura_emitida | cerrada | cancelada

  -- Auditoría
  created_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Items individuales de cada solicitud (equipos vendidos) ──────────
CREATE TABLE IF NOT EXISTS sales_request_items (
  id BIGSERIAL PRIMARY KEY,
  sales_request_id BIGINT NOT NULL REFERENCES sales_requests(id) ON DELETE CASCADE,

  nombre_sku TEXT NOT NULL,
  serial TEXT,
  marca TEXT,
  modelo TEXT,
  precio_base NUMERIC(15,2) NOT NULL DEFAULT 0,
  margen_pct NUMERIC(5,2) NOT NULL DEFAULT 0,
  cantidad INTEGER NOT NULL DEFAULT 1,

  -- Datos extras del equipo en Metabase
  ciudad TEXT,
  frontera TEXT,
  estado_equipo TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Índices ──────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_sales_items_request ON sales_request_items(sales_request_id);
CREATE INDEX IF NOT EXISTS idx_sales_status ON sales_requests(status);
CREATE INDEX IF NOT EXISTS idx_sales_created ON sales_requests(created_at DESC);

-- ─── Row Level Security ───────────────────────────────────────────────
-- Habilitamos RLS y permitimos todo para el rol anon (mismo patrón que el resto del proyecto).
ALTER TABLE sales_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_request_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable all for anon on sales_requests" ON sales_requests;
CREATE POLICY "Enable all for anon on sales_requests"
  ON sales_requests FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Enable all for anon on sales_request_items" ON sales_request_items;
CREATE POLICY "Enable all for anon on sales_request_items"
  ON sales_request_items FOR ALL USING (true) WITH CHECK (true);

-- ─── Trigger para updated_at automático ───────────────────────────────
CREATE OR REPLACE FUNCTION sales_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sales_requests_updated_at ON sales_requests;
CREATE TRIGGER trg_sales_requests_updated_at
  BEFORE UPDATE ON sales_requests
  FOR EACH ROW EXECUTE FUNCTION sales_set_updated_at();
