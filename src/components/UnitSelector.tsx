import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface Unit {
  id: string;
  name: string;
  location: string;
  position: [number, number, number];
}

interface UnitSelectorProps {
  units: Unit[];
  onUnitSelect: (unit: Unit) => void;
  selectedUnit?: Unit | null;
}

const UnitSelector: React.FC<UnitSelectorProps> = ({ 
  units, 
  onUnitSelect, 
  selectedUnit 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.6 }}
      className="absolute top-6 right-6 z-30"
    >
      <div className="glass-card p-4 border-border/10 w-64">
        <h3 className="text-sm font-semibold text-foreground/90 mb-3">
          Select Unit
        </h3>
        <div className="max-h-48 overflow-y-auto space-y-1">
          {units.map((unit) => (
            <button
              key={unit.id}
              onClick={() => onUnitSelect(unit)}
              className={`w-full text-left p-2 rounded-md transition-all duration-200 hover:bg-primary/10 hover:scale-[1.02] group ${
                selectedUnit?.id === unit.id 
                  ? 'bg-primary/20 border border-primary/30' 
                  : 'bg-muted/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-foreground/90">
                    {unit.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {unit.location}
                  </div>
                </div>
                <ChevronRight className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default UnitSelector;