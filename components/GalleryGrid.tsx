import { alburyRenders } from "@/data/propertyScenes";

export default function GalleryGrid() {
  return (
    <section id="portfolio" className="bg-charcoal px-5 pb-24 pt-36 text-warm-white sm:px-8 lg:px-14 lg:pb-32 lg:pt-44">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-xs font-black uppercase tracking-[.22em] text-soft-gold">Render portfolio</p>
            <h2 className="max-w-4xl text-6xl font-black leading-[.9] tracking-[-.03em] sm:text-8xl">Una propiedad que se entiende en imágenes.</h2>
          </div>
          <p className="max-w-sm text-base font-semibold leading-8 text-warm-white/68">Cada render está pensado como argumento de venta: descanso, amenities, capacidad, juego, trabajo y primera impresión.</p>
        </div>

        <div className="grid auto-rows-[330px] gap-5 md:grid-cols-6">
          {alburyRenders.map((render, index) => (
            <article
              key={render.image}
              className={`group relative overflow-hidden rounded-[30px] bg-stone ${
                index === 0 || index === 1 || index === 8 ? "md:col-span-3 md:row-span-2" :
                index === 6 || index === 10 || index === 14 ? "md:col-span-4" : "md:col-span-2"
              }`}
            >
              <div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${render.image}')` }} />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(18,79,89,.78),rgba(18,79,89,0)_58%)]" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs font-black uppercase tracking-[.18em] text-soft-gold">{render.label}</p>
                <div className="mt-3 flex items-end justify-between gap-4">
                  <h3 className="text-4xl font-black uppercase leading-none tracking-[-.03em] text-warm-white">{render.title}</h3>
                  <span className="rounded-full bg-soft-gold px-4 py-2 text-xs font-black uppercase tracking-[.12em] text-charcoal">{render.metric}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

