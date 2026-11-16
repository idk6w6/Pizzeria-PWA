'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { RegistrarUsuario } from '../actions/AuthActions';

export default function Registro() {
  const [state, formAction, pending] = useActionState(RegistrarUsuario, {
    error: '',
  });

  return (
    <main
      className="relative isolate flex min-h-0 flex-1 items-center justify-center bg-neutral-950 bg-cover bg-center px-4 py-3 sm:px-6 sm:py-4"
      style={{ backgroundImage: "url('/images/login-background.jpg')" }}
    >
      <div className="relative z-10 w-full max-w-6xl">
        <section className="grid w-full overflow-hidden rounded-none border-0 bg-transparent shadow-[0_0_50px_20px_rgba(0,0,0,0.75)] md:min-h-[calc(100dvh-6rem)] md:grid-cols-[1.05fr_0.95fr]">
          <div
            aria-hidden="true"
            className="hidden min-h-[260px] md:block md:min-h-full"
          />

          <div className="relative z-10 flex items-center justify-center bg-white px-6 py-5 sm:px-10 sm:py-6 md:px-10 md:py-5 lg:px-12">
            <div className="w-full max-w-md">
              <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-red-700">
                  Crear cuenta
                </h1>
                <p className="mt-2 text-sm text-zinc-500">
                  Completa tus datos para registrarte.
                </p>
              </div>

              <form action={formAction} className="space-y-4">
                <div>
                  <label
                    className="mb-2 block text-sm font-medium text-zinc-700"
                    htmlFor="nombre-usuario"
                  >
                    Nombre de usuario
                  </label>
                  <input
                    autoComplete="nickname"
                    className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-red-600 focus:ring-4 focus:ring-red-100"
                    id="nombre-usuario"
                    name="username"
                    placeholder="Tu nombre de usuario"
                    required
                    type="text"
                  />
                </div>

                <div>
                  <label
                    className="mb-2 block text-sm font-medium text-zinc-700"
                    htmlFor="correo-registro"
                  >
                    Correo electrónico
                  </label>
                  <input
                    autoComplete="email"
                    className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-red-600 focus:ring-4 focus:ring-red-100"
                    id="correo-registro"
                    name="email"
                    placeholder="Tu correo electrónico"
                    required
                    type="email"
                  />
                </div>

                <div>
                  <label
                    className="mb-2 block text-sm font-medium text-zinc-700"
                    htmlFor="contrasena-registro"
                  >
                    Contraseña
                  </label>
                  <input
                    autoComplete="new-password"
                    className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-red-600 focus:ring-4 focus:ring-red-100"
                    id="contrasena-registro"
                    name="password"
                    placeholder="Crea una contraseña"
                    required
                    type="password"
                  />
                </div>

                <button
                  className="w-full rounded-lg bg-red-700 px-4 py-3 font-semibold text-white transition hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-200 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={pending}
                  type="submit"
                >
                  {pending ? 'Creando cuenta…' : 'Registrarme'}
                </button>

                <p
                  aria-live="polite"
                  className="min-h-5 text-center text-sm text-red-600"
                >
                  {state.error}
                </p>
              </form>

              <p className="mt-4 text-center text-sm text-zinc-600">
                ¿Ya tienes cuenta?{' '}
                <Link
                  className="font-semibold text-red-700 transition hover:text-red-800"
                  href="/login"
                >
                  Inicia sesión
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
