import { NavLink } from "react-router-dom";
import bpLogo from "@/assets/bp-logo.svg";
import ortLogo from "@/assets/ort-logo.png";
import raffinierieIcon from "@/assets/raffinierie-outline-icon.avif";
import peopleCareIcon from "@/assets/people-care.avif";
import briefumschlagIcon from "@/assets/bp-icon-briefumschlag.avif";
import standortIcon from "@/assets/standort.svg";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Home", url: "/", external: false },
  { title: "Wer wir sind", url: "https://www.bp.com/de_de/germany/home/wer-wir-sind/bp-gruppe/unsere-werte-und-kultur/unsere-uberzeugungen-und-verhaltenskodex.html", external: true },
  { title: "Wo wir sind", url: "https://www.bp.com/de_de/germany/home/wo-wir-sind.html", external: true },
  { title: "Unsere Transformation", url: "https://www.bp.com/de_de/germany/home/unsere-transformation/globale-strategie.html", external: true },
  { title: "Produkte & Services", url: "https://www.bp.com/de_de/germany/home/produkte-services.html", external: true },
  { title: "Presse", url: "https://www.bp.com/de_de/germany/home/presse/pressemeldungen.html", external: true },
  { title: "Karriere", url: "https://www.bp.com/de_de/germany/home/karriere.html", external: true },
];

const footerItems = [
  { title: "Unsere Raffinerien", url: "https://www.bp.com/de_de/germany/home/wo-wir-sind.html", icon: raffinierieIcon, external: true },
  { title: "Menschenrechte und Umweltschutz", url: "https://www.bp.com/de/global/bp-europa-se/MenschenrechteundUmweltschutz.html", icon: peopleCareIcon, external: true },
  { title: "Kontakt", url: "https://kontakt.meinbp.de/", icon: briefumschlagIcon, external: true },
  { title: "Adressen & Standorte", url: "https://kontakt.meinbp.de/?category=145125&title=Adressen+%2526+Standorte", icon: standortIcon, external: true },
];

export function AppSidebar() {
  return (
    <Sidebar className="w-72 border-r border-sidebar-border bg-sidebar-background flex flex-col hidden lg:flex" collapsible="offcanvas">
      <NavLink to="/" className="p-6 flex flex-col items-center shrink-0">
        <img src={bpLogo} alt="BP Logo" className="h-24 mb-4" />
        <p className="text-[#007f00] font-thin text-xl text-center">Deutschland</p>
      </NavLink>

      <SidebarContent className="py-4 flex-1 overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.external ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:bg-[#0ec30e] hover:text-white text-base px-6 py-3 leading-relaxed w-full block"
                    >
                      <span className="whitespace-normal break-words">{item.title}</span>
                    </a>
                  ) : (
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"}
                      className={({ isActive }) =>
                        isActive 
                          ? "text-black text-base hover:bg-[#0ec30e] hover:text-white px-6 py-3 leading-relaxed w-full block" 
                          : "text-black hover:bg-[#0ec30e] hover:text-white text-base px-6 py-3 leading-relaxed w-full block"
                      }
                    >
                      <span className="whitespace-normal break-words">{item.title}</span>
                    </NavLink>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Ort Logo über dem Footer */}
      <div className="px-6 py-4 flex justify-center">
        <img src={ortLogo} alt="Ort" className="h-10" />
      </div>

      <SidebarFooter className="border-t border-sidebar-border py-3 shrink-0 mt-auto">
        <SidebarMenu>
          {footerItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              {item.external ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sidebar-foreground hover:bg-[#00c7ff] hover:text-white text-sm px-6 py-2.5 leading-snug w-full flex items-center gap-2"
                >
                  <img src={item.icon} alt="" className="h-8 w-8 shrink-0" />
                  <span className="whitespace-normal break-words">{item.title}</span>
                </a>
              ) : (
                <NavLink 
                  to={item.url}
                  className={({ isActive }) =>
                    isActive 
                      ? "text-sidebar-accent-foreground font-semibold text-sm hover:bg-[#00c7ff] hover:text-white px-6 py-2.5 leading-snug w-full flex items-center gap-2" 
                      : "text-sidebar-foreground hover:bg-[#00c7ff] hover:text-white text-sm px-6 py-2.5 leading-snug w-full flex items-center gap-2"
                  }
                >
                  <img src={item.icon} alt="" className="h-8 w-8 shrink-0" />
                  <span className="whitespace-normal break-words">{item.title}</span>
                </NavLink>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
