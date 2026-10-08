import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import type { LucideIcon } from 'lucide-react';
import {
  Flag,
  GraduationCap,
  Wallet,
  PiggyBank,
  HandCoins,
  ShieldCheck,
  TrendingUp,
  Calculator,
  ArrowRight,
  Landmark,
  Scale,
  Globe,
  BookOpen,
  Laptop,
  ExternalLink,
  Quote,
  UserRound,
  Users,
  Award,
  MapPin,
} from 'lucide-react';
import { PageHero, Section } from '@/components/ui/content';
import { getNavPage } from '@/lib/navigation';

export const metadata: Metadata = {
  title: 'Conclusiones y Bibliografía | SENA FINANZAS S.A.',
  description: 'Conclusiones del recorrido de educación financiera, referencias bibliográficas y créditos del sistema.',
};

const page = getNavPage('/conclusiones');

const CONCLUSIONES: { icon: LucideIcon; modulo: string; href: string; titulo: string; texto: string }[] = [
  {
    icon: GraduationCap,
    modulo: 'Educación financiera',
    href: '/educacion-financiera',
    titulo: 'El conocimiento es la base de las buenas decisiones',
    texto:
      'La educación financiera nos da herramientas para administrar el dinero con criterio, evitar errores costosos y planear el futuro con mayor tranquilidad.',
  },
  {
    icon: Wallet,
    modulo: 'Educación financiera',
    href: '/educacion-financiera#presupuesto',
    titulo: 'El presupuesto es el mapa de nuestras finanzas',
    texto:
      'Conocer ingresos y gastos, y aplicar guías como la regla 50/30/20, permite saber a dónde va el dinero y cuánto podemos destinar al ahorro.',
  },
  {
    icon: PiggyBank,
    modulo: 'Ahorro con propósito',
    href: '/ahorro-con-proposito',
    titulo: 'Ahorrar con una meta clara genera constancia',
    texto:
      'El ahorro es más efectivo cuando tiene un propósito, un plazo y un monto definido. Un fondo de emergencias protege nuestro bienestar ante imprevistos.',
  },
  {
    icon: HandCoins,
    modulo: 'Productos financieros',
    href: '/productos-financieros#endeudamiento',
    titulo: 'El crédito es una herramienta, no un ingreso extra',
    texto:
      'Antes de endeudarnos debemos conocer el monto, el plazo, la tasa y la cuota, y verificar nuestra capacidad de pago para no caer en sobreendeudamiento.',
  },
  {
    icon: ShieldCheck,
    modulo: 'Lo que debes saber',
    href: '/lo-que-debes-saber#seguridad-financiera',
    titulo: 'Un buen historial y la seguridad digital nos protegen',
    texto:
      'Pagar a tiempo construye confianza ante las entidades, y nunca compartir claves ni códigos evita ser víctima de fraudes como el phishing o el smishing.',
  },
  {
    icon: TrendingUp,
    modulo: 'Lo que debes saber',
    href: '/lo-que-debes-saber#inversion-patrimonio',
    titulo: 'Invertir con responsabilidad hace crecer el patrimonio',
    texto:
      'El patrimonio crece al ahorrar, invertir según nuestro perfil de riesgo y reducir las deudas. Siempre a través de entidades autorizadas y vigiladas.',
  },
  {
    icon: Calculator,
    modulo: 'Simuladores y práctica',
    href: '/simuladores',
    titulo: 'Simular y practicar antes de decidir',
    texto:
      'Los simuladores, casos y actividades permiten comparar escenarios y aplicar lo aprendido sin riesgo, convirtiendo la teoría en decisiones reales.',
  },
];

type Referencia = { autor: string; anio: string; titulo: string; detalle?: string; url?: string };

const BIBLIOGRAFIA: { icon: LucideIcon; categoria: string; color: string; refs: Referencia[] }[] = [
  {
    icon: Landmark,
    categoria: 'Entidades oficiales de Colombia',
    color: 'bg-brand-500',
    refs: [
      { autor: 'Banco de la República', anio: 's. f.', titulo: 'Educación económica y financiera', url: 'https://www.banrep.gov.co' },
      { autor: 'Superintendencia Financiera de Colombia', anio: 's. f.', titulo: 'Educación financiera y protección al consumidor financiero', url: 'https://www.superfinanciera.gov.co' },
      { autor: 'Fondo de Garantías de Instituciones Financieras [Fogafín]', anio: 's. f.', titulo: 'Seguro de depósitos', url: 'https://www.fogafin.gov.co' },
      { autor: 'Banca de las Oportunidades', anio: 's. f.', titulo: 'Reportes de inclusión financiera en Colombia', url: 'https://www.bancadelasoportunidades.gov.co' },
      {
        autor: 'Comisión Intersectorial para la Educación Económica y Financiera',
        anio: '2017',
        titulo: 'Estrategia Nacional de Educación Económica y Financiera de Colombia',
      },
      {
        autor: 'Ministerio de Educación Nacional',
        anio: '2014',
        titulo: 'Mi plan, mi vida y mi futuro: orientaciones pedagógicas para la educación económica y financiera',
        detalle: 'Documento n.º 26',
      },
    ],
  },
  {
    icon: Scale,
    categoria: 'Normatividad',
    color: 'bg-brand-700',
    refs: [
      {
        autor: 'Congreso de la República de Colombia',
        anio: '2008',
        titulo: 'Ley 1266 de 2008',
        detalle: 'Hábeas data y manejo de la información financiera y crediticia',
      },
      {
        autor: 'Congreso de la República de Colombia',
        anio: '2009',
        titulo: 'Ley 1328 de 2009',
        detalle: 'Régimen de protección al consumidor financiero',
      },
      {
        autor: 'Congreso de la República de Colombia',
        anio: '2021',
        titulo: 'Ley 2157 de 2021',
        detalle: 'Modifica la Ley 1266 de 2008 (“Borrón y cuenta nueva”)',
      },
    ],
  },
  {
    icon: Globe,
    categoria: 'Organismos internacionales',
    color: 'bg-brand-300',
    refs: [
      {
        autor: 'Organización para la Cooperación y el Desarrollo Económicos [OCDE]',
        anio: '2005',
        titulo: 'Recommendation on principles and good practices for financial education and awareness',
        detalle: 'OECD Publishing',
      },
      {
        autor: 'Organización para la Cooperación y el Desarrollo Económicos [OCDE]',
        anio: '2020',
        titulo: 'OECD/INFE 2020 international survey of adult financial literacy',
        detalle: 'OECD Publishing',
      },
    ],
  },
  {
    icon: BookOpen,
    categoria: 'Libros de referencia',
    color: 'bg-amber-400',
    refs: [
      { autor: 'Warren, E., y Warren Tyagi, A.', anio: '2005', titulo: 'All your worth: The ultimate lifetime money plan', detalle: 'Origen de la regla 50/30/20' },
      { autor: 'Clason, G. S.', anio: '1926', titulo: 'El hombre más rico de Babilonia' },
      { autor: 'Kiyosaki, R. T., y Lechter, S. L.', anio: '1997', titulo: 'Padre rico, padre pobre' },
    ],
  },
  {
    icon: Laptop,
    categoria: 'Recursos educativos y de seguridad',
    color: 'bg-navy-900',
    refs: [
      { autor: 'Asobancaria', anio: 's. f.', titulo: 'Saber más, ser más: programa de educación financiera', url: 'https://www.sabermassermas.com' },
      { autor: 'Policía Nacional de Colombia', anio: 's. f.', titulo: 'CAI Virtual: prevención de delitos informáticos', url: 'https://caivirtual.policia.gov.co' },
      { autor: 'Servicio Nacional de Aprendizaje [SENA]', anio: 's. f.', titulo: 'Portal institucional', url: 'https://www.sena.edu.co' },
    ],
  },
];

const TOTAL_REFS = BIBLIOGRAFIA.reduce((acc, g) => acc + g.refs.length, 0);

export default function ConclusionesPage() {
  return (
    <>
      <PageHero
        page={page}
        eyebrow="Cierre del recorrido"
        title="Conclusiones y"
        highlight="bibliografía"
        description="Un resumen de las ideas clave de cada módulo, las fuentes que respaldan el contenido y el equipo que hizo posible este sistema."
        icon={Flag}
      />

      {/* CONCLUSIONES */}
      <Section id="conclusiones" eyebrow="Lo que aprendimos" title="Conclusiones" subtitle="Siete ideas para llevar a la práctica">
        <ol className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {CONCLUSIONES.map((c, i) => (
            <li
              key={c.titulo}
              className={`group relative flex flex-col bg-white rounded-3xl border border-slate-200 p-6 overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/10 hover:border-brand-300 transition-all ${
                i === CONCLUSIONES.length - 1 ? 'md:col-span-2 xl:col-span-3 xl:flex-row xl:items-center xl:gap-6' : ''
              }`}
            >
              <span className="absolute -top-4 -right-2 text-[88px] font-black leading-none text-brand-50 select-none pointer-events-none">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="relative w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center shadow-md shadow-brand-600/20">
                <c.icon className="w-6 h-6" />
              </span>
              <div className="relative flex-1 flex flex-col mt-4 xl:mt-0 gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600">{c.modulo}</span>
                <h3 className="text-lg font-bold text-navy-900 leading-snug">{c.titulo}</h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-1">{c.texto}</p>
                <Link
                  href={c.href}
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900 self-start"
                >
                  Repasar módulo
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </li>
          ))}
        </ol>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-brand-800 to-brand-600 text-white p-7 sm:p-10">
          <div className="absolute -right-16 -bottom-20 w-72 h-72 bg-brand-300/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <Quote className="w-12 h-12 text-brand-300 lg:col-span-1" />
            <div className="lg:col-span-8 space-y-2">
              <p className="text-xl sm:text-2xl font-extrabold leading-snug">
                Manejar bien el dinero no depende de cuánto ganas, sino de las decisiones que tomas con lo que tienes.
              </p>
              <p className="text-brand-100/90 italic">SENA FINANZAS S.A. — Tu conocimiento, tu mejor inversión.</p>
            </div>
            <div className="lg:col-span-3 flex lg:justify-end">
              <Link
                href="/practica-aprendizaje#actividades"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-300 hover:bg-brand-200 text-navy-900 font-bold text-sm shadow-lg transition-colors"
              >
                Pon a prueba lo aprendido
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* BIBLIOGRAFÍA */}
      <Section id="bibliografia" eyebrow="Fuentes consultadas" title="Bibliografía" tone="mint">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 -mt-2">
          <p className="text-sm text-slate-600 max-w-2xl">
            Referencias que respaldan el contenido del sitio, organizadas por tipo de fuente y citadas según las normas <strong>APA 7.ª edición</strong>.
          </p>
          <div className="flex gap-2 text-xs font-bold">
            <span className="px-3 py-1.5 rounded-full bg-navy-900 text-white">{TOTAL_REFS} referencias</span>
            <span className="px-3 py-1.5 rounded-full bg-brand-100 text-brand-800">{BIBLIOGRAFIA.length} categorías</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {BIBLIOGRAFIA.map((grupo) => (
            <section key={grupo.categoria} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <header className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
                <span className={`w-10 h-10 rounded-xl ${grupo.color} text-white flex items-center justify-center shrink-0`}>
                  <grupo.icon className="w-5 h-5" />
                </span>
                <h3 className="font-bold text-navy-900 flex-1">{grupo.categoria}</h3>
                <span className="text-xs font-bold text-slate-400">{grupo.refs.length}</span>
              </header>
              <ul className="divide-y divide-slate-100">
                {grupo.refs.map((r) => (
                  <li key={r.titulo} className="px-5 py-4 flex gap-3 hover:bg-brand-50/50 transition-colors">
                    <span className="w-1.5 shrink-0 rounded-full bg-brand-200" />
                    <div className="min-w-0 space-y-1.5">
                      <p className="text-sm text-slate-700 leading-relaxed pl-6 -indent-6">
                        {r.autor}. ({r.anio}). <em className="text-navy-900">{r.titulo}</em>
                        {r.detalle ? `. ${r.detalle}` : ''}.
                      </p>
                      {r.url && (
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:text-brand-900 break-all"
                        >
                          {r.url.replace('https://', '')}
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Section>

      {/* DESARROLLADO POR */}
      <Section id="desarrollado-por" eyebrow="Créditos" title="Desarrollado por">
        <div className="relative overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-brand-100 shadow-sm">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-brand-200/40 rounded-full blur-3xl pointer-events-none" />
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center gap-4 p-8 bg-navy-900 text-white">
              <div className="w-32 h-32 rounded-3xl bg-white p-3 shadow-xl">
                <Image src="/img/Logo-de-SENA-png-verde-300x300-1.png" alt="Logo SENA" width={300} height={300} className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="text-xl font-extrabold">SENA</p>
                <p className="text-sm text-brand-200">Servicio Nacional de Aprendizaje</p>
              </div>
              <span className="inline-flex items-start gap-1.5 text-xs text-slate-300 max-w-xs">
                <MapPin className="w-3.5 h-3.5 text-brand-300 shrink-0 mt-0.5" />
                Centro Pecuario y Agroempresarial Regional Caldas – SENA
              </span>
            </div>

            <div className="lg:col-span-8 p-6 sm:p-8 lg:p-10 space-y-6">
              <div className="flex items-start gap-4">
                <span className="w-12 h-12 shrink-0 rounded-2xl bg-brand-500 text-white flex items-center justify-center shadow-md">
                  <Users className="w-6 h-6" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-600">Equipo de desarrollo</p>
                  <p className="text-xl sm:text-2xl font-extrabold text-navy-900 leading-tight">GESTIÓN BANCARIA Y DE ENTIDADES FINANCIERAS</p>
                  <span className="inline-flex mt-1.5 px-3 py-1 rounded-full bg-navy-900 text-brand-200 text-sm font-bold tracking-wide">Ficha 3230956</span>
                </div>
              </div>

              <div className="rounded-2xl bg-white border border-brand-200 p-5 space-y-2">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <Award className="w-4 h-4 text-amber-500" />
                  En el marco de la competencia
                </p>
                <p className="text-base sm:text-lg font-bold text-navy-900 leading-snug">
                  “Aplicar tecnologías de la información teniendo en cuenta las necesidades de la unidad administrativa”
                </p>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-brand-700 to-brand-500 text-white p-5">
                <span className="w-12 h-12 shrink-0 rounded-full bg-white/15 border border-white/30 flex items-center justify-center">
                  <UserRound className="w-6 h-6" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-100">Orientado por el instructor</p>
                  <p className="text-lg sm:text-xl font-extrabold">Junior Alexander Celis Bedoya</p>
                </div>
              </div>

              <p className="text-xs text-slate-500">Sitio de demostración con fines académicos. La información no se almacena ni se envía a ningún servidor.</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
