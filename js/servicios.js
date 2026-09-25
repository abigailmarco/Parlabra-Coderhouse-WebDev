// Páginas de servicio (cultura, ciencia y web)

(function () {
  // Flor de líneas del servicio estrella: 12 elipses giradas con los dos colores del área
  const flor = document.getElementById("florServicio");
  if (flor) {
    const colores = flor.dataset.colores.split(",");
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 300 300");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    for (let i = 0; i < 12; i++) {
      const elipse = document.createElementNS(svgNS, "ellipse");
      elipse.setAttribute("cx", "150");
      elipse.setAttribute("cy", "150");
      elipse.setAttribute("rx", "140");
      elipse.setAttribute("ry", "45");
      elipse.setAttribute("fill", "none");
      elipse.setAttribute("stroke", colores[i % colores.length]);
      elipse.setAttribute("transform", "rotate(" + i * 30 + " 150 150)");
      svg.appendChild(elipse);
    }
    flor.appendChild(svg);
  }

  // Cinta de especialidades: se duplica la lista para que el desplazamiento no tenga cortes
  const cinta = document.querySelector(".cinta__lista");
  if (cinta) {
    Array.from(cinta.children).forEach(function (item) {
      const copia = item.cloneNode(true);
      copia.setAttribute("aria-hidden", "true");
      cinta.appendChild(copia);
    });
  }
})();
