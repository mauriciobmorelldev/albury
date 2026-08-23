import Image from "next/image";
import Link from "next/link";
import type { AlburyProject, ProjectMetric } from "@/data/alburyProjects";

type PropertyPerformanceCardProps = {
  project: AlburyProject;
  href?: string;
  priority?: boolean;
  variant?: "card" | "hero";
};

function formatMetric(metric: ProjectMetric | undefined) {
  if (!metric) return "—";
  return `${metric.prefix ?? ""}${metric.value.toLocaleString("en-US")}${metric.suffix ?? ""}`;
}

export default function PropertyPerformanceCard({ project, href, priority = false, variant = "card" }: PropertyPerformanceCardProps) {
  const revenue = project.metrics.find((metric) => metric.label.toLowerCase().includes("ingresos"));
  const occupancy = project.metrics.find((metric) => metric.label.toLowerCase().includes("ocupación"));
  const adr = project.metrics.find((metric) => metric.label.toLowerCase().includes("adr"));
  const isHero = variant === "hero";

  const card = (
    <article className={`property-performance-card ${isHero ? "is-hero" : "is-editorial-card"}`}>
      <div className="property-performance-media">
        <Image src={project.heroImage} alt={project.title} fill priority={priority} sizes={isHero ? "100vw" : "(max-width: 767px) 100vw, 50vw"} className="object-cover" />
        {isHero && (
          <>
            <div className="property-performance-shade" />
            <div className="property-performance-copy">
              <div className="property-performance-identity">
                <p>{project.location}</p>
                <h2>{project.title}</h2>
              </div>
              <dl className="property-performance-metrics">
                <div><dt>Ingresos anuales</dt><dd>{formatMetric(revenue)}</dd></div>
                <div><dt>ADR</dt><dd>{formatMetric(adr)}</dd></div>
              </dl>
            </div>
          </>
        )}
      </div>

      {!isHero && (
        <div className="property-performance-panel">
          <header className="property-performance-panel-heading">
            <div>
              <p>{project.location}</p>
              <h2>{project.title}</h2>
            </div>
            <span>{project.roiFocus}</span>
          </header>

          <dl className="property-performance-panel-metrics">
            <div><dt>Ingresos anuales</dt><dd>{formatMetric(revenue)}</dd></div>
            <div><dt>Ocupación</dt><dd>{formatMetric(occupancy)}</dd></div>
            <div><dt>ADR</dt><dd>{formatMetric(adr)}</dd></div>
          </dl>

          <span className="property-performance-cta">Ver caso <i aria-hidden="true">↗</i></span>
        </div>
      )}
    </article>
  );

  return href ? <Link href={href} className="property-performance-link">{card}</Link> : card;
}
