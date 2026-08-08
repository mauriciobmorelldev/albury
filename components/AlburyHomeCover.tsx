"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

export default function AlburyHomeCover() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!rootRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(".cover-image", { scale: 1.08 }, { scale: 1, duration: 1.6, ease: "power3.out" });
      gsap.fromTo(".cover-reveal", { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out", delay: 0.1 });
      gsap.fromTo(".cover-closing", { autoAlpha: 0, y: 36 }, { autoAlpha: 1, y: 0, duration: 0.85, ease: "power3.out", scrollTrigger: { trigger: ".cover-closing", start: "top 82%", once: true } });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={rootRef} className="home-cover bg-[#100f0c] text-[#e5dece]">
      <section id="inicio" className="cover-hero relative min-h-[100svh] overflow-hidden">
        <div className="cover-image absolute inset-0">
          <Image src="/milanote-assets/WhatsApp Image 2026-08-07 at 9.45.04 PM.jpeg" alt="Interior premium diseñado por Albury Design" fill priority quality={92} sizes="100vw" className="object-cover" />
        </div>
        <div className="cover-shade absolute inset-0" />
        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1320px] items-center justify-center px-5 pt-20 text-center sm:px-8">
          <div className="max-w-[980px]">
            <h1 className="cover-reveal text-[clamp(2.8rem,5vw,5.2rem)] font-bold uppercase leading-[.96] tracking-[-.045em]">Diseño estratégico.<br />Rentabilidad excepcional.</h1>
            <p className="cover-reveal mx-auto mt-6 max-w-2xl text-[clamp(1rem,1.3vw,1.18rem)] leading-8 text-white/78">Transformamos propiedades STR en activos premium que generan más ingresos.</p>
            <div className="cover-reveal mt-9 flex flex-wrap justify-center gap-3">
              <a href="#contacto" data-booking-trigger className="editorial-button editorial-button-primary">Solicitá tu diagnóstico</a>
              <Link href="/portfolio" className="editorial-button">Ver portfolio</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="home-closing px-5 py-24 sm:px-8 lg:px-14 lg:py-32">
        <div className="cover-closing mx-auto grid max-w-7xl gap-10 border-y border-[#e5dece]/20 py-14 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <h2 className="max-w-4xl text-[clamp(3rem,6.4vw,7rem)] font-bold uppercase leading-[.88] tracking-[-.06em]">Convirtamos tu propiedad en un activo premium.</h2>
          <div className="lg:pb-2">
            <p className="text-lg leading-8 text-[#c5bcaa]">Contanos cómo opera hoy y qué resultado buscás. Evaluamos si el diseño estratégico puede multiplicar su rendimiento.</p>
            <a href="#contacto" data-booking-trigger className="editorial-button editorial-button-primary mt-7">Solicitá tu diagnóstico de rentabilidad</a>
          </div>
        </div>
      </section>
    </main>
  );
}
