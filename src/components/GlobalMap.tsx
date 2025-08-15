import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// O seu token de acesso ao Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiYmlvbi1nbG9iYWwtYmlvIiwiYSI6ImNtZWN2d243OTA0cDYybHNmOGZuMG1xcHgifQ.ioEhcw2w72CrhnNc55HsNQ';

interface GlobalMapProps {
  onMapLoad: (map: mapboxgl.Map) => void;
}

export default function GlobalMap({ onMapLoad }: GlobalMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    if (mapContainer.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-55, -15],
        zoom: 2,
        pitch: 45,
        bearing: 0,
        interactive: true,
      });

      map.on('load', () => {
        // Estilo e contraste do mapa
        if (map.getLayer('road-major-label')) map.removeLayer('road-major-label');
        if (map.getLayer('road-street-label')) map.removeLayer('road-street-label');
        if (map.getLayer('road-minor-label')) map.removeLayer('road-minor-label');
        map.setPaintProperty('water', 'fill-color', '#eef2f9');
        map.setPaintProperty('land', 'fill-color', '#d1d5db');
        map.setPaintProperty('national-park', 'fill-color', '#e5e7eb');

        // Terreno 3D
        map.addSource('mapbox-dem', {
          'type': 'raster-dem',
          'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
          'tileSize': 512,
          'maxzoom': 14
        });
        map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

        // ### INÍCIO DA ANIMAÇÃO CORRIGIDA ###
        let isSpinning = true;

        const spinGlobe = () => {
          if (!isSpinning) return;
          const center = map.getCenter();
          center.lng -= 0.1;
          map.easeTo({ center, duration: 0, easing: (n) => n });
          animationFrameId.current = requestAnimationFrame(spinGlobe);
        }

        spinGlobe();

        map.flyTo({
            center: [-52, -14.5],
            zoom: 3.8,
            pitch: 50,
            bearing: -15,
            speed: 0.5,
            curve: 1,
            easing(t) { return t; },
        });

        // Ouve o final do movimento 'flyTo' para parar a rotação de forma segura
        map.once('moveend', () => {
          isSpinning = false;
          if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
          }
        });
        // ### FIM DA ANIMAÇÃO CORRIGIDA ###
        
        onMapLoad(map);
      });

      return () => {
        map.remove();
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
      };
    }
  }, [onMapLoad]);

  return <div ref={mapContainer} className="absolute top-0 left-0 w-full h-full" />;
}
