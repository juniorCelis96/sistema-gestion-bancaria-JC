'use client';

import React, { useMemo, useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Send, Loader2, Calculator, Target, Search, ListChecks, Scale, Trophy, PenLine } from 'lucide-react';

const formatCOP = (n: number) => '$' + Math.round(n).toLocaleString('es-CO');

const parseCOP = (valor: string) => {
  const limpio = valor.replace(/[^\d]/g, '');
  return limpio ? Number(limpio) : NaN;
};

function ActividadCard({
  numero,
  titulo,
  icon: Icon,
  children,
}: {
  numero: number;
  titulo: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <article className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <header className="flex items-center gap-3 px-5 sm:px-6 py-4 bg-gradient-to-r from-navy-900 via-brand-800 to-brand-600 text-white">
        <span className="w-10 h-10 rounded-xl bg-brand-300 text-navy-900 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5" />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-brand-200">Actividad {numero}</p>
          <h3 className="font-bold text-lg leading-tight">{titulo}</h3>
        </div>
      </header>
      <div className="p-5 sm:p-6 space-y-5">{children}</div>
    </article>
  );
}

function Resultado({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <div
      role="status"
      className={`rounded-xl p-4 space-y-1.5 border ${ok ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'}`}
    >
      <p className="flex items-center gap-2 font-bold text-sm">
        {ok ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
        {ok ? '✅ ¡Correcto!' : '✖️ Respuesta incorrecta'}
      </p>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

const inputCls =
  'w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 outline-none text-sm font-semibold text-navy-900 transition';

const btnPrimary =
  'inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-bold shadow-sm transition-colors';

const btnSecondary =
  'inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-slate-200 hover:border-brand-300 hover:bg-brand-50 text-slate-700 text-sm font-bold transition-colors';

/* ---------------- Actividad 1 ---------------- */

type Tipo = 'activo' | 'pasivo';

const ELEMENTOS: { nombre: string; tipo: Tipo }[] = [
  { nombre: 'Casa', tipo: 'activo' },
  { nombre: 'Crédito bancario', tipo: 'pasivo' },
  { nombre: 'CDT', tipo: 'activo' },
  { nombre: 'Tarjeta de crédito por pagar', tipo: 'pasivo' },
  { nombre: 'Dinero en cuenta de ahorros', tipo: 'activo' },
];

function Actividad1() {
  const [respuestas, setRespuestas] = useState<(Tipo | null)[]>(ELEMENTOS.map(() => null));
  const [calificado, setCalificado] = useState(false);

  const completas = respuestas.every((r) => r !== null);
  const aciertos = respuestas.filter((r, i) => r === ELEMENTOS[i].tipo).length;

  const elegir = (i: number, tipo: Tipo) => {
    if (calificado) return;
    setRespuestas((prev) => prev.map((r, idx) => (idx === i ? tipo : r)));
  };

  const reiniciar = () => {
    setRespuestas(ELEMENTOS.map(() => null));
    setCalificado(false);
  };

  return (
    <ActividadCard numero={1} titulo="Identifica" icon={Search}>
      <p className="text-sm text-slate-700">Indica si cada elemento es un <strong>activo</strong> o un <strong>pasivo</strong>:</p>
      <div className="rounded-2xl border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-12 bg-navy-900 text-white text-xs font-semibold uppercase tracking-wide">
          <span className="col-span-12 sm:col-span-6 px-4 py-3">Elemento</span>
          <span className="hidden sm:block sm:col-span-6 px-4 py-3">Respuesta</span>
        </div>
        <ul className="divide-y divide-slate-100">
          {ELEMENTOS.map((el, i) => {
            const elegido = respuestas[i];
            const ok = elegido === el.tipo;
            return (
              <li key={el.nombre} className="grid grid-cols-12 items-center gap-3 px-4 py-3 odd:bg-white even:bg-brand-50/50">
                <span className="col-span-12 sm:col-span-6 font-semibold text-navy-900 text-sm flex items-center gap-2">
                  {calificado && <span aria-label={ok ? 'Correcta' : 'Incorrecta'}>{ok ? '✅' : '✖️'}</span>}
                  {el.nombre}
                </span>
                <div className="col-span-12 sm:col-span-6 flex flex-wrap items-center gap-2">
                  {(['activo', 'pasivo'] as Tipo[]).map((tipo) => {
                    const activo = elegido === tipo;
                    let cls = activo
                      ? 'bg-brand-600 border-brand-600 text-white'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-brand-300';
                    if (calificado && activo) cls = ok ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-rose-500 border-rose-500 text-white';
                    return (
                      <button
                        key={tipo}
                        type="button"
                        onClick={() => elegir(i, tipo)}
                        disabled={calificado}
                        aria-pressed={activo}
                        className={`px-4 py-1.5 rounded-full border-2 text-xs font-bold capitalize transition-colors disabled:cursor-default ${cls}`}
                      >
                        {tipo}
                      </button>
                    );
                  })}
                  {calificado && !ok && <span className="text-xs text-rose-700 font-medium">Es un {el.tipo}</span>}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {calificado && (
        <Resultado ok={aciertos === ELEMENTOS.length}>
          Obtuviste <strong>{aciertos} de {ELEMENTOS.length}</strong> respuestas correctas. Recuerda: los <strong>activos</strong> son bienes y recursos que posees; los <strong>pasivos</strong> son deudas u obligaciones.
        </Resultado>
      )}

      <div className="flex flex-wrap gap-3">
        {!calificado ? (
          <button type="button" onClick={() => setCalificado(true)} disabled={!completas} className={btnPrimary}>
            <ListChecks className="w-4 h-4" />
            Calificar
          </button>
        ) : (
          <button type="button" onClick={reiniciar} className={btnSecondary}>
            <RotateCcw className="w-4 h-4" />
            Reintentar
          </button>
        )}
        {!completas && !calificado && <p className="text-xs text-slate-500 self-center">Responde todos los elementos para calificar.</p>}
      </div>
    </ActividadCard>
  );
}

/* ---------------- Actividad 2 ---------------- */

function Actividad2() {
  const [valor, setValor] = useState('');
  const [resultado, setResultado] = useState<boolean | null>(null);
  const CORRECTO = 3_000_000 + 8_000_000 + 4_000_000 - 5_000_000;

  const validar = (e: React.FormEvent) => {
    e.preventDefault();
    setResultado(parseCOP(valor) === CORRECTO);
  };

  return (
    <ActividadCard numero={2} titulo="Calcula tu patrimonio" icon={Scale}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
        <div className="space-y-2">
          <p className="text-sm text-slate-700">Una persona tiene:</p>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {[
              ['Ahorros', '$3.000.000', 'activo'],
              ['Motocicleta', '$8.000.000', 'activo'],
              ['CDT', '$4.000.000', 'activo'],
              ['Deuda bancaria', '$5.000.000', 'pasivo'],
            ].map(([n, v, t]) => (
              <li
                key={n}
                className={`rounded-xl border p-3 ${t === 'activo' ? 'bg-brand-50 border-brand-200' : 'bg-rose-50 border-rose-200'}`}
              >
                <p className="text-xs text-slate-500">{n}</p>
                <p className="font-bold text-navy-900">{v}</p>
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={validar} className="space-y-3">
          <label htmlFor="act2" className="block text-sm font-bold text-navy-900">
            ¿Cuál es su patrimonio?
          </label>
          <input
            id="act2"
            inputMode="numeric"
            placeholder="Ej: 1.000.000"
            value={valor}
            onChange={(e) => {
              setValor(e.target.value);
              setResultado(null);
            }}
            className={inputCls}
          />
          <button type="submit" disabled={!valor.trim()} className={btnPrimary}>
            <CheckCircle2 className="w-4 h-4" />
            Validar
          </button>
        </form>
      </div>
      {resultado !== null && (
        <Resultado ok={resultado}>
          {resultado ? (
            <>
              Activos: $3.000.000 + $8.000.000 + $4.000.000 = $15.000.000. Pasivos: $5.000.000. <br />
              Patrimonio: $15.000.000 – $5.000.000 = <strong>{formatCOP(CORRECTO)}</strong>.
            </>
          ) : (
            <>Recuerda la fórmula: Patrimonio = Activos – Pasivos. Suma los bienes y resta las deudas e inténtalo de nuevo.</>
          )}
        </Resultado>
      )}
    </ActividadCard>
  );
}

/* ---------------- Actividad 3 ---------------- */

function Actividad3() {
  const [datos, setDatos] = useState({ ingresos: '', gastos: '', ahorro: '', inversion: '' });

  const n = useMemo(
    () => ({
      ingresos: parseCOP(datos.ingresos) || 0,
      gastos: parseCOP(datos.gastos) || 0,
      ahorro: parseCOP(datos.ahorro) || 0,
      inversion: parseCOP(datos.inversion) || 0,
    }),
    [datos]
  );

  const disponible = n.ingresos - n.gastos;
  const libre = disponible - n.ahorro - n.inversion;
  const hayDatos = n.ingresos > 0;

  const actualizar = (campo: keyof typeof datos) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseCOP(e.target.value);
    setDatos((prev) => ({ ...prev, [campo]: isNaN(num) ? '' : num.toLocaleString('es-CO') }));
  };

  const campos: { key: keyof typeof datos; label: string }[] = [
    { key: 'ingresos', label: 'Ingresos' },
    { key: 'gastos', label: 'Gastos' },
    { key: 'ahorro', label: 'Ahorro' },
    { key: 'inversion', label: 'Inversión' },
  ];

  return (
    <ActividadCard numero={3} titulo="Organiza tu presupuesto" icon={Calculator}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="space-y-3">
          {campos.map((c) => (
            <div key={c.key} className="grid grid-cols-12 items-center gap-3">
              <label htmlFor={`act3-${c.key}`} className="col-span-4 text-sm font-bold text-navy-900">
                {c.label}
              </label>
              <div className="col-span-8 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">$</span>
                <input
                  id={`act3-${c.key}`}
                  inputMode="numeric"
                  placeholder="0"
                  value={datos[c.key]}
                  onChange={actualizar(c.key)}
                  className={`${inputCls} pl-8`}
                />
              </div>
            </div>
          ))}
          <button type="button" onClick={() => setDatos({ ingresos: '', gastos: '', ahorro: '', inversion: '' })} className={btnSecondary}>
            <RotateCcw className="w-4 h-4" />
            Limpiar
          </button>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl bg-navy-900 text-white p-5 space-y-1">
            <p className="text-xs uppercase tracking-wider text-brand-300 font-bold">Fórmula</p>
            <p className="text-sm">Ingresos – gastos = dinero disponible</p>
            <p className="text-3xl font-extrabold pt-2">{formatCOP(disponible)}</p>
            <p className="text-xs text-slate-300">
              {formatCOP(n.ingresos)} – {formatCOP(n.gastos)}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-brand-50 border border-brand-200 p-3">
              <p className="text-xs text-slate-500">Ahorro + inversión</p>
              <p className="font-bold text-navy-900">{formatCOP(n.ahorro + n.inversion)}</p>
            </div>
            <div className={`rounded-xl border p-3 ${libre < 0 ? 'bg-rose-50 border-rose-200' : 'bg-emerald-50 border-emerald-200'}`}>
              <p className="text-xs text-slate-500">Queda libre</p>
              <p className={`font-bold ${libre < 0 ? 'text-rose-700' : 'text-emerald-700'}`}>{formatCOP(libre)}</p>
            </div>
          </div>
          {hayDatos && disponible < 0 && (
            <Resultado ok={false}>Tus gastos superan tus ingresos. Revisa en qué puedes reducir para no endeudarte.</Resultado>
          )}
          {hayDatos && disponible >= 0 && libre < 0 && (
            <Resultado ok={false}>El ahorro y la inversión superan tu dinero disponible. Ajusta los valores.</Resultado>
          )}
          {hayDatos && disponible >= 0 && libre >= 0 && (
            <Resultado ok>Tu presupuesto está equilibrado: cubres tus gastos y destinas dinero al ahorro y la inversión.</Resultado>
          )}
        </div>
      </div>
    </ActividadCard>
  );
}

/* ---------------- Actividad 4 ---------------- */

const PREGUNTAS_A4 = [
  '¿Debería invertir todo el dinero?',
  '¿Qué factores debería analizar antes de decidir?',
  '¿Qué importancia tiene mantener dinero disponible para emergencias?',
];

function Actividad4() {
  const [respuestas, setRespuestas] = useState(PREGUNTAS_A4.map(() => ''));
  const [estado, setEstado] = useState<'idle' | 'enviando' | 'enviado'>('idle');

  const completas = respuestas.every((r) => r.trim().length >= 5);

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    setEstado('enviando');
    setTimeout(() => setEstado('enviado'), 1200);
  };

  return (
    <ActividadCard numero={4} titulo="Analiza" icon={PenLine}>
      <p className="text-sm text-slate-700 bg-brand-50 border border-brand-200 rounded-xl p-4">
        Una persona tiene <strong>$5.000.000</strong> ahorrados y quiere invertirlos, pero también tiene una deuda de <strong>$4.000.000</strong>.
      </p>
      {estado === 'enviado' ? (
        <div className="space-y-4">
          <Resultado ok>
            Tus respuestas fueron enviadas (simulación). Esta es una demostración: la información no se guarda ni se envía a ningún servidor.
          </Resultado>
          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-sm text-slate-700 space-y-1">
            <p className="font-bold text-amber-900">💡 Para reflexionar</p>
            <p>
              Antes de invertir conviene evaluar el costo de la deuda, mantener un fondo de emergencias y no invertir dinero que podrías necesitar en el corto plazo.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setRespuestas(PREGUNTAS_A4.map(() => ''));
              setEstado('idle');
            }}
            className={btnSecondary}
          >
            <RotateCcw className="w-4 h-4" />
            Responder de nuevo
          </button>
        </div>
      ) : (
        <form onSubmit={enviar} className="space-y-4">
          {PREGUNTAS_A4.map((p, i) => (
            <div key={p} className="space-y-2">
              <label htmlFor={`act4-${i}`} className="flex items-start gap-2 text-sm font-bold text-navy-900">
                <span className="w-6 h-6 shrink-0 rounded-full bg-brand-100 text-brand-800 text-xs font-black flex items-center justify-center">{i + 1}</span>
                {p}
              </label>
              <textarea
                id={`act4-${i}`}
                rows={3}
                value={respuestas[i]}
                onChange={(e) => setRespuestas((prev) => prev.map((r, idx) => (idx === i ? e.target.value : r)))}
                placeholder="Escribe tu respuesta..."
                className={`${inputCls} font-normal resize-y`}
              />
            </div>
          ))}
          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" disabled={!completas || estado === 'enviando'} className={btnPrimary}>
              {estado === 'enviando' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {estado === 'enviando' ? 'Enviando...' : 'Enviar respuestas'}
            </button>
            {!completas && <p className="text-xs text-slate-500">Responde las tres preguntas para enviar.</p>}
          </div>
        </form>
      )}
    </ActividadCard>
  );
}

/* ---------------- Actividad 5 ---------------- */

function Actividad5() {
  const [valor, setValor] = useState('');
  const [resultado, setResultado] = useState<boolean | null>(null);
  const CORRECTO = (2_500_000 - 2_000_000) * 12;

  const validar = (e: React.FormEvent) => {
    e.preventDefault();
    setResultado(parseCOP(valor) === CORRECTO);
  };

  return (
    <ActividadCard numero={5} titulo="Reto financiero" icon={Target}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
        <div className="space-y-3 text-sm text-slate-700">
          <p className="bg-brand-50 border border-brand-200 rounded-xl p-4">
            <strong>Situación:</strong> María gana <strong>$2.500.000</strong> mensuales y gasta <strong>$2.000.000</strong>.
          </p>
          <p className="font-bold text-navy-900">¿Cuánto podría ahorrar en un año si guarda todo el dinero disponible?</p>
        </div>
        <form onSubmit={validar} className="space-y-3">
          <label htmlFor="act5" className="block text-sm font-bold text-navy-900">
            Tu respuesta
          </label>
          <input
            id="act5"
            inputMode="numeric"
            placeholder="Ej: 1.000.000"
            value={valor}
            onChange={(e) => {
              setValor(e.target.value);
              setResultado(null);
            }}
            className={inputCls}
          />
          <button type="submit" disabled={!valor.trim()} className={btnPrimary}>
            <Trophy className="w-4 h-4" />
            Validar
          </button>
        </form>
      </div>
      {resultado !== null && (
        <Resultado ok={resultado}>
          {resultado ? (
            <div className="space-y-1">
              <p className="font-semibold">Cálculo:</p>
              <p>$2.500.000 – $2.000.000 = $500.000 mensuales</p>
              <p>
                $500.000 × 12 = <strong>{formatCOP(CORRECTO)}</strong>
              </p>
            </div>
          ) : (
            <>Calcula primero cuánto le queda cada mes (ingresos – gastos) y luego multiplícalo por los 12 meses del año.</>
          )}
        </Resultado>
      )}
    </ActividadCard>
  );
}

export default function Actividades() {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        <Actividad1 />
        <Actividad2 />
      </div>
      <Actividad3 />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        <Actividad4 />
        <Actividad5 />
      </div>
    </div>
  );
}
