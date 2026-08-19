"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

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
          <h1>Diseño con propósito. Rentabilidad por sistema.</h1>
          <p>No somos solo diseñadores. Somos socios estratégicos de propietarios que buscan convertir cada espacio en un activo competitivo.</p>
        </div>
      </section>

      <section className="about-manifesto px-5 py-20 sm:px-8 lg:px-14 lg:py-32">
        <div className="about-reveal mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.72fr_1.28fr]">
          <p className="section-label">About us</p>
          <div>
            <h2 className="section-title">Diseñamos alrededor de las decisiones que impulsan reservas.</h2>
            <div className="about-copy mt-10 grid gap-8 lg:grid-cols-2">
              <p>Albury Design aborda el diseño como un sistema de rendimiento. Analizamos el mercado, identificamos al huésped ideal y construimos una experiencia capaz de ganar valor frente a propiedades comparables.</p>
              <p>El resultado es una propiedad que comunica mejor, reserva con menos fricción y destaca incluso en mercados competitivos. Estética, operación y retorno se piensan como una sola estrategia.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-proof px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
        <div className="about-reveal mx-auto grid max-w-7xl border-y border-[#e5dece]/20 py-14 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div>
            <p className="section-label">Diseño con propósito</p>
            <h2 className="section-title mt-5">Creamos una propiedad que los huéspedes quieran reservar.</h2>
          </div>
          <div className="about-proof-stat lg:justify-self-end">
            <strong>+30–50%</strong>
            <p>Rango de mejora observado en casos acompañados, sujeto a mercado, pricing, operación y situación inicial.</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
        <div className="about-reveal mx-auto grid max-w-7xl gap-8 border-y border-[#e5dece]/20 py-14 lg:grid-cols-[1fr_.7fr] lg:items-end">
          <h2 className="section-title">M.I.D.E. es el sistema con el que convertimos cada propiedad en un activo.</h2>
          <Link href="/servicios#mide" className="editorial-button editorial-button-primary w-fit lg:justify-self-end">Conocer el método</Link>
        </div>
      </section>
    </main>
  );
}
