const faqGroups = [
  {
    id: "generales",
    number: "01",
    title: "Generales",
    items: [
      ["¿En qué ubicaciones trabajan?", "Nuestro servicio de diseño remoto está disponible en todo Estados Unidos y España. Para el diseño e instalación en sitio, viajamos a diversas zonas. Escríbenos para confirmar si tu área está dentro de nuestra cobertura."],
      ["¿Cuándo es el mejor momento para contactarlos?", "Recomendamos iniciar el proceso mientras la propiedad aún está en proceso de compra. Así, al finalizar la transacción, podrás solicitar los muebles y elementos decorativos sin demora."],
      ["¿Cuánto dura el proceso de diseño?", "Un proyecto de diseño virtual suele completarse en 4-5 semanas. Al contratar nuestros servicios, te daremos una fecha exacta de entrega. Durante las primeras semanas realizamos un estudio de mercado y definimos una estrategia personalizada para tu propiedad. Luego, nos enfocamos en el diseño, lo que implica la selección del mobiliario y la decoración, proceso que toma unas 2 semanas. Si además necesitas gestión del proyecto, este proceso agrega 6 semanas adicionales a las 4-5 semanas de estrategia y diseño, lo que significa que el proyecto completo toma entre 10 y 11 semanas."],
      ["¿Pueden asesorarme sobre las amenidades ideales para la propiedad?", "Sí, dentro de nuestro estudio de mercado evaluamos qué amenidades pueden ayudarte a incrementar el precio por noche."],
      ["¿También analizan la capacidad de huéspedes recomendada?", "Sí, revisamos datos y tendencias para determinar cuántos huéspedes pueden alojarse de manera óptima en la propiedad."],
    ],
  },
  {
    id: "diseno",
    number: "02",
    title: "Diseño",
    items: [
      ["¿En cuánto tiempo recibiré los muebles?", "Nos aseguramos de elegir solo artículos disponibles para envío inmediato. El mobiliario suele llegar a la propiedad en un máximo de 3 semanas."],
      ["¿Cuál es el presupuesto recomendado para amueblar la propiedad?", "Se sugiere calcular alrededor de $5,000 por cada dormitorio y $6,000 por cada espacio común, como la sala, el comedor o la sala de entretenimiento."],
      ["¿En qué tiendas compran los muebles?", "Trabajamos con proveedores como Amazon, Wayfair, Society 6 y Target, entre otros. Nos enfocamos en encontrar muebles de calidad a precios razonables, revisando opiniones y evitando marcas costosas que solo aumentan el precio por su reconocimiento."],
    ],
  },
  {
    id: "montaje",
    number: "03",
    title: "Servicio de Montaje en Sitio",
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

export default function ServicesFrequentlyAskedQuestions() {
  return (
    <section id="faqs" className="services-faq px-5 py-20 sm:px-8 lg:px-14 lg:py-28" aria-labelledby="services-faq-title">
      <div className="mx-auto max-w-7xl">
        <header className="landing-reveal services-faq-heading">
          <p className="section-label">Antes de comenzar</p>
          <h2 id="services-faq-title">Preguntas frecuentes.</h2>
          <p>Información sobre tiempos, presupuesto, cobertura, diseño y montaje para planificar el proyecto con claridad.</p>
        </header>

        <div className="services-faq-groups">
          {faqGroups.map((group) => (
            <section key={group.id} className="services-faq-group" aria-labelledby={`faq-${group.id}`}>
              <header className="landing-reveal services-faq-chapter">
                <span>{group.number}</span>
                <h3 id={`faq-${group.id}`}>{group.title}</h3>
              </header>

              <div className="services-faq-questions">
                {group.items.map(([question, answer]) => (
                  <details key={question} className="landing-reveal">
                    <summary>{question}</summary>
                    <p>{answer}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
