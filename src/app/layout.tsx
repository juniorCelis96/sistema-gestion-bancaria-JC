import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GoogleTranslate from '@/components/layout/GoogleTranslate';

export const metadata: Metadata = {
  title: 'SENA FINANZAS S.A. | Tu conocimiento, tu mejor inversión',
  description:
    'SENA FINANZAS S.A.: consulta de productos financieros, simulación de créditos y CDTs, y atención integral al cliente. Centro Pecuario y Agroempresarial Regional Caldas – SENA.',
  icons: {
    icon: '/logo_sena_fin_fondo_blanco.jpeg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-brand-600 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <GoogleTranslate />
      </body>
    </html>
  );
}
