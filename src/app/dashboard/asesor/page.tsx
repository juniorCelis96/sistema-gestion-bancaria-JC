'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  Calculator, 
  PiggyBank, 
  FileText, 
  CheckCircle2, 
  Clock, 
  PlusCircle, 
  LogOut,
  TrendingUp,
  Search
} from 'lucide-react';
import { SimulacionGuardada, Usuario } from '@/types';
import { formatCOP } from '@/lib/financial-math';

export default function AsesorDashboardPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [simulaciones, setSimulaciones] = useState<SimulacionGuardada[]>([]);
  const [cargando, setCargando] = useState(true);
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');

  useEffect(() => {
    // Validar sesión
    const saved = localStorage.getItem('banco_user');
    if (!saved) {
      router.push('/login');
      return;
    }
    const userObj = JSON.parse(saved);
    setUsuario(userObj);

    // Cargar simulaciones guardadas
    fetch('/api/simulaciones')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSimulaciones(data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setCargando(false));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('banco_user');
    router.push('/');
  };

  const simulacionesFiltradas =
    filtroTipo === 'todos'
      ? simulaciones
      : simulaciones.filter((s) => s.tipo === filtroTipo);

  if (!usuario) {
    return <div className="text-center py-20 text-slate-400">Verificando autorización...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Banner de Bienvenida del Asesor */}
      <div className="bg-gradient-to-r from-blue-900 via-navy-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <span>Perfil: Asesor Financiero</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Bienvenido, {usuario.nombre}
          </h1>
          <p className="text-xs text-slate-300">
            {usuario.cargo || 'Asesor Financiero'} • Sede: {usuario.sucursal || 'La Dorada, Caldas'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/simulador-credito"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs"
          >
            <Calculator className="w-4 h-4" />
            <span>Nueva Simulación Crédito</span>
          </Link>
          <Link
            href="/simulador-cdt"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs"
          >
            <PiggyBank className="w-4 h-4" />
            <span>Nueva Simulación CDT</span>
          </Link>
          <button
            onClick={handleLogout}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-red-900/60 text-slate-300 hover:text-white transition-colors"
            title="Cerrar sesión"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Métricas del Asesor */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold uppercase text-slate-400">Total Simulaciones Registradas</div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">{simulaciones.length}</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">Cotizaciones registradas en la base local</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold uppercase text-slate-400">Simulaciones de Crédito</div>
          <div className="text-3xl font-extrabold text-blue-700 mt-2">
            {simulaciones.filter((s) => s.tipo === 'credito').length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Créditos analizados</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold uppercase text-slate-400">Simulaciones de CDT</div>
          <div className="text-3xl font-extrabold text-emerald-700 mt-2">
            {simulaciones.filter((s) => s.tipo === 'cdt').length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Inversiones proyectadas</div>
        </div>
      </div>

      {/* Historial de Simulaciones */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Historial de Simulaciones y Cotizaciones
            </h2>
            <p className="text-xs text-slate-500">
              Consulta las cotizaciones generadas para los clientes en sala o vía web
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFiltroTipo('todos')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                filtroTipo === 'todos' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFiltroTipo('credito')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                filtroTipo === 'credito' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              Créditos
            </button>
            <button
              onClick={() => setFiltroTipo('cdt')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                filtroTipo === 'cdt' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              CDTs
            </button>
          </div>
        </div>

        {cargando ? (
          <div className="text-center py-12 text-slate-400">Cargando cotizaciones...</div>
        ) : simulacionesFiltradas.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs">
            No se han registrado cotizaciones en esta categoría.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 uppercase font-bold">
                <tr>
                  <th className="py-3 px-4">Fecha</th>
                  <th className="py-3 px-4">Tipo</th>
                  <th className="py-3 px-4">Cliente</th>
                  <th className="py-3 px-4">Monto Base</th>
                  <th className="py-3 px-4">Detalles</th>
                  <th className="py-3 px-4">Generado Por</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {simulacionesFiltradas.map((sim) => {
                  const esCredito = sim.tipo === 'credito';
                  const detallesC = sim.detalles as any;
                  return (
                    <tr key={sim.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 text-slate-500">
                        {new Date(sim.fecha).toLocaleDateString('es-CO', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-md font-semibold text-[10px] uppercase ${
                            esCredito
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {esCredito ? 'Crédito' : 'CDT'}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {sim.clienteNombre}
                        {sim.clienteEmail && (
                          <div className="text-[10px] font-normal text-slate-500">
                            {sim.clienteEmail}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-800">
                        {formatCOP(esCredito ? detallesC.monto : detallesC.montoInversion)}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {esCredito ? (
                          <div>
                            <span>Cuota: <strong>{formatCOP(detallesC.cuotaMensual)}</strong> / mes</span>
                            <span className="block text-[10px] text-slate-400">Plazo: {detallesC.plazoMeses} meses</span>
                          </div>
                        ) : (
                          <div>
                            <span>Rendimiento Neto: <strong className="text-emerald-700">{formatCOP(detallesC.rendimientoNeto)}</strong></span>
                            <span className="block text-[10px] text-slate-400">Plazo: {detallesC.plazoDias} días</span>
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-500 text-[11px]">
                        {sim.creadoPor}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
