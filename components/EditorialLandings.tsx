"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

const process = [
  ["Diagnóstico de rentabilidad", "Analizamos mercado, huésped, pricing, competencia y desempeño actual."],
  ["Estrategia", "Definimos el posicionamiento y la experiencia que debe recordar el huésped."],
  ["Diseño STR", "Diseñamos layout, mobiliario, amenities y momentos visuales con intención comercial."],
  ["Implementación", "Centralizamos moodboards, lista de compras, guía de instalación y manuales."],
  ["Lanzamiento y optimización", "Preparamos la propiedad para fotos, publicación y lectura de resultados."],
];

const faqs = [
  ["¿Dónde está disponible el servicio?", "El diseño remoto está disponible para propiedades en Estados Unidos y España. La instalación en sitio se revisa según ubicación."],
  ["¿Cuándo debería comenzar?", "Idealmente durante la compra, antes de amueblar o renovar, para que la estrategia influya en presupuesto, amenities y experiencia."],
  ["¿Reemplaza a un interiorista tradicional?", "No exactamente. Albury integra estética, experiencia del huésped y objetivos comerciales de alquiler vacacional."],
  ["¿Prometen resultados exactos?", "No prometemos ingresos garantizados. Trabajamos sobre diferenciación, percepción de valor y preparación comercial."],
];

function useEditorialReveal() {
  const rootRef = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    if (!rootRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".landing-reveal").forEach((item) => {
        gsap.fromTo(item, { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 86%", once: true } });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);
  return rootRef;
}

export function ServicesLanding() {
  const rootRef = useEditorialReveal();
  return (
    <main ref={rootRef} className="editorial-landing">
      <section className="route-hero landing-hero">
        <div className="route-hero-image">
          <Image src="/milanote-assets/WhatsApp Image 2026-08-07 at 9.48.41 PM.jpeg" alt="Interior estratégico diseñado por Albury Design" fill priority quality={92} sizes="100vw" className="object-cover" />
        </div>
        <div className="route-hero-shade" />
        <div className="route-hero-content landing-reveal">
          <h1>Diseño que toma decisiones antes de comprar muebles.</h1>
          <p>Albury convierte el interiorismo en una herramienta de posicionamiento, conversión y rentabilidad para propiedades STR.</p>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
        <div className="landing-reveal mx-auto grid max-w-7xl border-y border-[#e5dece]/20 lg:grid-cols-2">
          <article className="editorial-split border-b border-[#e5dece]/20 p-8 lg:border-b-0 lg:border-r lg:p-12">
            <span>La objeción</span>
            <h2>¿Por qué pagar USD 7–12k si puedo comprar muebles baratos?</h2>
          </article>
          <article className="editorial-split editorial-split-accent p-8 lg:p-12">
            <span>La respuesta</span>
            <h2>El diseño estratégico no es un gasto. Es un multiplicador.</h2>
          </article>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="landing-reveal grid gap-8 lg:grid-cols-[.65fr_1.35fr]">
            <p className="section-label">Método Albury</p>
            <h2 className="section-title">Cinco etapas. Una propiedad lista para competir por valor.</h2>
          </div>
          <div className="mt-14 border-t border-[#e5dece]/20">
            {process.map(([title, copy], index) => (
              <article key={title} className="landing-reveal process-row grid gap-5 border-b border-[#e5dece]/20 py-8 md:grid-cols-[90px_.75fr_1.25fr] md:items-start">
                <span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-media relative min-h-[72svh] overflow-hidden">
        <Image src="/milanote-assets/WhatsApp Image 2026-08-07 at 9.48.41 PM.jpeg" alt="Proyecto Albury Design" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent" />
        <div className="landing-reveal relative z-10 mx-auto flex min-h-[72svh] max-w-7xl items-end px-5 py-16 sm:px-8 lg:px-14">
          <div className="max-w-2xl"><p className="section-label">Entregables centralizados</p><h2 className="section-title mt-5">Moodboards, lista de compra, guía de implementación y manuales.</h2></div>
        </div>
      </section>

      <section id="faqs" className="px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <h2 className="landing-reveal section-title">Preguntas antes de invertir.</h2>
          <div className="border-t border-[#e5dece]/20">
            {faqs.map(([question, answer]) => <details key={question} className="landing-reveal border-b border-[#e5dece]/20 py-6"><summary>{question}</summary><p className="mt-4 max-w-2xl">{answer}</p></details>)}
          </div>
        </div>
      </section>
    </main>
  );
}

export function ResultsLanding() {
  const rootRef = useEditorialReveal();
  return (
    <main ref={rootRef} className="editorial-landing results-landing">
      <section className="route-hero landing-hero">
        <div className="route-hero-image">
          <Image src="/milanote-assets/WhatsApp Image 2026-08-07 at 9.46.49 PM (3).jpeg" alt="Proyecto de rentabilidad Albury Design" fill priority quality={92} sizes="100vw" className="object-cover" />
        </div>
        <div className="route-hero-shade" />
        <div className="route-hero-content landing-reveal">
          <h1>El diseño se ve.<br />El resultado se mide.</h1>
          <p>Casos y rangos que muestran cómo una propiedad deja de competir por precio y empieza a construir valor.</p>
        </div>
      </section>
      <section className="px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
        <div className="mx-auto max-w-7xl border-t border-[#e5dece]/20">
          <article className="landing-reveal result-row grid gap-8 border-b border-[#e5dece]/20 py-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div><span>Caso real 01</span><strong>+100%</strong><p>Mejora conseguida</p></div>
            <Image src="/milanote-assets/WhatsApp Image 2026-08-07 at 9.46.49 PM (3).jpeg" alt="Caso Albury Design" width={2560} height={1706} className="aspect-[16/9] w-full object-cover" />
          </article>
          <article className="landing-reveal result-row grid gap-8 border-b border-[#e5dece]/20 py-12 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
            <Image src="/milanote-assets/WhatsApp Image 2026-08-07 at 9.49.06 PM.jpeg" alt="Caso de rentabilidad Albury Design" width={2560} height={1706} className="aspect-[16/9] w-full object-cover" />
            <div><span>Caso real 02</span><strong>USD 34k → 66k</strong><p>Ingresos anuales</p></div>
          </article>
        </div>
      </section>
      <section className="px-5 py-24 sm:px-8 lg:px-14 lg:py-32">
        <div className="landing-reveal mx-auto grid max-w-7xl gap-10 border-y border-[#e5dece]/20 py-14 lg:grid-cols-[1fr_.7fr] lg:items-end">
          <h2 className="section-title">Explorá proyectos, escenas y métricas en un mismo recorrido.</h2>
          <Link href="/portfolio#impacto" className="editorial-button editorial-button-primary w-fit lg:justify-self-end">Ver portfolio y métricas</Link>
        </div>
      </section>
    </main>
  );
}
