import React from 'react';
import { motion } from 'framer-motion';

const BrandHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="absolute top-6 left-6 z-30"
    >
      <div className="glass-card p-4 border-border/10">
        <div className="flex flex-col space-y-2">
          <div className="h-8 flex items-center">
            <span className="text-lg font-bold text-primary">BIOSOLVIT</span>
          </div>
          <h1 className="text-sm font-semibold text-foreground/90">
            Global Impact Dashboard
          </h1>
        </div>
      </div>
    </motion.div>
  );
};

export default BrandHeader;