"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { alburyProjects } from "@/data/alburyProjects";
import { getGsap } from "@/lib/gsap";

const allShots = alburyProjects.flatMap((project) =>
  project.gallery.map((shot) => ({ ...shot, project: project.title, slug: project.slug })),
);

export default function ImmersivePortfolio() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const { gsap } = getGsap();
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(".portfolio-reveal", { autoAlpha: 0, y: 42, filter: "blur(14px)" });
      gsap.utils.toArray<HTMLElement>(".portfolio-reveal").forEach((item) => {
        gsap.to(item, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
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
          scrollTrigger: {
            trigger: galleryWrap,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.7,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      }

      gsap.utils.toArray<HTMLElement>(".gallery-shot").forEach((shot, index) => {
        gsap.to(shot, {
          yPercent: index % 2 ? -8 : 8,
          ease: "none",
          scrollTrigger: { trigger: shot, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={rootRef} className="overflow-hidden bg-[#fbf7ef] text-[#0d2931]">
      <section className="relative min-h-screen overflow-hidden bg-[#0d2931] px-5 pb-16 pt-32 text-white sm:px-8 lg:px-14">
        <div className="portfolio-hero-image absolute inset-0">
          <Image src="/zip-assets/properties/sa-figuereta-pool-1.webp" alt="Portfolio Albury Design" fill priority sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,rgba(227,101,89,.42),transparent_25%),linear-gradient(90deg,rgba(13,41,49,.98),rgba(13,41,49,.72)_48%,rgba(13,41,49,.30))]" />
        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-end gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div className="portfolio-reveal pb-12">
            <p className="mb-5 inline-flex rounded-full bg-white/14 px-5 py-3 text-xs font-black uppercase tracking-[.2em] text-white/85 backdrop-blur-xl">Portfolio Albury Design</p>
            <h1 className="text-[clamp(4.4rem,9vw,10rem)] font-black uppercase leading-[.82] tracking-[-.07em]">Proyectos que funcionan como listings deseables.</h1>
            <p className="mt-7 max-w-2xl text-lg font-semibold leading-8 text-white/76">Cada propiedad se presenta como una experiencia completa: galería, momentos clave, decisiones de diseño y lectura de ROI para entender por qué el espacio vende.</p>
          </div>
          <aside className="portfolio-reveal mb-12 rounded-[34px] border border-white/16 bg-white/12 p-7 shadow-2xl shadow-black/30 backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#dff2f5]">Diseño pensado para conversión</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white/12 p-5"><span className="text-xs font-black uppercase tracking-[.16em] text-white/60">Proyectos</span><strong className="mt-2 block text-5xl font-black">02</strong></div>
              <div className="rounded-3xl bg-white/12 p-5"><span className="text-xs font-black uppercase tracking-[.16em] text-white/60">Foco</span><strong className="mt-2 block text-2xl font-black">ROI + experiencia</strong></div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-[#fffaf2] px-5 py-24 sm:px-8 lg:px-14 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.76fr_1.24fr]">
          <div className="portfolio-reveal">
            <p className="mb-4 text-xs font-black uppercase tracking-[.22em] text-[#e36559]">Galería de transición</p>
            <h2 className="text-5xl font-black leading-[.92] tracking-[-.055em] text-[#0d2931] sm:text-7xl">Detalles que hacen que un anuncio se sienta cuidado.</h2>
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
              <Link key={project.slug} href={`/portfolio/${project.slug}`} className="project-card group block [perspective:1200px]">
                <article className={`overflow-hidden rounded-[42px] bg-gradient-to-br ${project.palette} p-4 shadow-[0_34px_90px_rgba(13,41,49,.16)] transition duration-500 group-hover:-translate-y-2`}>
                  <div className="relative min-h-[420px] overflow-hidden rounded-[32px] bg-[#0d2931]">
                    <Image src={project.heroImage} alt={project.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d2931]/94 via-[#0d2931]/18 to-transparent" />
                    <div className="absolute bottom-7 left-7 right-7 text-white">
                      <p className="text-xs font-black uppercase tracking-[.2em] text-[#dff2f5]">{project.eyebrow}</p>
                      <h3 className="mt-3 text-5xl font-black uppercase leading-[.86] tracking-[-.06em]">{project.title}</h3>
                    </div>
                  </div>
                  <div className="grid gap-4 p-5 sm:grid-cols-2">
                    {project.metrics.map((metric) => (
                      <div key={metric.label} className="rounded-[24px] bg-white/72 p-5 backdrop-blur-xl">
                        <span className="text-xs font-black uppercase tracking-[.16em] text-[#52656b]">{metric.label}</span>
                        <strong className="mt-2 block text-4xl font-black tracking-[-.06em] text-[#0d2931]">{metric.prefix}<span className="project-metric-number" data-value={metric.value}>0</span>{metric.suffix}</strong>
                      </div>
                    ))}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="immersive-gallery-wrap bg-[#0d2931] py-24 text-white lg:h-screen lg:py-0">
        <div className="flex h-full items-center">
          <div className="immersive-track flex gap-5 px-5 sm:px-8 lg:px-14">
            <div className="portfolio-reveal flex w-[78vw] shrink-0 flex-col justify-center lg:w-[40vw]">
              <p className="mb-5 text-xs font-black uppercase tracking-[.22em] text-[#e36559]">Recorrido inmersivo</p>
              <h2 className="text-5xl font-black uppercase leading-[.88] tracking-[-.06em] sm:text-7xl">La galería no muestra fotos. Construye decisión.</h2>
              <p className="mt-6 max-w-xl text-lg font-semibold leading-8 text-white/70">Scroll horizontal con escenas amplias, etiquetas comerciales y profundidad visual para que cada proyecto se sienta como una visita.</p>
            </div>
            {allShots.map((shot, index) => (
              <article key={`${shot.src}-immersive-${index}`} className={`gallery-shot relative h-[72vh] w-[76vw] shrink-0 overflow-hidden rounded-[38px] bg-white/8 shadow-2xl shadow-black/30 lg:w-[42vw] ${shot.wide ? "lg:w-[56vw]" : ""}`}>
                <Image src={shot.src} alt={shot.alt} fill sizes="(max-width: 900px) 76vw, 56vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d2931]/86 via-transparent to-transparent" />
                <div className="absolute bottom-7 left-7 right-7">
                  <p className="text-[10px] font-black uppercase tracking-[.24em] text-[#dff2f5]">{shot.project}</p>
                  <h3 className="mt-2 text-4xl font-black uppercase tracking-[-.05em]">{shot.label}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}