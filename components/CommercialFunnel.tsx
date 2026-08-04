"use client";

import { useLayoutEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

const pains = [
  ["01", "ADR bajo", "El huésped no percibe suficiente valor y compara tu propiedad solo por precio."],
  ["02", "Ocupación media", "El listing no detiene el scroll ni se diferencia de alternativas similares."],
  ["03", "Reemplazos caros", "Muebles bonitos pero poco resistentes generan compras dobles y pérdida de tiempo."],
  ["04", "Reviews inconsistentes", "La experiencia no se siente premium cuando comodidad, uso y visual no están alineados."],
  ["05", "Lanzamiento lento", "Cada semana de duda es una semana sin facturar o sin optimizar ingresos."],
  ["06", "Sin estándar luxe", "La propiedad pierde oportunidades si no comunica categoría, intención y detalle."],
];

const decisionSteps = [
  ["01", "Objetivo", "Definimos qué tiene que vender la propiedad: tarifa, ocupación, categoría o diferenciación."],
  ["02", "Perfil del huésped", "Diseñamos para una persona concreta, no para un gusto genérico."],
  ["03", "Dolores y objeciones", "Anticipamos dudas: precio, comodidad, ubicación, experiencia y confianza."],
  ["04", "Prueba visual", "Traducimos estrategia en renders, lista de compras, amenities y narrativa lista para publicar."],
];

const metrics = [
  { label: "Tarifa", prefix: "+15-", suffix: "%", target: 35, copy: "Potencial de ADR en propiedades reposicionadas con mejor percepción de valor." },
  { label: "Ocupación", prefix: "+10-", suffix: "%", target: 20, copy: "Cuando fotos, experiencia y diferenciación mejoran la decisión de reserva." },
  { label: "Ingreso anual", prefix: "$", suffix: "k+", target: 20, copy: "Potencial adicional en mercados y propiedades con oportunidad real de mejora." },
  { label: "Payback", prefix: "2-", suffix: "m", target: 4, copy: "Rango posible cuando tarifa, ocupación y ejecución acompañan la estrategia." },
];

const method = [
  ["01", "Análisis de mercado", "AirDNA, comparables, competencia, target, amenities y oportunidad de posicionamiento."],
  ["02", "Concepto estratégico", "Definimos USP, historia visual, estilo y categoría para que la propiedad se entienda rápido."],
  ["03", "Diseño virtual", "Layout, mobiliario, materiales, paleta, lista de compras y prioridades de ejecución."],
  ["04", "Amenidades de alto ROI", "Seleccionamos elementos que ayudan a elevar percepción, experiencia y fotografía."],
  ["05", "Listing readiness", "Guía final para styling, fotografía y salida al mercado con coherencia comercial."],
];

const funnel = [
  ["01", "Promesa clara", "No decoramos; diseñamos STR para generar más ingresos."],
  ["02", "Dolor costoso", "ADR bajo, ocupación media, reviews y tiempo perdido."],
  ["03", "Prueba visual", "Casos, renders, números y narrativa concreta."],
  ["04", "Riesgo menor", "Proceso claro, compras guiadas y decisiones justificadas."],
  ["05", "Llamada simple", "Diagnóstico gratis para ver oportunidad real."],
];

export default function CommercialFunnel() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".funnel-reveal").forEach((item) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, y: 24, filter: "blur(5px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.55,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 86%", once: true },
          },
        );
      });

      gsap.fromTo(
        ".map-line-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".decision-map", start: "top 72%", end: "bottom 42%", scrub: 0.7 },
        },
      );

      gsap.utils.toArray<HTMLElement>(".decision-node").forEach((node) => {
        gsap.fromTo(
          node,
          { autoAlpha: 0.2, scale: 0.92 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.35,
            ease: "power2.out",
            scrollTrigger: { trigger: node, start: "top 68%", end: "bottom 52%", toggleActions: "play none none reverse" },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".roi-value").forEach((item) => {
        const target = Number(item.dataset.target ?? 0);
        const prefix = item.dataset.prefix ?? "";
        const suffix = item.dataset.suffix ?? "";
        const counter = { value: 0 };

        gsap.to(counter, {
          value: target,
          duration: 1.15,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 82%", once: true },
          onUpdate: () => {
            item.textContent = `${prefix}${Math.round(counter.value)}${suffix}`;
          },
          onComplete: () => {
            item.textContent = `${prefix}${target}${suffix}`;
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <section id="estrategia" className="bg-warm-white px-5 py-20 text-charcoal sm:px-8 lg:px-14 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[1fr_.72fr]">
          <article className="funnel-reveal rounded-[36px] border border-charcoal/10 bg-stone p-8 shadow-[0_28px_90px_rgba(13,41,49,.08)] sm:p-10 lg:p-12">
            <p className="mb-5 text-xs font-black uppercase tracking-[.22em] text-gold">La pregunta real del cliente</p>
            <h2 className="max-w-4xl text-5xl font-black leading-[.9] tracking-[-.045em] sm:text-7xl">¿Por qué invertir en diseño si puedo llenarlo con muebles baratos?</h2>
            <p className="mt-7 max-w-2xl text-lg font-bold leading-8 text-charcoal/64">Porque amueblar barato puede ahorrar hoy, pero perder miles cada mes en ADR bajo, reseñas flojas, reemplazos y tiempo sin facturar.</p>
          </article>
          <article className="funnel-reveal flex min-h-[320px] flex-col justify-end rounded-[36px] bg-gold p-8 text-warm-white shadow-[0_28px_90px_rgba(227,74,46,.22)] sm:p-10 lg:p-12">
            <p className="text-xs font-black uppercase tracking-[.2em] text-warm-white/70">Respuesta Albury</p>
            <h3 className="mt-5 text-4xl font-black leading-[.92] tracking-[-.04em] sm:text-6xl">El diseño estratégico no es un gasto. Es un multiplicador.</h3>
          </article>
        </div>
      </section>

      <section id="dolores" className="bg-charcoal px-5 py-20 text-warm-white sm:px-8 lg:px-14 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="funnel-reveal grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
            <div>
              <p className="mb-5 text-xs font-black uppercase tracking-[.22em] text-soft-gold">Brechas de rendimiento</p>
              <h2 className="text-5xl font-black leading-[.92] tracking-[-.04em] sm:text-7xl">Los errores que convierten una propiedad premium en un listing promedio.</h2>
            </div>
            <p className="max-w-2xl text-lg font-bold leading-8 text-warm-white/68">El costo no siempre se ve en la factura del diseño. Muchas veces aparece después: menos reservas, menos tarifa y más fricción operativa.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pains.map(([number, title, copy]) => (
              <article key={title} className="funnel-reveal rounded-[28px] border border-warm-white/10 bg-warm-white/[.07] p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-warm-white/[.1]">
                <p className="text-xs font-black uppercase tracking-[.18em] text-soft-gold">{number}</p>
                <h3 className="mt-9 text-3xl font-black leading-none tracking-[-.035em] text-warm-white">{title}</h3>
                <p className="mt-5 text-base font-semibold leading-7 text-warm-white/62">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="decision-map relative overflow-hidden bg-warm-white px-5 py-24 text-charcoal sm:px-8 lg:px-14 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="funnel-reveal mx-auto max-w-4xl text-center">
            <p className="mb-5 text-xs font-black uppercase tracking-[.22em] text-gold">Mapa de decisión</p>
            <h2 className="text-5xl font-black leading-[.9] tracking-[-.045em] sm:text-7xl">Cada paso baja el riesgo antes de hablar de inversión.</h2>
            <p className="mx-auto mt-7 max-w-2xl text-lg font-bold leading-8 text-charcoal/62">La línea conecta la estrategia con el ROI: primero entendemos qué vender, después diseñamos para que la propiedad lo comunique.</p>
          </div>

          <div className="relative mt-16 grid gap-8 lg:gap-2">
            <div className="pointer-events-none absolute left-1/2 top-10 hidden h-[calc(100%-5rem)] w-px -translate-x-1/2 bg-charcoal/10 lg:block" />
            <div className="map-line-fill pointer-events-none absolute left-1/2 top-10 hidden h-[calc(100%-5rem)] w-[3px] origin-top -translate-x-1/2 rounded-full bg-gradient-to-b from-gold via-soft-gold to-gold shadow-[0_0_36px_rgba(227,74,46,.32)] lg:block" />
            {decisionSteps.map(([number, title, copy], index) => (
              <div key={title} className="decision-node relative grid items-center gap-5 lg:min-h-[230px] lg:grid-cols-[1fr_140px_1fr]">
                <article className={`funnel-reveal rounded-[30px] border border-charcoal/10 bg-stone p-7 shadow-[0_24px_80px_rgba(13,41,49,.07)] ${index % 2 === 0 ? "lg:col-start-1" : "lg:col-start-3"}`}>
                  <p className="text-xs font-black uppercase tracking-[.18em] text-gold">Paso {number}</p>
                  <h3 className="mt-4 text-4xl font-black leading-none tracking-[-.04em]">{title}</h3>
                  <p className="mt-4 text-base font-semibold leading-7 text-charcoal/62">{copy}</p>
                </article>
                <div className="relative z-10 mx-auto grid h-20 w-20 place-items-center rounded-full border border-gold/22 bg-warm-white text-sm font-black text-charcoal shadow-[0_18px_60px_rgba(227,74,46,.18)] lg:col-start-2 lg:row-start-1">
                  <span className="absolute inset-2 rounded-full border border-gold/22" />
                  {number}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="resultados" className="bg-warm-white px-5 pb-20 pt-4 text-charcoal sm:px-8 lg:px-14 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="funnel-reveal grid gap-8 lg:grid-cols-[.86fr_1.14fr] lg:items-end">
            <div>
              <p className="mb-5 text-xs font-black uppercase tracking-[.22em] text-gold">ROI visible</p>
              <h2 className="text-5xl font-black leading-[.92] tracking-[-.04em] sm:text-7xl">Lo que una estrategia visual debe mejorar.</h2>
            </div>
            <p className="max-w-2xl text-lg font-bold leading-8 text-charcoal/64">Estas métricas funcionan como lenguaje comercial del servicio. Se presentan como potencial según mercado, operación y estado inicial.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <article key={metric.label} className="funnel-reveal rounded-[30px] bg-stone p-7 shadow-[0_20px_70px_rgba(13,41,49,.07)]">
                <p className="text-xs font-black uppercase tracking-[.18em] text-gold">{metric.label}</p>
                <strong className="roi-value mt-5 block text-5xl font-black leading-none tracking-[-.055em] text-gold sm:text-6xl" data-prefix={metric.prefix} data-suffix={metric.suffix} data-target={metric.target}>0</strong>
                <p className="mt-5 text-sm font-bold leading-7 text-charcoal/62">{metric.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="proceso" className="bg-stone px-5 py-20 text-charcoal sm:px-8 lg:px-14 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="funnel-reveal grid gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
            <div>
              <p className="mb-5 text-xs font-black uppercase tracking-[.22em] text-gold">Metodología Albury</p>
              <h2 className="text-5xl font-black leading-[.92] tracking-[-.04em] sm:text-7xl">De propiedad vacía a listing premium listo para reservar.</h2>
            </div>
            <p className="max-w-2xl text-lg font-bold leading-8 text-charcoal/64">El servicio principal es diseño virtual: una dirección completa para decidir, comprar, ejecutar y fotografiar con menos dudas.</p>
          </div>
          <div className="mt-12 grid gap-7 lg:grid-cols-[.72fr_1.28fr]">
            <div className="funnel-reveal overflow-hidden rounded-[34px] bg-charcoal shadow-[0_28px_90px_rgba(13,41,49,.12)] lg:sticky lg:top-28 lg:h-[620px]">
              <div className="h-[420px] bg-cover bg-center lg:h-full" style={{ backgroundImage: "url('/renders/albury/web/pool-table.jpg')" }} />
            </div>
            <div className="grid gap-4">
              {method.map(([number, title, copy]) => (
                <article key={title} className="funnel-reveal rounded-[28px] border border-charcoal/10 bg-warm-white/78 p-7 shadow-[0_18px_60px_rgba(13,41,49,.05)] backdrop-blur-xl">
                  <p className="text-xs font-black uppercase tracking-[.18em] text-gold">{number}</p>
                  <h3 className="mt-4 text-3xl font-black leading-none tracking-[-.035em]">{title}</h3>
                  <p className="mt-4 text-base font-semibold leading-7 text-charcoal/62">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-charcoal px-5 py-20 text-warm-white sm:px-8 lg:px-14 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="funnel-reveal grid gap-8 lg:grid-cols-[.86fr_1.14fr] lg:items-end">
            <div>
              <p className="mb-5 text-xs font-black uppercase tracking-[.22em] text-soft-gold">Prueba visual</p>
              <h2 className="text-5xl font-black leading-[.92] tracking-[-.04em] sm:text-7xl">Casos que se leen como listings, no como galería decorativa.</h2>
            </div>
            <p className="max-w-2xl text-lg font-bold leading-8 text-warm-white/66">El portfolio funciona como prueba de confianza: enfoque, experiencia, ROI y acceso a proyectos individuales.</p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {[
              ["St Agustin", "STR premium · Listing ready · ROI focus", "/renders/albury/web/game-room-wide.jpg"],
              ["Sa Figuereta", "Exterior premium · Pool hook · Luxe feel", "/renders/albury/web/welcome-lounge.jpg"],
            ].map(([title, tags, image]) => (
              <article key={title} className="funnel-reveal group relative min-h-[520px] overflow-hidden rounded-[34px] bg-stone shadow-[0_28px_90px_rgba(0,0,0,.22)]">
                <div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${image}')` }} />
                <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(13,41,49,.72),rgba(13,41,49,.08)_62%)]" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-5xl font-black leading-none tracking-[-.045em]">{title}</h3>
                  <p className="mt-5 text-sm font-black uppercase tracking-[.14em] text-warm-white/70">{tags}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm-white px-5 py-20 text-charcoal sm:px-8 lg:px-14 lg:py-28">
        <div className="funnel-reveal mx-auto grid max-w-7xl gap-8 rounded-[36px] bg-stone p-8 shadow-[0_28px_90px_rgba(13,41,49,.08)] sm:p-10 lg:grid-cols-[.34fr_1fr] lg:p-12">
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-gold">Testimonio</p>
            <strong className="mt-5 block text-3xl font-black leading-none text-charcoal">Josema Sánchez</strong>
            <span className="mt-2 block text-sm font-bold text-charcoal/48">CEO de LVLTY</span>
          </div>
          <p className="text-3xl font-black leading-[1.08] tracking-[-.04em] text-gold sm:text-5xl">“Sus diseños no solo mejoran los espacios, sino que están estratégicamente pensados para maximizar la rentabilidad y cash flow.”</p>
        </div>
      </section>

      <section className="bg-charcoal px-5 py-20 text-warm-white sm:px-8 lg:px-14 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="funnel-reveal grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
            <div>
              <p className="mb-5 text-xs font-black uppercase tracking-[.22em] text-soft-gold">Paso a paso del lead</p>
              <h2 className="text-5xl font-black leading-[.92] tracking-[-.04em] sm:text-7xl">Un embudo simple para llevarlo a formulario y llamada.</h2>
            </div>
            <p className="max-w-2xl text-lg font-bold leading-8 text-warm-white/66">El lead no necesita leer todo. Necesita entender el valor, ver prueba real y sentir que el siguiente paso es fácil.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-5">
            {funnel.map(([number, title, copy]) => (
              <article key={title} className="funnel-reveal rounded-[24px] border border-warm-white/12 bg-warm-white/[.08] p-6 backdrop-blur-xl">
                <b className="text-soft-gold">{number}</b>
                <h3 className="mt-5 text-2xl font-black leading-none tracking-[-.04em]">{title}</h3>
                <p className="mt-4 text-sm font-semibold leading-6 text-warm-white/62">{copy}</p>
              </article>
            ))}
          </div>
          <button data-booking-trigger className="funnel-reveal mt-10 rounded-full bg-gold px-8 py-4 text-sm font-black text-warm-white shadow-[0_18px_60px_rgba(227,74,46,.22)] transition hover:-translate-y-1 hover:bg-[#b93322]">Agendar diagnóstico gratis</button>
        </div>
      </section>
    </div>
  );
}



