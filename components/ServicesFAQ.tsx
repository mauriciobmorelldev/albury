"use client";

import { useLayoutEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

const mapSteps = [
  ["01", "Diseño", "Tableros, estilo y dirección visual para decidir sin fricción."],
  ["02", "Compra", "Lista, prioridades y mobiliario pensado para ahorrar tiempo."],
  ["03", "Instalación", "Guía clara para que cada espacio quede listo para fotografiar."],
  ["04", "Beneficio", "Menos horas perdidas, más control y una propiedad mejor presentada."],
];

export default function ServicesFAQ() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.from(".map-heading > *", {
        autoAlpha: 0,
        y: 28,
        filter: "blur(10px)",
        stagger: 0.08,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 72%", once: true },
      });

      gsap.fromTo(
        ".map-line-fill",
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".decision-map",
            start: "top 70%",
            end: "bottom 30%",
            scrub: 0.8,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(".map-node").forEach((node) => {
        gsap.fromTo(
          node,
          { autoAlpha: 0, y: 42, scale: 0.92, filter: "blur(12px)" },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            ease: "power3.out",
            scrollTrigger: {
              trigger: node,
              start: "top 86%",
              end: "top 42%",
              scrub: 0.75,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".map-orbit").forEach((orbit, index) => {
        gsap.to(orbit, {
          rotate: index % 2 === 0 ? 360 : -360,
          duration: 18 + index * 2,
          repeat: -1,
          ease: "none",
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="servicios" ref={rootRef} className="bg-warm-white px-5 pb-0 pt-24 text-charcoal sm:px-8 lg:px-14 lg:pt-28">
      <div className="mx-auto max-w-7xl">
        <div className="map-heading mx-auto max-w-5xl text-center">
          <p className="mb-5 text-xs font-black uppercase tracking-[.22em] text-gold">Diseño sin fricción</p>
          <h2 className="text-5xl font-black leading-[.95] tracking-[-.03em] text-charcoal sm:text-7xl lg:text-8xl">
            Nosotros tomamos todas las decisiones de diseño por ti
          </h2>
        </div>

        <div className="decision-map relative mx-auto mt-14 min-h-[1040px] max-w-6xl overflow-hidden sm:mt-16 lg:min-h-[1120px]">
          <div className="absolute left-1/2 top-20 h-[900px] w-px -translate-x-1/2 bg-charcoal/10 lg:h-[980px]" />
          <div className="map-line-fill absolute left-1/2 top-20 h-[900px] w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-gold via-charcoal/55 to-gold lg:h-[980px]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-warm-white to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-warm-white to-transparent" />

          <div className="absolute left-1/2 top-8 z-10 -translate-x-1/2 rounded-full border border-gold/25 bg-stone/70 px-5 py-3 text-[10px] font-black uppercase tracking-[.22em] text-charcoal/58 shadow-[0_18px_70px_rgba(13,41,49,.08)] backdrop-blur-xl">
            Mapa de decisiones
          </div>

          <div className="grid gap-20 pt-32 sm:gap-24">
            {mapSteps.map(([number, title, copy], index) => (
              <article
                key={title}
                className={`map-node relative grid items-center gap-5 md:grid-cols-[1fr_116px_1fr] ${index % 2 === 0 ? "md:[&_.map-copy]:col-start-1 md:[&_.map-copy]:text-right" : "md:[&_.map-copy]:col-start-3"}`}
              >
                <div className="map-copy rounded-[32px] border border-charcoal/10 bg-warm-white/82 p-7 shadow-[0_24px_90px_rgba(13,41,49,.08)] backdrop-blur-xl md:row-start-1">
                  <p className="text-xs font-black uppercase tracking-[.18em] text-gold">Paso {number}</p>
                  <h3 className="mt-3 text-5xl font-black leading-none tracking-[-.04em] text-charcoal">{title}</h3>
                  <p className="mt-4 text-base font-semibold leading-7 text-charcoal/62">{copy}</p>
                </div>
                <div className="relative z-10 mx-auto grid h-24 w-24 place-items-center rounded-full border border-gold/35 bg-warm-white text-sm font-black text-charcoal shadow-[0_24px_70px_rgba(227,74,46,.14)] md:col-start-2 md:row-start-1">
                  <span className="map-orbit absolute -inset-3 rounded-full border border-dashed border-gold/24" />
                  <span className="absolute inset-3 rounded-full bg-gold/10" />
                  <span className="relative">{number}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



