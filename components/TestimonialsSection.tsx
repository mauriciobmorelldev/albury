"use client";

import { useLayoutEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

const testimonials = [
  { name: "Josema Sanchez", role: "Ceo de LVLTY", quote: "Colaborar con Albury Design ha sido una de las decisiones más acertadas. Trabajé con ellos para diseñar mi mejor propiedad en Texas, y actualmente factura un 106% más de lo esperado. Sus diseños no solo mejoran los espacios, sino que están estratégicamente pensados para maximizar la rentabilidad y cash flow. Puedo asegurar que el cashflow es mucho mayor que si la hubiera diseñado yo mismo" },
  { name: "Joan Riutort", role: "Airbnb Superhost en Mallorca", quote: "Trabajar con Albury Design fue una decisión obvia. No tenía tiempo para gestionar la decoración de mi propiedad y necesitaba un equipo que hiciera todo por mí, sin gastar de más. Ellos se encargaron de todo: desde elegir muebles asequibles pero atractivos hasta optimizar cada espacio para generar más ingresos. En cuestión de semanas, mi propiedad estaba completamente lista y el impacto fue inmediato: aumenté el precio por noche y mis reservas se dispararon. En solo un mes, ya había recuperado la inversión en diseño y ahora mi Airbnb genera más ingresos con menos esfuerzo de mi parte. No podría haber tomado una mejor decisión" },
  { name: "Arturo Hernández", role: "Airbnb Super Host in Florida", quote: "Inicialmente, dudaba del potencial de mi propiedad en Airbnb, ya que apenas generaba $34,000 al año. Sin embargo, tras colaborar con Albury Design, todo cambió. Transformaron mi espacio en una experiencia única para los huéspedes, más allá de ser solo un lugar para dormir. Como resultado, mis ingresos se dispararon a $66,000 anuales. Su visión y conocimiento demostraron que, con el diseño adecuado, cualquier propiedad puede alcanzar su máximo potencial" },
];

export default function TestimonialsSection() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-heading", {
        autoAlpha: 0,
        y: 18,
        filter: "blur(4px)",
        stagger: 0.06,
        duration: 0.45,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 86%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="results-testimonials bg-[#e5dece] px-5 py-20 text-[#100f0c] sm:px-8 lg:px-14 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <p className="testimonial-heading mb-5 text-xs font-bold uppercase tracking-[.18em] text-[#7b2431]">Lo que nuestros clientes dicen</p>
        <h2 className="testimonial-heading max-w-5xl text-[clamp(2.35rem,4.2vw,4.6rem)] font-bold uppercase leading-[.94] tracking-[-.05em]">Resultados que se sienten en reservas.</h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="flex min-w-0 flex-col border-t-2 border-[#7b2431] bg-[#f0ecdf] p-6 sm:p-8"
            >
              <span aria-hidden="true" className="text-6xl font-bold leading-none text-[#7b2431]">“</span>
              <blockquote className="mb-8 mt-4 text-base leading-8 text-[#514d43]">{item.quote}.</blockquote>
              <div className="mt-auto border-t border-[#100f0c]/15 pt-6">
                <h3 className="text-xl font-bold leading-tight tracking-[-.025em]">{item.name}</h3>
                <p className="mt-2 text-xs font-semibold uppercase leading-5 tracking-[.12em] text-[#514d43]">{item.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
