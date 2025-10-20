import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#f7f7f7] border-t border-gray-200 py-8 px-6 md:px-12 lg:px-16" role="contentinfo">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <p className="text-base font-semibold text-[#999999] mb-1">BP p.l.c.</p>
            <p className="text-sm text-gray-600 mb-2">Vertriebspartner: Viktor Ort</p>
            <p className="text-sm text-gray-600">Copyright © 1996 – 2025</p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2">
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <li>
                <a 
                  className="text-base text-gray-700 hover:text-primary transition-colors" 
                  href="/seitenindex"
                >
                  Seitenindex
                </a>
              </li>
              <li>
                <a 
                  className="text-base text-gray-700 hover:text-primary transition-colors" 
                  href="/datenschutz"
                >
                  Datenschutzerklärung
                </a>
              </li>
              <li>
                <a 
                  className="text-base text-gray-700 hover:text-primary transition-colors" 
                  href="/impressum"
                >
                  Impressum
                </a>
              </li>
              <li>
                <a 
                  className="text-base text-gray-700 hover:text-primary transition-colors" 
                  href="/kontakt"
                >
                  Kontakt
                </a>
              </li>
              <li>
                <a 
                  className="text-base text-gray-700 hover:text-primary transition-colors" 
                  href="/cookie-einstellungen"
                >
                  Cookie-Einstellungen
                </a>
              </li>
              <li>
                <a 
                  className="text-base text-gray-700 hover:text-primary transition-colors" 
                  href="/nutzungsbedingungen"
                >
                  Nutzungsbedingungen
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="pt-6">
          <p className="text-base font-normal text-[#999999] mb-4">Verbinden Sie sich mit uns:</p>
          <ul className="flex gap-4">
            <li>
              <a 
                className="inline-flex items-center hover:text-primary transition-colors" 
                href="https://www.facebook.com/bpindeutschland" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-[#999999]" fill="currentColor" />
              </a>
            </li>
            <li>
              <a 
                className="inline-flex items-center hover:text-primary transition-colors" 
                href="https://twitter.com/bp_deutschland?lang=de" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-[#999999]" fill="currentColor" />
              </a>
            </li>
            <li>
              <a 
                className="inline-flex items-center hover:text-primary transition-colors" 
                href="https://www.linkedin.com/company/bp" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-[#999999]" fill="currentColor" />
              </a>
            </li>
            <li>
              <a 
                className="inline-flex items-center hover:text-primary transition-colors" 
                href="https://www.youtube.com/bp" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5 text-[#999999]" fill="currentColor" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
