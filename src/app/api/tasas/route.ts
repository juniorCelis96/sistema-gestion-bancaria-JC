import { NextResponse } from 'next/server';
import { getTasas, updateTasas } from '@/lib/db';

export async function GET() {
  try {
    const tasas = await getTasas();
    return NextResponse.json(tasas);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener tasas' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const actualizado = await updateTasas(data);
    return NextResponse.json({ success: actualizado });
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar tasas' }, { status: 500 });
  }
}
