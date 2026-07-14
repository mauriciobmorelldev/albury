"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

export default function BrandIntro() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
            end: "bottom top",
            scrub: 0.8,
          },
        })
        .fromTo(".intro-logo", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45 })
        .fromTo(".intro-title", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35 }, 0.12)
        .to(".intro-logo", { y: -70, opacity: 0.12, scale: 0.92, duration: 0.65 }, 0.45)
        .to(".intro-title", { y: -50, opacity: 0, duration: 0.55 }, 0.5);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative grid min-h-[70svh] place-items-center overflow-hidden bg-black px-6 py-24 text-center"
      aria-label="Entrada Albury Design"
    >
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-charcoal to-transparent" />
      <div>
        <Image
          src="/albury-logo-cropped.png"
          alt="Albury Design"
          width={1544}
          height={528}
          priority
          className="intro-logo mx-auto h-14 w-auto brightness-0 invert sm:h-20"
        />
        <h2 className="intro-title mt-8 mx-auto max-w-5xl font-serif text-5xl font-medium leading-none text-warm-white sm:text-8xl">
          Diseño que convierte propiedades en experiencias.
        </h2>
      </div>
    </section>
  );
}
