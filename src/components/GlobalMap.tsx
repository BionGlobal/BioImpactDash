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
  const isSpinning = useRef(true); // Usamos useRef para controlar o estado da animação

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

        // ### INÍCIO DA NOVA ANIMAÇÃO DE ROTAÇÃO E ZOOM ###
        
        // Função que faz o globo girar
        const spinGlobe = () => {
          if (!isSpinning.current) return; // Para a animação
          const center = map.getCenter();
          center.lng -= 0.1; // Velocidade da rotação
          map.easeTo({ center, duration: 0, easing: (n) => n });
          requestAnimationFrame(spinGlobe);
        }

        // Inicia a rotação
        spinGlobe();

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

        // Ouve o final do movimento 'flyTo' para parar a rotação
        map.once('moveend', () => {
          isSpinning.current = false;
        });
        
        // ### FIM DA NOVA ANIMAÇÃO ###
        
        onMapLoad(map);
      });

      return () => map.remove();
    }
  }, [onMapLoad]);

  return <div ref={mapContainer} className="absolute top-0 left-0 w-full h-full" />;
}
