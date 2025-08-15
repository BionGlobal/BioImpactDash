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

  useEffect(() => {
    if (mapContainer.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11', // Mantemos a base clara
        center: [-55, -15],
        zoom: 2,
        pitch: 45,
        bearing: 0,
        interactive: true,
      });

      map.on('load', () => {
        // ### INÍCIO DA ALTERAÇÃO DE CONTRASTE ###
        // Removemos camadas desnecessárias para um visual mais limpo
        map.removeLayer('road-major-label');
        map.removeLayer('road-street-label');
        map.removeLayer('road-minor-label');
        
        // Aplicamos as novas cores para criar contraste
        map.setPaintProperty('water', 'fill-color', '#eef2f9'); // Oceano com um tom cinza-azulado muito claro
        map.setPaintProperty('land', 'fill-color', '#d1d5db'); // Continentes com um cinza claro
        map.setPaintProperty('national-park', 'fill-color', '#e5e7eb'); // Parques/áreas verdes com um tom intermédio
        // ### FIM DA ALTERAÇÃO DE CONTRASTE ###

        // Adiciona terreno 3D
        map.addSource('mapbox-dem', {
          'type': 'raster-dem',
          'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
          'tileSize': 512,
          'maxzoom': 14
        });
        map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

        // Animação de entrada suave para enquadrar o Brasil
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
