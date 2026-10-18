// Año actual en el pie de página
document.getElementById("anio").textContent = new Date().getFullYear();

// Calculadora de ahorro (estimación aproximada)
const PRECIO_KWH = 900;          // COP por kWh (valor de referencia)
const KWH_POR_PANEL_MES = 70;    // panel de ~550 W con ~4 horas de sol pico
const PORCENTAJE_AHORRO = 0.7;   // fracción del consumo cubierta

const campo = document.getElementById("factura");
const boton = document.getElementById("calcular");
const resultado = document.getElementById("resultado");

function formatoCOP(valor) {
  return valor.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
}

function calcular() {
  const factura = parseFloat(campo.value);

  if (isNaN(factura) || factura <= 0) {
    resultado.textContent = "Escriba un valor mayor que cero para calcular.";
    return;
  }

  const consumoKwh = factura / PRECIO_KWH;
  const paneles = Math.ceil((consumoKwh * PORCENTAJE_AHORRO) / KWH_POR_PANEL_MES);
  const ahorroMensual = factura * PORCENTAJE_AHORRO;

  resultado.innerHTML =
    "Ahorro estimado: <strong>" + formatoCOP(ahorroMensual) + "</strong> al mes " +
    "con unos <strong>" + paneles + "</strong> paneles.";
}

boton.addEventListener("click", calcular);
campo.addEventListener("keydown", function (e) {
  if (e.key === "Enter") calcular();
});
