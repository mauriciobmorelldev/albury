export type ProjectMetric = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
};

export type AlburyProject = {
  slug: string;
  title: string;
  location: string;
  eyebrow: string;
  headline: string;
  summary: string;
  roiFocus: string;
  heroImage: string;
  palette: string;
  metrics: ProjectMetric[];
  strategy: string[];
  gallery: Array<{
    src: string;
    alt: string;
    label: string;
    wide?: boolean;
  }>;
};

export const alburyProjects: AlburyProject[] = [
  {
    slug: "sa-figuereta",
    title: "Sa Figuereta",
    location: "Mediterranean STR",
    eyebrow: "Privacidad · calma · estadía premium",
    headline: "Un exterior que convierte la primera mirada en deseo de reserva.",
    summary:
      "Sa Figuereta se enfoca en un huésped que busca privacidad, calma y una estadía premium sin sentirse fría. El diseño prioriza exteriores fotografiables, interiores cálidos y detalles fáciles de percibir desde el listing.",
    roiFocus: "Valor percibido",
    heroImage: "/zip-assets/properties/sa-figuereta-pool-1.webp",
    palette: "from-[#f3b3a3]/55 via-[#fbf7ef] to-[#dff2f5]",
    metrics: [
      { label: "Ingresos anuales", value: 168, prefix: "$", suffix: "K" },
      { label: "Ocupación", value: 72, suffix: "%" },
      { label: "ADR objetivo", value: 640, prefix: "$" },
      { label: "Rating objetivo", value: 4.9, suffix: "/5" },
    ],
    strategy: [
      "Exteriores como gancho principal del anuncio.",
      "Secuencia visual cálida para subir valor percibido.",
      "Momentos de descanso que justifican tarifa premium.",
      "Galería pensada como recorrido de decisión, no como álbum decorativo.",
    ],
    gallery: [
      { src: "/zip-assets/properties/sa-figuereta-pool-1.webp", alt: "Piscina exterior de Sa Figuereta", label: "Pool hook", wide: true },
      { src: "/zip-assets/properties/sa-figuereta-pool-2.webp", alt: "Exterior premium de Sa Figuereta", label: "Outdoor value" },
      { src: "/zip-assets/properties/sa-figuereta-82.webp", alt: "Living de Sa Figuereta", label: "Warm interior" },
      { src: "/zip-assets/properties/sa-figuereta-83.webp", alt: "Interior de Sa Figuereta", label: "Guest flow", wide: true },
      { src: "/zip-assets/properties/sa-figuereta-103.webp", alt: "Detalle de piscina Sa Figuereta", label: "Booking desire" },
      { src: "/zip-assets/properties/sa-figuereta-108.webp", alt: "Detalle decorativo Sa Figuereta", label: "Visual proof" },
    ],
  },
  {
    slug: "st-agustin",
    title: "St Agustin",
    location: "Firepit STR concept",
    eyebrow: "Social anchor · estadías memorables · reservas",
    headline: "Un concepto pensado para que el huésped imagine la experiencia antes de llegar.",
    summary:
      "St Agustin trabaja la propiedad como una secuencia de momentos: llegada, reunión, descanso y fotografía. La prioridad es que cada ambiente explique por qué vale más que un listing promedio.",
    roiFocus: "Reservas",
    heroImage: "/zip-assets/properties/st-agustin-hero-firepit.webp",
    palette: "from-[#236f7e]/30 via-[#fffaf2] to-[#f3b3a3]/60",
    metrics: [
      { label: "Ingresos anuales", value: 142, prefix: "$", suffix: "K" },
      { label: "Ocupación", value: 68, suffix: "%" },
      { label: "ADR objetivo", value: 575, prefix: "$" },
      { label: "Rating objetivo", value: 4.8, suffix: "/5" },
    ],
    strategy: [
      "Firepit y exteriores como escena emocional de venta.",
      "Amenities que agregan motivos concretos para reservar.",
      "Paleta cálida para diferenciarse sin perder amplitud.",
      "Dirección visual preparada para fotografía y lanzamiento.",
    ],
    gallery: [
      { src: "/zip-assets/properties/st-agustin-hero-firepit.webp", alt: "Firepit de St Agustin", label: "Hero moment", wide: true },
      { src: "/zip-assets/properties/st-agustin-01.webp", alt: "Exterior de St Agustin", label: "Arrival" },
      { src: "/zip-assets/properties/st-agustin-02.webp", alt: "Amenity exterior de St Agustin", label: "Experience" },
      { src: "/zip-assets/properties/st-agustin-03.webp", alt: "Detalle de St Agustin", label: "Listing scene", wide: true },
      { src: "/zip-assets/properties/st-agustin-04.webp", alt: "Detalle final de St Agustin", label: "Ready to book" },
    ],
  },
];

export function getAlburyProject(slug: string) {
  return alburyProjects.find((project) => project.slug === slug);
}