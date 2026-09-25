# Parlabra

Sitio web de **Parlabra**, una agencia digital que une tres áreas: cultura y voz de marca, ciencia y salud, y web, apps y productos.

Proyecto desarrollado a lo largo del curso de desarrollo web, entrega por entrega.

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
