"use client";

import Image from "next/image";
import EditorialCarousel3D from "@/components/EditorialCarousel3D";
import PropertyPerformanceCard from "@/components/PropertyPerformanceCard";
import { alburyProjects } from "@/data/alburyProjects";

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
  return (
    <main className="portfolio-luxury overflow-hidden bg-[#0f0d0c] text-[#f3ede4]">
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
            <h2 className="text-[clamp(2.35rem,4.2vw,4.6rem)] font-black leading-[.94] tracking-[-.05em] text-[#0d2931]">Interiores que convierten una estadía en una experiencia deseable.</h2>
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
            <h2 className="text-[clamp(2.35rem,4.2vw,4.6rem)] font-black leading-[.94] tracking-[-.05em] text-[#0d2931]">Entrá a cada proyecto como si fuera un listing.</h2>
            <p className="max-w-3xl text-lg font-semibold leading-8 text-[#52656b]">Las fichas incluyen galería, contexto de diseño y métricas de ROI orientativas. El objetivo: que la prueba visual venda antes de la llamada.</p>
          </div>
          <div className="grid gap-7 lg:grid-cols-2 xl:grid-cols-3">
            {alburyProjects.map((project) => (
              <div key={project.slug} className="project-card">
                <PropertyPerformanceCard project={project} href={`/portfolio/${project.slug}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="impacto" className="portfolio-carousel-section">
        <div className="portfolio-carousel-shell">
          <div className="portfolio-carousel-intro portfolio-reveal">
            <p>Recorrido inmersivo</p>
            <h2>La galería no muestra fotos. Construye decisión.</h2>
            <span>Explorá cada escena con las flechas, el teclado o deslizando.</span>
          </div>
          <EditorialCarousel3D shots={allShots.slice(0, 8)} metrics={impactMetrics} />
        </div>
      </section>
    </main>
  );
}