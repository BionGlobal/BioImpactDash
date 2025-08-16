import { useState } from "react";
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
import { 
    ChevronDown, 
    Molecule,
    Droplets,
    Sprout,
    GlassWater,
    TreePine,
    Bike
} from "lucide-react";

// Mock de dados (o mesmo que está no seu OrbitalDashboard.tsx)
const mockUnits = [
  { id: '1', name: 'Biosolvit Matriz', country: 'Brasil', location: 'Barra Mansa, RJ', coordinates: { lng: -44.172, lat: -22.545 } },
  { id: '2', name: 'Biogreen', country: 'Brasil', location: 'Porto Belo, SC', coordinates: { lng: -48.555, lat: -27.158 } },
  { id: '3', name: 'Bioblue Response', country: 'Brasil', location: 'Barra Mansa, RJ', coordinates: { lng: -44.172, lat: -22.545 } },
  { id: '4', name: 'Biosolvit Texas', country: 'EUA', location: 'Houston, TX', coordinates: { lng: -95.369, lat: 29.760 } },
  { id: '5', name: 'Biosolvit Portugal', country: 'Portugal', location: 'Coimbra', coordinates: { lng: -8.419, lat: 40.205 } },
];

// ### INÍCIO DA ALTERAÇÃO VISUAL ###
// Dados dos KPIs atualizados com cores para o novo header claro
const kpis = [
    { icon: Molecule, title: "CO2e", value: "947.2k", unit: "t", hoverColor: "text-green-600" },
    { icon: Droplets, title: "Água", value: "125.8", unit: "M l", hoverColor: "text-blue-600" },
    { icon: Sprout, title: "Biomassa", value: "92.4k", unit: "t", hoverColor: "text-green-600" },
    { icon: GlassWater, title: "PET", value: "34.1k", unit: "t", hoverColor: "text-blue-600" },
    { icon: TreePine, title: "Terra", value: "2.1k", unit: "ha", hoverColor: "text-green-600" },
    { icon: Bike, title: "Mobilidade", value: "5604", unit: "km", hoverColor: "text-blue-600" },
];
// ### FIM DA ALTERAÇÃO VISUAL ###


interface FloatingHeaderProps {
    onUnitSelect: (unit: any) => void;
}

export default function FloatingHeader({ onUnitSelect }: FloatingHeaderProps) {
    const [hoveredKpi, setHoveredKpi] = useState<string | null>(null);
    const unitsByCountry = mockUnits.reduce((acc, unit) => {
        (acc[unit.country] = acc[unit.country] || []).push(unit);
        return acc;
    }, {});

  return (
    // ### INÍCIO DA ALTERAÇÃO VISUAL ###
    // Aplicado um gradiente claro e ajustadas as cores do texto para tons escuros
    <div className="w-full max-w-7xl mx-auto bg-gradient-to-r from-white/80 via-emerald-50/80 to-sky-50/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/50 p-3 px-6 flex items-center justify-between">
      
      {/* Lado Esquerdo: Logo e Título */}
      <div className="flex items-center space-x-4">
        <img src="https://i.imgur.com/YWUFNgt.png" alt="Biosolvit Logo" className="h-8 w-auto" />
        <div className="hidden md:flex flex-col text-xs text-gray-500 font-light leading-none border-l border-gray-300 pl-4">
          <span>Global</span>
          <span>Impact</span>
          <span>Dashboard</span>
        </div>
      </div>

      {/* Centro: Placar de KPIs com ícones e microinteração */}
      <div className="hidden lg:flex items-center space-x-6">
        {kpis.map((kpi) => (
          <div 
            key={kpi.title} 
            className="text-center cursor-pointer group"
            onMouseEnter={() => setHoveredKpi(kpi.title)}
            onMouseLeave={() => setHoveredKpi(null)}
          >
            <div className="flex items-center justify-center space-x-2">
                <kpi.icon 
                    size={16} 
                    className={`transition-colors duration-300 ${hoveredKpi === kpi.title ? kpi.hoverColor : 'text-gray-500'}`} 
                />
                <p 
                    className={`text-lg font-semibold transition-colors duration-300 ${hoveredKpi === kpi.title ? 'text-gray-900' : 'text-gray-800'}`}
                >
                    {kpi.value}
                </p>
            </div>
            <p 
                className={`text-[10px] font-light transition-colors duration-300 ${hoveredKpi === kpi.title ? kpi.hoverColor : 'text-gray-500'}`}
            >
                {kpi.title} ({kpi.unit})
            </p>
          </div>
        ))}
      </div>

      {/* Lado Direito: Seletor de Unidades */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="bg-white/50 border-gray-200/50 rounded-lg font-light text-gray-700 text-xs px-3 py-1 h-auto transition-colors hover:bg-white/80 hover:text-gray-900"
          >
            Unidades
            <ChevronDown className="ml-2 h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-64 bg-white/70 backdrop-blur-lg border-gray-200/50 rounded-lg text-black"
          align="end"
        >
          {Object.entries(unitsByCountry).map(([country, countryUnits], index) => (
            <DropdownMenuGroup key={country}>
              <DropdownMenuLabel className="font-semibold text-gray-800">{country}</DropdownMenuLabel>
              {(countryUnits as any[]).map((unit) => (
                <DropdownMenuItem key={unit.id} onSelect={() => onUnitSelect(unit)} className="cursor-pointer focus:bg-gray-100">
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
    // ### FIM DA ALTERAÇÃO VISUAL ###
  );
}
