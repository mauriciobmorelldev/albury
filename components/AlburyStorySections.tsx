"use client";

import { useLayoutEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

const pains = [
  ["01", "Reservas que dependen del precio", "Cuando el anuncio no comunica valor en segundos, la única palanca termina siendo bajar tarifa."],
  ["02", "Fotos correctas, poca intención", "El huésped ve ambientes lindos, pero no encuentra una razón concreta para elegir tu propiedad."],
  ["03", "Amenities sin estrategia", "Invertir en muebles o decoración sin una narrativa comercial rara vez mejora RevPAR de forma consistente."],
];

const desires = [
  "Más reservas sin competir hacia abajo",
  "Tarifas nocturnas mejor justificadas",
  "Una propiedad fácil de fotografiar y vender",
  "Menos decisiones sueltas durante compra e instalación",
];

const proofCards = [
  ["1,250", "horas ahorradas", "Menos tiempo perdido decidiendo, comprando y coordinando."],
  ["$23,690", "en ahorro de mobiliario", "Selección enfocada en calidad, disponibilidad y presupuesto."],
  ["+53%", "después del servicio", "Diseño pensado para mejorar percepción, conversión y tarifa."],
];

const objections = [
  ["¿Y si gasto de más?", "Diseñamos con presupuesto, disponibilidad y retorno en mente antes de elegir cada pieza."],
  ["¿Y si no sé qué comprar?", "Entregamos tableros, planos, lista de compras y guía de instalación para ejecutar sin fricción."],
  ["¿Y si mi mercado es distinto?", "Partimos de investigación del huésped, competencia, capacidad y amenities según ubicación."],
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
          { opacity: 0, y: 22, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.55,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 84%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".story-image").forEach((image) => {
        gsap.fromTo(
          image,
          { scale: 1.04 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: image, start: "top bottom", end: "bottom top", scrub: 0.6 },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <section id="estrategia" className="bg-warm-white px-5 py-24 text-charcoal sm:px-8 lg:px-14 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
          <div className="story-reveal">
            <p className="mb-5 text-xs font-black uppercase tracking-[.22em] text-gold">Generar identificación</p>
            <h2 className="text-5xl font-black leading-[.9] tracking-[-.035em] sm:text-7xl lg:text-8xl">El problema no es que tu propiedad no sea linda.</h2>
          </div>
          <div className="story-reveal max-w-3xl lg:pb-2">
            <p className="text-2xl font-bold leading-9 text-charcoal/72">El problema es que el huésped no entiende por qué debería reservarla, pagar más y recordarla. Albury convierte diseño interior en una oferta visual clara.</p>
          </div>
        </div>
        <div className="mx-auto mt-14 grid max-w-7xl gap-5 md:grid-cols-3">
          {pains.map(([number, title, copy]) => (
            <article key={title} className="story-reveal rounded-[30px] border border-charcoal/10 bg-stone p-8 shadow-[0_24px_80px_rgba(13,41,49,.06)]">
              <p className="text-sm font-black text-gold">{number}</p>
              <h3 className="mt-10 text-4xl font-black leading-none tracking-[-.03em]">{title}</h3>
              <p className="mt-6 text-base font-semibold leading-8 text-charcoal/62">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid bg-charcoal text-warm-white lg:grid-cols-2">
        <div className="relative min-h-[70svh] overflow-hidden">
          <div className="story-image absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/renders/albury/web/welcome-lounge.jpg')" }} />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,41,49,.75),rgba(13,41,49,.18))]" />
        </div>
        <div className="flex items-center px-5 py-24 sm:px-8 lg:px-14 lg:py-32">
          <div className="story-reveal max-w-2xl">
            <p className="mb-5 text-xs font-black uppercase tracking-[.22em] text-soft-gold">Presentar una solución diferente</p>
            <h2 className="text-5xl font-black leading-[.9] tracking-[-.035em] sm:text-7xl">No decoramos. Diseñamos una razón para reservar.</h2>
            <p className="mt-8 text-xl font-semibold leading-9 text-warm-white/72">Definimos objetivo, perfil del huésped, dolores, objeciones, deseos y pruebas antes de diseñar. Después traducimos esa estrategia en espacios fotogénicos, amenities y una narrativa lista para Airbnb, Booking o VRBO.</p>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {desires.map((item) => (
                <div key={item} className="rounded-2xl border border-warm-white/12 bg-warm-white/8 px-5 py-4 text-sm font-black text-warm-white/86 backdrop-blur-xl">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="resultados" className="bg-stone px-5 py-24 text-charcoal sm:px-8 lg:px-14 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="story-reveal max-w-4xl">
            <p className="mb-5 text-xs font-black uppercase tracking-[.22em] text-gold">Demostrar credibilidad</p>
            <h2 className="text-5xl font-black leading-[.9] tracking-[-.035em] sm:text-7xl lg:text-8xl">Pruebas antes de pedir confianza.</h2>
            <p className="mt-7 max-w-3xl text-xl font-semibold leading-9 text-charcoal/66">Mostramos números, proceso y resultados para que la decisión no dependa de promesas abstractas.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {proofCards.map(([value, label, copy]) => (
              <article key={label} className="story-reveal rounded-[34px] bg-warm-white p-8 shadow-[0_28px_90px_rgba(13,41,49,.08)]">
                <p className="text-6xl font-black leading-none tracking-[-.05em] text-[#3f8b4d] sm:text-7xl">{value}</p>
                <h3 className="mt-5 text-3xl font-black leading-none tracking-[-.03em]">{label}</h3>
                <p className="mt-5 text-base font-semibold leading-8 text-charcoal/60">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="proceso" className="bg-charcoal px-5 py-24 text-warm-white sm:px-8 lg:px-14 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
          <div className="story-reveal lg:sticky lg:top-28">
            <p className="mb-5 text-xs font-black uppercase tracking-[.22em] text-soft-gold">Reducir riesgo</p>
            <h2 className="text-5xl font-black leading-[.9] tracking-[-.035em] sm:text-7xl">Respondemos objeciones antes de venderte diseño.</h2>
            <p className="mt-8 text-lg font-semibold leading-8 text-warm-white/68">El objetivo es que sepas qué se decide, por qué se decide y cómo se ejecuta sin improvisar.</p>
          </div>
          <div className="grid gap-5">
            {objections.map(([title, copy], index) => (
              <article key={title} className="story-reveal rounded-[30px] border border-warm-white/12 bg-warm-white/[.07] p-8 backdrop-blur-xl sm:p-10">
                <p className="text-sm font-black text-soft-gold">0{index + 1}</p>
                <h3 className="mt-6 text-4xl font-black leading-none tracking-[-.03em]">{title}</h3>
                <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-warm-white/66">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
