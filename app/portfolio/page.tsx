import BookingModal from "@/components/BookingModal";
import ChatPopup from "@/components/ChatPopup";
import ImmersivePortfolio from "@/components/ImmersivePortfolio";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function PortfolioPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf7ef] text-[#0d2931]">
      <SiteHeader />
      <ImmersivePortfolio />
      <SiteFooter />
      <ChatPopup />
      <BookingModal />
    </main>
  );
}