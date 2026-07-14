"use client";

import { FormEvent, useEffect, useState } from "react";

const serviceOptions = ["Diseño Virtual", "Diseño y Gestión del Proyecto", "No estoy seguro todavía"];

export default function BookingModal() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const trigger = target?.closest<HTMLElement>("[data-booking-trigger], a[href='#contacto'], a[href='/#contacto']");
      if (!trigger) return;
      event.preventDefault();
      setOpen(true);
      setSent(false);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-charcoal/78 px-4 py-6 backdrop-blur-xl" role="dialog" aria-modal="true" aria-labelledby="booking-title">
      <button className="absolute inset-0 cursor-default" aria-label="Cerrar popup" onClick={() => setOpen(false)} />
      <div className="relative max-h-[92svh] w-full max-w-5xl overflow-hidden rounded-[34px] border border-warm-white/18 bg-warm-white text-charcoal shadow-[0_40px_120px_rgba(0,0,0,.44)]">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute -bottom-28 left-20 h-80 w-80 rounded-full bg-charcoal/10 blur-3xl" />
        <button
          type="button"
          aria-label="Cerrar"
          className="absolute right-5 top-5 z-20 grid h-11 w-11 place-items-center rounded-full border border-charcoal/10 bg-warm-white/75 text-xl font-black text-charcoal shadow-lg backdrop-blur-xl transition hover:scale-105 hover:bg-charcoal hover:text-warm-white"
          onClick={() => setOpen(false)}
        >
          ×
        </button>

        <div className="relative z-10 grid lg:grid-cols-[.86fr_1.14fr]">
          <aside className="relative hidden min-h-[680px] overflow-hidden bg-charcoal p-10 text-warm-white lg:block">
            <div className="absolute inset-0 bg-cover bg-center opacity-52" style={{ backgroundImage: "url('/renders/albury/web/pool-table.jpg')" }} />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,28,34,.35),rgba(7,28,34,.94))]" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[.22em] text-soft-gold">Llamada Albury Design</p>
                <h2 id="booking-title" className="mt-6 text-6xl font-black uppercase leading-[.88] tracking-[-.04em]">Agenda tu consulta gratis.</h2>
                <p className="mt-6 text-lg font-semibold leading-8 text-warm-white/72">Contanos sobre tu propiedad y coordinamos el mejor camino: diseño virtual, gestión integral o una estrategia a medida.</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {["30 min", "Online", "Gratis"].map((item) => (
                  <div key={item} className="rounded-2xl border border-warm-white/16 bg-warm-white/10 p-4 text-center backdrop-blur-xl">
                    <p className="text-sm font-black uppercase tracking-[.12em] text-warm-white">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <div className="max-h-[92svh] overflow-y-auto p-6 sm:p-8 lg:p-10">
            {sent ? (
              <div className="grid min-h-[560px] place-items-center text-center">
                <div>
                  <p className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gold text-3xl font-black text-warm-white">✓</p>
                  <h3 className="mt-8 text-5xl font-black leading-none tracking-[-.04em]">Solicitud recibida</h3>
                  <p className="mx-auto mt-5 max-w-md text-lg font-semibold leading-8 text-charcoal/62">Gracias por contactarnos. Te enviaremos un mensaje lo más pronto posible para coordinar la llamada.</p>
                  <button className="mt-8 rounded-full bg-charcoal px-7 py-4 text-sm font-black text-warm-white" onClick={() => setOpen(false)}>Cerrar</button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-5">
                <div className="lg:hidden">
                  <p className="text-xs font-black uppercase tracking-[.22em] text-gold">Llamada Albury Design</p>
                  <h2 id="booking-title" className="mt-3 text-4xl font-black leading-none tracking-[-.04em]">Agenda tu consulta gratis.</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-xs font-black uppercase tracking-[.14em] text-charcoal/52">Nombre completo<input required className="rounded-2xl border border-charcoal/12 bg-stone/70 px-4 py-4 text-base font-bold normal-case tracking-normal outline-none transition focus:border-gold" placeholder="Tu nombre" /></label>
                  <label className="grid gap-2 text-xs font-black uppercase tracking-[.14em] text-charcoal/52">Email<input required type="email" className="rounded-2xl border border-charcoal/12 bg-stone/70 px-4 py-4 text-base font-bold normal-case tracking-normal outline-none transition focus:border-gold" placeholder="tu@email.com" /></label>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-xs font-black uppercase tracking-[.14em] text-charcoal/52">WhatsApp<input required type="tel" className="rounded-2xl border border-charcoal/12 bg-stone/70 px-4 py-4 text-base font-bold normal-case tracking-normal outline-none transition focus:border-gold" placeholder="+1 786 846 2880" /></label>
                  <label className="grid gap-2 text-xs font-black uppercase tracking-[.14em] text-charcoal/52">Ubicación<input className="rounded-2xl border border-charcoal/12 bg-stone/70 px-4 py-4 text-base font-bold normal-case tracking-normal outline-none transition focus:border-gold" placeholder="Miami, Texas, Mallorca..." /></label>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-xs font-black uppercase tracking-[.14em] text-charcoal/52">Servicio<select className="rounded-2xl border border-charcoal/12 bg-stone/70 px-4 py-4 text-base font-bold normal-case tracking-normal outline-none transition focus:border-gold">{serviceOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
                  <label className="grid gap-2 text-xs font-black uppercase tracking-[.14em] text-charcoal/52">Fecha preferida<input type="date" className="rounded-2xl border border-charcoal/12 bg-stone/70 px-4 py-4 text-base font-bold normal-case tracking-normal outline-none transition focus:border-gold" /></label>
                </div>
                <label className="grid gap-2 text-xs font-black uppercase tracking-[.14em] text-charcoal/52">Mensaje<textarea rows={5} className="resize-none rounded-2xl border border-charcoal/12 bg-stone/70 px-4 py-4 text-base font-bold normal-case tracking-normal outline-none transition focus:border-gold" placeholder="Cuéntanos en qué etapa está tu propiedad y qué objetivo tienes." /></label>
                <button className="group mt-2 inline-flex items-center justify-center gap-4 rounded-full bg-gold px-7 py-4 text-sm font-black text-warm-white shadow-[0_18px_60px_rgba(227,74,46,.24)] transition hover:-translate-y-1 hover:bg-[#b93322]">
                  Agendar reunión <span className="grid h-8 w-8 place-items-center rounded-full bg-warm-white/18 transition group-hover:translate-x-1">→</span>
                </button>
                <p className="text-xs font-semibold leading-5 text-charcoal/45">Al enviar este formulario confirmas que quieres recibir contenido de Albury Design usando la información de contacto proporcionada.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
