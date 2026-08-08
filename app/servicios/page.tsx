import BookingModal from "@/components/BookingModal";
import ChatPopup from "@/components/ChatPopup";
import { ServicesLanding } from "@/components/EditorialLandings";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function ServicesPage() {
  return <main className="site-shell-luxury min-h-screen overflow-hidden"><SiteHeader /><ServicesLanding /><SiteFooter /><ChatPopup /><BookingModal /></main>;
}
