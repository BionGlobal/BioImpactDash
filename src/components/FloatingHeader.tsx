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
    Molecule,       // Ícone para CO2e
    Droplets,       // Ícone para Água
    Sprout,         // Ícone para Biomassa (Palmeira)
    GlassWater,     // Ícone para PET (Garrafa)
    TreePine,       // Ícone para Terra (Árvore)
    Bike            // Ícone para Mobilidade
} from "lucide-react";

// Mock de dados (o mesmo que está no seu OrbitalDashboard.tsx)
const mockUnits = [
  { id: '1', name: 'Biosolvit Matriz', country: 'Brasil', location: 'Barra Mansa, RJ', coordinates: { lng: -44.172, lat: -22.545 } },
  { id: '2', name: 'Biogreen', country: 'Brasil', location: 'Porto Belo, SC', coordinates: { lng: -48.555, lat: -27.158 } },
  { id: '3', name: 'Bioblue Response', country: 'Brasil', location: 'Barra Mansa, RJ', coordinates: { lng: -44.172, lat: -22.545 } },
  { id: '4', name: 'Biosolvit Texas', country: 'EUA', location: 'Houston, TX', coordinates: { lng: -95.369, lat: 29.760 } },
  { id: '5', name: 'Biosolvit Portugal', country: 'Portugal', location: 'Coimbra', coordinates: { lng: -8.419, lat: 40.205 } },
];

// ### INÍCIO DA REFATORAÇÃO DOS KPIS ###
// Dados dos KPIs atualizados com ícones, títulos abreviados e cores para o hover
const kpis = [
    { icon: Molecule, title: "CO2e", value: "947.2k", unit: "t", hoverColor: "text-green-300" },
    { icon: Droplets, title: "Água", value: "125.8", unit: "M l", hoverColor: "text-blue-300" },
    { icon: Sprout, title: "Biomassa", value: "92.4k", unit: "t", hoverColor: "text-green-300" },
    { icon: GlassWater, title: "PET", value: "34.1k", unit: "t", hoverColor: "text-blue-300" },
    { icon: TreePine, title: "Terra", value: "2.1k", unit: "ha", hoverColor: "text-green-300" },
    { icon: Bike, title: "Mobilidade", value: "5604", unit: "km", hoverColor: "text-blue-300" },
];
// ### FIM DA REFATORAÇÃO DOS KPIS ###


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
    // Gradiente invertido (verde para azul)
    <div className="w-full max-w-7xl mx-auto bg-gradient-to-r from-[#3a7d44] to-[#2c5b76] rounded-2xl shadow-lg border border-white/10 p-3 px-6 flex items-center justify-between">
      
      {/* Lado Esquerdo: Logo e Título GID */}
      <div className="flex items-center space-x-4">
        <img src="https://i.imgur.com/YWUFNgt.png" alt="Biosolvit Logo" className="h-8 w-auto" />
        {/* Texto GID empilhado */}
        <div className="hidden md:flex flex-col text-xs text-white/70 font-light leading-none border-l border-white/20 pl-4">
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
                    className={`transition-colors duration-300 ${hoveredKpi === kpi.title ? kpi.hoverColor : 'text-white/70'}`} 
                />
                <p 
                    className={`text-lg font-semibold transition-colors duration-300 ${hoveredKpi === kpi.title ? 'text-white' : 'text-white'}`}
                >
                    {kpi.value}
                </p>
            </div>
            <p 
                className={`text-[10px] font-light transition-colors duration-300 ${hoveredKpi === kpi.title ? kpi.hoverColor : 'text-white/70'}`}
            >
                {kpi.title} ({kpi.unit})
            </p>
          </div>
        ))}
      </div>

      {/* Lado Direito: Seletor de Unidades */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {/* Botão com novo estilo e texto */}
          <Button 
            variant="outline" 
            className="bg-white/10 border-white/20 rounded-lg font-light text-white text-xs px-3 py-1 h-auto transition-colors hover:bg-white/20 hover:text-white"
          >
            Unidades
            <ChevronDown className="ml-2 h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-64 bg-[#33627a]/80 backdrop-blur-lg border-white/10 rounded-lg text-white"
          align="end"
        >
          {Object.entries(unitsByCountry).map(([country, countryUnits], index) => (
            <DropdownMenuGroup key={country}>
              <DropdownMenuLabel className="font-semibold text-white/90">{country}</DropdownMenuLabel>
              {(countryUnits as any[]).map((unit) => (
                <DropdownMenuItem key={unit.id} onSelect={() => onUnitSelect(unit)} className="cursor-pointer focus:bg-white/10 focus:text-white">
                  <span>{unit.name}</span>
                </DropdownMenuItem>
              ))}
              {index < Object.keys(unitsByCountry).length - 1 && (
                <DropdownMenuSeparator className="bg-white/10" />
              )}
            </DropdownMenuGroup>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
