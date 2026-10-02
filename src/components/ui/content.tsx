import React from 'react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { Lightbulb, AlertTriangle, BookmarkCheck, Info } from 'lucide-react';
import { NavPage, sectionHref } from '@/lib/navigation';

export function PageHero({
  page,
  eyebrow,
  title,
  highlight,
  description,
  icon: Icon,
}: {
  page: NavPage;
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-brand-800 to-brand-600 text-white px-4 sm:px-6 lg:px-8 pt-12 pb-10 sm:pt-16 sm:pb-12">
      <div className="absolute -top-32 -right-24 w-80 h-80 bg-brand-300/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-24 w-96 h-96 bg-brand-500/30 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <span className="w-16 h-16 shrink-0 rounded-2xl bg-brand-300 text-navy-900 flex items-center justify-center shadow-lg shadow-brand-300/30">
            <Icon className="w-8 h-8" />
          </span>
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-200">{eyebrow}</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {title}{' '}
              {highlight && (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-brand-200 to-brand-100">
                  {highlight}
                </span>
              )}
            </h1>
          </div>
        </div>
        <p className="text-base sm:text-lg text-brand-50/90 max-w-3xl leading-relaxed">{description}</p>
        <nav aria-label={`Secciones de ${page.label}`} className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto">
          <ul className="flex sm:flex-wrap gap-2 pb-1 w-max sm:w-auto">
            {page.sections.map((s) => (
              <li key={s.id}>
                <Link
                  href={sectionHref(page, s.id)}
                  className="inline-flex whitespace-nowrap px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-brand-300 hover:text-navy-900 border border-white/20 text-xs sm:text-sm font-medium transition-colors"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  tone = 'white',
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  tone?: 'white' | 'mint';
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 xl:scroll-mt-20 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 ${
        tone === 'mint' ? 'bg-gradient-to-b from-brand-50 to-white' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="space-y-3 max-w-3xl">
          {eyebrow && (
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-brand-800 bg-brand-100 px-3 py-1 rounded-full">
              {eyebrow}
            </span>
          )}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">{title}</h2>
          {subtitle && <p className="text-base sm:text-lg text-brand-700 font-semibold italic">{subtitle}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return <div className="space-y-4 text-slate-700 leading-relaxed text-base max-w-4xl">{children}</div>;
}

const CARD_TONES = [
  'bg-brand-100 text-brand-700',
  'bg-brand-500 text-white',
  'bg-brand-700 text-brand-100',
  'bg-brand-300 text-navy-900',
];

export function IconCard({
  icon: Icon,
  title,
  children,
  index = 0,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  index?: number;
}) {
  return (
    <div className="h-full bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-900/5 transition-all space-y-3">
      <span className={`w-12 h-12 rounded-xl flex items-center justify-center ${CARD_TONES[index % CARD_TONES.length]}`}>
        <Icon className="w-6 h-6" />
      </span>
      <h3 className="text-lg font-bold text-navy-900">{title}</h3>
      <div className="text-sm text-slate-600 leading-relaxed">{children}</div>
    </div>
  );
}

export function GlossaryGrid({
  items,
  columns = 3,
}: {
  items: { term: string; definition: React.ReactNode; icon?: LucideIcon }[];
  columns?: 2 | 3;
}) {
  return (
    <dl className={`grid grid-cols-1 sm:grid-cols-2 ${columns === 3 ? 'lg:grid-cols-3' : ''} gap-4`}>
      {items.map(({ term, definition, icon: Icon }, idx) => (
        <div
          key={term}
          className="relative bg-white rounded-2xl border border-slate-200 p-5 pl-6 overflow-hidden hover:shadow-md hover:border-brand-300 transition-all"
        >
          <span
            className={`absolute left-0 top-0 bottom-0 w-1.5 ${
              ['bg-brand-500', 'bg-brand-300', 'bg-brand-700'][idx % 3]
            }`}
          />
          <dt className="flex items-center gap-2 font-bold text-navy-900">
            {Icon && <Icon className="w-5 h-5 text-brand-500 shrink-0" />}
            {term}
          </dt>
          <dd className="text-sm text-slate-600 leading-relaxed mt-1.5">{definition}</dd>
        </div>
      ))}
    </dl>
  );
}

export function DataTable({
  headers,
  rows,
  footer,
  caption,
}: {
  headers: string[];
  rows: React.ReactNode[][];
  footer?: React.ReactNode[][];
  caption?: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-sm text-left">
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead className="bg-navy-900 text-white">
            <tr>
              {headers.map((h) => (
                <th key={h} scope="col" className="py-3 px-4 font-semibold text-xs uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, i) => (
              <tr key={i} className="odd:bg-white even:bg-brand-50/60 hover:bg-brand-100/60 transition-colors align-top">
                {row.map((cell, j) => (
                  <td key={j} className={`py-3 px-4 ${j === 0 ? 'font-semibold text-navy-900' : 'text-slate-700'}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {footer && (
            <tfoot>
              {footer.map((row, i) => (
                <tr key={i} className="bg-brand-100 font-bold text-navy-900">
                  {row.map((cell, j) => (
                    <td key={j} className="py-3 px-4">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}

const CALLOUT_STYLES = {
  tip: { icon: Lightbulb, box: 'bg-amber-50 border-amber-200', iconBox: 'bg-amber-400 text-navy-900', title: 'text-amber-900' },
  remember: { icon: BookmarkCheck, box: 'bg-brand-50 border-brand-200', iconBox: 'bg-brand-500 text-white', title: 'text-brand-800' },
  alert: { icon: AlertTriangle, box: 'bg-rose-50 border-rose-200', iconBox: 'bg-rose-500 text-white', title: 'text-rose-800' },
  info: { icon: Info, box: 'bg-white border-brand-200', iconBox: 'bg-brand-700 text-brand-100', title: 'text-navy-900' },
};

export function Callout({
  variant = 'tip',
  title,
  children,
}: {
  variant?: keyof typeof CALLOUT_STYLES;
  title?: string;
  children: React.ReactNode;
}) {
  const s = CALLOUT_STYLES[variant];
  const Icon = s.icon;
  return (
    <div className={`rounded-2xl border p-5 flex gap-4 items-start ${s.box}`}>
      <span className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center ${s.iconBox}`}>
        <Icon className="w-5 h-5" />
      </span>
      <div className="space-y-1.5 min-w-0">
        {title && <p className={`font-bold ${s.title}`}>{title}</p>}
        <div className="text-sm text-slate-700 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
          <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0 mt-1.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function StepList({ steps }: { steps: { title: string; text?: React.ReactNode }[] }) {
  return (
    <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {steps.map((step, i) => (
        <li key={step.title} className="bg-white rounded-2xl border border-slate-200 p-5 flex gap-4 items-start">
          <span className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white font-black flex items-center justify-center">
            {i + 1}
          </span>
          <div className="space-y-1">
            <p className="font-bold text-navy-900">{step.title}</p>
            {step.text && <div className="text-sm text-slate-600 leading-relaxed">{step.text}</div>}
          </div>
        </li>
      ))}
    </ol>
  );
}
