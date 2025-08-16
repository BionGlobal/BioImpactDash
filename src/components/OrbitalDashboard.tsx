import { useState } from "react";
import GlobalMap from "./GlobalMap";
import FloatingHeader from "./FloatingHeader";
import TopBar from "./TopBar"; // Importa a nova TopBar
import InteractiveGuides from "./InteractiveGuides";
import UnitCard from "./UnitCard";
import { AnimatePresence } from "framer-motion";

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
      
      {/* A camada da UI agora é um flex container vertical */}
      <div className="absolute top-0 left-0 w-full h-full p-4 md:p-8 flex flex-col gap-4 pointer-events-none">
        {/* Barra Superior */}
        <div className="pointer-events-auto">
          <TopBar />
        </div>
        
        {/* Cabeçalho Principal (Placar) */}
        <div className="pointer-events-auto">
          <FloatingHeader onUnitSelect={handleUnitSelect} />
        </div>
        
        {/* Guias Interativas (agora usam flex-grow para empurrar para baixo) */}
        <div className="flex-grow flex items-end pointer-events-auto">
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
