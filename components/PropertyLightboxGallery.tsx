"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
};

export default function PropertyLightboxGallery({ projectTitle, shots }: PropertyLightboxGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeShot = activeIndex === null ? null : shots[activeIndex];

  useLayoutEffect(() => {
    const { gsap } = getGsap();
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gallery-thumb",
        { autoAlpha: 0, y: 44, scale: 0.96, filter: "blur(12px)" },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.78,
          stagger: 0.055,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 82%", once: true },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const { gsap } = getGsap();
    if (activeIndex === null || !modalRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(modalRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.28, ease: "power2.out" });
      gsap.fromTo(
        imageRef.current,
        { autoAlpha: 0, y: 34, scale: 0.92, rotateX: 7, filter: "blur(18px)" },
        { autoAlpha: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)", duration: 0.58, ease: "power3.out" },
      );
      gsap.fromTo(".lightbox-ui", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.36, stagger: 0.04, delay: 0.18, ease: "power2.out" });
    }, modalRef);

    return () => ctx.revert();
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex]);

  const openLightbox = (index: number) => setActiveIndex(index);

  const closeLightbox = () => {
    const { gsap } = getGsap();
    if (!modalRef.current || !imageRef.current) {
      setActiveIndex(null);
      return;
    }

    gsap.to(imageRef.current, { autoAlpha: 0, y: 20, scale: 0.96, filter: "blur(10px)", duration: 0.22, ease: "power2.in" });
    gsap.to(modalRef.current, { autoAlpha: 0, duration: 0.24, delay: 0.06, ease: "power2.in", onComplete: () => setActiveIndex(null) });
  };

  const showPrevious = () => {
    setActiveIndex((current) => (current === null ? current : (current - 1 + shots.length) % shots.length));
  };

  const showNext = () => {
    setActiveIndex((current) => (current === null ? current : (current + 1) % shots.length));
  };

  return (
    <div ref={rootRef}>
      <div className="grid auto-rows-[280px] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {shots.map((shot, index) => (
          <button
            key={`${shot.src}-${index}`}
            type="button"
            className={`gallery-thumb group relative overflow-hidden rounded-[34px] bg-white/8 text-left outline-none ring-[#e36559]/80 transition hover:-translate-y-1 focus-visible:ring-4 ${shot.wide ? "md:col-span-2 lg:col-span-2 lg:row-span-2" : ""}`}
            onClick={() => openLightbox(index)}
            aria-label={`Abrir imagen ${shot.label}`}
          >
            <Image src={shot.src} alt={shot.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d2931]/86 via-transparent to-transparent" />
            <div className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-[#fffaf4]/18 text-xl font-black text-white opacity-0 backdrop-blur-xl transition group-hover:opacity-100">↗</div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#dff2f5]">{projectTitle}</p>
              <h3 className="mt-2 text-3xl font-black uppercase tracking-[-.045em]">{shot.label}</h3>
            </div>
          </button>
        ))}
      </div>

      {activeShot ? (
        <div ref={modalRef} className="fixed inset-0 z-[120] grid place-items-center bg-[#0d2931]/92 p-4 opacity-0 backdrop-blur-xl" role="dialog" aria-modal="true" aria-label={`Imagen ampliada de ${projectTitle}`}>
          <button type="button" className="absolute inset-0 cursor-zoom-out" onClick={closeLightbox} aria-label="Cerrar galería" />
          <div ref={imageRef} className="relative z-10 w-full max-w-6xl [transform-style:preserve-3d]">
            <div className="relative overflow-hidden rounded-[34px] border border-white/12 bg-white/8 shadow-2xl shadow-black/40">
              <div className="relative aspect-[16/10] max-h-[78vh] w-full">
                <Image src={activeShot.src} alt={activeShot.alt} fill sizes="90vw" className="object-contain" priority />
              </div>
              <div className="lightbox-ui absolute bottom-0 left-0 right-0 flex flex-wrap items-end justify-between gap-4 bg-gradient-to-t from-[#0d2931]/94 to-transparent p-6 text-white">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#dff2f5]">{projectTitle}</p>
                  <h3 className="mt-2 text-4xl font-black uppercase tracking-[-.05em]">{activeShot.label}</h3>
                </div>
                <p className="text-sm font-black text-white/70">{(activeIndex ?? 0) + 1} / {shots.length}</p>
              </div>
            </div>

            <button type="button" onClick={closeLightbox} className="lightbox-ui absolute -right-3 -top-3 z-20 grid h-12 w-12 place-items-center rounded-full bg-[#e36559] text-2xl font-black text-white shadow-xl shadow-black/30" aria-label="Cerrar">×</button>
            <button type="button" onClick={showPrevious} className="lightbox-ui absolute left-3 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-[#fffaf4]/18 text-2xl font-black text-white backdrop-blur-xl transition hover:bg-[#e36559]" aria-label="Imagen anterior">←</button>
            <button type="button" onClick={showNext} className="lightbox-ui absolute right-3 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-[#fffaf4]/18 text-2xl font-black text-white backdrop-blur-xl transition hover:bg-[#e36559]" aria-label="Imagen siguiente">→</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}