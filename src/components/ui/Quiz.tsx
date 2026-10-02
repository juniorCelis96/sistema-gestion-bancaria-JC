'use client';

import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Trophy, HelpCircle } from 'lucide-react';

export interface QuizQuestion {
  pregunta: string;
  opciones: string[];
  correcta: number;
  explicacion?: React.ReactNode;
}

const LETRAS = ['A', 'B', 'C', 'D', 'E'];

export default function Quiz({
  titulo,
  descripcion,
  preguntas,
}: {
  titulo: string;
  descripcion?: React.ReactNode;
  preguntas: QuizQuestion[];
}) {
  const [respuestas, setRespuestas] = useState<(number | null)[]>(() => preguntas.map(() => null));

  const respondidas = respuestas.filter((r) => r !== null).length;
  const correctas = respuestas.filter((r, i) => r === preguntas[i].correcta).length;
  const terminado = respondidas === preguntas.length;

  const responder = (idxPregunta: number, idxOpcion: number) =>
    setRespuestas((prev) => {
      if (prev[idxPregunta] !== null) return prev;
      const nuevas = [...prev];
      nuevas[idxPregunta] = idxOpcion;
      return nuevas;
    });

  return (
    <div className="bg-white rounded-3xl border border-brand-200 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-brand-700 via-brand-600 to-brand-500 text-white px-5 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
            <HelpCircle className="w-5 h-5" />
          </span>
          <div>
            <h3 className="font-bold text-lg leading-tight">{titulo}</h3>
            <p className="text-xs text-brand-100">Selecciona una respuesta. La calificación es temporal y no se guarda.</p>
          </div>
        </div>
        {preguntas.length > 1 && (
          <div className="flex items-center gap-2 text-sm font-semibold bg-white/15 rounded-full px-3 py-1 self-start sm:self-auto">
            <span>
              {correctas} / {preguntas.length} correctas
            </span>
          </div>
        )}
      </div>

      <div className="p-4 sm:p-6 space-y-5">
        {descripcion && <div className="text-sm text-slate-700 leading-relaxed">{descripcion}</div>}

        {preguntas.map((q, qi) => {
          const elegida = respuestas[qi];
          const respondida = elegida !== null;
          const acerto = elegida === q.correcta;
          return (
            <fieldset key={q.pregunta} className="rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-3">
              <legend className="sr-only">{q.pregunta}</legend>
              <p className="flex items-start gap-3 font-bold text-navy-900">
                {preguntas.length > 1 && (
                  <span className="w-7 h-7 shrink-0 rounded-full bg-brand-100 text-brand-800 text-sm font-black flex items-center justify-center">
                    {qi + 1}
                  </span>
                )}
                <span className="pt-0.5">{q.pregunta}</span>
              </p>
              <div className="grid gap-2">
                {q.opciones.map((opcion, oi) => {
                  const esElegida = elegida === oi;
                  const esCorrecta = q.correcta === oi;
                  let clases = 'bg-white border-slate-200 hover:border-brand-400 hover:bg-brand-50 text-slate-700';
                  if (respondida) {
                    if (esCorrecta) clases = 'bg-emerald-50 border-emerald-400 text-emerald-900';
                    else if (esElegida) clases = 'bg-rose-50 border-rose-400 text-rose-900';
                    else clases = 'bg-white border-slate-200 text-slate-400';
                  }
                  return (
                    <button
                      key={opcion}
                      type="button"
                      disabled={respondida}
                      onClick={() => responder(qi, oi)}
                      aria-pressed={esElegida}
                      className={`w-full text-left flex items-start gap-3 px-3.5 py-3 rounded-xl border-2 text-sm font-medium transition-all disabled:cursor-default ${clases}`}
                    >
                      <span className="w-6 h-6 shrink-0 rounded-md bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center">
                        {LETRAS[oi]}
                      </span>
                      <span className="flex-1 pt-0.5">{opcion}</span>
                      {respondida && esCorrecta && <span aria-label="Correcta">✅</span>}
                      {respondida && esElegida && !esCorrecta && <span aria-label="Incorrecta">✖️</span>}
                    </button>
                  );
                })}
              </div>
              {respondida && (
                <div
                  role="status"
                  className={`rounded-xl p-4 space-y-2 ${acerto ? 'bg-emerald-50 border border-emerald-200' : 'bg-rose-50 border border-rose-200'}`}
                >
                  <p className={`flex items-center gap-2 font-bold text-sm ${acerto ? 'text-emerald-800' : 'text-rose-800'}`}>
                    {acerto ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                    {acerto ? '¡Correcto!' : 'Respuesta incorrecta'}
                  </p>
                  {q.explicacion && <div className="text-sm text-slate-700 leading-relaxed">{q.explicacion}</div>}
                </div>
              )}
            </fieldset>
          );
        })}

        {terminado && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl bg-navy-900 text-white p-4 sm:p-5">
            <p className="flex items-center gap-2 font-semibold">
              <Trophy className="w-5 h-5 text-amber-400" />
              {preguntas.length > 1
                ? `Obtuviste ${correctas} de ${preguntas.length} respuestas correctas.`
                : correctas === 1
                  ? '¡Muy bien! Tomaste la decisión correcta.'
                  : 'Revisa la explicación e inténtalo de nuevo.'}
            </p>
            <button
              type="button"
              onClick={() => setRespuestas(preguntas.map(() => null))}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-300 hover:bg-brand-200 text-navy-900 text-sm font-bold transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reintentar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
