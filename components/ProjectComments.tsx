"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { getGsap } from "@/lib/gsap";

const comments = [
  {
    name: "Josema Sanchez",
    role: "CEO de LVLTY",
    quote: "Colaborar con Albury Design fue una de las decisiones más acertadas. Sus diseños no solo mejoran los espacios: están estratégicamente pensados para maximizar la rentabilidad y el cash flow.",
  },
  {
    name: "Joan Riutort",
    role: "Airbnb Superhost en Mallorca",
    quote: "Se encargaron de todo, desde elegir muebles atractivos hasta optimizar cada espacio. En cuestión de semanas la propiedad estaba lista, aumenté el precio por noche y las reservas se dispararon.",
  },
  {
    name: "Arturo Hernández",
    role: "Airbnb Superhost en Florida",
    quote: "Transformaron mi espacio en una experiencia única para los huéspedes. Su visión demostró que, con el diseño adecuado, una propiedad puede alcanzar su máximo potencial.",
  },
];

export default function ProjectComments({ projectTitle }: { projectTitle: string }) {
  const rootRef = useRef<HTMLElement>(null);
  const featureRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeComment = comments[activeIndex];

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-comments-heading",
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.65, ease: "power3.out", scrollTrigger: { trigger: root, start: "top 84%", once: true } },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!featureRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(featureRef.current, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.48, ease: "power3.out" });
    }, rootRef);
    return () => ctx.revert();
  }, [activeIndex]);

  const showPrevious = () => setActiveIndex((current) => (current - 1 + comments.length) % comments.length);
  const showNext = () => setActiveIndex((current) => (current + 1) % comments.length);

  return (
    <section ref={rootRef} className="project-comments" aria-labelledby="project-comments-title">
      <div className="project-comments-inner">
        <header className="project-comments-heading">
          <p className="property-detail-label">Experiencias reales</p>
          <h2 id="project-comments-title">Lo que nuestros clientes dicen.</h2>
          <p>Un testimonio a la vez. Resultados de propietarios que confiaron en Albury Design para convertir diseño en rendimiento.</p>
        </header>

        <article ref={featureRef} className="project-comment-feature" aria-live="polite">
          <div className="project-comment-mark" aria-hidden="true">“</div>
          <blockquote>“{activeComment.quote}”</blockquote>

          <footer className="project-comment-feature-footer">
            <div className="project-comment-author">
              <span aria-hidden="true">{activeComment.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span>
              <div>
                <h3>{activeComment.name}</h3>
                <p>{activeComment.role}</p>
              </div>
            </div>
            <p className="project-comment-rating" aria-label="5 de 5 estrellas">★★★★★</p>
          </footer>
        </article>

        <div className="project-comments-navigation" aria-label="Cambiar testimonio">
          <button type="button" onClick={showPrevious} aria-label="Testimonio anterior">←</button>
          <div>
            {comments.map((comment, index) => (
              <button key={comment.name} type="button" aria-label={`Ver testimonio de ${comment.name}`} aria-current={activeIndex === index ? "true" : undefined} onClick={() => setActiveIndex(index)} />
            ))}
          </div>
          <span>0{activeIndex + 1} / 0{comments.length}</span>
          <button type="button" onClick={showNext} aria-label="Testimonio siguiente">→</button>
        </div>

        <p className="project-comments-context">Testimonios de clientes de Albury Design · Presentados en el caso {projectTitle}.</p>
      </div>
    </section>
  );
}
