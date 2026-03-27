'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BarChart2, CheckCircle2, Sparkles } from 'lucide-react';

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setIsLoading(false);
      return;
    }

    try {
      if (!apiUrl) {
        throw new Error('NEXT_PUBLIC_API_URL no está configurada');
      }

      const response = await fetch(`${apiUrl}/auth/owner`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.get('email'),
          password,
          name: formData.get('ownerName'),
          organizationName: formData.get('orgName'),
          organizationDescription: formData.get('projectName'),
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        const message =
          body && typeof body.message === 'string'
            ? body.message
            : 'No se pudo registrar la cuenta';
        throw new Error(message);
      }

      router.push('/auth/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* ── Left side ── */}
      <div className="hidden lg:flex flex-col w-1/2 bg-white px-12 py-10">
        {/* Navbar */}
        <div className="flex items-center gap-2 mb-auto">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow">
            <BarChart2 className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-gray-900 text-base">Geist EdTech</span>
        </div>

        {/* Hero */}
        <div className="flex flex-col justify-center flex-1 max-w-md">
          <span className="inline-block text-[10px] font-semibold uppercase tracking-widest text-indigo-600 border border-indigo-200 bg-indigo-50 rounded-full px-3 py-1 mb-6 w-fit">
            Gestión editorial
          </span>

          <h2 className="text-5xl font-light text-gray-900 leading-tight mb-4">
            Cura tu{' '}
            <span className="text-indigo-500 font-light">
              narrativa
              <br />
              educativa.
            </span>
          </h2>

          <p className="text-sm text-gray-500 leading-relaxed mb-10 max-w-xs">
            Únete a la plataforma líder para capturar, gestionar y mostrar el impacto de los estudiantes a través de testimonios estructurados.
          </p>

          {/* Feature cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-gray-100 rounded-xl p-5 bg-gray-50">
              <div className="w-8 h-8 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-500" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Prueba Social</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Flujos de trabajo automatizados de recopilación y verificación.
              </p>
            </div>
            <div className="border border-gray-100 rounded-xl p-5 bg-gray-50">
              <div className="w-8 h-8 flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5 text-indigo-500" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Control Editorial</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Herramientas de diseño sofisticadas para presentaciones de alta gama.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-auto" />
      </div>

      {/* ── Right side ── */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Crear cuenta</h1>
          <p className="text-sm text-gray-500 mb-7">Ingresa tus datos para empezar a curar.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Org name */}
            <div>
              <label htmlFor="orgName" className="block text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-1.5">
                Nombre de la organización
              </label>
              <input
                type="text"
                id="orgName"
                name="orgName"
                required
                className="w-full px-4 py-2.5 bg-gray-100 border-0 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="p. ej. Universidad de Stanford"
              />
            </div>

            {/* Project name */}
            <div>
              <label htmlFor="projectName" className="block text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-1.5">
                Nombre del proyecto
              </label>
              <input
                type="text"
                id="projectName"
                name="projectName"
                required
                className="w-full px-4 py-2.5 bg-gray-100 border-0 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="p. ej. Impacto Alumni 2024"
              />
            </div>

            {/* Owner name */}
            <div>
              <label htmlFor="ownerName" className="block text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-1.5">
                Nombre del owner
              </label>
              <input
                type="text"
                id="ownerName"
                name="ownerName"
                required
                className="w-full px-4 py-2.5 bg-gray-100 border-0 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Juan Pérez"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-1.5">
                Correo
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2.5 bg-gray-100 border-0 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="admin@geist.edu"
              />
            </div>

            {/* Password + Confirm */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="password" className="block text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="w-full px-4 py-2.5 bg-gray-100 border-0 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-1.5">
                  Confirmar password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  className="w-full px-4 py-2.5 bg-gray-100 border-0 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2.5 rounded-lg">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 text-sm mt-2"
            >
              {isLoading ? 'Registrando...' : 'Registrarse →'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/auth/login" className="text-indigo-600 font-semibold hover:text-indigo-700">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
