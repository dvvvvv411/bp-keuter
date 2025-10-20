import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { MobileHeader } from "@/components/MobileHeader";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import WerWirSind from "./pages/WerWirSind";
import WoWirSind from "./pages/WoWirSind";
import Transformation from "./pages/Transformation";
import ProdukteServices from "./pages/ProdukteServices";
import Presse from "./pages/Presse";
import Karriere from "./pages/Karriere";
import Raffinerien from "./pages/Raffinerien";
import Menschenrechte from "./pages/Menschenrechte";
import Kontakt from "./pages/Kontakt";
import Standorte from "./pages/Standorte";
import Seitenindex from "./pages/Seitenindex";
import Datenschutz from "./pages/Datenschutz";
import Impressum from "./pages/Impressum";
import CookieEinstellungen from "./pages/CookieEinstellungen";
import Nutzungsbedingungen from "./pages/Nutzungsbedingungen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider defaultOpen={true}>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <main className="flex-1 overflow-auto lg:pl-16 xl:pl-20">
                <MobileHeader />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/wer-wir-sind" element={<WerWirSind />} />
                  <Route path="/wo-wir-sind" element={<WoWirSind />} />
                  <Route path="/transformation" element={<Transformation />} />
                  <Route path="/produkte-services" element={<ProdukteServices />} />
                  <Route path="/presse" element={<Presse />} />
                  <Route path="/karriere" element={<Karriere />} />
                  <Route path="/raffinerien" element={<Raffinerien />} />
                  <Route path="/menschenrechte" element={<Menschenrechte />} />
                  <Route path="/kontakt" element={<Kontakt />} />
                  <Route path="/standorte" element={<Standorte />} />
                  <Route path="/seitenindex" element={<Seitenindex />} />
                  <Route path="/datenschutz" element={<Datenschutz />} />
                  <Route path="/impressum" element={<Impressum />} />
                  <Route path="/cookie-einstellungen" element={<CookieEinstellungen />} />
                  <Route path="/nutzungsbedingungen" element={<Nutzungsbedingungen />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
