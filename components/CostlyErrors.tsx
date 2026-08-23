"use client";

import Image from "next/image";

const errors = [
  {
    title: "Reservas perdidas",
    copy: "Si el listing no comunica valor rápido, el huésped elige otra propiedad.",
    image: "/milanote-assets/WhatsApp Image 2026-08-07 at 9.45.05 PM.jpeg",
  },
  {
    title: "Tarifas nocturnas más bajas",
    copy: "Sin diferenciación visual, la propiedad termina compitiendo por precio.",
    image: "/milanote-assets/WhatsApp Image 2026-08-07 at 9.46.49 PM (3).jpeg",
  },
  {
    title: "Reseñas pobres",
    copy: "Una experiencia genérica reduce la confianza y debilita futuras reservas.",
    image: "/milanote-assets/WhatsApp Image 2026-08-07 at 9.46.48 PM.jpeg",
  },
];

export default function CostlyErrors() {
  return (
    <section className="costly-errors px-5 py-20 sm:px-8 lg:px-14 lg:py-28" aria-labelledby="costly-errors-title">
      <div className="mx-auto max-w-7xl">
        <div className="landing-reveal costly-errors-heading">
          <p className="section-label">Brechas de rendimiento</p>
          <h2 id="costly-errors-title" className="section-title">Errores costosos.</h2>
        </div>

        <div className="costly-errors-grid mt-14">
          {errors.map((error) => (
            <article key={error.title} className="landing-reveal costly-error-card">
              <div className="costly-error-image">
                <Image src={error.image} alt={error.title} fill sizes="(max-width: 900px) 100vw, 33vw" className="object-cover" />
              </div>
              <div className="costly-error-copy">
                <h3>{error.title}</h3>
                <p>{error.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
