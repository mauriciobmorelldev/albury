"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "About us", href: "/about-us" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Resultados", href: "/resultados" },
];

const leftNavItems = navItems.slice(0, 3);
const rightNavItems = navItems.slice(3);

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
    <header className={`site-header fixed left-0 right-0 top-0 z-50 ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="site-nav mx-auto w-full text-[#fffaf4]" aria-label="Navegación principal">
        <div className="header-nav-group header-nav-left hidden items-center lg:flex">
          {leftNavItems.map((item) => (
            <Link key={item.href} href={item.href} className="header-nav-link">
              {item.label}
            </Link>
          ))}
        </div>

        <Link href="/" className="header-brand flex shrink-0 items-center" aria-label="Albury Design Home">
          <span>Albury Design</span>
        </Link>

        <div className="header-nav-group header-nav-right hidden items-center lg:flex">
          {rightNavItems.map((item) => (
            <Link key={item.href} href={item.href} className="header-nav-link">
              {item.label}
            </Link>
          ))}
          <button type="button" data-booking-trigger className="header-consultation hidden items-center xl:inline-flex">
            Solicitá tu diagnóstico
          </button>
        </div>

        <button
          type="button"
          className="header-menu-button grid h-11 w-11 place-items-center lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Abrir menú"
        >
          <span className="h-px w-5 bg-current shadow-[0_6px_0_currentColor,0_-6px_0_currentColor]" />
        </button>
      </nav>

      {open ? (
        <div className="header-mobile-menu mx-3 mt-2 grid gap-1 border p-3 text-[#fffaf4] backdrop-blur-xl sm:mx-8 lg:hidden">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="px-4 py-3 text-xs font-bold uppercase tracking-[.14em]" onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <button type="button" data-booking-trigger className="header-consultation mt-1 px-4 py-3 text-left text-xs font-black uppercase tracking-[.12em]" onClick={() => setOpen(false)}>
            Solicitá tu diagnóstico
          </button>
        </div>
      ) : null}
    </header>
  );
}
