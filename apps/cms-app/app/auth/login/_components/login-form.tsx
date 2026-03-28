'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, BookOpen } from 'lucide-react';
import { useForm } from 'react-hook-form';

type LoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onTouched',
  });

  async function onSubmit(data: LoginFormValues) {
    setError(null);

    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
        redirect: false,
      });

      if (result?.error) {
        const authError =
          result.error === 'CredentialsSignin'
            ? 'Credenciales inválidas. Verifica tu correo y contraseña.'
            : result.error || 'Error al iniciar sesión';
        setError(authError);
      } else if (result?.ok) {
        router.push('/dashboard');
      }
    } catch (err) {
      const message = 'Ocurrió un error inesperado';
      setError(message);
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100">
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Logo + Brand */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center mb-4 shadow-lg">
            <BookOpen className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Geist EdTech</h1>
          <p className="text-sm text-gray-500 mt-1">Accede al Portal de Testimonios</p>
        </div>

        {/* Card */}
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-1.5">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
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
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-0 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="name@institution.edu"
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                  Contraseña
                </label>
                <Link href="/auth/forgot-password" className="text-[10px] font-semibold uppercase tracking-widest text-indigo-600 hover:text-indigo-700">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
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
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-0 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                {...register('rememberMe')}
                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="remember" className="text-sm text-gray-600 select-none">
                Mantener sesión iniciada por 30 días
              </label>
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
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
            >
              {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión en el Dashboard →'}
            </button>
          </form>

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            ¿Eres nuevo?{' '}
            <Link href="/auth/register" className="text-indigo-600 font-semibold hover:text-indigo-700">
              Crea una cuenta
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center space-y-2">
        <nav className="flex items-center justify-center gap-6">
          <Link href="#" className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 hover:text-gray-600">
            Seguridad
          </Link>
          <Link href="#" className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 hover:text-gray-600">
            Privacidad
          </Link>
          <Link href="#" className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 hover:text-gray-600">
            Contacto
          </Link>
        </nav>
        <p className="text-[10px] uppercase tracking-widest text-gray-400">
          © 2024 Geist EdTech Solutions
        </p>
      </footer>
    </div>
  );
}
