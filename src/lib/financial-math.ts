export interface CuotaAmortizacion {
  mes: number;
  cuota: number;
  abonoCapital: number;
  interes: number;
  saldoRestante: number;
}

export interface ResultadoCredito {
  monto: number;
  plazoMeses: number;
  tasaNominalMensual: number;
  tasaEfectivaAnual: number;
  cuotaMensual: number;
  totalPagar: number;
  totalIntereses: number;
  tablaAmortizacion: CuotaAmortizacion[];
}

export interface ResultadoCDT {
  montoInversion: number;
  plazoDias: number;
  tasaEA: number;
  rendimientoBruto: number;
  retencionFuente: number;
  rendimientoNeto: number;
  totalRecibir: number;
}

/**
 * Calcula la cuota mensual y la tabla de amortización por el sistema francés (cuota fija).
 */
export function calcularCredito(
  monto: number,
  plazoMeses: number,
  tasaNominalMensual: number
): ResultadoCredito {
  const i = tasaNominalMensual / 100;
  const n = plazoMeses;

  let cuotaMensual = 0;
  if (i === 0) {
    cuotaMensual = monto / n;
  } else {
    cuotaMensual = monto * ((i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1));
  }

  // Tasa Efectiva Anual aproximada equivalente: (1 + i)^12 - 1
  const tasaEA = (Math.pow(1 + i, 12) - 1) * 100;

  const tablaAmortizacion: CuotaAmortizacion[] = [];
  let saldo = monto;
  let totalIntereses = 0;

  for (let mes = 1; mes <= n; mes++) {
    const interesMes = saldo * i;
    const abonoCapital = cuotaMensual - interesMes;
    saldo = Math.max(0, saldo - abonoCapital);
    totalIntereses += interesMes;

    tablaAmortizacion.push({
      mes,
      cuota: Math.round(cuotaMensual),
      abonoCapital: Math.round(abonoCapital),
      interes: Math.round(interesMes),
      saldoRestante: Math.round(saldo),
    });
  }

  const totalPagar = monto + totalIntereses;

  return {
    monto,
    plazoMeses,
    tasaNominalMensual,
    tasaEfectivaAnual: Number(tasaEA.toFixed(2)),
    cuotaMensual: Math.round(cuotaMensual),
    totalPagar: Math.round(totalPagar),
    totalIntereses: Math.round(totalIntereses),
    tablaAmortizacion,
  };
}

/**
 * Calcula los rendimientos de un Certificado de Depósito a Término (CDT)
 * Basado en año financiero de 360 días con deducción legal de Retención en la Fuente (4%).
 */
export function calcularCDT(
  montoInversion: number,
  plazoDias: number,
  tasaEA: number,
  porcentajeRetefuente: number = 4.0
): ResultadoCDT {
  const tasaDecimal = tasaEA / 100;
  // Rendimiento financiero compuesto: I = C * ((1 + EA)^(dias/360) - 1)
  const factor = Math.pow(1 + tasaDecimal, plazoDias / 360) - 1;
  const rendimientoBruto = montoInversion * factor;

  const retencionFuente = rendimientoBruto * (porcentajeRetefuente / 100);
  const rendimientoNeto = rendimientoBruto - retencionFuente;
  const totalRecibir = montoInversion + rendimientoNeto;

  return {
    montoInversion,
    plazoDias,
    tasaEA,
    rendimientoBruto: Math.round(rendimientoBruto),
    retencionFuente: Math.round(retencionFuente),
    rendimientoNeto: Math.round(rendimientoNeto),
    totalRecibir: Math.round(totalRecibir),
  };
}

/**
 * Formatea un número como moneda en pesos colombianos (COP).
 */
export function formatCOP(valor: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(valor);
}
