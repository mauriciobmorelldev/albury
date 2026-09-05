const plans = [
  {
    eyebrow: "Servicio remoto",
    title: "Diseño Virtual",
    intro: "Para inversionistas que quieren aumentar sus ingresos y destacarse en el mercado sin delegar la compra ni la instalación. Entregamos una dirección de diseño completa para que puedas ejecutar el proyecto por tu cuenta.",
    bestFor: "Ideal si buscás una estrategia profesional con una implementación flexible y remota.",
    features: ["Análisis del público objetivo", "Investigación del mercado STR", "Tableros de diseño", "Planos del espacio", "Lista de compras", "Diseño de mejoras estéticas", "Guía de instalación en 5 semanas"],
  },
  {
    eyebrow: "Servicio integral",
    title: "Diseño y Gestión del Proyecto",
    intro: "Para inversionistas que buscan un diseño competitivo sin involucrarse en cada decisión. Gestionamos investigación, estrategia, conceptualización, compras, coordinación, instalación, ambientación y dirección fotográfica.",
    bestFor: "Ideal si querés delegar el proyecto completo y llegar a un listing listo para competir.",
    features: ["Análisis del público objetivo", "Investigación del mercado STR", "Tableros de diseño", "Planos del espacio", "Lista de compras", "Diseño de mejoras estéticas", "Gestión de pedidos", "Coordinación de contratistas", "Supervisión de la instalación del mobiliario", "Decoración y ambientación", "Dirección de sesión fotográfica"],
  },
];

export default function InvestmentSolutions() {
  return (
    <section id="servicios" className="service-offers px-5 py-20 sm:px-8 lg:px-14 lg:py-28" aria-labelledby="service-offers-title">
      <div className="mx-auto max-w-7xl">
        <header className="landing-reveal service-offers-heading">
          <p className="section-label">Dos formas de trabajar juntos</p>
          <h2 id="service-offers-title">Una solución para cada inversionista de alquiler a corto plazo.</h2>
          <p>Elegí el nivel de acompañamiento según tu experiencia, ubicación y disponibilidad para ejecutar el proyecto.</p>
        </header>

        <div className="service-offers-grid">
          {plans.map((plan, index) => (
            <article key={plan.title} className="landing-reveal service-offer-card">
              <div className="service-offer-folio">
                <span>0{index + 1}</span>
                <span>{plan.eyebrow}</span>
              </div>

              <div className="service-offer-intro">
                <h3>{plan.title}</h3>
                <p>{plan.intro}</p>
              </div>

              <p className="service-offer-best">{plan.bestFor}</p>

              <div className="service-offer-deliverables">
                <p>Qué incluye</p>
                <ul>
                  {plan.features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
              </div>

              <button type="button" data-booking-trigger className="editorial-button editorial-button-primary">
                Solicitá tu diagnóstico
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
