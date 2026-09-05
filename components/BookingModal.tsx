"use client";

import { FormEvent, useEffect, useState } from "react";

const propertyTypes = ["Casa", "Departamento", "Villa", "Cabaña", "Hotel boutique", "Otro"];
const propertyStages = ["Airbnb activo", "Por lanzar", "En remodelación", "Evaluando una compra"];
const incomeRanges = ["Todavía no genera ingresos", "Hasta USD 3.000/mes", "USD 3.000–6.000/mes", "USD 6.000–10.000/mes", "Más de USD 10.000/mes"];

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
    <div className="luxury-modal booking-modal fixed inset-0 z-[90] grid place-items-center px-4 py-5" role="dialog" aria-modal="true" aria-label="Solicitá tu diagnóstico de rentabilidad">
      <button className="booking-modal-backdrop absolute inset-0 cursor-default" aria-label="Cerrar popup" onClick={() => setOpen(false)} />
      <div className="booking-panel relative z-10 max-h-[92svh] w-full max-w-[1120px] overflow-hidden">
        <button type="button" aria-label="Cerrar" className="booking-close" onClick={() => setOpen(false)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
        </button>

        <div className="booking-layout">
          <aside className="booking-intro">
            <div>
              <p className="booking-kicker">Albury Design</p>
              <h2>
                <span>Solicitá tu</span>
                <span>diagnóstico de</span>
                <span>rentabilidad.</span>
              </h2>
              <p>Revisamos mercado, huésped ideal, oportunidad de ADR y brechas visuales para definir si el diseño puede mejorar el rendimiento del activo.</p>
            </div>
            <dl className="booking-meta">
              <div><dt>Duración</dt><dd>30 minutos</dd></div>
              <div><dt>Modalidad</dt><dd>Online · Sin cargo</dd></div>
            </dl>
          </aside>

          <div className="booking-form-panel">
            {sent ? (
              <div className="booking-success">
                <span aria-hidden="true">✓</span>
                <h3>Solicitud recibida.</h3>
                <p>Gracias por contactarnos. Te escribiremos para coordinar la llamada.</p>
                <button className="editorial-button editorial-button-primary" onClick={() => setOpen(false)}>Cerrar</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="booking-form">
                <div className="booking-mobile-heading">
                  <p className="booking-kicker">Albury Design</p>
                  <h2>
                    <span>Solicitá tu</span>
                    <span>diagnóstico de</span>
                    <span>rentabilidad.</span>
                  </h2>
                </div>

                <div className="booking-field-grid">
                  <label>Nombre completo<input required autoFocus placeholder="Tu nombre" /></label>
                  <label>Email<input required type="email" placeholder="tu@email.com" /></label>
                </div>
                <div className="booking-field-grid">
                  <label>WhatsApp<input required type="tel" placeholder="+1 786 846 2880" /></label>
                  <label>Ubicación<input placeholder="Miami, Texas, Mallorca..." /></label>
                </div>
                <div className="booking-field-grid">
                  <label>Tipo de propiedad<select required defaultValue=""><option value="" disabled>Seleccioná una opción</option>{propertyTypes.map((option) => <option key={option}>{option}</option>)}</select></label>
                  <label>Estado actual<select required defaultValue=""><option value="" disabled>Seleccioná una opción</option>{propertyStages.map((option) => <option key={option}>{option}</option>)}</select></label>
                </div>
                <label>Ingreso mensual aproximado<select required defaultValue=""><option value="" disabled>Seleccioná un rango</option>{incomeRanges.map((option) => <option key={option}>{option}</option>)}</select></label>
                <label>Objetivo principal<textarea rows={3} placeholder="ADR, ocupación, lanzamiento o reposicionamiento..." /></label>

                <button className="editorial-button editorial-button-primary booking-submit">
                  Solicitá tu diagnóstico
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>
                </button>
                <p className="booking-legal">Al enviar este formulario aceptás que Albury Design te contacte usando la información proporcionada.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
