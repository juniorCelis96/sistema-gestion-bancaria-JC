import { NextResponse } from 'next/server';
import { getTasas } from '@/lib/db';

export async function GET() {
  try {
    const tasas = await getTasas();
    return NextResponse.json(tasas);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener tasas' }, { status: 500 });
  }
}
