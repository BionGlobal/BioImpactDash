import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import GlobalMap from './GlobalMap';
import UnitIcon3D from './UnitIcon3D';
import UnitCard from './UnitCard';

// Mock data for company units
const COMPANY_UNITS = [
  {
    id: 'unit-1',
    name: 'São Paulo Hub',
    location: 'São Paulo, Brazil',
    status: 'Operational',
    color: 'primary' as const,
    position: [-46.6333, -23.5505, 2] as [number, number, number],
    details: {
      employees: 245,
      energy: '2.4 MW',
      efficiency: '94%',
      lastUpdate: '2 minutes ago'
    }
  },
  {
    id: 'unit-2',
    name: 'Silicon Valley Campus',
    location: 'California, USA',
    status: 'Active',
    color: 'secondary' as const,
    position: [-122.0842, 37.4221, 2] as [number, number, number],
    details: {
      employees: 189,
      energy: '1.8 MW',
      efficiency: '97%',
      lastUpdate: '5 minutes ago'
    }
  },
  {
    id: 'unit-3',
    name: 'London Centre',
    location: 'London, UK',
    status: 'Operational',
    color: 'accent' as const,
    position: [-0.1276, 51.5074, 2] as [number, number, number],
    details: {
      employees: 156,
      energy: '1.2 MW',
      efficiency: '91%',
      lastUpdate: '1 minute ago'
    }
  },
  {
    id: 'unit-4',
    name: 'Tokyo Innovation Lab',
    location: 'Tokyo, Japan',
    status: 'Research Mode',
    color: 'primary' as const,
    position: [139.6917, 35.6895, 2] as [number, number, number],
    details: {
      employees: 98,
      energy: '0.8 MW',
      efficiency: '89%',
      lastUpdate: '12 minutes ago'
    }
  },
  {
    id: 'unit-5',
    name: 'Sydney Office',
    location: 'Sydney, Australia',
    status: 'Operational',
    color: 'secondary' as const,
    position: [151.2093, -33.8688, 2] as [number, number, number],
    details: {
      employees: 67,
      energy: '0.9 MW',
      efficiency: '96%',
      lastUpdate: '8 minutes ago'
    }
  }
];

const OrbitalDashboard: React.FC = () => {
  const [hoveredUnit, setHoveredUnit] = useState<any>(null);
  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleUnitHover = useCallback((unit: any) => {
    setHoveredUnit(unit);
  }, []);

  const handleUnitClick = useCallback((unit: any) => {
    setSelectedUnit(unit);
    setHoveredUnit(null);
  }, []);

  const handleCloseCard = useCallback(() => {
    setSelectedUnit(null);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden bg-background"
      onMouseMove={handleMouseMove}
    >
      {/* Global Map Base */}
      <div className="absolute inset-0">
        <GlobalMap className="w-full h-full" />
      </div>

      {/* 3D Unit Icons Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <UnitIcon3D
          units={COMPANY_UNITS}
          onUnitClick={handleUnitClick}
          onUnitHover={handleUnitHover}
        />
      </div>

      {/* Hover Cards */}
      <UnitCard
        unit={hoveredUnit}
        mode={hoveredUnit ? 'hover' : 'hidden'}
        position={mousePosition}
      />

      {/* Expanded Detail Cards */}
      <UnitCard
        unit={selectedUnit}
        mode={selectedUnit ? 'expanded' : 'hidden'}
        onClose={handleCloseCard}
      />

      {/* Dashboard Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute top-0 left-0 right-0 z-30 p-6"
      >
        <div className="flex justify-between items-center">
          <div className="glass-card p-4 border-primary/20">
            <h1 className="text-2xl font-bold text-foreground">
              Global Operations Center
            </h1>
            <p className="text-muted-foreground text-sm">
              Real-time orbital overview of worldwide facilities
            </p>
          </div>

          <div className="glass-card p-4 border-secondary/20">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">
                  {COMPANY_UNITS.length}
                </div>
                <div className="text-xs text-muted-foreground">Active Units</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {COMPANY_UNITS.reduce((sum, unit) => sum + unit.details.employees, 0)}
                </div>
                <div className="text-xs text-muted-foreground">Total Staff</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">
                  {COMPANY_UNITS.reduce((sum, unit) => sum + parseFloat(unit.details.energy), 0).toFixed(1)} MW
                </div>
                <div className="text-xs text-muted-foreground">Power Usage</div>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Status Indicator */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 right-6 z-30"
      >
        <div className="glass-card p-4 border-primary/20">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-primary pulse-glow" />
            <span className="text-sm font-medium">All Systems Operational</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Last sync: Just now
          </div>
        </div>
      </motion.div>

      {/* Instructions Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-6 left-6 z-30"
      >
        <div className="glass-card p-4 border-accent/20 max-w-sm">
          <h3 className="font-semibold text-sm mb-2">Navigation Guide</h3>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div>• Hover over units for quick info</div>
            <div>• Click units for detailed view</div>
            <div>• Drag to rotate the globe</div>
            <div>• Zoom with mouse wheel</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrbitalDashboard;