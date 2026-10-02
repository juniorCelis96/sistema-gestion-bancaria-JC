'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  PiggyBank, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  ShieldCheck, 
  Save, 
  ArrowRight, 
  CheckCircle2, 
  Info,
  Clock,
  Sparkles
} from 'lucide-react';
import { calcularCDT, formatCOP, ResultadoCDT } from '@/lib/financial-math';
import { TasasConfig } from '@/types';

export default function SimuladorCDT() {
  const [tasasConfig, setTasasConfig] = useState<TasasConfig | null>(null);
  const [montoInversion, setMontoInversion] = useState<number>(10000000);
  const [plazoDias, setPlazoDias] = useState<number>(360);
  const [tasaEA, setTasaEA] = useState<number>(11.80);
  const [resultado, setResultado] = useState<ResultadoCDT | null>(null);
  const [mostrarModalGuardar, setMostrarModalGuardar] = useState<boolean>(false);
  const [clienteNombre, setClienteNombre] = useState<string>('');
  const [clienteEmail, setClienteEmail] = useState<string>('');
  const [guardadoExito, setGuardadoExito] = useState<boolean>(false);

  // Cargar configuración de tasas
  useEffect(() => {
    fetch('/api/tasas')
      .then((res) => res.json())
      .then((data: TasasConfig) => {
        if (data && data.cdt) {
          setTasasConfig(data);
          // Determinar tasa inicial basada en plazo 360
          actualizarTasaPorPlazo(360, data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const actualizarTasaPorPlazo = (dias: number, config: TasasConfig) => {
    const rango = config.cdt.rangos.find(
      (r) => dias >= r.diasMin && dias <= r.diasMax
    );
    if (rango) {
      setTasaEA(rango.tasaEA);
    }
  };

  const handleCambioPlazo = (dias: number) => {
    setPlazoDias(dias);
    if (tasasConfig) {
      actualizarTasaPorPlazo(dias, tasasConfig);
    }
  };

  // Recalcular CDT cuando cambien parámetros
  useEffect(() => {
    if (montoInversion > 0 && plazoDias > 0 && tasaEA >= 0) {
      const rete = tasasConfig?.cdt.retencionFuente ?? 4.0;
      const res = calcularCDT(montoInversion, plazoDias, tasaEA, rete);
      setResultado(res);
    }
  }, [montoInversion, plazoDias, tasaEA, tasasConfig]);

  const handleGuardarSimulacion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resultado || !clienteNombre) return;

    // Sitio demo: el registro es simulado, no se guarda en base de datos ni se envía correo.
    setGuardadoExito(true);
    setTimeout(() => {
      setGuardadoExito(false);
      setMostrarModalGuardar(false);
    }, 2500);
  };

  const plazosPredefinidos = [
    { label: '90 Días (3 meses)', dias: 90 },
    { label: '180 Días (6 meses)', dias: 180 },
    { label: '360 Días (1 año)', dias: 360 },
    { label: '540 Días (1.5 años)', dias: 540 },
    { label: '720 Días (2 años)', dias: 720 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Encabezado */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-800 bg-brand-100 px-3.5 py-1.5 rounded-full">
          Inversión de Renta Fija
        </span>
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Simulador de CDT
        </h2>
        <p className="text-base text-slate-600">
          Descubre cuánto crecerá tu capital a término fijo con el respaldo de Fogafín y una tasa asegurada desde el primer día.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* PARÁMETROS DEL CDT */}
        <div className="lg:col-span-5 bg-white p-7 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">Configura tu Inversión</h2>
            <span className="text-xs text-slate-500 font-medium">Parámetros</span>
          </div>

          <div className="space-y-5">
            {/* 1. Valor de la Inversión */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase text-slate-700">
                  Valor a Invertir (Capital)
                </label>
                <span className="text-xs font-bold text-brand-700">{formatCOP(montoInversion)}</span>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-semibold">
                  $
                </span>
                <input
                  type="number"
                  min={500000}
                  max={500000000}
                  step={500000}
                  value={montoInversion}
                  onChange={(e) => setMontoInversion(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent transition-all"
                />
              </div>
              <input
                type="range"
                min={500000}
                max={50000000}
                step={500000}
                value={montoInversion}
                onChange={(e) => setMontoInversion(Number(e.target.value))}
                className="w-full mt-2.5 accent-brand-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>Mín: {formatCOP(500000)}</span>
                <span>Máx sugerido: {formatCOP(50000000)}</span>
              </div>
            </div>

            {/* 2. Tiempo de Inversión (Plazo en Días) */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase text-slate-700">
                  Tiempo de Inversión
                </label>
                <span className="text-xs font-bold text-brand-700">
                  {plazoDias} Días (~{(plazoDias / 30).toFixed(0)} meses)
                </span>
              </div>

              {/* Botones de acceso rápido */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                {plazosPredefinidos.map((p) => (
                  <button
                    key={p.dias}
                    type="button"
                    onClick={() => handleCambioPlazo(p.dias)}
                    className={`py-2 px-2.5 text-xs font-semibold rounded-lg border transition-all text-center ${
                      plazoDias === p.dias
                        ? 'bg-brand-500 text-white border-brand-500 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {p.dias} Días
                  </button>
                ))}
              </div>

              <div className="relative">
                <input
                  type="number"
                  min={30}
                  max={720}
                  value={plazoDias}
                  onChange={(e) => handleCambioPlazo(Number(e.target.value))}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent transition-all"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Plazo mínimo legal: 30 días. Máximo: 720 días.
              </p>
            </div>

            {/* 3. Tasa de Rentabilidad (% E.A.) */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase text-slate-700">
                  Tasa de Rentabilidad (% Efectiva Anual)
                </label>
                <span className="text-xs font-bold text-brand-700">{tasaEA}% E.A.</span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  step="0.05"
                  min="5.0"
                  max="16.0"
                  value={tasaEA}
                  onChange={(e) => setTasaEA(Number(e.target.value))}
                  className="w-full pr-9 pl-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent transition-all"
                />
                <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400 font-semibold">
                  %
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Tasa fija garantizada durante todo el periodo pactado del certificado.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setMostrarModalGuardar(true)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-navy-900 hover:bg-brand-800 text-white font-semibold text-sm transition-all shadow-sm"
            >
              <Save className="w-4 h-4 text-brand-400" />
              <span>Guardar o Enviar Simulación CDT</span>
            </button>
          </div>
        </div>

        {/* RESULTADOS DE LA SIMULACIÓN CDT */}
        <div className="lg:col-span-7 space-y-6">
          
          {resultado && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7 sm:p-8 space-y-6">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-5 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-brand-700 uppercase tracking-wider">
                    Rendimiento Proyectado del CDT
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-0.5">
                    Total al Vencimiento
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-brand-50 text-brand-800 font-bold border border-brand-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
                  <span>Fogafín Asegurado</span>
                </div>
              </div>

              {/* Tarjeta Destacada de Total a Recibir */}
              <div className="bg-gradient-to-br from-brand-500 via-brand-700 to-navy-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
                <div className="text-xs font-semibold text-brand-200 uppercase tracking-wider">
                  Monto Total Estimado a Recibir
                </div>
                <div className="text-4xl sm:text-5xl font-black tracking-tight text-white mt-2">
                  {formatCOP(resultado.totalRecibir)}
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-brand-200/90 mt-3 pt-3 border-t border-brand-700/50">
                  <span>Capital: <strong>{formatCOP(resultado.montoInversion)}</strong></span>
                  <span>+ Rendimiento Neto: <strong>{formatCOP(resultado.rendimientoNeto)}</strong></span>
                </div>
              </div>

              {/* Desglose Numérico de Ganancia */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-xs text-slate-500 font-medium">Rendimiento Bruto</div>
                  <div className="text-lg font-bold text-slate-900 mt-1">
                    {formatCOP(resultado.rendimientoBruto)}
                  </div>
                  <span className="text-[10px] text-slate-400">Intereses totales generados</span>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70">
                  <div className="text-xs text-amber-800 font-medium">Retención en la Fuente</div>
                  <div className="text-lg font-bold text-amber-700 mt-1">
                    - {formatCOP(resultado.retencionFuente)}
                  </div>
                  <span className="text-[10px] text-amber-700">4% legal sobre intereses</span>
                </div>

                <div className="p-4 rounded-2xl bg-brand-50/70 border border-brand-200/70">
                  <div className="text-xs text-brand-800 font-medium">Ganancia Neta Real</div>
                  <div className="text-lg font-bold text-brand-700 mt-1">
                    {formatCOP(resultado.rendimientoNeto)}
                  </div>
                  <span className="text-[10px] text-brand-700">Abono directo a tu cuenta</span>
                </div>
              </div>

              {/* Resumen explicativo */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-brand-600" />
                  <span>Condiciones de tu inversión simulada:</span>
                </div>
                <p>
                  Por una inversión inicial de <strong>{formatCOP(resultado.montoInversion)}</strong> a un plazo fijo de <strong>{resultado.plazoDias} días</strong> con una tasa de <strong>{resultado.tasaEA}% E.A.</strong>, obtendrás una utilidad neta de <strong>{formatCOP(resultado.rendimientoNeto)}</strong> al finalizar el periodo.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/#contacto"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm transition-all shadow-sm"
                >
                  <PiggyBank className="w-4 h-4" />
                  <span>Solicitar Apertura de CDT</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/productos-financieros#productos-ahorro"
                  className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium text-sm transition-all"
                >
                  <span>Ver modalidades de CDT</span>
                </Link>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* MODAL PARA GUARDAR SIMULACIÓN CDT */}
      {mostrarModalGuardar && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Guardar Cotización CDT</h3>
                <p className="text-xs text-slate-500">Registra esta proyección para el asesor comercial</p>
              </div>
              <button
                onClick={() => setMostrarModalGuardar(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {guardadoExito ? (
              <div className="p-4 rounded-xl bg-brand-50 text-brand-800 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-brand-600 mx-auto" />
                <p className="text-sm font-bold">¡Simulación de CDT registrada!</p>
                <p className="text-xs">Un asesor financiero de SENA FINANZAS te contactará con esta propuesta.</p>
                <p className="text-[11px] opacity-80">Sitio de demostración: tus datos no se almacenan ni se envían.</p>
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
                    placeholder="Ej. Carolina Herrera"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
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
                    placeholder="carolina@correo.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>

                <div className="bg-slate-50 p-3 rounded-xl text-xs space-y-1 text-slate-600">
                  <div className="flex justify-between">
                    <span>Monto a invertir:</span>
                    <strong className="text-slate-900">{formatCOP(resultado?.montoInversion || 0)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Total a recibir:</span>
                    <strong className="text-brand-700">{formatCOP(resultado?.totalRecibir || 0)}</strong>
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
                    className="flex-1 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold shadow-sm"
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
