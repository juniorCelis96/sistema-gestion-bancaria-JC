import { NextResponse } from 'next/server';
import { getProductos } from '@/lib/db';

export async function GET() {
  try {
    const productos = await getProductos();
    return NextResponse.json(productos);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener productos' }, { status: 500 });
  }
}
