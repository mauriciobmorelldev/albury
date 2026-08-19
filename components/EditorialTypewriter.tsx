"use client";

import { useLayoutEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

type EditorialTypewriterProps = {
  text: string;
  className?: string;
  triggerOnScroll?: boolean;
};

export default function EditorialTypewriter({ text, className = "", triggerOnScroll = true }: EditorialTypewriterProps) {
  const rootRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const target = root?.querySelector<HTMLElement>("[data-editorial-typewriter]");
    const caret = root?.querySelector<HTMLElement>("i");
    if (!root || !target || !caret) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.textContent = reducedMotion ? text : "";
    caret.style.opacity = reducedMotion ? "0" : "1";
    if (reducedMotion) return;

    const { gsap, ScrollTrigger } = getGsap();
    const cursor = { length: 0 };
    const timeline = gsap.timeline({ paused: triggerOnScroll });
    timeline
      .fromTo(caret, { autoAlpha: 0, scaleY: 0.35 }, { autoAlpha: 1, scaleY: 1, duration: 0.25, ease: "power2.out" })
      .to(cursor, {
        length: text.length,
        duration: Math.min(2.3, Math.max(1, text.length * 0.024)),
        ease: "none",
        snap: { length: 1 },
        onUpdate: () => {
          target.textContent = text.slice(0, Math.round(cursor.length));
        },
      }, "+=0.1")
      .to(caret, { autoAlpha: 0.25, duration: 0.35, ease: "power2.out" }, "+=0.25");

    const scrollTrigger = triggerOnScroll
      ? ScrollTrigger.create({ trigger: root, start: "top 84%", once: true, onEnter: () => timeline.play() })
      : null;

    if (!scrollTrigger) timeline.play();
    return () => {
      scrollTrigger?.kill();
      timeline.kill();
    };
  }, [text, triggerOnScroll]);

  return (
    <p ref={rootRef} className={`editorial-typewriter ${className}`} aria-label={text}>
      <span data-editorial-typewriter aria-hidden="true" />
      <i aria-hidden="true" />
    </p>
  );
}
