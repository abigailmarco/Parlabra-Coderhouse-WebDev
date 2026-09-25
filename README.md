# Parlabra

Sitio web de **Parlabra**, una agencia digital que une tres áreas: cultura y voz de marca, ciencia y salud, y web, apps y productos.

Proyecto desarrollado a lo largo del curso de desarrollo web, entrega por entrega.

**Sitio publicado:** https://TU-USUARIO.github.io/parlabra/

## Cómo publicarlo con GitHub Pages

1. Subir el repositorio a GitHub con el nombre `parlabra` y dejarlo **público**.
2. En el repositorio: **Settings → Pages → Build and deployment**. En *Source* elegir *Deploy from a branch*, rama `main`, carpeta `/ (root)` y guardar.
3. A los pocos minutos el sitio queda en `https://TU-USUARIO.github.io/parlabra/` (reemplazar `TU-USUARIO` por el usuario de GitHub, también en el enlace de arriba).

## Cómo verlo en la computadora

Abrir `index.html` en el navegador, o levantar un servidor local desde la carpeta del proyecto:

```
python3 -m http.server 8000
```

y entrar a http://localhost:8000.

## Estructura

```
parlabra/
├── index.html          Inicio
├── pages/
│   ├── cultura.html    Cultura y voz de marca
│   ├── ciencia.html    Ciencia y salud
│   ├── web.html        Web, apps y productos
│   └── contacto.html   Formulario de contacto
├── styles/
│   └── styles.css      Hoja de estilos
├── js/                 Efectos: palabra de portada, bloques, flor, formulario
└── img/                Ilustraciones del sitio
```

## Entrega 1 · Estructura base

Esqueleto semántico de las cinco páginas, todavía sin estilos: `header`, `nav`, `main`, `section`, `article` y `footer`, títulos en orden (h1 → h2 → h3) y una imagen con `figure` y `figcaption` en cada página.

## Entrega 2 · Estilos visuales

Hoja de estilos externa (`styles/styles.css`) vinculada en las cinco páginas.

- **Paleta:** fondo `#0f0f0f`, primario verde `#48c840`, secundario azul `#48a8e8` y acento ámbar `#e8a000`. Cada área tiene sus dos colores propios (cultura violeta y naranja, ciencia verde y azul, web turquesa y lila).
- **Tipografías de Google Fonts:** Inter para textos y títulos, JetBrains Mono para la frase de la portada y Caveat para las notas manuscritas, todas con fuente genérica de respaldo.
- **Fondo:** degradado radial oscuro.
- Estilos aplicados solo con clases: sin `!important`, sin estilos en línea y sin selectores de id (los id quedan para JavaScript).

## Entrega 3 · Flexbox y modelo de caja

- Reinicio `* { margin: 0; padding: 0; }` al comienzo del CSS.
- **Barra de navegación flexible:** logo y enlaces en extremos opuestos (`justify-content: space-between`), centrados verticalmente (`align-items: center`).
- **Secciones con Flexbox:** presentación (texto e imagen), tarjetas de áreas, beneficios, servicios, pasos del proceso, formulario y pie de página usan `display: flex` con `gap`.
- **Espaciado:** relleno de al menos 20px en tarjetas, beneficios y servicios, y márgenes para separar las secciones.
- Páginas trabajadas a fondo: `index.html` y `pages/ciencia.html`.

## Entrega 4 · Grilla y diseño adaptable

- **Mobile first:** el diseño base (sin media queries) es el de celular, con todas las secciones apiladas al 100% del ancho.
- **CSS Grid con áreas:** `grid-template-areas` en la presentación del inicio (`texto` / `figura`), en «Qué hacemos», en la sección de servicios (`titulo`, `destacado`, `lista`) y en «Otras formas de contacto».
- **Medidas fluidas:** columnas con `fr` (`1fr 1fr`, `2fr 1fr`, `repeat(3, 1fr)`) y `gap` en todas las grillas.
- **Punto de quiebre de escritorio:** `@media (min-width: 1024px)` pasa las grillas de una a varias columnas.
- Páginas completas en celular, tableta y escritorio: `index.html` y `pages/ciencia.html`.

## Entrega 5 · Bootstrap y estados interactivos

- **Bootstrap 5.3 por CDN** en las cinco páginas: la hoja de estilos en el `<head>` y el script antes de cerrar el `<body>`.
- **Navbar de Bootstrap** en todas las páginas, con menú hamburguesa en celulares.
- **Galería con carrusel** en `index.html` («Así trabajamos») y en `pages/ciencia.html` («Galería de proyectos científicos»).
- **Estados interactivos** con `:hover`, `:focus`/`:focus-visible` y `:active`, siempre con `transition`: enlaces del menú, logo, botones, tarjetas, controles del carrusel, campos del formulario y redes sociales.
- Los componentes de Bootstrap se adaptan a la paleta propia: menú oscuro con subrayado ámbar, indicadores y controles del carrusel en los colores del sitio.

## Entrega 6 · Control de versiones con GitHub

- Historial con commits descriptivos hechos desde la consola (`feat:`, `fix:`, `docs:`), una etiqueta por entrega (`entrega-1` … `entrega-9`).
- Páginas completamente adaptadas a celular y escritorio: `index.html`, `pages/ciencia.html` y `pages/web.html`. Cultura y contacto muestran avances de contenido y estilos.
- Maquetación de las cinco páginas con Bootstrap (navbar y carrusel) más Grid y Flexbox propios.
- Enlace al sitio publicado arriba, en este README.
