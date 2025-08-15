import { useState } from "react";
import GlobalMap from "./GlobalMap";
import BrandHeader from "./BrandHeader";
import UnitSelector from "./UnitSelector";
import GlobalKPIs from "./GlobalKPIs";
import InteractiveGuides from "./InteractiveGuides";
import UnitCard from "./UnitCard";
import { AnimatePresence } from "framer-motion";

// Mock data for company units
const COMPANY_UNITS = [
  {
    id: 'unit-1',
    name: 'São Paulo Hub',
    location: 'São Paulo, Brazil',
    status: 'Operational',
    color: 'primary' as const,
    position: [-46.6333, -23.5505, 2] as [number, number, number],
    details: {
      employees: 245,
      energy: '2.4 MW',
      efficiency: '94%',
      lastUpdate: '2 minutes ago'
    }
  },
  {
    id: 'unit-2',
    name: 'Silicon Valley Campus',
    location: 'California, USA',
    status: 'Active',
    color: 'secondary' as const,
    position: [-122.0842, 37.4221, 2] as [number, number, number],
    details: {
      employees: 189,
      energy: '1.8 MW',
      efficiency: '97%',
      lastUpdate: '5 minutes ago'
    }
  },
  {
    id: 'unit-3',
    name: 'London Centre',
    location: 'London, UK',
    status: 'Operational',
    color: 'accent' as const,
    position: [-0.1276, 51.5074, 2] as [number, number, number],
    details: {
      employees: 156,
      energy: '1.2 MW',
      efficiency: '91%',
      lastUpdate: '1 minute ago'
    }
  },
  {
    id: 'unit-4',
    name: 'Tokyo Innovation Lab',
    location: 'Tokyo, Japan',
    status: 'Research Mode',
    color: 'primary' as const,
    position: [139.6917, 35.6895, 2] as [number, number, number],
    details: {
      employees: 98,
      energy: '0.8 MW',
      efficiency: '89%',
      lastUpdate: '12 minutes ago'
    }
  },
  {
    id: 'unit-5',
    name: 'Sydney Office',
    location: 'Sydney, Australia',
    status: 'Operational',
    color: 'secondary' as const,
    position: [151.2093, -33.8688, 2] as [number, number, number],
    details: {
      employees: 67,
      energy: '0.9 MW',
      efficiency: '96%',
      lastUpdate: '8 minutes ago'
    }
  }
];

const OrbitalDashboard: React.FC = () => {
  const [hoveredUnit, setHoveredUnit] = useState<any>(null);
  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const handleUnitHover = useCallback((unit: any) => {
    setHoveredUnit(unit);
  }, []);

  const handleUnitClick = useCallback((unit: any) => {
    setSelectedUnit(unit);
    setHoveredUnit(null);
  }, []);

  const handleCloseCard = useCallback(() => {
    setSelectedUnit(null);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMapLoad = useCallback((map: mapboxgl.Map) => {
    mapRef.current = map;
  }, []);

  const handleUnitFlyTo = useCallback((unit: any) => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [unit.position[0], unit.position[1]],
        zoom: 6,
        pitch: 60,
        bearing: 0,
        duration: 2000
      });
    }
    setSelectedUnit(unit);
  }, []);

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden bg-background"
      onMouseMove={handleMouseMove}
    >
      {/* Global Map Base */}
      <div className="absolute inset-0">
        <GlobalMap 
          className="w-full h-full" 
          onMapLoad={handleMapLoad}
        />
      </div>

      {/* 3D Unit Icons Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <UnitIcon3D
          units={COMPANY_UNITS}
          onUnitClick={handleUnitClick}
          onUnitHover={handleUnitHover}
        />
      </div>

      {/* Hover Cards */}
      <UnitCard
        unit={hoveredUnit}
        mode={hoveredUnit ? 'hover' : 'hidden'}
        position={mousePosition}
      />

      {/* Expanded Detail Cards */}
      <UnitCard
        unit={selectedUnit}
        mode={selectedUnit ? 'expanded' : 'hidden'}
        onClose={handleCloseCard}
      />

      {/* Brand Header */}
      <BrandHeader />

      {/* Unit Selector */}
      <UnitSelector 
        units={COMPANY_UNITS}
        onUnitSelect={handleUnitFlyTo}
        selectedUnit={selectedUnit}
      />

      {/* Global KPIs */}
      <GlobalKPIs />

      {/* Interactive Guides */}
      <InteractiveGuides />
    </div>
  );
};

export default OrbitalDashboard;
