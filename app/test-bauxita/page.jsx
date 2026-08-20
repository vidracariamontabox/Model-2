'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Componente que gera e renderiza a pedra de Bauxita
function Bauxita() {
  const meshRef = useRef();

  // Gera uma geometria irregular (rochosa) deformando uma Icosahedron
  const rockGeometry = useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(2, 2); // Raio 2, detalhe 2 para faces visíveis
    const position = geometry.attributes.position;
    const vector = new THREE.Vector3();

    for (let i = 0; i < position.count; i++) {
      vector.fromBufferAttribute(position, i);
      // Adiciona ruído aleatório para criar a textura de rocha
      const noise = 0.8 + Math.random() * 0.4;
      vector.multiplyScalar(noise);
      position.setXYZ(i, vector.x, vector.y, vector.z);
    }
    
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  // Rotação sutil contínua (0.05 rad/s)
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5; // Ajustado para 0.5 para ser visível mas sutil
      meshRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} geometry={rockGeometry}>
      <meshStandardMaterial 
        color="#8B4A3C" // Tom terroso de Bauxita
        roughness={0.9} // Material fosco
        metalness={0.1} // Baixo metalismo
        flatShading={true} // Reforça o aspecto facetado da rocha
      />
    </mesh>
  );
}

export default function TestBauxitaPage() {
  return (
    <main className="w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Título temporário para contexto */}
      <div className="absolute top-10 z-10 text-center">
        <h1 className="text-white text-4xl font-bold tracking-widest uppercase opacity-50">
          Teste: Etapa 1 - Modelo Bauxita
        </h1>
        <p className="text-gray-500 mt-2 italic">
          (Geometria irregular, material fosco, rotação sutil)
        </p>
      </div>

      {/* Canvas Three.js */}
      <div className="w-full h-full">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          {/* Iluminação */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#A0522D" />

          {/* O Modelo */}
          <Bauxita />
        </Canvas>
      </div>

      {/* Instruções para o William */}
      <div className="absolute bottom-10 z-10 text-gray-600 text-sm">
        Pressione F5 se a cena não carregar instantaneamente.
      </div>
    </main>
  );
}
