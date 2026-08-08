"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { getGsap } from "@/lib/gsap";

const loaderImages = [
  "/milanote-assets/WhatsApp Image 2026-08-07 at 9.46.49 PM.jpeg",
  "/milanote-assets/WhatsApp Image 2026-08-07 at 9.46.49 PM (1).jpeg",
  "/milanote-assets/WhatsApp Image 2026-08-07 at 9.46.49 PM (2).jpeg",
  "/milanote-assets/WhatsApp Image 2026-08-07 at 9.46.49 PM (3).jpeg",
];


export default function PropertyLoader() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const columnRefs = useRef<Array<HTMLDivElement | null>>([]);
  const imageRefs = useRef<Array<HTMLImageElement | null>>([]);
  const previousPathnameRef = useRef(pathname);
  const routePendingRef = useRef(false);

  useEffect(() => {
    if (previousPathnameRef.current === pathname) return;

    previousPathnameRef.current = pathname;
    routePendingRef.current = false;
    setMounted(true);
  }, [pathname]);

  useEffect(() => {
    const handleNavigation = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) {
        return;
      }

      const url = new URL(anchor.href, window.location.href);
      const current = new URL(window.location.href);
      const sameDocument =
        url.origin === current.origin &&
        url.pathname === current.pathname &&
        url.search === current.search;

      if (url.origin !== current.origin || sameDocument) return;

      routePendingRef.current = true;
      setMounted(true);
    };

    document.addEventListener("click", handleNavigation, true);
    return () => document.removeEventListener("click", handleNavigation, true);
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;

    const root = rootRef.current;
    if (!root) return;

    const columns = columnRefs.current.filter(Boolean) as HTMLDivElement[];
    const images = imageRefs.current.filter(Boolean) as HTMLImageElement[];
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const finish = () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      routePendingRef.current = false;
      setMounted(false);
    };

    const pageLoaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            window.addEventListener("load", () => resolve(), { once: true });
          });

    const routeReady = new Promise<void>((resolve) => {
      const startedAt = window.performance.now();
      const check = () => {
        if (!routePendingRef.current || window.performance.now() - startedAt > 8000) {
          resolve();
          return;
        }
        window.requestAnimationFrame(check);
      };
      check();
    });

    const siteReady = Promise.all([
      pageLoaded,
      document.fonts.ready.catch(() => undefined),
      routeReady,
    ]);

    const { gsap } = getGsap();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      siteReady.then(finish);
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(images, { xPercent: -100, autoAlpha: 1, force3D: true });
      gsap.set(columns, { height: "100%" });

      const timeline = gsap
        .timeline({ paused: true, onComplete: finish })
        .to(images, {
          xPercent: 200,
          duration: 1.9,
          ease: "power3.inOut",
          stagger: 0.14,
          force3D: true,
          autoRound: false,
        })
        .to(columns, {
          height: "0%",
          duration: 0.7,
          ease: "power4.inOut",
          stagger: { each: 0.055, from: "end" },
        }, "-=0.34");

      const decoded = Promise.allSettled(
        images.map((image) =>
          image.complete
            ? image.decode().catch(() => undefined)
            : new Promise<void>((resolve) => {
                image.addEventListener("load", () => resolve(), { once: true });
                image.addEventListener("error", () => resolve(), { once: true });
              }),
        ),
      );

      Promise.all([decoded, siteReady]).then(() => timeline.play(0));
    }, root);

    return () => {
      ctx.revert();
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div ref={rootRef} className="property-loader" aria-hidden="true">
      {loaderImages.map((src, index) => (
        <div key={src} className="property-loader__slot">
          <div
            ref={(node) => {
              columnRefs.current[index] = node;
            }}
            className="property-loader__column"
          >
            <Image
              ref={(node) => {
                imageRefs.current[index] = node;
              }}
              src={src}
              alt=""
              fill
              priority
              unoptimized
              sizes="25vw"
              className="property-loader__image"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
