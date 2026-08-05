"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { alburyProjects } from "@/data/alburyProjects";
import { getGsap } from "@/lib/gsap";

const mistakes = [
  {
    title: "Reservas perdidas",
    copy: "Cuando el listing no comunica valor en segundos, el huésped sigue comparando.",
    image: "/renders/albury/web/bedroom-desk.jpg",
  },
  {
    title: "Tarifas más bajas",
    copy: "Sin una experiencia visual clara, la propiedad termina compitiendo por precio.",
    image: "/zip-assets/properties/st-agustin-hero-firepit.webp",
  },
  {
    title: "Costos invisibles",
    copy: "Malas compras, baja estandarización y reseñas débiles cuestan después del lanzamiento.",
    image: "/zip-assets/properties/sa-figuereta-pool-1.webp",
    accent: true,
  },
];

const listings = [
  { image: "/zip-assets/properties/st-agustin-hero-firepit.webp", label: "St Agustin", title: "Outdoor Experience", tags: ["Gancho visual", "Experiencia premium"] },
  { image: "/zip-assets/properties/st-agustin-02.webp", label: "St Agustin", title: "Beach Corner", tags: ["ADR focus", "Listing ready"] },
  { image: "/zip-assets/properties/sa-figuereta-pool-1.webp", label: "Sa Figuereta", title: "Pool Experience", tags: ["Pool hook", "Luxe feel"] },
  { image: "/zip-assets/properties/sa-figuereta-83.webp", label: "Sa Figuereta", title: "Living Mediterranean", tags: ["Comodidad", "Foto principal"] },
];

const metrics = [
  { value: 35, suffix: "%", label: "más percepción de valor", copy: "Rango objetivo de mejora visual y narrativa según mercado." },
  { value: 20, suffix: "%", label: "más ocupación potencial", copy: "Cuando el diseño reduce fricción y mejora decisión de reserva." },
  { value: 40, prefix: "$", suffix: "k", label: "impacto anual posible", copy: "Estimación de oportunidad en STR de alto movimiento." },
];

const process = [
  ["Diagnóstico", "Entendemos mercado, huésped objetivo, pricing y competencia antes de diseñar."],
  ["Narrativa", "Definimos qué debe sentir y recordar el huésped al mirar el listing."],
  ["Diseño STR", "Priorizamos muebles, amenities, fotos y layout con intención comercial."],
  ["Instalación", "Ordenamos compras y ubicación para llegar a una propiedad lista para fotografiar."],
];

const offers = [
  {
    title: "Diseño estratégico remoto",
    copy: "Moodboards, layout, lista de compras y guía visual para ejecutar sin improvisar.",
    items: ["Tableros de diseño", "Planificación del espacio", "Lista de compras", "Guía de instalación"],
  },
  {
    title: "STR launch system",
    copy: "Acompañamiento integral para preparar una propiedad nueva o reposicionar una existente.",
    items: ["Diagnóstico competitivo", "Dirección visual", "Priorización por ROI", "Checklist pre-fotos"],
  },
];

const faqs = [
  ["¿Dónde está disponible el servicio?", "El diseño remoto está disponible para propiedades en Estados Unidos y España. La instalación en sitio se revisa según ubicación."],
  ["¿Cuándo debería comenzar el proceso?", "Lo ideal es iniciar durante la compra, antes de amueblar o antes de renovar, para que la estrategia influya en presupuesto, amenities y experiencia del huésped."],
  ["¿Esto reemplaza a un interiorista tradicional?", "No exactamente. Albury combina estética, experiencia del huésped y objetivos comerciales de alquiler vacacional."],
  ["¿Prometen resultados exactos?", "No prometemos ingresos garantizados. Trabajamos para mejorar percepción, diferenciación y preparación comercial de la propiedad."],
];

export function AlburyCommercialHome() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeListing, setActiveListing] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveListing((current) => (current + 1) % listings.length);
    }, 3800);

    return () => window.clearInterval(timer);
  }, []);

  const prevListing = () => setActiveListing((current) => (current - 1 + listings.length) % listings.length);
  const nextListing = () => setActiveListing((current) => (current + 1) % listings.length);

  useLayoutEffect(() => {
    const { gsap } = getGsap();
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(".zip-reveal", { autoAlpha: 0, y: 34, filter: "blur(12px)" });

      gsap.utils.toArray<HTMLElement>(".zip-reveal").forEach((item) => {
        gsap.to(item, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 86%", once: true },
        });
      });

      gsap.fromTo(".hero-bg", { scale: 1.12 }, { scale: 1.02, duration: 1.45, ease: "power3.out" });
      gsap.fromTo(
        ".hero-copy-line",
        { autoAlpha: 0, y: 46, filter: "blur(16px)" },
        { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.85, stagger: 0.08, ease: "power3.out", delay: 0.12 },
      );

      gsap.to(".hero-bg", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: { trigger: ".curve-hero", start: "top top", end: "bottom top", scrub: true },
      });

      gsap.fromTo(
        ".hero-curve",
        { yPercent: 32, scaleX: 1.12 },
        {
          yPercent: 0,
          scaleX: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".curve-hero", start: "45% top", end: "bottom top", scrub: 0.65 },
        },
      );

      gsap.utils.toArray<HTMLElement>(".mistake-card").forEach((item, index) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, y: 62, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.82, delay: index * 0.08, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 84%", once: true } },
        );
      });

      gsap.utils.toArray<HTMLElement>(".metric-number").forEach((item) => {
        const target = Number(item.dataset.value || "0");
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 1.35,
          ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 82%", once: true },
          onUpdate: () => {
            item.textContent = Math.round(counter.value).toLocaleString("en-US");
          },
        });
      });

      gsap.fromTo(
        ".timeline-fill",
        { scaleY: 0, transformOrigin: "top" },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".timeline-section", start: "top 62%", end: "bottom 72%", scrub: 0.55 } },
      );

      gsap.utils.toArray<HTMLElement>(".parallax-soft").forEach((item) => {
        gsap.to(item, { yPercent: -8, ease: "none", scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: true } });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={rootRef} className="overflow-hidden bg-[#fbf7ef] text-[#1f1b18]">
      <section id="inicio" className="curve-hero relative min-h-screen overflow-hidden bg-[#257985] text-[#fffaf4]">
        <div className="hero-bg absolute inset-0">
          <Image src="/zip-assets/properties/st-agustin-hero-firepit.webp" alt="Outdoor experience diseñada para STR" fill priority sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,35,38,.74),rgba(10,35,38,.38)_52%,rgba(10,35,38,.18)),linear-gradient(0deg,rgba(10,35,38,.28),rgba(10,35,38,.10))]" />
        <div className="relative z-10 mx-auto flex min-h-screen max-w-[1240px] items-center px-5 pt-24 sm:px-8 lg:px-0">
          <div className="max-w-[820px] pb-20">
            <h1 className="text-[clamp(4.2rem,7.5vw,7.8rem)] font-black leading-[.94] tracking-[-.07em] text-[#fffaf4]">
              <span className="hero-copy-line block text-[#ef665d]">Multiplica</span>
              <span className="hero-copy-line block">los ingresos</span>
              <span className="hero-copy-line block">de tu <span className="text-[#ef665d]">Airbnb</span> con</span>
              <span className="hero-copy-line block text-[#ef665d]">estrategia.</span>
            </h1>
            <div className="hero-copy-line mt-9 flex flex-wrap gap-4">
              <a href="#contacto" className="rounded-full bg-[#ef665d] px-7 py-4 text-sm font-black text-[#fffaf4] shadow-[0_12px_28px_rgba(239,102,93,.28)] transition hover:-translate-y-1 hover:bg-[#c94d43]">Agendar consulta gratis</a>
              <Link href="/portfolio" className="rounded-full bg-[#fffaf4] px-7 py-4 text-sm font-black text-[#257985] transition hover:-translate-y-1 hover:bg-[#e5e9eb]">Ver portfolio</Link>
            </div>
          </div>
        </div>
        <svg className="hero-curve absolute bottom-[-1px] left-0 z-10 h-[120px] w-full text-[#e5e9eb]" viewBox="0 0 1440 130" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 78 C220 118 410 20 690 70 C940 115 1160 35 1440 86 L1440 130 L0 130 Z" fill="currentColor" />
        </svg>
      </section>

      <section id="estrategia" className="bg-[#e5e9eb] px-5 py-24 sm:px-8 lg:px-14 lg:py-32">
        <div className="mx-auto grid max-w-[1180px] gap-6 lg:grid-cols-[1.18fr_.82fr]">
          <article className="zip-reveal rounded-[30px] bg-[#fffaf2] p-8 shadow-[0_22px_60px_rgba(35,111,126,.10)] lg:p-11">
            <p className="mb-4 text-xs font-black uppercase tracking-[.18em] text-[#675f58]">La pregunta real</p>
            <h2 className="text-[clamp(3.4rem,5.2vw,5.8rem)] font-black leading-[.91] tracking-[-.07em] text-[#257985]">¿Por qué invertir en diseño si puedo llenarlo con muebles baratos?</h2>
            <p className="mt-7 max-w-3xl text-lg font-semibold leading-8 text-[#675f58]">Porque amueblar barato puede ahorrar hoy, pero perder miles cada mes en ADR bajo, reseñas flojas, reemplazos y tiempo sin facturar.</p>
          </article>
          <article className="zip-reveal flex min-h-[360px] flex-col justify-end rounded-[30px] bg-[#e9635b] p-8 text-[#fffaf4] shadow-[0_22px_60px_rgba(35,111,126,.10)] lg:p-11">
            <p className="mb-5 text-xs font-black uppercase tracking-[.18em] text-[#ffe9df]">Respuesta Albury</p>
            <h3 className="text-[clamp(3rem,4.2vw,5rem)] font-black leading-[.9] tracking-[-.07em]">El diseño estratégico no es un gasto. Es un multiplicador.</h3>
          </article>
        </div>
      </section>

      <section className="bg-[#257985] px-5 py-20 text-[#fffaf4] sm:px-8 lg:px-14 lg:py-28">
        <div className="mx-auto max-w-[1180px]">
          <div className="zip-reveal mb-10 grid gap-6 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
            <h2 className="text-5xl font-black leading-[.94] tracking-[-.06em] text-[#dff3f4] sm:text-7xl">Errores costosos</h2>
            <p className="max-w-2xl text-xl font-black leading-8 text-[#dff3f4]">Sin un diseño estratégico, estás dejando dinero sobre la mesa.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {mistakes.map((item) => (
              <article key={item.title} className={`mistake-card overflow-hidden rounded-[24px] p-5 shadow-[0_22px_60px_rgba(0,0,0,.14)] ${item.accent ? "bg-[#c8a39b] text-[#1f1b18]" : "bg-[#fbf7ef] text-[#1f1b18]"}`}>
                <div className="relative h-[200px] overflow-hidden rounded-[18px]">
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
                </div>
                <h3 className="mt-12 text-4xl font-black leading-[.9] tracking-[-.06em]">{item.title}</h3>
                <p className="mt-5 text-lg font-black leading-7 text-[#4f4540]">{item.copy}</p>
              </article>
            ))}
          </div>
          <div className="zip-reveal mt-8 text-center">
            <a href="#contacto" className="inline-flex rounded-full bg-[#ef665d] px-7 py-4 text-sm font-black text-[#fffaf4] shadow-[0_12px_28px_rgba(239,102,93,.25)] transition hover:-translate-y-1 hover:bg-[#c94d43]">Quiero mejorar mi listing</a>
          </div>
        </div>
      </section>

      <section id="portfolio" className="bg-[#e5e9eb] px-5 py-24 sm:px-8 lg:px-14 lg:py-32">
        <div className="mx-auto max-w-[1180px]">
          <div className="zip-reveal mb-12 grid gap-8 lg:grid-cols-[.92fr_1.08fr] lg:items-end">
            <h2 className="text-[clamp(4rem,6vw,7rem)] font-black leading-[.9] tracking-[-.075em] text-[#257985]">Propiedades que se entienden antes del primer click.</h2>
            <p className="max-w-2xl text-xl font-black leading-8 text-[#3c5358]">Una vista rápida de proyectos reales: exteriores, amenities y momentos visuales pensados para vender la estadía.</p>
          </div>
          <div className="relative mx-auto flex min-h-[520px] items-center justify-center overflow-hidden">
            <button type="button" onClick={prevListing} className="absolute left-0 z-20 hidden h-16 w-16 place-items-center rounded-full bg-[#257985] text-3xl font-black text-[#fffaf4] shadow-[0_16px_34px_rgba(23,70,79,.2)] transition hover:-translate-y-1 lg:grid" aria-label="Anterior">←</button>
            <div className="relative h-[520px] w-full max-w-[920px] [perspective:1200px]">
              {listings.map((item, index) => {
                const offset = (index - activeListing + listings.length) % listings.length;
                const side = offset === listings.length - 1 ? -1 : offset;
                const visible = side >= -1 && side <= 2;
                return (
                  <article
                    key={item.title}
                    className="absolute left-1/2 top-0 h-[520px] w-[min(78vw,720px)] overflow-hidden rounded-[28px] bg-[#1f1713] shadow-[0_24px_70px_rgba(35,111,126,.18)] transition-all duration-700 ease-out"
                    style={{
                      transform: `translateX(calc(-50% + ${side * 330}px)) scale(${side === 0 ? 1 : 0.78}) rotateY(${-side * 16}deg)`,
                      opacity: visible ? (side === 0 ? 1 : 0.42) : 0,
                      zIndex: 10 - Math.abs(side),
                    }}
                  >
                    <Image src={item.image} alt={item.title} fill sizes="(max-width: 1024px) 78vw, 720px" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d2931]/78 via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8 text-[#fffaf4]">
                      <p className="text-xs font-black uppercase tracking-[.16em] text-[#dff3f4]">{item.label}</p>
                      <h3 className="mt-3 text-5xl font-black leading-none tracking-[-.065em] sm:text-6xl">{item.title}</h3>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.tags.map((tag) => <span key={tag} className="rounded-full bg-[#fffaf4]/16 px-4 py-2 text-xs font-black backdrop-blur-xl">{tag}</span>)}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            <button type="button" onClick={nextListing} className="absolute right-0 z-20 hidden h-16 w-16 place-items-center rounded-full bg-[#257985] text-3xl font-black text-[#fffaf4] shadow-[0_16px_34px_rgba(23,70,79,.2)] transition hover:-translate-y-1 lg:grid" aria-label="Siguiente">→</button>
          </div>
        </div>
      </section>

      <section id="resultados" className="bg-[#fbf7ef] px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="zip-reveal text-center">
            <p className="mb-4 text-xs font-black uppercase tracking-[.2em] text-[#e36559]">ROI visible</p>
            <h2 className="text-5xl font-black tracking-[-.055em] text-[#0d2931] sm:text-7xl">Resultados que se pueden medir.</h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {metrics.map((metric) => (
              <article key={metric.label} className="zip-reveal rounded-[32px] bg-[#fffaf2] p-8 text-center shadow-[0_28px_80px_rgba(13,41,49,.08)]">
                <div className="text-6xl font-black tracking-[-.06em] text-[#3c8d4d] sm:text-7xl">{metric.prefix}<span className="metric-number" data-value={metric.value}>0</span>{metric.suffix}</div>
                <h3 className="mt-4 text-2xl font-black leading-tight tracking-[-.03em] text-[#0d2931]">{metric.label}</h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-[#66777a]">{metric.copy}</p>
              </article>
            ))}
          </div>
          <p className="zip-reveal mx-auto mt-8 max-w-3xl text-center text-sm font-semibold leading-6 text-[#7d8b8e]">Los valores son rangos orientativos, no promesas de ingresos. El resultado depende de mercado, pricing, operación, ubicación y demanda.</p>
        </div>
      </section>

      <section id="proceso" className="timeline-section bg-[#fffaf2] px-5 py-24 sm:px-8 lg:px-14 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.72fr_1.28fr]">
          <div className="zip-reveal lg:sticky lg:top-32 lg:self-start">
            <p className="mb-4 text-xs font-black uppercase tracking-[.2em] text-[#e36559]">Mapa de decisión</p>
            <h2 className="text-5xl font-black leading-[.92] tracking-[-.055em] text-[#0d2931] sm:text-7xl">Cada paso baja el riesgo antes de hablar de inversión.</h2>
          </div>
          <div className="relative pl-10">
            <div className="absolute left-[18px] top-0 h-full w-px bg-[#e36559]/18" />
            <div className="timeline-fill absolute left-[18px] top-0 h-full w-px bg-[#e36559]" />
            <div className="grid gap-8">
              {process.map(([title, copy], index) => (
                <article key={title} className="zip-reveal relative rounded-[30px] border border-[#236f7e]/12 bg-[#fbf7ef] p-8 shadow-[0_22px_70px_rgba(13,41,49,.06)]">
                  <span className="absolute -left-[58px] top-8 grid h-10 w-10 place-items-center rounded-full border border-[#e36559]/30 bg-[#fffaf2] text-sm font-black text-[#0d2931]">0{index + 1}</span>
                  <p className="text-xs font-black uppercase tracking-[.18em] text-[#e36559]">Paso 0{index + 1}</p>
                  <h3 className="mt-4 text-4xl font-black tracking-[-.045em] text-[#0d2931]">{title}</h3>
                  <p className="mt-4 text-lg font-semibold leading-8 text-[#6a7a7d]">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="bg-[#fbf7ef] px-5 py-24 sm:px-8 lg:px-14 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="zip-reveal mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-black uppercase tracking-[.2em] text-[#e36559]">Oferta</p>
            <h2 className="text-5xl font-black tracking-[-.055em] text-[#0d2931] sm:text-7xl">Nosotros tomamos las decisiones de diseño por vos.</h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {offers.map((offer) => (
              <article key={offer.title} className="zip-reveal rounded-[34px] border border-[#e36559]/25 bg-[#fffaf2] p-8 shadow-[0_28px_80px_rgba(13,41,49,.06)]">
                <h3 className="text-4xl font-black tracking-[-.045em] text-[#0d2931]">{offer.title}</h3>
                <p className="mt-4 text-lg font-semibold leading-8 text-[#66777a]">{offer.copy}</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {offer.items.map((item) => <span key={item} className="rounded-full bg-[#e5e9eb] px-4 py-3 text-sm font-black text-[#236f7e]">{item}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#236f7e] px-5 py-24 text-white sm:px-8 lg:px-14">
        <div className="zip-reveal mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.75fr_1.25fr]">
          <p className="text-xs font-black uppercase tracking-[.2em] text-[#bfeef5]">Lo que nuestros clientes dicen</p>
          <blockquote className="text-4xl font-black uppercase leading-[.95] tracking-[-.045em] sm:text-6xl">“Antes comprábamos muebles. Ahora entendemos qué tiene que comunicar cada rincón para reservar mejor.”</blockquote>
        </div>
      </section>

      <section className="bg-[#fbf7ef] px-5 py-24 sm:px-8 lg:px-14 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
          <div className="zip-reveal">
            <p className="mb-4 text-xs font-black uppercase tracking-[.2em] text-[#e36559]">Portfolio</p>
            <h2 className="text-5xl font-black leading-[.92] tracking-[-.055em] text-[#0d2931] sm:text-7xl">Proyectos vistos como listings.</h2>
            <p className="mt-6 text-lg font-semibold leading-8 text-[#66777a]">Explorá fichas con galería, estrategia y lectura de ROI para entender cómo se traduce el diseño en valor comercial.</p>
            <Link href="/portfolio" className="mt-8 inline-flex rounded-full bg-[#e94b35] px-7 py-4 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-[#c94d43]">Abrir portfolio →</Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {alburyProjects.map((project) => (
              <Link key={project.slug} href={`/portfolio/${project.slug}`} className="zip-reveal group relative min-h-[360px] overflow-hidden rounded-[30px] bg-[#0d2931]">
                <Image src={project.heroImage} alt={project.title} fill sizes="(max-width: 768px) 100vw, 30vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d2931]/86 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-4xl font-black uppercase tracking-[-.055em]">{project.title}</h3>
                  <p className="mt-2 text-xs font-black uppercase tracking-[.16em] text-[#bfeef5]">{project.roiFocus}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="faqs" className="bg-[#fffaf2] px-5 py-24 sm:px-8 lg:px-14 lg:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="zip-reveal text-center">
            <p className="mb-4 text-xs font-black uppercase tracking-[.2em] text-[#e36559]">FAQ</p>
            <h2 className="text-5xl font-black leading-[.94] tracking-[-.055em] text-[#236f7e] sm:text-7xl">Preguntas antes de invertir.</h2>
          </div>
          <div className="mt-10 grid gap-3">
            {faqs.map(([question, answer]) => (
              <details key={question} className="zip-reveal rounded-[20px] border border-[#236f7e]/15 bg-[#fbf7ef] p-6">
                <summary className="cursor-pointer text-lg font-black tracking-[-.02em] text-[#1f1b18]">{question}</summary>
                <p className="mt-4 font-semibold leading-7 text-[#68787b]">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="relative bg-[#0d2931] px-5 py-24 text-white sm:px-8 lg:px-14 lg:py-32">
        <div className="zip-reveal mx-auto max-w-7xl rounded-[42px] bg-[#e94b35] p-8 shadow-2xl shadow-[#e94b35]/25 lg:p-14">
          <p className="text-xs font-black uppercase tracking-[.22em] text-white/80">Invitar a actuar</p>
          <h2 className="mt-6 text-[clamp(4.5rem,14vw,15rem)] font-black uppercase leading-[.75] tracking-[-.08em]">Book</h2>
          <p className="mt-8 max-w-2xl text-xl font-semibold leading-8 text-white/86">Pedí un diagnóstico gratis y veamos si tu propiedad está comunicando todo el valor que podría vender.</p>
          <a href="mailto:hello@alburydesign.com" className="mt-8 inline-flex rounded-full bg-white px-8 py-4 text-sm font-black text-[#e94b35] transition hover:-translate-y-1">Diagnóstico Gratis →</a>
        </div>
      </section>
    </main>
  );
}

export default AlburyCommercialHome;