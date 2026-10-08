'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Calculator, ClipboardList, MapPin, HelpCircle, Briefcase } from 'lucide-react';
import { NAV_PAGES, sectionHref } from '@/lib/navigation';
import { LanguageDropdown, LanguageToggle } from './LanguageSwitcher';

const EXTRA_LINKS = [
  { name: 'Taller de presupuesto', short: 'Taller', href: '/taller-presupuesto', icon: ClipboardList },
  { name: 'Catálogo de productos', short: 'Catálogo', href: '/productos', icon: Briefcase },
  { name: 'Oficinas', short: 'Oficinas', href: '/oficinas', icon: MapPin },
  { name: 'Preguntas frecuentes', short: 'FAQ', href: '/faq', icon: HelpCircle },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [desktopOpen, setDesktopOpen] = useState<string | null>(null);
  const desktopNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDesktopOpen(null);
  }, [pathname]);

  useEffect(() => {
    if (!desktopOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDesktopOpen(null);
    const onClick = (e: MouseEvent) => {
      if (desktopNavRef.current && !desktopNavRef.current.contains(e.target as Node)) setDesktopOpen(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [desktopOpen]);

  const closeAll = () => {
    setMobileMenuOpen(false);
    setDesktopOpen(null);
  };

  return (
    <>
      {/* Top Banner Vigilado */}
      <div className="bg-navy-900 text-slate-300 text-xs py-1.5 px-4 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-2 text-center">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-brand-500/20 text-brand-300 border border-brand-400/30">
              VIGILADO
            </span>
            <span>Superintendencia Financiera de Colombia • Seguro de Depósitos Fogafín</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-400">
            <LanguageDropdown />
            <span className="w-px h-3.5 bg-white/20" aria-hidden />
            <span className="whitespace-nowrap">Línea de atención: +57 322 6830093</span>
            <span className="hidden lg:inline whitespace-nowrap">• La Dorada, Caldas</span>
          </div>
        </div>
      </div>

      {/* Logo row (sticky on mobile / tablet) */}
      <header className="sticky top-0 xl:static z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm xl:shadow-none print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" onClick={closeAll} className="flex items-center gap-2 sm:gap-3 group min-w-0">
              <Image
                src="/logo_sena_fin_fondo_blanco.jpeg"
                alt="SENA FINANZAS S.A."
                width={56}
                height={56}
                priority
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain group-hover:scale-105 transition-transform shrink-0"
              />
              <div className="min-w-0">
                <span translate="no" className="notranslate text-base sm:text-xl font-extrabold tracking-tight text-navy-900 flex items-center gap-1.5">
                  SENA FINANZAS <span className="text-xs px-2 py-0.5 rounded-full bg-brand-100 text-brand-700 font-semibold">S.A.</span>
                </span>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium italic sm:tracking-wide truncate">Tu conocimiento, tu mejor inversión</p>
              </div>
            </Link>

            {/* Desktop utility links */}
            <div className="hidden xl:flex items-center gap-1">
              {EXTRA_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === l.href ? 'text-brand-700 bg-brand-50' : 'text-slate-500 hover:text-brand-800 hover:bg-slate-100'
                  }`}
                >
                  <l.icon className="w-4 h-4" />
                  {l.short}
                </Link>
              ))}
              <Link
                href="/simuladores#simulador-credito"
                className="ml-2 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold shadow-md shadow-brand-600/20 transition-colors"
              >
                <Calculator className="w-4 h-4" />
                Simular crédito
              </Link>
            </div>

            <div className="xl:hidden flex items-center gap-1.5 shrink-0">
              <div className="sm:hidden">
                <LanguageDropdown variant="compact" />
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen((v) => !v)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={mobileMenuOpen}
                aria-controls="menu-movil"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav
            id="menu-movil"
            aria-label="Menú principal"
            className="xl:hidden border-t border-slate-200 bg-white max-h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain"
          >
            <ul className="max-w-7xl mx-auto px-4 sm:px-6 py-3 space-y-1">
              <li className="pb-3 mb-2 border-b border-slate-100">
                <LanguageToggle />
              </li>
              {NAV_PAGES.map((page) => {
                const isActive = pathname === page.href;
                const expanded = mobileExpanded === page.href;
                return (
                  <li key={page.href} className="rounded-xl overflow-hidden">
                    <div className={`flex items-center ${isActive ? 'bg-brand-50' : ''} rounded-xl`}>
                      <Link
                        href={page.href}
                        onClick={closeAll}
                        className={`flex-1 px-3 py-3 text-base font-semibold ${isActive ? 'text-brand-700' : 'text-slate-800'}`}
                      >
                        {page.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMobileExpanded(expanded ? null : page.href)}
                        aria-expanded={expanded}
                        aria-label={`${expanded ? 'Ocultar' : 'Ver'} secciones de ${page.label}`}
                        className="p-3 text-slate-500 hover:text-brand-700"
                      >
                        <ChevronDown className={`w-5 h-5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                    {expanded && (
                      <ul className="ml-3 mb-2 pl-3 border-l-2 border-brand-200 space-y-0.5">
                        {page.sections.map((s) => (
                          <li key={s.id}>
                            <Link
                              href={sectionHref(page, s.id)}
                              onClick={closeAll}
                              className="block px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-brand-50 hover:text-brand-800"
                            >
                              {s.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
              <li className="pt-3 mt-2 border-t border-slate-100">
                <p className="px-3 pb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Más recursos</p>
                <div className="grid grid-cols-2 gap-2">
                  {EXTRA_LINKS.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={closeAll}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 hover:border-brand-300 hover:bg-brand-50"
                    >
                      <l.icon className="w-4 h-4 text-brand-600 shrink-0" />
                      {l.name}
                    </Link>
                  ))}
                </div>
              </li>
            </ul>
          </nav>
        )}
      </header>

      {/* Desktop main nav (sticky) */}
      <div ref={desktopNavRef} className="hidden xl:block sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm print:hidden">
        <nav aria-label="Menú principal" className="max-w-7xl mx-auto px-6 2xl:px-8">
          <ul className="flex items-center justify-between h-14">
            {NAV_PAGES.map((page, idx) => {
              const isActive = pathname === page.href;
              const open = desktopOpen === page.href;
              const wide = page.sections.length > 6;
              const alignRight = idx >= NAV_PAGES.length - 2;
              return (
                <li
                  key={page.href}
                  className="relative"
                  onMouseEnter={() => setDesktopOpen(page.href)}
                  onMouseLeave={() => setDesktopOpen((cur) => (cur === page.href ? null : cur))}
                >
                  <div
                    className={`flex items-center rounded-lg transition-colors ${
                      isActive ? 'bg-brand-50 text-brand-700' : open ? 'bg-slate-100 text-brand-900' : 'text-slate-700'
                    }`}
                  >
                    <Link href={page.href} onClick={closeAll} className="pl-2.5 2xl:pl-3 pr-0.5 py-2 text-[13px] 2xl:text-sm font-semibold whitespace-nowrap">
                      {page.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setDesktopOpen(open ? null : page.href)}
                      aria-expanded={open}
                      aria-label={`Secciones de ${page.label}`}
                      className="pr-1.5 2xl:pr-2 pl-0.5 py-2"
                    >
                      <ChevronDown className={`w-3.5 h-3.5 2xl:w-4 2xl:h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  {isActive && <span className="absolute -bottom-[9px] left-3 right-3 h-0.5 rounded-full bg-brand-500" />}

                  {open && (
                    <div className={`absolute top-full pt-2 ${alignRight ? 'right-0' : 'left-0'}`}>
                      <div
                        className={`rounded-2xl bg-white border border-slate-200 shadow-xl shadow-navy-900/10 p-2 ${
                          wide ? 'w-[560px] grid grid-cols-2 gap-0.5' : 'w-72'
                        }`}
                      >
                        {page.sections.map((s) => (
                          <Link
                            key={s.id}
                            href={sectionHref(page, s.id)}
                            onClick={closeAll}
                            className="flex items-start gap-2 px-3 py-2.5 rounded-xl text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-800 transition-colors"
                          >
                            <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-brand-400 shrink-0" />
                            {s.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
