import { useState } from "react";
import GlobalMap from "./GlobalMap";
import BrandHeader from "./BrandHeader";
import UnitSelector from "./UnitSelector";
import GlobalKPIs from "./GlobalKPIs";
import InteractiveGuides from "./InteractiveGuides";
import UnitCard from "./UnitCard";
import { AnimatePresence } from "framer-motion";

// Mock de dados para simulação
const mockUnits = [
  { id: '1', name: 'Biosolvit Matriz', country: 'Brasil', location: 'Barra Mansa, RJ', coordinates: { lng: -44.172, lat: -22.545 } },
  { id: '2', name: 'Biogreen', country: 'Brasil', location: 'Porto Belo, SC', coordinates: { lng: -48.555, lat: -27.158 } },
  { id: '3', name: 'Bioblue Response', country: 'Brasil', location: 'Barra Mansa, RJ', coordinates: { lng: -44.172, lat: -22.545 } },
  { id: '4', name: 'Biosolvit Texas', country: 'EUA', location: 'Houston, TX', coordinates: { lng: -95.369, lat: 29.760 } },
  { id: '5', name: 'Biosolvit Portugal', country: 'Portugal', location: 'Coimbra', coordinates: { lng: -8.419, lat: 40.205 } },
];

export default function OrbitalDashboard() {
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  const handleUnitSelect = (unit: any) => {
    if (map) {
      // ### INÍCIO DA CORREÇÃO ###
      // Para qualquer animação em progresso antes de iniciar uma nova.
      // Isto garante que a animação de abertura não interfere com a seleção de unidades.
      map.stop();
      // ### FIM DA CORREÇÃO ###

      map.flyTo({
        center: unit.coordinates,
        zoom: 10,
        speed: 0.8,
        curve: 1.2,
        essential: true,
      });
    }
  };
  
  const handleIconClick = (unitId: string) => {
      setSelectedUnitId(unitId);
  }

  const selectedUnit = mockUnits.find(u => u.id === selectedUnitId);

  return (
    <main className="relative w-full h-full">
      <GlobalMap onMapLoad={setMap} />
      
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="p-6 md:p-8">
          <BrandHeader />
        </div>

        <div className="absolute top-6 right-6 md:top-8 md:right-8 pointer-events-auto">
          <UnitSelector units={mockUnits} onUnitSelect={handleUnitSelect} />
        </div>

        <div className="absolute right-6 md:right-8 top-1/2 -translate-y-1/2 pointer-events-auto">
          <GlobalKPIs />
        </div>
        
        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 pointer-events-auto">
            <InteractiveGuides />
        </div>
      </div>
      
      <AnimatePresence>
        {selectedUnit && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-auto bg-black/20 backdrop-blur-sm">
             <UnitCard unit={selectedUnit} onClose={() => setSelectedUnitId(null)} />
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
