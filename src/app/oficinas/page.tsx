'use client';

import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Building2, 
  CreditCard, 
  Clock, 
  Phone, 
  Search, 
  Filter, 
  CheckCircle2, 
  Navigation
} from 'lucide-react';
import { Oficina } from '@/types';

export default function OficinasPage() {
  const [oficinas, setOficinas] = useState<Oficina[]>([]);
  const [tipoFiltro, setTipoFiltro] = useState<string>('todos');
  const [ciudadFiltro, setCiudadFiltro] = useState<string>('todas');
  const [busqueda, setBusqueda] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/oficinas')
      .then((res) => res.json())
      .then((data: Oficina[]) => {
        if (Array.isArray(data)) {
          setOficinas(data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const ciudades = ['todas', ...Array.from(new Set(oficinas.map((o) => o.ciudad)))];

  const oficinasFiltradas = oficinas.filter((of) => {
    const coincideTipo = tipoFiltro === 'todos' || of.tipo === tipoFiltro;
    const coincideCiudad = ciudadFiltro === 'todas' || of.ciudad.toLowerCase() === ciudadFiltro.toLowerCase();
    const coincideTexto =
      of.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      of.direccion.toLowerCase().includes(busqueda.toLowerCase()) ||
      of.ciudad.toLowerCase().includes(busqueda.toLowerCase());

    return coincideTipo && coincideCiudad && coincideTexto;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Encabezado */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3.5 py-1.5 rounded-full">
          Canales de Atención Presencial
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Red de Sucursales y Cajeros
        </h1>
        <p className="text-base text-slate-600">
          Encuentra la oficina o cajero automático más cercano a ti. Consulta direcciones exactas, horarios y servicios disponibles.
        </p>
      </div>

      {/* Controles de Búsqueda y Filtros */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Buscador de texto */}
          <div className="md:col-span-6 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por nombre, dirección o sector..."
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            />
          </div>

          {/* Filtro por Tipo */}
          <div className="md:col-span-3">
            <select
              value={tipoFiltro}
              onChange={(e) => setTipoFiltro(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            >
              <option value="todos">Todos los puntos de atención</option>
              <option value="sucursal">Solo Sucursales Bancarias</option>
              <option value="cajero">Solo Cajeros Automáticos</option>
            </select>
          </div>

          {/* Filtro por Ciudad */}
          <div className="md:col-span-3">
            <select
              value={ciudadFiltro}
              onChange={(e) => setCiudadFiltro(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            >
              {ciudades.map((c) => (
                <option key={c} value={c}>
                  {c === 'todas' ? 'Todas las ciudades' : c}
                </option>
              ))}
            </select>
          </div>

        </div>

        <div className="flex justify-between items-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>Mostrando <strong>{oficinasFiltradas.length}</strong> puntos de atención encontrados</span>
          {(busqueda || tipoFiltro !== 'todos' || ciudadFiltro !== 'todas') && (
            <button
              onClick={() => {
                setBusqueda('');
                setTipoFiltro('todos');
                setCiudadFiltro('todas');
              }}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Listado de Oficinas y Cajeros */}
      {loading ? (
        <div className="text-center py-20 text-slate-400">Cargando directorio de oficinas...</div>
      ) : oficinasFiltradas.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No se encontraron oficinas o cajeros</h3>
          <p className="text-xs text-slate-500 mt-1">Intenta con otros términos de búsqueda o ciudad.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {oficinasFiltradas.map((of) => {
            const esSucursal = of.tipo === 'sucursal';
            return (
              <div
                key={of.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Tipo Badge */}
                  <div className="flex justify-between items-start">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                        esSucursal
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {esSucursal ? <Building2 className="w-3.5 h-3.5" /> : <CreditCard className="w-3.5 h-3.5" />}
                      <span>{esSucursal ? 'Sucursal' : 'Cajero 24H'}</span>
                    </span>
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {of.ciudad}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{of.nombre}</h3>
                    <div className="flex items-start gap-2 text-xs text-slate-600 mt-2">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span>{of.direccion}</span>
                    </div>
                  </div>

                  {/* Horario */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 space-y-1">
                    <div className="font-semibold flex items-center gap-1.5 text-slate-900">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>Horario de Atención:</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{of.horario}</p>
                  </div>

                  {/* Teléfono */}
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{of.telefono}</span>
                  </div>

                  {/* Servicios */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Servicios</div>
                    <div className="flex flex-wrap gap-1.5">
                      {of.servicios.map((s, i) => (
                        <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      `${of.nombre} ${of.direccion} ${of.ciudad}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-blue-600" />
                    <span>Cómo Llegar (Google Maps)</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
