"use client";

import { useLayoutEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

const mistakes = [
  ["01", "Fotos lindas, pocas reservas", "Una propiedad puede verse correcta y aun así no comunicar una razón clara para elegirla en segundos."],
  ["02", "El huésped sigue scrolleando", "En mercados saturados, cada ambiente necesita un momento memorable que detenga el pulgar."],
  ["03", "El precio se vuelve la única ventaja", "Cuando el valor percibido no se entiende, la tarifa termina compitiendo hacia abajo."],
];

const process = [
  ["01", "Análisis estratégico", "Mercado, huésped ideal, competencia, estilo de estadía y oportunidades de diferenciación."],
  ["02", "Concepto visual", "Paleta, narrativa, amenities, zonas fotografiables y prioridades de inversión."],
  ["03", "Diseño virtual STR", "Dirección estética, renders D5 y experiencia digital antes de ejecutar."],
  ["04", "Lanzamiento comercial", "Recorrido inmersivo, portfolio visual y llamados a la acción listos para convertir."],
];

export default function AlburyStorySections() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".story-reveal").forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 36, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 84%",
              end: "top 52%",
              scrub: 0.7,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".story-image").forEach((image) => {
        gsap.fromTo(
          image,
          { scale: 1.08, yPercent: 4 },
          {
            scale: 1,
            yPercent: -3,
            ease: "none",
            scrollTrigger: {
              trigger: image,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      gsap.fromTo(
        ".strategy-scan",
        { xPercent: -120 },
        {
          xPercent: 120,
          duration: 2.2,
          repeat: -1,
          repeatDelay: 1.1,
          ease: "power2.inOut",
          scrollTrigger: { trigger: ".strategy-visual", start: "top 78%", once: true },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <section id="estrategia" className="bg-charcoal px-5 py-24 text-warm-white sm:px-8 lg:px-14 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.78fr_1.22fr] lg:items-center">
          <div className="story-reveal">
            <p className="mb-5 text-xs font-black uppercase tracking-[.22em] text-soft-gold">Resultados que hablan</p>
            <h2 className="text-6xl font-black leading-[.9] tracking-[-.03em] sm:text-8xl">Diseñamos propiedades de alta rentabilidad.</h2>
          </div>
          <div className="story-reveal grid gap-8 lg:grid-cols-[1fr_320px] lg:items-end">
            <p className="text-2xl font-bold leading-9 text-warm-white/88">
              Más que decoración: estrategia visual, amenidades, compras y dirección de proyecto para aumentar reservas, valor percibido y retorno de inversión.
            </p>
            <div className="strategy-visual relative overflow-hidden rounded-[32px] bg-stone shadow-2xl shadow-black/30">
              <div className="story-image h-96 bg-cover bg-center" style={{ backgroundImage: "url('/renders/albury/web/welcome-lounge.jpg')" }} />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(13,41,49,.66),rgba(13,41,49,0)_56%)]" />
              <div className="strategy-scan pointer-events-none absolute -inset-y-10 left-1/2 w-24 rotate-12 bg-gradient-to-r from-transparent via-soft-gold/30 to-transparent blur-sm" />
              <div className="absolute left-5 top-5 rounded-full border border-soft-gold/35 bg-charcoal/45 px-4 py-3 text-[10px] font-black uppercase tracking-[.16em] text-soft-gold backdrop-blur-md">Visual ROI map</div>
              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2 text-center">
                {[
                  ["01", "Hook"],
                  ["02", "Amenity"],
                  ["03", "Reserva"],
                ].map(([number, label]) => (
                  <div key={label} className="rounded-2xl border border-warm-white/18 bg-warm-white/12 px-3 py-3 backdrop-blur-md">
                    <strong className="block text-lg font-black text-warm-white">{number}</strong>
                    <span className="text-[10px] font-black uppercase tracking-[.14em] text-warm-white/68">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-warm-white px-5 py-24 text-charcoal sm:px-8 lg:px-14 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="story-reveal max-w-4xl">
            <p className="mb-5 text-xs font-black uppercase tracking-[.22em] text-gold">Lo que cuesta dinero</p>
            <h2 className="text-6xl font-black leading-[.9] tracking-[-.03em] sm:text-8xl">Una propiedad promedio se olvida rápido.</h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {mistakes.map(([number, title, copy]) => (
              <article key={title} className="story-reveal rounded-[28px] bg-stone p-8">
                <p className="text-sm font-black text-gold">{number}</p>
                <h3 className="mt-10 text-4xl font-black leading-none tracking-[-.02em]">{title}</h3>
                <p className="mt-6 text-base font-semibold leading-8 text-charcoal/64">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="resultados" className="grid bg-stone text-charcoal lg:grid-cols-2">
        <div className="relative min-h-[76svh] overflow-hidden">
          <div className="story-image absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/renders/albury/web/pool-table.jpg')" }} />
        </div>
        <div className="story-reveal flex items-center px-5 py-24 sm:px-8 lg:px-14">
          <div className="max-w-2xl">
            <p className="mb-5 text-xs font-black uppercase tracking-[.22em] text-gold">La diferencia Albury</p>
            <h2 className="text-6xl font-black leading-[.9] tracking-[-.03em] sm:text-8xl">Creamos propiedades que los huéspedes quieren reservar.</h2>
            <p className="mt-8 text-xl font-semibold leading-9 text-charcoal/68">
              Transformamos propiedades de alquiler vacacional en experiencias memorables, fotogénicas y pensadas para convertir más visitas en reservas.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-warm-white p-6">
                <strong className="block text-5xl font-black">STR</strong>
                <span className="mt-2 block text-xs font-black uppercase tracking-[.16em] text-charcoal/50">estrategia visual</span>
              </div>
              <div className="rounded-2xl bg-charcoal p-6 text-warm-white">
                <strong className="block text-5xl font-black">D5</strong>
                <span className="mt-2 block text-xs font-black uppercase tracking-[.16em] text-warm-white/60">render tour</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="proceso" className="bg-charcoal px-5 py-24 text-warm-white sm:px-8 lg:px-14 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.78fr_1.22fr] lg:items-start">
          <div className="story-reveal lg:sticky lg:top-28">
            <p className="mb-5 text-xs font-black uppercase tracking-[.22em] text-soft-gold">De estrategia a reservas</p>
            <h2 className="text-6xl font-black leading-[.9] tracking-[-.03em] sm:text-8xl">Un proceso claro para competir mejor.</h2>
            <p className="mt-8 text-lg font-semibold leading-8 text-warm-white/68">De una propiedad correcta a una experiencia vendible, memorable y lista para mostrarse.</p>
          </div>
          <div className="grid gap-5">
            {process.map(([step, title, copy]) => (
              <article key={title} className="story-reveal rounded-[28px] bg-warm-white p-8 text-charcoal sm:p-10">
                <p className="text-sm font-black text-gold">{step}</p>
                <h3 className="mt-8 text-5xl font-black leading-none tracking-[-.03em]">{title}</h3>
                <p className="mt-5 max-w-xl text-base font-semibold leading-8 text-charcoal/62">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
