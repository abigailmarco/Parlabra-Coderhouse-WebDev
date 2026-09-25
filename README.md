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
