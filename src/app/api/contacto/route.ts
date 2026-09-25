import { NextResponse } from 'next/server';
import { addMensajeContacto, getMensajesContacto, updateMensajeEstado } from '@/lib/db';

export async function GET() {
  try {
    const mensajes = await getMensajesContacto();
    return NextResponse.json(mensajes);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener mensajes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.nombre || !data.email || !data.mensaje) {
      return NextResponse.json(
        { error: 'Nombre, email y mensaje son campos obligatorios' },
        { status: 400 }
      );
    }

    const nuevoMensaje = await addMensajeContacto({
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono || '',
      tipoConsulta: data.tipoConsulta || 'general',
      asunto: data.asunto || 'Consulta general',
      mensaje: data.mensaje,
    });

    return NextResponse.json({ success: true, mensaje: nuevoMensaje }, { status: 201 });
  } catch (error) {
    console.error('Error al guardar mensaje:', error);
    return NextResponse.json({ error: 'Error al procesar el mensaje' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, estado } = await request.json();
    if (!id || !estado) {
      return NextResponse.json({ error: 'ID y estado requeridos' }, { status: 400 });
    }
    const actualizado = await updateMensajeEstado(id, estado);
    return NextResponse.json({ success: actualizado });
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar mensaje' }, { status: 500 });
  }
}
