# ⚡ Proveedor Hub — BIA Energy Operaciones

Sistema de gestión de proveedores, cotizaciones y comparativos para el área de Operaciones de BIA Energy.

## Stack

- **Frontend:** HTML5, CSS3, JavaScript vanilla (sin frameworks)
- **Datos:** localStorage + archivos JS/JSON estáticos (sin backend)
- **Deploy:** Vercel (static site)
- **Design:** Dark/Light mode, responsive, mobile-friendly

## Estructura del proyecto

```
├── index.html            # Login
├── register.html         # Registro
├── home.html             # Dashboard principal
├── providers.html        # Lista de proveedores
├── new_provider.html     # Registrar proveedor
├── provider_detail.html  # Ficha de proveedor
├── quotes.html           # Wizard de cotizaciones (4 pasos)
├── quote_detail.html     # Detalle de cotización
├── compare.html          # Comparativo por cotización
├── sku.html              # Catálogo de SKUs con precios
├── respuesta.html        # Formulario público para proveedores
├── 404.html              # Página de error
├── styles.css            # Estilos globales (dark + light mode)
├── script.js             # Lógica principal (~2600 líneas)
├── components.js         # Componentes compartidos, theme, notificaciones
├── dashboard-charts.js   # Gráficos del dashboard (Chart.js)
├── providers.js          # Datos de proveedores (60)
├── providers.json        # Datos de proveedores (JSON)
├── sku_catalog.js        # Catálogo de 501 SKUs
├── sku_offers.js         # 855 precios de 5 proveedores
├── quotes.js             # Datos de cotizaciones (vacío por defecto)
├── providerProducts.js   # Mapeo proveedor-producto
├── vercel.json           # Configuración de Vercel
├── manifest.json         # PWA manifest
├── CLAUDE.md             # Contexto para AI agents
└── .gitignore
```

## Datos

| Recurso | Cantidad |
|---------|----------|
| Proveedores | 60 |
| SKUs en catálogo | 501 |
| Precios registrados | 855 |
| Proveedores con precios | 5 (SELDA, 4S, PROELCO, ADLER, LAUMAYER) |
| Categorías de SKU | 23 |

## Flujo principal

1. **Cotizar:** Wizard → Seleccionar SKUs → Seleccionar proveedores → Nombrar y enviar
2. **Responder:** Proveedor abre link → Llena precios → Se guarda automáticamente
3. **Comparar:** Seleccionar cotización → Ver tarjetas lado a lado → Adjudicar ganador
4. **Rastrear:** Seguimiento agrupado por nombre de cotización con estados

## Despliegue

```bash
# Clonar
git clone https://github.com/TU-USUARIO/proveedor-hub.git
cd proveedor-hub

# No necesita build — es HTML estático
# Abrir index.html en el navegador para probar localmente

# Vercel: conectar repo → Framework: Other → Deploy
```

## localStorage keys

| Key | Descripción |
|-----|-------------|
| `currentUser` | Usuario logueado |
| `extraQuotes` | Cotizaciones creadas por el usuario |
| `extraProviders` | Proveedores agregados manualmente |
| `providerOverrides` | Ediciones a proveedores existentes |
| `skuOffersById` | Precios de ofertas |
| `pendingProviderResponses` | Respuestas pendientes de importar |
| `adjudications` | Proveedores adjudicados por cotización |
| `theme` | Preferencia dark/light |

## Limitaciones (sin backend)

- Los datos se guardan en el navegador del usuario (localStorage)
- No hay sincronización entre usuarios/dispositivos
- No hay autenticación real (login es cosmético)
- El formulario de respuesta requiere mismo dominio (Vercel)

## Evolución futura

Para convertir en app multiusuario real:
1. Agregar Supabase/Firebase como backend
2. Migrar localStorage a base de datos
3. Implementar auth real (Google/email)
4. Formulario de respuesta con API endpoint
5. Notificaciones push para respuestas

## Licencia

Uso interno — BIA Energy
