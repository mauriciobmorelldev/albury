"use client";

import Image from "next/image";
import BeforeAfterShowcase from "@/components/BeforeAfterShowcase";
import CostlyErrors from "@/components/CostlyErrors";
import InvestmentSolutions from "@/components/InvestmentSolutions";
import LaunchStrategyCards from "@/components/LaunchStrategyCards";
import TestimonialsSection from "@/components/TestimonialsSection";
import MideAccordion from "@/components/MideAccordion";
import ServicesFrequentlyAskedQuestions from "@/components/ServicesFrequentlyAskedQuestions";
import { useLayoutEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

const process = [
  ["Diagnóstico de rentabilidad", "Analizamos mercado, huésped, pricing, competencia y desempeño actual.", "/milanote-assets/WhatsApp Image 2026-08-07 at 9.45.04 PM.jpeg"],
  ["Estrategia", "Definimos el posicionamiento y la experiencia que debe recordar el huésped.", "/milanote-assets/WhatsApp Image 2026-08-07 at 9.45.05 PM.jpeg"],
  ["Diseño STR", "Diseñamos layout, mobiliario, amenities y momentos visuales con intención comercial.", "/milanote-assets/WhatsApp Image 2026-08-07 at 9.46.48 PM.jpeg"],
  ["Implementación", "Centralizamos moodboards, lista de compras, guía de instalación y manuales.", "/milanote-assets/WhatsApp Image 2026-08-07 at 9.48.40 PM.jpeg"],
  ["Lanzamiento y optimización", "Preparamos la propiedad para fotos, publicación y lectura de resultados.", "/milanote-assets/WhatsApp Image 2026-08-07 at 9.48.41 PM.jpeg"],
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
          <h1>Nos encargamos de diseñar tu ventaja competitiva.</h1>
          <p>Diseñamos espacios para que tu propiedad gane más, reserve más rápido y destaque.</p>
        </div>
      </section>

      <InvestmentSolutions />

      <section className="px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="landing-reveal grid gap-8 lg:grid-cols-[.65fr_1.35fr]">
            <p className="section-label">El recorrido de tu propiedad</p>
            <h2 className="section-title">Un camino claro desde la estrategia hasta el lanzamiento.</h2>
          </div>
          <div className="board-process-grid mt-14">
            {process.map(([title, copy, image], index) => (
              <article key={title} className="landing-reveal board-process-card">
                <span>0{index + 1}</span><h3>{title}</h3>
                <div className="board-process-image"><Image src={image} alt={title} fill sizes="(max-width: 639px) 100vw, (max-width: 1099px) 50vw, 20vw" className="object-cover" /></div>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <button type="button" data-booking-trigger className="editorial-button editorial-button-primary mt-10">Solicitá tu diagnóstico</button>
        </div>
      </section>

      <section className="board-launch">
        <div className="board-launch-image">
          <Image src="/milanote-assets/WhatsApp Image 2026-08-07 at 9.48.41 PM.jpeg" alt="Proyecto Albury Design" fill sizes="(max-width: 899px) 100vw, 50vw" className="object-cover" />
        </div>
        <div className="board-launch-copy landing-reveal">
          <p className="section-label">Un proceso claro</p>
          <h2>De la estrategia al lanzamiento</h2>
          <p>Un proceso fluido basado en sus objetivos de inversión.</p>
          <p>Cada proyecto sigue una secuencia clara que ahorra tiempo y elimina conjeturas. Al tomar decisiones más rápidas y fundamentadas en investigación y estrategia, las propiedades comienzan a generar flujo de efectivo antes y están posicionadas para obtener mayores retornos.</p>
        </div>
      </section>

      <ServicesFrequentlyAskedQuestions />
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
          <p>Aumentá tu facturación un 53% bajo el método M.I.D.E.</p>
          <a href="#comparativa" className="editorial-button">Explorar resultados</a>
        </div>
      </section>
      <BeforeAfterShowcase />
      <section className="results-method-difference px-5 py-16 sm:px-8 lg:px-14 lg:py-24">
        <div className="landing-reveal mx-auto max-w-4xl text-center">
          <h2 className="section-title">La diferencia no es la propiedad. Es el método.</h2>
          <p className="mt-7 text-lg leading-8">Mismo mercado, mismo tipo de huésped, mismo punto de partida. La brecha entre ambos resultados es exactamente lo que resuelve M.I.D.E.</p>
        </div>
      </section>
      <CostlyErrors />
      <section className="board-proof px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
        <div className="landing-reveal board-proof-grid mx-auto max-w-7xl">
          <div>
            <p className="section-label">Diseño respaldado por resultados</p>
            <h2>El impacto de diseñar con un método.</h2>
            <dl className="board-proof-metrics">
              <div><dt>Aumento en los ingresos</dt><dd>+30–50%</dd></div>
              <div><dt>Horas ahorradas</dt><dd>300</dd></div>
              <div><dt>Calificación de los huéspedes</dt><dd>4,8</dd></div>
            </dl>
          </div>
          <div className="board-proof-copy">
            <strong>+150</strong>
            <p>Hoy hemos ayudado a más de 150 propietarios en todo el mundo a convertir sus alquileres a corto plazo en propiedades de alto rendimiento.</p>
            <p>Todo bajo un mismo método: M.I.D.E.</p>
          </div>
        </div>
      </section>
      <MideAccordion />
      <section className="results-outcome px-5 py-16 sm:px-8 lg:px-14 lg:py-24">
        <div className="landing-reveal mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
          <h2 className="section-title">Una propiedad que gana más, reserva más rápido y destaca.</h2>
          <div><strong className="results-outcome-stat">+30–50%</strong><p className="mt-5 text-lg leading-8">Nuestros clientes ven un aumento del 30–50% en sus ingresos después de trabajar con nosotros.</p></div>
        </div>
      </section>
      <LaunchStrategyCards />
      <TestimonialsSection />
    </main>
  );
}
