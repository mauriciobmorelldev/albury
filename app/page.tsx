import AlburyHomeCover from "@/components/AlburyHomeCover";
import BookingModal from "@/components/BookingModal";
import ChatPopup from "@/components/ChatPopup";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function Home() {
  return (
    <main className="site-shell-luxury min-h-screen overflow-hidden bg-[#100e0d] text-[#f4eee5]">
      <SiteHeader />
      <AlburyHomeCover />
      <SiteFooter />
      <ChatPopup />
      <BookingModal />
    </main>
  );
}
