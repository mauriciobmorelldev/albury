"use client";

import { useLayoutEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

export default function TeamSection() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.from(".team-reveal", {
        autoAlpha: 0,
        y: 22,
        filter: "blur(4px)",
        stagger: 0.06,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 84%", once: true },
      });
      gsap.to(".team-photo", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="grid bg-stone text-charcoal lg:grid-cols-[.95fr_1.05fr]" id="equipo">
      <div className="relative min-h-[56svh] overflow-hidden bg-charcoal">
        <div className="team-photo absolute inset-0 scale-110 bg-cover bg-center opacity-88" style={{ backgroundImage: "url('/renders/albury/web/master-suite.jpg')" }} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,41,49,.82),rgba(13,41,49,.12))]" />
        <div className="team-reveal absolute bottom-8 left-8 right-8 rounded-[30px] border border-warm-white/16 bg-warm-white/12 p-6 text-warm-white backdrop-blur-2xl">
          <p className="text-xs font-black uppercase tracking-[.2em] text-soft-gold">Luxury STR Design</p>
          <p className="mt-3 text-3xl font-black leading-none tracking-[-.03em]">Lujo, funcionalidad y rentabilidad.</p>
        </div>
      </div>
      <div className="flex items-center px-5 py-20 sm:px-8 lg:px-14 lg:py-24">
        <div className="max-w-3xl">
          <p className="team-reveal mb-5 text-xs font-black uppercase tracking-[.22em] text-gold">Nuestro Equipo</p>
          <h2 className="team-reveal text-5xl font-black leading-none tracking-[-.04em] sm:text-7xl">Conoce a Paloma Garcia</h2>
          <div className="team-reveal mt-8 space-y-6 text-lg font-semibold leading-9 text-charcoal/68">
            <p>Paloma Garcia es una de las mentes más brillantes en el mundo del diseño de interiores. Forma parte de <strong className="text-charcoal">RH (Restoration Hardware)</strong>, una de las firmas de diseño más prestigiosas del mundo, y ha trabajado con celebridades como <strong className="text-charcoal">Rihanna y Katy Perry</strong> en proyectos de alto nivel.</p>
            <p>Su experiencia en el sector del <strong className="text-charcoal">alquiler vacacional de lujo</strong> ha llevado a la transformación de propiedades en verdaderos destinos, diseñando villas en <strong className="text-charcoal">Florida que facturan más de $400,000 al año</strong> y en <strong className="text-charcoal">Texas con ingresos superiores a $250,000</strong>.</p>
            <p>Cada espacio que crea está diseñado para <strong className="text-charcoal">atraer más reservas, aumentar tarifas nocturnas y maximizar la rentabilidad</strong>, asegurando que cada propiedad no solo sea un lugar donde hospedarse, sino una experiencia en sí misma.</p>
            <p>Su capacidad para <strong className="text-charcoal">fusionar lujo, funcionalidad y rentabilidad</strong> ha hecho que inversores confíen en su visión para llevar sus propiedades al siguiente nivel.</p>
          </div>
          <button data-booking-trigger className="team-reveal mt-10 rounded-full bg-gold px-7 py-4 text-sm font-black text-warm-white transition hover:-translate-y-1 hover:bg-[#b93322]">Contacta con Nosotros</button>
        </div>
      </div>
    </section>
  );
}


