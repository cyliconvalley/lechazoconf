# LechazoConf – Copilot Instructions

## Descripción del proyecto
Sitio web estático de **LechazoConf**, conferencia tecnológica anual celebrada en Valladolid (España). Organizada por [Cylicon Valley](http://www.cyliconvalley.es/). El concepto central de cada edición es "un fracaso y un éxito": 6 charlas + Call for Papers de ~20 minutos.

## Arquitectura y estructura

- **Sin framework ni build system.** HTML, CSS y JS vanilla. No hay `package.json`, bundler ni servidor de desarrollo. Para previsualizar, abre los `.html` directamente en el navegador o usa cualquier servidor estático (p. ej. `npx serve .`).
- **Una carpeta por edición:** `2017/`, `2018/`, `2019/`, `2020/`, `2024/`. La raíz (`index.html`, `style.css`) representa la edición **actual** (2026).
- **CSS compartido:** `style.css` (raíz) y `css/bootstrap.min.css` + `css/font-awesome.min.css` son usados tanto por la raíz como por todas las ediciones anteriores (las subcarpetas referencian con `../style.css`, `../css/...`).
- **Imágenes y assets compartidos** viven en `img/`, `fonts/`, `speakers/`, `partners/` (raíz). Las ediciones anteriores tienen sus propias subcarpetas equivalentes.

## Convenciones de las páginas

- Cada página de edición sigue la misma estructura de secciones en orden: `#home` → `#tickets` → `#c4p` → `#our_speakers` → `#agenda` → `#partners` → `#location` → `#coc`.
- Las secciones usan clases de fondo alternadas: `background-new`, `background-white`, `background-gray`, `background-light-blue`.
- Los ponentes se muestran con `.speaker-image` + `.speaker-box` dentro de `.row.lechazo-flex`.
- Contenido pendiente de anunciar usa `speakers/tba.jpg` y texto "Por anunciar!".
- Los bloques comentados (`<!-- ... -->`) son contenido de ediciones anteriores o funcionalidades desactivadas temporalmente (p. ej. botón de tickets, lista de ponentes confirmados). **No eliminarlos** salvo instrucción explícita; sirven de referencia para reutilizar.

## Integraciones externas clave

| Servicio | Propósito | Dónde |
|---|---|---|
| **Luma** | iframe de venta de entradas | `index.html` `#tickets` |
| **Mailchimp** | formulario de suscripción | `index.html` sección home |
| **Google Forms** | Call for Papers | enlace en sección `#c4p` |
| **Google Fonts** | Raleway + Lato | `<head>` de todos los HTML |
| **Font Awesome 4** | iconos (fa-twitter, fa-bars…) | `css/font-awesome.min.css` |
| **Bootstrap 3** | grid y navbar responsiva | `css/bootstrap.min.css` |

## Flujo para una nueva edición

1. Crear carpeta `YYYY/` copiando la estructura de `2024/` como referencia.
2. Actualizar rutas relativas (`../css/`, `../img/`, etc.).
3. En `index.html` raíz: actualizar año, fecha, meta tags, iframe de Luma y añadir enlace a la nueva edición en el `<nav>`.
4. Fotos de ponentes: `speakers/<nombre>.jpg`. Imagen placeholder: `speakers/tba.jpg`.
5. Logos de patrocinadores: `partners/<nombre>.png` o `.svg`.

## Notas adicionales

- El idioma del contenido es **español**; el atributo `lang="en"` en `<html>` es incorrecto pero está en todas las páginas — no cambiarlo sin consenso para evitar SEO impacto.
- `js/custom.js` está vacío; la interactividad (navbar collapse) proviene de Bootstrap JS en `js/library/`.
- No hay tests automatizados ni CI/CD conocido.
