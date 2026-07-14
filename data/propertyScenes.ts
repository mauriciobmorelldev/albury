export type PropertyScene = {
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  camera: {
    scale: number;
    x: number;
    y: number;
  };
};

export type AlburyRender = {
  title: string;
  label: string;
  image: string;
  metric: string;
};

export const alburyRenders: AlburyRender[] = [
  { title: "Living Entry", label: "First impression", image: "/renders/albury/web/living-entry.jpg", metric: "Arrival" },
  { title: "Welcome Lounge", label: "Guest hook", image: "/renders/albury/web/welcome-lounge.jpg", metric: "Signature" },
  { title: "Dining Lounge", label: "Warmth", image: "/renders/albury/web/dining-lounge.jpg", metric: "Flow" },
  { title: "Game Room", label: "Amenity value", image: "/renders/albury/web/game-room-wide.jpg", metric: "Play" },
  { title: "Primary Bedroom", label: "Rest", image: "/renders/albury/web/primary-bedroom.jpg", metric: "Sleep" },
  { title: "Soft Bedroom", label: "Comfort", image: "/renders/albury/web/bedroom-soft.jpg", metric: "Calm" },
  { title: "Bunk Room", label: "Capacity", image: "/renders/albury/web/bunk-room.jpg", metric: "Groups" },
  { title: "Cinema Room", label: "Entertainment", image: "/renders/albury/web/cinema-room.jpg", metric: "Movie" },
  { title: "Media Lounge", label: "Night mode", image: "/renders/albury/web/media-lounge.jpg", metric: "Stay" },
  { title: "Neon Game Room", label: "Memory point", image: "/renders/albury/web/game-room-neon.jpg", metric: "Wow" },
  { title: "Pool Table", label: "Social anchor", image: "/renders/albury/web/pool-table.jpg", metric: "Fun" },
  { title: "Bedroom View", label: "Light", image: "/renders/albury/web/bedroom-view.jpg", metric: "View" },
  { title: "Bedroom Desk", label: "Work-ready", image: "/renders/albury/web/bedroom-desk.jpg", metric: "Remote" },
  { title: "Workspace", label: "Long stays", image: "/renders/albury/web/workspace.jpg", metric: "Focus" },
  { title: "Master Suite", label: "Premium rest", image: "/renders/albury/web/master-suite.jpg", metric: "Suite" },
];

export const propertyScenes: PropertyScene[] = [
  {
    title: "Llegada",
    eyebrow: "01 / First impression",
    description: "Una sala de bienvenida cálida y fotografiable que marca el tono de la estadía desde el primer segundo.",
    image: "/renders/albury/web/welcome-lounge.jpg",
    camera: { scale: 1.14, x: -3, y: 2 },
  },
  {
    title: "Living",
    eyebrow: "02 / Guest hook",
    description: "Texturas, madera, verde y luz natural para crear una escena que detiene el scroll y se siente habitable.",
    image: "/renders/albury/web/living-entry.jpg",
    camera: { scale: 1.16, x: 4, y: -2 },
  },
  {
    title: "Juegos",
    eyebrow: "03 / Amenity value",
    description: "Un game room con identidad propia: el tipo de amenity que aumenta deseo, permanencia y valor percibido.",
    image: "/renders/albury/web/pool-table.jpg",
    camera: { scale: 1.15, x: -2, y: -3 },
  },
  {
    title: "Cine",
    eyebrow: "04 / Night mode",
    description: "Una experiencia de entretenimiento inmersiva para grupos, familias y estadías largas.",
    image: "/renders/albury/web/media-lounge.jpg",
    camera: { scale: 1.17, x: 3, y: 3 },
  },
  {
    title: "Suite",
    eyebrow: "05 / Premium rest",
    description: "Dormitorios serenos, cálidos y listos para comunicar descanso real en cada fotografía.",
    image: "/renders/albury/web/master-suite.jpg",
    camera: { scale: 1.15, x: -2, y: 3 },
  },
  {
    title: "Capacidad",
    eyebrow: "06 / Group ready",
    description: "Habitaciones pensadas para maximizar ocupación sin perder diseño, comodidad ni carácter.",
    image: "/renders/albury/web/bunk-room.jpg",
    camera: { scale: 1.16, x: 3, y: -2 },
  },
];

export const propertyStats: Array<{ value: string; label: string }> = [
  { value: "15", label: "renders inmersivos" },
  { value: "6", label: "escenas clave" },
  { value: "4", label: "amenities visuales" },
  { value: "3", label: "zonas de descanso" },
  { value: "1", label: "game room" },
  { value: "D5", label: "visual package" },
];

