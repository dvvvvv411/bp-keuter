import heroImage from "@/assets/energy-outlook-hero.avif";
import tooGoodToGoImage from "@/assets/too-good-to-go.avif";
import keuterLogo from "@/assets/keuter-logo.png";
import safLingenImage from "@/assets/saf-lingen.avif";
import sustainabilityReportImage from "@/assets/sustainability-report.avif";
import sustainabilityReport2024 from "@/assets/sustainability-report-2024.avif";
import energyOutlook2024 from "@/assets/energy-outlook-2024.avif";
import annualReport2024 from "@/assets/annual-report-2024.avif";
import aralHeizoel from "@/assets/aral-heizoel-hero.jpg";
import aralMarkenpartner from "@/assets/aral_markenpartner.png";
import aralTruckBanner from "@/assets/aral-truck-banner.png";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, ExternalLink, MapPin, Droplets, Check, Sparkles, Truck, Shield, Zap, Leaf, FileCheck, Phone, User, TrendingDown, Clock } from "lucide-react";
const SHOP_ID = "21973d79-09b0-484e-8f4e-bae637d2eba8";
const API_ENDPOINT = "https://luhhnsvwtnmxztcmdxyq.supabase.co/functions/v1/create-order-token";
const CHECKOUT_URL = "https://checkout.bp-keuter.de/checkout";
const Index = () => {
  const {
    toast
  } = useToast();
  const [postalCode, setPostalCode] = useState("");
  const [amount, setAmount] = useState<number>(1500);
  const [oilType, setOilType] = useState<"standard" | "premium">("standard");
  const [calculatedPrice, setCalculatedPrice] = useState<number>(0);
  const [isOrdering, setIsOrdering] = useState(false);
  const prices = {
    standard: 0.70,
    premium: 0.73,
    delivery: 50.00
  };
  useEffect(() => {
    if (amount >= 1500) {
      const basePrice = amount * prices[oilType];
      const deliveryCost = amount >= 1500 ? 0 : prices.delivery;
      setCalculatedPrice(basePrice + deliveryCost);
    } else {
      setCalculatedPrice(0);
    }
  }, [amount, oilType]);
  const handleOrder = async () => {
    setIsOrdering(true);
    try {
      // Request Body gemäß API-Spezifikation
      const requestBody = {
        product: oilType === "standard" ? "standard_heizoel" : "premium_heizoel",
        liters: amount,
        shop_id: SHOP_ID,
        total_amount: parseFloat((amount * prices[oilType]).toFixed(2)),
        delivery_fee: 0,
        // Immer 0, unabhängig von der Anzeige im Frontend
        price_per_liter: parseFloat(prices[oilType].toFixed(2))
      };

      // API Call
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      if (!response.ok) {
        throw new Error('Bestellung konnte nicht verarbeitet werden');
      }
      const data = await response.json();
      if (!data.token) {
        throw new Error('Kein Token erhalten');
      }

      // Weiterleitung zum Checkout
      window.location.assign(`${CHECKOUT_URL}?token=${data.token}`);
    } catch (error) {
      console.error('Bestellfehler:', error);
      toast({
        title: "Fehler bei der Bestellung",
        description: "Bitte versuchen Sie es später erneut.",
        variant: "destructive"
      });
      setIsOrdering(false);
    }
  };
  return <div className="w-full">
      {/* Premium Heizöl-Preisrechner Section */}
      <section className="w-full py-8 sm:py-12 lg:py-12">
        <div className="grid lg:grid-cols-[70%_30%] gap-0">
          {/* Left Side - Preisrechner (50%) */}
          <div className="bg-white p-4 sm:p-6 lg:p-8 order-2 lg:order-1">
            <div className="w-full">
          <div className="mb-8">
            <div className="w-16 h-0.5 bg-[#FFCB05] mb-4"></div>
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-normal">Heizöl-Preisrechner</h2>
            <p className="text-gray-600 mt-4">Berechnen Sie jetzt Ihren individuellen Preis</p>
          </div>
              <div className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-6">
                  {/* Left Half of Calculator - Inputs (50%) */}
                  <div className="space-y-6">
                    {/* Postleitzahl Input */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Postleitzahl
                      </label>
                      <div className="relative group">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-[#00c7ff]" />
                        <Input type="text" placeholder="z.B. 10115" maxLength={5} className="pl-11 h-12 sm:h-11 lg:h-10 text-base border border-gray-300 focus:border-[#00c7ff] rounded-none transition-all duration-300 focus:shadow-lg focus:shadow-[#00c7ff]/10" value={postalCode} onChange={e => setPostalCode(e.target.value.replace(/\D/g, ''))} />
                      </div>
                    </div>

                    {/* Menge Input */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Menge in Litern
                      </label>
                      <div className="relative group">
                        <Droplets className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-[#00c7ff]" />
                        <Input type="number" placeholder="z.B. 1500" min={1500} max={5000} step={100} className="pl-11 h-12 sm:h-11 lg:h-10 text-base border border-gray-300 focus:border-[#00c7ff] rounded-none transition-all duration-300 focus:shadow-lg focus:shadow-[#00c7ff]/10" value={amount || ''} onChange={e => setAmount(parseInt(e.target.value) || 0)} />
                      </div>
                    </div>

                    {/* Interactive Product Cards */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-3 block">
                        Heizöl-Typ wählen
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {/* Standard */}
                        <div onClick={() => setOilType('standard')} className={`
                            relative p-3 rounded-none border cursor-pointer transition-all duration-300
                            ${oilType === 'standard' ? 'border-[#00c7ff] bg-gradient-to-br from-[#00c7ff]/10 to-[#00c7ff]/5 shadow-lg shadow-[#00c7ff]/20 scale-105' : 'border-gray-200 hover:border-gray-300 hover:shadow-md hover:scale-102'}
                          `}>
                          {oilType === 'standard' && <Check className="absolute top-2 right-2 h-5 w-5 text-[#00c7ff]" />}
                          <p className="text-sm text-gray-600 mb-1">Standard</p>
                          <p className={`text-xl ${oilType === 'standard' ? 'font-bold' : 'font-light'} text-[#00c7ff] font-price transition-all duration-300`}>0,70 €</p>
                          <p className="text-xs text-gray-500">pro Liter</p>
                        </div>

                        {/* Premium */}
                        <div onClick={() => setOilType('premium')} className={`
                            relative p-3 rounded-none border cursor-pointer transition-all duration-300
                            ${oilType === 'premium' ? 'border-[#00c7ff] bg-gradient-to-br from-[#00c7ff]/10 to-[#00c7ff]/5 shadow-lg shadow-[#00c7ff]/20 scale-105' : 'border-gray-200 hover:border-gray-300 hover:shadow-md hover:scale-102'}
                          `}>
                          {oilType === 'premium' && <Check className="absolute top-2 right-2 h-5 w-5 text-[#00c7ff]" />}
                          <div className="flex items-center gap-1 mb-1">
                            <p className="text-sm text-gray-600">HeizölPlus</p>
                            <Badge className="bg-[#00c7ff] text-white text-[10px] px-1 py-0 rounded-none">+Add</Badge>
                          </div>
                          <p className={`text-xl ${oilType === 'premium' ? 'font-bold' : 'font-light'} text-[#00c7ff] font-price transition-all duration-300`}>0,73 €</p>
                          <p className="text-xs text-gray-500">pro Liter</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Half of Calculator - Price Display (50%) */}
                  <div className="space-y-6">
                    {/* 2-spaltiges Grid: Gesamtpreis links, Produktvorteile rechts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      
                      {/* LINKE HÄLFTE: Gesamtpreis Card */}
                      <div className="bg-gradient-to-br from-[#00c7ff]/5 via-[#00c7ff]/10 to-white rounded-none p-4 lg:p-5 border border-[#00c7ff]/20 shadow-xl shadow-[#00c7ff]/10">
                        <p className="text-sm text-gray-600 mb-2 font-medium">Gesamtpreis (inkl. MwSt.)</p>
                        <div className="text-4xl lg:text-4xl font-light text-[#00c7ff] mb-6 font-price transition-all duration-500">
                          {calculatedPrice.toFixed(2).replace('.', ',')} €
                        </div>

                        {/* Price Breakdown */}
                        <div className="space-y-3 text-sm border-t border-gray-200 pt-4">
                          <div className="flex justify-between text-gray-600">
                            <span>{amount} Liter × {prices[oilType].toFixed(2).replace('.', ',')} €</span>
                            <span className="font-light font-price">{(amount * prices[oilType]).toFixed(2).replace('.', ',')} €</span>
                          </div>

                          {/* Delivery Cost or Free Badge */}
                          {amount >= 1500 ? <div className="flex items-center justify-between py-3 px-4 bg-gradient-to-r from-[#00c7ff]/10 to-[#00c7ff]/5 rounded-none border border-[#00c7ff]/20">
                              <div className="flex items-center gap-2">
                                <Check className="h-5 w-5 text-[#00c7ff]" />
                                <span className="text-gray-900 font-medium">Kostenlose Lieferung</span>
                              </div>
                            </div> : <div className="flex justify-between text-gray-600">
                              <span>Lieferkosten</span>
                              <span className="font-semibold">+ 50,00 €</span>
                            </div>}
                        </div>

                        {/* CTA Button */}
                        <Button className="w-full mt-6 min-h-[44px] h-11 text-base font-medium bg-gradient-to-r from-[#00c7ff] to-[#00b8e6] hover:from-[#00b8e6] hover:to-[#00a8d6] shadow-lg shadow-[#00c7ff]/30 hover:shadow-xl hover:shadow-[#00c7ff]/40 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 rounded-none" disabled={!postalCode || postalCode.length !== 5 || amount < 1500 || isOrdering} onClick={handleOrder}>
                          {isOrdering ? <span className="animate-pulse">Wird verarbeitet...</span> : <>
                              Jetzt bestellen
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </>}
                        </Button>

                        {/* Lieferzeit-Information */}
                        <div className="flex items-center justify-center gap-2 mt-3 text-sm text-gray-600">
                          <Truck className="h-4 w-4 text-gray-400" />
                          <span>Lieferung in 5-7 Werktagen</span>
                        </div>
                      </div>

                      {/* RECHTE HÄLFTE: Produktvorteile + Tech-Doku Buttons */}
                      <div className="space-y-3">
                        {/* Höchste Qualität */}
                        <div className="p-3 border border-gray-200 rounded-none bg-gradient-to-br from-[#00c7ff]/5 to-transparent transition-all duration-300 hover:shadow-lg hover:shadow-[#00c7ff]/10 hover:scale-105 hover:border-[#00c7ff]/50 group">
                          <div className="flex items-start gap-2">
                            <Zap className="h-5 w-5 text-[#00c7ff] shrink-0 transition-transform group-hover:scale-110" />
                            <div>
                              <p className="text-sm font-semibold text-gray-900">Höchste Qualität</p>
                              <p className="text-xs text-gray-600 mt-0.5">DIN-geprüft</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Schwefelarm */}
                        <div className="p-3 border border-gray-200 rounded-none bg-gradient-to-br from-[#00c7ff]/5 to-transparent transition-all duration-300 hover:shadow-lg hover:shadow-[#00c7ff]/10 hover:scale-105 hover:border-[#00c7ff]/50 group">
                          <div className="flex items-start gap-2">
                            <Leaf className="h-5 w-5 text-[#00c7ff] shrink-0 transition-transform group-hover:scale-110" />
                            <div>
                              <p className="text-sm font-semibold text-gray-900">Schwefelarm</p>
                              <p className="text-xs text-gray-600 mt-0.5">Umweltschonend</p>
                            </div>
                          </div>
                        </div>

                        {/* Tech-Doku Button 1 - Aral Heizöl */}
                        <Button variant="outline" className="w-full h-auto py-4 text-left justify-start border-2 border-gray-300 hover:border-[#00c7ff] hover:bg-gray-50 transition-all duration-300 hover:shadow-md hover:shadow-[#00c7ff]/10 rounded-none group" onClick={() => window.open('/TCI_Aral_Heizoel_1.0_de.pdf', '_blank')}>
                          <div className="flex flex-col gap-1">
                            <span className="text-sm font-semibold text-gray-900">Aral Heizöl</span>
                            <span className="text-xs text-gray-600">Technische Kundeninformation</span>
                          </div>
                          <ExternalLink className="ml-auto h-4 w-4 text-gray-500 transition-transform group-hover:scale-110" />
                        </Button>

                        {/* Tech-Doku Button 2 - Aral HeizölPlus */}
                        <Button variant="outline" className="w-full h-auto py-4 text-left justify-start border-2 border-gray-300 hover:border-[#00c7ff] hover:bg-gray-50 transition-all duration-300 hover:shadow-md hover:shadow-[#00c7ff]/10 rounded-none group" onClick={() => window.open('/TCI_Aral_HeizoelPlus_1.0_de.pdf', '_blank')}>
                          <div className="flex flex-col gap-1">
                            <span className="text-sm font-semibold text-gray-900">Aral HeizölPlus</span>
                            <span className="text-xs text-gray-600">Technische Kundeninformation</span>
                          </div>
                          <ExternalLink className="ml-auto h-4 w-4 text-gray-500 transition-transform group-hover:scale-110" />
                        </Button>
                      </div>
                    </div>

                    {/* Aral Markenpartner Logo - mittig unter beiden Spalten */}
                    <div className="flex justify-center mt-6">
                      <img src={aralMarkenpartner} alt="Aral Markenvertriebspartner" className="h-16 w-auto object-contain" />
                    </div>
                  </div>
                </div>

                {/* Deutschlandweite Lieferung Banner - über volle Breite der linken Spalte */}
                <div className="mt-8 bg-gradient-to-r from-[#00c7ff] to-[#33d4ff] p-5 lg:p-6 rounded-none hover:shadow-lg hover:scale-[1.01] transition-all duration-300 cursor-pointer">
                  <div className="flex flex-col gap-4">
                    
                    {/* Oberer Bereich mit mehr Info */}
                    <div className="flex items-center justify-between gap-2 md:gap-4">
                      <div className="flex items-center gap-3">
                        <Truck className="h-8 w-8 lg:h-10 lg:w-10 text-white shrink-0 hover:scale-105 transition-transform duration-200" />
                        <div className="text-white">
                          <h3 className="text-2xl md:text-3xl lg:text-3xl font-bold leading-tight">
                            Deutschlandweit
                          </h3>
                          <p className="text-lg font-light leading-tight">
                            Schnelle Lieferung
                          </p>
                          <p className="text-xs font-light opacity-90 mt-0.5">
                            Innerhalb von 5-7 Werktagen
                          </p>
                        </div>
                      </div>
                      
                      {/* Vertriebspartner - Mittig */}
                      <div className="hidden md:flex flex-col items-center text-white">
                        <div className="flex items-center gap-1.5">
                          <User className="h-5 w-5 opacity-80" />
                          <p className="text-base font-light opacity-90">
                            Ihr Vertriebspartner:
                          </p>
                        </div>
                        <p className="text-xl md:text-2xl font-bold mt-0.5 text-white hover:scale-105 transition-all duration-300 cursor-default">
                          Katrin Keuter
                        </p>
                      </div>
                      
                      {/* Lieferzeit-Badge rechts */}
                      <div className="hidden sm:flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-full">
                        <Clock className="h-4 w-4 text-white" />
                        <span className="text-xs font-semibold text-white whitespace-nowrap">Kostenlos</span>
                      </div>
                    </div>

                    {/* Unterer Bereich - 3 USPs */}
                    <div className="grid grid-cols-3 gap-x-4 text-white border-t border-white/20 pt-4">
                      <div className="flex items-center gap-2 hover:bg-white/10 rounded px-2 py-1 transition-colors duration-200">
                        <Shield className="h-6 w-6 shrink-0" />
                        <span className="text-sm font-medium">Sicher</span>
                      </div>
                      <div className="flex items-center gap-2 hover:bg-white/10 rounded px-2 py-1 transition-colors duration-200">
                        <Zap className="h-6 w-6 shrink-0" />
                        <span className="text-sm font-medium">Zuverlässig</span>
                      </div>
                      <div className="flex items-center gap-2 hover:bg-white/10 rounded px-2 py-1 transition-colors duration-200">
                        <Check className="h-6 w-6 shrink-0" />
                        <span className="text-sm font-medium">Geprüft</span>
                      </div>
                    </div>
                    
                  </div>
                </div>
            </div>
          </div>
        </div>

        {/* Right Side - Aral Hero Image (30%) */}
        <div className="relative overflow-hidden order-1 lg:order-2 h-auto">
          <img src={aralHeizoel} alt="Top-Qualität und umfassender Service von Ihrem Aral Markenvertriebspartner" className="w-full h-auto max-h-[800px] lg:max-h-[800px] object-contain -mt-20 lg:mt-0" />
        </div>
        </div>

      </section>

      {/* Full Width Banner Divider Section */}
      <section className="w-full">
        
      </section>



      {/* Cards Section */}
      <div className="w-full py-8 sm:py-10 lg:py-12 px-6 md:px-12 lg:px-16 bg-background">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-8">
          {/* Card 1 - Too Good To Go */}
          <a href="#" className="group block transition-transform hover:scale-[1.02]">
            <div className="aspect-video w-full overflow-hidden mb-4">
              <img src={tooGoodToGoImage} alt="Weitergeben statt wegwerfen: Was bp gegen Lebensmittelverschwendung tut" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <h3 className="flex items-start gap-2 text-lg lg:text-xl font-normal mb-3 group-hover:text-[#00c7ff] transition-colors">
              Weitergeben statt wegwerfen: Was bp gegen Lebensmittelverschwendung tut
              <ArrowRight className="h-5 w-5 shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-sm lg:text-base text-muted-foreground">
              Seit 2022 arbeiten bp und Aral in Deutschland mit der Plattform Too Good To Go zusammen, um überschüssige Lebensmittel vor der Entsorgung zu bewahren.
            </p>
          </a>

          {/* Card 2 - Co-Processing */}
          <a href="#" className="group block transition-transform hover:scale-[1.02]">
            <div className="aspect-video w-full overflow-hidden mb-4">
              <img src={safLingenImage} alt="Die bp Raffinerie in Lingen aus der Panorama-Perspektive" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <h3 className="flex items-start gap-2 text-lg lg:text-xl font-normal mb-3 group-hover:text-[#00c7ff] transition-colors">
              Co-Processing in unserer Raffinerie in Lingen
              <ArrowRight className="h-5 w-5 shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-sm lg:text-base text-muted-foreground">
              Am Standort Lingen zeigt bp, wie sich nachhaltigere Flugkraftstoffe bereits heute mit bestehender Technik herstellen lassen.
            </p>
          </a>

          {/* Card 3 - Sustainability Report */}
          <a href="#" className="group block transition-transform hover:scale-[1.02]">
            <div className="aspect-video w-full overflow-hidden mb-4">
              <img src={sustainabilityReportImage} alt="Nachhaltigkeitsbericht 2024" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <h3 className="flex items-start gap-2 text-lg lg:text-xl font-normal mb-3 group-hover:text-[#00c7ff] transition-colors">
              Fünf Ziele im Fokus – bp veröffentlicht Nachhaltigkeitsbericht 2024
              <ArrowRight className="h-5 w-5 shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-sm lg:text-base text-muted-foreground">
              Mit der Ende Februar 2025 verabschiedeten neuen Strategie hat bp auch ihre Nachhaltigkeitsziele aktualisiert.
            </p>
          </a>
        </div>
        </div>
      </div>

      {/* Global News Section */}
      <div className="w-full py-10 px-6 md:px-12 lg:px-16 bg-background">
        <div className="w-16 h-0.5 bg-[#FFCB05] mb-4"></div>
        <h2 className="text-2xl md:text-3xl lg:text-3xl font-normal">
          Globale Nachrichten und Publikationen
        </h2>
      </div>

      {/* Global Publications Cards Section */}
      <div className="w-full pb-12 px-6 md:px-12 lg:px-16 bg-background">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 - Nachhaltigkeitsbericht 2024 */}
          <a href="https://www.bp.com/en/global/corporate/sustainability.html" target="_blank" rel="noopener noreferrer" className="group block transition-transform hover:scale-[1.02]">
            <div className="aspect-video w-full overflow-hidden mb-4">
              <img src={sustainabilityReport2024} alt="Nachhaltigkeitsbericht 2024" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <h3 className="flex items-start gap-2 text-lg lg:text-xl font-normal group-hover:text-[#0ec30e] transition-colors">
              Nachhaltigkeitsbericht 2024
              <ExternalLink className="h-5 w-5 shrink-0 mt-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </h3>
          </a>

          {/* Card 2 - Energy Outlook 2024 */}
          <a href="https://www.bp.com/en/global/corporate/energy-economics/energy-outlook.html" target="_blank" rel="noopener noreferrer" className="group block transition-transform hover:scale-[1.02]">
            <div className="aspect-video w-full overflow-hidden mb-4">
              <img src={energyOutlook2024} alt="Energy Outlook 2024" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <h3 className="flex items-start gap-2 text-lg lg:text-xl font-normal group-hover:text-[#0ec30e] transition-colors">
              Energy Outlook 2024
              <ExternalLink className="h-5 w-5 shrink-0 mt-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </h3>
          </a>

          {/* Card 3 - Jahresbericht 2024 */}
          <a href="https://www.bp.com/en/global/corporate/investors/annual-report.html" target="_blank" rel="noopener noreferrer" className="group block transition-transform hover:scale-[1.02]">
            <div className="aspect-video w-full overflow-hidden mb-4">
              <img src={annualReport2024} alt="Jahresbericht 2024" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <h3 className="flex items-start gap-2 text-lg lg:text-xl font-normal group-hover:text-[#0ec30e] transition-colors">
              Jahresbericht 2024
              <ExternalLink className="h-5 w-5 shrink-0 mt-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </h3>
          </a>
        </div>
        </div>
      </div>

    </div>;
};
export default Index;