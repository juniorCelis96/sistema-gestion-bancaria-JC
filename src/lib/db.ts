import fs from 'fs/promises';
import path from 'path';
import {
  Producto,
  Oficina,
  FAQ,
  Usuario,
  MensajeContacto,
  SimulacionGuardada,
  TasasConfig,
} from '@/types';

const dataDirectory = path.join(process.cwd(), 'data');

async function readJsonFile<T>(filename: string, defaultValue: T): Promise<T> {
  try {
    const filePath = path.join(dataDirectory, filename);
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return defaultValue;
  }
}

async function writeJsonFile<T>(filename: string, data: T): Promise<boolean> {
  try {
    const filePath = path.join(dataDirectory, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    return false;
  }
}

// PRODUCTOS
export async function getProductos(): Promise<Producto[]> {
  return readJsonFile<Producto[]>('productos.json', []);
}

export async function saveProducto(producto: Producto): Promise<boolean> {
  const productos = await getProductos();
  const index = productos.findIndex((p) => p.id === producto.id);
  if (index >= 0) {
    productos[index] = producto;
  } else {
    productos.push(producto);
  }
  return writeJsonFile('productos.json', productos);
}

// OFICINAS Y CAJEROS
export async function getOficinas(): Promise<Oficina[]> {
  return readJsonFile<Oficina[]>('oficinas.json', []);
}

export async function saveOficina(oficina: Oficina): Promise<boolean> {
  const oficinas = await getOficinas();
  const index = oficinas.findIndex((o) => o.id === oficina.id);
  if (index >= 0) {
    oficinas[index] = oficina;
  } else {
    oficinas.push(oficina);
  }
  return writeJsonFile('oficinas.json', oficinas);
}

// FAQS
export async function getFaqs(): Promise<FAQ[]> {
  return readJsonFile<FAQ[]>('faqs.json', []);
}

// TASAS DE SIMULADORES
export async function getTasas(): Promise<TasasConfig> {
  return readJsonFile<TasasConfig>('tasas.json', {
    creditos: [],
    cdt: { rangos: [], montoMinimo: 500000, montoMaximo: 1000000000, retencionFuente: 4.0 },
  });
}

export async function updateTasas(tasas: TasasConfig): Promise<boolean> {
  return writeJsonFile('tasas.json', tasas);
}

// USUARIOS
export async function getUsuarios(): Promise<Usuario[]> {
  return readJsonFile<Usuario[]>('usuarios.json', []);
}

export async function getUsuarioByEmail(email: string): Promise<Usuario | undefined> {
  const usuarios = await getUsuarios();
  return usuarios.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

// MENSAJES DE CONTACTO
export async function getMensajesContacto(): Promise<MensajeContacto[]> {
  return readJsonFile<MensajeContacto[]>('mensajes-contacto.json', []);
}

export async function addMensajeContacto(
  mensaje: Omit<MensajeContacto, 'id' | 'fecha' | 'estado'>
): Promise<MensajeContacto> {
  const mensajes = await getMensajesContacto();
  const nuevoMensaje: MensajeContacto = {
    ...mensaje,
    id: `msg-${Date.now()}`,
    fecha: new Date().toISOString(),
    estado: 'pendiente',
  };
  mensajes.unshift(nuevoMensaje);
  await writeJsonFile('mensajes-contacto.json', mensajes);
  return nuevoMensaje;
}

export async function updateMensajeEstado(
  id: string,
  estado: 'pendiente' | 'atendido'
): Promise<boolean> {
  const mensajes = await getMensajesContacto();
  const index = mensajes.findIndex((m) => m.id === id);
  if (index >= 0) {
    mensajes[index].estado = estado;
    return writeJsonFile('mensajes-contacto.json', mensajes);
  }
  return false;
}

// SIMULACIONES GUARDADAS
export async function getSimulacionesGuardadas(): Promise<SimulacionGuardada[]> {
  return readJsonFile<SimulacionGuardada[]>('simulaciones.json', []);
}

export async function addSimulacionGuardada(
  sim: Omit<SimulacionGuardada, 'id' | 'fecha'>
): Promise<SimulacionGuardada> {
  const simulaciones = await getSimulacionesGuardadas();
  const nuevaSimulacion: SimulacionGuardada = {
    ...sim,
    id: `sim-${Date.now()}`,
    fecha: new Date().toISOString(),
  };
  simulaciones.unshift(nuevaSimulacion);
  await writeJsonFile('simulaciones.json', simulaciones);
  return nuevaSimulacion;
}
