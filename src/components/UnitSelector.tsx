import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface UnitSelectorProps {
  units: any[];
  onUnitSelect: (unit: any) => void;
}

export default function UnitSelector({ units, onUnitSelect }: UnitSelectorProps) {
  // Agrupa unidades por país para o menu
  const unitsByCountry = units.reduce((acc, unit) => {
    (acc[unit.country] = acc[unit.country] || []).push(unit);
    return acc;
  }, {});

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="bg-white/50 backdrop-blur-lg border-gray-200/50 rounded-lg font-light text-gray-700 hover:bg-white/70"
        >
          Selecione a Unidade
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-64 bg-white/50 backdrop-blur-lg border-gray-200/50 rounded-lg"
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
             {/* Adiciona separador apenas se não for o último grupo */}
            {index < Object.keys(unitsByCountry).length - 1 && (
              <DropdownMenuSeparator className="bg-gray-200/50" />
            )}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
