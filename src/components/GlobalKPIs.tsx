import React from 'react';
import { motion } from 'framer-motion';
import { 
  Leaf, 
  Droplets, 
  Recycle, 
  Package, 
  MapPin 
} from 'lucide-react';

const GLOBAL_KPIS = [
  {
    icon: Leaf,
    label: 'CO₂e Avoided',
    value: '847.2k',
    unit: 'tonnes',
    color: 'text-primary'
  },
  {
    icon: Droplets,
    label: 'Water Purified',
    value: '125.8',
    unit: 'million liters',
    color: 'text-secondary'
  },
  {
    icon: Recycle,
    label: 'Biomass Recycled',
    value: '92.4k',
    unit: 'tonnes',
    color: 'text-accent'
  },
  {
    icon: Package,
    label: 'PET Plastic Neutralized',
    value: '34.7k',
    unit: 'tonnes',
    color: 'text-primary'
  },
  {
    icon: MapPin,
    label: 'Land Use Avoided',
    value: '2.1k',
    unit: 'hectares',
    color: 'text-secondary'
  }
];

const GlobalKPIs: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.9, duration: 0.6 }}
      className="absolute right-6 top-1/2 transform -translate-y-1/2 z-30"
    >
      <div className="glass-card p-4 border-border/10 w-56">
        <h3 className="text-sm font-semibold text-foreground/90 mb-4 text-center">
          Global Impact
        </h3>
        <div className="space-y-4">
          {GLOBAL_KPIS.map((kpi, index) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/20 transition-all duration-200"
            >
              <div className={`${kpi.color} opacity-80`}>
                <kpi.icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-foreground/90 truncate">
                  {kpi.label}
                </div>
                <div className="flex items-baseline space-x-1">
                  <span className={`text-sm font-bold ${kpi.color}`}>
                    {kpi.value}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {kpi.unit}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default GlobalKPIs;