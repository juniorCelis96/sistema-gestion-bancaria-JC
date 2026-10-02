export interface NavSection {
  id: string;
  label: string;
}

export interface NavPage {
  label: string;
  href: string;
  sections: NavSection[];
}

export const NAV_PAGES: NavPage[] = [
  {
    label: 'Inicio',
    href: '/',
    sections: [
      { id: 'presentacion', label: 'Presentación' },
      { id: 'objetivo-general', label: 'Objetivo general' },
      { id: 'objetivos-especificos', label: 'Objetivos específicos' },
      { id: 'mision-vision', label: 'Misión y visión' },
      { id: 'contacto', label: 'Contacto' },
    ],
  },
  {
    label: 'Educación Financiera',
    href: '/educacion-financiera',
    sections: [
      { id: 'que-es', label: '¿Qué es la educación financiera?' },
      { id: 'importancia', label: 'Importancia de la educación financiera' },
      { id: 'dinero', label: 'El dinero y su administración' },
      { id: 'pilares', label: 'Los 4 pilares de la gestión financiera' },
      { id: 'regla-50-30-20', label: 'Regla 50 / 30 / 20' },
      { id: 'mandamientos', label: 'Mandamientos para el éxito económico' },
      { id: 'ingresos', label: 'Ingresos' },
      { id: 'importancia-ingresos', label: '¿Por qué conocer los ingresos?' },
      { id: 'gastos', label: 'Gastos en el presupuesto' },
      { id: 'presupuesto', label: 'El presupuesto familiar y personal' },
      { id: 'taller', label: 'Taller práctico' },
    ],
  },
  {
    label: 'Ahorro con Propósito',
    href: '/ahorro-con-proposito',
    sections: [
      { id: 'ahorrando', label: 'Ahorrando' },
      { id: 'estrategias', label: 'Estrategias para ahorrar' },
      { id: 'sistema-financiero', label: 'Sistema Financiero Colombiano' },
    ],
  },
  {
    label: 'Productos Financieros',
    href: '/productos-financieros',
    sections: [
      { id: 'productos-ahorro', label: 'Productos de ahorro' },
      { id: 'credito', label: 'Crédito' },
      { id: 'partes-credito', label: '¿Qué partes componen un crédito?' },
      { id: 'endeudamiento', label: 'Endeudamiento responsable' },
      { id: 'elementos-endeudamiento', label: 'Elementos del endeudamiento responsable' },
    ],
  },
  {
    label: 'Lo que Debes Saber',
    href: '/lo-que-debes-saber',
    sections: [
      { id: 'historial-crediticio', label: 'Historial crediticio' },
      { id: 'seguridad-financiera', label: 'SENA FINANZAS te recuerda' },
      { id: 'inversion-patrimonio', label: 'Inversión y creación de patrimonio' },
    ],
  },
  {
    label: 'Simuladores',
    href: '/simuladores',
    sections: [
      { id: 'simulador-credito', label: 'Simulador de crédito' },
      { id: 'simulador-cdt', label: 'Simulador de CDT' },
      { id: 'simulador-ahorro', label: 'Simulador de meta de ahorro' },
    ],
  },
  {
    label: 'Práctica de Aprendizaje',
    href: '/practica-aprendizaje',
    sections: [
      { id: 'casos-practicos', label: 'Casos prácticos' },
      { id: 'actividades', label: 'Actividades de aprendizaje' },
    ],
  },
  {
    label: 'Conclusiones',
    href: '/conclusiones',
    sections: [
      { id: 'conclusiones', label: 'Conclusiones' },
      { id: 'bibliografia', label: 'Bibliografía' },
      { id: 'desarrollado-por', label: 'Desarrollado por' },
    ],
  },
];

export function getNavPage(href: string): NavPage {
  const page = NAV_PAGES.find((p) => p.href === href);
  if (!page) throw new Error(`Página de navegación no encontrada: ${href}`);
  return page;
}

export function sectionHref(page: NavPage, sectionId: string): string {
  return page.href === '/' ? `/#${sectionId}` : `${page.href}#${sectionId}`;
}
