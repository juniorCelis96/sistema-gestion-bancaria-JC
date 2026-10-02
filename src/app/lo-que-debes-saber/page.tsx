import type { Metadata } from 'next';
import {
  BookMarked,
  FileClock,
  ShieldCheck,
  Fingerprint,
  Mail,
  MessageSquareWarning,
  PhoneCall,
  UserX,
  TrendingUp,
  Building,
  PiggyBank,
  ArrowUpRight,
  ReceiptText,
  HandCoins,
  Smartphone,
} from 'lucide-react';
import { PageHero, Section, Callout, DataTable, GlossaryGrid } from '@/components/ui/content';
import Quiz, { QuizQuestion } from '@/components/ui/Quiz';
import { getNavPage } from '@/lib/navigation';

export const metadata: Metadata = {
  title: 'Lo que Debes Saber | SENA FINANZAS S.A.',
  description: 'Historial crediticio, seguridad financiera y fraude digital, inversión y creación de patrimonio.',
};

const page = getNavPage('/lo-que-debes-saber');

const QUIZ_FRAUDE: QuizQuestion[] = [
  {
    pregunta: '¿Cuál sería la opción más segura?',
    opciones: [
      'Ingresar rápidamente al enlace.',
      'Enviar los datos solicitados.',
      'Verificar la información directamente por los canales oficiales del banco.',
    ],
    correcta: 2,
    explicacion: (
      <p>
        <strong>💡 Consejo SENA FINANZAS:</strong> antes de entregar información o realizar una operación, detente, verifica y utiliza siempre los canales oficiales de la entidad.
      </p>
    ),
  },
];

const RIESGO_CLASES: Record<string, string> = {
  Bajo: 'bg-emerald-100 text-emerald-800',
  'Bajo a medio': 'bg-lime-100 text-lime-800',
  'Bajo a alto': 'bg-amber-100 text-amber-800',
  Alto: 'bg-rose-100 text-rose-800',
  'Depende del fondo': 'bg-slate-100 text-slate-700',
};

function Riesgo({ nivel }: { nivel: string }) {
  return <span className={`inline-flex whitespace-nowrap px-2.5 py-1 rounded-full text-xs font-bold ${RIESGO_CLASES[nivel]}`}>{nivel}</span>;
}

export default function LoQueDebesSaberPage() {
  return (
    <>
      <PageHero
        page={page}
        eyebrow="Módulo de aprendizaje"
        title="Lo que"
        highlight="debes saber"
        description="Cuida tu historial crediticio, protégete del fraude digital y aprende a construir patrimonio con inversiones acordes a tus metas."
        icon={BookMarked}
      />

      {/* HISTORIAL CREDITICIO */}
      <Section id="historial-crediticio" eyebrow="Crédito" title="Historial crediticio">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 space-y-3">
            <h3 className="flex items-center gap-2 text-lg font-bold text-navy-900">
              <FileClock className="w-5 h-5 text-brand-500" />
              ¿Qué es el historial crediticio?
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Es el registro del comportamiento financiero de una persona frente a sus obligaciones de crédito. Allí se refleja cómo ha manejado sus compromisos, especialmente si realiza sus pagos de manera oportuna o presenta incumplimientos.
            </p>
          </div>
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 space-y-3">
            <h3 className="flex items-center gap-2 text-lg font-bold text-navy-900">
              <ShieldCheck className="w-5 h-5 text-brand-500" />
              ¿Por qué es importante?
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Cuando una persona solicita un crédito, las entidades financieras pueden consultar su comportamiento crediticio para evaluar el riesgo de otorgarle financiación. Un buen historial puede facilitar el acceso a diferentes productos financieros y generar mayor confianza en la entidad.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 rounded-3xl bg-brand-50 border border-brand-200 p-6 sm:p-7 space-y-4">
            <h3 className="text-lg font-bold text-navy-900">Recuerda: ¿qué puede reflejar mi historial?</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {['Créditos y obligaciones adquiridas.', 'Comportamiento de los pagos.', 'Obligaciones pendientes o en mora.', 'Cumplimiento de las fechas establecidas.'].map((item) => (
                <li key={item} className="flex items-start gap-2 bg-white rounded-xl border border-brand-100 p-3 text-sm text-slate-700">
                  <span className="text-brand-500">🔹</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5 flex">
            <div className="w-full rounded-3xl bg-gradient-to-br from-amber-300 to-amber-400 text-navy-900 p-6 sm:p-7 flex flex-col justify-center gap-2 shadow-md">
              <p className="font-extrabold text-lg">💡 Ejemplo</p>
              <p className="leading-relaxed">
                Si una persona tiene un crédito y realiza todos sus pagos a tiempo, está construyendo un comportamiento crediticio favorable.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-navy-900">¿Cómo puedo mantener un buen historial? 5 hábitos financieros</h3>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { emoji: '📅', texto: 'Paga antes o en la fecha establecida.' },
              { emoji: '💰', texto: 'Solicita créditos que realmente puedas pagar.' },
              { emoji: '📊', texto: 'Organiza tus ingresos y gastos.' },
              { emoji: '🔔', texto: 'Lleva control de las fechas de pago.' },
              { emoji: '🔎', texto: 'Revisa periódicamente tu información crediticia.' },
            ].map((h, i) => (
              <li key={h.texto} className="relative rounded-2xl bg-white border border-slate-200 p-5 text-center hover:-translate-y-1 hover:shadow-lg transition-all">
                <span className="absolute top-3 left-3 w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                <span className="text-3xl block">{h.emoji}</span>
                <p className="mt-3 text-sm font-semibold text-navy-900 leading-snug">{h.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* SEGURIDAD FINANCIERA */}
      <Section id="seguridad-financiera" eyebrow="SENA FINANZAS te recuerda" title="Seguridad financiera y fraude digital" tone="mint">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 space-y-3">
            <h3 className="flex items-center gap-2 text-lg font-bold text-navy-900">
              <ShieldCheck className="w-5 h-5 text-brand-500" />
              ¿Qué es la seguridad financiera?
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Comprende las medidas y hábitos utilizados para proteger el dinero, las cuentas, tarjetas, productos financieros y datos personales frente a posibles riesgos. En el entorno digital, mantener segura nuestra información es fundamental para evitar que otras personas puedan utilizarla de manera indebida.
            </p>
          </div>
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 space-y-3">
            <h3 className="flex items-center gap-2 text-lg font-bold text-navy-900">
              <Fingerprint className="w-5 h-5 text-rose-500" />
              ¿Qué es un fraude digital?
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Es un engaño realizado mediante herramientas o canales tecnológicos con el propósito de obtener información, dinero o acceso no autorizado a productos financieros. Los delincuentes pueden utilizar mensajes, llamadas, correos, redes sociales o páginas falsas para engañar a sus víctimas.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Mail, nombre: 'Phishing 🎣', texto: 'Correos o páginas falsas que buscan obtener información personal o financiera.' },
            { icon: MessageSquareWarning, nombre: 'Smishing 💬', texto: 'Mensajes de texto fraudulentos que contienen enlaces o solicitudes engañosas.' },
            { icon: PhoneCall, nombre: 'Vishing 📞', texto: 'Llamadas en las que el delincuente se hace pasar por una entidad o persona de confianza.' },
            { icon: UserX, nombre: 'Suplantación 👤', texto: 'Uso de la identidad o información de otra persona para cometer un fraude.' },
          ].map((f) => (
            <div key={f.nombre} className="rounded-2xl bg-navy-900 text-white p-5 space-y-2 hover:bg-brand-800 transition-colors">
              <f.icon className="w-7 h-7 text-rose-300" />
              <h3 className="font-extrabold uppercase tracking-wide">{f.nombre}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{f.texto}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3">
              <h3 className="text-lg font-bold text-navy-900">¿Cómo puedo identificar una posible estafa?</h3>
              <ul className="space-y-2">
                {[
                  'Te solicitan claves o códigos de seguridad.',
                  'Te presionan para actuar inmediatamente.',
                  'Recibes enlaces desconocidos.',
                  'Te ofrecen beneficios demasiado buenos para ser verdad.',
                  'Alguien se hace pasar por el banco y solicita información confidencial.',
                ].map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-slate-700">
                    <span>🚩</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <Callout variant="alert" title="🛑 ¡ALERTA!">
              Nunca compartas tus claves, contraseñas ni códigos de seguridad.
            </Callout>
          </div>
          <div className="lg:col-span-7">
            <Quiz
              titulo="🧩 ¿Qué harías en esta situación?"
              descripcion={
                <div className="flex items-start gap-3 bg-slate-900 text-white rounded-2xl p-4">
                  <Smartphone className="w-6 h-6 text-brand-300 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-400 mb-1">📱 Recibes un mensaje:</p>
                    <p className="font-medium">
                      “SENA FINANZAS informa que su cuenta será bloqueada. Ingrese al siguiente enlace para evitar el bloqueo.”
                    </p>
                  </div>
                </div>
              }
              preguntas={QUIZ_FRAUDE}
            />
          </div>
        </div>
      </Section>

      {/* INVERSIÓN Y PATRIMONIO */}
      <Section id="inversion-patrimonio" eyebrow="Inversión" title="Inversión y creación de patrimonio">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 space-y-3">
            <h3 className="flex items-center gap-2 text-lg font-bold text-navy-900">
              <TrendingUp className="w-5 h-5 text-brand-500" />
              ¿Qué es invertir?
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Invertir consiste en destinar dinero a un producto o actividad con el objetivo de obtener un rendimiento en el futuro. Antes de invertir se deben considerar el <strong>monto, plazo, rentabilidad, liquidez y riesgo</strong>.
            </p>
          </div>
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 space-y-3">
            <h3 className="flex items-center gap-2 text-lg font-bold text-navy-900">
              <Building className="w-5 h-5 text-brand-500" />
              ¿Qué es el patrimonio?
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              El patrimonio es el valor que resulta de restar las deudas de los bienes y recursos que posee una persona.
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-navy-900 text-white p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center shadow-lg">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-300">Fórmula</p>
            <p className="text-2xl sm:text-3xl font-extrabold">
              Patrimonio = Activos <span className="text-brand-300">–</span> Pasivos
            </p>
          </div>
          <div className="rounded-2xl bg-white/10 border border-white/15 p-5 space-y-2 text-sm">
            <p className="font-bold text-brand-200">Ejemplo</p>
            <p className="text-brand-50/90">Una persona tiene $20.000.000 en bienes y ahorros y debe $7.000.000.</p>
            <p className="font-mono text-base">$20.000.000 – $7.000.000 = <strong className="text-brand-300">$13.000.000</strong></p>
            <p className="text-brand-50/90">Su patrimonio es de $13.000.000.</p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-navy-900">¿Cómo se construye el patrimonio?</h3>
          <GlossaryGrid
            items={[
              { icon: PiggyBank, term: 'Ahorro constante', definition: 'Guardar una parte de los ingresos cada mes.' },
              { icon: TrendingUp, term: 'Inversión', definition: 'Poner el dinero a generar rendimientos.' },
              { icon: Building, term: 'Compra de bienes y activos', definition: 'Adquirir bienes que conservan o aumentan su valor.' },
              { icon: ArrowUpRight, term: 'Aumento de los ingresos', definition: 'Buscar nuevas fuentes de ingreso o mejorar las actuales.' },
              { icon: ReceiptText, term: 'Control de gastos', definition: 'Evitar gastos innecesarios para liberar recursos.' },
              { icon: HandCoins, term: 'Pago responsable de las deudas', definition: 'Reducir los pasivos cumpliendo con las obligaciones.' },
            ]}
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-navy-900">Productos de inversión</h3>
          <DataTable
            caption="Productos de inversión y nivel de riesgo"
            headers={['Producto', '¿Para qué sirve?', 'Nivel de riesgo']}
            rows={[
              ['CDT', 'Obtener intereses sobre un dinero depositado durante un plazo', <Riesgo key="r" nivel="Bajo" />],
              ['FIC', 'Invertir en un portafolio administrado', <Riesgo key="r" nivel="Bajo a alto" />],
              ['Acciones', 'Participar en empresas y buscar valorización o dividendos', <Riesgo key="r" nivel="Alto" />],
              ['Bonos', 'Obtener intereses por prestar dinero a una entidad', <Riesgo key="r" nivel="Bajo a medio" />],
              ['TES', 'Invertir en títulos de deuda pública', <Riesgo key="r" nivel="Bajo a medio" />],
              ['Pensiones voluntarias', 'Ahorrar e invertir para objetivos de largo plazo', <Riesgo key="r" nivel="Depende del fondo" />],
            ]}
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-navy-900">¿Cómo invertir y cuáles son sus beneficios?</h3>
          <DataTable
            caption="Cómo invertir y beneficios por producto"
            headers={['Producto', '¿Cómo podría invertir?', 'Beneficios']}
            rows={[
              [
                'CDT',
                'Se deposita una cantidad de dinero en un banco y se elige un plazo determinado. El dinero se mantiene durante ese período y al vencimiento se recibe el capital más los intereses acordados.',
                'Genera intereses, permite conocer la tasa pactada y es una alternativa sencilla para quienes buscan invertir con un plazo definido.',
              ],
              [
                'Fondos de Inversión Colectiva (FIC)',
                'Se aporta dinero a un fondo administrado por una entidad autorizada. El fondo reúne los recursos de diferentes personas y los invierte en activos según su estrategia.',
                'Permite diversificar, contar con administración profesional y acceder a diferentes tipos de inversiones sin tener que elegir individualmente cada activo.',
              ],
              [
                'Acciones',
                'Se abre una cuenta con un intermediario autorizado y se compran acciones de empresas que cotizan en el mercado de valores.',
                'Permiten participar en empresas y obtener ganancias por la valorización de las acciones. Algunas también pueden pagar dividendos. Su valor puede subir o bajar, por lo que tienen mayor riesgo.',
              ],
              [
                'Bonos',
                'Se compran títulos de deuda emitidos por empresas o entidades públicas. El inversionista entrega su dinero y recibe intereses de acuerdo con las condiciones establecidas.',
                'Pueden generar ingresos mediante el pago de intereses y permiten invertir en instrumentos de renta fija.',
              ],
              [
                'TES',
                'Son títulos de deuda emitidos por el Gobierno colombiano. Una persona puede invertir en ellos mediante mecanismos del mercado de valores o a través de fondos que los incluyan en su portafolio.',
                'Permiten invertir en deuda pública colombiana y obtener rendimientos de acuerdo con las condiciones del título.',
              ],
              [
                'Fondos de pensiones voluntarias',
                'La persona realiza aportes voluntarios a un fondo y estos recursos son administrados e invertidos de acuerdo con las alternativas disponibles.',
                'Permiten construir un ahorro para el futuro, complementar la pensión y establecer objetivos financieros de largo plazo.',
              ],
            ]}
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-navy-900">Ahorrar vs. invertir</h3>
          <DataTable
            caption="Diferencias entre ahorrar e invertir"
            headers={['Ahorrar', 'Invertir']}
            rows={[
              ['Guardar dinero para utilizarlo después.', 'Buscar que el dinero genere un rendimiento.'],
              ['Generalmente tiene menor riesgo.', 'Puede tener diferentes niveles de riesgo.'],
              ['Útil para emergencias y metas cercanas.', 'Útil para objetivos de mediano y largo plazo.'],
            ]}
          />
        </div>

        <Callout variant="tip" title="Antes de invertir">
          Define tu meta, tu plazo y cuánto riesgo estás dispuesto a asumir. Invierte solo a través de entidades autorizadas y vigiladas.
        </Callout>
      </Section>
    </>
  );
}
