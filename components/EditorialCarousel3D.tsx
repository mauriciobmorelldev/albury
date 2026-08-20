"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

type CarouselShot = {
  src: string;
  alt: string;
  label: string;
  project: string;
};

type CarouselMetric = {
  value: string;
  label: string;
  copy: string;
};

type EditorialCarousel3DProps = {
  shots: CarouselShot[];
  metrics: CarouselMetric[];
};

function CarouselArrow({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={direction === "previous" ? "M15 5 8 12l7 7" : "m9 5 7 7-7 7"} />
    </svg>
  );
}

export default function EditorialCarousel3D({ shots, metrics }: EditorialCarousel3DProps) {
  const [active, setActive] = useState(0);
  const touchStartRef = useRef<number | null>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const activeShot = shots[active];
  const activeMetric = metrics[active];

  const move = (direction: number) => {
    setActive((current) => (current + direction + shots.length) % shots.length);
  };

  useLayoutEffect(() => {
    const target = titleRef.current;
    const title = activeShot?.label ?? "";
    if (!target || !title) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      target.textContent = title;
      return;
    }

    let index = 0;
    target.textContent = "";
    const timer = window.setInterval(() => {
      index += 1;
      target.textContent = title.slice(0, index);
      if (index >= title.length) window.clearInterval(timer);
    }, 38);

    return () => window.clearInterval(timer);
  }, [activeShot?.label]);

  if (!activeShot) return null;

  return (
    <div
      className="editorial-spread-carousel"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Portfolio en formato editorial"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") move(-1);
        if (event.key === "ArrowRight") move(1);
      }}
      onTouchStart={(event) => {
        touchStartRef.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStartRef.current === null) return;
        const delta = (event.changedTouches[0]?.clientX ?? touchStartRef.current) - touchStartRef.current;
        if (Math.abs(delta) > 45) move(delta > 0 ? -1 : 1);
        touchStartRef.current = null;
      }}
    >
      <figure className="editorial-spread-media">
        <Image
          key={activeShot.src}
          src={activeShot.src}
          alt={activeShot.alt}
          fill
          quality={94}
          sizes="(max-width: 899px) 100vw, 70vw"
          className="editorial-spread-image"
        />
        <figcaption>
          <span>Albury Design</span>
          <strong>{activeShot.label}</strong>
        </figcaption>
        <div className="editorial-spread-page" aria-hidden="true">
          {String(active + 1).padStart(2, "0")}
        </div>
      </figure>

      <aside className="editorial-spread-copy" aria-live="polite">
        <div className="editorial-spread-folio">
          <span>Portfolio / Casos</span>
          <span>{String(active + 1).padStart(2, "0")} — {String(shots.length).padStart(2, "0")}</span>
        </div>

        <div className="editorial-spread-story">
          <p>{activeShot.project}</p>
          <h3>
            <span ref={titleRef}>{activeShot.label}</span>
            <i aria-hidden="true" />
          </h3>
          <p>{activeMetric?.copy ?? "Una escena diseñada para comunicar intención, valor percibido y una experiencia difícil de comparar."}</p>

          {activeMetric ? (
            <dl>
              <div>
                <dt>{activeMetric.label}</dt>
                <dd>{activeMetric.value}</dd>
              </div>
            </dl>
          ) : null}
        </div>

        <div className="editorial-spread-navigation">
          <div className="editorial-spread-dots" aria-label="Seleccionar imagen">
            {shots.map((shot, index) => (
              <button
                key={shot.src}
                type="button"
                aria-label={`Ver ${shot.label}`}
                aria-current={index === active ? "true" : undefined}
                onClick={() => setActive(index)}
              >
                <span />
              </button>
            ))}
          </div>

          <div className="editorial-spread-controls">
            <button type="button" onClick={() => move(-1)} aria-label="Imagen anterior">
              <CarouselArrow direction="previous" />
            </button>
            <button type="button" onClick={() => move(1)} aria-label="Imagen siguiente">
              <CarouselArrow direction="next" />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
