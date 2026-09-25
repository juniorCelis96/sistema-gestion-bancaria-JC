import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Calculator, 
  PiggyBank, 
  ShieldCheck, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  PhoneCall, 
  Users, 
  Clock, 
  Award,
  Sparkles
} from 'lucide-react';
import { getProductos } from '@/lib/db';
import { formatCOP } from '@/lib/financial-math';

export default async function HomePage() {
  const productos = await getProductos();
  const productosDestacados = productos.filter((p) => p.destacado);

  return (
    <div className="space-y-16 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-blue-950 to-slate-900 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 border-b border-blue-900/40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-700/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Entidad Financiera Vigilada • Respaldo Fogafín</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Impulsamos tus metas con <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-300 to-teal-200">solidez y confianza</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
                Descubre nuestra oferta de productos financieros, simula tu crédito a cuotas fijas o calcula la rentabilidad de tu CDT con tasas preferenciales y respuesta inmediata.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
                <Link
                  href="/simulador-credito"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-base shadow-lg shadow-emerald-600/30 hover:scale-[1.02] transition-all"
                >
                  <Calculator className="w-5 h-5" />
                  <span>Simular Crédito</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/simulador-cdt"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-base backdrop-blur-sm transition-all"
                >
                  <PiggyBank className="w-5 h-5 text-emerald-400" />
                  <span>Invertir en CDT</span>
                </Link>

                <Link
                  href="/productos"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-slate-300 hover:text-white font-medium text-sm transition-colors"
                >
                  <span>Ver Todos los Productos</span>
                </Link>
              </div>

              {/* Badges de confianza */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800/80 text-left">
                <div>
                  <div className="text-2xl font-bold text-white">11.80%</div>
                  <div className="text-xs text-slate-400">Tasa E.A. Máxima CDT</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">0.95%</div>
                  <div className="text-xs text-slate-400">Tasa M.V. Hipotecario</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-400">100%</div>
                  <div className="text-xs text-slate-400">Digital y Seguro</div>
                </div>
              </div>
            </div>

            {/* Banner Quick Sim Box */}
            <div className="lg:col-span-5">
              <div className="bg-white/95 text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-950/40 border border-slate-200">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Simulador Exprés</h3>
                    <p className="text-xs text-slate-500">Calcula tu crédito en segundos</p>
                  </div>
                  <span className="p-2.5 rounded-xl bg-blue-50 text-blue-700">
                    <Calculator className="w-5 h-5" />
                  </span>
                </div>

                <div className="space-y-4 my-6">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                    <div className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Ejemplo Crédito Libre Inversión</div>
                    <div className="text-2xl font-extrabold text-blue-900 mt-1">{formatCOP(10000000)}</div>
                    <div className="flex justify-between items-center text-xs text-slate-600 mt-2">
                      <span>Plazo: <strong>36 meses</strong></span>
                      <span>Tasa: <strong>1.45% M.V.</strong></span>
                    </div>
                  </div>

                  <div className="bg-emerald-50/80 p-4 rounded-xl border border-emerald-200/80">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-emerald-800 uppercase">Cuota Mensual Estimada</span>
                      <span className="text-xs font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">Fija</span>
                    </div>
                    <div className="text-3xl font-black text-emerald-700 mt-1">
                      {formatCOP(359770)} <span className="text-xs font-normal text-slate-500">/ mes</span>
                    </div>
                    <p className="text-[11px] text-emerald-800/80 mt-1">
                      Incluye capital e intereses. Sin cobro de estudio de crédito.
                    </p>
                  </div>
                </div>

                <Link
                  href="/simulador-credito"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm transition-all shadow-md"
                >
                  <span>Personalizar mi simulación</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* INFORMACIÓN INSTITUCIONAL Y MISIÓN (PUNTO REQUERIDO POR EV9) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                Nuestra Identidad Institucional
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900">
                Comprometidos con el desarrollo financiero de nuestra comunidad
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Nuestra misión es ofrecer productos y servicios financieros accesibles, transparentes y éticos que generen progreso económico tanto para las familias como para las empresas de la región.
              </p>
              <div className="pt-2">
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800"
                >
                  <span>Conoce nuestros canales de atención</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Seguridad y Respaldo</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Operamos bajo los estándares más estrictos del sistema financiero colombiano con seguro de depósitos Fogafín.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Rentabilidad Garantizada</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Protegemos el poder adquisitivo de tu dinero ofreciendo tasas de CDT altamente competitivas.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-300 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Atención Asistida</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Nuestros asesores financieros están capacitados para estructurar el plan que mejor se ajuste a tus ingresos.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-purple-300 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Agilidad en Respuestas</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Simulaciones en tiempo real y trámites simplificados sin filas ni esperas innecesarias.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Portafolio Destacado
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              Productos diseñados para cada etapa
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Consulta las características de nuestras cuentas, depósitos e instrumentos de crédito.
            </p>
          </div>
          <Link
            href="/productos"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800"
          >
            <span>Ver catálogo completo ({productos.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {productosDestacados.slice(0, 3).map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 uppercase">
                    {prod.categoriaNombre}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                    {prod.tasaReferencial}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{prod.nombre}</h3>
                <p className="text-xs text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                  {prod.descripcion}
                </p>

                <div className="space-y-2 mb-6">
                  {prod.caracteristicas.slice(0, 2).map((c, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                {prod.categoria === 'creditos' ? (
                  <Link
                    href="/simulador-credito"
                    className="text-xs font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1"
                  >
                    <span>Simular este crédito</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : prod.categoria === 'cdt' ? (
                  <Link
                    href="/simulador-cdt"
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                  >
                    <span>Calcular CDT</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <Link
                    href="/productos"
                    className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1"
                  >
                    <span>Ver detalles</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ACCESO RÁPIDO A SIMULADORES Y SUCURSALES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-gradient-to-br from-blue-900 to-navy-950 text-white p-8 rounded-3xl shadow-md flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">Simuladores Financieros</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Utiliza nuestras herramientas matemáticas de alta precisión para proyectar tus créditos con amortización fija o calcular el rendimiento de tu inversión en CDT antes de solicitarlo.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 pt-6">
              <Link
                href="/simulador-credito"
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all"
              >
                Simulador de Crédito
              </Link>
              <Link
                href="/simulador-cdt"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-all"
              >
                Simulador de CDT
              </Link>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Sucursales y Cajeros</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Contamos con presencia en Caldas (Sede Principal en La Dorada y Manizales) y principales ciudades del país. Encuentra horarios, ubicación y servicios disponibles.
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/oficinas"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all"
              >
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Explorar Red de Atención</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
