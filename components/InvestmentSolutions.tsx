"use client";

import { useLayoutEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

const plans = [
  {
    title: "Diseño Virtual",
    intro: "Perfecto para inversionistas que quieren significativamente sus ingresos y destacarse en el mercado sin preocuparse por las decisiones de diseño. Nuestro servicio remoto incluye todos los recursos necesarios para que puedas ordenar e instalar el mobiliario por tu cuenta.",
    bestFor: "Ideal para inversionistas principiantes en alquileres a corto plazo.",
    features: ["Análisis del público objetivo", "Investigación del mercado STR", "Tableros de diseño", "Planos del espacio", "Lista de compras", "Diseño de mejoras estéticas", "Guía de instalación en 5 semanas"],
  },
  {
    title: "Diseño y Gestión del Proyecto",
    intro: "Ideal para inversionistas que buscan un diseño competitivo sin involucrarse en el proceso. Nos encargamos de todo: investigación, estrategia, conceptualización, compra de mobiliario, coordinación con contratistas, instalación en persona, ambientación y dirección de sesión fotográfica.",
    bestFor: "Ideal para inversionistas principiantes en alquileres a corto plazo.",
    features: ["Análisis del público objetivo", "Investigación del mercado STR", "Tableros de diseño", "Planos del espacio", "Lista de compras", "Diseño de mejoras estéticas", "Gestión de pedidos", "Coordinación de contratistas", "Supervisión de la instalación del mobiliario", "Decoración y ambientación", "Dirección de sesión fotográfica"],
  },
];

export default function InvestmentSolutions() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.from(".solution-reveal", {
        autoAlpha: 0,
        y: 42,
        filter: "blur(10px)",
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 70%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="bg-charcoal px-5 py-24 text-warm-white sm:px-8 lg:px-14 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="solution-reveal max-w-5xl">
          <p className="mb-5 text-xs font-black uppercase tracking-[.22em] text-soft-gold">Servicios</p>
          <h2 className="text-5xl font-black uppercase leading-[.92] tracking-[-.035em] sm:text-7xl lg:text-8xl">Una solución para cada inversionista de alquiler a corto plazo</h2>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {plans.map((plan, index) => (
            <article key={plan.title} className="solution-reveal group relative overflow-hidden rounded-[34px] border border-warm-white/12 bg-warm-white/[.06] p-7 shadow-[0_30px_100px_rgba(0,0,0,.24)] backdrop-blur-xl sm:p-9">
              <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-gold/10 blur-3xl transition group-hover:scale-125" />
              <p className="text-sm font-black text-soft-gold">0{index + 1}</p>
              <h3 className="mt-5 text-5xl font-black leading-none tracking-[-.04em]">{plan.title}</h3>
              <p className="mt-6 text-base font-semibold leading-8 text-warm-white/68">{plan.intro}</p>
              <p className="mt-8 rounded-2xl bg-warm-white/10 p-5 text-lg font-black leading-7 text-warm-white">{plan.bestFor}</p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {plan.features.map((feature) => (
                  <div key={feature} className="rounded-2xl border border-warm-white/10 bg-charcoal/36 px-4 py-3 text-sm font-bold text-warm-white/82">{feature}</div>
                ))}
              </div>
              <button data-booking-trigger className="mt-8 rounded-full bg-gold px-7 py-4 text-sm font-black text-warm-white transition hover:-translate-y-1 hover:bg-[#b93322]">Agendar llamada</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
