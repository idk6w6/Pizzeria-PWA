'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
    {
        image: "/images/inicio-1.jpg",
        title: "El sabor de",
        accent: "compartir",
        description: "Descubre nuestras pizzas y encuentra tu favorita para disfrutar.",
    },
    {
        image: "/images/inicio-2.jpg",
        title: "Tu próxima",
        accent: "favorita",
        description: "Un buen momento sabe mejor con una pizza en la mesa.",
    },
    {
        image: "/images/inicio-3.jpg",
        title: "Mucho sabor",
        accent: "en cada rebanada",
        description: "Explora el menú y elige qué se te antoja hoy.",
    },
];

export default function InicioPage() {
    const [activeSlide, setActiveSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;

        const timer = window.setInterval(() => {
            setActiveSlide((current) => (current + 1) % slides.length);
        }, 6000);

        return () => window.clearInterval(timer);
    }, [isPaused]);

    const showPrevious = () => {
        setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
    };

    const showNext = () => {
        setActiveSlide((current) => (current + 1) % slides.length);
    };

    return (
        <main className="relative isolate flex min-h-[calc(100svh-5rem)] flex-1 overflow-hidden bg-neutral-950">
            <div className="relative min-h-[calc(100svh-5rem)] w-full overflow-hidden bg-neutral-950">
                <div
                    className="absolute inset-0 z-0"
                    aria-hidden="true"
                >
                    {slides.map((slide, index) => (
                        <div
                            key={slide.image}
                            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out motion-reduce:transition-none ${
                                index === activeSlide ? "opacity-100" : "opacity-0"
                            }`}
                            style={{ backgroundImage: `url("${slide.image}")` }}
                        />
                    ))}
                </div>
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-[1] bg-black/40"
                />
                <section
                    aria-label="Destacados de la pizzería"
                    aria-roledescription="carrusel"
                    className="relative z-10 min-h-[calc(100svh-5rem)]"
                >
                    <div className="flex min-h-[calc(100svh-5rem)] flex-col justify-center px-6 pb-28 pt-12 sm:px-12 sm:pb-32 lg:px-20">
                        <div className="relative min-h-[280px] sm:min-h-[270px]">
                            {slides.map((slide, index) => {
                                const isActive = index === activeSlide;

                                return (
                                    <div
                                        key={slide.title}
                                        aria-hidden={!isActive}
                                        className={`absolute inset-0 max-w-2xl transition-opacity duration-700 ease-in-out motion-reduce:transition-none ${
                                            isActive ? "opacity-100" : "pointer-events-none opacity-0"
                                        }`}
                                    >
                                        <h1 className="mt-6 text-5xl font-black leading-[0.95] tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
                                            {slide.title}{" "}
                                            <span className="text-red-400">{slide.accent}</span>
                                        </h1>
                                        <p className="mt-5 max-w-lg text-base leading-7 text-white/80 sm:text-lg">
                                            {slide.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="relative z-20 flex flex-wrap gap-3">
                            <Link
                                className="rounded-full bg-red-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-950/40 transition hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-300"
                                href="/producto"
                            >
                                Ver productos
                            </Link>
                            <Link
                                className="rounded-full border border-white/35 bg-black/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-300"
                                href="/contacto"
                            >
                                Contáctanos
                            </Link>
                        </div>
                    </div>

                    <div className="absolute inset-x-6 bottom-6 z-20 flex items-center justify-between gap-4 sm:inset-x-12 sm:bottom-8 lg:inset-x-20">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2" role="group" aria-label="Elegir diapositiva">
                                {slides.map((slide, index) => (
                                    <button
                                        key={slide.image}
                                        aria-label={`Mostrar diapositiva ${index + 1}`}
                                        aria-current={index === activeSlide ? "true" : undefined}
                                        className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-300 ${
                                            index === activeSlide
                                                ? "w-8 bg-red-400"
                                                : "w-2.5 bg-white/50 hover:bg-white/80"
                                        }`}
                                        onClick={() => setActiveSlide(index)}
                                        type="button"
                                    />
                                ))}
                            </div>
                            <span className="text-xs font-semibold tracking-[0.16em] text-white/70">
                                0{activeSlide + 1} <span className="text-white/40">/</span> 0{slides.length}
                            </span>
                        </div>

                        <div className="flex gap-2">
                            <button
                                aria-label="Diapositiva anterior"
                                className="grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-black/30 text-white transition hover:border-red-300 hover:text-red-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
                                onClick={showPrevious}
                                type="button"
                            >
                                <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                                    <path d="m15 18-6-6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                </svg>
                            </button>
                            <button
                                aria-label="Diapositiva siguiente"
                                className="grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-black/30 text-white transition hover:border-red-300 hover:text-red-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
                                onClick={showNext}
                                type="button"
                            >
                                <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                                    <path d="m9 18 6-6-6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                </svg>
                            </button>
                            <button
                                aria-label={isPaused ? "Reanudar carrusel" : "Pausar carrusel"}
                                className="grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-black/30 text-white transition hover:border-red-300 hover:text-red-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
                                onClick={() => setIsPaused((paused) => !paused)}
                                type="button"
                            >
                                {isPaused ? (
                                    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                ) : (
                                    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M7 5h4v14H7zm6 0h4v14h-4z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
