'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Building2, 
  Calculator, 
  PiggyBank, 
  MapPin, 
  HelpCircle, 
  PhoneCall, 
  UserCircle, 
  Menu, 
  X,
  CreditCard,
  ShieldCheck,
  LogOut
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ nombre: string; rol: string } | null>(null);

  useEffect(() => {
    // Check if user is logged in via localStorage
    const saved = localStorage.getItem('banco_user');
    if (saved) {
      try {
        setCurrentUser(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('banco_user');
    setCurrentUser(null);
    window.location.href = '/';
  };

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Productos', href: '/productos' },
    { name: 'Simulador Crédito', href: '/simulador-credito' },
    { name: 'Simulador CDT', href: '/simulador-cdt' },
    { name: 'Oficinas y Cajeros', href: '/oficinas' },
    { name: 'Preguntas Frecuentes', href: '/faq' },
    { name: 'Contacto', href: '/contacto' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      {/* Top Banner Vigilado */}
      <div className="bg-navy-900 text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              VIGILADO
            </span>
            <span>Superintendencia Financiera de Colombia • Seguro de Depósitos Fogafín</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Línea Gratuita Nacional: 01 8000 912 345</span>
            <span className="hidden md:inline">• La Dorada, Caldas</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-900 via-blue-700 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-blue-900/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
                BANCO JC <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold uppercase">Financiera</span>
              </span>
              <p className="text-xs text-slate-500 font-medium tracking-wide">Sistema de Gestión Bancaria</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-blue-700 bg-blue-50 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-blue-900 hover:bg-slate-100/80'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* User Access / Login CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs font-bold uppercase">
                  {currentUser.nombre.charAt(0)}
                </div>
                <div className="text-left text-xs">
                  <div className="font-semibold text-slate-900 truncate max-w-[130px]">{currentUser.nombre.split(' ')[0]}</div>
                  <span className="capitalize text-emerald-600 font-medium text-[11px]">{currentUser.rol}</span>
                </div>
                <Link
                  href={currentUser.rol === 'admin' ? '/dashboard/admin' : '/dashboard/asesor'}
                  className="ml-2 text-xs bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 rounded-md font-medium"
                >
                  Panel
                </Link>
                <button
                  onClick={handleLogout}
                  title="Cerrar sesión"
                  className="p-1 text-slate-400 hover:text-red-600 rounded transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-2 bg-navy-900 hover:bg-blue-950 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm hover:shadow transition-all group"
              >
                <UserCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>Acceso al Usuario</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-base font-medium transition-all ${
                    isActive
                      ? 'text-blue-700 bg-blue-50 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100">
            {currentUser ? (
              <div className="space-y-2">
                <div className="px-3 py-2 bg-slate-50 rounded-lg text-sm text-slate-700">
                  <span className="font-semibold block">{currentUser.nombre}</span>
                  <span className="text-xs text-slate-500 uppercase">{currentUser.rol}</span>
                </div>
                <Link
                  href={currentUser.rol === 'admin' ? '/dashboard/admin' : '/dashboard/asesor'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center bg-blue-600 text-white font-medium py-2 rounded-lg"
                >
                  Ir a mi Panel de Trabajo
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-center text-red-600 font-medium py-2 rounded-lg border border-red-200 hover:bg-red-50 text-sm"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-navy-900 text-white py-2.5 rounded-xl font-medium"
              >
                <UserCircle className="w-5 h-5 text-emerald-400" />
                Acceso al Usuario (Asesores / Admin)
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
