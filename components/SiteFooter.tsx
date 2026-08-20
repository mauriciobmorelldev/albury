"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

export default function SiteFooter() {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.from(".footer-reveal", {
        autoAlpha: 0,
        y: 22,
        filter: "blur(6px)",
        stagger: 0.08,
        duration: 0.72,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 86%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;
    const loadVideo = () => {
      const source = video.dataset.src;
      if (!source) return;
      video.src = source;
      delete video.dataset.src;
      video.load();
      void video.play().catch(() => undefined);
    };
    if (!("IntersectionObserver" in window)) {
      loadVideo();
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      loadVideo();
      observer.disconnect();
    }, { rootMargin: "320px 0px" });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="site-footer-stack">
      <section className="global-booking-cta" aria-labelledby="global-booking-title">
        <div className="global-booking-media">
          <video ref={videoRef} data-src="/videos/albury-booking-horizontal.mp4?v=1" muted loop playsInline preload="none" poster="/milanote-assets/WhatsApp Image 2026-08-07 at 9.48.41 PM.jpeg" aria-hidden="true" tabIndex={-1} />
          <div className="global-booking-shade" />
          <p className="footer-reveal">Diseño estratégico · STR</p>
        </div>
        <div className="global-booking-copy footer-reveal">
          <p className="section-label">¿Listo para comenzar?</p>
          <h2 id="global-booking-title">Creamos una propiedad que los huéspedes quieran reservar.</h2>
          <p>Contanos sobre tu propiedad, tus objetivos y el momento del proyecto. En una primera llamada evaluamos el potencial y el mejor próximo paso.</p>
          <button type="button" data-booking-trigger className="editorial-button editorial-button-primary">Agendar llamada</button>
        </div>
      </section>

      <footer className="luxury-footer bg-[#100e0d] px-5 pb-8 pt-10 text-[#b8aea3] sm:px-8 lg:px-14">
      <div className="mx-auto max-w-7xl border-t border-[#236f7e]/16 pt-10">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr_.75fr]">
          <div className="footer-reveal">
            <Image src="/albury-logo-cropped.png" alt="Albury Design" width={1544} height={528} className="h-11 w-auto brightness-0" />
            <p className="mt-7 max-w-xl text-sm font-semibold leading-7 text-[#675f58]">Diseño estratégico para maximizar la rentabilidad de propiedades STR. La información publicada debe considerarse estimativa: los resultados dependen del mercado, operación, pricing y situación inicial.</p>
          </div>
          <div className="footer-reveal">
            <h3 className="text-xs font-black uppercase tracking-[.2em] text-[#e36559]">Contacta con Nosotros</h3>
            <dl className="mt-6 grid gap-4 text-sm font-bold text-[#675f58]">
              <div><dt className="text-[#236f7e]">Office:</dt><dd>Miami, FL, USA</dd></div>
              <div><dt className="text-[#236f7e]">WhatsApp:</dt><dd><a className="hover:text-[#e36559]" href="tel:+17868462880">+1 (786) 846-2880</a></dd></div>
              <div><dt className="text-[#236f7e]">Mail:</dt><dd><a className="hover:text-[#e36559]" href="mailto:jgenovard@alburydesign.com">jgenovard@alburydesign.com</a></dd></div>
              <div><dt className="text-[#236f7e]">Site:</dt><dd><a className="hover:text-[#e36559]" href="https://alburydesign.com/">alburydesign.com</a></dd></div>
            </dl>
          </div>
          <div className="footer-reveal lg:text-right">
            <h3 className="text-xs font-black uppercase tracking-[.2em] text-[#e36559]">Navegación</h3>
            <div className="mt-6 grid gap-3 text-sm font-black uppercase tracking-[.14em] text-[#236f7e]">
              <Link href="/" className="hover:text-[#e36559]">Inicio</Link>
              <Link href="/servicios" className="hover:text-[#e36559]">Servicios</Link>
              <Link href="/about-us" className="hover:text-[#e36559]">About us</Link>
              <Link href="/portfolio" className="hover:text-[#e36559]">Portfolio</Link>
              <Link href="/resultados" className="hover:text-[#e36559]">Resultados</Link>
            </div>
          </div>
        </div>
        <div className="footer-reveal mt-10 flex flex-col gap-4 border-t border-[#236f7e]/12 pt-6 text-xs font-bold text-[#675f58] sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 · All rights reserved</p>
          <button data-booking-trigger className="w-fit rounded-full bg-[#236f7e] px-5 py-3 text-[#fffaf2] transition hover:-translate-y-1 hover:bg-[#174f5b]">Evaluar mi propiedad</button>
        </div>
      </div>
    </footer>
    </div>
  );
}
