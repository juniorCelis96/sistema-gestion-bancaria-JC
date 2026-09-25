'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShieldAlert, 
  Settings, 
  MessageSquare, 
  Percent, 
  Save, 
  CheckCircle2, 
  Clock, 
  LogOut, 
  Building2, 
  RefreshCw,
  Users
} from 'lucide-react';
import { MensajeContacto, TasasConfig, Usuario } from '@/types';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [mensajes, setMensajes] = useState<MensajeContacto[]>([]);
  const [tasas, setTasas] = useState<TasasConfig | null>(null);
  const [cargando, setCargando] = useState(true);
  const [guardandoTasas, setGuardandoTasas] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');

  useEffect(() => {
    // Validar sesión y rol admin
    const saved = localStorage.getItem('banco_user');
    if (!saved) {
      router.push('/login');
      return;
    }
    const userObj = JSON.parse(saved);
    if (userObj.rol !== 'admin') {
      router.push('/dashboard/asesor');
      return;
    }
    setUsuario(userObj);

    // Cargar mensajes y tasas
    Promise.all([
      fetch('/api/contacto').then((r) => r.json()),
      fetch('/api/tasas').then((r) => r.json()),
    ])
      .then(([msgs, tasasData]) => {
        if (Array.isArray(msgs)) setMensajes(msgs);
        if (tasasData) setTasas(tasasData);
      })
      .catch((e) => console.error(e))
      .finally(() => setCargando(false));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('banco_user');
    router.push('/');
  };

  const handleCambiarEstadoMensaje = async (id: string, nuevoEstado: 'pendiente' | 'atendido') => {
    try {
      const res = await fetch('/api/contacto', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, estado: nuevoEstado }),
      });
      if (res.ok) {
        setMensajes((prev) =>
          prev.map((m) => (m.id === id ? { ...m, estado: nuevoEstado } : m))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleTasaCreditoChange = (index: number, campo: string, valor: number) => {
    if (!tasas) return;
    const nuevosCreditos = [...tasas.creditos];
    nuevosCreditos[index] = { ...nuevosCreditos[index], [campo]: valor };
    setTasas({ ...tasas, creditos: nuevosCreditos });
  };

  const handleGuardarTasas = async () => {
    if (!tasas) return;
    setGuardandoTasas(true);
    setMensajeExito('');

    try {
      const res = await fetch('/api/tasas', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tasas),
      });

      if (res.ok) {
        setMensajeExito('¡Tasas vigentes actualizadas exitosamente en el sistema!');
        setTimeout(() => setMensajeExito(''), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGuardandoTasas(false);
    }
  };

  if (!usuario) {
    return <div className="text-center py-20 text-slate-400">Verificando credenciales de administrador...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Banner de Administrador */}
      <div className="bg-gradient-to-r from-navy-950 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
            <span>Panel de Control Maestro • Administrador</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Panel de Administración: {usuario.nombre}
          </h1>
          <p className="text-xs text-slate-300">
            {usuario.cargo} • Gestión de Parámetros y Mensajes Centrales
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Cerrar Sesión</span>
        </button>
      </div>

      {/* GESTIÓN DE TASAS VIGENTES (SIMULADORES) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
              Parámetros Financieros
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-2">
              Configuración de Tasas de Crédito y CDT
            </h2>
            <p className="text-xs text-slate-500">
              Modifica las tasas que alimentan los simuladores públicos y de asesores en tiempo real.
            </p>
          </div>

          <button
            onClick={handleGuardarTasas}
            disabled={guardandoTasas}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{guardandoTasas ? 'Guardando...' : 'Guardar Cambios en Tasas'}</span>
          </button>
        </div>

        {mensajeExito && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{mensajeExito}</span>
          </div>
        )}

        {tasas && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
              Tasas para Líneas de Crédito
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {tasas.creditos.map((cred, idx) => (
                <div key={cred.tipo} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="font-bold text-sm text-slate-900">{cred.nombre}</div>
                  
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Tasa Mensual Vencida (% M.V.)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={cred.tasaNominalMensual}
                      onChange={(e) =>
                        handleTasaCreditoChange(idx, 'tasaNominalMensual', Number(e.target.value))
                      }
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Tasa Efectiva Anual (% E.A.)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={cred.tasaEfectivaAnual}
                      onChange={(e) =>
                        handleTasaCreditoChange(idx, 'tasaEfectivaAnual', Number(e.target.value))
                      }
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-blue-50/70 border border-blue-200/60 rounded-2xl flex items-center justify-between text-xs text-blue-900">
              <span>Retención en la fuente configurada para rendimientos CDT:</span>
              <strong className="text-sm">{tasas.cdt.retencionFuente}%</strong>
            </div>
          </div>
        )}
      </div>

      {/* BANDEJA DE MENSAJES DE CONTACTO Y PQRS */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Bandeja de Entrada
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-2">
              Mensajes de Contacto y Solicitudes de Clientes ({mensajes.length})
            </h2>
            <p className="text-xs text-slate-500">
              Gestiona las solicitudes recibidas a través del formulario oficial de contacto
            </p>
          </div>
        </div>

        {cargando ? (
          <div className="text-center py-12 text-slate-400">Cargando mensajes...</div>
        ) : mensajes.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs">
            No hay mensajes registrados en la bandeja.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 uppercase font-bold">
                <tr>
                  <th className="py-3 px-4">Fecha</th>
                  <th className="py-3 px-4">Remitente</th>
                  <th className="py-3 px-4">Tipo</th>
                  <th className="py-3 px-4">Asunto y Mensaje</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {mensajes.map((msg) => (
                  <tr key={msg.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                      {new Date(msg.fecha).toLocaleDateString('es-CO', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{msg.nombre}</div>
                      <div className="text-[11px] text-slate-500">{msg.email}</div>
                      {msg.telefono && (
                        <div className="text-[11px] text-blue-700 font-medium">{msg.telefono}</div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded uppercase font-semibold text-[10px] bg-slate-100 text-slate-700">
                        {msg.tipoConsulta}
                      </span>
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <div className="font-semibold text-slate-900">{msg.asunto}</div>
                      <p className="text-slate-600 line-clamp-2 mt-0.5">{msg.mensaje}</p>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase ${
                          msg.estado === 'atendido'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {msg.estado}
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {msg.estado === 'pendiente' ? (
                        <button
                          onClick={() => handleCambiarEstadoMensaje(msg.id, 'atendido')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-[11px]"
                        >
                          Marcar Atendido
                        </button>
                      ) : (
                        <button
                          onClick={() => handleCambiarEstadoMensaje(msg.id, 'pendiente')}
                          className="px-2.5 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium text-[11px]"
                        >
                          Reabrir
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
