import type { Metadata } from 'next';
import TallerPresupuesto from '@/components/taller/TallerPresupuesto';

export const metadata: Metadata = {
  title: 'Taller práctico de presupuesto | SENA FINANZAS S.A.',
  description:
    'Organiza tus ingresos, prioriza tus gastos y construye tus metas financieras con el taller interactivo de presupuesto de SENA FINANZAS S.A.',
};

export default function TallerPresupuestoPage() {
  return <TallerPresupuesto />;
}
