import AboutLanding from "@/components/AboutLanding";
import BookingModal from "@/components/BookingModal";
import ChatPopup from "@/components/ChatPopup";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function AboutPage() {
  return (
    <main className="site-shell-luxury min-h-screen overflow-hidden">
      <SiteHeader />
      <AboutLanding />
      <SiteFooter />
      <ChatPopup />
      <BookingModal />
    </main>
  );
}
