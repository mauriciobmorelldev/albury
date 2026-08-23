"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { getGsap } from "@/lib/gsap";

type GalleryShot = {
  src: string;
  alt: string;
  label: string;
  wide?: boolean;
};

type PropertyLightboxGalleryProps = {
  projectTitle: string;
  shots: GalleryShot[];
  priority?: boolean;
};

export default function PropertyLightboxGallery({ projectTitle, shots, priority = false }: PropertyLightboxGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useLayoutEffect(() => {
    const { gsap } = getGsap();
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gallery-thumb",
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.64,
          stagger: 0.045,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 86%", once: true },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const { gsap } = getGsap();
    if (activeIndex === null || !modalRef.current || !scrollRef.current) return;

    const targetIndex = activeIndex;
    const ctx = gsap.context(() => {
      gsap.fromTo(modalRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.24, ease: "power2.out" });
      gsap.fromTo(".property-scroll-header", { autoAlpha: 0, y: -10 }, { autoAlpha: 1, y: 0, duration: 0.36, ease: "power3.out" });
    }, modalRef);

    const frame = window.requestAnimationFrame(() => {
      const target = scrollRef.current?.querySelector<HTMLElement>(`[data-shot-index="${targetIndex}"]`);
      target?.scrollIntoView({ block: "start", behavior: "auto" });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      ctx.revert();
    };
  }, [activeIndex]);

  const openLightbox = (index: number) => setActiveIndex(index);

  const closeLightbox = useCallback(() => {
    const { gsap } = getGsap();
    if (!modalRef.current) {
      setActiveIndex(null);
      return;
    }

    gsap.to(modalRef.current, {
      autoAlpha: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => setActiveIndex(null),
    });
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, closeLightbox]);

  return (
    <div ref={rootRef}>
      <div className="property-airbnb-grid">
        {shots.slice(0, 5).map((shot, index) => (
          <button
            key={`${shot.src}-${index}`}
            type="button"
            className={`gallery-thumb property-airbnb-shot property-airbnb-shot-${index + 1}`}
            onClick={() => openLightbox(index)}
            aria-label={`Abrir recorrido fotográfico desde ${shot.label}`}
          >
            <Image src={shot.src} alt={shot.alt} fill priority={priority && index === 0} quality={95} sizes={index === 0 ? "(max-width: 900px) 100vw, 52vw" : "(max-width: 900px) 50vw, 25vw"} className="object-cover" />
            {index === Math.min(shots.length, 5) - 1 ? <span className="property-airbnb-all">Ver las {shots.length} fotos</span> : null}
          </button>
        ))}
      </div>

      {activeIndex !== null ? (
        <div ref={modalRef} className="property-lightbox property-scroll-lightbox" role="dialog" aria-modal="true" aria-label={`Recorrido fotográfico de ${projectTitle}`}>
          <div ref={scrollRef} className="property-lightbox-scroll">
            <header className="property-scroll-header">
              <div>
                <p>Albury Design · Photo tour</p>
                <h2>{projectTitle}</h2>
              </div>
              <div className="property-scroll-header-actions">
                <span>{shots.length} fotografías</span>
                <button type="button" onClick={closeLightbox} aria-label="Cerrar recorrido fotográfico">×</button>
              </div>
            </header>

            <div className="property-scroll-gallery">
              {shots.map((shot, index) => (
                <figure key={`${shot.src}-scroll`} className="property-scroll-shot" data-shot-index={index}>
                  <div className="property-scroll-media">
                    <Image src={shot.src} alt={shot.alt} fill quality={95} sizes="(max-width: 900px) 100vw, 1200px" className="object-contain" priority={index === activeIndex} />
                  </div>
                  <figcaption>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{shot.label}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
