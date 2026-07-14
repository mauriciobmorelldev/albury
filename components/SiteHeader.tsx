"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Estrategia", href: "/#estrategia" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Resultados", href: "/#resultados" },
  { label: "Proceso", href: "/#proceso" },
  { label: "Portfolio", href: "/portfolio" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 80;
      setScrolled(isScrolled);
      if (!isScrolled) {
        setExpanded(true);
      } else if (window.scrollY > 160) {
        setExpanded(false);
        setOpen(false);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const compact = scrolled && !expanded;
  const expandedFromScroll = scrolled && expanded;

  return (
    <header
      className={`fixed top-0 z-50 py-4 transition-[left,right,padding] duration-300 ${
        compact || expandedFromScroll ? "left-4 right-auto sm:left-6 lg:left-8" : "left-0 right-0 px-4 sm:px-6 lg:px-10"
      }`}
    >
      <nav
        className={`liquid-header flex origin-left items-center justify-between gap-5 rounded-[28px] border border-warm-white/18 px-4 py-3 transition-[width,max-width,background-color,box-shadow] duration-300 sm:px-6 ${
          compact
            ? "w-[188px] cursor-pointer bg-charcoal/82 shadow-[0_14px_44px_rgba(0,0,0,.22)]"
            : expandedFromScroll
              ? "w-[calc(100vw-2rem)] max-w-7xl bg-charcoal/72 shadow-[0_18px_70px_rgba(0,0,0,.24)] sm:w-[calc(100vw-3rem)] lg:w-[calc(100vw-4rem)]"
              : "mx-auto w-full max-w-7xl bg-charcoal/62"
        }`}
        aria-label="Navegación principal"
        onClick={() => compact && setExpanded(true)}
      >
        <a
          href="/#inicio"
          className={`relative z-10 flex shrink-0 items-center gap-3 transition-transform duration-300 ${compact ? "mx-auto scale-100" : ""}`}
          aria-label="Albury Design Home"
          onClick={(event) => compact && event.preventDefault()}
        >
          <Image
            src="/albury-logo-cropped.png"
            alt="Albury Design"
            width={1544}
            height={528}
            className="h-8 w-auto shrink-0 brightness-0 invert drop-shadow-[0_2px_14px_rgba(0,0,0,.45)] sm:h-9"
            priority
          />
        </a>

        <div className={`${compact ? "pointer-events-none w-0 scale-95 opacity-0" : "w-auto scale-100 opacity-100"} relative z-10 hidden origin-left items-center gap-8 overflow-hidden transition-all duration-300 lg:flex`}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="whitespace-nowrap text-xs font-black uppercase tracking-[.16em] text-warm-white/92 drop-shadow-[0_1px_10px_rgba(0,0,0,.35)] transition hover:text-soft-gold">
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="/#contacto"
          className={`${compact ? "pointer-events-none hidden opacity-0" : "opacity-100"} relative z-10 hidden items-center gap-4 rounded-full border border-gold/70 bg-gold/92 px-6 py-4 text-sm font-black text-warm-white shadow-[0_16px_50px_rgba(227,74,46,.22)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-[#b93322] sm:inline-flex`}
        >
          Consulta Gratis <span className="grid h-7 w-7 place-items-center rounded-full bg-warm-white/16">→</span>
        </a>

        <button
          type="button"
          className={`${compact ? "hidden" : "grid"} relative z-10 h-10 w-10 place-items-center rounded-full border border-warm-white/16 bg-warm-white/12 text-warm-white backdrop-blur-xl lg:hidden`}
          onClick={(event) => {
            event.stopPropagation();
            setOpen((value) => !value);
          }}
          aria-expanded={open}
          aria-label="Abrir menú"
        >
          <span className="h-px w-4 bg-current shadow-[0_6px_0_currentColor,0_-6px_0_currentColor]" />
        </button>
      </nav>

      {open && !compact ? (
        <div className={`${expandedFromScroll ? "ml-0" : "mx-auto"} mt-2 grid max-w-7xl gap-1 rounded-[24px] border border-warm-white/12 bg-charcoal/86 p-3 shadow-2xl shadow-black/24 backdrop-blur-2xl lg:hidden`}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="px-3 py-3 text-sm font-black uppercase tracking-[.12em] text-warm-white" onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href="/#contacto" className="mt-1 rounded-lg bg-gold px-3 py-3 text-sm font-black text-warm-white" onClick={() => setOpen(false)}>
            Consulta Gratis
          </a>
        </div>
      ) : null}
    </header>
  );
}
