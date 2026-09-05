import Link from "next/link";
import { notFound } from "next/navigation";
import BookingModal from "@/components/BookingModal";
import ChatPopup from "@/components/ChatPopup";
import ProjectComments from "@/components/ProjectComments";
import PropertyLightboxGallery from "@/components/PropertyLightboxGallery";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { alburyProjects, getAlburyProject } from "@/data/alburyProjects";

function ProjectFactIcon({ icon }: { icon: "bedrooms" | "bathrooms" | "area" | "type" }) {
  if (icon === "bedrooms") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 19v-8m0 5h18m0 3V9a2 2 0 0 0-2-2h-7v9M6 11V8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3" /></svg>;
  }
  if (icon === "bathrooms") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 13h16v2a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-2Zm2 0V6a3 3 0 0 1 6 0m-8 13-1 2m14-2 1 2" /></svg>;
  }
  if (icon === "area") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20 20 4M4 14v6h6M14 4h6v6M8 16l-2-2m5-1-2-2m5-1-2-2m5-1-2-2" /></svg>;
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 11 9-7 9 7v9H3v-9Zm6 9v-6h6v6" /></svg>;
}

export function generateStaticParams() {
  return alburyProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getAlburyProject(slug);
  if (!project) return {};
  return { title: `${project.title} | Albury Design`, description: project.summary };
}

export default async function PortfolioProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getAlburyProject(slug);
  if (!project) notFound();

  return (
    <main className="site-shell-luxury property-detail-page min-h-screen overflow-hidden">
      <SiteHeader />

      <section className="project-case-hero">
        <div className="project-case-shell">
          <Link href="/portfolio" className="property-back-link" aria-label="Volver al portfolio">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 8 12l7 7" /></svg>
            Volver al portfolio
          </Link>

          <PropertyLightboxGallery projectTitle={project.title} shots={project.gallery} priority />

          <header className="project-case-heading">
            <div>
              <p className="property-detail-label">Caso Albury Design · {project.location}</p>
              <h1>{project.title}</h1>
            </div>
          </header>
        </div>
      </section>

      <section className="project-case-overview" aria-label="Información y rendimiento del proyecto">
        <div className="project-case-overview-grid">
          <article className="project-case-narrative">
            {project.facts?.length ? (
              <dl className="project-facts" aria-label="Características de la propiedad">
                {project.facts.map((fact) => (
                  <div className="project-fact" key={`${fact.icon}-${fact.value}`}>
                    <ProjectFactIcon icon={fact.icon} />
                    <div>
                      <dt>{fact.label}</dt>
                      <dd>{fact.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            ) : null}
            <p className="property-detail-summary">{project.summary}</p>

          </article>

          <aside className="project-performance" aria-labelledby="project-performance-title">
            <p className="property-detail-label">Rendimiento estimado</p>
            <h2 id="project-performance-title">Desglose del rendimiento</h2>
            <p>Rendimiento estimado según la estrategia, el mercado y la operación de la propiedad.</p>
            <dl>
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <dt>{metric.label === "Ocupación" ? "Tasa de ocupación" : metric.label === "ADR objetivo" ? "Tarifa diaria promedio objetivo" : metric.label === "Rating objetivo" ? "Calificación de la propiedad objetivo" : metric.label}</dt>
                  <dd>{metric.prefix ?? ""}{metric.value.toLocaleString("es-ES")}{metric.suffix ?? ""}</dd>
                </div>
              ))}
            </dl>
            <small>Los resultados dependen de mercado, pricing, demanda, ejecución y situación inicial.</small>
          </aside>
        </div>
      </section>

      <ProjectComments projectTitle={project.title} />

      <SiteFooter property />
      <ChatPopup />
      <BookingModal />
    </main>
  );
}
