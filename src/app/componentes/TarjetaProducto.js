'use client'

import Image from "next/image";
import {useEffect, useState} from 'react';



const handleEliminar = async () => {
    const confirmacion = window.confirm('¿Estas seguro de eliminar "${producto.nombre}"?')

    if (confirmacion) {
        setCargando(true)
        try {
            await eliminarProducto(producto.id)
        } catch(error) {
            alert('Ocurrio un error al eleiminar el prodcuto')
        }
    }
}


export default function TarjetaProducto({ producto }) {  
    return (
        <article className="group h-full">
            <div className="flex min-h-56 h-full items-center gap-4 rounded-2xl border border-red-300/30 bg-gradient-to-br from-red-700/95 via-red-900/95 to-neutral-950/95 p-4 text-white shadow-xl shadow-black/40 transition duration-300 group-hover:-translate-y-1 group-hover:border-amber-200/60 group-hover:shadow-red-950/60 sm:gap-5 sm:p-5">
                <div className="h-28 w-28 shrink-0 overflow-hidden rounded-full border-4 border-transparent bg-transparent shadow-lg shadow-black/35 sm:h-32 sm:w-32">
                    <Image
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                        src={producto.imagen}
                        width={400}
                        height={300}
                        alt={producto.nombre}
                        sizes="(min-width: 640px) 128px, 112px"
                    />
                </div>

                <div className="flex min-w-0 flex-1 flex-col self-stretch py-1">
                    <h2 className="text-sm font-extrabold leading-tight tracking-tight text-amber-50 sm:text-base md:text-sm lg:text-lg">
                        {producto.nombre}
                    </h2>
                    <h3 className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-amber-200">
                        Descripcion
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm leading-5 text-white/85">
                        {producto.descripcion}
                    </p>

                    <div className="mt-auto flex justify-end pt-3">
                        <div className="rounded-lg bg-amber-100 px-4 py-1.5 text-red-950 shadow-md shadow-black/20">
                            <h3 className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-red-800">
                                Precio
                            </h3>
                            <p className="text-lg font-extrabold leading-tight">
                                {producto.precio}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
