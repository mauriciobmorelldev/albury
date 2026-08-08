"use client";

import { useEffect, useState } from "react";

export default function ChatPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const showTimer = window.setTimeout(() => setVisible(true), 4200);
    return () => window.clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const hideTimer = window.setTimeout(() => setVisible(false), 8000);
    const dismissTimer = window.setTimeout(() => setDismissed(true), 8300);
    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(dismissTimer);
    };
  }, [visible]);

  return (
    <div className="luxury-chat fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-2 sm:bottom-7 sm:right-7">
      {!dismissed ? (
        <div
          aria-live="polite"
          className={`relative w-[210px] sm:w-[248px] rounded-[18px] border border-warm-white/16 bg-charcoal/92 px-4 py-3 text-warm-white shadow-[0_14px_42px_rgba(0,0,0,.22)] backdrop-blur-xl transition-all duration-300 ${
            visible
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none translate-y-2 opacity-0"
          }`}
        >
          <button
            type="button"
            aria-label="Cerrar mensaje"
            className="absolute right-2.5 top-2.5 grid h-6 w-6 place-items-center rounded-full text-sm text-warm-white/55 transition hover:bg-warm-white/10 hover:text-warm-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-soft-gold"
            onClick={() => {
              setVisible(false);
              window.setTimeout(() => setDismissed(true), 300);
            }}
          >
            ×
          </button>

          <p className="pr-7 text-[9px] font-bold uppercase tracking-[.18em] text-soft-gold">Albury Design</p>
          <p className="mt-1 pr-6 text-xs font-semibold leading-5 text-warm-white/88">
            ¿Tu propiedad podría rendir más?
          </p>
          <a
            href="#contacto"
            data-booking-trigger
            className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[.1em] text-warm-white/72 transition hover:text-soft-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-soft-gold"
          >
            Ver diagnóstico <span aria-hidden="true">→</span>
          </a>
          <div className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 border-b border-r border-warm-white/12 bg-charcoal/92" />
        </div>
      ) : null}

      <a
        href="#contacto"
        data-booking-trigger
        aria-label="Abrir WhatsApp"
        className="group relative grid h-14 w-14 place-items-center rounded-full border border-warm-white/30 bg-[#207a4b] text-warm-white shadow-[0_12px_30px_rgba(0,0,0,.28)] transition hover:-translate-y-1 hover:bg-[#185f3a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-warm-white"
      >
        <svg viewBox="0 0 32 32" className="relative h-6 w-6" fill="none" aria-hidden="true">
          <path
            fill="currentColor"
            d="M16.05 5.3A10.55 10.55 0 0 0 7 21.28L5.7 26l4.84-1.27A10.55 10.55 0 1 0 16.05 5.3Zm0 2.05a8.5 8.5 0 0 1 7.24 12.96 8.5 8.5 0 0 1-11.96 2.3l-.35-.22-2.88.75.77-2.8-.23-.36a8.5 8.5 0 0 1 7.41-12.63Zm-3.1 4.14c-.2 0-.54.08-.83.4-.28.3-1.08 1.05-1.08 2.56 0 1.5 1.1 2.96 1.25 3.16.15.2 2.13 3.4 5.28 4.63 2.62 1.03 3.15.82 3.72.77.57-.05 1.85-.76 2.1-1.48.27-.73.27-1.36.2-1.49-.08-.13-.28-.2-.58-.35-.3-.15-1.85-.91-2.13-1.01-.29-.1-.5-.15-.7.15-.2.3-.8 1-.98 1.2-.18.2-.36.23-.66.08-.3-.15-1.28-.47-2.43-1.5-.9-.8-1.5-1.8-1.68-2.1-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.68-1.68-.96-2.28-.25-.6-.51-.52-.7-.53h-.6Z"
          />
        </svg>
        <span className="sr-only">WhatsApp</span>
      </a>
    </div>
  );
}
