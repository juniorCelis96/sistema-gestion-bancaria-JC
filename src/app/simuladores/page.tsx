import type { Metadata } from 'next';
import { Calculator } from 'lucide-react';
import { PageHero } from '@/components/ui/content';
import SimuladorCredito from '@/components/simuladores/SimuladorCredito';
import SimuladorCDT from '@/components/simuladores/SimuladorCDT';
import SimuladorAhorro from '@/components/simuladores/SimuladorAhorro';
import { getNavPage } from '@/lib/navigation';

export const metadata: Metadata = {
  title: 'Simuladores | SENA FINANZAS S.A.',
  description: 'Simula tu crédito, la rentabilidad de tu CDT y tu meta de ahorro con SENA FINANZAS S.A.',
};

const page = getNavPage('/simuladores');

export default function SimuladoresPage() {
  return (
    <>
      <PageHero
        page={page}
        eyebrow="Herramientas financieras"
        title="Simuladores"
        highlight="financieros"
        description="Proyecta tus cuotas de crédito, calcula el rendimiento de tu CDT y planea cuánto ahorrar para cumplir tus metas. Los resultados son aproximados y de carácter informativo."
        icon={Calculator}
      />
      <section id="simulador-credito" className="scroll-mt-24 xl:scroll-mt-20 bg-slate-50">
        <SimuladorCredito />
      </section>
      <section id="simulador-cdt" className="scroll-mt-24 xl:scroll-mt-20 bg-gradient-to-b from-brand-50 to-white border-t border-brand-100">
        <SimuladorCDT />
      </section>
      <section id="simulador-ahorro" className="scroll-mt-24 xl:scroll-mt-20 bg-slate-50 border-t border-slate-200">
        <SimuladorAhorro />
      </section>
    </>
  );
}
