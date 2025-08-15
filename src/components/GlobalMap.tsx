import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiYmlvbi1nbG9iYWwtYmlvIiwiYSI6ImNtZWN2d243OTA0cDYybHNmOGZuMG1xcHgifQ.ioEhcw2w72CrhnNc55HsNQ';

interface GlobalMapProps {
  onMapLoad: (map: mapboxgl.Map) => void;
}

export default function GlobalMap({ onMapLoad }: GlobalMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapContainer.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-55, -15],
        zoom: 2, // Zoom inicial mais distante para permitir a animação de aproximação
        pitch: 45,
        bearing: 0,
        interactive: true,
      });

      map.on('load', () => {
        // Alterada a cor do oceano para um tom verde-azulado claro
        map.setPaintProperty('water', 'fill-color', '#d4e6e8'); 
        // Mantemos os continentes com um cinza claro para garantir o contraste
        map.setPaintProperty('land', 'fill-color', '#f0f0f0');

        // Adiciona terreno 3D
        map.addSource('mapbox-dem', {
          'type': 'raster-dem',
          'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
          'tileSize': 512,
          'maxzoom': 14
        });
        map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

        // Animação de abertura com aproximação suave
        map.flyTo({
            center: [-52, -14.5],
            zoom: 3.8,
            pitch: 50,
            bearing: -15,
            speed: 0.5,
            curve: 1,
            easing(t) { return t; },
        });
        
        onMapLoad(map);
      });

      return () => map.remove();
    }
  }, [onMapLoad]);

  return <div ref={mapContainer} className="absolute top-0 left-0 w-full h-full" />;
}
