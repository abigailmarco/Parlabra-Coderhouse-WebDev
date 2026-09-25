# Parlabra

**Parlabra**, una agencia digital que une tres áreas: cultura y voz de marca, ciencia y salud, y web, apps y productos.

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

## Entrega 3 · Flexbox y modelo de caja

- Reinicio `* { margin: 0; padding: 0; }` al comienzo del CSS.
- **Barra de navegación flexible:** logo y enlaces en extremos opuestos (`justify-content: space-between`), centrados verticalmente (`align-items: center`).
- **Secciones con Flexbox:** presentación (texto e imagen), tarjetas de áreas, beneficios, servicios, pasos del proceso, formulario y pie de página usan `display: flex` con `gap`.
- **Espaciado:** relleno de al menos 20px en tarjetas, beneficios y servicios, y márgenes para separar las secciones.
- Páginas trabajadas a fondo: `index.html` y `pages/ciencia.html`.
