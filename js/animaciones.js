// Animaciones al hacer scroll (librería AOS)
// Las secciones, tarjetas e imágenes marcadas con data-aos aparecen suavemente
// cuando entran en pantalla.

(function () {
  const pideMenosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Si la librería no cargó, se quitan las marcas para que el contenido se vea igual
  if (typeof AOS === "undefined") {
    document.querySelectorAll("[data-aos]").forEach(function (elemento) {
      elemento.removeAttribute("data-aos");
    });
    return;
  }

  AOS.init({
    duration: 800,
    easing: "ease-out-cubic",
    once: true,
    offset: 60,
    disable: pideMenosMovimiento
  });
})();
