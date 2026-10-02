'use client';

import React, { useMemo, useState } from 'react';
import { Target, PiggyBank, CalendarDays, TrendingUp } from 'lucide-react';
import { formatCOP } from '@/lib/financial-math';

const METAS_SUGERIDAS = [
  { label: 'Computador', valor: 3000000 },
  { label: 'Fondo de emergencia', valor: 6000000 },
  { label: 'Estudios', valor: 8000000 },
  { label: 'Viaje', valor: 4500000 },
];

function calcularAhorro(meta: number, meses: number, ahorroInicial: number, tasaEA: number) {
  const i = Math.pow(1 + tasaEA / 100, 1 / 12) - 1;
  const factor = Math.pow(1 + i, meses);
  const inicialCapitalizado = ahorroInicial * factor;
  const faltante = Math.max(0, meta - inicialCapitalizado);
  const cuota = i === 0 ? faltante / meses : (faltante * i) / (factor - 1);

  const hitos: { mes: number; saldo: number }[] = [];
  let saldo = ahorroInicial;
  for (let mes = 1; mes <= meses; mes++) {
    saldo = saldo * (1 + i) + cuota;
    if (mes === meses || mes % Math.max(1, Math.ceil(meses / 6)) === 0) hitos.push({ mes, saldo });
  }

  const totalAportado = ahorroInicial + cuota * meses;
  return { cuota, totalAportado, intereses: Math.max(0, saldo - totalAportado), saldoFinal: saldo, hitos };
}

export default function SimuladorAhorro() {
  const [meta, setMeta] = useState(3000000);
  const [meses, setMeses] = useState(12);
  const [ahorroInicial, setAhorroInicial] = useState(0);
  const [tasaEA, setTasaEA] = useState(4);

  const resultado = useMemo(
    () => (meta > 0 && meses > 0 ? calcularAhorro(meta, meses, ahorroInicial, Math.max(0, tasaEA)) : null),
    [meta, meses, ahorroInicial, tasaEA]
  );

  const inputClase =
    'w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-800 bg-brand-100 px-3.5 py-1.5 rounded-full">
          Ahorro con propósito
        </span>
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Simulador de Meta de Ahorro</h2>
        <p className="text-base text-slate-600">
          Define tu meta y descubre cuánto debes ahorrar cada mes para alcanzarla en el tiempo que te propongas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 bg-white p-7 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-900">Tu meta</h3>
            <span className="text-xs text-slate-500 font-medium">Valores editables</span>
          </div>

          <div>
            <span className="block text-xs font-bold uppercase text-slate-700 mb-2">Metas sugeridas</span>
            <div className="flex flex-wrap gap-2">
              {METAS_SUGERIDAS.map((m) => (
                <button
                  key={m.label}
                  type="button"
                  onClick={() => setMeta(m.valor)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    meta === m.valor
                      ? 'bg-brand-500 text-white border-brand-500'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-brand-50'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="ahorro-meta" className="text-xs font-bold uppercase text-slate-700">
                Valor de la meta
              </label>
              <span className="text-xs font-bold text-brand-700">{formatCOP(meta)}</span>
            </div>
            <input
              id="ahorro-meta"
              type="number"
              min={100000}
              step={100000}
              value={meta || ''}
              onChange={(e) => setMeta(Math.max(0, Number(e.target.value)))}
              className={inputClase}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="ahorro-meses" className="text-xs font-bold uppercase text-slate-700">
                Plazo para lograrla
              </label>
              <span className="text-xs font-bold text-brand-700">{meses} meses</span>
            </div>
            <input
              id="ahorro-meses"
              type="range"
              min={1}
              max={60}
              value={meses}
              onChange={(e) => setMeses(Number(e.target.value))}
              className="w-full accent-brand-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>1 mes</span>
              <span>60 meses</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="ahorro-inicial" className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                Ahorro inicial
              </label>
              <input
                id="ahorro-inicial"
                type="number"
                min={0}
                step={50000}
                value={ahorroInicial || ''}
                placeholder="0"
                onChange={(e) => setAhorroInicial(Math.max(0, Number(e.target.value)))}
                className={inputClase}
              />
            </div>
            <div>
              <label htmlFor="ahorro-tasa" className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                Tasa (% E.A.)
              </label>
              <input
                id="ahorro-tasa"
                type="number"
                min={0}
                max={20}
                step={0.1}
                value={tasaEA}
                onChange={(e) => setTasaEA(Number(e.target.value))}
                className={inputClase}
              />
            </div>
          </div>
          <p className="text-[11px] text-slate-500">
            Tasa de referencia hipotética para una cuenta de ahorros o un ahorro programado. Usa 0% si guardas el dinero sin rendimiento.
          </p>
        </div>

        <div className="lg:col-span-7 space-y-6">
          {resultado && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7 sm:p-8 space-y-6">
              <div className="bg-gradient-to-br from-brand-500 via-brand-700 to-navy-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
                <div className="text-xs font-semibold text-brand-100 uppercase tracking-wider">Debes ahorrar cada mes</div>
                <div className="text-4xl sm:text-5xl font-black tracking-tight mt-2">{formatCOP(resultado.cuota)}</div>
                <p className="text-xs text-brand-100/90 mt-2">
                  Para reunir {formatCOP(meta)} en {meses} meses.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icono: PiggyBank, label: 'Total aportado', valor: resultado.totalAportado, clase: 'text-slate-900' },
                  { icono: TrendingUp, label: 'Intereses ganados', valor: resultado.intereses, clase: 'text-brand-600' },
                  { icono: Target, label: 'Saldo al final', valor: resultado.saldoFinal, clase: 'text-navy-900' },
                ].map(({ icono: Icono, label, valor, clase }) => (
                  <div key={label} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <Icono className="w-3.5 h-3.5 text-brand-500" />
                      {label}
                    </div>
                    <div className={`text-lg font-bold mt-1 ${clase}`}>{formatCOP(valor)}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <CalendarDays className="w-4 h-4 text-brand-500" />
                  Así crece tu ahorro
                </h4>
                <div className="space-y-2.5">
                  {resultado.hitos.map((h) => (
                    <div key={h.mes} className="flex items-center gap-3 text-xs">
                      <span className="w-16 shrink-0 font-semibold text-slate-600">Mes {h.mes}</span>
                      <div className="flex-1 h-3 rounded-full bg-brand-50 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-brand-300 to-brand-600"
                          style={{ width: `${Math.min(100, (h.saldo / meta) * 100)}%` }}
                        />
                      </div>
                      <span className="w-28 shrink-0 text-right font-bold text-navy-900">{formatCOP(h.saldo)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-500 bg-slate-50 rounded-xl p-3">
                Consejo: ahorra primero. Separa esta cuota apenas recibas tus ingresos y después organiza tus demás gastos.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
