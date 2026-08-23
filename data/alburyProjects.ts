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
  facts?: Array<{
    icon: "bedrooms" | "bathrooms" | "area" | "type";
    label: string;
    value: string;
  }>;
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
    facts: [
      { icon: "bedrooms", label: "Dormitorios", value: "6 dormitorios" },
      { icon: "bathrooms", label: "Baños", value: "8 baños" },
      { icon: "area", label: "Superficie", value: "400 m²" },
      { icon: "type", label: "Tipo", value: "Casa" },
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
    facts: [
      { icon: "bedrooms", label: "Dormitorios", value: "4 dormitorios" },
      { icon: "bathrooms", label: "Baños", value: "3 baños" },
      { icon: "type", label: "Experiencia", value: "Exterior experiencial" },
      { icon: "type", label: "Perfil", value: "Zona familiar" },
    ],
    gallery: [
      { src: "/zip-assets/properties/st-agustin-hero-firepit.webp", alt: "Firepit de St Agustin", label: "Hero moment", wide: true },
      { src: "/zip-assets/properties/st-agustin-01.webp", alt: "Exterior de St Agustin", label: "Arrival" },
      { src: "/zip-assets/properties/st-agustin-02.webp", alt: "Amenity exterior de St Agustin", label: "Experience" },
      { src: "/zip-assets/properties/st-agustin-03.webp", alt: "Detalle de St Agustin", label: "Listing scene", wide: true },
      { src: "/zip-assets/properties/st-agustin-04.webp", alt: "Detalle final de St Agustin", label: "Ready to book" },
    ],
  },
  {
    slug: "hot-springs-str",
    title: "Hot Springs STR",
    location: "Hot Springs, Arkansas",
    eyebrow: "Naturaleza · amenidades · escapada premium",
    headline: "Una estadía diseñada para vender el destino antes de mostrar cada habitación.",
    summary:
      "Hot Springs STR organiza la experiencia alrededor del paisaje, las amenidades exteriores y los momentos compartidos. La propiedad comunica descanso, conexión y valor desde la primera imagen del listing.",
    roiFocus: "Experiencia exterior",
    heroImage: "/milanote-assets/WhatsApp Image 2026-08-07 at 9.48.41 PM (1).jpeg",
    palette: "from-[#5b4a2d]/45 via-[#f5efe3] to-[#9cae83]/45",
    metrics: [
      { label: "Ingresos anuales", value: 250.8, prefix: "$", suffix: "K" },
      { label: "Ocupación", value: 69, suffix: "%" },
      { label: "ADR objetivo", value: 996, prefix: "$" },
      { label: "Rating objetivo", value: 4.98, suffix: "/5" },
    ],
    strategy: [
      "Paisaje y amenidades como primer argumento de reserva.",
      "Escenas exteriores que extienden la experiencia más allá de la casa.",
      "Secuencia visual enfocada en descanso, reunión y escapada.",
      "Dirección de fotografía preparada para comunicar valor premium.",
    ],
    gallery: [
      { src: "/milanote-assets/WhatsApp Image 2026-08-07 at 9.48.41 PM (1).jpeg", alt: "Exterior premium de Hot Springs STR", label: "Destination hook", wide: true },
      { src: "/milanote-assets/WhatsApp Image 2026-08-07 at 9.48.39 PM.jpeg", alt: "Muelle y lago de Hot Springs STR", label: "Lake experience" },
      { src: "/milanote-assets/WhatsApp Image 2026-08-07 at 9.48.40 PM.jpeg", alt: "Pérgola exterior de Hot Springs STR", label: "Outdoor pause" },
      { src: "/milanote-assets/WhatsApp Image 2026-08-07 at 9.48.41 PM.jpeg", alt: "Llegada a Hot Springs STR", label: "Arrival story", wide: true },
      { src: "/milanote-assets/WhatsApp Image 2026-08-07 at 9.49.06 PM (1).jpeg", alt: "Amenity de Hot Springs STR", label: "Premium amenity" },
    ],
  },
];

export function getAlburyProject(slug: string) {
  return alburyProjects.find((project) => project.slug === slug);
}
