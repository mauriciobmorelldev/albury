import Link from "next/link";
import { notFound } from "next/navigation";
import BookingModal from "@/components/BookingModal";
import ChatPopup from "@/components/ChatPopup";
import PropertyLightboxGallery from "@/components/PropertyLightboxGallery";
import PropertyPerformanceCard from "@/components/PropertyPerformanceCard";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { alburyProjects, getAlburyProject } from "@/data/alburyProjects";

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
      <section className="property-detail-hero px-4 pb-10 pt-28 sm:px-8 lg:px-14 lg:pb-16 lg:pt-32">
        <div className="mx-auto max-w-[1380px]">
          <Link href="/portfolio" className="property-back-link" aria-label="Volver al portfolio">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 8 12l7 7" /></svg>
            Volver al portfolio
          </Link>
          <PropertyPerformanceCard project={project} priority variant="hero" />
        </div>
      </section>

      <section className="property-detail-story px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <p className="property-detail-label">{project.eyebrow}</p>
            <h1>{project.headline}</h1>
          </div>
          <div className="lg:pt-12">
            <p className="property-detail-summary">{project.summary}</p>
            <div className="property-strategy-list mt-10 border-t border-[#e5dece]/20">
              {project.strategy.map((item, index) => (
                <div key={item}><span>0{index + 1}</span><p>{item}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="property-detail-gallery px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-6 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
            <h2>Galería del proyecto.</h2>
            <p>Una secuencia pensada para que el huésped entienda valor, uso y deseo antes de leer la descripción.</p>
          </div>
          <PropertyLightboxGallery projectTitle={project.title} shots={project.gallery} />
        </div>
      </section>

      <SiteFooter />
      <ChatPopup />
      <BookingModal />
    </main>
  );
}
