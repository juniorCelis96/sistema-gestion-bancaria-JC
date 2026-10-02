import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  GraduationCap,
  ArrowLeftRight,
  Ruler,
  Landmark,
  ClipboardList,
  ShieldCheck,
  Lock,
  TrendingUp,
  Repeat,
  Layers,
  Umbrella,
  Briefcase,
  Store,
  BadgeDollarSign,
  Home,
  Percent,
  Gift,
  Banknote,
  Shuffle,
  Sparkles,
  Coins,
  Receipt,
  PiggyBank,
  ArrowRight,
  Download,
  Zap,
  Bus,
  Utensils,
  School,
  CreditCard,
  Shirt,
  Wifi,
  Film,
  CheckCircle2,
  Ban,
} from 'lucide-react';
import {
  PageHero,
  Section,
  Prose,
  IconCard,
  GlossaryGrid,
  DataTable,
  Callout,
  StepList,
} from '@/components/ui/content';
import { getNavPage } from '@/lib/navigation';

export const metadata: Metadata = {
  title: 'Educación Financiera | SENA FINANZAS S.A.',
  description:
    'Aprende qué es la educación financiera, cómo administrar tu dinero, la regla 50/30/20, ingresos, gastos y cómo elaborar tu presupuesto.',
};

const page = getNavPage('/educacion-financiera');

const REGLA = [
  {
    porcentaje: 50,
    nombre: 'Necesidades',
    barra: 'bg-blue-500',
    chip: 'bg-blue-100 text-blue-800',
    items: ['Vivienda y servicios', 'Alimentación básica', 'Transporte y salud'],
  },
  {
    porcentaje: 30,
    nombre: 'Deseos',
    barra: 'bg-green-500',
    chip: 'bg-green-100 text-green-800',
    items: ['Ocio y salidas', 'Suscripciones', 'Viajes / compras'],
  },
  {
    porcentaje: 20,
    nombre: 'Futuro',
    barra: 'bg-orange-500',
    chip: 'bg-orange-100 text-orange-800',
    items: ['Ahorro', 'Inversión', 'Extra-deuda'],
  },
];

function Chips({ items }: { items: { icon: React.ElementType; label: string }[] }) {
  return (
    <ul className="flex flex-wrap gap-2.5">
      {items.map(({ icon: Icon, label }) => (
        <li
          key={label}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-brand-200 text-sm font-medium text-navy-900 shadow-xs"
        >
          <Icon className="w-4 h-4 text-brand-500" />
          {label}
        </li>
      ))}
    </ul>
  );
}

export default function EducacionFinancieraPage() {
  return (
    <>
      <PageHero
        page={page}
        eyebrow="Módulo de aprendizaje"
        title="Educación"
        highlight="financiera"
        description="Conocimientos y habilidades para manejar correctamente tu dinero: organiza tus ingresos y gastos, ahorra, haz un presupuesto y usa el crédito de forma responsable."
        icon={GraduationCap}
      />

      {/* ¿QUÉ ES? */}
      <Section id="que-es" eyebrow="Conceptos básicos" title="¿Qué es la educación financiera?">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <Prose>
              <p>
                La educación financiera es el conjunto de conocimientos y habilidades que nos ayudan a manejar correctamente nuestro dinero. Permite aprender a organizar los ingresos y gastos, ahorrar, hacer un presupuesto, utilizar el crédito de forma responsable y tomar decisiones adecuadas para alcanzar nuestras metas económicas.
              </p>
            </Prose>
          </div>
          <div className="lg:col-span-5">
            <Callout variant="remember" title="En pocas palabras">
              La educación financiera nos enseña a utilizar nuestro dinero de manera <strong>inteligente y responsable</strong> para tener un mejor bienestar económico.
            </Callout>
          </div>
        </div>
        <Chips
          items={[
            { icon: ClipboardList, label: 'Organizar ingresos y gastos' },
            { icon: PiggyBank, label: 'Ahorrar' },
            { icon: Receipt, label: 'Hacer un presupuesto' },
            { icon: CreditCard, label: 'Usar el crédito con responsabilidad' },
            { icon: CheckCircle2, label: 'Tomar mejores decisiones' },
          ]}
        />
      </Section>

      {/* IMPORTANCIA */}
      <Section id="importancia" eyebrow="¿Por qué aprender?" title="Importancia de la educación financiera" tone="mint">
        <Prose>
          <p>
            La educación financiera es importante porque nos permite manejar mejor nuestro dinero y tomar decisiones responsables. También ayuda a evitar gastos innecesarios, controlar las deudas y prepararnos para situaciones inesperadas.
          </p>
          <p>
            Además, nos enseña a organizar nuestros ingresos, elaborar un presupuesto, ahorrar y establecer metas financieras, contribuyendo a mejorar nuestra estabilidad y bienestar económico.
          </p>
        </Prose>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <article className="lg:col-span-8 bg-white rounded-3xl border border-brand-200 p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-navy-900">🏠 Ejemplo de la importancia de la educación financiera</h3>
            <p className="text-slate-700 leading-relaxed">
              Daniela recibe <strong className="text-brand-700">$1.500.000</strong> al mes. Antes de gastar su dinero, realiza un presupuesto, separa el valor de sus gastos básicos, destina una parte al ahorro y evita adquirir deudas que no puede pagar.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Gracias a la educación financiera, Daniela puede organizar mejor su dinero, evitar gastos innecesarios y ahorrar para cumplir una meta, como comprar un computador o realizar un viaje. 💰📊
            </p>
          </article>
          <div className="lg:col-span-4 flex">
            <div className="w-full rounded-3xl bg-gradient-to-br from-amber-300 to-amber-400 text-navy-900 p-6 sm:p-8 shadow-md flex flex-col justify-center gap-3">
              <span className="text-3xl">💡</span>
              <p className="font-extrabold text-lg">Enseñanza</p>
              <p className="leading-relaxed">
                Una buena planificación financiera permite aprovechar mejor el dinero y tomar decisiones más responsables.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* EL DINERO */}
      <Section id="dinero" eyebrow="El dinero" title="El dinero y su administración" subtitle="Más que billetes, más oportunidades.">
        <Prose>
          <p>
            El dinero es cualquier activo o bien que la sociedad acepta de forma general como medio de pago para comprar y vender bienes, servicios y deudas.
          </p>
        </Prose>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <IconCard icon={ArrowLeftRight} title="Medio de cambio" index={0}>
            Elimina el trueque; facilita las transacciones.
          </IconCard>
          <IconCard icon={Ruler} title="Unidad de cuenta" index={1}>
            Mide y fija precios en términos estándar.
          </IconCard>
          <IconCard icon={Landmark} title="Depósito de valor" index={2}>
            Guarda riqueza para el futuro. <strong className="text-amber-700">Ojo: la inflación</strong> reduce su poder de compra con el tiempo.
          </IconCard>
        </div>
      </Section>

      {/* PILARES */}
      <Section id="pilares" eyebrow="Gestión financiera" title="Los 4 pilares de la gestión financiera" subtitle="Una base sólida para tus metas." tone="mint">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: ClipboardList, titulo: 'Presupuesto', lema: 'Dominar el flujo', texto: 'Rastrea el 100% de tus ingresos y gastos fijos y variables.' },
            { icon: ShieldCheck, titulo: 'Ahorro', lema: 'Escudo financiero', texto: 'Construye un fondo de emergencia equivalente a 3 a 6 meses de gastos.' },
            { icon: Lock, titulo: 'Deuda', lema: 'Blindar la solvencia', texto: 'Elimina primero las deudas con intereses más altos y no financies el consumo.' },
            { icon: TrendingUp, titulo: 'Inversión', lema: 'Ganarle a la inflación', texto: 'Pon tus excedentes a trabajar con el poder del interés compuesto.' },
          ].map((p, idx) => (
            <div key={p.titulo} className="relative bg-white rounded-3xl border border-slate-200 p-6 pt-8 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/10 transition-all">
              <span className="absolute top-0 left-6 right-6 h-1.5 rounded-b-full bg-gradient-to-r from-brand-300 to-brand-600" />
              <span
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  ['bg-brand-100 text-brand-700', 'bg-brand-500 text-white', 'bg-brand-700 text-brand-100', 'bg-brand-300 text-navy-900'][idx]
                }`}
              >
                <p.icon className="w-6 h-6" />
              </span>
              <h3 className="mt-4 text-xl font-extrabold text-navy-900">{p.titulo}</h3>
              <p className="text-sm font-semibold text-brand-600">{p.lema}</p>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{p.texto}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* REGLA 50/30/20 */}
      <Section id="regla-50-30-20" eyebrow="Estructura recomendada" title="Regla 50 / 30 / 20" subtitle="Equilibrio hoy, tranquilidad mañana.">
        <div className="space-y-6">
          <div className="flex h-14 sm:h-16 rounded-2xl overflow-hidden shadow-md" role="img" aria-label="Distribución 50% necesidades, 30% deseos, 20% futuro">
            {REGLA.map((r) => (
              <div
                key={r.nombre}
                className={`${r.barra} text-white flex items-center justify-center font-black text-sm sm:text-lg`}
                style={{ width: `${r.porcentaje}%` }}
              >
                {r.porcentaje}% <span className="hidden sm:inline ml-1.5 font-semibold">{r.nombre}</span>
              </div>
            ))}
          </div>
          <DataTable
            caption="Regla 50/30/20"
            headers={['Porcentaje', 'Categoría', 'Ejemplos']}
            rows={REGLA.map((r) => [
              <span key="p" className={`inline-flex px-3 py-1 rounded-full font-black ${r.chip}`}>
                {r.porcentaje}%
              </span>,
              <span key="n" className="inline-flex items-center gap-2 font-bold text-navy-900">
                <span className={`w-3 h-3 rounded-full ${r.barra}`} />
                {r.nombre}
              </span>,
              <ul key="i" className="space-y-1">
                {r.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>,
            ])}
          />
        </div>
      </Section>

      {/* MANDAMIENTOS */}
      <Section id="mandamientos" eyebrow="Hábitos" title="Mandamientos para el éxito económico" subtitle="Hábitos que transforman vidas." tone="mint">
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: Repeat, titulo: 'Interés compuesto', texto: 'El tiempo en el mercado supera al momento del mercado; reinvierte tus ganancias.' },
            { icon: Layers, titulo: 'Diversificación', texto: 'Nunca pongas todos los huevos en la misma canasta.' },
            { icon: Umbrella, titulo: 'Protección', texto: 'Asegura tus activos clave para que un imprevisto no borre años de ahorro.' },
          ].map((m, idx) => (
            <li key={m.titulo} className="rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-navy-900 text-white p-6 sm:p-7 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-5xl font-black text-brand-300/90">{idx + 1}</span>
                <m.icon className="w-8 h-8 text-brand-200" />
              </div>
              <h3 className="text-xl font-extrabold">{m.titulo}</h3>
              <p className="text-brand-50/90 text-sm leading-relaxed">{m.texto}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* INGRESOS */}
      <Section id="ingresos" eyebrow="Ingresos" title="¿Qué son los ingresos?">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <Prose>
              <p>
                Los ingresos son todas las entradas de dinero que recibe una persona, familia o empresa durante un período determinado. Estos recursos permiten cubrir necesidades, ahorrar, invertir y cumplir diferentes objetivos financieros.
              </p>
            </Prose>
          </div>
          <div className="lg:col-span-5">
            <Callout variant="info" title="Ten en cuenta">
              No todo ingreso es fijo; algunos se reciben regularmente y otros pueden variar cada mes.
            </Callout>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-navy-900">Ejemplos de ingresos</h3>
          <Chips
            items={[
              { icon: Briefcase, label: 'Salario o pago por trabajo' },
              { icon: Store, label: 'Ganancias de un negocio o emprendimiento' },
              { icon: BadgeDollarSign, label: 'Comisiones, honorarios o trabajos adicionales' },
              { icon: Home, label: 'Arriendo recibido por una propiedad' },
              { icon: Percent, label: 'Intereses de una inversión o cuenta de ahorro' },
              { icon: Gift, label: 'Recursos recibidos de manera ocasional' },
            ]}
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-navy-900">Tipos de ingresos</h3>
          <p className="text-sm text-slate-600">Existen diferentes formas de recibir dinero:</p>
          <GlossaryGrid
            columns={2}
            items={[
              { icon: Banknote, term: 'Ingresos fijos', definition: 'Se reciben con una cantidad estable y periódica, como un salario mensual.' },
              { icon: Shuffle, term: 'Ingresos variables', definition: 'Su valor puede cambiar de un período a otro, por ejemplo, las comisiones por ventas.' },
              { icon: Sparkles, term: 'Ingresos ocasionales', definition: 'Se reciben de manera eventual y no hacen parte del ingreso habitual, como la venta de un objeto personal.' },
              { icon: Coins, term: 'Ingresos financieros', definition: 'Ganancias obtenidas mediante productos o inversiones financieras, como los intereses de una inversión.' },
            ]}
          />
        </div>
      </Section>

      {/* IMPORTANCIA DE LOS INGRESOS */}
      <Section id="importancia-ingresos" eyebrow="Ingresos" title="¿Por qué es importante conocer los ingresos?" tone="mint">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <Prose>
            <p>
              Conocer los ingresos permite <strong className="text-brand-700">planear mejor, ahorrar con mayor seguridad</strong> y tomar decisiones financieras responsables.
            </p>
          </Prose>
          <blockquote className="rounded-3xl bg-brand-500 text-white p-6 sm:p-8 text-xl sm:text-2xl font-extrabold leading-snug shadow-lg shadow-brand-500/30">
            “Tu bienestar financiero empieza por saber cuánto entra.”
          </blockquote>
        </div>
      </Section>

      {/* GASTOS */}
      <Section
        id="gastos"
        eyebrow="Gastos"
        title="Gastos en el presupuesto familiar y personal"
        subtitle="Entender cómo se gasta el dinero te ayuda a mantener el equilibrio del hogar."
      >
        <Prose>
          <p>Conocer cómo se gasta el dinero nos ayuda a tomar mejores decisiones y a mantener el equilibrio del hogar.</p>
        </Prose>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-brand-50 rounded-3xl border border-brand-200 p-6 space-y-3">
            <h3 className="text-lg font-bold text-navy-900">¿Qué son los gastos?</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Los gastos son las salidas de dinero que realizamos para satisfacer necesidades, cumplir obligaciones o adquirir bienes y servicios. Algunos gastos son necesarios para vivir y otros corresponden a decisiones de consumo.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-navy-900">Ejemplos de gastos</h3>
            <Chips
              items={[
                { icon: Home, label: 'Arriendo' },
                { icon: Zap, label: 'Servicios públicos' },
                { icon: Utensils, label: 'Alimentación' },
                { icon: Bus, label: 'Transporte' },
                { icon: School, label: 'Educación' },
                { icon: CreditCard, label: 'Pago de créditos' },
                { icon: Shirt, label: 'Ropa' },
                { icon: Wifi, label: 'Telefonía e internet' },
                { icon: Film, label: 'Entretenimiento' },
              ]}
            />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-navy-900">Tipos de gastos</h3>
          <p className="text-sm text-slate-600">Conocer tus gastos te ayuda a tomar mejores decisiones:</p>
          <GlossaryGrid
            columns={2}
            items={[
              { icon: Lock, term: 'Gastos fijos', definition: 'Tienen un valor estable y se presentan periódicamente, como el arriendo mensual.' },
              { icon: Shuffle, term: 'Gastos variables', definition: 'Pueden cambiar dependiendo del consumo o de las necesidades, como la alimentación o el transporte.' },
              { icon: CheckCircle2, term: 'Gastos necesarios', definition: 'Son indispensables para cubrir necesidades básicas y obligaciones, como alimentación, vivienda y servicios públicos.' },
              { icon: Ban, term: 'Gastos innecesarios', definition: 'Pueden reducirse o evitarse sin afectar las necesidades básicas, como compras impulsivas o gastos frecuentes en entretenimiento.' },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-lg font-bold text-navy-900">¿Por qué es importante controlar los gastos?</h3>
            <p className="text-slate-700 leading-relaxed">
              Controlar los gastos nos ayuda a identificar en qué estamos gastando, evitar gastar más de lo que tenemos y cumplir nuestras obligaciones a tiempo. También permite encontrar oportunidades para ahorrar, prepararnos para situaciones inesperadas y alcanzar nuestras metas financieras.
            </p>
          </div>
          <div className="lg:col-span-5">
            <Callout variant="tip" title="Una buena regla">
              Primero conoce cuánto recibes y después decide cuánto puedes gastar.
            </Callout>
          </div>
        </div>
      </Section>

      {/* PRESUPUESTO */}
      <Section id="presupuesto" eyebrow="Presupuesto" title="El presupuesto familiar y personal" subtitle="Pequeñas decisiones, grandes logros." tone="mint">
        <Prose>
          <p>
            El presupuesto es una herramienta que te permite organizar tus ingresos, controlar tus gastos, ahorrar y tomar mejores decisiones financieras, para lograr mayor bienestar hoy y en el futuro.
          </p>
        </Prose>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-navy-900">Componentes principales del presupuesto</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <IconCard icon={Coins} title="Ingresos" index={0}>
              Todos los recursos económicos que recibe la persona o la familia, como el salario, ingresos adicionales o cualquier otra fuente.
            </IconCard>
            <IconCard icon={Receipt} title="Gastos" index={1}>
              Los pagos que realizas para cubrir tus necesidades y mantener tu calidad de vida. Pueden ser fijos (siempre se pagan) o variables (cambian cada mes).
            </IconCard>
            <IconCard icon={PiggyBank} title="Ahorro y metas" index={2}>
              La parte de tus ingresos que destinas para el futuro. Te prepara para imprevistos y te ayuda a cumplir tus sueños y metas personales y familiares.
            </IconCard>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-brand-200 p-6 sm:p-8 space-y-3">
          <h3 className="text-lg font-bold text-navy-900">¿Por qué es importante?</h3>
          <p className="text-slate-700 leading-relaxed">
            Hacer un presupuesto te permite organizar el dinero y tener un mayor control de tus finanzas. Además, te ayuda a evitar el sobreendeudamiento y a priorizar las necesidades sobre los deseos.
          </p>
          <p className="text-slate-700 leading-relaxed">
            Finalmente, es fundamental para prepararte ante imprevistos y alcanzar tus metas financieras a corto, mediano y largo plazo.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-navy-900">¿Cómo elaborarlo?</h3>
          <StepList
            steps={[
              { title: 'Registra todos los ingresos familiares' },
              { title: 'Clasifica los gastos en fijos y variables' },
              { title: 'Asigna un monto para el ahorro' },
              { title: 'Compara los ingresos con los gastos' },
              { title: 'Ajusta si es necesario', text: 'Para mantener el equilibrio financiero.' },
            ]}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-navy-900">Ejemplo práctico</h3>
          <DataTable
            caption="Ejemplo práctico de presupuesto familiar"
            headers={['Concepto', 'Valor mensual']}
            rows={[
              [<span key="c" className="text-brand-700">Ingresos familiares</span>, <strong key="v" className="text-brand-700">$ 4.500.000</strong>],
              ['Vivienda', '$ 1.200.000'],
              ['Alimentación', '$ 850.000'],
              ['Servicios públicos', '$ 350.000'],
              ['Transporte', '$ 400.000'],
              ['Educación', '$ 300.000'],
              ['Pago de obligaciones', '$ 450.000'],
              ['Entretenimiento y otros gastos', '$ 250.000'],
              ['Ahorro', '$ 400.000'],
            ]}
            footer={[
              ['Total de gastos y ahorro', '$ 4.200.000'],
              ['Saldo disponible', '$ 300.000'],
            ]}
          />
        </div>
      </Section>

      {/* TALLER */}
      <Section id="taller" eyebrow="Taller práctico" title="Taller práctico de presupuesto" subtitle="Organiza tus ingresos, prioriza tus gastos y construye tus metas financieras.">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 flex justify-center">
            <a
              href="/img/taller_practico_presupuesto.png"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full max-w-sm bg-white p-2 rounded-3xl shadow-2xl shadow-brand-900/15 border border-slate-200 hover:-rotate-1 transition-transform"
              title="Ver ficha en tamaño completo"
            >
              <Image
                src="/img/taller_practico_presupuesto.png"
                alt="Ficha del Taller práctico de presupuesto"
                width={1191}
                height={1683}
                sizes="(max-width: 768px) 90vw, 384px"
                className="w-full h-auto rounded-2xl"
              />
            </a>
          </div>
          <div className="md:col-span-7 space-y-5">
            <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
              Pon en práctica lo aprendido con este taller en 5 pasos: define tu objetivo, registra tu caso práctico, calcula tu saldo disponible, enfrenta el reto financiero y haz tu propio presupuesto.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700">
              {['Objetivo del taller', 'Tu caso práctico', 'Tu misión', 'Reto financiero', 'Haz tu propio presupuesto'].map((paso, i) => (
                <li key={paso} className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                  {paso}
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/taller-presupuesto"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-semibold text-sm shadow-md transition-all"
              >
                Hacer el taller interactivo
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="/img/taller_practico_presupuesto.png"
                download="taller_practico_presupuesto.png"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-brand-500 text-brand-700 hover:bg-brand-50 font-semibold text-sm transition-all"
              >
                <Download className="w-4 h-4" />
                Descargar ficha
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
