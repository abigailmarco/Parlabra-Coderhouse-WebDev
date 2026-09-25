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

  // Pasos del proceso: se arrastran de costado con el mouse (en pantallas táctiles
  // se deslizan con el dedo). El paso que queda en el centro se ilumina.
  const pista = document.querySelector(".proceso__pista[id]");
  const puntosContenedor = document.querySelector(".proceso__puntos");
  if (pista && puntosContenedor) {
    const pasos = Array.from(pista.querySelectorAll(".paso"));
    const puntos = pasos.map(function () {
      const punto = document.createElement("span");
      punto.className = "proceso__punto";
      puntosContenedor.appendChild(punto);
      return punto;
    });

    function marcarPasoCentral() {
      const centro = pista.getBoundingClientRect().left + pista.clientWidth / 2;
      let masCercano = 0;
      let menorDistancia = Infinity;
      pasos.forEach(function (paso, i) {
        const caja = paso.getBoundingClientRect();
        const distancia = Math.abs(caja.left + caja.width / 2 - centro);
        if (distancia < menorDistancia) {
          menorDistancia = distancia;
          masCercano = i;
        }
      });
      pasos.forEach(function (paso, i) { paso.classList.toggle("paso--activo", i === masCercano); });
      puntos.forEach(function (punto, i) { punto.classList.toggle("proceso__punto--activo", i === masCercano); });
    }

    // Arrastre con el mouse
    let arrastrando = false;
    let inicioX = 0;
    let inicioScroll = 0;
    pista.addEventListener("mousedown", function (evento) {
      arrastrando = true;
      inicioX = evento.clientX;
      inicioScroll = pista.scrollLeft;
      pista.classList.add("proceso__pista--arrastrando");
      evento.preventDefault();
    });
    window.addEventListener("mousemove", function (evento) {
      if (arrastrando) pista.scrollLeft = inicioScroll - (evento.clientX - inicioX);
    });
    window.addEventListener("mouseup", function () {
      if (!arrastrando) return;
      arrastrando = false;
      pista.classList.remove("proceso__pista--arrastrando");
    });

    pista.addEventListener("scroll", marcarPasoCentral, { passive: true });
    window.addEventListener("resize", marcarPasoCentral);
    // Arranca centrado en el primer paso
    pista.scrollLeft = pasos[0].offsetLeft - (pista.clientWidth - pasos[0].offsetWidth) / 2;
    marcarPasoCentral();
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
