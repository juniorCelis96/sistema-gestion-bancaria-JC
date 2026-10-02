import React from 'react';
import Link from 'next/link';
import {
  Calculator,
  PiggyBank,
  ArrowRight,
  Sparkles,
  BookOpen,
  Target,
  Compass,
  Eye,
  HeartHandshake,
  ShieldCheck,
  Lightbulb,
  Users,
  GraduationCap,
  Wallet,
  Scale,
} from 'lucide-react';
import { formatCOP } from '@/lib/financial-math';
import { Section } from '@/components/ui/content';
import ContactoSection from '@/components/home/ContactoSection';

const OBJETIVOS_ESPECIFICOS = [
  {
    icono: BookOpen,
    titulo: 'Comprender',
    texto:
      'Identificar y comprender los principales conceptos relacionados con la educación financiera, reconociendo su importancia para el manejo adecuado del dinero y la toma de decisiones en diferentes situaciones de la vida cotidiana.',
  },
  {
    icono: Wallet,
    titulo: 'Organizar y ahorrar',
    texto:
      'Fomentar hábitos financieros responsables mediante la organización de los ingresos y gastos, la elaboración de presupuestos y la práctica del ahorro, con el fin de utilizar los recursos económicos de manera planificada y consciente.',
  },
  {
    icono: Scale,
    titulo: 'Decidir con responsabilidad',
    texto:
      'Fortalecer la capacidad para tomar decisiones financieras responsables relacionadas con el crédito, el endeudamiento, la inversión y el cumplimiento de metas, teniendo en cuenta las necesidades, posibilidades y consecuencias de cada decisión.',
  },
];

const VALORES = [
  { icono: ShieldCheck, label: 'Confianza' },
  { icono: Scale, label: 'Transparencia' },
  { icono: HeartHandshake, label: 'Responsabilidad' },
  { icono: Lightbulb, label: 'Innovación' },
];

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-brand-800 to-brand-600 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-400/25 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-300/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-brand-500/25 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-400/30 text-brand-300 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-brand-300" />
                <span>Tu conocimiento, tu mejor inversión</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Aprende a manejar tu dinero y construye un{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-brand-200 to-brand-100">
                  mejor futuro
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Conocimientos y herramientas sencillas para organizar tus ingresos y gastos, ahorrar, usar el crédito de manera responsable y tomar mejores decisiones financieras.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
                <Link
                  href="/educacion-financiera"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-brand-300 hover:bg-brand-200 text-navy-900 font-bold text-base shadow-lg shadow-brand-300/30 hover:scale-[1.02] transition-all"
                >
                  <GraduationCap className="w-5 h-5" />
                  <span>Empezar a aprender</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/simuladores"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-base backdrop-blur-sm transition-all"
                >
                  <Calculator className="w-5 h-5 text-brand-300" />
                  <span>Ir a simuladores</span>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10 text-left">
                <div>
                  <div className="text-2xl font-bold text-white">7</div>
                  <div className="text-xs text-slate-300">Módulos de aprendizaje</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">3</div>
                  <div className="text-xs text-slate-300">Simuladores financieros</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-brand-300">100%</div>
                  <div className="text-xs text-slate-300">Práctico y gratuito</div>
                </div>
              </div>
            </div>

            {/* Simulador exprés */}
            <div className="lg:col-span-5">
              <div className="bg-white/95 text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-navy-950/40 border border-slate-200">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Simulador Exprés</h2>
                    <p className="text-xs text-slate-500">Calcula tu crédito en segundos</p>
                  </div>
                  <span className="p-2.5 rounded-xl bg-brand-100 text-brand-700">
                    <Calculator className="w-5 h-5" />
                  </span>
                </div>

                <div className="space-y-4 my-6">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                    <div className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Ejemplo Crédito Libre Inversión</div>
                    <div className="text-2xl font-extrabold text-brand-900 mt-1">{formatCOP(10000000)}</div>
                    <div className="flex justify-between items-center text-xs text-slate-600 mt-2">
                      <span>Plazo: <strong>36 meses</strong></span>
                      <span>Tasa: <strong>1.45% M.V.</strong></span>
                    </div>
                  </div>

                  <div className="bg-brand-100/70 p-4 rounded-xl border border-brand-300/60">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-brand-800 uppercase">Cuota Mensual Estimada</span>
                      <span className="text-xs font-bold bg-brand-200 text-brand-900 px-2 py-0.5 rounded-full">Fija</span>
                    </div>
                    <div className="text-3xl font-black text-brand-700 mt-1">
                      {formatCOP(359770)} <span className="text-xs font-normal text-slate-500">/ mes</span>
                    </div>
                    <p className="text-[11px] text-brand-800/80 mt-1">Incluye capital e intereses. Valor aproximado.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Link
                    href="/simuladores#simulador-credito"
                    className="inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-semibold text-sm transition-all shadow-md"
                  >
                    <span>Simular crédito</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/simuladores#simulador-cdt"
                    className="inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm transition-all shadow-md"
                  >
                    <PiggyBank className="w-4 h-4" />
                    <span>Simular CDT</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRESENTACIÓN */}
      <Section id="presentacion" eyebrow="Presentación" title="Educación financiera para la vida">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-slate-700 leading-relaxed text-base sm:text-lg">
            <p>
              La educación financiera nos ayuda a comprender y manejar mejor nuestro dinero. Esta cartilla tiene como propósito brindar conocimientos y herramientas sencillas para aprender a{' '}
              <strong className="text-brand-700">organizar los ingresos y gastos, ahorrar, utilizar el crédito de manera responsable</strong> y tomar mejores decisiones financieras.
            </p>
            <p>
              A través de ejemplos y actividades prácticas, se busca fortalecer buenos hábitos financieros que contribuyan al cumplimiento de nuestras metas y a un mejor bienestar económico.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-gradient-to-br from-brand-500 via-brand-700 to-navy-900 text-white p-8 shadow-xl shadow-brand-900/20 overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-300/30 rounded-full blur-2xl" />
              <Sparkles className="w-10 h-10 text-brand-200 mb-4" />
              <p className="text-2xl sm:text-3xl font-extrabold leading-snug relative">
                ¡Aprende a manejar tu dinero y construye un mejor futuro!
              </p>
              <Link
                href="/educacion-financiera"
                className="relative mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-300 hover:bg-brand-200 text-navy-900 font-bold text-sm transition-colors"
              >
                Explorar la cartilla
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* OBJETIVO GENERAL */}
      <Section id="objetivo-general" eyebrow="Objetivo general" title="¿Qué buscamos?" tone="mint">
        <div className="relative bg-white rounded-3xl border border-brand-200 p-6 sm:p-10 shadow-sm flex flex-col md:flex-row gap-6 items-start">
          <span className="w-16 h-16 shrink-0 rounded-2xl bg-brand-500 text-white flex items-center justify-center shadow-lg shadow-brand-500/30">
            <Target className="w-8 h-8" />
          </span>
          <p className="text-lg sm:text-xl text-navy-900 leading-relaxed">
            Promover la educación financiera mediante el desarrollo de conocimientos y hábitos que permitan a las personas{' '}
            <strong className="text-brand-700">administrar responsablemente sus recursos</strong>, organizar sus ingresos y gastos, fomentar el ahorro y tomar decisiones financieras adecuadas para alcanzar sus metas y mejorar su bienestar económico.
          </p>
        </div>
      </Section>

      {/* OBJETIVOS ESPECÍFICOS */}
      <Section id="objetivos-especificos" eyebrow="Objetivos específicos" title="Paso a paso hacia el bienestar financiero">
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {OBJETIVOS_ESPECIFICOS.map(({ icono: Icono, titulo, texto }, idx) => (
            <li
              key={titulo}
              className="relative bg-white rounded-3xl border border-slate-200 p-6 hover:shadow-xl hover:shadow-brand-900/10 hover:-translate-y-1 transition-all"
            >
              <span className="absolute -top-4 left-6 w-9 h-9 rounded-full bg-navy-900 text-brand-300 font-black flex items-center justify-center shadow-md">
                {idx + 1}
              </span>
              <span
                className={`mt-3 w-12 h-12 rounded-xl flex items-center justify-center ${
                  ['bg-brand-100 text-brand-700', 'bg-brand-500 text-white', 'bg-brand-700 text-brand-100'][idx]
                }`}
              >
                <Icono className="w-6 h-6" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-navy-900">{titulo}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{texto}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* MISIÓN Y VISIÓN */}
      <Section id="mision-vision" eyebrow="Misión y visión" title="Lo que nos mueve" tone="mint">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-navy-900 text-white p-7 sm:p-8 shadow-lg space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-xl bg-brand-300 text-navy-900 flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </span>
              <h3 className="text-2xl font-extrabold">Misión</h3>
            </div>
            <p className="text-brand-50/90 leading-relaxed">
              Promover el bienestar económico de las personas y familias a través de la educación financiera, brindando conocimientos, herramientas prácticas y productos accesibles que les permitan administrar su dinero con responsabilidad, ahorrar con propósito y tomar decisiones informadas.
            </p>
          </div>
          <div className="rounded-3xl bg-white border-2 border-brand-300 p-7 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-xl bg-brand-500 text-white flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </span>
              <h3 className="text-2xl font-extrabold text-navy-900">Visión</h3>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Para el año 2030, ser reconocidos como la entidad financiera referente en educación financiera en Colombia, por transformar el conocimiento de nuestros clientes en mejores decisiones y en un futuro económico más estable para sus comunidades.
            </p>
          </div>
        </div>
        <ul className="flex flex-wrap justify-center gap-3">
          {VALORES.map(({ icono: Icono, label }) => (
            <li key={label} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-brand-200 text-sm font-semibold text-brand-800 shadow-xs">
              <Icono className="w-4 h-4 text-brand-500" />
              {label}
            </li>
          ))}
          <li className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-brand-200 text-sm font-semibold text-brand-800 shadow-xs">
            <Users className="w-4 h-4 text-brand-500" />
            Compromiso social
          </li>
        </ul>
      </Section>

      {/* CONTACTO */}
      <ContactoSection />
    </div>
  );
}
