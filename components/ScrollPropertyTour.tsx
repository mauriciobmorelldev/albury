"use client";

import { useLayoutEffect, useRef } from "react";
import { propertyScenes } from "@/data/propertyScenes";
import { getGsap } from "@/lib/gsap";

export default function ScrollPropertyTour() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const { gsap } = getGsap();
    let revertMatchMedia: (() => void) | undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      revertMatchMedia = () => mm.revert();

      mm.add("(min-width: 768px)", () => {
        const images = gsap.utils.toArray<HTMLElement>(".tour-scene-image");
        const frames = gsap.utils.toArray<HTMLElement>(".tour-frame");
        const progressItems = gsap.utils.toArray<HTMLElement>(".tour-progress-item");
        const progressBar = root.querySelector<HTMLElement>(".tour-progress-bar");

        gsap.set(images, { autoAlpha: 0, scale: 1.1, xPercent: 0, yPercent: 0 });
        gsap.set(images[0], { autoAlpha: 1 });
        gsap.set(frames, { autoAlpha: 0, y: 30, filter: "blur(12px)" });
        gsap.set(frames[0], { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        gsap.set(progressItems[0], { color: "#effcff" });

        const timeline = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: `+=${propertyScenes.length * 95}%`,
            scrub: 0.85,
            pin: true,
            anticipatePin: 1,
          },
        });

        propertyScenes.forEach((scene, index) => {
          const image = images[index];
          const frame = frames[index];
          const position = index;

          timeline.to(
            image,
            {
              scale: scene.camera.scale,
              xPercent: scene.camera.x,
              yPercent: scene.camera.y,
              duration: 1,
              ease: "none",
            },
            position,
          );

          timeline.to(
            frame,
            {
              y: -18,
              duration: 1,
              ease: "none",
            },
            position,
          );

          if (index < propertyScenes.length - 1) {
            timeline.to(images[index + 1], { autoAlpha: 1, duration: 0.34 }, position + 0.68);
            timeline.to(image, { autoAlpha: 0, duration: 0.34 }, position + 0.68);
            timeline.to(frame, { autoAlpha: 0, y: -34, filter: "blur(12px)", duration: 0.34 }, position + 0.56);
            timeline.to(frames[index + 1], { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.42 }, position + 0.72);
            timeline.to(progressItems, { color: "rgba(239,252,255,.35)", duration: 0.2 }, position + 0.72);
            timeline.to(progressItems[index + 1], { color: "#effcff", duration: 0.2 }, position + 0.72);
          }
        });

        if (progressBar) {
          timeline.fromTo(
            progressBar,
            { scaleX: 0 },
            { scaleX: 1, duration: propertyScenes.length - 1, ease: "none" },
            0,
          );
        }

        gsap.to(".tour-vignette", {
          opacity: 0.78,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.utils.toArray<HTMLElement>(".mobile-tour-card").forEach((card) => {
          gsap.fromTo(
            card,
            { autoAlpha: 0, y: 34, filter: "blur(10px)" },
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 82%",
                once: true,
              },
            },
          );
        });
      });

    }, root);

    return () => {
      revertMatchMedia?.();
      ctx.revert();
    };
  }, []);

  return (
    <section id="recorrido" ref={rootRef} className="relative bg-charcoal text-warm-white">
      <div className="hidden h-svh overflow-hidden md:block">
        <div className="absolute inset-0">
          {propertyScenes.map((scene) => (
            <div
              key={scene.title}
              className="tour-scene-image absolute inset-0 bg-cover bg-center will-change-transform"
              style={{ backgroundImage: `url('${scene.image}')` }}
            />
          ))}
        </div>
        <div className="tour-vignette absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_70%_38%,rgba(200,242,247,.12),transparent_28%),linear-gradient(90deg,rgba(18,79,89,.9),rgba(18,79,89,.54)_46%,rgba(18,79,89,.2)),linear-gradient(0deg,rgba(18,79,89,.78),transparent_48%,rgba(18,79,89,.36))]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(200,242,247,.18)_1px,transparent_1px),linear-gradient(0deg,rgba(200,242,247,.12)_1px,transparent_1px)] bg-[size:20vw_20vh] opacity-[.08]" />

        <div className="relative z-10 flex h-full items-end px-8 pb-12 lg:px-14 lg:pb-16">
          <div className="w-full">
            <div className="mb-10 flex max-w-7xl items-end justify-between gap-10">
              <div className="relative min-h-[330px] flex-1">
                {propertyScenes.map((scene, index) => (
                  <article key={scene.title} className="tour-frame absolute bottom-0 left-0 max-w-5xl">
                    <p className="mb-5 text-xs font-black uppercase tracking-[.28em] text-soft-gold">
                      {scene.eyebrow}
                    </p>
                    <h2 className="max-w-[8ch] text-[clamp(5rem,10vw,11rem)] font-black uppercase tracking-[-.04em] leading-[.78] text-warm-white">
                      {scene.title}
                    </h2>
                    <div className="mt-8 flex max-w-3xl items-start gap-7">
                      <span className="text-4xl font-black leading-none text-soft-gold">
                        {String(index + 1).padStart(2, "0")} / {String(propertyScenes.length).padStart(2, "0")}
                      </span>
                      <p className="max-w-xl text-lg leading-8 text-warm-white/72">{scene.description}</p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="hidden w-64 shrink-0 space-y-4 pb-4 xl:block">
                {propertyScenes.map((scene, index) => (
                  <div
                    key={scene.title}
                    className="tour-progress-item flex items-center justify-between border-b border-warm-white/12 pb-3 text-xs font-black uppercase tracking-[.18em] text-warm-white/35"
                  >
                    <span>{scene.title}</span>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px w-full origin-left overflow-hidden bg-warm-white/18">
              <div className="tour-progress-bar h-full origin-left bg-soft-gold" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-24 md:hidden">
        <div className="mb-12">
          <p className="mb-4 text-xs font-black uppercase tracking-[.22em] text-soft-gold">Recorrido cinematográfico</p>
          <h2 className="text-5xl font-black tracking-[-.03em] leading-[.92]">
            Un tour inmersivo, escena por escena.
          </h2>
        </div>
        <div className="space-y-6">
          {propertyScenes.map((scene, index) => (
            <article key={scene.title} className="mobile-tour-card overflow-hidden bg-stone text-charcoal">
              <div
                className="min-h-[58svh] bg-cover bg-center"
                style={{ backgroundImage: `url('${scene.image}')` }}
              />
              <div className="p-6">
                <p className="text-xs font-black uppercase tracking-[.2em] text-gold">
                  {String(index + 1).padStart(2, "0")} / {String(propertyScenes.length).padStart(2, "0")} · {scene.eyebrow}
                </p>
                <h3 className="mt-5 text-5xl font-black tracking-[-.03em] leading-none">{scene.title}</h3>
                <p className="mt-5 text-sm leading-7 text-charcoal/68">{scene.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


