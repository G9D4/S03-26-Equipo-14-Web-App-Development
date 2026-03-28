import globalEnv from '@repo/env';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiUrl = globalEnv.NEXT_PUBLIC_API_URL;
    const response = await fetch(apiUrl, {
      method: 'GET',
      cache: 'no-store', // Importante para que no cachee la respuesta
    });

    return NextResponse.json({ ok: true, status: response.status });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: 'Error al despertar el backend' },
      { status: 500 },
    );
  }
}
