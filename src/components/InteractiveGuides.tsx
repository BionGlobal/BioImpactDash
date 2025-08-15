import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Info, 
  Activity, 
  HelpCircle 
} from 'lucide-react';

const InteractiveGuides: React.FC = () => {
  const [activeGuide, setActiveGuide] = useState<string | null>(null);

  const guides = [
    {
      id: 'info',
      icon: Info,
      title: 'Map Attribution',
      content: (
        <div className="text-xs text-muted-foreground space-y-1">
          <div>© Mapbox © OpenStreetMap</div>
          <div>Powered by Biosolvit Technology</div>
        </div>
      )
    },
    {
      id: 'status',
      icon: Activity,
      title: 'System Status',
      content: (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-primary pulse-glow" />
            <span className="text-xs font-medium">All Systems Operational</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Last sync: Just now
          </div>
        </div>
      )
    },
    {
      id: 'help',
      icon: HelpCircle,
      title: 'Navigation Guide',
      content: (
        <div className="space-y-1 text-xs text-muted-foreground">
          <div>• Hover over units for quick info</div>
          <div>• Click units for detailed view</div>
          <div>• Drag to rotate the globe</div>
          <div>• Use unit selector to fly to locations</div>
        </div>
      )
    }
  ];

  return (
    <div className="absolute bottom-6 left-6 z-30 flex space-x-2">
      {guides.map((guide) => (
        <div key={guide.id} className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveGuide(activeGuide === guide.id ? null : guide.id)}
            className="glass-card p-2 border-border/10 hover:border-primary/20 transition-all duration-200"
          >
            <guide.icon className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
          </motion.button>

          <AnimatePresence>
            {activeGuide === guide.id && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full mb-2 left-0 glass-card p-3 border-border/10 min-w-48"
              >
                <h4 className="text-xs font-semibold text-foreground/90 mb-2">
                  {guide.title}
                </h4>
                {guide.content}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default InteractiveGuides;