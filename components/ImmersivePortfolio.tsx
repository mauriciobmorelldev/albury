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
          <h1>Donde diseño y estrategia se encuentran con rendimiento.</h1>
          <p>Creamos espacios temáticos que ofrecen una experiencia inolvidable.</p>
          <a href="#proyectos" className="editorial-button">Explorar proyectos</a>
        </div>
      </section>

      <section id="proyectos" className="bg-[#e5e9eb] px-5 py-24 sm:px-8 lg:px-14 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <h2 className="sr-only">Nuestros proyectos</h2>
          <div className="portfolio-project-grid grid gap-8 md:grid-cols-2">
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
