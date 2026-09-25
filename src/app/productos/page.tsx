'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  CreditCard, 
  PiggyBank, 
  Wallet, 
  CheckCircle2, 
  ArrowRight, 
  Calculator, 
  Sparkles,
  Info,
  Layers
} from 'lucide-react';
import { Producto, CategoriaProducto } from '@/types';

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('todos');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/data/productos.json')
      .then((res) => {
        if (!res.ok) {
          // Si no está en public, intentamos desde API o endpoint
          return fetch('/api/productos');
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setProductos(data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const categorias = [
    { id: 'todos', nombre: 'Todos los Productos', icono: Layers },
    { id: 'cuentas', nombre: 'Cuentas de Ahorro', icono: Wallet },
    { id: 'cdt', nombre: 'Inversión y CDT', icono: PiggyBank },
    { id: 'creditos', nombre: 'Líneas de Crédito', icono: CreditCard },
  ];

  const productosFiltrados =
    categoriaSeleccionada === 'todos'
      ? productos
      : productos.filter((p) => p.categoria === categoriaSeleccionada);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3.5 py-1.5 rounded-full">
          Portafolio Financiero Institucional
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Productos y Servicios a tu Medida
        </h1>
        <p className="text-base text-slate-600">
          Encuentra la solución bancaria adecuada con tasas transparentes, asesoría personalizada y respaldo garantizado.
        </p>
      </div>

      {/* Tabs de Filtro */}
      <div className="flex flex-wrap justify-center gap-2">
        {categorias.map((cat) => {
          const Icon = cat.icono;
          const isActive = categoriaSeleccionada === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setCategoriaSeleccionada(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-blue-700 text-white shadow-sm shadow-blue-700/20'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.nombre}</span>
            </button>
          );
        })}
      </div>

      {/* Grid de Productos */}
      {loading ? (
        <div className="text-center py-20 text-slate-400">Cargando productos financieros...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productosFiltrados.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-7 space-y-5">
                {/* Header de la tarjeta */}
                <div className="flex justify-between items-start gap-2">
                  <span className="text-xs font-semibold px-3 py-1 rounded-md bg-slate-100 text-slate-700 uppercase tracking-wide">
                    {prod.categoriaNombre}
                  </span>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                      {prod.tasaReferencial}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {prod.nombre}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {prod.descripcion}
                  </p>
                </div>

                {/* Características clave */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="text-xs font-bold uppercase text-slate-500 tracking-wider">Beneficios Principales</div>
                  {prod.caracteristicas.map((caract, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{caract}</span>
                    </div>
                  ))}
                </div>

                {/* Requisitos */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="text-xs font-bold uppercase text-slate-500 tracking-wider">Requisitos Básicos</div>
                  {prod.requisitos.map((req, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botón de acción */}
              <div className="p-6 bg-slate-50 border-t border-slate-100">
                {prod.categoria === 'creditos' ? (
                  <Link
                    href={`/simulador-credito`}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm transition-all shadow-sm"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>Simular este Crédito</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : prod.categoria === 'cdt' ? (
                  <Link
                    href={`/simulador-cdt`}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-sm"
                  >
                    <PiggyBank className="w-4 h-4" />
                    <span>Calcular Rentabilidad CDT</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <Link
                    href={`/contacto?asunto=Informacion-${encodeURIComponent(prod.nombre)}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all shadow-sm"
                  >
                    <span>Solicitar Información</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Nota legal Fogafin */}
      <div className="p-6 bg-blue-50/70 border border-blue-200/80 rounded-2xl flex items-center gap-4 text-xs text-blue-900">
        <Info className="w-6 h-6 text-blue-700 shrink-0" />
        <p>
          Las tasas y condiciones de los productos financieros son de carácter informativo y pueden variar conforme a las políticas vigentes de la entidad y la evaluación de riesgo crediticio particular. Los depósitos en cuenta de ahorros y CDT están amparados por el seguro de depósitos Fogafín.
        </p>
      </div>

    </div>
  );
}
