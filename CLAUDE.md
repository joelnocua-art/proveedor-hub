# Proveedor Hub — BIA Energy
Stack: HTML/CSS/JS vanilla. Datos en localStorage + JSON estáticos.
Idioma: Español. Moneda: COP.

## Archivos clave
- providers.js → 58 proveedores (providersData)
- quotes.js → Cotizaciones base (quotesData, vacío por ahora)
- sku_catalog.js → 501 SKUs (window.skuCatalogData)
- sku_offers.js → 578 precios (localStorage: skuOffersById)
- script.js → Lógica principal
- components.js → UI compartida (skip-link, focus trap, búsqueda global)
- dashboard-charts.js → Gráficos Chart.js, alertas, actividad

## Reglas
- Usar escapeHtml() para datos en HTML
- Usar showToast() en vez de alert()
- Mantener diseño Dark Premium (Syne + DM Sans)
- NO modificar providers.js, sku_catalog.js, sku_offers.js directamente
