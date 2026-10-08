'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Check, ChevronDown, Languages } from 'lucide-react';
import { IDIOMAS, Idioma, cambiarIdioma, leerIdioma } from '@/lib/idioma';

function useIdioma() {
  const [idioma, setIdioma] = useState<Idioma>('es');
  useEffect(() => setIdioma(leerIdioma()), []);
  return idioma;
}

function Bandera({ src, size = 18 }: { src: string; size?: number }) {
  return <Image src={src} alt="" width={size} height={size} className="shrink-0 rounded-full" style={{ width: size, height: size }} />;
}

/** Dropdown: `banner` for the dark top bar, `compact` (flag + code) for the mobile header. */
export function LanguageDropdown({ variant = 'banner' }: { variant?: 'banner' | 'compact' }) {
  const idioma = useIdioma();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const actual = IDIOMAS.find((i) => i.code === idioma)!;

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const banner = variant === 'banner';

  return (
    <div ref={ref} translate="no" className="notranslate relative z-[60]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Idioma: ${actual.label}. Cambiar idioma`}
        className={
          banner
            ? 'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-slate-200 hover:bg-white/10 transition-colors'
            : 'inline-flex items-center gap-1.5 p-1.5 min-[420px]:pr-2 rounded-lg border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors'
        }
      >
        <Bandera src={actual.flag} size={banner ? 16 : 20} />
        <span className={banner ? '' : 'hidden min-[420px]:inline'}>{banner ? actual.label : actual.short}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''} ${banner ? '' : 'hidden min-[420px]:block'}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Seleccionar idioma"
          className="absolute right-0 mt-1.5 w-40 rounded-xl bg-white border border-slate-200 shadow-xl shadow-navy-900/15 p-1 text-sm"
        >
          {IDIOMAS.map((i) => (
            <li key={i.code}>
              <button
                type="button"
                role="option"
                aria-selected={i.code === idioma}
                onClick={() => {
                  setOpen(false);
                  cambiarIdioma(i.code);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors ${
                  i.code === idioma ? 'bg-brand-50 text-brand-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Bandera src={i.flag} size={20} />
                <span className="flex-1 text-left">{i.label}</span>
                {i.code === idioma && <Check className="w-4 h-4 text-brand-600" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Segmented control for the mobile menu. */
export function LanguageToggle() {
  const idioma = useIdioma();
  return (
    <div translate="no" className="notranslate flex items-center gap-3 px-3">
      <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
        <Languages className="w-4 h-4" />
        Idioma
      </span>
      <div className="flex-1 grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-100">
        {IDIOMAS.map((i) => (
          <button
            key={i.code}
            type="button"
            aria-pressed={i.code === idioma}
            onClick={() => cambiarIdioma(i.code)}
            className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all ${
              i.code === idioma ? 'bg-white text-brand-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Bandera src={i.flag} size={18} />
            {i.label}
          </button>
        ))}
      </div>
    </div>
  );
}
