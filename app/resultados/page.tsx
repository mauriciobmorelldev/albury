import BookingModal from "@/components/BookingModal";
import ChatPopup from "@/components/ChatPopup";
import { ResultsLanding } from "@/components/EditorialLandings";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function ResultsPage() {
  return <main className="site-shell-luxury min-h-screen overflow-hidden"><SiteHeader /><ResultsLanding /><SiteFooter results /><ChatPopup /><BookingModal /></main>;
}
