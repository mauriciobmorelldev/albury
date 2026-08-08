"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import PropertyPerformanceCard from "@/components/PropertyPerformanceCard";
import { alburyProjects } from "@/data/alburyProjects";
import { getGsap } from "@/lib/gsap";

const milanoteShots = [
  ["9.45.04 PM", "Dirección visual"], ["9.45.05 PM", "Identidad del espacio"],
  ["9.45.17 PM", "Escena principal"], ["9.45.17 PM (1)", "Detalle editorial"],
  ["9.46.48 PM", "Experiencia premium"], ["9.46.49 PM (2)", "Diseño con intención"],
  ["9.48.40 PM", "Atmósfera memorable"], ["9.49.06 PM (1)", "Valor percibido"],
].map(([time, label]) => ({
  src: `/milanote-assets/WhatsApp Image 2026-08-07 at ${time}.jpeg`,
  alt: `${label} por Albury Design`, label, project: "Albury Design", slug: "", wide: true,
}));

const allShots = [
  ...milanoteShots,
  ...alburyProjects.flatMap((project) => project.gallery.map((shot) => ({ ...shot, project: project.title, slug: project.slug }))),
];

const impactMetrics = [
  { value: "+15–35%", label: "ADR", copy: "Mayor tarifa diaria promedio al construir una propuesta difícil de comparar por precio." },
  { value: "+10–20%", label: "Ocupación", copy: "Una experiencia mejor comunicada reduce fricción y fortalece la decisión de reserva." },
  { value: "USD 20–40k", label: "Ingresos adicionales/año", copy: "Rango de impacto posible para propiedades STR con demanda y operación adecuadas." },
  { value: "2–4 meses", label: "Recupero estimado", copy: "El diseño se trata como una inversión comercial, no como decoración aislada." },
];

export default function ImmersivePortfolio() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const { gsap } = getGsap();
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(".portfolio-reveal", { autoAlpha: 0, y: 30 });
      gsap.utils.toArray<HTMLElement>(".portfolio-reveal").forEach((item) => {
        gsap.to(item, {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 84%", once: true },
        });
      });

      gsap.fromTo(
        ".portfolio-hero-image",
        { scale: 1.12, yPercent: 4 },
        { scale: 1, yPercent: -5, duration: 1.4, ease: "power3.out" },
      );

      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          { rotateX: 9, rotateY: index % 2 ? -8 : 8, y: 80, autoAlpha: 0 },
          {
            rotateX: 0,
            rotateY: 0,
            y: 0,
            autoAlpha: 1,
            ease: "power3.out",
            duration: 0.9,
            scrollTrigger: { trigger: card, start: "top 80%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".project-metric-number").forEach((item) => {
        const target = Number(item.dataset.value || "0");
        const hasDecimal = target % 1 !== 0;
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 1.25,
          ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 88%", once: true },
          onUpdate: () => {
            item.textContent = hasDecimal ? counter.value.toFixed(1) : Math.round(counter.value).toLocaleString("en-US");
          },
        });
      });

      const galleryTrack = rootRef.current?.querySelector<HTMLElement>(".immersive-track");
      const galleryWrap = rootRef.current?.querySelector<HTMLElement>(".immersive-gallery-wrap");
      if (galleryTrack && galleryWrap && window.matchMedia("(min-width: 900px)").matches) {
        const distance = () => galleryTrack.scrollWidth - window.innerWidth + 112;
        gsap.to(galleryTrack, {
          x: () => -distance(),
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: galleryWrap,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.45,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }

    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={rootRef} className="portfolio-luxury overflow-hidden bg-[#0f0d0c] text-[#f3ede4]">
      <section className="route-hero portfolio-route-hero">
        <div className="route-hero-image portfolio-hero-image">
          <Image src="/milanote-assets/WhatsApp Image 2026-08-07 at 9.48.40 PM.jpeg" alt="Portfolio Albury Design" fill priority sizes="100vw" quality={92} className="object-cover" />
        </div>
        <div className="route-hero-shade" />
        <div className="route-hero-content portfolio-reveal">
          <h1>Proyectos que funcionan como listings deseables.</h1>
          <p>Cada propiedad se presenta como una experiencia completa: galería, decisiones de diseño y lectura de ROI para entender por qué el espacio vende.</p>
          <a href="#proyectos" className="editorial-button">Explorar proyectos</a>
        </div>
      </section>

      <section className="bg-[#fffaf2] px-5 py-24 sm:px-8 lg:px-14 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.76fr_1.24fr]">
          <div className="portfolio-reveal">
            <p className="mb-4 text-xs font-black uppercase tracking-[.22em] text-[#e36559]">Portfolio seleccionado</p>
            <h2 className="text-5xl font-black leading-[.92] tracking-[-.055em] text-[#0d2931] sm:text-7xl">Interiores que convierten una estadía en una experiencia deseable.</h2>
          </div>
          <div className="grid auto-rows-[220px] grid-cols-2 gap-4 lg:auto-rows-[260px] lg:grid-cols-3">
            {allShots.slice(0, 6).map((shot, index) => (
              <article key={`${shot.src}-${index}`} className={`portfolio-reveal group relative overflow-hidden rounded-[30px] bg-[#0d2931] ${index === 0 || index === 3 ? "col-span-2 row-span-2" : ""}`}>
                <Image src={shot.src} alt={shot.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d2931]/82 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#dff2f5]">{shot.project}</p>
                  <h3 className="mt-1 text-2xl font-black uppercase tracking-[-.04em]">{shot.label}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="proyectos" className="bg-[#e5e9eb] px-5 py-24 sm:px-8 lg:px-14 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="portfolio-reveal mb-12 grid gap-8 lg:grid-cols-[.78fr_1.22fr] lg:items-end">
            <h2 className="text-5xl font-black leading-[.92] tracking-[-.055em] text-[#0d2931] sm:text-7xl">Entrá a cada proyecto como si fuera un listing.</h2>
            <p className="max-w-3xl text-lg font-semibold leading-8 text-[#52656b]">Las fichas incluyen galería, contexto de diseño y métricas de ROI orientativas. El objetivo: que la prueba visual venda antes de la llamada.</p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {alburyProjects.map((project) => (
              <div key={project.slug} className="project-card">
                <PropertyPerformanceCard project={project} href={`/portfolio/${project.slug}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="impacto" className="immersive-gallery-wrap bg-[#0d2931] py-24 text-white lg:h-screen lg:py-0">
        <div className="flex h-full items-center">
          <div className="immersive-track flex gap-5 px-5 sm:px-8 lg:px-14">
            <div className="portfolio-reveal flex w-[78vw] shrink-0 flex-col justify-center lg:w-[40vw]">
              <p className="mb-5 text-xs font-black uppercase tracking-[.22em] text-[#e36559]">Recorrido inmersivo</p>
              <h2 className="text-5xl font-black uppercase leading-[.88] tracking-[-.06em] sm:text-7xl">La galería no muestra fotos. Construye decisión.</h2>
              <p className="mt-6 max-w-xl text-lg font-semibold leading-8 text-white/70">Scroll horizontal con escenas amplias, etiquetas comerciales y profundidad visual para que cada proyecto se sienta como una visita.</p>
            </div>
            {allShots.slice(0, 8).map((shot, index) => (
              <div key={`${shot.src}-rail-${index}`} className="contents">
                <article className={`gallery-shot relative h-[68vh] w-[78vw] shrink-0 overflow-hidden bg-white/8 shadow-2xl shadow-black/30 lg:w-[48vw] ${shot.wide ? "lg:w-[54vw]" : ""}`}>
                  <Image src={shot.src} alt={shot.alt} fill sizes="(max-width: 900px) 78vw, 54vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-transparent to-transparent" />
                  <div className="absolute bottom-7 left-7 right-7">
                    <p className="text-[10px] font-black uppercase tracking-[.24em] text-[#e5dece]">{shot.project}</p>
                    <h3 className="mt-2 text-[clamp(1.8rem,3vw,3.3rem)] font-bold uppercase tracking-[-.045em]">{shot.label}</h3>
                  </div>
                </article>
                {index < impactMetrics.length ? (
                  <article className="portfolio-impact-card flex h-[68vh] w-[78vw] shrink-0 flex-col justify-between border border-[#e5dece]/22 bg-[#17150f] p-7 sm:p-10 lg:w-[32vw]">
                    <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#bca866]">Impacto estimado 0{index + 1}</p>
                    <div>
                      <strong>{impactMetrics[index].value}</strong>
                      <h3>{impactMetrics[index].label}</h3>
                      <p>{impactMetrics[index].copy}</p>
                    </div>
                  </article>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}