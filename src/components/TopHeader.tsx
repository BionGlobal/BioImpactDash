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
import { motion } from "framer-motion";

interface TopHeaderProps {
  units: any[];
  onUnitSelect: (unit: any) => void;
  onKpiClick: (kpiTitle: string) => void;
}

const kpis = [
    { title: "CO₂e evitado (t)", value: "947.2k" },
    { title: "Água purificada (M L)", value: "125.8" },
    { title: "Biomassa reciclada (t)", value: "92.4k" },
    { title: "PET neutralizado (t)", value: "34.1k" },
    { title: "Uso da Terra evitado (ha)", value: "2.1k" },
];

export default function TopHeader({ units, onUnitSelect, onKpiClick }: TopHeaderProps) {
  const unitsByCountry = units.reduce((acc, unit) => {
    (acc[unit.country] = acc[unit.country] || []).push(unit);
    return acc;
  }, {});

  return (
    <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-2 md:gap-4">
      <motion.div
        className="relative overflow-hidden bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-black/5 p-3 px-4 flex-shrink-0 cursor-pointer shine-effect"
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      >
        <div className="flex items-center space-x-3">
          <img src="https://i.imgur.com/YWUFNgt.png" alt="Biosolvit Logo" className="h-7 md:h-8 w-auto" />
        </div>
      </motion.div>
      <div className="hidden lg:flex items-center justify-center gap-2 md:gap-4 flex-grow">
        {kpis.map((kpi, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-black/5 p-3 px-4 text-center flex-1 cursor-pointer shine-effect"
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            onClick={() => onKpiClick(kpi.title)}
          >
            <p className="text-lg xl:text-xl font-semibold text-gray-800">{kpi.value}</p>
            <p className="text-[10px] xl:text-xs font-light text-gray-500 whitespace-nowrap">{kpi.title}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="relative overflow-hidden bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-black/5 p-1.5 flex-shrink-0 shine-effect"
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost"
              className="rounded-lg font-light text-gray-700 hover:bg-white/50 text-xs md:text-sm"
            >
              Unidades
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
      </motion.div>
    </div>
  );
}


/*
=================================================================
PASSO 4: ATUALIZE O FICHEIRO /src/index.css
(O código aqui permanece o mesmo da versão anterior, mas é importante
garantir que está a usar esta versão com a animação do ticker)
=================================================================
*/
@tailwind base;
@tailwind components;
@tailwind utilities;

.shine-effect::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    110deg,
    transparent 20%,
    rgba(0, 174, 239, 0.08) 35%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(141, 198, 63, 0.08) 65%,
    transparent 80%
  );
  background-size: 250% 100%;
  animation: shine 15s linear infinite;
  opacity: 0.8;
  pointer-events: none;
  z-index: 1;
}

@keyframes shine {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Animação para o carrossel de texto */
@keyframes ticker {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-ticker {
  animation: ticker 40s linear infinite;
}
