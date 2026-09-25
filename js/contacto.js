// Formulario de contacto
// Datos que se pueden cambiar: el correo que recibe los mensajes y, si se usa
// un servicio de formularios (Formspree, Getform…), su dirección.
const CORREO_CONTACTO = "hola@parlabra.com";
const SERVICIO_FORMULARIO = "";

(function () {
  const formulario = document.getElementById("formularioContacto");
  if (!formulario) return;

  const control = document.getElementById("presupuesto");
  const valor = document.getElementById("presupuestoValor");
  const minimo = document.getElementById("extremoMinimo");
  const maximo = document.getElementById("extremoMaximo");
  const mensaje = document.getElementById("mensajeFormulario");
  const selectorPais = document.getElementById("codigoPais");

  // ---------- Presupuesto en la moneda del visitante ----------
  const MONEDA_POR_PAIS = {
    AR: "ARS", BO: "US$", BR: "R$", CL: "US$", CO: "US$", CR: "US$", EC: "US$", ES: "€",
    GT: "US$", MX: "MXN", PE: "S/", PY: "US$", UY: "US$", VE: "US$", US: "US$", CA: "US$",
    GB: "£", FR: "€", DE: "€", IT: "€", PT: "€"
  };
  const RANGO_POR_MONEDA = {
    "US$": { min: 500, max: 50000, paso: 500, inicial: 15000 },
    "€": { min: 500, max: 50000, paso: 500, inicial: 15000 },
    "£": { min: 500, max: 50000, paso: 500, inicial: 15000 },
    "R$": { min: 2500, max: 250000, paso: 2500, inicial: 75000 },
    "MXN": { min: 10000, max: 1000000, paso: 10000, inicial: 300000 },
    "S/": { min: 2000, max: 200000, paso: 2000, inicial: 60000 },
    "ARS": { min: 500000, max: 50000000, paso: 500000, inicial: 15000000 }
  };
  let moneda = "US$";

  function abreviar(numero) {
    if (numero >= 1000000) return numero / 1000000 + "M";
    if (numero >= 1000) return numero / 1000 + "K";
    return numero;
  }

  function actualizarPresupuesto() {
    const porcentaje = ((control.value - control.min) / (control.max - control.min)) * 100;
    // Nivel del 1 al 5: el CSS usa este dato para cambiar el color del control
    control.dataset.nivel = porcentaje < 20 ? 1 : porcentaje < 40 ? 2 : porcentaje < 65 ? 3 : porcentaje < 85 ? 4 : 5;
    valor.textContent = moneda + abreviar(Number(control.value));
  }

  function aplicarMoneda(nuevaMoneda) {
    moneda = nuevaMoneda;
    const rango = RANGO_POR_MONEDA[moneda] || RANGO_POR_MONEDA["US$"];
    control.min = rango.min;
    control.max = rango.max;
    control.step = rango.paso;
    control.value = rango.inicial;
    minimo.textContent = moneda + abreviar(rango.min);
    maximo.textContent = moneda + abreviar(rango.max) + "+";
    actualizarPresupuesto();
  }

  control.addEventListener("input", actualizarPresupuesto);
  aplicarMoneda("US$");

  // Detecta el país del visitante para elegir moneda y código telefónico
  fetch("https://ipapi.co/json/")
    .then(function (respuesta) { return respuesta.json(); })
    .then(function (datos) {
      const pais = datos.country_code;
      const opcion = Array.from(selectorPais.options).find(function (o) { return o.dataset.pais === pais; });
      if (opcion) selectorPais.value = opcion.value;
      if (MONEDA_POR_PAIS[pais]) aplicarMoneda(MONEDA_POR_PAIS[pais]);
    })
    .catch(function () {});

  // ---------- Envío del formulario ----------
  function avisar(texto, esError) {
    mensaje.textContent = texto;
    mensaje.classList.toggle("formulario__mensaje--error", Boolean(esError));
  }

  formulario.noValidate = true;
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    if (formulario.sitio && formulario.sitio.value) return; // trampa para robots
    if (!formulario.checkValidity()) {
      avisar("Completa tu nombre, tu correo y el área en la que necesitas ayuda.", true);
      formulario.reportValidity();
      return;
    }

    const datos = new FormData(formulario);
    datos.set("presupuesto", valor.textContent);
    datos.set("telefono", (datos.get("codigo") || "") + " " + (datos.get("telefono") || ""));
    datos.delete("codigo");
    datos.delete("sitio");

    // Sin servicio de formularios: abre el correo del visitante con el mensaje armado
    if (!SERVICIO_FORMULARIO) {
      const lineas = [];
      datos.forEach(function (dato, nombre) {
        if (String(dato).trim()) lineas.push(nombre + ": " + dato);
      });
      const asunto = "Nuevo proyecto de " + (datos.get("nombre") || "la web");
      window.location.href = "mailto:" + CORREO_CONTACTO + "?subject=" + encodeURIComponent(asunto) + "&body=" + encodeURIComponent(lineas.join("\n"));
      avisar("Abriendo tu programa de correo… Si no se abre, escríbenos a " + CORREO_CONTACTO + ".");
      return;
    }

    avisar("Enviando…");
    fetch(SERVICIO_FORMULARIO, { method: "POST", body: datos, headers: { Accept: "application/json" } })
      .then(function (respuesta) {
        if (!respuesta.ok) throw new Error();
        formulario.reset();
        aplicarMoneda(moneda);
        avisar("¡Gracias! Te respondemos en un día hábil.");
      })
      .catch(function () {
        avisar("No pudimos enviar el mensaje. Escríbenos a " + CORREO_CONTACTO + ".", true);
      });
  });
})();
