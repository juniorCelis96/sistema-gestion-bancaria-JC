import React from 'react';
import Link from 'next/link';
import { Building2, Phone, Mail, MapPin, ShieldCheck, Clock, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-slate-800">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-emerald-500 flex items-center justify-center text-white shadow-md">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                BANCO JC <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">FINANCIERA</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed pr-6">
              Entidad financiera comprometida con el desarrollo socioeconómico, brindando soluciones integrales de crédito, ahorro e inversión con transparencia, solidez y altos estándares tecnológicos.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-emerald-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Depósitos Asegurados por Fogafín</span>
              </div>
              <div className="flex items-center gap-2 text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-blue-400">
                <Award className="w-4 h-4 text-blue-400" />
                <span>Superintendencia Financiera</span>
              </div>
            </div>
          </div>

          {/* Enlaces de Productos */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">Portafolio</h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/productos" className="hover:text-emerald-400 transition-colors">
                  Cuentas de Ahorro
                </Link>
              </li>
              <li>
                <Link href="/productos" className="hover:text-emerald-400 transition-colors">
                  CDT Tasa Fija
                </Link>
              </li>
              <li>
                <Link href="/productos" className="hover:text-emerald-400 transition-colors">
                  Crédito Libre Inversión
                </Link>
              </li>
              <li>
                <Link href="/productos" className="hover:text-emerald-400 transition-colors">
                  Crédito Hipotecario
                </Link>
              </li>
              <li>
                <Link href="/productos" className="hover:text-emerald-400 transition-colors">
                  Crédito de Libranza
                </Link>
              </li>
            </ul>
          </div>

          {/* Herramientas de Simulación */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">Simuladores</h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/simulador-credito" className="hover:text-emerald-400 transition-colors">
                  Simular Crédito
                </Link>
              </li>
              <li>
                <Link href="/simulador-cdt" className="hover:text-emerald-400 transition-colors">
                  Simular Rendimiento CDT
                </Link>
              </li>
              <li>
                <Link href="/oficinas" className="hover:text-emerald-400 transition-colors">
                  Red de Sucursales y Cajeros
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-emerald-400 transition-colors">
                  Preguntas Frecuentes (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-emerald-400 transition-colors">
                  Portal de Asesores y Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Canales de Contacto */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">Atención</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Calle 14 # 3-28 Centro, La Dorada - Caldas</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>(606) 857 2300</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>contacto@bancojc.com.co</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Lun - Vie: 8:00 AM - 4:30 PM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Project Metadata & Academic Credits as per EV9 document */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            <span className="text-slate-400 font-semibold">EV9 – Sistema de Información para una Entidad Financiera</span>
            <span className="mx-2">•</span>
            <span>Centro Pecuario y Agroempresarial - SENA</span>
          </div>
          <div>
            <span>Elaborado por: <strong>Michell Mariana Castaño Paniagua</strong> (ID: 3230956)</span>
            <span className="mx-2">•</span>
            <span>Instructor: <strong>Junior Celis</strong></span>
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} BANCO JC. Todos los derechos reservados. Desarrollado con Next.js App Router & Tailwind CSS.
        </div>
      </div>
    </footer>
  );
}
