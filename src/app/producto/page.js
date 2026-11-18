import { getProductos } from "../actions/productosActions.js";
import TarjetaProducto from "../componentes/TarjetaProducto.js";


export default async function ProductoPage() {
    const products = await getProductos();

    return (
        <main
            className="relative isolate flex-1 overflow-hidden bg-neutral-950 bg-cover bg-center px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
            style={{ backgroundImage: "url('/images/productos-background.jpg')" }}
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-black/75 via-red-950/60 to-black/75 backdrop-blur-[1px]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-rose-600/20 blur-3xl"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-36 -left-24 h-96 w-96 rounded-full bg-red-700/25 blur-3xl"
            />

            <div className="relative z-10 mx-auto w-full max-w-5xl">
                <header className="mb-10 text-center sm:mb-12">
                    <h1 className="text-4xl font-black tracking-tight text-amber-50 drop-shadow-[0_3px_15px_rgba(0,0,0,0.65)] sm:text-5xl">
                        Nuestros Productos
                    </h1>
                </header>

                <section
                    aria-label="Productos"
                    className="grid grid-cols-1 gap-5 md:grid-cols-2"
                >
                    {products.map((pr) => (
                        <TarjetaProducto key={pr.id} producto={pr} />
                    ))}
                </section>
            </div>
        </main>
    );
}
