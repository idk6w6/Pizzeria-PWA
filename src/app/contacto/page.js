'use client';

import { useState } from 'react';

export default function ContactoPage() {
  const [correo, setCorreo] = useState('');
  const [motivo, setMotivo] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoMensaje = {
      correo,
      motivo,
      mensaje,
    };

    localStorage.setItem('Mensaje', JSON.stringify(nuevoMensaje));
    console.log('DATOS GUARDADOS EN LOCAL STORAGE:', nuevoMensaje);

    setCorreo('');
    setMotivo('');
    setMensaje('');
  };

  return (
    <main className="grid flex-1 bg-neutral-950 lg:min-h-[calc(100vh-4.5rem)] lg:grid-cols-2">
      <section
        aria-label="Presentación de la pizzería"
        className="relative flex min-h-[420px] items-end overflow-hidden bg-neutral-500 bg-cover bg-center px-7 py-10 sm:px-12 sm:py-14 lg:min-h-0 lg:px-14 lg:py-16"
        style={{ backgroundImage: "url('/images/pizzeria-contacto.jpg')" }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/20"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent"
        />

        <div className="relative z-10 max-w-xl">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-white/80">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-red-500" />
            contacto
          </p>
          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            El sabor de una buena pizza{' '}
            <span className="text-red-500">reúne a todos.</span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-white/75 sm:text-lg">
            ¿Tienes una pregunta, una idea para tu pedido o quieres compartir
            tu experiencia? Nos encantará leerte.
          </p>
          <div className="mt-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            <span className="h-px w-10 bg-red-500" />
            Pedidos · reservas · buenos momentos
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center bg-neutral-950 px-5 py-12 sm:px-10 lg:px-14 lg:py-16">
        <div className="w-full max-w-xl">
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-red-500">
              Estamos para escucharte
            </p>
            <p className="mt-3 text-sm leading-6 text-neutral-400 sm:text-base">
              Déjanos tus datos y cuéntanos qué necesitas.
            </p>
          </div>

          <form
            id="contacto-form"
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            <div>
              <label
                htmlFor="correo"
                className="mb-2 block text-sm font-medium text-neutral-200"
              >
                Correo electrónico
              </label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                id="correo"
                placeholder="ejemplo@correo.com"
                required
                className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 text-white outline-none transition placeholder:text-neutral-500 hover:border-neutral-600 focus:border-red-500 focus:ring-4 focus:ring-red-500/15"
              />
            </div>

            <div>
              <label
                htmlFor="motivo"
                className="mb-2 block text-sm font-medium text-neutral-200"
              >
                Motivo del contacto
              </label>
              <input
                type="text"
                id="motivo"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                placeholder="Pedido, reserva, comentario..."
                required
                className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 text-white outline-none transition placeholder:text-neutral-500 hover:border-neutral-600 focus:border-red-500 focus:ring-4 focus:ring-red-500/15"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="mensaje"
                className="mb-2 block text-sm font-medium text-neutral-200"
              >
                Mensaje
              </label>
              <textarea
                id="mensaje"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Cuéntanos los detalles de tu pedido o consulta..."
                required
                rows={5}
                className="w-full resize-y rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 text-white outline-none transition placeholder:text-neutral-500 hover:border-neutral-600 focus:border-red-500 focus:ring-4 focus:ring-red-500/15"
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3.5 font-semibold text-white transition hover:bg-red-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-500/30 sm:col-span-2"
            >
              Enviar mensaje
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
