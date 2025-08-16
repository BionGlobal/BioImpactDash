import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

// Mock de dados (o mesmo que está no seu OrbitalDashboard.tsx)
const mockUnits = [
  { id: '1', name: 'Biosolvit Matriz', country: 'Brasil', location: 'Barra Mansa, RJ', coordinates: { lng: -44.172, lat: -22.545 } },
  { id: '2', name: 'Biogreen', country: 'Brasil', location: 'Porto Belo, SC', coordinates: { lng: -48.555, lat: -27.158 } },
  { id: '3', name: 'Bioblue Response', country: 'Brasil', location: 'Barra Mansa, RJ', coordinates: { lng: -44.172, lat: -22.545 } },
  { id: '4', name: 'Biosolvit Texas', country: 'EUA', location: 'Houston, TX', coordinates: { lng: -95.369, lat: 29.760 } },
  { id: '5', name: 'Biosolvit Portugal', country: 'Portugal', location: 'Coimbra', coordinates: { lng: -8.419, lat: 40.205 } },
];

// Dados dos KPIs para o placar
const kpis = [
    { title: "CO₂e evitado (t)", value: "947.2k" },
    { title: "Água purificada (M L)", value: "125.8" },
    { title: "Biomassa reciclada (t)", value: "92.4k" },
    { title: "PET neutralizado (t)", value: "34.1k" },
    { title: "Uso da Terra evitado (ha)", value: "2.1k" },
];


interface FloatingHeaderProps {
    onUnitSelect: (unit: any) => void;
}

export default function FloatingHeader({ onUnitSelect }: FloatingHeaderProps) {
    // Agrupa as unidades por país para o menu suspenso
    const unitsByCountry = mockUnits.reduce((acc, unit) => {
        (acc[unit.country] = acc[unit.country] || []).push(unit);
        return acc;
    }, {});

  return (
    // O container principal do cabeçalho: uma barra flutuante
    <div className="w-full max-w-7xl mx-auto bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-black/5 p-3 px-6 flex items-center justify-between">
      
      {/* Lado Esquerdo: Logo e Título */}
      <div className="flex items-center space-x-3">
        <img src="https://i.imgur.com/YWUFNgt.png" alt="Biosolvit Logo" className="h-8 w-auto" />
        <span className="hidden md:inline-block text-sm text-gray-500 font-light border-l border-gray-300 pl-3">
          Global Impact Dashboard
        </span>
      </div>

      {/* Centro: Placar de KPIs (oculto em ecrãs menores) */}
      <div className="hidden lg:flex items-center space-x-6">
        {kpis.map((kpi, index) => (
          <div key={index} className="text-center">
            <p className="text-xl font-semibold text-gray-800">{kpi.value}</p>
            <p className="text-xs font-light text-gray-500">{kpi.title}</p>
          </div>
        ))}
      </div>

      {/* Lado Direito: Seletor de Unidades */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {/* ### INÍCIO DA CORREÇÃO ### */}
          <Button 
            variant="outline" 
            className="bg-white/80 border-gray-200/80 rounded-lg font-light text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
          >
          {/* ### FIM DA CORREÇÃO ### */}
            Selecione a Unidade
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-64 bg-white/70 backdrop-blur-lg border-gray-200/50 rounded-lg"
          align="end"
        >
          {Object.entries(unitsByCountry).map(([country, countryUnits], index) => (
            <DropdownMenuGroup key={country}>
              <DropdownMenuLabel className="font-semibold text-gray-800">{country}</DropdownMenuLabel>
              {(countryUnits as any[]).map((unit) => (
                <DropdownMenuItem key={unit.id} onSelect={() => onUnitSelect(unit)} className="cursor-pointer">
                  <span>{unit.name}</span>
                </DropdownMenuItem>
              ))}
              {index < Object.keys(unitsByCountry).length - 1 && (
                <DropdownMenuSeparator className="bg-gray-200/50" />
              )}
            </DropdownMenuGroup>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
