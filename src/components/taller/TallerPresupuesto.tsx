'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  Coins,
  ShoppingCart,
  PiggyBank,
  Wallet,
  Home,
  Target,
  Plus,
  Trash2,
  Download,
  Printer,
  RotateCcw,
  Eraser,
  Lightbulb,
  ArrowDown,
  CheckCircle2,
  AlertTriangle,
  Scale,
} from 'lucide-react';
import { formatCOP } from '@/lib/financial-math';

type TipoGasto = 'fijo' | 'variable' | 'deuda';
type Decision = 'necesario' | 'reducir' | 'eliminar';

interface Ingreso {
  id: string;
  concepto: string;
  valor: number;
}

interface Gasto {
  id: string;
  concepto: string;
  valor: number;
  tipo: TipoGasto;
  decision: Decision;
  valorAjustado: number;
}

interface EstadoTaller {
  ingresos: Ingreso[];
  gastos: Gasto[];
  metaAhorro: number;
  reflexiones: string[];
}

const STORAGE_KEY = 'sena_taller_presupuesto';

const nuevoId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const ESTADO_EJEMPLO: EstadoTaller = {
  ingresos: [
    { id: 'i1', concepto: 'Salario', valor: 2500000 },
    { id: 'i2', concepto: 'Trabajos independientes', valor: 400000 },
  ],
  gastos: [
    { id: 'g1', concepto: 'Arriendo', valor: 900000, tipo: 'fijo', decision: 'necesario', valorAjustado: 900000 },
    { id: 'g2', concepto: 'Servicios públicos', valor: 220000, tipo: 'fijo', decision: 'necesario', valorAjustado: 220000 },
    { id: 'g3', concepto: 'Mercado', valor: 600000, tipo: 'variable', decision: 'necesario', valorAjustado: 600000 },
    { id: 'g4', concepto: 'Transporte', valor: 180000, tipo: 'variable', decision: 'necesario', valorAjustado: 180000 },
    { id: 'g5', concepto: 'Cuota de crédito', valor: 250000, tipo: 'deuda', decision: 'necesario', valorAjustado: 250000 },
    { id: 'g6', concepto: 'Domicilios y comidas fuera', valor: 200000, tipo: 'variable', decision: 'reducir', valorAjustado: 80000 },
    { id: 'g7', concepto: 'Suscripciones de streaming', valor: 90000, tipo: 'fijo', decision: 'eliminar', valorAjustado: 0 },
    { id: 'g8', concepto: 'Salidas y entretenimiento', valor: 150000, tipo: 'variable', decision: 'reducir', valorAjustado: 80000 },
  ],
  metaAhorro: 400000,
  reflexiones: ['', '', '', ''],
};

const ESTADO_VACIO: EstadoTaller = {
  ingresos: [{ id: 'i-vacio', concepto: '', valor: 0 }],
  gastos: [{ id: 'g-vacio', concepto: '', valor: 0, tipo: 'fijo', decision: 'necesario', valorAjustado: 0 }],
  metaAhorro: 0,
  reflexiones: ['', '', '', ''],
};

const PREGUNTAS_REFLEXION = [
  '¿En qué gasto podrías ahorrar?',
  '¿Qué gasto consideras indispensable?',
  '¿Cuánto puedes destinar al ahorro cada mes?',
  '¿Tu presupuesto queda positivo, equilibrado o negativo?',
];

const TIPOS_GASTO: { value: TipoGasto; label: string }[] = [
  { value: 'fijo', label: 'Fijo' },
  { value: 'variable', label: 'Variable' },
  { value: 'deuda', label: 'Deuda' },
];

const DECISIONES: { value: Decision; label: string; descripcion: string; punto: string; activo: string }[] = [
  {
    value: 'necesario',
    label: 'Necesario',
    descripcion: 'Es importante y debes mantenerlo.',
    punto: 'bg-brand-500',
    activo: 'bg-brand-500 text-white border-brand-500',
  },
  {
    value: 'reducir',
    label: 'Puede reducirse',
    descripcion: 'Puedes disminuirlo sin afectar lo esencial.',
    punto: 'bg-amber-400',
    activo: 'bg-amber-400 text-navy-900 border-amber-400',
  },
  {
    value: 'eliminar',
    label: 'Puede eliminarse',
    descripcion: 'No es indispensable.',
    punto: 'bg-rose-500',
    activo: 'bg-rose-500 text-white border-rose-500',
  },
];

function valorDespues(gasto: Gasto): number {
  if (gasto.decision === 'necesario') return gasto.valor;
  if (gasto.decision === 'eliminar') return 0;
  return Math.min(Math.max(gasto.valorAjustado, 0), gasto.valor);
}

function MoneyInput({
  value,
  onChange,
  ariaLabel,
  id,
  className = '',
}: {
  value: number;
  onChange: (valor: number) => void;
  ariaLabel: string;
  id?: string;
  className?: string;
}) {
  return (
    <div className={`relative min-w-0 ${className}`}>
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-sm font-semibold">
        $
      </span>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={0}
        step={1000}
        value={value || ''}
        placeholder="0"
        aria-label={ariaLabel}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
        className="w-full pl-7 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
      />
    </div>
  );
}

function SeccionHeader({ numero, titulo, lema }: { numero: number; titulo: string; lema: string }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-brand-800 via-brand-700 to-brand-500 text-white rounded-2xl pl-2 pr-4 sm:pr-6 py-2 shadow-md shadow-brand-900/10">
      <span className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center text-xl sm:text-2xl font-black shadow-inner">
        {numero}
      </span>
      <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5">
        <h2 className="text-lg sm:text-xl font-bold">{titulo}</h2>
        <p className="text-xs sm:text-sm text-brand-100 italic">{lema}</p>
      </div>
    </div>
  );
}

export default function TallerPresupuesto() {
  const [estado, setEstado] = useState<EstadoTaller>(ESTADO_EJEMPLO);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    try {
      const guardado = localStorage.getItem(STORAGE_KEY);
      if (guardado) {
        const datos = JSON.parse(guardado) as Partial<EstadoTaller>;
        if (Array.isArray(datos.ingresos) && Array.isArray(datos.gastos)) {
          setEstado({
            ingresos: datos.ingresos,
            gastos: datos.gastos,
            metaAhorro: Number(datos.metaAhorro) || 0,
            reflexiones: Array.isArray(datos.reflexiones) ? datos.reflexiones : ['', '', '', ''],
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
    setCargado(true);
  }, []);

  useEffect(() => {
    if (cargado) localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
  }, [estado, cargado]);

  const { ingresos, gastos, metaAhorro, reflexiones } = estado;

  const calculos = useMemo(() => {
    const totalIngresos = ingresos.reduce((acc, i) => acc + i.valor, 0);
    const totalGastos = gastos.reduce((acc, g) => acc + g.valor, 0);
    const saldoDisponible = totalIngresos - totalGastos;
    const ahorroAdicional = Math.max(0, metaAhorro - saldoDisponible);

    const ajustes = gastos
      .filter((g) => g.decision !== 'necesario' && g.valor > 0)
      .map((g) => ({ ...g, despues: valorDespues(g), ahorro: g.valor - valorDespues(g) }));
    const totalLiberado = ajustes.reduce((acc, a) => acc + a.ahorro, 0);
    const ahorroMensualPosible = saldoDisponible + totalLiberado;

    const sumaPorTipo = (tipo: TipoGasto) =>
      gastos.filter((g) => g.tipo === tipo).reduce((acc, g) => acc + valorDespues(g), 0);
    const gastosFijos = sumaPorTipo('fijo');
    const gastosVariables = sumaPorTipo('variable');
    const pagoDeudas = sumaPorTipo('deuda');
    const saldoFinal = totalIngresos - gastosFijos - gastosVariables - pagoDeudas - metaAhorro;

    return {
      totalIngresos,
      totalGastos,
      saldoDisponible,
      ahorroAdicional,
      ajustes,
      totalLiberado,
      ahorroMensualPosible,
      gastosFijos,
      gastosVariables,
      pagoDeudas,
      saldoFinal,
    };
  }, [ingresos, gastos, metaAhorro]);

  const actualizarIngreso = (id: string, cambios: Partial<Ingreso>) =>
    setEstado((prev) => ({
      ...prev,
      ingresos: prev.ingresos.map((i) => (i.id === id ? { ...i, ...cambios } : i)),
    }));

  const actualizarGasto = (id: string, cambios: Partial<Gasto>) =>
    setEstado((prev) => ({
      ...prev,
      gastos: prev.gastos.map((g) => (g.id === id ? { ...g, ...cambios } : g)),
    }));

  const agregarIngreso = () =>
    setEstado((prev) => ({ ...prev, ingresos: [...prev.ingresos, { id: nuevoId(), concepto: '', valor: 0 }] }));

  const agregarGasto = () =>
    setEstado((prev) => ({
      ...prev,
      gastos: [
        ...prev.gastos,
        { id: nuevoId(), concepto: '', valor: 0, tipo: 'variable', decision: 'necesario', valorAjustado: 0 },
      ],
    }));

  const eliminarIngreso = (id: string) =>
    setEstado((prev) => ({ ...prev, ingresos: prev.ingresos.filter((i) => i.id !== id) }));

  const eliminarGasto = (id: string) =>
    setEstado((prev) => ({ ...prev, gastos: prev.gastos.filter((g) => g.id !== id) }));

  const cambiarDecision = (gasto: Gasto, decision: Decision) =>
    actualizarGasto(gasto.id, {
      decision,
      valorAjustado: decision === 'reducir' ? Math.round(gasto.valor / 2) : valorDespues({ ...gasto, decision }),
    });

  const estadoPresupuesto =
    calculos.saldoFinal > 0 ? 'positivo' : calculos.saldoFinal === 0 ? 'equilibrado' : 'negativo';

  return (
    <div className="pb-16">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-brand-800 to-brand-600 text-white px-4 sm:px-6 lg:px-8 pt-12 pb-16 print:hidden">
        <div className="absolute -top-32 -right-24 w-80 h-80 bg-brand-300/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-24 w-80 h-80 bg-brand-500/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-brand-300/40 text-brand-100 text-xs font-semibold tracking-wide">
              <Lightbulb className="w-3.5 h-3.5 text-brand-300" />
              Aprender a tomar mejores decisiones financieras
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Taller práctico de{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-brand-200 to-brand-100">
                presupuesto
              </span>
            </h1>
            <p className="text-base sm:text-lg text-brand-50/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Organiza tus ingresos, prioriza tus gastos y construye tus metas financieras. Completa cada paso y los
              cálculos se harán automáticamente.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
              <a
                href="#caso-practico"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-300 hover:bg-brand-200 text-navy-900 font-bold shadow-lg shadow-brand-300/30 transition-all"
              >
                <ArrowDown className="w-4 h-4" />
                Comenzar el taller
              </a>
              <a
                href="/img/taller_practico_presupuesto.png"
                download="taller_practico_presupuesto.png"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold transition-all"
              >
                <Download className="w-4 h-4" />
                Descargar ficha
              </a>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-brand-100 hover:text-white font-medium transition-colors"
              >
                <Printer className="w-4 h-4" />
                Imprimir / PDF
              </button>
            </div>
            <p className="text-xs text-brand-100/80 italic">Pequeños hábitos, grandes resultados.</p>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <a
              href="/img/taller_practico_presupuesto.png"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full max-w-[260px] sm:max-w-xs bg-white p-2 rounded-2xl shadow-2xl shadow-navy-950/40 rotate-2 hover:rotate-0 transition-transform"
              title="Ver ficha completa"
            >
              <Image
                src="/img/taller_practico_presupuesto.png"
                alt="Ficha del Taller práctico de presupuesto"
                width={1191}
                height={1683}
                sizes="(max-width: 640px) 260px, 320px"
                className="w-full h-auto rounded-xl"
                priority
              />
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 space-y-12">
        {/* Barra de acciones */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
          <p className="text-xs text-slate-600 text-center sm:text-left">
            Tus datos se guardan solo en este navegador. No se envían a ningún servidor.
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setEstado(ESTADO_EJEMPLO)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-brand-700 bg-brand-100 hover:bg-brand-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Cargar ejemplo
            </button>
            <button
              type="button"
              onClick={() => setEstado(ESTADO_VACIO)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 border border-slate-300 hover:bg-slate-50 transition-colors"
            >
              <Eraser className="w-3.5 h-3.5" />
              Empezar en blanco
            </button>
          </div>
        </div>

        {/* 1. OBJETIVO */}
        <section className="space-y-5">
          <SeccionHeader numero={1} titulo="Objetivo del taller" lema="Conocimiento hoy, bienestar mañana." />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 flex items-center">
              <p className="text-lg sm:text-xl text-navy-900 font-medium leading-relaxed">
                Organiza tus <strong className="text-brand-600">ingresos</strong>,{' '}
                <strong className="text-brand-600">gastos</strong> y <strong className="text-brand-600">ahorro</strong>{' '}
                para tener un mejor control de tus finanzas.
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icono: Coins, titulo: 'Ingresos', texto: 'El dinero que recibes.', clase: 'bg-brand-100 text-brand-700' },
                { icono: ShoppingCart, titulo: 'Gastos', texto: 'Lo que pagas.', clase: 'bg-brand-500 text-white' },
                { icono: PiggyBank, titulo: 'Ahorro', texto: 'Tu futuro en construcción.', clase: 'bg-brand-700 text-brand-100' },
              ].map(({ icono: Icono, titulo, texto, clase }) => (
                <div
                  key={titulo}
                  className="bg-white rounded-2xl border border-slate-200 p-5 text-center flex sm:flex-col items-center gap-4 sm:gap-3 hover:border-brand-300 hover:shadow-md transition-all"
                >
                  <span className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center ${clase}`}>
                    <Icono className="w-7 h-7" />
                  </span>
                  <div className="text-left sm:text-center">
                    <h3 className="font-bold text-navy-900">{titulo}</h3>
                    <p className="text-xs text-slate-600">{texto}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. CASO PRÁCTICO */}
        <section id="caso-practico" className="space-y-5 scroll-mt-28">
          <SeccionHeader numero={2} titulo="Tu caso práctico" lema="Tu situación financiera, tus decisiones." />
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
            {/* Ingresos */}
            <div className="xl:col-span-5 bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="bg-brand-700 text-white px-5 py-3 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-brand-200" />
                <h3 className="font-bold">Ingresos mensuales</h3>
              </div>
              <div className="p-4 sm:p-5 space-y-3">
                <p className="text-xs text-slate-500">Registra todas tus fuentes de ingreso.</p>
                <div className="hidden sm:grid grid-cols-12 gap-2 text-[11px] font-bold uppercase text-slate-500 px-1">
                  <span className="col-span-7">Concepto</span>
                  <span className="col-span-4">Valor</span>
                </div>
                {ingresos.map((ingreso, idx) => (
                  <div key={ingreso.id} className="grid grid-cols-12 gap-2 items-center">
                    <input
                      type="text"
                      value={ingreso.concepto}
                      placeholder={`Ingreso ${idx + 1}`}
                      aria-label={`Concepto del ingreso ${idx + 1}`}
                      onChange={(e) => actualizarIngreso(ingreso.id, { concepto: e.target.value })}
                      className="col-span-12 sm:col-span-7 min-w-0 px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                    <MoneyInput
                      className="col-span-10 sm:col-span-4"
                      value={ingreso.valor}
                      ariaLabel={`Valor del ingreso ${idx + 1}`}
                      onChange={(valor) => actualizarIngreso(ingreso.id, { valor })}
                    />
                    <button
                      type="button"
                      onClick={() => eliminarIngreso(ingreso.id)}
                      aria-label={`Eliminar ingreso ${idx + 1}`}
                      className="col-span-2 sm:col-span-1 flex justify-center p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors print:hidden"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={agregarIngreso}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-lg border-2 border-dashed border-brand-300 text-brand-700 text-sm font-semibold hover:bg-brand-50 transition-colors print:hidden"
                >
                  <Plus className="w-4 h-4" />
                  Agregar ingreso
                </button>
                <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                  <span className="text-sm font-bold text-navy-900">Total de ingresos</span>
                  <span className="text-lg font-black text-brand-700">{formatCOP(calculos.totalIngresos)}</span>
                </div>
              </div>
            </div>

            {/* Gastos */}
            <div className="xl:col-span-7 bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="bg-brand-500 text-white px-5 py-3 flex items-center gap-2">
                <Home className="w-5 h-5 text-brand-100" />
                <h3 className="font-bold">Gastos mensuales</h3>
              </div>
              <div className="p-4 sm:p-5 space-y-3">
                <p className="text-xs text-slate-500">
                  Anota cada gasto del mes e indica su tipo para tener una visión clara de tus finanzas.
                </p>
                <div className="hidden sm:grid grid-cols-12 gap-2 text-[11px] font-bold uppercase text-slate-500 px-1">
                  <span className="col-span-5">Concepto</span>
                  <span className="col-span-3">Tipo</span>
                  <span className="col-span-3">Valor</span>
                </div>
                {gastos.map((gasto, idx) => (
                  <div
                    key={gasto.id}
                    className="grid grid-cols-12 gap-2 items-center p-2 sm:p-0 rounded-xl bg-slate-50 sm:bg-transparent"
                  >
                    <input
                      type="text"
                      value={gasto.concepto}
                      placeholder={`Gasto ${idx + 1}`}
                      aria-label={`Concepto del gasto ${idx + 1}`}
                      onChange={(e) => actualizarGasto(gasto.id, { concepto: e.target.value })}
                      className="col-span-12 sm:col-span-5 min-w-0 px-3 py-2 bg-white sm:bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                    <select
                      value={gasto.tipo}
                      aria-label={`Tipo del gasto ${idx + 1}`}
                      onChange={(e) => actualizarGasto(gasto.id, { tipo: e.target.value as TipoGasto })}
                      className="col-span-4 sm:col-span-3 min-w-0 px-2 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      {TIPOS_GASTO.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                    <MoneyInput
                      className="col-span-6 sm:col-span-3"
                      value={gasto.valor}
                      ariaLabel={`Valor del gasto ${idx + 1}`}
                      onChange={(valor) =>
                        actualizarGasto(gasto.id, {
                          valor,
                          valorAjustado: gasto.decision === 'reducir' ? Math.min(gasto.valorAjustado, valor) : valor,
                        })
                      }
                    />
                    <button
                      type="button"
                      onClick={() => eliminarGasto(gasto.id)}
                      aria-label={`Eliminar gasto ${idx + 1}`}
                      className="col-span-2 sm:col-span-1 flex justify-center p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors print:hidden"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={agregarGasto}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-lg border-2 border-dashed border-brand-300 text-brand-700 text-sm font-semibold hover:bg-brand-50 transition-colors print:hidden"
                >
                  <Plus className="w-4 h-4" />
                  Agregar gasto
                </button>
                <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                  <span className="text-sm font-bold text-navy-900">Total de gastos</span>
                  <span className="text-lg font-black text-brand-600">{formatCOP(calculos.totalGastos)}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. TU MISIÓN */}
        <section className="space-y-5">
          <SeccionHeader numero={3} titulo="Tu misión" lema="Analiza, calcula y encuentra soluciones." />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-5">
              <div className="text-center text-sm sm:text-base font-bold text-brand-800 bg-brand-100 rounded-xl py-2.5 px-3">
                Saldo disponible = Total de ingresos − Total de gastos
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 sm:gap-3 text-center">
                <div className="rounded-xl border border-slate-200 p-3">
                  <div className="text-[11px] uppercase font-bold text-slate-500">Ingresos</div>
                  <div className="text-base sm:text-lg font-black text-brand-700 break-all">{formatCOP(calculos.totalIngresos)}</div>
                </div>
                <span className="text-2xl font-black text-slate-400">−</span>
                <div className="rounded-xl border border-slate-200 p-3">
                  <div className="text-[11px] uppercase font-bold text-slate-500">Gastos</div>
                  <div className="text-base sm:text-lg font-black text-brand-600 break-all">{formatCOP(calculos.totalGastos)}</div>
                </div>
                <span className="text-2xl font-black text-slate-400">=</span>
                <div
                  className={`rounded-xl p-3 ${
                    calculos.saldoDisponible >= 0 ? 'bg-brand-700 text-white' : 'bg-rose-600 text-white'
                  }`}
                >
                  <div className="text-[11px] uppercase font-bold opacity-80">Saldo disponible</div>
                  <div className="text-base sm:text-lg font-black break-all">{formatCOP(calculos.saldoDisponible)}</div>
                </div>
              </div>
              <p className="text-sm text-slate-600 bg-slate-50 rounded-xl p-3 text-center">
                {calculos.saldoDisponible >= 0
                  ? `Después de cubrir tus gastos te quedan ${formatCOP(calculos.saldoDisponible)} al mes.`
                  : `Tus gastos superan tus ingresos en ${formatCOP(Math.abs(calculos.saldoDisponible))}. Revisa el paso 4 para encontrar ajustes.`}
              </p>
            </div>

            <div className="lg:col-span-5 bg-amber-50 rounded-2xl border border-amber-200 p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0">
                  <Target className="w-6 h-6" />
                </span>
                <label htmlFor="meta-ahorro" className="font-bold text-navy-900">
                  Meta de ahorro mensual
                </label>
              </div>
              <MoneyInput
                id="meta-ahorro"
                value={metaAhorro}
                ariaLabel="Meta de ahorro mensual"
                onChange={(valor) => setEstado((prev) => ({ ...prev, metaAhorro: valor }))}
              />
              <div className="pt-3 border-t border-amber-200">
                <div className="text-sm font-semibold text-navy-900">¿Cuánto dinero adicional necesitas ahorrar?</div>
                <div className="text-2xl font-black text-amber-700 mt-1">{formatCOP(calculos.ahorroAdicional)}</div>
                <p className="text-xs text-slate-600 mt-1">
                  {calculos.ahorroAdicional === 0
                    ? '¡Tu saldo disponible ya cubre tu meta de ahorro!'
                    : 'Es la diferencia entre tu meta y tu saldo disponible actual.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. RETO FINANCIERO */}
        <section className="space-y-5">
          <SeccionHeader numero={4} titulo="Reto financiero" lema="Pequeños cambios hacen una gran diferencia." />
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
            {/* Clasificación */}
            <div className="xl:col-span-5 bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-4">
              <p className="text-sm text-slate-700 font-medium">
                Clasifica cada gasto y decide cuáles puedes reducir o eliminar.
              </p>
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
                {DECISIONES.map((d) => (
                  <li key={d.value} className="flex items-center gap-2 text-xs text-slate-600" title={d.descripcion}>
                    <span className={`w-3 h-3 rounded-full ${d.punto}`} />
                    <span className="font-semibold text-navy-900">{d.label}</span>
                  </li>
                ))}
              </ul>
              <div className="space-y-2 xl:max-h-[560px] xl:overflow-y-auto xl:pr-1">
                {gastos.filter((g) => g.valor > 0).length === 0 && (
                  <p className="text-xs text-slate-500 bg-slate-50 rounded-lg p-3">
                    Registra tus gastos en el paso 2 para poder clasificarlos.
                  </p>
                )}
                {gastos
                  .filter((g) => g.valor > 0)
                  .map((gasto) => (
                    <div key={gasto.id} className="rounded-xl border border-slate-200 p-3 space-y-2">
                      <div className="flex justify-between gap-2 text-sm">
                        <span className="font-semibold text-navy-900 truncate">{gasto.concepto || 'Gasto sin nombre'}</span>
                        <span className="font-bold text-slate-700 shrink-0">{formatCOP(gasto.valor)}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5" role="radiogroup" aria-label={`Decisión para ${gasto.concepto || 'gasto'}`}>
                        {DECISIONES.map((d) => (
                          <button
                            key={d.value}
                            type="button"
                            role="radio"
                            aria-checked={gasto.decision === d.value}
                            onClick={() => cambiarDecision(gasto, d.value)}
                            className={`px-1.5 py-1.5 rounded-lg border text-[11px] sm:text-xs font-semibold transition-all ${
                              gasto.decision === d.value
                                ? d.activo
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            {d.value === 'necesario' ? 'Mantener' : d.value === 'reducir' ? 'Reducir' : 'Eliminar'}
                          </button>
                        ))}
                      </div>
                      {gasto.decision === 'reducir' && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-600 shrink-0">Nuevo valor:</span>
                          <MoneyInput
                            className="flex-1"
                            value={gasto.valorAjustado}
                            ariaLabel={`Nuevo valor para ${gasto.concepto || 'gasto'}`}
                            onChange={(valor) => actualizarGasto(gasto.id, { valorAjustado: Math.min(valor, gasto.valor) })}
                          />
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            <div className="xl:col-span-7 space-y-5">
              {/* Posible ajuste */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="bg-brand-700 text-white px-5 py-3">
                  <h3 className="font-bold">Posible ajuste</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[420px] text-xs sm:text-sm">
                    <thead className="bg-brand-50 text-brand-800 text-[11px] uppercase">
                      <tr>
                        <th className="text-left py-2.5 px-3">Decisión</th>
                        <th className="text-right py-2.5 px-3">Antes</th>
                        <th className="text-right py-2.5 px-3">Después</th>
                        <th className="text-right py-2.5 px-3">Ahorro</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {calculos.ajustes.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="py-6 px-3 text-center text-slate-500">
                            Marca gastos para reducir o eliminar y verás aquí el ahorro.
                          </td>
                        </tr>
                      ) : (
                        calculos.ajustes.map((a) => (
                          <tr key={a.id}>
                            <td className="py-2.5 px-3">
                              <div className="font-semibold text-navy-900">{a.concepto || 'Gasto'}</div>
                              <div className={`text-[11px] font-semibold ${a.decision === 'eliminar' ? 'text-rose-600' : 'text-amber-600'}`}>
                                {a.decision === 'eliminar' ? 'Eliminar' : 'Reducir'}
                              </div>
                            </td>
                            <td className="py-2.5 px-3 text-right text-slate-600">{formatCOP(a.valor)}</td>
                            <td className="py-2.5 px-3 text-right text-slate-600">{formatCOP(a.despues)}</td>
                            <td className="py-2.5 px-3 text-right font-bold text-brand-600">{formatCOP(a.ahorro)}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                    <tfoot>
                      <tr className="bg-brand-100">
                        <td colSpan={3} className="py-3 px-3 font-bold text-navy-900">
                          Total liberado
                        </td>
                        <td className="py-3 px-3 text-right font-black text-brand-700">{formatCOP(calculos.totalLiberado)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Resumen */}
              <div className="bg-gradient-to-br from-brand-700 via-brand-800 to-navy-900 text-white rounded-2xl p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-5 shadow-md">
                <div className="space-y-3">
                  <h3 className="font-bold text-brand-100">Resumen del resultado</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between gap-2">
                      <span className="text-brand-100/90">Saldo disponible inicial</span>
                      <span className="font-semibold">{formatCOP(calculos.saldoDisponible)}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-brand-100/90">Reducción de gastos</span>
                      <span className="font-semibold text-brand-200">+ {formatCOP(calculos.totalLiberado)}</span>
                    </div>
                  </div>
                </div>
                <div className="pt-4 sm:pt-0 sm:pl-5 border-t sm:border-t-0 sm:border-l border-white/15">
                  <div className="text-xs uppercase font-bold text-brand-200 tracking-wide">Ahorro mensual posible</div>
                  <div className="text-3xl font-black mt-1 break-all">{formatCOP(calculos.ahorroMensualPosible)}</div>
                  {metaAhorro > 0 && (
                    <p className="text-xs text-brand-100/90 mt-2">
                      {calculos.ahorroMensualPosible >= metaAhorro
                        ? '¡Con estos ajustes alcanzas tu meta de ahorro!'
                        : `Aún te faltan ${formatCOP(metaAhorro - calculos.ahorroMensualPosible)} para tu meta.`}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. HAZ TU PROPIO PRESUPUESTO */}
        <section className="space-y-5">
          <SeccionHeader numero={5} titulo="Haz tu propio presupuesto" lema="Tú también puedes lograrlo." />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
              <p className="text-xs text-slate-500">
                Calculado con los gastos ajustados del paso 4 y tu meta de ahorro del paso 3.
              </p>
              <dl className="divide-y divide-slate-100 text-sm">
                {[
                  { label: 'Total de ingresos', valor: calculos.totalIngresos, clase: 'text-brand-700' },
                  { label: 'Gastos fijos', valor: calculos.gastosFijos, clase: 'text-slate-800' },
                  { label: 'Gastos variables', valor: calculos.gastosVariables, clase: 'text-slate-800' },
                  { label: 'Pago de deudas', valor: calculos.pagoDeudas, clase: 'text-slate-800' },
                  { label: 'Ahorro', valor: metaAhorro, clase: 'text-brand-600' },
                ].map((fila) => (
                  <div key={fila.label} className="flex justify-between gap-2 py-2.5">
                    <dt className="text-slate-600">{fila.label}</dt>
                    <dd className={`font-bold ${fila.clase}`}>{formatCOP(fila.valor)}</dd>
                  </div>
                ))}
              </dl>
              <div
                className={`rounded-xl p-4 flex items-center gap-3 ${
                  estadoPresupuesto === 'positivo'
                    ? 'bg-brand-100 text-brand-800'
                    : estadoPresupuesto === 'equilibrado'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                }`}
              >
                {estadoPresupuesto === 'positivo' ? (
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                ) : estadoPresupuesto === 'equilibrado' ? (
                  <Scale className="w-6 h-6 shrink-0" />
                ) : (
                  <AlertTriangle className="w-6 h-6 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold uppercase">Saldo disponible</div>
                  <div className="text-xl font-black break-all">{formatCOP(calculos.saldoFinal)}</div>
                </div>
                <span className="text-xs font-bold uppercase px-2 py-1 rounded-full bg-white/70 shrink-0">
                  {estadoPresupuesto}
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 bg-brand-50 rounded-2xl border border-brand-200 p-5 sm:p-6 space-y-4">
              <h3 className="font-bold text-navy-900">Reflexiona</h3>
              {PREGUNTAS_REFLEXION.map((pregunta, idx) => (
                <div key={pregunta} className="space-y-1.5">
                  <label htmlFor={`reflexion-${idx}`} className="flex items-start gap-2.5 text-sm font-medium text-navy-900">
                    <span className="w-6 h-6 shrink-0 rounded-full bg-brand-500 text-white text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    {pregunta}
                  </label>
                  <textarea
                    id={`reflexion-${idx}`}
                    rows={2}
                    value={reflexiones[idx] ?? ''}
                    placeholder="Escribe tu respuesta..."
                    onChange={(e) =>
                      setEstado((prev) => {
                        const nuevas = [...prev.reflexiones];
                        nuevas[idx] = e.target.value;
                        return { ...prev, reflexiones: nuevas };
                      })
                    }
                    className="w-full px-3 py-2 bg-white border border-brand-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cierre */}
        <div className="space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
            <Lightbulb className="w-8 h-8 text-amber-500 shrink-0" />
            <p className="text-base sm:text-lg text-navy-900">
              <strong>Cada peso tiene un propósito.</strong> Planifica antes de gastar.
            </p>
          </div>
          <p className="text-center text-xs sm:text-sm tracking-[0.3em] uppercase text-brand-700 font-semibold">
            Decisiones de hoy, un mejor mañana
          </p>
        </div>
      </div>
    </div>
  );
}
