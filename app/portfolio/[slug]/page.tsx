import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookingModal from "@/components/BookingModal";
import PropertyLightboxGallery from "@/components/PropertyLightboxGallery";
import ChatPopup from "@/components/ChatPopup";
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

  return {
    title: `${project.title} | Albury Design`,
    description: project.summary,
  };
}

export default async function PortfolioProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getAlburyProject(slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf7ef] text-[#0d2931]">
      <SiteHeader />
      <section className="relative min-h-screen overflow-hidden bg-[#0d2931] px-5 pb-16 pt-32 text-white sm:px-8 lg:px-14">
        <Image src={project.heroImage} alt={project.title} fill priority sizes="100vw" className="object-cover opacity-72" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(227,101,89,.42),transparent_25%),linear-gradient(90deg,rgba(13,41,49,.98),rgba(13,41,49,.76)_50%,rgba(13,41,49,.25))]" />
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl flex-col justify-end pb-10">
          <Link href="/portfolio" className="mb-8 inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-5 py-3 text-xs font-black uppercase tracking-[.18em] text-white/80 backdrop-blur-xl">← Volver al portfolio</Link>
          <p className="mb-5 text-xs font-black uppercase tracking-[.22em] text-[#dff2f5]">{project.eyebrow}</p>
          <h1 className="max-w-5xl text-[clamp(5rem,12vw,13rem)] font-black uppercase leading-[.76] tracking-[-.08em]">{project.title}</h1>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.95fr_1.05fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#e36559]">{project.location}</p>
            <h2 className="mt-5 text-5xl font-black leading-[.92] tracking-[-.055em] sm:text-7xl">{project.headline}</h2>
            <p className="mt-6 text-lg font-semibold leading-8 text-[#52656b]">{project.summary}</p>
            <div className="mt-8 grid gap-3">
              {project.strategy.map((item) => (
                <div key={item} className="rounded-full border border-[#236f7e]/15 bg-[#fffaf2] px-5 py-4 text-sm font-black text-[#236f7e]">{item}</div>
              ))}
            </div>
          </div>
          <aside className="rounded-[34px] border border-[#0d2931]/12 bg-[#dff2f5] p-7 shadow-[0_28px_80px_rgba(13,41,49,.10)]">
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#52656b]">Desglose del rendimiento</p>
            <h3 className="mt-3 text-4xl font-black tracking-[-.045em] text-[#0d2931]">ROI foco: {project.roiFocus}</h3>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="rounded-[24px] bg-white/65 p-5">
                  <span className="text-xs font-black uppercase tracking-[.16em] text-[#52656b]">{metric.label}</span>
                  <strong className="mt-2 block text-4xl font-black tracking-[-.06em] text-[#0d2931]">{metric.prefix}{metric.value.toLocaleString("en-US")}{metric.suffix}</strong>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs font-semibold leading-5 text-[#52656b]">* Datos orientativos para maqueta. Podemos reemplazarlos por datos reales del listing.</p>
          </aside>
        </div>
      </section>

      <section className="bg-[#0d2931] px-5 py-20 text-white sm:px-8 lg:px-14 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-6 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
            <h2 className="text-5xl font-black uppercase leading-[.9] tracking-[-.055em] sm:text-7xl">Galería del listing.</h2>
            <p className="max-w-2xl text-lg font-semibold leading-8 text-white/70">Una secuencia pensada para que el huésped entienda valor, uso y deseo antes de leer la descripción.</p>
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