import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, ShieldCheck, Clock, Award, Smartphone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-brand-900 print:hidden">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-white p-1 shadow-md shrink-0">
                <Image
                  src="/logo_sena_fin_fondo_blanco.jpeg"
                  alt="SENA FINANZAS S.A."
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span translate="no" className="notranslate text-xl font-bold tracking-tight text-white">
                  SENA FINANZAS <span className="text-xs font-semibold px-2 py-0.5 rounded bg-brand-500/20 text-brand-300">S.A.</span>
                </span>
                <p className="text-xs italic text-brand-200/80 mt-0.5">Tu conocimiento, tu mejor inversión</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed pr-6">
              Entidad financiera comprometida con el desarrollo socioeconómico, brindando soluciones integrales de crédito, ahorro e inversión con transparencia, solidez y altos estándares tecnológicos.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-brand-400">
                <ShieldCheck className="w-4 h-4 text-brand-400" />
                <span>Depósitos Asegurados por Fogafín</span>
              </div>
              <div className="flex items-center gap-2 text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-brand-400">
                <Award className="w-4 h-4 text-brand-400" />
                <span>Superintendencia Financiera</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">Aprende</h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {[
                ['Educación financiera', '/educacion-financiera'],
                ['Ahorro con propósito', '/ahorro-con-proposito'],
                ['Productos financieros', '/productos-financieros'],
                ['Lo que debes saber', '/lo-que-debes-saber'],
                ['Práctica de aprendizaje', '/practica-aprendizaje'],
                ['Conclusiones y bibliografía', '/conclusiones'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-brand-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">Herramientas</h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {[
                ['Simulador de crédito', '/simuladores#simulador-credito'],
                ['Simulador de CDT', '/simuladores#simulador-cdt'],
                ['Simulador de meta de ahorro', '/simuladores#simulador-ahorro'],
                ['Taller de presupuesto', '/taller-presupuesto'],
                ['Catálogo de productos', '/productos'],
                ['Oficinas', '/oficinas'],
                ['Preguntas frecuentes (FAQ)', '/faq'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-brand-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Canales de Contacto */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">Atención</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span>
                  Carrera 1 #21-42
                  <br />
                  La Dorada, Caldas, Colombia
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Smartphone className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span>
                  <span className="block text-[11px] text-slate-500">Celular / Atención</span>
                  +57 322 6830093
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span>
                  <span className="block text-[11px] text-slate-500">Fijo institucional</span>
                  (606) 8573904
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <span>contacto@senafinanzas.com.co</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-brand-400 shrink-0" />
                <span>Lun - Vie: 8:00 AM - 4:30 PM</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex justify-center">
          <Image
            src="/img/2090px-Sena_Colombia_logo_naranjado.svg_.png"
            alt="Logo SENA"
            width={2090}
            height={2048}
            className="w-20 h-auto sm:w-24"
          />
        </div>

        {/* banca */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 text-center md:text-left">
          <div>
            <span className="text-slate-400 font-semibold">Sistema de Información para una Entidad Financiera</span>
            <span className="mx-2">•</span>
            <span>Centro Pecuario y Agroempresarial Regional Caldas – SENA</span>
          </div>
          <Link href="/conclusiones#desarrollado-por" className="text-center md:text-right hover:text-slate-300 transition-colors">
            <span>Desarrollado por: <strong>GESTIÓN BANCARIA Y DE ENTIDADES FINANCIERAS – Ficha 3230956</strong></span>
            <span className="mx-2">•</span>
            <span>Instructor: <strong>Junior Alexander Celis Bedoya</strong></span>
          </Link>
        </div>

        <div className="mt-4 text-center text-xs text-slate-600 space-y-1.5">
          <p>© {new Date().getFullYear()} SENA FINANZAS S.A. Todos los derechos reservados. Sitio de demostración con fines académicos.</p>
          <p className="text-[11px] text-slate-600">
            <a href="https://www.flaticon.es/iconos-gratis/espana" title="españa iconos" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 underline-offset-2 hover:underline">
              España iconos creados por verluk - Flaticon
            </a>
            <span className="mx-2">•</span>
            <a href="https://www.flaticon.es/iconos-gratis/estados-unidos" title="estados unidos iconos" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 underline-offset-2 hover:underline">
              Estados unidos iconos creados por IconMarketPK - Flaticon
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
