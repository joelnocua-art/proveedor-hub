-- ════════════════════════════════════════════════════════════════
-- LISTADO GRANULAR DE EQUIPOS A VENCER (CALIBRACIÓN) — uno por serial
-- ════════════════════════════════════════════════════════════════
-- Objetivo: a diferencia de la card #75406 (que AGREGA por mes × código y
-- solo muestra cantidades/totales), esta consulta devuelve UNA FILA POR
-- EQUIPO/SERIAL con su SKU, descripción, fecha de vencimiento y el PRECIO
-- UNITARIO de calibración. SIN totales, SIN SUM, SIN GROUP BY.
--
-- Cómo obtener el SQL correcto en 2 pasos:
--   1) Abre la card #75406 en Metabase → "Ver el SQL".
--   2) Copia EXACTAMENTE su cláusula FROM/JOIN/WHERE (ahí está la tabla real
--      de equipos por serial). Reemplaza abajo lo marcado con  ⬅️ AJUSTA.
--      Quita cualquier GROUP BY / SUM() / COUNT() de la card original:
--      aquí queremos el detalle fila por fila, no el agregado.
--
-- La tabla de precios (VALUES) es la MISMA que ya usa la card #75406.
-- ════════════════════════════════════════════════════════════════

WITH precios_calibracion (codigo, valor_unitario) AS (
    VALUES
        (5496,  26405),   -- TC Baja Tensión
        (5497, 106320),   -- TP Media Tensión
        (5498,  93370),   -- TC Media Tensión
        (6022,  88380),   -- Medidor Bifásico
        (6024, 179380)    -- Medidor Trifásico CL 0.5S
)
SELECT
    e.serial                                          AS serial,             -- ⬅️ AJUSTA col. serial/activo
    e.codigo                                          AS sku,                -- ⬅️ AJUSTA col. código/SKU
    e.descripcion                                     AS descripcion,        -- ⬅️ AJUSTA col. descripción
    e.categoria                                       AS nivel_tension,      -- ⬅️ AJUSTA (Baja/Media…)
    e.fecha_proxima_calibracion                       AS fecha_vencimiento,  -- ⬅️ AJUSTA fecha de vencimiento
    to_char(e.fecha_proxima_calibracion, 'YYYY-MM')   AS mes_vencimiento,
    p.valor_unitario                                  AS precio_unitario_cop -- precio unitario por equipo
FROM equipos e                                        -- ⬅️ AJUSTA: tabla/vista base de la card #75406
JOIN precios_calibracion p ON p.codigo = e.codigo
WHERE e.fecha_proxima_calibracion >= CURRENT_DATE
  AND e.fecha_proxima_calibracion <  CURRENT_DATE + INTERVAL '7 months'      -- ventana = la que use la card
ORDER BY e.fecha_proxima_calibracion, e.codigo, e.serial;
