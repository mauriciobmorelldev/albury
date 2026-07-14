import ChatPopup from "@/components/ChatPopup";
import FinalCTA from "@/components/FinalCTA";
import GalleryGrid from "@/components/GalleryGrid";
import SiteHeader from "@/components/SiteHeader";

export default function PortfolioPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-charcoal text-warm-white">
      <SiteHeader />
      <GalleryGrid />
      <FinalCTA />
      <ChatPopup />
    </main>
  );
}


