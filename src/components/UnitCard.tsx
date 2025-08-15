import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Activity, Users, Zap } from 'lucide-react';

interface Unit {
  id: string;
  name: string;
  location: string;
  status: string;
  color: 'primary' | 'secondary' | 'accent';
  details: {
    employees: number;
    energy: string;
    efficiency: string;
    lastUpdate: string;
  };
}

interface UnitCardProps {
  unit: Unit | null;
  mode: 'hover' | 'expanded' | 'hidden';
  onClose?: () => void;
  position?: { x: number; y: number };
}

const UnitCard: React.FC<UnitCardProps> = ({ 
  unit, 
  mode, 
  onClose, 
  position = { x: 0, y: 0 } 
}) => {
  if (!unit) return null;

  const getColorClass = (color: string) => {
    switch (color) {
      case 'primary':
        return 'border-primary/30 bg-primary/5';
      case 'secondary':
        return 'border-secondary/30 bg-secondary/5';
      case 'accent':
        return 'border-accent/30 bg-accent/5';
      default:
        return 'border-primary/30 bg-primary/5';
    }
  };

  const hoverCard = (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={`absolute z-20 pointer-events-none`}
      style={{
        left: position.x + 20,
        top: position.y - 60
      }}
    >
      <div className={`glass-card p-4 max-w-xs ${getColorClass(unit.color)}`}>
        <div className="flex items-center space-x-2 mb-2">
          <div className={`w-3 h-3 rounded-full bg-${unit.color} pulse-glow`} />
          <h3 className="font-semibold text-sm">{unit.name}</h3>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <MapPin className="w-3 h-3 mr-1" />
          {unit.location}
        </div>
        <div className="mt-2 text-xs">
          <span className={`px-2 py-1 rounded-full bg-${unit.color}/20 text-${unit.color}-foreground`}>
            {unit.status}
          </span>
        </div>
      </div>
    </motion.div>
  );

  const expandedCard = (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ type: "spring", duration: 0.4 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
    >
      {/* Background overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-map-focusOverlay backdrop-blur-md"
        onClick={onClose}
      />

      {/* Main card */}
      <motion.div
        layoutId={`unit-card-${unit.id}`}
        className={`relative glass-card p-8 max-w-2xl w-full ${getColorClass(unit.color)}`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-background/20 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <div className={`w-6 h-6 rounded-full bg-${unit.color} pulse-glow`} />
          <div>
            <h2 className="text-2xl font-bold">{unit.name}</h2>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="w-4 h-4 mr-2" />
              {unit.location}
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="mb-6">
          <span className={`px-4 py-2 rounded-full bg-${unit.color}/20 text-${unit.color}-foreground font-medium`}>
            {unit.status}
          </span>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center text-muted-foreground">
              <Users className="w-4 h-4 mr-2" />
              <span className="text-sm">Employees</span>
            </div>
            <div className="text-2xl font-bold">{unit.details.employees}</div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-muted-foreground">
              <Zap className="w-4 h-4 mr-2" />
              <span className="text-sm">Energy Usage</span>
            </div>
            <div className="text-2xl font-bold">{unit.details.energy}</div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-muted-foreground">
              <Activity className="w-4 h-4 mr-2" />
              <span className="text-sm">Efficiency</span>
            </div>
            <div className="text-2xl font-bold">{unit.details.efficiency}</div>
          </div>
        </div>

        {/* Last Update */}
        <div className="mt-8 pt-6 border-t border-border/50">
          <div className="text-sm text-muted-foreground">
            Last updated: {unit.details.lastUpdate}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <AnimatePresence mode="wait">
      {mode === 'hover' && hoverCard}
      {mode === 'expanded' && expandedCard}
    </AnimatePresence>
  );
};

export default UnitCard;