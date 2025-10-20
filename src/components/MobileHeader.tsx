import { Menu } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import bpLogo from "@/assets/bp-logo.svg";
import ortLogo from "@/assets/ort-logo.png";
import { useLocation } from "react-router-dom";

export function MobileHeader() {
  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Nur auf Mobile anzeigen
  if (!isMobile) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="flex h-16 items-center px-4">
        {/* Hamburger Menu - Links */}
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6 text-gray-700" />
        </button>

        {/* BP & Ort Logos - Mittig (nur auf Homepage) */}
        {isHomePage && (
          <div className="flex-1 flex justify-center items-center gap-4">
            <img src={bpLogo} alt="BP Logo" className="h-14" />
            <img src={ortLogo} alt="Ort" className="h-10" />
          </div>
        )}

        {/* Platzhalter rechts für symmetrisches Layout */}
        <div className="w-10"></div>
      </div>
    </header>
  );
}
