// Palabra de la portada: par · lab · ra
// Recorre las tres partes de la palabra, ilumina una por vez y escribe
// debajo el nombre de su área, como si se tipeara.

(function () {
  const palabra = document.getElementById("palabraInicio");
  const frase = document.getElementById("fraseTipeada");
  if (!palabra || !frase) return;

  const partes = Array.from(palabra.querySelectorAll(".palabra__parte"));
  const areas = ["Cultura y voz de marca", "Ciencia y salud", "Web, apps y productos"];

  let activa = -1;
  let siguiente = 0;
  let conMouseEncima = false;
  let tiempoTipeo = null;
  let tiempoEspera = null;
  let tiempoCambio = null;

  function iluminar(indice) {
    partes.forEach(function (parte, i) {
      parte.classList.toggle("palabra__parte--activa", i === indice);
    });
  }

  function tipear(texto) {
    clearTimeout(tiempoTipeo);
    let letras = 0;
    frase.textContent = "";
    (function escribir() {
      if (letras <= texto.length) {
        frase.textContent = texto.slice(0, letras);
        letras++;
        tiempoTipeo = setTimeout(escribir, 40);
      }
    })();
  }

  function mostrar(indice) {
    activa = indice;
    iluminar(indice);
    tipear(areas[indice]);
  }

  function detener() {
    clearTimeout(tiempoEspera);
    clearTimeout(tiempoCambio);
    clearTimeout(tiempoTipeo);
  }

  function recorrer() {
    detener();
    (function paso() {
      if (conMouseEncima) return;
      mostrar(siguiente);
      tiempoEspera = setTimeout(function () {
        siguiente = (siguiente + 1) % partes.length;
        tiempoCambio = setTimeout(paso, 400);
      }, 2600);
    })();
  }

  // Al pasar el mouse (o el foco del teclado) por una parte, se queda fija
  partes.forEach(function (parte) {
    function fijar() {
      conMouseEncima = true;
      detener();
      mostrar(Number(parte.dataset.i));
    }
    parte.addEventListener("mouseenter", fijar);
    parte.addEventListener("focus", fijar);
  });

  function soltar() {
    conMouseEncima = false;
    siguiente = activa >= 0 ? activa : 0;
    recorrer();
  }
  palabra.addEventListener("mouseleave", soltar);
  palabra.addEventListener("focusout", soltar);

  recorrer();
})();
