import BookingModal from "@/components/BookingModal";
import ChatPopup from "@/components/ChatPopup";
import CommercialFunnel from "@/components/CommercialFunnel";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import HeroImmersive from "@/components/HeroImmersive";
import InvestmentSolutions from "@/components/InvestmentSolutions";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-charcoal text-warm-white">
      <SiteHeader />
      <HeroImmersive />
      <CommercialFunnel />
      <InvestmentSolutions />
      <FinalCTA />
      <FAQSection />
      <SiteFooter />
      <ChatPopup />
      <BookingModal />
    </main>
  );
}
