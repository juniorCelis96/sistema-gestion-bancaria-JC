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
