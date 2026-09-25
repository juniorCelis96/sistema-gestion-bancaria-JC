'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Calculator, 
  DollarSign, 
  Calendar, 
  Percent, 
  HelpCircle, 
  Save, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Share2,
  RefreshCw,
  Table
} from 'lucide-react';
import { calcularCredito, formatCOP, ResultadoCredito } from '@/lib/financial-math';
import { TasasConfig, CreditoTasaConfig } from '@/types';

export default function SimuladorCreditoPage() {
  const [tasasConfig, setTasasConfig] = useState<TasasConfig | null>(null);
  const [tipoCredito, setTipoCredito] = useState<string>('libre_inversion');
  const [monto, setMonto] = useState<number>(15000000);
  const [plazoMeses, setPlazoMeses] = useState<number>(36);
  const [tasaMensual, setTasaMensual] = useState<number>(1.45);
  const [resultado, setResultado] = useState<ResultadoCredito | null>(null);
  const [verAmortizacion, setVerAmortizacion] = useState<boolean>(false);
  const [guardadoExito, setGuardadoExito] = useState<boolean>(false);
  const [clienteNombre, setClienteNombre] = useState<string>('');
  const [clienteEmail, setClienteEmail] = useState<string>('');
  const [mostrarModalGuardar, setMostrarModalGuardar] = useState<boolean>(false);

  // Cargar configuración de tasas
  useEffect(() => {
    fetch('/api/tasas')
      .then((res) => res.json())
      .then((data: TasasConfig) => {
        if (data && data.creditos) {
          setTasasConfig(data);
          const defaultCred = data.creditos.find((c) => c.tipo === 'libre_inversion') || data.creditos[0];
          if (defaultCred) {
            setTasaMensual(defaultCred.tasaNominalMensual);
          }
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // Al cambiar de tipo de crédito, actualizar tasa sugerida
  const handleCambioTipo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nuevoTipo = e.target.value;
    setTipoCredito(nuevoTipo);
    if (tasasConfig) {
      const creditoEncontrado = tasasConfig.creditos.find((c) => c.tipo === nuevoTipo);
      if (creditoEncontrado) {
        setTasaMensual(creditoEncontrado.tasaNominalMensual);
        // Ajustar límites de monto si es necesario
        if (monto < creditoEncontrado.montoMinimo) setMonto(creditoEncontrado.montoMinimo);
        if (monto > creditoEncontrado.montoMaximo) setMonto(creditoEncontrado.montoMaximo);
        if (plazoMeses > creditoEncontrado.plazoMaximoMeses) setPlazoMeses(creditoEncontrado.plazoMaximoMeses);
      }
    }
  };

  // Recalcular crédito cada vez que cambien los parámetros
  useEffect(() => {
    if (monto > 0 && plazoMeses > 0 && tasaMensual >= 0) {
      const res = calcularCredito(monto, plazoMeses, tasaMensual);
      setResultado(res);
    }
  }, [monto, plazoMeses, tasaMensual]);

  const handleGuardarSimulacion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resultado || !clienteNombre) return;

    try {
      const resp = await fetch('/api/simulaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo: 'credito',
          clienteNombre,
          clienteEmail: clienteEmail || 'N/A',
          clienteIdentificacion: 'Sin documento',
          creadoPor: 'Cliente / Simulador Web',
          detalles: {
            tipoCredito,
            monto: resultado.monto,
            plazoMeses: resultado.plazoMeses,
            tasaNominalMensual: resultado.tasaNominalMensual,
            cuotaMensual: resultado.cuotaMensual,
            totalPagar: resultado.totalPagar,
            totalIntereses: resultado.totalIntereses,
          },
        }),
      });

      if (resp.ok) {
        setGuardadoExito(true);
        setTimeout(() => {
          setGuardadoExito(false);
          setMostrarModalGuardar(false);
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const creditoActual = tasasConfig?.creditos.find((c) => c.tipo === tipoCredito);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Encabezado */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3.5 py-1.5 rounded-full">
          Herramienta Financiera Oficial
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Simulador de Crédito
        </h1>
        <p className="text-base text-slate-600">
          Proyecta tus cuotas mensuales mediante el sistema de amortización francés con tasa fija. Sin costos ocultos.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* FORMULARIO DE PARÁMETROS (Puntos requeridos en EV9) */}
        <div className="lg:col-span-5 bg-white p-7 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">Parámetros del Crédito</h2>
            <span className="text-xs text-slate-500 font-medium">Valores editables</span>
          </div>

          <div className="space-y-5">
            {/* 1. Tipo de Crédito */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                Tipo de Crédito
              </label>
              <select
                value={tipoCredito}
                onChange={handleCambioTipo}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              >
                <option value="libre_inversion">Crédito de Libre Inversión</option>
                <option value="vivienda">Crédito Hipotecario / Vivienda</option>
                <option value="libranza">Crédito por Libranza (Nómina)</option>
                <option value="vehiculo">Crédito de Vehículo</option>
              </select>
            </div>

            {/* 2. Valor Solicitado (Monto) */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase text-slate-700">
                  Valor Solicitado
                </label>
                <span className="text-xs font-bold text-blue-700">{formatCOP(monto)}</span>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-semibold">
                  $
                </span>
                <input
                  type="number"
                  min={creditoActual?.montoMinimo || 1000000}
                  max={creditoActual?.montoMaximo || 200000000}
                  step={500000}
                  value={monto}
                  onChange={(e) => setMonto(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                />
              </div>
              <input
                type="range"
                min={creditoActual?.montoMinimo || 1000000}
                max={creditoActual?.montoMaximo || 100000000}
                step={500000}
                value={monto}
                onChange={(e) => setMonto(Number(e.target.value))}
                className="w-full mt-2.5 accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>Mín: {formatCOP(creditoActual?.montoMinimo || 1000000)}</span>
                <span>Máx: {formatCOP(creditoActual?.montoMaximo || 80000000)}</span>
              </div>
            </div>

            {/* 3. Plazo en Meses */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase text-slate-700">
                  Plazo de Amortización
                </label>
                <span className="text-xs font-bold text-blue-700">{plazoMeses} meses ({(plazoMeses / 12).toFixed(1)} años)</span>
              </div>
              <input
                type="number"
                min={creditoActual?.plazoMinimoMeses || 12}
                max={creditoActual?.plazoMaximoMeses || 120}
                value={plazoMeses}
                onChange={(e) => setPlazoMeses(Number(e.target.value))}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
              <input
                type="range"
                min={creditoActual?.plazoMinimoMeses || 12}
                max={creditoActual?.plazoMaximoMeses || 120}
                step={6}
                value={plazoMeses}
                onChange={(e) => setPlazoMeses(Number(e.target.value))}
                className="w-full mt-2.5 accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>{creditoActual?.plazoMinimoMeses || 12} meses</span>
                <span>{creditoActual?.plazoMaximoMeses || 120} meses</span>
              </div>
            </div>

            {/* 4. Tasa de Interés */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase text-slate-700">
                  Tasa de Interés Mensual Vencida (M.V.)
                </label>
                <span className="text-xs font-semibold text-slate-500">
                  Equiv: ~{resultado?.tasaEfectivaAnual}% E.A.
                </span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  min="0.5"
                  max="4.0"
                  value={tasaMensual}
                  onChange={(e) => setTasaMensual(Number(e.target.value))}
                  className="w-full pr-9 pl-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                />
                <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400 font-semibold">
                  %
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5">
                Tasa nominal mensual aplicada al saldo a capital restante en cada periodo.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setMostrarModalGuardar(true)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all shadow-sm"
            >
              <Save className="w-4 h-4 text-emerald-400" />
              <span>Guardar o Enviar Simulación</span>
            </button>
          </div>
        </div>

        {/* RESULTADOS DE LA SIMULACIÓN */}
        <div className="lg:col-span-7 space-y-6">
          
          {resultado && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7 sm:p-8 space-y-6">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-5 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                    Resultado Estimado de tu Crédito
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-0.5">
                    Plan de Pagos Calculado
                  </h3>
                </div>
                <div className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                  Cuota Fija Mensual
                </div>
              </div>

              {/* Tarjeta Destacada de Cuota Mensual */}
              <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-navy-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
                <div className="text-xs font-semibold text-blue-200 uppercase tracking-wider">
                  Valor Aproximado de tu Cuota Mensual
                </div>
                <div className="text-4xl sm:text-5xl font-black tracking-tight text-white mt-2">
                  {formatCOP(resultado.cuotaMensual)}
                </div>
                <p className="text-xs text-blue-200/90 mt-2 font-normal">
                  * Cuota fija calculada para un monto de {formatCOP(resultado.monto)} a un plazo de {resultado.plazoMeses} meses.
                </p>
              </div>

              {/* Métricas clave */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-xs text-slate-500 font-medium">Monto del Préstamo</div>
                  <div className="text-lg font-bold text-slate-900 mt-1">{formatCOP(resultado.monto)}</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-xs text-slate-500 font-medium">Total Intereses</div>
                  <div className="text-lg font-bold text-amber-600 mt-1">{formatCOP(resultado.totalIntereses)}</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-xs text-slate-500 font-medium">Total a Pagar</div>
                  <div className="text-lg font-bold text-blue-900 mt-1">{formatCOP(resultado.totalPagar)}</div>
                </div>
              </div>

              {/* Botón para ver tabla de amortización */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => setVerAmortizacion(!verAmortizacion)}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-blue-600 text-blue-700 hover:bg-blue-50 font-semibold text-sm transition-all"
                >
                  <Table className="w-4 h-4" />
                  <span>{verAmortizacion ? 'Ocultar Tabla de Amortización' : 'Ver Tabla de Amortización Cuota a Cuota'}</span>
                </button>

                <Link
                  href={`/contacto?asunto=Solicitud-Credito-${encodeURIComponent(tipoCredito)}`}
                  className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-sm"
                >
                  <span>Solicitar con Asesor</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* TABLA DE AMORTIZACIÓN DETALLADA */}
              {verAmortizacion && (
                <div className="pt-4 border-t border-slate-100 animate-in fade-in duration-300">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-bold text-slate-900">
                      Tabla de Amortización (Sistema Francés)
                    </h4>
                    <span className="text-xs text-slate-500">
                      Total: {resultado.tablaAmortizacion.length} cuotas
                    </span>
                  </div>

                  <div className="overflow-x-auto max-h-96 rounded-xl border border-slate-200">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-100 text-slate-700 font-bold uppercase sticky top-0">
                        <tr>
                          <th className="py-2.5 px-3">Mes</th>
                          <th className="py-2.5 px-3">Cuota Fija</th>
                          <th className="py-2.5 px-3">Abono Capital</th>
                          <th className="py-2.5 px-3">Interés</th>
                          <th className="py-2.5 px-3">Saldo Restante</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {resultado.tablaAmortizacion.map((fila) => (
                          <tr key={fila.mes} className="hover:bg-slate-50 transition-colors">
                            <td className="py-2 px-3 font-semibold text-slate-900">{fila.mes}</td>
                            <td className="py-2 px-3 font-medium text-slate-800">{formatCOP(fila.cuota)}</td>
                            <td className="py-2 px-3 text-emerald-600 font-medium">{formatCOP(fila.abonoCapital)}</td>
                            <td className="py-2 px-3 text-amber-600">{formatCOP(fila.interes)}</td>
                            <td className="py-2 px-3 font-medium text-slate-700">{formatCOP(fila.saldoRestante)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>

      {/* MODAL PARA GUARDAR SIMULACIÓN */}
      {mostrarModalGuardar && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Guardar Simulación</h3>
                <p className="text-xs text-slate-500">Registra esta cotización para contactar al asesor</p>
              </div>
              <button
                onClick={() => setMostrarModalGuardar(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {guardadoExito ? (
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="text-sm font-bold">¡Simulación guardada exitosamente!</p>
                <p className="text-xs">Un asesor financiero podrá consultar tu cotización con tu nombre.</p>
              </div>
            ) : (
              <form onSubmit={handleGuardarSimulacion} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={clienteNombre}
                    onChange={(e) => setClienteNombre(e.target.value)}
                    placeholder="Ej. Juan Pérez"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    value={clienteEmail}
                    onChange={(e) => setClienteEmail(e.target.value)}
                    placeholder="juan.perez@correo.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="bg-slate-50 p-3 rounded-xl text-xs space-y-1 text-slate-600">
                  <div className="flex justify-between">
                    <span>Monto solicitado:</span>
                    <strong className="text-slate-900">{formatCOP(resultado?.monto || 0)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Cuota mensual estimada:</span>
                    <strong className="text-emerald-700">{formatCOP(resultado?.cuotaMensual || 0)}</strong>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setMostrarModalGuardar(false)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold shadow-sm"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
