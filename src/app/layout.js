import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { getCurrentUser } from "./lib/supServer";
import { CerrarSesion } from "./actions/AuthActions";
import RegistrarSW from "./componentes/RegistrarSW";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PWA Site",
  description: "Productos y contacto de PWA Site",
};

export default async function RootLayout({ children }) {
  const user = await getCurrentUser();
  const userName =
    user?.user_metadata?.display_name ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Usuario";

  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <header className="border-b border-zinc-200 bg-red-950">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
            <Link className="text-xl font-bold tracking-tight text-white" href="/inicio">
              PIZZA'S LEO
            </Link>

            {user && (
              <div className="flex flex-wrap items-center gap-6">
                <nav aria-label="Navegación principal" className="flex gap-5 text-5m font-medium text-zinc-600">
                  <Link className="text-amber-600 transition-colors hover:text-white active:text-white" href="/inicio">
                    Inicio
                  </Link>
                  <Link className="text-amber-600 transition-colors hover:text-white active:text-white" href="/producto">
                    Products
                  </Link>
                  <Link className="text-amber-600 transition-colors hover:text-white active:text-white" href="/contacto">
                    Contact
                  </Link>
                </nav>
                <details className="relative">
                  <summary className="cursor-pointer list-none rounded-full bg-amber-600 px-4 py-2 text-sm font-medium text-white">
                    Cuenta: {userName}
                  </summary>
                  <form
                    action={CerrarSesion}
                    className="absolute right-0 z-10 mt-2 w-40 rounded-lg border border-zinc-200 bg-white p-2 shadow-lg"
                  >
                    <button
                      className="w-full rounded-md px-3 py-2 text-left text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
                      type="submit"
                    >
                      Cerrar sesión
                    </button>
                  </form>
                </details>
              </div>
            )}
          </div>
        </header>

        {children}
        <RegistrarSW authenticated={Boolean(user)} />
      </body>
    </html>
  );
}
