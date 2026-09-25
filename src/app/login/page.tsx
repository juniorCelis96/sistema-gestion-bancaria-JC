'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Building2, 
  Lock, 
  Mail, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight, 
  KeyRound,
  UserCheck
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setCargando(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Guardar sesión en localStorage
        localStorage.setItem('banco_user', JSON.stringify(data.usuario));
        
        // Redirigir según perfil
        if (data.usuario.rol === 'admin') {
          router.push('/dashboard/admin');
        } else {
          router.push('/dashboard/asesor');
        }
      } else {
        setErrorMsg(data.error || 'Credenciales incorrectas');
      }
    } catch (err) {
      setErrorMsg('Error de conexión con el servidor');
    } finally {
      setCargando(false);
    }
  };

  const handleCredencialRapida = (tipo: 'asesor' | 'admin') => {
    if (tipo === 'asesor') {
      setEmail('asesor@banco.com');
      setPassword('asesor123');
    } else {
      setEmail('admin@banco.com');
      setPassword('admin123');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-6">
        
        {/* Cabecera del Login */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-900 to-emerald-600 items-center justify-center text-white shadow-lg mb-2">
            <Building2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Acceso al Sistema Interno
          </h1>
          <p className="text-xs text-slate-500">
            Portal exclusivo para Asesores Financieros y Administradores de Banco JC
          </p>
        </div>

        {/* Tarjeta de Formulario */}
        <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
          
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Correo Institucional
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usuario@banco.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={cargando}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-navy-900 hover:bg-blue-900 text-white font-semibold text-sm transition-all shadow-md disabled:opacity-50"
              >
                <KeyRound className="w-4 h-4 text-emerald-400" />
                <span>{cargando ? 'Validando credenciales...' : 'Iniciar Sesión'}</span>
              </button>
            </div>
          </form>

          {/* Botones de Relleno Rápido de Prueba (Demo) */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center">
              Credenciales de Prueba del Sistema (EV9)
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleCredencialRapida('asesor')}
                className="p-2 text-left rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 text-xs transition-colors"
              >
                <div className="font-bold text-slate-800">Rol Asesor</div>
                <div className="text-[10px] text-slate-500">asesor@banco.com</div>
              </button>

              <button
                type="button"
                onClick={() => handleCredencialRapida('admin')}
                className="p-2 text-left rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-xs transition-colors"
              >
                <div className="font-bold text-slate-800">Rol Admin</div>
                <div className="text-[10px] text-slate-500">admin@banco.com</div>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 text-center">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Conexión protegida con cifrado bancario</span>
          </div>

        </div>

      </div>
    </div>
  );
}
