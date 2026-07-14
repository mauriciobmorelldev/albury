"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { alburyRenders } from "@/data/propertyScenes";
import { getGsap } from "@/lib/gsap";

const heroSlides = [alburyRenders[1], alburyRenders[10], alburyRenders[14]];
const carouselSlides = [
  alburyRenders[1],
  alburyRenders[0],
  alburyRenders[10],
  alburyRenders[8],
  alburyRenders[14],
];

const carouselPositions = [
  {
    transform: "translate(-50%, -50%) translate3d(-138px,-54px,-110px) rotateY(24deg) rotateZ(-4deg) scale(.76)",
    zIndex: 1,
    opacity: 0.58,
  },
  {
    transform: "translate(-50%, -50%) translate3d(-72px,74px,-42px) rotateY(13deg) rotateZ(3deg) scale(.88)",
    zIndex: 3,
    opacity: 0.84,
  },
  {
    transform: "translate(-50%, -50%) translate3d(0px,-8px,112px) rotateY(0deg) rotateZ(0deg) scale(1)",
    zIndex: 5,
    opacity: 1,
  },
  {
    transform: "translate(-50%, -50%) translate3d(72px,74px,-42px) rotateY(-13deg) rotateZ(-3deg) scale(.88)",
    zIndex: 3,
    opacity: 0.84,
  },
  {
    transform: "translate(-50%, -50%) translate3d(138px,-54px,-110px) rotateY(-24deg) rotateZ(4deg) scale(.76)",
    zIndex: 1,
    opacity: 0.58,
  },
];

function getCarouselPosition(index: number, activeIndex: number) {
  const length = carouselSlides.length;
  const relative = (index - activeIndex + length) % length;
  return carouselPositions[relative];
}

export default function HeroImmersive() {
  const rootRef = useRef<HTMLElement>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % carouselSlides.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const { gsap } = getGsap();
    const introAlreadyPlayed = false;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const backgrounds = gsap.utils.toArray<HTMLElement>(".hero-bg-frame");
      const cards = gsap.utils.toArray<HTMLElement>(".hero-render-card");

      gsap.set(backgrounds, { autoAlpha: 0, scale: 1.05 });
      gsap.set(backgrounds[0], { autoAlpha: 1, scale: 1.02 });
      gsap.set(cards, { autoAlpha: introAlreadyPlayed ? 1 : 0 });
      gsap.set(".hero-content", { autoAlpha: introAlreadyPlayed ? 1 : 0, y: introAlreadyPlayed ? 0 : 22 });
      gsap.set(".hero-active-scan", { xPercent: -120 });

      if (!introAlreadyPlayed) {
        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            onComplete: () => {
              document.body.style.overflow = previousOverflow;
              setShowIntro(false);
            },
          })
          .fromTo(".intro-logo", { autoAlpha: 0, scale: 0.86, y: 18 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.45 }, 0)
          .fromTo(".intro-kicker", { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.34 }, 0.12)
          .fromTo(".intro-progress", { scaleX: 0 }, { scaleX: 1, duration: 1.55, ease: "power2.inOut" }, 0.18)
          .to(".intro-logo", { scale: 1.04, y: -8, duration: 0.34, ease: "power2.inOut" }, 1.62)
          .to(".intro-screen", { yPercent: -100, duration: 0.72, ease: "power4.inOut" }, 2.18)
          .to(".hero-content", { autoAlpha: 1, y: 0, duration: 0.66 }, 2.42)
          .to(cards, { autoAlpha: 1, stagger: 0.06, duration: 0.64 }, 2.48);
      }

      const bgTimeline = gsap.timeline({ repeat: -1, delay: 1.8 });
      backgrounds.forEach((frame, index) => {
        const next = backgrounds[(index + 1) % backgrounds.length];
        bgTimeline
          .to(next, { autoAlpha: 1, scale: 1.025, duration: 0.9, ease: "power2.inOut" }, index * 3)
          .to(frame, { autoAlpha: 0, duration: 0.9, ease: "power2.inOut" }, index * 3)
          .to(next, { scale: 1.055, duration: 3, ease: "none" }, index * 3);
      });

      gsap.to(".hero-active-scan", {
        xPercent: 120,
        duration: 2.4,
        repeat: -1,
        ease: "power2.inOut",
        repeatDelay: 1.4,
      });

      gsap.to(".hero-depth-stage", {
        yPercent: -4,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    const handlePointerMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
      const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;
      const { gsap } = getGsap();

      gsap.to(".hero-depth-stage", {
        rotateY: normalizedX * 4,
        rotateX: normalizedY * -2.8,
        duration: 0.65,
        ease: "power3.out",
      });
    };

    root.addEventListener("pointermove", handlePointerMove);

    return () => {
      root.removeEventListener("pointermove", handlePointerMove);
      document.body.style.overflow = previousOverflow;
      ctx.revert();
    };
  }, []);

  return (
    <section id="inicio" ref={rootRef} className="relative min-h-[112svh] overflow-hidden bg-charcoal text-warm-white">
      {showIntro ? (
        <div className="intro-screen fixed inset-0 z-[100] grid place-items-center bg-charcoal px-6 text-center text-warm-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(223,243,244,.14),transparent_36%)]" />
          <div className="relative z-10 w-full max-w-xl">
            <Image src="/albury-logo-cropped.png" alt="Albury Design" width={1544} height={528} className="intro-logo mx-auto h-14 w-auto brightness-0 invert sm:h-20" priority />
            <p className="intro-kicker mt-8 text-xs font-black uppercase tracking-[.28em] text-soft-gold">Diseño estratégico para Airbnb</p>
            <div className="mt-8 h-1 overflow-hidden rounded-full bg-warm-white/16">
              <div className="intro-progress h-full origin-left bg-gold" />
            </div>
          </div>
        </div>
      ) : null}

      <div className="absolute inset-0">
        {heroSlides.map((render) => (
          <div key={render.image} className="hero-bg-frame absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${render.image}')` }} aria-hidden="true" />
        ))}
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,41,49,.96),rgba(13,41,49,.7)_44%,rgba(13,41,49,.22)),linear-gradient(0deg,rgba(13,41,49,.88),rgba(13,41,49,.12)_48%,rgba(13,41,49,.5))]" />

      <div className="relative z-10 mx-auto grid min-h-[112svh] max-w-7xl gap-8 px-5 pb-20 pt-28 sm:px-8 xl:grid-cols-[minmax(0,680px)_minmax(420px,1fr)] lg:items-center lg:px-10 lg:pt-24">
        <div className="hero-content self-center lg:max-w-[620px] lg:-translate-y-3">
          <p className="mb-8 inline-flex rounded-full bg-warm-white/15 px-4 py-3 text-[10px] font-black uppercase tracking-[.14em] text-warm-white backdrop-blur-md sm:text-xs">Diseño STR · Airbnb · Vacation Rental</p>

          <h1 className="max-w-5xl text-[clamp(3.35rem,6.2vw,6.65rem)] font-black uppercase leading-[.88] tracking-[-.045em] text-warm-white">
            <span className="hero-word block">Diseñamos</span>
            <span className="hero-word block text-soft-gold">propiedades</span>
            <span className="hero-word block">rentables.</span>
          </h1>

          <div className="hero-support mt-8 max-w-xl">
            <p className="text-lg font-semibold leading-8 text-warm-white/84 sm:text-xl">Transformamos propiedades de alquiler vacacional en experiencias memorables, fotogénicas y pensadas para convertir más visitas en reservas.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contacto" className="group inline-flex items-center gap-4 rounded-full border border-gold/70 bg-gold/95 px-5 py-3.5 text-sm font-black text-warm-white shadow-[0_18px_60px_rgba(227,74,46,.26)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-[#b93322] sm:px-6 sm:py-4">Consulta Gratis <span className="grid h-8 w-8 place-items-center rounded-full bg-warm-white/18 transition group-hover:translate-x-1">→</span></a>
              <a href="#recorrido" className="inline-flex items-center rounded-full border border-warm-white/24 bg-warm-white/8 px-5 py-3.5 text-sm font-black text-warm-white shadow-[inset_0_1px_0_rgba(255,255,255,.16)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-warm-white/14 sm:px-6 sm:py-4">Ver recorrido</a>
            </div>
          </div>
        </div>

        <div className="relative z-0 min-h-[48svh] overflow-visible lg:min-h-[68vh] xl:translate-x-12 2xl:translate-x-20" style={{ perspective: "1300px" }}>
          <div className="absolute left-1/2 top-1/2 h-[450px] w-[500px] -translate-x-1/2 -translate-y-1/2 sm:h-[540px] sm:w-[600px] lg:h-[590px] lg:w-[640px]">
            <div className="hero-depth-stage relative z-20 h-full w-full [transform-style:preserve-3d]">
              {carouselSlides.map((render, index) => {
                const position = getCarouselPosition(index, activeIndex);
                const isActive = index === activeIndex;

                return (
                  <article
                    key={render.image}
                    className="hero-render-card group absolute left-1/2 top-1/2 h-[252px] w-[184px] overflow-hidden rounded-[24px] bg-stone shadow-2xl shadow-black/35 transition-[transform,opacity] duration-[1050ms] ease-[cubic-bezier(.22,1,.36,1)] [transform-style:preserve-3d] sm:h-[326px] sm:w-[238px] lg:h-[386px] lg:w-[276px]"
                    style={{ transform: position.transform, zIndex: position.zIndex, opacity: position.opacity }}
                  >
                    <div className="absolute inset-0 bg-cover bg-center transition duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" style={{ backgroundImage: `url('${render.image}')` }} />
                    <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(13,41,49,.82),rgba(13,41,49,0)_58%)]" />
                    {isActive ? (
                      <>
                        <div className="pointer-events-none absolute inset-4 rounded-[18px] border border-soft-gold/35" />
                        <div className="hero-active-scan pointer-events-none absolute -inset-y-10 left-1/2 w-20 rotate-12 bg-gradient-to-r from-transparent via-soft-gold/28 to-transparent blur-sm" />
                        <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-soft-gold/40 bg-charcoal/35 px-3 py-2 text-[10px] font-black uppercase tracking-[.16em] text-soft-gold backdrop-blur-md">Render activo</div>
                      </>
                    ) : null}
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                      <p className="text-[10px] font-black uppercase tracking-[.18em] text-soft-gold sm:text-xs">{render.label}</p>
                      <h2 className="mt-3 text-2xl font-black uppercase leading-none tracking-[-.03em] text-warm-white sm:text-3xl lg:text-4xl">{render.title}</h2>
                    </div>
                  </article>
                );
              })}
            </div>
          </div></div>
      </div>
      <div className="wave-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}





