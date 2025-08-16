import { useState } from "react";
import GlobalMap from "./GlobalMap";
import FloatingHeader from "./FloatingHeader"; // Importa o novo cabeçalho
import InteractiveGuides from "./InteractiveGuides";
import UnitCard from "./UnitCard";
import { AnimatePresence } from "framer-motion";

const mockUnits = [
  { 
    id: '1', 
    name: 'Biosolvit Matriz', 
    country: 'Brasil', 
    location: 'Barra Mansa, RJ', 
    coordinates: { lng: -44.172, lat: -22.545 },
    status: 'Operacional',
    color: 'primary' as const,
    details: {
      employees: 145,
      energy: '2.3 MW',
      efficiency: '94%',
      lastUpdate: '15 min atrás'
    }
  },
  { 
    id: '2', 
    name: 'Biogreen', 
    country: 'Brasil', 
    location: 'Porto Belo, SC', 
    coordinates: { lng: -48.555, lat: -27.158 },
    status: 'Operacional',
    color: 'secondary' as const,
    details: {
      employees: 89,
      energy: '1.8 MW',
      efficiency: '91%',
      lastUpdate: '8 min atrás'
    }
  },
  { 
    id: '3', 
    name: 'Bioblue Response', 
    country: 'Brasil', 
    location: 'Barra Mansa, RJ', 
    coordinates: { lng: -44.172, lat: -22.545 },
    status: 'Manutenção',
    color: 'accent' as const,
    details: {
      employees: 67,
      energy: '1.2 MW',
      efficiency: '88%',
      lastUpdate: '1 hora atrás'
    }
  },
  { 
    id: '4', 
    name: 'Biosolvit Texas', 
    country: 'EUA', 
    location: 'Houston, TX', 
    coordinates: { lng: -95.369, lat: 29.760 },
    status: 'Operacional',
    color: 'primary' as const,
    details: {
      employees: 203,
      energy: '3.1 MW',
      efficiency: '96%',
      lastUpdate: '5 min atrás'
    }
  },
  { 
    id: '5', 
    name: 'Biosolvit Portugal', 
    country: 'Portugal', 
    location: 'Coimbra', 
    coordinates: { lng: -8.419, lat: 40.205 },
    status: 'Operacional',
    color: 'secondary' as const,
    details: {
      employees: 78,
      energy: '1.5 MW',
      efficiency: '92%',
      lastUpdate: '12 min atrás'
    }
  },
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
      
      {/* A camada da UI foi simplificada */}
      <div className="absolute top-0 left-0 w-full h-full p-4 md:p-8 pointer-events-none">
        {/* O novo cabeçalho é posicionado aqui */}
        <div className="pointer-events-auto">
          <FloatingHeader onUnitSelect={handleUnitSelect} />
        </div>
        
        <div className="absolute bottom-0 left-4 md:left-8 pointer-events-auto">
            <InteractiveGuides />
        </div>
      </div>
      
      <AnimatePresence>
        {selectedUnit && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-auto bg-black/20 backdrop-blur-sm">
             <UnitCard unit={selectedUnit} mode="expanded" onClose={() => setSelectedUnitId(null)} />
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
