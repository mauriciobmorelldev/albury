"use client";

import { useLayoutEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

const methodSteps = [
  ["01", "Objetivo", "Definimos qué tiene que lograr la propiedad: más reservas, mejor tarifa, más clics o mejor posicionamiento."],
  ["02", "Perfil del cliente", "Entendemos quién reserva, qué espera y qué señales visuales aumentan confianza."],
  ["03", "Dolores y objeciones", "Detectamos por qué un huésped podría ignorar el anuncio, compararlo por precio o dudar antes de reservar."],
  ["04", "Deseos", "Convertimos amenities, espacios y detalles en motivos concretos para imaginar la estadía."],
  ["05", "Pruebas", "Renders, composición fotográfica y datos sostienen la promesa antes de ejecutar."],
  ["06", "Narrativa", "Ordenamos jerarquía, diseño y copy para que el anuncio venda sin sentirse forzado."],
];

export default function ServicesFAQ() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.from(".method-reveal", {
        autoAlpha: 0,
        y: 22,
        filter: "blur(4px)",
        stagger: 0.06,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 78%", once: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="servicios" ref={rootRef} className="bg-warm-white px-5 py-24 text-charcoal sm:px-8 lg:px-14 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
          <div className="method-reveal">
            <p className="mb-5 text-xs font-black uppercase tracking-[.22em] text-gold">Jerarquía antes que animación</p>
            <h2 className="text-5xl font-black leading-[.92] tracking-[-.035em] sm:text-7xl lg:text-8xl">Un funnel visual para que tu propiedad se entienda y se desee.</h2>
          </div>
          <p className="method-reveal max-w-3xl text-xl font-bold leading-9 text-charcoal/68">La web, los renders y el anuncio no deberían sentirse como un juego. Tienen que guiar una decisión: captar atención, generar identificación, mostrar una solución diferente, probar credibilidad, reducir riesgo e invitar a actuar.</p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {methodSteps.map(([number, title, copy]) => (
            <article key={title} className="method-reveal group rounded-[30px] border border-charcoal/10 bg-stone p-7 shadow-[0_20px_70px_rgba(13,41,49,.06)] transition duration-300 hover:-translate-y-1 hover:bg-warm-white">
              <div className="flex items-center justify-between gap-5">
                <p className="grid h-12 w-12 place-items-center rounded-full bg-charcoal text-sm font-black text-warm-white">{number}</p>
                <div className="h-px flex-1 bg-charcoal/10" />
              </div>
              <h3 className="mt-8 text-4xl font-black leading-none tracking-[-.03em] text-charcoal">{title}</h3>
              <p className="mt-5 text-base font-semibold leading-8 text-charcoal/62">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
