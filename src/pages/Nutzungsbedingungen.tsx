import { useEffect } from "react";

const Nutzungsbedingungen = () => {
  useEffect(() => {
    window.location.replace("https://www.bp.com/de_de/germany/home/nutzungsbedingungen.html");
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground mb-4">Weiterleitung zu BP Deutschland...</p>
        <a 
          href="https://www.bp.com/de_de/germany/home/nutzungsbedingungen.html" 
          className="text-primary hover:underline inline-block"
        >
          Falls die Weiterleitung nicht funktioniert, klicken Sie hier
        </a>
      </div>
    </div>
  );
};

export default Nutzungsbedingungen;
