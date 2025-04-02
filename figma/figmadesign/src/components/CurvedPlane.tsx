import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useSceneStore } from '../store/sceneStore';

export const CurvedPlane: React.FC = () => {
  const { curve, distance, height } = useSceneStore();
  
  const geometry = useMemo(() => {
    const width = 16;
    const height = 9;
    const segments = 50;
    
    const geometry = new THREE.PlaneGeometry(width, height, segments, segments);
    const positionAttribute = geometry.attributes.position;
    
    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      const z = (x * x) * (curve / 1000);
      const y = positionAttribute.getY(i);
      
      positionAttribute.setXYZ(i, x, y, z);
    }
    
    geometry.computeVertexNormals();
    return geometry;
  }, [curve]);

  return (
    <mesh
      geometry={geometry}
      position={[0, height, -distance]}
      rotation={[0, 0, 0]}
    >
      <meshBasicMaterial
        color="#ffffff"
        wireframe
        opacity={0.3}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};