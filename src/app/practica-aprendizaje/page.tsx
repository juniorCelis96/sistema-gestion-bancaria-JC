import type { Metadata } from 'next';
import type React from 'react';
import { GraduationCap, Scale, PiggyBank, Wallet } from 'lucide-react';
import { PageHero, Section, Callout } from '@/components/ui/content';
import Actividades from '@/components/practica/Actividades';
import { getNavPage } from '@/lib/navigation';

export const metadata: Metadata = {
  title: 'Práctica de Aprendizaje | SENA FINANZAS S.A.',
  description: 'Casos prácticos y actividades interactivas sobre patrimonio, inversión y presupuesto personal.',
};

const page = getNavPage('/practica-aprendizaje');

function Linea({ label, children, destacado }: { label: string; children: React.ReactNode; destacado?: boolean }) {
  return (
    <div className={`rounded-xl px-4 py-3 ${destacado ? 'bg-brand-600 text-white' : 'bg-slate-50 border border-slate-200'}`}>
      <p className={`text-xs font-bold uppercase tracking-wide ${destacado ? 'text-brand-100' : 'text-slate-500'}`}>{label}</p>
      <p className={`font-mono text-sm sm:text-base font-semibold ${destacado ? '' : 'text-navy-900'}`}>{children}</p>
    </div>
  );
}

function CasoCard({
  numero,
  titulo,
  icon: Icon,
  situacion,
  children,
  conclusion,
}: {
  numero: number;
  titulo: string;
  icon: React.ComponentType<{ className?: string }>;
  situacion: React.ReactNode;
  children: React.ReactNode;
  conclusion: React.ReactNode;
}) {
  return (
    <article className="h-full flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg hover:border-brand-300 transition-all">
      <header className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
        <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5" />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-brand-600">Caso {numero}</p>
          <h3 className="font-bold text-navy-900 leading-tight">{titulo}</h3>
        </div>
      </header>
      <div className="p-5 space-y-4 flex-1 flex flex-col">
        <div className="text-sm text-slate-700 leading-relaxed">
          <span className="font-bold text-navy-900">Situación: </span>
          {situacion}
        </div>
        <div className="space-y-2 flex-1">{children}</div>
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-sm text-slate-700">
          <span className="font-bold text-amber-900">Conclusión: </span>
          {conclusion}
        </div>
      </div>
    </article>
  );
}

export default function PracticaAprendizajePage() {
  return (
    <>
      <PageHero
        page={page}
        eyebrow="Pon en práctica lo aprendido"
        title="Práctica de"
        highlight="aprendizaje"
        description="Revisa casos resueltos paso a paso y luego resuelve las actividades interactivas. La calificación es inmediata y simulada: nada se guarda ni se envía."
        icon={GraduationCap}
      />

      <Section id="casos-practicos" eyebrow="Ejemplos resueltos" title="Casos prácticos">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <CasoCard
            numero={1}
            titulo="Cálculo del patrimonio"
            icon={Scale}
            situacion="Laura tiene una motocicleta de $10.000.000, $4.000.000 en su cuenta de ahorros y un CDT de $6.000.000. Tiene deudas por $5.000.000."
            conclusion="Laura tiene un patrimonio de $15.000.000."
          >
            <Linea label="Activos">$10.000.000 + $4.000.000 + $6.000.000 = $20.000.000</Linea>
            <Linea label="Pasivos">$5.000.000</Linea>
            <Linea label="Patrimonio" destacado>
              $20.000.000 – $5.000.000 = $15.000.000
            </Linea>
          </CasoCard>

          <CasoCard
            numero={2}
            titulo="Inversión en un CDT"
            icon={PiggyBank}
            situacion="Carlos invierte $5.000.000 durante un año a una tasa hipotética del 10% efectivo anual, únicamente para realizar el ejercicio."
            conclusion="La inversión generaría $500.000 de rendimiento bruto en el ejemplo."
          >
            <Linea label="Rendimiento">$5.000.000 × 10% = $500.000</Linea>
            <Linea label="Valor final antes de retenciones" destacado>
              $5.000.000 + $500.000 = $5.500.000
            </Linea>
          </CasoCard>

          <CasoCard
            numero={3}
            titulo="Presupuesto personal"
            icon={Wallet}
            situacion="Andrés recibe $3.000.000 al mes y tiene gastos por $2.400.000."
            conclusion="Elaborar un presupuesto permite saber cuánto dinero puede destinarse al ahorro y a la inversión sin afectar las necesidades básicas."
          >
            <Linea label="Dinero disponible" destacado>
              $3.000.000 – $2.400.000 = $600.000
            </Linea>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500 pt-1">Puede distribuirlo, por ejemplo:</p>
            <ul className="grid grid-cols-3 gap-2 text-center">
              {[
                ['$300.000', 'Ahorro', 'bg-brand-100 text-brand-800'],
                ['$200.000', 'Inversión', 'bg-brand-300 text-navy-900'],
                ['$100.000', 'Emergencias', 'bg-amber-100 text-amber-900'],
              ].map(([v, l, c]) => (
                <li key={l} className={`rounded-xl p-2 ${c}`}>
                  <p className="font-extrabold text-sm">{v}</p>
                  <p className="text-xs font-semibold">{l}</p>
                </li>
              ))}
            </ul>
          </CasoCard>
        </div>
      </Section>

      <Section id="actividades" eyebrow="Interactivo" title="Actividades de aprendizaje" tone="mint">
        <Callout variant="info" title="Modo demostración">
          Resuelve cada actividad y obtén retroalimentación inmediata con ✅ o ✖️. Tus respuestas no se almacenan ni se envían.
        </Callout>
        <Actividades />
      </Section>
    </>
  );
}
