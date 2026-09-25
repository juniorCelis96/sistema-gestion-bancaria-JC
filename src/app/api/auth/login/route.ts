import { NextResponse } from 'next/server';
import { getUsuarioByEmail } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña requeridos' },
        { status: 400 }
      );
    }

    const usuario = await getUsuarioByEmail(email);

    if (!usuario || usuario.password !== password) {
      return NextResponse.json(
        { error: 'Credenciales inválidas. Por favor verifique sus datos.' },
        { status: 401 }
      );
    }

    if (!usuario.activo) {
      return NextResponse.json(
        { error: 'El usuario se encuentra inactivo. Contacte al administrador.' },
        { status: 403 }
      );
    }

    // Retornamos el usuario excluyendo la contraseña
    const { password: _, ...usuarioSinPassword } = usuario;

    return NextResponse.json({
      success: true,
      usuario: usuarioSinPassword,
    });
  } catch (error) {
    console.error('Error en autenticación:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
