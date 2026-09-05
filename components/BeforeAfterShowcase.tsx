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
const comparisonTypewriterReserve = comparisons.reduce(
  (longest, item) => item.line.length > longest.length ? item.line : longest,
  "",
);


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
          <h2 id="before-after-title" className="section-title">Casos reales de nuestra metodología.</h2>
          <p>Con M.I.D.E. / sin método. Seleccioná una propiedad para explorar su diseño y rendimiento.</p>
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

        <div ref={stageRef} className="comparison-case-panel mt-8" role="tabpanel" aria-live="polite">
        <p className="comparison-case-caption">Caso 0{activeIndex + 1} · {project?.title}</p>
        <div className="results-method-comparison mt-5">
          <article className="results-method-card comparison-frame">
            <p className="section-label">Sin método</p>
            <figure className="results-method-image">
              <Image src={active.before} alt={active.beforeAlt} fill quality={90} sizes="(max-width: 639px) 100vw, 50vw" className="object-cover" />
              <figcaption>Referencia visual sin método</figcaption>
            </figure>
            <h3>Una propiedad que compite por precio.</h3>
            <ul><li>Reservas perdidas</li><li>Tarifas nocturnas más bajas</li><li>Reseñas pobres</li></ul>
            <p className="results-method-verdict"><span>Resultado</span>Diseño inexistente · techo de crecimiento sin resolver.</p>
          </article>
          <article className="results-method-card is-mide comparison-frame">
            <p className="section-label">Con M.I.D.E.</p>
            <figure className="results-method-image">
              <div className="comparison-after-image absolute inset-0">
                <Image src={project?.heroImage ?? active.after} alt={active.afterAlt} fill quality={90} sizes="(max-width: 639px) 100vw, 50vw" className="object-cover" />
              </div>
              <figcaption>{project?.title} · Albury Design</figcaption>
            </figure>
            <h3>Una experiencia que compite por valor.</h3>
            <ul><li>Estrategia basada en el mercado</li><li>Amenidades que elevan la percepción y la conversión</li><li>Una experiencia de huésped consistente</li></ul>
            <p className="results-method-verdict"><span>Resultado</span>Diseño estratégico · una propiedad preparada para rendir.</p>
          </article>
        </div>

          <aside className="comparison-story comparison-frame board-case-result mt-5">
            <p className="comparison-project">Rendimiento estimado · {project?.title}</p>
            <p className="comparison-typewriter">
              <span className="comparison-typewriter-reserve" aria-hidden="true">{comparisonTypewriterReserve}</span>
              <span className="comparison-typewriter-live"><span data-typewriter={active.line} /> <i aria-hidden="true" /></span>
            </p>
            <dl>
              <div><dt>Ingresos anuales</dt><dd>{formatMetric("ingresos", active.projectSlug)}</dd></div>
              <div><dt>Ocupación</dt><dd>{formatMetric("ocupación", active.projectSlug)}</dd></div>
              <div><dt>ADR</dt><dd>{formatMetric("adr", active.projectSlug)}</dd></div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
