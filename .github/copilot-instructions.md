# LechazoConf – Copilot Instructions

## Descripción del proyecto
Sitio web estático de **LechazoConf**, conferencia tecnológica anual celebrada en Valladolid (España). Organizada por [Cylicon Valley](http://www.cyliconvalley.es/). El concepto central de cada edición es "un fracaso y un éxito": 6 charlas + Call for Papers de ~20 minutos.

## Arquitectura y estructura

- **HTML, CSS y JS vanilla; sin bundler ni `package.json`.** Las páginas de la edición actual (`index.html`, `c4p.html`, `coc.html`) se montan con **Jekyll**, que es lo que GitHub Pages ejecuta al desplegar:
  - `_config.yml` — año, fecha y lista de ediciones. **Cambiar el año aquí actualiza título, meta tags, pie y menú de las tres páginas a la vez.**
  - `_layouts/default.html` — el esqueleto común (`<head>`, cabecera, pie, scripts).
  - `_includes/` — `header.html` (menú; recibe `base` para saber si enlaza a `#seccion` o a `index.html#seccion`), `footer.html`, `scripts.html`, `location.html`, `trip.html`, `coc-summary.html`.
  - Las tres páginas de la raíz llevan front matter (`layout: default`) y contienen **solo** su contenido propio.
  - Para previsualizarlas hace falta Jekyll (ver «Desarrollo local»); abrir el `.html` directamente ya no funciona para esas tres, porque son plantillas y verías el Liquid sin procesar.
- **Una carpeta por edición:** `2017/`, `2018/`, `2019/`, `2020/`, `2024/`, `2026/`. La raíz representa la edición **actual** (2027). Las ediciones archivadas son HTML plano **sin front matter**, así que Jekyll las copia tal cual, sin procesarlas: son instantáneas congeladas y no deben convertirse a plantillas.
- **CSS compartido:** `style.css` (raíz) y `css/bootstrap.min.css` + `css/font-awesome.min.css` son usados tanto por la raíz como por todas las ediciones anteriores (las subcarpetas referencian con `../style.css`, `../css/...`).
- **Imágenes y assets compartidos** viven en `img/`, `fonts/`, `speakers/`, `partners/` (raíz). Las ediciones anteriores tienen sus propias subcarpetas equivalentes.

## Desarrollo local

El Ruby que trae macOS (`/usr/bin/ruby`, 2.6) **no sirve**: está obsoleto y `gem install` se queda colgado compilando extensiones nativas. Hay que instalar uno propio.

```sh
brew install ruby
# Hacen falta DOS rutas en el PATH: la de ruby y la de los ejecutables que
# instala `gem` (jekyll vive en la segunda). Con solo la primera, `jekyll`
# da "command not found" aunque esté perfectamente instalado.
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
echo 'export PATH="$(gem environment gemdir)/bin:$PATH"' >> ~/.zshrc
exec zsh
gem install jekyll
```

Comprobar que ha quedado bien: `which jekyll` debe responder algo dentro de
`/opt/homebrew/lib/ruby/gems/…/bin`. Si `gem list jekyll` lo encuentra pero
`which jekyll` no, el problema es el PATH, no la instalación.

Y desde la raíz del repo:

```sh
jekyll serve --livereload   # http://localhost:4000
```

`--livereload` vuelve a renderizar al guardar, que es lo cómodo mientras se tocan los `_includes/`.

Sin instalar nada, con Docker:

```sh
docker run --rm -it -p 4000:4000 -v "$PWD":/srv/jekyll -w /srv/jekyll \
  ruby:3.3 sh -c "gem install jekyll && jekyll serve --host 0.0.0.0"
```

Notas:

- `_site/` y `.jekyll-cache/` están en `.gitignore`. **Nunca commitear `_site/`**: el sitio se construye en CI.
- Las ediciones archivadas (`2017/` … `2026/`) son HTML plano, así que se pueden abrir directamente en el navegador o servir con cualquier servidor estático. Solo las tres páginas de la raíz necesitan Jekyll.
- **Paridad con producción:** CI usa `actions/jekyll-build-pages`, que ejecuta la gema `github-pages` (Jekyll 3.10), mientras que `gem install jekyll` instala Jekyll 4.x. Para este sitio da igual —no hay plugins y solo se usan `include`, `for` y variables, que se comportan igual en ambas—, pero conviene saber que local no es un clon exacto de producción. Si hiciera falta paridad estricta, habría que añadir un `Gemfile` con `github-pages` (más fiel, pero más frágil de instalar).
- Para comprobar que un cambio en plantillas no altera el resultado, comparar ignorando espacios:
  `diff <(sed 's/[[:space:]]//g' _site/index.html) <(sed 's/[[:space:]]//g' referencia.html)`

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

1. Archivar la edición que termina: crear carpeta `YYYY/` y mover ahí `speakers/` y `partners/` de esa edición con `git mv`. **Copiar (no mover)** los assets recurrentes: `speakers/tba.jpg`, `partners/escuela-informatica.png`, `partners/uva.gif`, que siguen haciendo falta en la raíz.
2. Guardar la **página ya renderizada** de la edición que termina en `YYYY/index.html`: `jekyll build` y copiar `_site/index.html`. No archivar la plantilla con front matter: las ediciones pasadas son HTML plano y congelado.
3. Corregir en `YYYY/index.html` **todas** las rutas relativas: `./img/` → `../img/`, `css/` → `../css/`, `js/` → `../js/`, `style.css` → `../style.css`, `c4p.html` → `../c4p.html`, `coc.html` → `../coc.html`, y los enlaces del menú a otras ediciones → `../YYYY/index.html`. Las imágenes de ponentes/patrocinadores quedan como `speakers/...` y `partners/...` (ya viven dentro de `YYYY/`). Usar `2026/` como referencia: es la edición con las rutas correctas.
4. En `_config.yml`: subir `year`, poner la `date_text` nueva y añadir la edición archivada a `editions`. Con eso se actualizan solos el título, los meta tags, el pie y el menú de las tres páginas — **ya no hay que tocar el año a mano en `c4p.html` ni en `coc.html`**. En `c4p.html` sí hay que actualizar el número de edición romano del texto.
5. En `index.html`: resetear ponentes, agenda y patrocinadores a "Por anunciar", y reactivar el bloque de entradas/CFP cuando toque (están comentados, ver más abajo).
6. Fotos de ponentes: `speakers/<nombre>.jpg`. Imagen placeholder: `speakers/tba.jpg`.
7. Logos de patrocinadores: `partners/<nombre>.png` o `.svg`. Al archivar, `escuela-informatica.png` y `uva.gif` se copian, no se mueven.
8. Verificar que **todas** las rutas relativas resuelven a un fichero existente antes de hacer commit; los errores de rutas al archivar son el fallo más habitual de este repo.

## Notas adicionales

- El idioma del contenido es **español**; el atributo `lang="en"` en `<html>` es incorrecto pero está en todas las páginas — no cambiarlo sin consenso para evitar SEO impacto.
- `js/custom.js` está vacío; la interactividad (navbar collapse) proviene de Bootstrap JS en `js/library/`. Por eso una ruta rota a `js/library/` deja el menú móvil sin funcionar, sin ningún error visible.
- **Despliegue:** `.github/workflows/pages.yml` publica en GitHub Pages en cada push a `master`. Construye con `actions/jekyll-build-pages` y sube `_site/`, no el árbol en crudo: si se quitara ese paso, las tres páginas de la raíz se servirían con el Liquid sin procesar. No hay tests automatizados ni comprobación de enlaces — un paso con `lychee` detectaría las rutas rotas, que son el fallo recurrente aquí.
- **Sin analítica.** El sitio usaba Google Analytics con `analytics.js` y la propiedad `UA-93173115-1`; Universal Analytics dejó de recoger datos en julio de 2023, así que el snippet se eliminó de todas las páginas. Si se quiere analítica otra vez hay que crear una propiedad GA4 y añadir el snippet nuevo.
