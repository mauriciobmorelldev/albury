"use client";

import { useLayoutEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

export default function FinalCTA() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.from(".cta-reveal > *", {
        autoAlpha: 0,
        y: 30,
        filter: "blur(10px)",
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 68%", once: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contacto" ref={rootRef} className="relative overflow-hidden bg-charcoal px-5 py-24 text-warm-white sm:px-8 lg:px-14 lg:py-32">
      <div className="absolute inset-x-0 top-0 wave-divider-stone rotate-180" />
      <div className="mx-auto grid max-w-7xl gap-12 pt-16 lg:grid-cols-[1fr_520px] lg:items-center">
        <div className="cta-reveal">
          <p className="mb-5 text-xs font-black uppercase tracking-[.22em] text-soft-gold">De propiedad linda a oferta reservable</p>
          <h2 className="max-w-5xl text-6xl font-black uppercase leading-[.88] tracking-[-.035em] sm:text-8xl lg:text-9xl">
            Convirtamos tu propiedad en una oferta que los huéspedes quieran reservar.
          </h2>
          <p className="mt-8 max-w-2xl text-xl font-semibold leading-9 text-warm-white/72">
            Agenda un diagnóstico gratis y descubrí qué está frenando reservas, tarifa y diferenciación antes de invertir en diseño.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="mailto:info@alburydesign.com" className="inline-flex items-center justify-center gap-4 rounded-lg bg-gold px-7 py-4 text-sm font-black text-warm-white transition hover:-translate-y-1 hover:bg-[#b93322]">
              Diagnóstico Gratis <span className="grid h-8 w-8 place-items-center rounded-full bg-warm-white/16">→</span>
            </a>
            <a href="mailto:info@alburydesign.com" className="inline-flex items-center justify-center rounded-lg border border-warm-white/28 px-7 py-4 text-sm font-black text-warm-white transition hover:-translate-y-1 hover:bg-warm-white/10">
              Solicitar información
            </a>
          </div>
        </div>

        <div className="cta-reveal overflow-hidden rounded-[34px] bg-stone">
          <div className="min-h-[520px] bg-cover bg-center" style={{ backgroundImage: "url('/renders/albury/web/master-suite.jpg')" }} />
        </div>
      </div>
    </section>
  );
}


