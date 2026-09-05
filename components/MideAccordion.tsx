"use client";

import { useLayoutEffect, useRef, useState } from "react";
import EditorialTypewriter from "@/components/EditorialTypewriter";
import { getGsap } from "@/lib/gsap";

const pillars = [
  {
    letter: "M",
    title: "Mercado",
    copy: "Estrategia basada en datos: comparables, demanda, pricing y lectura competitiva del destino.",
  },
  {
    letter: "I",
    title: "Impacto",
    copy: "Experiencias y amenidades clave que elevan la percepción de valor y fortalecen la conversión.",
  },
  {
    letter: "D",
    title: "Diagnóstico",
    copy: "Análisis del lugar, la ubicación, el huésped ideal y las brechas que limitan el rendimiento.",
  },
  {
    letter: "E",
    title: "Estandarización",
    copy: "Procesos, decisiones y entregables que evitan errores costosos y sostienen una ejecución consistente.",
  },
];

export default function MideAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!rootRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const panel = rootRef.current.querySelector<HTMLElement>(`[data-mide-panel="${activeIndex}"]`);
    if (!panel) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(panel.querySelectorAll(".mide-panel-reveal"), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.08, ease: "power3.out" });
    }, panel);
    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <section id="mide" className="mide-section px-5 py-20 sm:px-8 lg:px-14 lg:py-28" aria-labelledby="mide-title">
      <div className="mx-auto max-w-7xl">
        <div className="mide-editorial-grid">
          <div className="landing-reveal mide-editorial-intro">
            <p className="section-label">Método M.I.D.E. / resultados</p>
            <span className="mide-watermark" aria-hidden="true">M.I.D.E.</span>
            <h2 id="mide-title" className="section-title">Un método creado para maximizar la rentabilidad.</h2>
            <EditorialTypewriter text="No decoramos. Medimos." />
            <p className="mide-intro-copy">Si no se puede medir, no lo hacemos. M.I.D.E. es el sistema con el que convertimos cada propiedad en un activo.</p>
          </div>

          <div ref={rootRef} className="mide-accordion">
          {pillars.map((pillar, index) => {
            const active = activeIndex === index;
            return (
              <article key={pillar.letter} className={`mide-item ${active ? "is-active" : ""}`}>
                <button
                  type="button"
                  className="mide-trigger"
                  aria-expanded={active}
                  aria-controls={`mide-panel-${index}`}
                  onClick={() => setActiveIndex(index)}
                >
                  <span className="mide-letter">{pillar.letter}</span>
                  <span className="mide-word">{pillar.title}</span>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5v14" /></svg>
                </button>
                <div
                  id={`mide-panel-${index}`}
                  data-mide-panel={index}
                  className="mide-panel"
                  hidden={!active}
                >
                  <p className="mide-panel-reveal">{pillar.copy}</p>
                  <span className="mide-panel-reveal">0{index + 1} / 04</span>
                </div>
              </article>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
