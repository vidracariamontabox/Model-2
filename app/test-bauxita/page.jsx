'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import BlurTextReveal from '@/components/ui/BlurTextReveal';

gsap.registerPlugin(ScrollTrigger);

// Componente que gera e renderiza a pedra de Bauxita fraturada
function Bauxita({ scrollProgress }) {
  const groupRef = useRef();
  const leftHalfRef = useRef();
  const rightHalfRef = useRef();

  // Gera duas metades de uma geometria irregular (rochosa)
  const { leftGeom, rightGeom } = useMemo(() => {
    const baseGeom = new THREE.IcosahedronGeometry(2, 2);
    const position = baseGeom.attributes.position;
    const vector = new THREE.Vector3();

    // Deformação da rocha
    for (let i = 0; i < position.count; i++) {
      vector.fromBufferAttribute(position, i);
      const noise = 0.8 + Math.random() * 0.4;
      vector.multiplyScalar(noise);
      position.setXYZ(i, vector.x, vector.y, vector.z);
    }
    baseGeom.computeVertexNormals();

    // Cria as duas metades baseadas no eixo X
    const left = baseGeom.clone();
    const right = baseGeom.clone();

    // Filtra vértices para cada metade (simplificado usando Clipping ou BoxMasking na renderização)
    // Para esta etapa, usaremos a mesma geometria mas com materiais que sugerem a fratura
    return { leftGeom: left, rightGeom: right };
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
    // Normalizamos o progresso para o intervalo 20-55
    const stage2Progress = Math.max(0, Math.min(1, (scrollProgress - 20) / 35));

    // 1. Deslocamento horizontal (X: 0 -> 2)
    groupRef.current.position.x = stage2Progress * 2.5;

    // 2. Inclinação (~15 graus = 0.26 rad)
    groupRef.current.rotation.z = stage2Progress * 0.26;

    // 3. Fratura (acontece no final do Estágio 2: 50-55vh)
    const fractureProgress = Math.max(0, Math.min(1, (scrollProgress - 50) / 5));
    
    // Separação sutil das metades
    leftHalfRef.current.position.x = -fractureProgress * 0.15;
    leftHalfRef.current.rotation.y = -fractureProgress * 0.1;
    
    rightHalfRef.current.position.x = fractureProgress * 0.15;
    rightHalfRef.current.rotation.y = fractureProgress * 0.1;

    // O brilho interno (emissiveIntensity) aumenta na fratura
    leftHalfRef.current.material.emissiveIntensity = fractureProgress * 0.5;
    rightHalfRef.current.material.emissiveIntensity = fractureProgress * 0.5;

  }, [scrollProgress]);

  const rockMaterial = (
    <meshStandardMaterial 
      color="#8B4A3C" 
      roughness={0.9} 
      metalness={0.1} 
      flatShading={true}
      emissive="#D2691E"
      emissiveIntensity={0}
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
    // Pin da seção para os Estágios 1 e 2 (0-55vh)
    // Usamos um valor maior de end para simular o scroll necessário
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=150%", // Espaço para scroll
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        // Mapeia o progresso do ScrollTrigger (0-1) para a escala 0-55vh
        setScrollProgress(self.progress * 55);
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full bg-black overflow-hidden">
      {/* Container de altura para permitir scroll */}
      <div className="h-[250vh]">
        <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center">
          
          {/* Estágio 1: Texto BAUXITA */}
          <div className="absolute top-[20%] z-20 w-full text-center px-4 pointer-events-none">
            <BlurTextReveal
              text="BAUXITA"
              className="text-6xl md:text-9xl font-bold tracking-[0.2em] text-white uppercase"
              stagger={0.1}
              play={scrollProgress < 50}
            />
          </div>

          {/* Canvas Three.js */}
          <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={1.5} />
              <pointLight position={[-5, -5, -5]} intensity={0.5} color="#A0522D" />

              <Bauxita scrollProgress={scrollProgress} />
            </Canvas>
          </div>

          {/* Debug Info (Opcional, pode remover depois) */}
          <div className="absolute bottom-4 left-4 text-[10px] text-gray-800 font-mono">
            PROGRESS: {scrollProgress.toFixed(1)}vh
          </div>
        </div>
      </div>
    </div>
  );
}
