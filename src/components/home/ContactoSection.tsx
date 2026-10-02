'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  ShieldCheck 
} from 'lucide-react';

export default function ContactoSection() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tipoConsulta: 'general',
    asunto: '',
    mensaje: '',
  });

  const [enviando, setEnviando] = useState(false);
  const [enviadoExitoso, setEnviadoExitoso] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Sitio demo: el envío es simulado, no se guarda en base de datos ni se envía correo.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.nombre.trim() || !formData.email.trim() || !formData.mensaje.trim()) {
      setErrorMsg('Nombre, correo y mensaje son campos obligatorios');
      return;
    }

    setEnviando(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setEnviando(false);
    setEnviadoExitoso(true);
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      tipoConsulta: 'general',
      asunto: '',
      mensaje: '',
    });
  };

  return (
    <section id="contacto" className="scroll-mt-24 xl:scroll-mt-20 bg-slate-50 border-t border-slate-200 px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-brand-800 bg-brand-100 px-3.5 py-1.5 rounded-full">
            Canales de Comunicación Directa
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            Contacto
          </h2>
          <p className="text-base text-slate-600">
            ¿Quieres más información? Estamos a tu disposición para orientarte sobre educación financiera, créditos, inversiones y atención a peticiones, quejas o reclamos (PQRS).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* INFORMACIÓN INSTITUCIONAL DE CONTACTO */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <h3 className="text-xl font-bold text-slate-900">
                Canales Oficiales de Atención
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Comunícate a través de nuestras líneas telefónicas o acércate a nuestra sede administrativa y financiera en La Dorada, Caldas.
              </p>

              <div className="space-y-4 pt-2">
                {/* Dirección */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Dirección Principal</div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Calle 14 # 3-28, Sector Centro
                    </p>
                    <p className="text-[11px] font-semibold text-brand-700">La Dorada - Caldas, Colombia</p>
                  </div>
                </div>

                {/* Teléfonos */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-brand-500 text-white flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Líneas Telefónicas</div>
                    <p className="text-xs text-slate-600 mt-0.5">Sede La Dorada: (606) 857 2300</p>
                    <p className="text-xs text-slate-600">Línea Nacional Gratuita: 01 8000 912 345</p>
                  </div>
                </div>

                {/* Correo */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Correo Electrónico</div>
                    <p className="text-xs text-slate-600 mt-0.5">contacto@senafinanzas.com.co</p>
                    <p className="text-[11px] text-slate-500">atencioncliente@senafinanzas.com.co</p>
                  </div>
                </div>

                {/* Horarios */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-brand-700 text-brand-100 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Horarios de Atención</div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      <strong>Lunes a Viernes:</strong> 8:00 AM - 11:30 AM y 2:00 PM - 4:30 PM
                    </p>
                    <p className="text-xs text-slate-600">
                      <strong>Sábados:</strong> 9:00 AM - 1:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-brand-600" />
                <span>Tus datos son tratados bajo la Ley 1581 de Protección de Datos (Habeas Data).</span>
              </div>
            </div>
          </div>

          {/* FORMULARIO DE CONTACTO */}
          <div className="lg:col-span-7 bg-white p-7 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900">
                Envíanos un Mensaje
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Diligencia el formulario y un asesor financiero se comunicará contigo a la brevedad.
              </p>
            </div>

            {enviadoExitoso ? (
              <div className="p-8 rounded-2xl bg-brand-50 border border-brand-200 text-center space-y-3 animate-in fade-in">
                <CheckCircle2 className="w-12 h-12 text-brand-600 mx-auto" />
                <h3 className="text-lg font-bold text-brand-900">¡Mensaje Enviado con Éxito!</h3>
                <p className="text-xs text-brand-700 max-w-md mx-auto leading-relaxed">
                  Hemos recibido tu solicitud. Uno de nuestros asesores se pondrá en contacto al teléfono o correo suministrado.
                </p>
                <p className="text-[11px] text-brand-700/80 max-w-md mx-auto">
                  Sitio de demostración: este envío es simulado y tus datos no se almacenan ni se envían por correo.
                </p>
                <button
                  onClick={() => setEnviadoExitoso(false)}
                  className="mt-3 px-5 py-2 rounded-xl bg-brand-500 text-white font-medium text-xs hover:bg-brand-600 transition-colors"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Ej. Michell Castaño"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="michell@correo.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Número Telefónico / Celular
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="Ej. 312 000 0000"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Tipo de Solicitud
                    </label>
                    <select
                      name="tipoConsulta"
                      value={formData.tipoConsulta}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                    >
                      <option value="credito">Asesoría en Créditos</option>
                      <option value="cdt">Apertura o Consulta de CDT</option>
                      <option value="cuentas">Cuentas de Ahorros</option>
                      <option value="pqrs">Petición, Queja o Reclamo (PQRS)</option>
                      <option value="general">Información General</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Asunto del Mensaje *
                  </label>
                  <input
                    type="text"
                    required
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    placeholder="Ej. Consulta sobre requisitos de crédito para vivienda"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Detalle de tu Consulta o Mensaje *
                  </label>
                  <textarea
                    required
                    rows={4}
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder="Escribe aquí los detalles de tu solicitud..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={enviando}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-semibold text-sm transition-all shadow-md disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{enviando ? 'Enviando mensaje...' : 'Enviar Solicitud'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
