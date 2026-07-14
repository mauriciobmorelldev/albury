"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { getGsap } from "@/lib/gsap";

const faqGroups = [
  {
    category: "Generales",
    items: [
      ["¿En qué ubicaciones trabajan?", "Nuestro servicio de diseño remoto está disponible en todo Estados Unidos y España. Para el diseño e instalación en sitio, viajamos a diversas zonas. Escríbenos para confirmar si tu área está dentro de nuestra cobertura."],
      ["¿Cuándo es el mejor momento para contactarlos?", "Recomendamos iniciar el proceso mientras la propiedad aún está en proceso de compra. Así, al finalizar la transacción, podrás solicitar los muebles y elementos decorativos sin demora."],
      ["¿Cuánto dura el proceso de diseño?", "Un proyecto de diseño virtual suele completarse en 4-5 semanas. Al contratar nuestros servicios, te daremos una fecha exacta de entrega. Durante las primeras semanas realizamos un estudio de mercado y definimos una estrategia personalizada para tu propiedad. Luego, nos enfocamos en el diseño, lo que implica la selección del mobiliario y la decoración, proceso que toma unas 2 semanas. Si además necesitas gestión del proyecto, este proceso agrega 6 semanas adicionales a las 4-5 semanas de estrategia y diseño, lo que significa que el proyecto completo toma entre 10 y 11 semanas."],
      ["¿Pueden asesorarme sobre las amenidades ideales para la propiedad?", "Sí, dentro de nuestro estudio de mercado evaluamos qué amenidades pueden ayudarte a incrementar el precio por noche."],
      ["¿También analizan la capacidad de huéspedes recomendada?", "Sí, revisamos datos y tendencias para determinar cuántos huéspedes pueden alojarse de manera óptima en la propiedad."],
    ],
  },
  {
    category: "Diseño",
    items: [
      ["¿En cuánto tiempo recibiré los muebles?", "Nos aseguramos de elegir solo artículos disponibles para envío inmediato. El mobiliario suele llegar a la propiedad en un máximo de 3 semanas."],
      ["¿Cuál es el presupuesto recomendado para amueblar la propiedad?", "Se sugiere calcular alrededor de $5,000 por cada dormitorio y $6,000 por cada espacio común, como la sala, el comedor o la sala de entretenimiento."],
      ["¿En qué tiendas compran los muebles?", "Trabajamos con proveedores como Amazon, Wayfair, Society 6 y Target, entre otros. Nos enfocamos en encontrar muebles de calidad a precios razonables, revisando opiniones y evitando marcas costosas que solo aumentan el precio por su reconocimiento."],
    ],
  },
  {
    category: "Servicio de Montaje en Sitio",
    items: [
      ["¿Cuánto tiempo después de terminar el diseño se realiza la instalación?", "El proceso de instalación y la sesión de fotos se completarán en un plazo de 6 semanas tras finalizar el diseño. Durante las primeras 5 semanas, se recibe el mobiliario y se ejecutan algunos trabajos con contratistas. En la sexta semana, viajamos a la propiedad para llevar a cabo la instalación y coordinar la sesión fotográfica."],
      ["¿El precio del servicio incluye los costos de viaje?", "Sí, nosotros cubrimos los gastos de vuelos y desplazamiento."],
      ["¿Ustedes gestionan la compra de los muebles?", "Sí, nos encargamos de hacer los pedidos y monitorear su entrega."],
      ["¿Qué costos adicionales debo considerar?", "Además de nuestra tarifa de servicio, deberás cubrir el costo de los muebles y los honorarios de contratistas como pintores, instaladores de papel tapiz y fotógrafos, entre otros."],
      ["¿Qué tipo de contratistas forman parte del proceso?", "Trabajamos con pintores, instaladores de papel tapiz, muralistas, electricistas, transportistas, ensambladores de muebles, montadores de estructuras en pared, instaladores de iluminación decorativa, servicios de limpieza y fotógrafos. Nos encargamos de buscar y coordinar a todos los profesionales que intervienen en el proyecto."],
      ["¿Cuánto tiempo estarán en la propiedad?", "Estaremos en el lugar durante una semana para instalar los muebles, decorar y preparar el espacio, además de dirigir la sesión de fotos. Antes de nuestra llegada, organizamos los pedidos y coordinamos con contratistas que pueden adelantar su trabajo, como pintores, muralistas e instaladores de papel tapiz."],
    ],
  },
];

export default function FAQSection() {
  const rootRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState("Generales-0");

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.from(".faq-reveal", {
        autoAlpha: 0,
        y: 34,
        filter: "blur(10px)",
        stagger: 0.08,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 74%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="faqs" ref={rootRef} className="bg-warm-white px-5 py-24 text-charcoal sm:px-8 lg:px-14 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.72fr_1.28fr]">
        <div className="faq-reveal lg:sticky lg:top-28 lg:h-fit">
          <p className="mb-5 text-xs font-black uppercase tracking-[.22em] text-gold">Preguntas Frecuentes</p>
          <h2 className="text-5xl font-black leading-none tracking-[-.04em] sm:text-7xl">Todo lo que necesitás saber antes de empezar.</h2>
          <button data-booking-trigger className="mt-9 rounded-full bg-gold px-7 py-4 text-sm font-black text-warm-white transition hover:-translate-y-1 hover:bg-[#b93322]">Consulta Gratis</button>
        </div>
        <div className="grid gap-8">
          {faqGroups.map((group) => (
            <div key={group.category} className="faq-reveal rounded-[34px] border border-charcoal/10 bg-stone/70 p-4 shadow-[0_28px_90px_rgba(13,41,49,.07)] backdrop-blur-xl sm:p-6">
              <h3 className="px-3 pb-4 pt-2 text-xs font-black uppercase tracking-[.2em] text-gold">{group.category}</h3>
              <div className="grid gap-3">
                {group.items.map(([question, answer], index) => {
                  const id = `${group.category}-${index}`;
                  const active = open === id;
                  return (
                    <article key={question} className="overflow-hidden rounded-[24px] bg-warm-white">
                      <button className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left" onClick={() => setOpen(active ? "" : id)} aria-expanded={active}>
                        <span className="text-lg font-black leading-6 text-charcoal">{question}</span>
                        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full bg-charcoal text-warm-white transition ${active ? "rotate-45 bg-gold" : ""}`}>+</span>
                      </button>
                      <div className={`grid transition-all duration-500 ${active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                        <div className="overflow-hidden">
                          <p className="px-5 pb-6 text-base font-semibold leading-8 text-charcoal/62">{answer}</p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
