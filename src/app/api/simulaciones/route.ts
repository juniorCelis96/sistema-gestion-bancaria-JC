import { NextResponse } from 'next/server';
import { addSimulacionGuardada, getSimulacionesGuardadas } from '@/lib/db';

export async function GET() {
  try {
    const simulaciones = await getSimulacionesGuardadas();
    return NextResponse.json(simulaciones);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener simulaciones' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.tipo || !data.clienteNombre || !data.detalles) {
      return NextResponse.json(
        { error: 'Datos de simulación incompletos' },
        { status: 400 }
      );
    }

    const nuevaSimulacion = await addSimulacionGuardada({
      tipo: data.tipo,
      clienteNombre: data.clienteNombre,
      clienteIdentificacion: data.clienteIdentificacion || 'N/A',
      clienteEmail: data.clienteEmail || 'N/A',
      detalles: data.detalles,
      creadoPor: data.creadoPor || 'Asesor Financiero',
    });

    return NextResponse.json({ success: true, simulacion: nuevaSimulacion }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al guardar simulación' }, { status: 500 });
  }
}
