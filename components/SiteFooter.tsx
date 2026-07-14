"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

export default function SiteFooter() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.from(".footer-reveal", {
        autoAlpha: 0,
        y: 28,
        filter: "blur(8px)",
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 82%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={rootRef} className="bg-charcoal px-5 pb-8 pt-20 text-warm-white sm:px-8 lg:px-14">
      <div className="mx-auto max-w-7xl border-t border-warm-white/12 pt-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr_.8fr]">
          <div className="footer-reveal">
            <Image src="/albury-logo-cropped.png" alt="Albury Design" width={1544} height={528} className="h-11 w-auto brightness-0 invert" />
            <p className="mt-7 max-w-xl text-sm font-semibold leading-7 text-warm-white/58">La información publicada se basa en datos de clientes anteriores y debe considerarse como estimativa. No se puede garantizar que los mismos resultados financieros sean alcanzados.*</p>
          </div>
          <div className="footer-reveal">
            <h3 className="text-xs font-black uppercase tracking-[.2em] text-soft-gold">Contacta con Nosotros</h3>
            <dl className="mt-6 grid gap-4 text-sm font-bold text-warm-white/68">
              <div><dt className="text-warm-white">Office:</dt><dd>Miami, FL, USA</dd></div>
              <div><dt className="text-warm-white">WhatsApp:</dt><dd><a className="hover:text-soft-gold" href="tel:+17868462880">+1 (786) 846-2880</a></dd></div>
              <div><dt className="text-warm-white">Mail:</dt><dd><a className="hover:text-soft-gold" href="mailto:jgenovard@alburydesign.com">jgenovard@alburydesign.com</a></dd></div>
              <div><dt className="text-warm-white">Site:</dt><dd><a className="hover:text-soft-gold" href="https://alburydesign.com/">alburydesign.com</a></dd></div>
            </dl>
          </div>
          <div className="footer-reveal lg:text-right">
            <h3 className="text-xs font-black uppercase tracking-[.2em] text-soft-gold">Navegación</h3>
            <div className="mt-6 grid gap-3 text-sm font-black uppercase tracking-[.14em] text-warm-white/72">
              <a href="/#estrategia" className="hover:text-soft-gold">Home</a>
              <a href="/#servicios" className="hover:text-soft-gold">Servicios</a>
              <a href="/portfolio" className="hover:text-soft-gold">Portfolio</a>
              <a href="/#faqs" className="hover:text-soft-gold">FAQs</a>
            </div>
          </div>
        </div>
        <div className="footer-reveal mt-12 flex flex-col gap-4 border-t border-warm-white/10 pt-6 text-xs font-bold text-warm-white/42 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2025 . All rights reserved</p>
          <button data-booking-trigger className="w-fit rounded-full border border-warm-white/14 px-5 py-3 text-warm-white transition hover:bg-warm-white/10">Consulta Gratis</button>
        </div>
      </div>
    </footer>
  );
}
