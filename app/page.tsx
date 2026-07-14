import BookingModal from "@/components/BookingModal";
import ChatPopup from "@/components/ChatPopup";
import AlburyStorySections from "@/components/AlburyStorySections";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import HeroImmersive from "@/components/HeroImmersive";
import InvestmentSolutions from "@/components/InvestmentSolutions";
import PropertyStats from "@/components/PropertyStats";
import ScrollPropertyTour from "@/components/ScrollPropertyTour";
import ServicesFAQ from "@/components/ServicesFAQ";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import TeamSection from "@/components/TeamSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-charcoal text-warm-white">
      <SiteHeader />
      <HeroImmersive />
      <AlburyStorySections />
      <ServicesFAQ />
      <PropertyStats />
      <InvestmentSolutions />
      <TeamSection />
      <TestimonialsSection />
      <ScrollPropertyTour />
      <FinalCTA />
      <FAQSection />
      <SiteFooter />
      <ChatPopup />
      <BookingModal />
    </main>
  );
}


