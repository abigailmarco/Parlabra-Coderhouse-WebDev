// Franja de bloques de colores (Tetris)
// Las piezas caen una por una hasta llenar la franja. Cuando se llena,
// la franja empieza a desplazarse de costado y algunos bloques cambian de color.

(function () {
  const lienzo = document.getElementById("lienzoBloques");
  if (!lienzo) return;
  const dibujo = lienzo.getContext("2d");

  const TAMANO_BLOQUE = 24;
  const FILAS = 6;
  const COLORES = ["#E84040", "#E8A000", "#48A8E8", "#48C840", "#A040E8", "#E87800"];
  const PIEZAS = [
    [[1, 1, 1, 1]],
    [[1, 1], [1, 1]],
    [[0, 1, 0], [1, 1, 1]],
    [[0, 1, 1], [1, 1, 0]],
    [[1, 1, 0], [0, 1, 1]],
    [[1, 0, 0], [1, 1, 1]],
    [[0, 0, 1], [1, 1, 1]]
  ];

  let ancho, alto, columnas, pisoY, tablero, tableroLargo, largoTotal;
  let piezaCayendo = null;
  let piezasApoyadas = 0;
  let desplazando = false;
  let desplazamiento = 0;
  let esperaPieza = 0;
  let esperaColor = 0;
  let ultimoTiempo = 0;

  const alAzar = (lista) => lista[Math.floor(Math.random() * lista.length)];
  const tableroVacio = (cols) => Array.from({ length: FILAS }, () => Array(cols).fill(null));

  // Fila donde se apoyaría una pieza soltada en la columna indicada
  function filaDeApoyo(grilla, pieza, columna) {
    let fila = -1;
    for (let y = 0; y + pieza.length <= FILAS; y++) {
      const choca = pieza.some((renglon, r) =>
        renglon.some((celda, c) => celda && grilla[y + r][columna + c]));
      if (choca) break;
      fila = y;
    }
    return fila;
  }

  function apoyar(grilla, pieza, columna, fila, color) {
    pieza.forEach((renglon, r) => renglon.forEach((celda, c) => {
      if (celda) grilla[fila + r][columna + c] = color;
    }));
  }

  function preparar() {
    ancho = lienzo.clientWidth;
    alto = lienzo.clientHeight;
    lienzo.width = ancho;
    lienzo.height = alto;
    columnas = Math.ceil(ancho / TAMANO_BLOQUE);
    pisoY = alto - FILAS * TAMANO_BLOQUE;
    tablero = tableroVacio(columnas);

    // Tablero largo, ya lleno, para la etapa en que la franja se desplaza
    largoTotal = columnas * 10;
    tableroLargo = tableroVacio(largoTotal);
    for (let i = 0; i < largoTotal * 5; i++) {
      const pieza = alAzar(PIEZAS);
      const columna = Math.floor(Math.random() * (largoTotal - pieza[0].length));
      const fila = filaDeApoyo(tableroLargo, pieza, columna);
      if (fila >= 0) apoyar(tableroLargo, pieza, columna, fila, alAzar(COLORES));
    }
  }

  function soltarPieza() {
    const pieza = alAzar(PIEZAS);
    const columna = Math.floor(Math.random() * (columnas - pieza[0].length));
    const fila = filaDeApoyo(tablero, pieza, columna);
    if (fila < 0) return;
    piezaCayendo = { pieza, columna, fila, color: alAzar(COLORES), y: -pieza.length * TAMANO_BLOQUE };
  }

  function pintarBloque(x, y, color) {
    dibujo.fillStyle = color;
    dibujo.fillRect(x + 1, y + 1, TAMANO_BLOQUE - 2, TAMANO_BLOQUE - 2);
  }

  function pintarTablero(grilla, desdeColumna, corrimiento) {
    for (let r = 0; r < FILAS; r++) {
      for (let c = desdeColumna; c < Math.min(desdeColumna + columnas + 2, grilla[0].length); c++) {
        if (grilla[r][c]) pintarBloque(c * TAMANO_BLOQUE - corrimiento, pisoY + r * TAMANO_BLOQUE, grilla[r][c]);
      }
    }
  }

  function cuadro(tiempo) {
    const delta = Math.min(tiempo - ultimoTiempo, 50);
    ultimoTiempo = tiempo;
    dibujo.clearRect(0, 0, ancho, alto);

    if (!desplazando) {
      // Etapa 1: caen las piezas
      esperaPieza += delta;
      if (!piezaCayendo && esperaPieza > 500) {
        soltarPieza();
        esperaPieza = 0;
      }
      if (piezaCayendo) {
        const destino = pisoY + piezaCayendo.fila * TAMANO_BLOQUE;
        piezaCayendo.y = Math.min(piezaCayendo.y + 3, destino);
        if (piezaCayendo.y === destino) {
          apoyar(tablero, piezaCayendo.pieza, piezaCayendo.columna, piezaCayendo.fila, piezaCayendo.color);
          piezaCayendo = null;
          piezasApoyadas++;
          if (piezasApoyadas >= columnas * 1.2) desplazando = true;
        }
      }
      pintarTablero(tablero, 0, 0);
      if (piezaCayendo) {
        piezaCayendo.pieza.forEach((renglon, r) => renglon.forEach((celda, c) => {
          if (celda) pintarBloque((piezaCayendo.columna + c) * TAMANO_BLOQUE, piezaCayendo.y + r * TAMANO_BLOQUE, piezaCayendo.color);
        }));
      }
    } else {
      // Etapa 2: la franja se desplaza y algunos bloques cambian de color
      esperaColor += delta;
      const primeraColumna = Math.floor(desplazamiento / TAMANO_BLOQUE);
      if (esperaColor > 380) {
        for (let i = 0; i < 5; i++) {
          const c = primeraColumna + Math.floor(Math.random() * columnas);
          const r = Math.floor(Math.random() * FILAS);
          if (c < largoTotal && tableroLargo[r][c]) tableroLargo[r][c] = alAzar(COLORES);
        }
        esperaColor = 0;
      }
      desplazamiento += 0.8;
      if (desplazamiento >= (largoTotal - columnas - 2) * TAMANO_BLOQUE) desplazamiento = 0;
      pintarTablero(tableroLargo, primeraColumna, desplazamiento);
    }
    requestAnimationFrame(cuadro);
  }

  preparar();
  window.addEventListener("resize", preparar);
  requestAnimationFrame((tiempo) => {
    ultimoTiempo = tiempo;
    cuadro(tiempo);
  });
})();
