import type { Metadata } from 'next';
import Link from 'next/link';
import {
  PiggyBank,
  Coins,
  Receipt,
  Target,
  LifeBuoy,
  Landmark,
  Percent,
  ClipboardList,
  CalendarCheck,
  ListOrdered,
  ShoppingCart,
  Scissors,
  Wallet,
  Scale,
  Repeat,
  Building2,
  Building,
  ShieldCheck,
  User,
  HandCoins,
  ArrowRightLeft,
  Network,
  Calculator,
  ArrowRight,
} from 'lucide-react';
import { PageHero, Section, Prose, GlossaryGrid } from '@/components/ui/content';
import { getNavPage } from '@/lib/navigation';

export const metadata: Metadata = {
  title: 'Ahorro con Propósito | SENA FINANZAS S.A.',
  description: 'Conceptos de ahorro, estrategias para ahorrar y cómo funciona el Sistema Financiero Colombiano.',
};

const page = getNavPage('/ahorro-con-proposito');

const ESTRATEGIAS = [
  { icon: ClipboardList, titulo: 'Presupuesto', texto: 'Plan que permite organizar los ingresos y gastos para saber cómo se utilizará el dinero.' },
  { icon: CalendarCheck, titulo: 'Plan de ahorro', texto: 'Organización de cuánto dinero se quiere ahorrar, durante cuánto tiempo y para qué objetivo.' },
  { icon: ListOrdered, titulo: 'Priorizar gastos', texto: 'Diferenciar entre lo que es necesario y lo que puede esperar.' },
  { icon: ShoppingCart, titulo: 'Evitar compras impulsivas', texto: 'No comprar inmediatamente algo que no estaba planeado o que realmente no se necesita.' },
  { icon: Scissors, titulo: 'Reducir gastos', texto: 'Buscar alternativas para gastar menos sin afectar las necesidades básicas.' },
  { icon: PiggyBank, titulo: 'Ahorrar primero', texto: 'Separar el dinero destinado al ahorro antes de comenzar a realizar los demás gastos.' },
  { icon: Scale, titulo: 'Comparar precios', texto: 'Revisar diferentes opciones antes de comprar para encontrar mejores condiciones.' },
  { icon: Repeat, titulo: 'Disciplina financiera', texto: 'Mantener buenos hábitos de manejo del dinero de manera constante.' },
];

export default function AhorroConPropositoPage() {
  return (
    <>
      <PageHero
        page={page}
        eyebrow="Módulo de aprendizaje"
        title="Ahorro con"
        highlight="propósito"
        description="Ahorrar es guardar hoy para cumplir tus metas mañana. Conoce los conceptos clave, estrategias sencillas y las entidades que hacen parte del sistema financiero."
        icon={PiggyBank}
      />

      <Section id="ahorrando" eyebrow="Conceptos clave" title="Ahorrando">
        <div className="rounded-3xl bg-gradient-to-br from-brand-500 via-brand-700 to-navy-900 text-white p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row gap-5 items-start">
          <span className="w-14 h-14 shrink-0 rounded-2xl bg-brand-300 text-navy-900 flex items-center justify-center">
            <PiggyBank className="w-7 h-7" />
          </span>
          <div className="space-y-1">
            <h3 className="text-xl font-extrabold">¿Qué es el ahorro?</h3>
            <p className="text-brand-50/90 leading-relaxed text-base sm:text-lg">
              Es la parte de los ingresos que se guarda y no se gasta inmediatamente, con el propósito de utilizarla en el futuro.
            </p>
          </div>
        </div>
        <GlossaryGrid
          items={[
            { icon: Coins, term: 'Ingresos', definition: 'Dinero que recibe una persona, por ejemplo, por salario, negocio, trabajos o ayudas.' },
            { icon: Receipt, term: 'Gastos', definition: 'Dinero que se utiliza para cubrir necesidades y deseos, como alimentación, transporte, vivienda o entretenimiento.' },
            { icon: Target, term: 'Meta de ahorro', definition: 'Objetivo específico para el cual se guarda dinero. Ejemplo: comprar un computador, estudiar o realizar un viaje.' },
            { icon: LifeBuoy, term: 'Fondo de emergencia', definition: 'Dinero reservado para cubrir situaciones inesperadas, como una reparación, una emergencia familiar o una disminución de los ingresos.' },
            { icon: Landmark, term: 'Ahorro formal', definition: 'Dinero guardado mediante entidades financieras, como una cuenta de ahorros o un CDT.' },
            { icon: Percent, term: 'Interés', definition: 'Valor que se puede recibir por ahorrar o que se puede pagar cuando se utiliza dinero prestado.' },
          ]}
        />
      </Section>

      <Section id="estrategias" eyebrow="Hábitos" title="Estrategias para ahorrar" tone="mint">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ESTRATEGIAS.map((e, idx) => (
            <li key={e.titulo} className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-900/5 transition-all space-y-2">
              <span
                className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  ['bg-brand-100 text-brand-700', 'bg-brand-500 text-white', 'bg-brand-700 text-brand-100', 'bg-brand-300 text-navy-900'][idx % 4]
                }`}
              >
                <e.icon className="w-5 h-5" />
              </span>
              <h3 className="font-bold text-navy-900">{e.titulo}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{e.texto}</p>
            </li>
          ))}
        </ul>
        <div className="rounded-3xl bg-navy-900 text-white p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-300">Regla sencilla</p>
            <p className="text-xl sm:text-2xl font-extrabold leading-snug">
              Ingresos <span className="text-brand-300">–</span> Ahorro <span className="text-brand-300">=</span> Dinero disponible para gastos
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link
              href="/simuladores#simulador-ahorro"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-300 hover:bg-brand-200 text-navy-900 font-bold text-sm transition-colors"
            >
              <Calculator className="w-4 h-4" />
              Simular mi meta de ahorro
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Section>

      <Section id="sistema-financiero" eyebrow="Entorno financiero" title="Sistema Financiero Colombiano">
        <Prose>
          <p>
            Conjunto de instituciones, entidades, mercados y normas que permiten realizar actividades como <strong className="text-brand-700">ahorrar, solicitar créditos, invertir y efectuar pagos</strong>.
          </p>
        </Prose>
        <GlossaryGrid
          items={[
            { icon: Building2, term: 'Entidad financiera', definition: 'Institución autorizada para ofrecer servicios y productos financieros.' },
            { icon: Building, term: 'Banco', definition: 'Entidad financiera que ofrece productos como cuentas, créditos, tarjetas y otros servicios.' },
            { icon: Landmark, term: 'Banco de la República', definition: 'Es el banco central de Colombia. Entre sus funciones están contribuir a mantener la estabilidad de precios y emitir la moneda legal colombiana.' },
            { icon: ShieldCheck, term: 'Superintendencia Financiera de Colombia', definition: 'Entidad que ejerce inspección, vigilancia y control sobre las entidades financieras que están bajo su competencia.' },
            { icon: User, term: 'Cliente financiero', definition: 'Persona o empresa que utiliza productos o servicios ofrecidos por una entidad financiera.' },
            { icon: HandCoins, term: 'Crédito', definition: 'Dinero que una entidad financiera presta y que debe ser devuelto según unas condiciones establecidas.' },
            { icon: ArrowRightLeft, term: 'Intermediación financiera', definition: 'Proceso mediante el cual las entidades financieras canalizan recursos de quienes ahorran hacia quienes necesitan financiación.' },
          ]}
        />
        <div className="rounded-3xl bg-brand-50 border border-brand-200 p-6 sm:p-8">
          <p className="flex items-center gap-2 font-bold text-navy-900 mb-5">
            <Network className="w-5 h-5 text-brand-500" />
            Así funciona la intermediación financiera
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-3 text-center">
            <div className="rounded-2xl bg-white border border-brand-200 p-4">
              <Wallet className="w-7 h-7 mx-auto text-brand-500" />
              <p className="mt-2 font-bold text-navy-900">Ahorradores</p>
              <p className="text-xs text-slate-600">Depositan su dinero</p>
            </div>
            <ArrowRight className="w-6 h-6 mx-auto text-brand-500 rotate-90 sm:rotate-0" />
            <div className="rounded-2xl bg-brand-700 text-white p-4">
              <Building2 className="w-7 h-7 mx-auto text-brand-200" />
              <p className="mt-2 font-bold">Entidad financiera</p>
              <p className="text-xs text-brand-100">Vigilada por la Superfinanciera</p>
            </div>
            <ArrowRight className="w-6 h-6 mx-auto text-brand-500 rotate-90 sm:rotate-0" />
            <div className="rounded-2xl bg-white border border-brand-200 p-4">
              <HandCoins className="w-7 h-7 mx-auto text-brand-500" />
              <p className="mt-2 font-bold text-navy-900">Quienes necesitan financiación</p>
              <p className="text-xs text-slate-600">Reciben créditos</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
