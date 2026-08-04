"use client";

import {useEffect, useRef} from "react";
import {useFrame} from "@react-three/fiber";

export default function GlowCursor({mousePos}) {
  const meshRef = useRef(null);
  const targetRef = useRef({x: 0, y: 0});

  // Atualiza o alvo quando o mouse move
  useEffect(() => {
    if (mousePos.x === -999) return;
    const zoomLevel = 50;
    targetRef.current = {
      x: mousePos.x / zoomLevel - window.innerWidth / 2 / zoomLevel,
      y: -(mousePos.y / zoomLevel - window.innerHeight / 2 / zoomLevel),
    };
  }, [mousePos]);

  // Lerp suave a cada frame (atraso)
  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    if (mousePos.x === -999) {
      mesh.visible = false;
      return;
    }

    mesh.visible = true;

    // 0.08 = velocidade do atraso (menor = mais lento)
    mesh.position.x += (targetRef.current.x - mesh.position.x) * 0.08;
    mesh.position.y += (targetRef.current.y - mesh.position.y) * 0.08;
    mesh.position.z = -5;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]} visible={false}>
      <sphereGeometry args={[2.2, 24, 24]} />
      <meshBasicMaterial color="green" transparent opacity={0.15} fog={false} />
    </mesh>
  );
}
