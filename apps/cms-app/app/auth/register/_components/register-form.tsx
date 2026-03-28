'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BarChart2, CheckCircle2, Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from '@repo/ui';

type RegisterFormValues = {
  orgName: string;
  projectName: string;
  ownerName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      orgName: '',
      projectName: '',
      ownerName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onTouched',
  });

  async function onSubmit(data: RegisterFormValues) {
    setError(null);

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
          email: data.email,
          password: data.password,
          name: data.ownerName,
          organizationName: data.orgName,
          organizationDescription: data.projectName,
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

      toast.success('Cuenta creada correctamente. Ya puedes iniciar sesión.');
      router.push('/auth/login');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ocurrió un error inesperado';
      setError(message);
      toast.error(message);
      console.error(err);
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            {/* Org name */}
            <div>
              <label htmlFor="orgName" className="block text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-1.5">
                Nombre de la organización
              </label>
              <input
                type="text"
                id="orgName"
                aria-invalid={Boolean(errors.orgName)}
                {...register('orgName', {
                  required: 'El nombre de la organización es obligatorio',
                  minLength: {
                    value: 2,
                    message: 'Debe tener al menos 2 caracteres',
                  },
                })}
                className="w-full px-4 py-2.5 bg-gray-100 border-0 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="p. ej. Universidad de Stanford"
              />
              {errors.orgName && (
                <p className="mt-1.5 text-xs text-red-600">{errors.orgName.message}</p>
              )}
            </div>

            {/* Project name */}
            <div>
              <label htmlFor="projectName" className="block text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-1.5">
                Nombre del proyecto
              </label>
              <input
                type="text"
                id="projectName"
                aria-invalid={Boolean(errors.projectName)}
                {...register('projectName', {
                  required: 'El nombre del proyecto es obligatorio',
                  minLength: {
                    value: 2,
                    message: 'Debe tener al menos 2 caracteres',
                  },
                })}
                className="w-full px-4 py-2.5 bg-gray-100 border-0 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="p. ej. Impacto Alumni 2024"
              />
              {errors.projectName && (
                <p className="mt-1.5 text-xs text-red-600">{errors.projectName.message}</p>
              )}
            </div>

            {/* Owner name */}
            <div>
              <label htmlFor="ownerName" className="block text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-1.5">
                Nombre del owner
              </label>
              <input
                type="text"
                id="ownerName"
                aria-invalid={Boolean(errors.ownerName)}
                {...register('ownerName', {
                  required: 'El nombre del owner es obligatorio',
                  minLength: {
                    value: 2,
                    message: 'Debe tener al menos 2 caracteres',
                  },
                })}
                className="w-full px-4 py-2.5 bg-gray-100 border-0 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Juan Pérez"
              />
              {errors.ownerName && (
                <p className="mt-1.5 text-xs text-red-600">{errors.ownerName.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-1.5">
                Correo
              </label>
              <input
                type="email"
                id="email"
                aria-invalid={Boolean(errors.email)}
                {...register('email', {
                  required: 'El correo es obligatorio',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Ingresa un correo válido',
                  },
                })}
                className="w-full px-4 py-2.5 bg-gray-100 border-0 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="admin@geist.edu"
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-600">{errors.email.message}</p>
              )}
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
                  aria-invalid={Boolean(errors.password)}
                  {...register('password', {
                    required: 'La contraseña es obligatoria',
                    minLength: {
                      value: 6,
                      message: 'Debe tener al menos 6 caracteres',
                    },
                  })}
                  className="w-full px-4 py-2.5 bg-gray-100 border-0 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-600">{errors.password.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-1.5">
                  Confirmar password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  aria-invalid={Boolean(errors.confirmPassword)}
                  {...register('confirmPassword', {
                    required: 'Debes confirmar la contraseña',
                    validate: (value) => value === getValues('password') || 'Las contraseñas no coinciden',
                  })}
                  className="w-full px-4 py-2.5 bg-gray-100 border-0 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••"
                />
                {errors.confirmPassword && (
                  <p className="mt-1.5 text-xs text-red-600">{errors.confirmPassword.message}</p>
                )}
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
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 text-sm mt-2"
            >
              {isSubmitting ? 'Registrando...' : 'Registrarse →'}
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
