import { NextResponse } from 'next/server';
import { getOficinas } from '@/lib/db';

export async function GET() {
  try {
    const oficinas = await getOficinas();
    return NextResponse.json(oficinas);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener oficinas' }, { status: 500 });
  }
}
