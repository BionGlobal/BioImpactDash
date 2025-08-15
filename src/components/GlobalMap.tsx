import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Mapbox access token from user
const MAPBOX_TOKEN = 'pk.eyJ1IjoiYmlvbi1nbG9iYWwtYmlvIiwiYSI6ImNtZWN2d243OTA0cDYybHNmOGZuMG1xcHgifQ.ioEhcw2w72CrhnNc55HsNQ';

interface MapProps {
  onMapLoad?: (map: mapboxgl.Map) => void;
  className?: string;
}

const GlobalMap: React.FC<MapProps> = ({ onMapLoad, className = '' }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Set Mapbox access token
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    // Initialize map with clean minimal style
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11', // Clean base style
      projection: 'globe', // 3D globe projection
      zoom: 1.8,
      center: [0, 20],
      pitch: 45, // Low orbit perspective
      bearing: 0,
      antialias: true
    });

    // Add navigation controls with custom styling
    const nav = new mapboxgl.NavigationControl({
      visualizePitch: true,
      showZoom: true,
      showCompass: true
    });
    map.current.addControl(nav, 'top-right');

    // Disable scroll zoom for precise control
    map.current.scrollZoom.disable();

    // Add subtle atmosphere and fog for orbital feel
    map.current.on('style.load', () => {
      if (!map.current) return;
      
      // Add atmospheric effects
      map.current.setFog({
        'color': 'hsl(220, 15%, 95%)',
        'high-color': 'hsl(220, 30%, 85%)',
        'horizon-blend': 0.1,
        'space-color': 'hsl(220, 50%, 10%)',
        'star-intensity': 0.3
      });

      // Add subtle terrain exaggeration for 3D relief
      if (map.current.getSource('mapbox-dem')) {
        map.current.addLayer({
          id: 'terrain',
          type: 'fill-extrusion',
          source: 'mapbox-dem',
          paint: {
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['get', 'elevation'],
              0, 0,
              8848, 8848
            ],
            'fill-extrusion-opacity': 0.2
          }
        });
      }

      setIsLoaded(true);
      onMapLoad?.(map.current);
    });

    // Gentle rotation animation for immersive feel
    let userInteracting = false;
    let spinEnabled = true;
    const secondsPerRevolution = 180;

    const spinGlobe = () => {
      if (!map.current || !spinEnabled || userInteracting) return;
      
      const zoom = map.current.getZoom();
      if (zoom < 3) {
        let distancePerSecond = 360 / secondsPerRevolution;
        const center = map.current.getCenter();
        center.lng -= distancePerSecond * 0.5;
        map.current.easeTo({ 
          center, 
          duration: 1000, 
          easing: (n) => n 
        });
      }
    };

    // Interaction handlers
    map.current.on('mousedown', () => { userInteracting = true; });
    map.current.on('mouseup', () => { 
      userInteracting = false; 
      setTimeout(spinGlobe, 2000);
    });
    map.current.on('touchstart', () => { userInteracting = true; });
    map.current.on('touchend', () => { 
      userInteracting = false; 
      setTimeout(spinGlobe, 2000);
    });
    map.current.on('moveend', spinGlobe);

    // Start gentle rotation
    setTimeout(spinGlobe, 3000);

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [onMapLoad]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <div 
        ref={mapContainer} 
        className="absolute inset-0 rounded-lg overflow-hidden"
        style={{
          background: 'hsl(var(--map-ocean))'
        }}
      />
      
      {/* Loading overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
            <p className="text-muted-foreground">Initializing orbital view...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalMap;