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
import { Atom, Droplets, TreePalm, Recycle, Globe, Bike } from "lucide-react";

const kpis = [
    { title: "CO₂e", unit: "t", value: "947.2k", icon: Atom },
    { title: "Água", unit: "L", value: "125.8M", icon: Droplets },
    { title: "Biomassa", unit: "t", value: "92.4k", icon: TreePalm },
    { title: "PET", unit: "t", value: "34.1k", icon: Recycle },
    { title: "Terra", unit: "ha", value: "2.1k", icon: Globe },
    { title: "Mobilidade", unit: "km", value: "5.6k", icon: Bike },
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
    <div className="w-full max-w-7xl mx-auto bg-gradient-to-r from-[#3a7d44] to-[#2c5b76] rounded-2xl shadow-lg border border-white/10 p-3 px-6 flex items-center justify-between">
      
      {/* Lado Esquerdo: Logo e Título */}
      <div className="flex items-center space-x-3">
        <img 
          src="https://i.imgur.com/YWUFNgt.png" 
          alt="Biosolvit Logo" 
          className="h-8 w-auto drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] brightness-110" 
        />
        <div className="hidden md:flex flex-col text-xs text-white/70 font-light border-l border-white/20 pl-3 leading-tight">
          <span>Global Impact</span>
          <span>Dashboard</span>
        </div>
      </div>

      {/* Centro: Placar de KPIs (oculto em ecrãs menores) */}
      <div className="hidden lg:flex items-center space-x-10 px-6">
        {kpis.map((kpi, index) => {
          const IconComponent = kpi.icon;
          return (
            <div 
              key={index} 
              className="group text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]"
            >
              <div className="flex items-center justify-center mb-1 transition-colors duration-300 group-hover:text-green-400">
                <IconComponent className="w-4 h-4 mr-1 text-white/90 group-hover:text-green-400" />
                <p className="text-xs font-semibold text-white group-hover:text-green-400">{kpi.value}</p>
              </div>
              <p className="text-[10px] font-light text-white/70 group-hover:text-blue-400 transition-colors duration-300">
                {kpi.title} ({kpi.unit})
              </p>
            </div>
          );
        })}
      </div>

      {/* Lado Direito: Seletor de Unidades */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white/10 border-white/20 rounded-lg font-light text-white transition-colors hover:bg-white/20 hover:text-white text-xs px-3 py-1"
          >
            Unidades
            <ChevronDown className="ml-1 h-3 w-3" />
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
    // ### FIM DA ALTERAÇÃO DE COR ###
  );
}


