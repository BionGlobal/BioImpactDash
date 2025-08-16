import BrandHeader from "./BrandHeader";
import GlobalKPIs from "./GlobalKPIs";
import UnitSelector from "./UnitSelector";

// Mock de dados (o mesmo que está no seu OrbitalDashboard.tsx)
const mockUnits = [
  { id: '1', name: 'Biosolvit Matriz', country: 'Brasil', location: 'Barra Mansa, RJ', coordinates: { lng: -44.172, lat: -22.545 } },
  { id: '2', name: 'Biogreen', country: 'Brasil', location: 'Porto Belo, SC', coordinates: { lng: -48.555, lat: -27.158 } },
  { id: '3', name: 'Bioblue Response', country: 'Brasil', location: 'Barra Mansa, RJ', coordinates: { lng: -44.172, lat: -22.545 } },
  { id: '4', name: 'Biosolvit Texas', country: 'EUA', location: 'Houston, TX', coordinates: { lng: -95.369, lat: 29.760 } },
  { id: '5', name: 'Biosolvit Portugal', country: 'Portugal', location: 'Coimbra', coordinates: { lng: -8.419, lat: 40.205 } },
];

interface FloatingHeaderProps {
    onUnitSelect: (unit: any) => void;
}

export default function FloatingHeader({ onUnitSelect }: FloatingHeaderProps) {
  return (
    // O container principal do cabeçalho: uma barra flutuante
    <div className="w-full max-w-7xl mx-auto bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-black/5 p-4 flex items-center justify-between">
      
      {/* Lado Esquerdo: Logo e Título */}
      <div className="flex-shrink-0">
        <BrandHeader />
      </div>

      {/* Centro: KPIs (ocultos em ecrãs menores) */}
      <div className="hidden lg:flex flex-shrink-0 mx-4">
        <GlobalKPIs />
      </div>

      {/* Lado Direito: Seletor de Unidades */}
      <div className="flex-shrink-0">
        <UnitSelector units={mockUnits} onUnitSelect={onUnitSelect} />
      </div>

    </div>
  );
}
