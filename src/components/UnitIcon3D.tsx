import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';

interface Unit3DIconProps {
  color: 'primary' | 'secondary' | 'accent';
  position: [number, number, number];
  scale?: number;
  onClick?: () => void;
  onHover?: (hovered: boolean) => void;
}

const AnimatedIcon: React.FC<Unit3DIconProps> = ({ 
  color, 
  position, 
  scale = 1, 
  onClick, 
  onHover 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Get color values based on design system
  const getColors = (colorType: 'primary' | 'secondary' | 'accent') => {
    switch (colorType) {
      case 'primary':
        return { main: '#85d963', glow: '#9fe173' }; // Lime green
      case 'secondary':
        return { main: '#3b82f6', glow: '#60a5fa' }; // Electric blue
      case 'accent':
        return { main: '#a855f7', glow: '#c084fc' }; // Modern lilac
      default:
        return { main: '#85d963', glow: '#9fe173' };
    }
  };

  const colors = getColors(color);

  // Pulsation animation
  useFrame((state) => {
    if (meshRef.current && glowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1;
      meshRef.current.scale.setScalar(scale * pulse);
      glowRef.current.scale.setScalar(scale * pulse * 1.2);
      
      // Gentle rotation
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Main icon */}
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => onHover?.(true)}
        onPointerOut={() => onHover?.(false)}
      >
        <Box args={[0.8, 0.8, 0.8]}>
          <meshPhongMaterial
            color={colors.main}
            transparent
            opacity={0.9}
            shininess={100}
          />
        </Box>
      </mesh>

      {/* Glow effect */}
      <mesh ref={glowRef}>
        <Sphere args={[0.6, 16, 16]}>
          <meshBasicMaterial
            color={colors.glow}
            transparent
            opacity={0.3}
          />
        </Sphere>
      </mesh>

      {/* Ambient particles */}
      <points>
        <sphereGeometry args={[1.5, 32, 32]} />
        <pointsMaterial
          color={colors.glow}
          size={0.02}
          transparent
          opacity={0.6}
        />
      </points>
    </group>
  );
};

interface UnitIcon3DProps {
  units: Array<{
    id: string;
    name: string;
    position: [number, number, number];
    color: 'primary' | 'secondary' | 'accent';
    status: string;
    details: Record<string, any>;
  }>;
  onUnitClick?: (unit: any) => void;
  onUnitHover?: (unit: any | null) => void;
}

const UnitIcon3D: React.FC<UnitIcon3DProps> = ({ 
  units, 
  onUnitClick, 
  onUnitHover 
}) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%',
        pointerEvents: 'auto',
        zIndex: 10
      }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      {units.map((unit) => (
        <AnimatedIcon
          key={unit.id}
          color={unit.color}
          position={unit.position}
          onClick={() => onUnitClick?.(unit)}
          onHover={(hovered) => onUnitHover?.(hovered ? unit : null)}
        />
      ))}
    </Canvas>
  );
};

export default UnitIcon3D;