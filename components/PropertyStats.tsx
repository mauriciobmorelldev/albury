"use client";

import { useLayoutEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

const benefits = [
  { value: 1250, prefix: "", suffix: "", label: "horas ahorradas" },
  { value: 23690, prefix: "$", suffix: "", label: "en ahorro de mobiliario" },
  { value: 53, prefix: "+", suffix: "%", label: "después del servicio" },
];

function formatNumber(value: number, prefix: string, suffix: string) {
  return `${prefix}${Math.round(value).toLocaleString("en-US")}${suffix}`;
}

export default function PropertyStats() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const { gsap } = getGsap();
    const counters = gsap.utils.toArray<HTMLElement>(".benefit-number");

    const ctx = gsap.context(() => {
      gsap.from(".benefit-item", {
        autoAlpha: 0,
        y: 34,
        filter: "blur(10px)",
        stagger: 0.12,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 42%", once: true },
      });

      counters.forEach((counter) => {
        const end = Number(counter.dataset.value ?? 0);
        const prefix = counter.dataset.prefix ?? "";
        const suffix = counter.dataset.suffix ?? "";
        const state = { value: 0 };

        gsap.to(state, {
          value: end,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 42%", once: true },
          onUpdate: () => {
            counter.textContent = formatNumber(state.value, prefix, suffix);
          },
          onComplete: () => {
            counter.textContent = formatNumber(end, prefix, suffix);
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="bg-warm-white px-5 pb-20 pt-12 text-charcoal sm:px-8 lg:px-14 lg:pb-24 lg:pt-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-5xl font-black leading-none tracking-[-.035em] text-charcoal sm:text-7xl lg:text-8xl">Nuestros beneficios</h2>
        <div className="mt-12 grid gap-10 text-center md:grid-cols-3">
          {benefits.map((benefit) => (
            <div key={benefit.label} className="benefit-item rounded-[32px] bg-warm-white p-8 shadow-[0_28px_90px_rgba(13,41,49,.08)]">
              <p
                className="benefit-number text-6xl font-black leading-none tracking-[-.04em] text-[#3f8b4d] sm:text-7xl lg:text-8xl"
                data-value={benefit.value}
                data-prefix={benefit.prefix}
                data-suffix={benefit.suffix}
              >
                {formatNumber(0, benefit.prefix, benefit.suffix)}
              </p>
              <p className="mx-auto mt-6 max-w-xs text-3xl font-black leading-[1.05] tracking-[-.03em] text-black">{benefit.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}




