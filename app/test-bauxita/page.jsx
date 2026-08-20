'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import BlurTextReveal from '@/components/ui/BlurTextReveal';

gsap.registerPlugin(ScrollTrigger);

// Função para dividir a geometria em duas metades reais
function splitGeometryByPlane(geometry, planeX = 0) {
  // Garantir que a geometria tenha índices para a iteração por triângulos
  const indexedGeometry = geometry.index ? geometry : BufferGeometryUtils.mergeVertices(geometry);
  const position = indexedGeometry.attributes.position;
  const index = indexedGeometry.index;
  
  const leftPositions = [];
  const rightPositions = [];
  
  // Itera por triângulos (grupos de 3 índices)
  for (let i = 0; i < index.count; i += 3) {
    const a = index.getX(i);
    const b = index.getX(i + 1);
    const c = index.getX(i + 2);
    
    // Calcula o centro do triângulo no eixo X para decidir a qual metade pertence
    const centerX = (position.getX(a) + position.getX(b) + position.getX(c)) / 3;
    
    const target = centerX < planeX ? leftPositions : rightPositions;
    
    // Adiciona os 3 vértices do triângulo (posição completa xyz de cada um)
    [a, b, c].forEach((idx) => {
      target.push(position.getX(idx), position.getY(idx), position.getZ(idx));
    });
  }
  
  const leftGeom = new THREE.BufferGeometry();
  leftGeom.setAttribute('position', new THREE.Float32BufferAttribute(leftPositions, 3));
  leftGeom.computeVertexNormals();
  
  const rightGeom = new THREE.BufferGeometry();
  rightGeom.setAttribute('position', new THREE.Float32BufferAttribute(rightPositions, 3));
  rightGeom.computeVertexNormals();
  
  return { leftGeom, rightGeom };
}

// Componente que gera e renderiza a pedra de Bauxita fraturada (Metades Reais)
function Bauxita({ scrollProgress }) {
  const groupRef = useRef();
  const leftHalfRef = useRef();
  const rightHalfRef = useRef();

  const { leftGeom, rightGeom } = useMemo(() => {
    // 1. Gera a geometria base deformada
    const baseGeom = new THREE.IcosahedronGeometry(2, 2);
    const position = baseGeom.attributes.position;
    const vector = new THREE.Vector3();

    for (let i = 0; i < position.count; i++) {
      vector.fromBufferAttribute(position, i);
      const noise = 0.8 + Math.random() * 0.4;
      vector.multiplyScalar(noise);
      position.setXYZ(i, vector.x, vector.y, vector.z);
    }
    baseGeom.computeVertexNormals();

    // 2. Divide em duas metades reais
    return splitGeometryByPlane(baseGeom, 0);
  }, []);

  // Rotação sutil contínua (0.07 rad/s no eixo Y)
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.07;
    }
  });

  // Aplica a coreografia baseada no scrollProgress
  useEffect(() => {
    if (!groupRef.current || !leftHalfRef.current || !rightHalfRef.current) return;

    // Estágio 2 (20-55vh): Deslocamento + Inclinação + Fratura
    const stage2Progress = Math.max(0, Math.min(1, (scrollProgress - 20) / 35));

    // 1. Deslocamento horizontal (X: 0 -> 2.5)
    groupRef.current.position.x = stage2Progress * 2.5;

    // 2. Inclinação (~15 graus = 0.26 rad)
    groupRef.current.rotation.z = stage2Progress * 0.26;

    // 3. Fratura (50-55vh)
    const fractureProgress = Math.max(0, Math.min(1, (scrollProgress - 50) / 5));
    
    // Separação real das metades
    leftHalfRef.current.position.x = -fractureProgress * 0.2;
    leftHalfRef.current.rotation.y = -fractureProgress * 0.15;
    
    rightHalfRef.current.position.x = fractureProgress * 0.2;
    rightHalfRef.current.rotation.y = fractureProgress * 0.15;

    // Brilho emissivo nas faces expostas
    leftHalfRef.current.material.emissiveIntensity = fractureProgress * 0.6;
    rightHalfRef.current.material.emissiveIntensity = fractureProgress * 0.6;

  }, [scrollProgress]);

  const rockMaterial = (
    <meshStandardMaterial 
      color="#8B4A3C" 
      roughness={0.9} 
      metalness={0.1} 
      flatShading={true}
      emissive="#D2691E"
      emissiveIntensity={0}
      side={THREE.DoubleSide} // Garante que as faces internas sejam visíveis
    />
  );

  return (
    <group ref={groupRef}>
      <mesh ref={leftHalfRef} geometry={leftGeom}>
        {rockMaterial}
      </mesh>
      <mesh ref={rightHalfRef} geometry={rightGeom}>
        {rockMaterial}
      </mesh>
    </group>
  );
}

export default function TestBauxitaPage() {
  const containerRef = useRef();
  const [scrollProgress, setScrollProgress] = useState(0);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=150%",
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        setScrollProgress(self.progress * 55);
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full bg-black overflow-hidden">
      <div className="h-[250vh]">
        <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center">
          
          <div className="absolute top-[20%] z-20 w-full text-center px-4 pointer-events-none">
            <BlurTextReveal
              text="BAUXITA"
              className="text-6xl md:text-9xl font-bold tracking-[0.2em] text-white uppercase"
              stagger={0.1}
              play={scrollProgress < 50}
            />
          </div>

          <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={1.5} />
              <pointLight position={[-5, -5, -5]} intensity={0.5} color="#A0522D" />

              <Bauxita scrollProgress={scrollProgress} />
            </Canvas>
          </div>

          <div className="absolute bottom-4 left-4 text-[10px] text-gray-800 font-mono">
            PROGRESS: {scrollProgress.toFixed(1)}vh
          </div>
        </div>
      </div>
    </div>
  );
}
