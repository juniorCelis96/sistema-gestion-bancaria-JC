import fs from 'fs/promises';
import path from 'path';
import { Producto, Oficina, FAQ, TasasConfig } from '@/types';

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

// PRODUCTOS
export async function getProductos(): Promise<Producto[]> {
  return readJsonFile<Producto[]>('productos.json', []);
}

// OFICINAS Y CAJEROS
export async function getOficinas(): Promise<Oficina[]> {
  return readJsonFile<Oficina[]>('oficinas.json', []);
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
