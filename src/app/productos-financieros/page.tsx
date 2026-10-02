import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Wallet,
  PiggyBank,
  Landmark,
  CreditCard,
  HandCoins,
  Store,
  Umbrella,
  TrendingUp,
  BadgePercent,
  AlertTriangle,
  FileText,
  Briefcase,
  Calculator,
  ArrowRight,
} from 'lucide-react';
import { PageHero, Section, Prose, GlossaryGrid, DataTable, Callout, BulletList } from '@/components/ui/content';
import Quiz, { QuizQuestion } from '@/components/ui/Quiz';
import { getNavPage } from '@/lib/navigation';

export const metadata: Metadata = {
  title: 'Productos Financieros | SENA FINANZAS S.A.',
  description: 'Conoce los productos de ahorro, cómo funciona un crédito y cómo endeudarte de manera responsable.',
};

const page = getNavPage('/productos-financieros');

const QUIZ_CREDITO: QuizQuestion[] = [
  {
    pregunta: '¿Qué es un crédito o préstamo?',
    opciones: [
      'Una cantidad de dinero que una entidad financiera presta y que se debe devolver en un tiempo determinado.',
      'Un regalo de dinero que no es necesario devolver.',
      'Un ahorro que la entidad guarda por nosotros.',
    ],
    correcta: 0,
    explicacion: (
      <>
        <p className="mb-2">Es una cantidad de dinero que una entidad financiera presta a una persona, quien se compromete a devolverlo en un tiempo determinado.</p>
        <BulletList items={['Se devuelve generalmente mediante cuotas.', 'Incluye el pago de intereses.', 'Debemos cumplir con las fechas establecidas.']} />
      </>
    ),
  },
  {
    pregunta: '¿Cuándo es conveniente solicitar un crédito?',
    opciones: [
      'Cuando queremos comprar algo por impulso.',
      'Cuando necesitamos financiar algo importante y contamos con la capacidad económica para pagarlo.',
      'Cuando ya tenemos muchas deudas y queremos pagarlas con otra.',
    ],
    correcta: 1,
    explicacion: (
      <>
        <p className="mb-2">Un crédito puede ser conveniente cuando necesitamos financiar algo importante y contamos con la capacidad económica para pagarlo.</p>
        <BulletList items={['Para adquirir un bien o financiar una meta.', 'Cuando tenemos ingresos suficientes para pagar las cuotas.', 'Después de comparar diferentes opciones.']} />
      </>
    ),
  },
  {
    pregunta: '¿A quién debemos solicitar un préstamo para garantizar nuestra seguridad?',
    opciones: [
      'A prestamistas informales o “gota a gota”.',
      'A personas desconocidas que ofrecen préstamos por redes sociales.',
      'A entidades financieras formales, autorizadas y vigiladas.',
    ],
    correcta: 2,
    explicacion: (
      <>
        <p className="mb-2">Debemos solicitarlo a entidades financieras formales y autorizadas.</p>
        <BulletList
          items={[
            'Bancos y otras entidades financieras vigiladas.',
            'Debemos verificar que la entidad sea legal.',
            'Es importante conocer las condiciones antes de entregar nuestros datos o firmar.',
          ]}
        />
      </>
    ),
  },
  {
    pregunta: '¿Cuáles son las partes que componen un préstamo?',
    opciones: ['Monto, plazo, tasa de interés y cuota.', 'Salario, arriendo y servicios públicos.', 'Ahorro, inversión y patrimonio.'],
    correcta: 0,
    explicacion: (
      <>
        <p className="mb-2">Un préstamo tiene varios elementos que debemos conocer:</p>
        <BulletList
          items={[
            <><strong>Monto:</strong> cantidad de dinero que nos prestan.</>,
            <><strong>Plazo:</strong> tiempo establecido para devolverlo.</>,
            <><strong>Tasa de interés:</strong> costo de utilizar el dinero prestado.</>,
            <><strong>Cuota:</strong> cantidad que debemos pagar periódicamente.</>,
          ]}
        />
      </>
    ),
  },
  {
    pregunta: '¿Cómo podemos manejar correctamente un crédito?',
    opciones: [
      'Pidiendo más dinero del necesario por si acaso.',
      'Pagando cuando podamos, sin importar la fecha.',
      'Pidiendo solo lo necesario, revisando la tasa y las cuotas, y pagando a tiempo.',
    ],
    correcta: 2,
    explicacion: (
      <>
        <p className="mb-2">Para manejar un crédito correctamente debemos ser responsables con nuestros pagos.</p>
        <BulletList
          items={[
            'Pedir solamente el dinero que necesitamos.',
            'Revisar la tasa de interés y las cuotas.',
            'Pagar a tiempo.',
            'Evitar adquirir deudas que no podamos pagar.',
          ]}
        />
      </>
    ),
  },
];

const QUIZ_ENDEUDAMIENTO: QuizQuestion[] = [
  {
    pregunta: '¿Qué significa tener un endeudamiento responsable?',
    opciones: [
      'Adquirir deudas de manera consciente y teniendo en cuenta nuestra capacidad económica.',
      'Usar todo el cupo de crédito disponible.',
      'Dejar de pagar las deudas pequeñas.',
    ],
    correcta: 0,
    explicacion: (
      <BulletList
        items={['Pedir prestado solo lo necesario.', 'Conocer cuánto debemos pagar.', 'Tener en cuenta nuestros ingresos y gastos.', 'Cumplir con las cuotas acordadas.']}
      />
    ),
  },
  {
    pregunta: '¿Por qué es importante conocer nuestros ingresos y gastos antes de adquirir una deuda?',
    opciones: [
      'No es importante si la entidad aprueba el crédito.',
      'Porque nos permite saber si podemos asumir una nueva obligación sin afectar nuestro presupuesto.',
      'Solo sirve para llenar el formulario de la entidad.',
    ],
    correcta: 1,
    explicacion: (
      <BulletList items={['Ayuda a organizar nuestro dinero.', 'Permite saber cuánto tenemos disponible.', 'Evita adquirir deudas que no podamos pagar.']} />
    ),
  },
  {
    pregunta: '¿Cómo podemos saber si tenemos la capacidad de pagar un crédito?',
    opciones: [
      'Comparando nuestros ingresos con nuestros gastos y otras obligaciones, y comprobando que podemos pagar la nueva cuota.',
      'Preguntándole a un amigo si cree que podemos pagarlo.',
      'Si la entidad nos aprueba, seguro podemos pagarlo.',
    ],
    correcta: 0,
    explicacion: (
      <BulletList
        items={['Revisar nuestros ingresos mensuales.', 'Identificar nuestros gastos.', 'Tener en cuenta otras deudas.', 'Comprobar que podemos pagar la nueva cuota.']}
      />
    ),
  },
  {
    pregunta: '¿Qué consecuencias puede tener adquirir más deudas de las que podemos pagar?',
    opciones: [
      'Ninguna, los intereses desaparecen con el tiempo.',
      'Mejora nuestro historial crediticio.',
      'Problemas para pagar las cuotas, acumulación de intereses y riesgo de sobreendeudamiento.',
    ],
    correcta: 2,
    explicacion: (
      <BulletList
        items={[
          'Problemas para pagar las cuotas.',
          'Acumulación de intereses y otros costos.',
          'Menor dinero disponible para nuestras necesidades.',
          'Riesgo de caer en sobreendeudamiento.',
        ]}
      />
    ),
  },
  {
    pregunta: '¿Qué debemos hacer antes de firmar un contrato de crédito?',
    opciones: [
      'Firmar rápido para no perder la oferta.',
      'Leer y comprender todas las condiciones antes de aceptar.',
      'Revisar solo el valor de la primera cuota.',
    ],
    correcta: 1,
    explicacion: (
      <BulletList
        items={[
          'Revisar el monto y el plazo.',
          'Verificar la tasa de interés y las cuotas.',
          'Conocer los costos adicionales.',
          'Asegurarnos de que podemos cumplir con los pagos.',
        ]}
      />
    ),
  },
];

const QUIZ_CARLOS: QuizQuestion[] = [
  {
    pregunta: '¿Qué debería hacer Carlos antes de adquirir otro crédito?',
    opciones: [
      'Pedir el crédito inmediatamente.',
      'Revisar sus ingresos, gastos y deudas.',
      'Pedir más dinero del que necesita.',
      'Ignorar el valor de las cuotas.',
    ],
    correcta: 1,
    explicacion: (
      <p>
        Un buen manejo del dinero comienza con decisiones responsables. Antes de pedir prestado, <strong>piensa, compara y revisa tu capacidad de pago</strong>.
      </p>
    ),
  },
];

export default function ProductosFinancierosPage() {
  return (
    <>
      <PageHero
        page={page}
        eyebrow="Módulo de aprendizaje"
        title="Productos"
        highlight="financieros"
        description="Conoce los productos que ofrecen las entidades financieras, cómo funciona un crédito y cómo endeudarte de manera responsable. Pon a prueba lo aprendido con los quices."
        icon={Briefcase}
      />

      <Section id="productos-ahorro" eyebrow="Portafolio" title="Productos de ahorro y financieros">
        <GlossaryGrid
          items={[
            { icon: Wallet, term: 'Cuenta de ahorros', definition: 'Producto que permite guardar, administrar y utilizar dinero mediante una entidad financiera.' },
            { icon: Landmark, term: 'Cuenta corriente', definition: 'Producto utilizado principalmente para administrar dinero y realizar operaciones de pago.' },
            { icon: PiggyBank, term: 'CDT', definition: 'Producto de ahorro e inversión en el que se deposita dinero durante un plazo determinado a cambio de una rentabilidad.' },
            { icon: CreditCard, term: 'Tarjeta débito', definition: 'Medio de pago que permite utilizar el dinero disponible en una cuenta.' },
            { icon: CreditCard, term: 'Tarjeta de crédito', definition: 'Medio de pago que utiliza un cupo de crédito otorgado por una entidad y que debe pagarse posteriormente.' },
            { icon: HandCoins, term: 'Préstamo o crédito', definition: 'Cantidad de dinero entregada por una entidad que debe ser devuelta en un plazo determinado, generalmente con intereses.' },
            { icon: Store, term: 'Microcrédito', definition: 'Crédito dirigido principalmente a pequeños negocios o actividades productivas de microempresarios.' },
            { icon: Umbrella, term: 'Seguro', definition: 'Producto que brinda protección económica frente a determinados riesgos, de acuerdo con las coberturas contratadas.' },
            { icon: TrendingUp, term: 'Inversión', definition: 'Destinar dinero a un producto o actividad con la expectativa de obtener una rentabilidad.' },
            { icon: BadgePercent, term: 'Rentabilidad', definition: 'Ganancia que puede generar una inversión o producto financiero.' },
            { icon: AlertTriangle, term: 'Riesgo financiero', definition: 'Posibilidad de que ocurra una situación que produzca una pérdida económica o afecte los resultados esperados.' },
          ]}
        />
      </Section>

      <Section id="credito" eyebrow="Crédito" title="¿Qué es un crédito?" tone="mint">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7">
            <Prose>
              <p>
                El crédito es una herramienta financiera que permite obtener dinero para adquirir un bien, cubrir una necesidad o alcanzar una meta, con el compromiso de devolverlo en un tiempo determinado.
              </p>
            </Prose>
          </div>
          <div className="lg:col-span-5">
            <Callout variant="remember" title="Antes de solicitarlo">
              Es importante conocer sus condiciones y asegurarnos de que podemos cumplir con los pagos.
            </Callout>
          </div>
        </div>
        <Quiz titulo="Quiz: el crédito" preguntas={QUIZ_CREDITO} />
      </Section>

      <Section id="partes-credito" eyebrow="Crédito" title="¿Qué partes componen un crédito?">
        <DataTable
          caption="Partes de un crédito"
          headers={['Concepto', '¿Qué significa?']}
          rows={[
            ['Monto', 'Dinero que nos presta la entidad.'],
            ['Plazo', 'Tiempo que tenemos para devolverlo.'],
            ['Tasa de interés', 'Costo que pagamos por el dinero prestado.'],
            ['Cuota', 'Pago que realizamos periódicamente.'],
          ]}
        />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          <div className="md:col-span-8">
            <Callout variant="tip" title="Recuerda">
              Antes de solicitar un crédito, conoce cuánto vas a pagar, durante cuánto tiempo y si realmente puedes asumir esa obligación.
            </Callout>
          </div>
          <div className="md:col-span-4">
            <Link
              href="/simuladores#simulador-credito"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-semibold text-sm shadow-md transition-colors"
            >
              <Calculator className="w-4 h-4" />
              Simular un crédito
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Section>

      <Section id="endeudamiento" eyebrow="Deudas" title="Endeudamiento responsable" tone="mint">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7">
            <Prose>
              <p>
                El endeudamiento responsable consiste en adquirir deudas teniendo en cuenta nuestra situación económica y nuestra capacidad para cumplir con los pagos.
              </p>
            </Prose>
          </div>
          <div className="lg:col-span-5">
            <Callout variant="alert" title="Ojo">
              Una deuda puede ser útil, pero debemos evitar adquirir obligaciones que superen nuestras posibilidades.
            </Callout>
          </div>
        </div>
        <Quiz titulo="Quiz: endeudamiento responsable" preguntas={QUIZ_ENDEUDAMIENTO} />
      </Section>

      <Section id="elementos-endeudamiento" eyebrow="Deudas" title="¿Qué elementos debemos tener en cuenta para un endeudamiento responsable?">
        <DataTable
          caption="Elementos del endeudamiento responsable"
          headers={['Elemento', '¿Qué debemos hacer?']}
          rows={[
            ['Presupuesto', 'Organizar nuestros ingresos y gastos.'],
            ['Capacidad de pago', 'Comprobar que podemos pagar la deuda.'],
            ['Planificación', 'Pensar si realmente necesitamos adquirirla.'],
            ['Pago puntual', 'Cumplir con las cuotas en las fechas establecidas.'],
          ]}
        />
        <Callout variant="remember" title="Recuerda">
          Endeudarse responsablemente significa adquirir solo las deudas que podemos pagar sin afectar nuestras necesidades básicas.
        </Callout>
        <Quiz
          titulo="¿Qué harías tú?"
          descripcion={
            <p className="flex items-start gap-3 bg-brand-50 border border-brand-200 rounded-xl p-4">
              <FileText className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
              <span>
                <strong>Carlos</strong> quiere comprar un celular y está pensando en solicitar un crédito. Sin embargo, ya tiene otras deudas y sus ingresos son limitados.
              </span>
            </p>
          }
          preguntas={QUIZ_CARLOS}
        />
      </Section>
    </>
  );
}
