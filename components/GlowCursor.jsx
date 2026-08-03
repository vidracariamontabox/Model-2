"use client";

import {useEffect, useRef} from "react";
import {useThree} from "@react-three/fiber";

export default function GlowCursor({mousePos}) {
  const meshRef = useRef(null);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    if (mousePos.x === -999) {
      mesh.visible = false;
      return;
    }

    mesh.visible = true;

    const zoomLevel = 50;
    const x = mousePos.x / zoomLevel - window.innerWidth / 2 / zoomLevel;
    const y = -(mousePos.y / zoomLevel - window.innerHeight / 2 / zoomLevel);

    mesh.position.set(x, y, -5);
  }, [mousePos]);

  return (
    <mesh ref={meshRef} position={[0, 0, -5]} visible={false}>
      <sphereGeometry args={[80, 24, 24]} />
      <meshBasicMaterial
        color="#7ddc7a"
        emissive="#55c96d"
        emissiveIntensity={0.95}
        transparent
        opacity={0.35}
        fog={false}
      />
    </mesh>
  );
}
