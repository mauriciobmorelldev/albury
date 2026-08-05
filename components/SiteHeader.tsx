"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "FAQs", href: "/#faqs" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${scrolled ? "px-0 py-0" : "px-5 py-6 sm:px-8 lg:px-12"}`}>
      <nav
        className={`mx-auto flex w-full items-center justify-between gap-7 border border-[#fffaf4]/16 text-[#fffaf4] shadow-[0_14px_34px_rgba(35,111,126,.18)] backdrop-blur-2xl transition-all duration-300 ${
          scrolled
            ? "max-w-none rounded-none bg-[#257985] px-8 py-4 lg:px-[max(42px,calc((100vw-1180px)/2))]"
            : "max-w-[1240px] rounded-full bg-[#257985]/72 px-6 py-4"
        }`}
        aria-label="Navegación principal"
      >
        <a href="/#inicio" className="flex shrink-0 items-center" aria-label="Albury Design Home">
          <Image
            src="/albury-logo-cropped.png"
            alt="Albury Design"
            width={1544}
            height={528}
            className="h-8 w-auto brightness-0 invert sm:h-9"
            priority
          />
        </a>

        <div className="hidden items-center gap-10 lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="whitespace-nowrap text-base font-black text-[#fffaf4] transition hover:text-[#dff3f4]">
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="/#contacto"
          className="hidden items-center rounded-full bg-[#e9635b] px-7 py-4 text-sm font-black text-[#fffaf4] shadow-[0_12px_24px_rgba(227,74,46,.22)] transition hover:-translate-y-0.5 hover:bg-[#c94d43] sm:inline-flex"
        >
          Consulta Gratis
        </a>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-[#fffaf4]/20 bg-[#fffaf4]/10 text-[#fffaf4] lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Abrir menú"
        >
          <span className="h-px w-5 bg-current shadow-[0_6px_0_currentColor,0_-6px_0_currentColor]" />
        </button>
      </nav>

      {open ? (
        <div className="mx-5 mt-2 grid gap-1 rounded-[26px] border border-[#257985]/16 bg-[#fffaf2]/96 p-3 text-[#257985] shadow-2xl shadow-[#257985]/14 backdrop-blur-xl sm:mx-8 lg:hidden">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="px-4 py-3 text-sm font-black" onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href="/#contacto" className="mt-1 rounded-full bg-[#e9635b] px-4 py-3 text-sm font-black text-[#fffaf4]" onClick={() => setOpen(false)}>
            Consulta Gratis
          </a>
        </div>
      ) : null}
    </header>
  );
}