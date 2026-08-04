"use client";

import Image from "next/image";
import { useState } from "react";

const navItems = [
  { label: "Estrategia", href: "/#estrategia" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Resultados", href: "/#resultados" },
  { label: "Proceso", href: "/#proceso" },
  { label: "Portfolio", href: "/portfolio" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-4 sm:px-6 lg:px-10">
      <nav
        className="liquid-header mx-auto flex w-full max-w-7xl items-center justify-between gap-5 rounded-[28px] border border-warm-white/18 bg-charcoal/72 px-4 py-3 shadow-[0_18px_70px_rgba(0,0,0,.2)] backdrop-blur-2xl sm:px-6"
        aria-label="Navegación principal"
      >
        <a href="/#inicio" className="relative z-10 flex shrink-0 items-center gap-3" aria-label="Albury Design Home">
          <Image
            src="/albury-logo-cropped.png"
            alt="Albury Design"
            width={1544}
            height={528}
            className="h-8 w-auto shrink-0 brightness-0 invert drop-shadow-[0_2px_14px_rgba(0,0,0,.45)] sm:h-9"
            priority
          />
        </a>

        <div className="relative z-10 hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="whitespace-nowrap text-xs font-black uppercase tracking-[.16em] text-warm-white/92 drop-shadow-[0_1px_10px_rgba(0,0,0,.35)] transition hover:text-soft-gold">
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="/#contacto"
          className="relative z-10 hidden items-center gap-4 rounded-full border border-gold/70 bg-gold/92 px-6 py-4 text-sm font-black text-warm-white shadow-[0_16px_50px_rgba(227,74,46,.22)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-[#b93322] sm:inline-flex"
        >
          Diagnóstico Gratis <span className="grid h-7 w-7 place-items-center rounded-full bg-warm-white/16">→</span>
        </a>

        <button
          type="button"
          className="relative z-10 grid h-10 w-10 place-items-center rounded-full border border-warm-white/16 bg-warm-white/12 text-warm-white backdrop-blur-xl lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Abrir menú"
        >
          <span className="h-px w-4 bg-current shadow-[0_6px_0_currentColor,0_-6px_0_currentColor]" />
        </button>
      </nav>

      {open ? (
        <div className="mx-auto mt-2 grid max-w-7xl gap-1 rounded-[24px] border border-warm-white/12 bg-charcoal/86 p-3 shadow-2xl shadow-black/24 backdrop-blur-2xl lg:hidden">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="px-3 py-3 text-sm font-black uppercase tracking-[.12em] text-warm-white" onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href="/#contacto" className="mt-1 rounded-lg bg-gold px-3 py-3 text-sm font-black text-warm-white" onClick={() => setOpen(false)}>
            Diagnóstico Gratis
          </a>
        </div>
      ) : null}
    </header>
  );
}
