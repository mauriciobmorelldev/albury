"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { alburyProjects } from "@/data/alburyProjects";
import { getGsap } from "@/lib/gsap";

const comparisons = [
  {
    projectSlug: "hot-springs-str",
    before: "/milanote-assets/WhatsApp Image 2026-08-07 at 9.46.49 PM (1).jpeg",
    beforeAlt: "Dormitorio de presentación genérica",
    after: "/milanote-assets/WhatsApp Image 2026-08-07 at 9.48.41 PM (1).jpeg",
    afterAlt: "Exterior diseñado para una experiencia memorable",
    line: "De una propiedad que se describe a una experiencia que se desea.",
  },
  {
    projectSlug: "st-agustin",
    before: "/renders/living.jpg",
    beforeAlt: "Living sin una dirección comercial definida",
    after: "/zip-assets/properties/st-agustin-hero-firepit.webp",
    afterAlt: "Firepit de St Agustin como ancla de la experiencia",
    line: "De amenidades genéricas a momentos que justifican una tarifa superior.",
  },
  {
    projectSlug: "sa-figuereta",
    before: "/milanote-assets/WhatsApp Image 2026-08-07 at 9.46.48 PM.jpeg",
    beforeAlt: "Interior neutro sin un gancho de reserva claro",
    after: "/zip-assets/properties/sa-figuereta-pool-1.webp",
    afterAlt: "Piscina de Sa Figuereta como gancho principal del listing",
    line: "De espacio correcto a activo premium que compite por valor.",
  },
];

function formatMetric(label: string, projectSlug: string) {
  const project = alburyProjects.find((item) => item.slug === projectSlug);
  const metric = project?.metrics.find((item) => item.label.toLowerCase().includes(label));
  return metric ? `${metric.prefix ?? ""}${metric.value.toLocaleString("en-US")}${metric.suffix ?? ""}` : "—";
}

export default function BeforeAfterShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const active = comparisons[activeIndex];
  const project = alburyProjects.find((item) => item.slug === active.projectSlug);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const target = stage.querySelector<HTMLElement>("[data-typewriter]");
    const caret = stage.querySelector<HTMLElement>(".comparison-typewriter i");
    if (!target || !caret) return;
    const fullText = target.dataset.typewriter ?? "";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.textContent = reduceMotion ? fullText : "";
    caret.style.opacity = reduceMotion ? "0" : "1";
    if (reduceMotion) return;

    const { gsap } = getGsap();
    const cursor = { length: 0 };
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { overwrite: "auto" } });
      timeline
        .fromTo(".comparison-frame", { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.08, ease: "power3.out" })
        .fromTo(".comparison-after-image", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.95, ease: "power4.inOut" }, "-=0.4")
        .fromTo(caret, { autoAlpha: 0, scaleY: 0.35 }, { autoAlpha: 1, scaleY: 1, duration: 0.28, ease: "power2.out" }, "-=0.18")
        .to(cursor, {
          length: fullText.length,
          duration: Math.min(2.35, Math.max(1.05, fullText.length * 0.022)),
          ease: "none",
          snap: { length: 1 },
          onUpdate: () => {
            if (target) target.textContent = fullText.slice(0, Math.round(cursor.length));
          },
        }, "+=0.12")
        .to(caret, { autoAlpha: 0.25, duration: 0.35, ease: "power2.out" }, "+=0.3");
    }, stage);
    return () => ctx.revert();
  }, [activeIndex, active.line]);

  return (
    <section id="comparativa" className="before-after-section px-5 py-20 sm:px-8 lg:px-14 lg:py-28" aria-labelledby="before-after-title">
      <div className="mx-auto max-w-7xl">
        <div className="landing-reveal before-after-heading">
          <p className="section-label">Casos reales / rendimiento</p>
          <h2 id="before-after-title" className="section-title">La prueba visual vende antes de la llamada.</h2>
          <p>Tres propiedades, tres lecturas de mercado. Seleccioná un caso para recorrer su dirección visual y las métricas que sostienen cada decisión.</p>
        </div>

        <div className="comparison-tabs mt-10" role="tablist" aria-label="Seleccionar caso">
          {comparisons.map((item, index) => {
            const itemProject = alburyProjects.find((projectItem) => projectItem.slug === item.projectSlug);
            return (
              <button key={item.projectSlug} type="button" role="tab" aria-selected={activeIndex === index} onClick={() => setActiveIndex(index)}>
                <span>0{index + 1}</span>{itemProject?.title}
              </button>
            );
          })}
        </div>

        <div ref={stageRef} className="comparison-stage mt-8" role="tabpanel" aria-live="polite">
          <div className="comparison-collage">
            <figure className="comparison-frame comparison-main">
              <div className="comparison-after-image absolute inset-0">
                <Image src={active.after} alt={active.afterAlt} fill sizes="(max-width: 900px) 100vw, 43vw" className="object-cover" />
              </div>
              <figcaption><span>Dirección visual</span><strong>{project?.title}</strong></figcaption>
            </figure>

            <div className="comparison-after-stack">
              <figure className="comparison-frame comparison-before">
                <Image src={active.before} alt={active.beforeAlt} fill sizes="(max-width: 900px) 100vw, 24vw" className="object-cover" />
                <figcaption><span>Antes / sin método</span><strong>Sin dirección medible</strong></figcaption>
              </figure>
              <figure className="comparison-frame comparison-detail">
                <Image src={project?.gallery[1]?.src ?? active.after} alt={project?.gallery[1]?.alt ?? active.afterAlt} fill sizes="(max-width: 900px) 100vw, 30vw" className="object-cover" />
                <figcaption><span>Después / detalle</span><strong>Una experiencia que se recuerda</strong></figcaption>
              </figure>
            </div>
          </div>

          <aside className="comparison-story comparison-frame">
            <p className="comparison-project">Caso 0{activeIndex + 1} · {project?.title}</p>
            <p className="comparison-typewriter"><span data-typewriter={active.line} /> <i aria-hidden="true" /></p>
            <p className="comparison-summary">{project?.summary}</p>
            <dl>
              <div><dt>Ingresos anuales</dt><dd>{formatMetric("ingresos", active.projectSlug)}</dd></div>
              <div><dt>Ocupación</dt><dd>{formatMetric("ocupación", active.projectSlug)}</dd></div>
              <div><dt>ADR</dt><dd>{formatMetric("adr", active.projectSlug)}</dd></div>
            </dl>
            <p className="comparison-disclaimer">Comparación visual orientativa. Los resultados dependen de mercado, pricing, operación y situación inicial.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
