'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  CreditCard, 
  PiggyBank, 
  ShieldCheck, 
  Layers, 
  PhoneCall, 
  ArrowRight 
} from 'lucide-react';
import { FAQ } from '@/types';

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [categoria, setCategoria] = useState<string>('todas');
  const [busqueda, setBusqueda] = useState<string>('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/faqs')
      .then((res) => res.json())
      .then((data: FAQ[]) => {
        if (Array.isArray(data)) {
          setFaqs(data);
          // Abrir el primer FAQ por defecto
          if (data.length > 0) {
            setOpenIds({ [data[0].id]: true });
          }
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const categorias = [
    { id: 'todas', label: 'Todas las preguntas' },
    { id: 'creditos', label: 'Créditos' },
    { id: 'cdt', label: 'CDT e Inversión' },
    { id: 'productos', label: 'Productos y Seguridad' },
    { id: 'sistema', label: 'Uso del Sistema' },
  ];

  const faqsFiltradas = faqs.filter((faq) => {
    const coincideCat = categoria === 'todas' || faq.categoria === categoria;
    const coincideTexto =
      faq.pregunta.toLowerCase().includes(busqueda.toLowerCase()) ||
      faq.respuesta.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCat && coincideTexto;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Encabezado */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-800 bg-brand-100 px-3.5 py-1.5 rounded-full">
          Centro de Ayuda y Soporte
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Preguntas Frecuentes
        </h1>
        <p className="text-base text-slate-600">
          Encuentra respuestas inmediatas sobre nuestras líneas de crédito, inversiones en CDT, cuentas y el uso de este portal bancario.
        </p>
      </div>

      {/* Buscador de preguntas */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="¿Qué inquietud deseas resolver? Ej. amortización, Fogafín, retención..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-2xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-600 shadow-xs transition-all"
        />
      </div>

      {/* Filtros de Categorías */}
      <div className="flex flex-wrap justify-center gap-2">
        {categorias.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoria(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              categoria === cat.id
                ? 'bg-brand-700 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Lista de Acordeones */}
      {loading ? (
        <div className="text-center py-16 text-slate-400">Cargando preguntas frecuentes...</div>
      ) : faqsFiltradas.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No encontramos coincidencias para tu búsqueda</h3>
          <p className="text-xs text-slate-500 mt-1">
            Puedes formular tu pregunta directamente a través de nuestro formulario de contacto.
          </p>
          <div className="mt-4">
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-700 text-white text-xs font-semibold"
            >
              <span>Ir a Contacto</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {faqsFiltradas.map((faq) => {
            const isOpen = !!openIds[faq.id];
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex justify-between items-center gap-4 hover:bg-slate-50/70 transition-colors"
                >
                  <span className="font-bold text-slate-900 text-base sm:text-lg">
                    {faq.pregunta}
                  </span>
                  <span className="p-1 rounded-full bg-slate-100 text-slate-500 shrink-0">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100 bg-slate-50/40 animate-in fade-in duration-200">
                    <p>{faq.respuesta}</p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-brand-700 font-semibold">
                      <span className="capitalize px-2 py-0.5 rounded bg-brand-100/70">
                        Categoría: {faq.categoria}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Banner de Contacto adicional */}
      <div className="bg-gradient-to-r from-brand-700 via-brand-800 to-navy-950 text-white p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl font-bold">¿Tienes alguna duda no resuelta?</h3>
          <p className="text-xs text-slate-300">
            Nuestros asesores de servicio están listos para atenderte por chat, teléfono o correo.
          </p>
        </div>
        <Link
          href="/#contacto"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-slate-950 font-bold text-sm transition-all shadow-md shrink-0"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Contáctanos Ahora</span>
        </Link>
      </div>

    </div>
  );
}
