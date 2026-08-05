import AlburyCommercialHome from "@/components/AlburyCommercialHome";
import BookingModal from "@/components/BookingModal";
import ChatPopup from "@/components/ChatPopup";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf7ef] text-[#1f1b18]">
      <SiteHeader />
      <AlburyCommercialHome />
      <SiteFooter />
      <ChatPopup />
      <BookingModal />
    </main>
  );
}
