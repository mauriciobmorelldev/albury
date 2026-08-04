"use client";

import { useEffect, useState } from "react";

export default function ChatPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 1900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-2 sm:bottom-7 sm:right-7">
      {!dismissed ? (
        <div
          className={`relative w-[min(300px,calc(100vw-2.5rem))] overflow-hidden rounded-[24px] border border-warm-white/24 bg-charcoal/88 p-4 text-warm-white shadow-[0_22px_70px_rgba(7,28,34,.22)] backdrop-blur-2xl transition-all duration-300 ${
            visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-[.98] opacity-0"
          }`}
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gold/18 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-12 left-8 h-24 w-24 rounded-full bg-[#2fc35d]/14 blur-2xl" />
          <button
            type="button"
            aria-label="Cerrar mensaje"
            className="absolute right-3 top-3 z-30 grid h-7 w-7 place-items-center rounded-full bg-warm-white/12 text-warm-white/70 transition hover:bg-warm-white/22 hover:text-warm-white"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setDismissed(true);
            }}
          >
            ×
          </button>

          <div className="relative z-10 flex items-start gap-3 pr-7">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-warm-white text-[10px] font-black uppercase leading-none tracking-[.05em] text-charcoal shadow-[0_12px_30px_rgba(7,28,34,.22)]">
              AD
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.18em] text-soft-gold">Albury Design</p>
              <p className="mt-1 text-sm font-extrabold leading-6 text-warm-white/88">¿Querés detectar por qué tu Airbnb no convierte más?</p>
              <a
                href="#contacto"
                data-booking-trigger
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-black text-white shadow-[0_10px_28px_rgba(227,74,46,.26)] transition hover:-translate-y-0.5 hover:bg-[#b93322]"
              >
                Pedir diagnóstico <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="absolute -bottom-3 right-8 h-6 w-6 rotate-45 border-b border-r border-warm-white/12 bg-charcoal/88" />
        </div>
      ) : null}

      <a
        href="#contacto"
        data-booking-trigger
        aria-label="Abrir WhatsApp"
        className="group relative grid h-[60px] w-[60px] place-items-center rounded-full bg-[#28c840] text-warm-white shadow-[0_18px_50px_rgba(40,200,64,.35)] transition hover:-translate-y-1 hover:scale-105"
      >
        <span className="absolute inset-0 rounded-full bg-[#28c840] opacity-35 blur-md transition group-hover:scale-125" />
        <svg viewBox="0 0 32 32" className="relative h-7 w-7" fill="none" aria-hidden="true">
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
