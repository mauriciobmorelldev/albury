import BookingModal from "@/components/BookingModal";
import ChatPopup from "@/components/ChatPopup";
import ImmersivePortfolio from "@/components/ImmersivePortfolio";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function PortfolioPage() {
  return (
    <main className="site-shell-luxury min-h-screen overflow-hidden bg-[#0f0d0c] text-[#f3ede4]">
      <SiteHeader />
      <ImmersivePortfolio />
      <SiteFooter />
      <ChatPopup />
      <BookingModal />
    </main>
  );
}