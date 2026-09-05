"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

const performanceGaps = [
  "Precio por noche bajo",
  "Malas reviews",
  "Pocas reservas",
  "Muebles no estandarizados (recambios constantes)",
  "No estar en Airbnb Luxe",
  "Baja ocupación fuera de temporada",
  "Fotos que no venden la propiedad",
  "Diseño genérico, igual al resto del mercado",
  "Decisiones a ojo, sin datos de mercado",
  "Reformas que no suben el ROI",
  "Confort real descuidado (colchón, ruido, clima)",
  "Experiencia de huésped inconsistente",
  "Sin diferenciación frente a la competencia directa",
  "Huésped ideal mal definido",
];

export default function AboutLanding() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!rootRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".about-reveal").forEach((item) => {
        gsap.fromTo(item, { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 86%", once: true } });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={rootRef} className="editorial-landing about-landing">
      <section className="route-hero about-route-hero">
        <div className="route-hero-image">
          <Image src="/milanote-assets/WhatsApp Image 2026-08-07 at 9.45.04 PM.jpeg" alt="Estudio Albury Design" fill priority quality={92} sizes="100vw" className="object-cover" />
        </div>
        <div className="route-hero-shade" />
        <div className="route-hero-content about-reveal">
          <h1>Creamos la solución que no pudimos encontrar.</h1>
          <p>No somos solo diseñadores. Somos socios estratégicos de propietarios que buscan convertir cada espacio en un activo competitivo.</p>
        </div>
      </section>

      <section className="about-manifesto board-brand-story px-5 py-20 sm:px-8 lg:px-14 lg:py-32">
        <div className="about-reveal mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.72fr_1.28fr]">
          <p className="section-label">Albury Design · Nuestra visión</p>
          <div>
            <h2 className="section-title">Diseñamos alrededor de las decisiones que impulsan reservas.</h2>
            <div className="about-copy mt-10 grid gap-8 lg:grid-cols-2">
              <p>Albury Design aborda el diseño como un sistema de rendimiento. Analizamos su mercado, identificamos a su huésped ideal y diseñamos en torno a las decisiones que impulsan las reservas y maximizan los retornos.</p>
              <p>El resultado es una propiedad que gana más, reserva más rápido y destaca instantáneamente incluso en los mercados más competitivos. Nuestros clientes ven un aumento del 30–50% en sus ingresos después de trabajar con nosotros.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="board-brand-gaps px-5 py-20 sm:px-8 lg:px-14 lg:py-28" aria-labelledby="brand-gaps-title">
        <div className="about-reveal mx-auto max-w-7xl">
          <p className="section-label">El punto de partida</p>
          <h2 id="brand-gaps-title" className="section-title mt-5">Las brechas que vinimos a resolver.</h2>
          <ul>{performanceGaps.map((gap, index) => <li key={gap}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><p>{gap}</p></li>)}</ul>
        </div>
      </section>

      <section className="about-proof px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
        <div className="about-reveal mx-auto grid max-w-7xl border-y border-[#e5dece]/20 py-14 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div>
            <p className="section-label">Más de 150 propietarios en todo el mundo</p>
            <h2 className="section-title mt-5">Todo bajo un mismo método.</h2>
            <p className="board-brand-proof-copy">Hoy hemos ayudado a más de 150 propietarios de propiedades en todo el mundo a convertir sus alquileres a corto plazo en propiedades de alto rendimiento.</p>
          </div>
          <div className="about-proof-stat lg:justify-self-end">
            <strong>+30–50%</strong>
            <p>Aumento en los ingresos después de trabajar con nosotros. Los resultados dependen del mercado, la operación y la situación inicial.</p>
          </div>
        </div>
      </section>

      <section className="board-brand-quotes px-5 py-20 sm:px-8 lg:px-14 lg:py-28" aria-labelledby="brand-quotes-title">
        <div className="about-reveal mx-auto max-w-7xl">
          <p className="section-label">Experiencias de propietarios</p>
          <h2 id="brand-quotes-title" className="section-title mt-5">El diseño se convierte en resultados.</h2>
          <div className="board-brand-quote-grid">
            <blockquote>“Éramos escépticos de que el diseño pudiera marcar una diferencia tan grande. Tres meses después de trabajar con Albury, nuestros ingresos se duplicaron.”</blockquote>
            <blockquote>“Convirtieron nuestra propiedad en un destino.”</blockquote>
          </div>
        </div>
      </section>

      <section className="board-launch">
        <div className="board-launch-image">
          <Image src="/milanote-assets/WhatsApp Image 2026-08-07 at 9.48.40 PM.jpeg" alt="Un espacio diseñado con estrategia por Albury" fill sizes="(max-width: 899px) 100vw, 50vw" className="object-cover" />
        </div>
        <div className="board-launch-copy about-reveal">
          <p className="section-label">El método detrás del diseño</p>
          <h2>Diseño basado en estrategia, diseñado para el rendimiento.</h2>
          <p>En Albury Design, buscamos más que un diseño atractivo. Nuestra prioridad es crear espacios que no solo se vean increíbles, sino que también maximicen tu retorno de inversión.</p>
          <p>Todo bajo la metodología M.I.D.E.</p>
          <Link href="/resultados#mide" className="editorial-button editorial-button-primary">Conocer el método</Link>
        </div>
      </section>
    </main>
  );
}
