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
    if (!root) return;
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
    <section ref={rootRef} className="relative overflow-hidden bg-charcoal px-5 py-20 text-warm-white sm:px-8 lg:px-14 lg:py-24">
      <div className="absolute left-1/2 top-0 h-px w-[80vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-soft-gold/35 to-transparent" />
      <div className="mx-auto max-w-7xl">
        <p className="testimonial-heading mb-5 text-xs font-black uppercase tracking-[.22em] text-soft-gold">Lo que nuestros clientes dicen</p>
        <h2 className="testimonial-heading max-w-5xl text-4xl font-black uppercase leading-[.92] tracking-[-.035em] sm:text-6xl lg:text-7xl">Resultados que se sienten en reservas.</h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <article
              key={item.name}
              className="rounded-[34px] border border-warm-white/12 bg-warm-white/[.07] p-7 opacity-100 shadow-[0_24px_80px_rgba(0,0,0,.16)] backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:bg-warm-white/[.1] sm:p-8"
              style={{ animation: `fadeUp .55s ease ${index * 90}ms both` }}
            >
              <p className="text-6xl font-black leading-none text-soft-gold/70">“</p>
              <p className="mt-4 text-base font-semibold leading-8 text-warm-white/74">{item.quote}.</p>
              <div className="mt-8 border-t border-warm-white/12 pt-6">
                <h3 className="text-2xl font-black leading-none">{item.name}</h3>
                <p className="mt-2 text-xs font-black uppercase tracking-[.16em] text-warm-white/45">{item.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
