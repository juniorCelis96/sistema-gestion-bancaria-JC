export type CategoriaProducto = 'cuentas' | 'cdt' | 'creditos';

export interface Producto {
  id: string;
  nombre: string;
  categoria: CategoriaProducto;
  categoriaNombre: string;
  descripcion: string;
  caracteristicas: string[];
  requisitos: string[];
  tasaReferencial: string;
  destacado: boolean;
}

export interface Oficina {
  id: string;
  nombre: string;
  tipo: 'sucursal' | 'cajero';
  ciudad: string;
  departamento: string;
  direccion: string;
  telefono: string;
  horario: string;
  servicios: string[];
}

export interface FAQ {
  id: string;
  categoria: 'creditos' | 'cdt' | 'productos' | 'sistema';
  pregunta: string;
  respuesta: string;
}

export type RolUsuario = 'asesor' | 'admin';

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  password?: string;
  rol: RolUsuario;
  cargo: string;
  sucursal: string;
  activo: boolean;
}

export interface MensajeContacto {
  id: string;
  fecha: string;
  nombre: string;
  email: string;
  telefono: string;
  tipoConsulta: string;
  asunto: string;
  mensaje: string;
  estado: 'pendiente' | 'atendido';
}

export interface DetalleCredito {
  tipoCredito: string;
  monto: number;
  plazoMeses: number;
  tasaNominalMensual: number;
  cuotaMensual: number;
  totalPagar: number;
  totalIntereses: number;
}

export interface DetalleCDT {
  montoInversion: number;
  plazoDias: number;
  tasaEA: number;
  rendimientoBruto: number;
  retencionFuente: number;
  rendimientoNeto: number;
  totalRecibir: number;
}

export interface SimulacionGuardada {
  id: string;
  fecha: string;
  tipo: 'credito' | 'cdt';
  clienteNombre: string;
  clienteIdentificacion: string;
  clienteEmail: string;
  detalles: DetalleCredito | DetalleCDT;
  creadoPor: string;
}

export interface CreditoTasaConfig {
  tipo: string;
  nombre: string;
  tasaNominalMensual: number;
  tasaEfectivaAnual: number;
  montoMinimo: number;
  montoMaximo: number;
  plazoMinimoMeses: number;
  plazoMaximoMeses: number;
}

export interface CDTRangoConfig {
  diasMin: number;
  diasMax: number;
  tasaEA: number;
}

export interface TasasConfig {
  creditos: CreditoTasaConfig[];
  cdt: {
    rangos: CDTRangoConfig[];
    montoMinimo: number;
    montoMaximo: number;
    retencionFuente: number;
  };
}
