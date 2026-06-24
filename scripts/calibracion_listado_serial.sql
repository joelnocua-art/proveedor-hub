-- ════════════════════════════════════════════════════════════════
-- LISTADO GRANULAR DE EQUIPOS A VENCER (CALIBRACIÓN) — uno por serial
-- ════════════════════════════════════════════════════════════════
-- Derivado de la card #75406. Esa card AGREGA (GROUP BY mes×código + COUNT/SUM),
-- por eso no muestra seriales. Aquí se conserva exactamente su lógica de
-- filtros y clasificación, pero se baja al nivel de cada equipo/serial y se
-- agrega el precio unitario. SIN totales, SIN GROUP BY, SIN COUNT/SUM.
--
-- Único ajuste posible: el nombre de la columna de serial en ops_wms.inventory
-- (abajo marcado con ⬅️ AJUSTA). Si no se llama "serial", cámbialo por el real
-- (p. ej. serial_number, name, codigo_activo).
-- ════════════════════════════════════════════════════════════════

WITH certs_calibracion AS (
    SELECT
        c.*,
        ROW_NUMBER() OVER (
            PARTITION BY c.inventory_id
            ORDER BY c.end_date DESC
        ) AS rn
    FROM ops_wms.certificates c
    WHERE c.type = 'CERTIFICADO DE CALIBRACION'
      AND c.url ILIKE 'https://%'
      AND c.end_date::date >= '2026-06-01'
      AND c.end_date::date <= '2026-12-31'
),
base AS (
    SELECT
        inventory.id                                    AS inventory_id,
        inventory.serial                                AS serial,            -- ⬅️ AJUSTA si la columna tiene otro nombre
        sku.name                                        AS sku_nombre,
        certs_calibracion.end_date                      AS fecha_vencimiento,
        certs_calibracion.url                           AS certificado_url,
        TO_CHAR(certs_calibracion.end_date, 'YYYY-MM')  AS mes,
        CASE
            WHEN sku.name ILIKE 'TC%' AND sku.name ILIKE '%0,72 kV%' THEN '5496'
            WHEN sku.name ILIKE 'TC%'           THEN '5498'
            WHEN sku.name ILIKE 'TP%'           THEN '5497'
            WHEN sku.name ILIKE '%AISLAMIENTO%' THEN '5511'
            WHEN sku.name ILIKE 'C%'            THEN '6021'  -- Monofásico (C2000)
            WHEN sku.name ILIKE 'D%'            THEN '6022'  -- Bifásico (D2000)
            WHEN sku.name ILIKE 'P%'            THEN '6024'  -- Trifásico (P2000)
            WHEN sku.name ILIKE '%INHEMETER%'   THEN '6024'  -- Trifásico (marca)
            ELSE NULL
        END AS codigo_servicio
    FROM ops_wms.inventory inventory
        LEFT JOIN ops_wms.sku sku ON inventory.sku_id = sku.id
        JOIN certs_calibracion
            ON certs_calibracion.inventory_id = inventory.id
            AND certs_calibracion.rn = 1
    WHERE inventory.state IN ('ASIGNADO', 'DISPONIBLE')
      AND certs_calibracion.url IS NOT NULL
      AND sku.name NOT ILIKE '%LANDIS%'   -- LandisGYR ya no se maneja
)
SELECT
    base.serial                                         AS serial,
    base.codigo_servicio                                AS codigo,
    base.sku_nombre                                     AS sku,
    precios.descripcion_servicio                        AS descripcion,
    CASE
        WHEN base.codigo_servicio = '5496'                     THEN 'Baja'
        WHEN base.codigo_servicio IN ('5497','5498','5511')    THEN 'Media'
        WHEN base.codigo_servicio IN ('6021','6022','6024')    THEN 'Medidor'
        ELSE 'Sin clasificar'
    END                                                 AS categoria,
    base.fecha_vencimiento                              AS fecha_vencimiento,
    base.mes                                            AS mes_vencimiento,
    precios.vr_unitario                                 AS valor_unitario,   -- precio unitario por equipo
    base.certificado_url                                AS certificado_url
FROM base
    LEFT JOIN (
        VALUES
            ('5496', 'TC Baja Tensión',            26405),
            ('5497', 'TP Media Tensión',          106320),
            ('5498', 'TC Media Tensión',           93370),
            ('5511', 'Prueba Aislamiento',         74300),
            ('6021', 'Medidor Monofásico',         55750),
            ('6022', 'Medidor Bifásico',           88380),
            ('6024', 'Medidor Trifásico CL 0.5S', 179380)
    ) AS precios(codigo, descripcion_servicio, vr_unitario)
        ON precios.codigo = base.codigo_servicio
ORDER BY base.fecha_vencimiento ASC, base.codigo_servicio ASC, base.serial ASC;
