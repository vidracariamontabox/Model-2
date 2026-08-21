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
  const indexedGeometry = geometry.index ? geometry : BufferGeometryUtils.mergeVertices(geometry);
  const position = indexedGeometry.attributes.position;
  const index = indexedGeometry.index;
  
  const leftPositions = [];
  const rightPositions = [];
  
  for (let i = 0; i < index.count; i += 3) {
    const a = index.getX(i);
    const b = index.getX(i + 1);
    const c = index.getX(i + 2);
    const centerX = (position.getX(a) + position.getX(b) + position.getX(c)) / 3;
    const target = centerX < planeX ? leftPositions : rightPositions;
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

// Componente Alumina (Estágio 3)
function Alumina({ scrollProgress }) {
  const meshRef = useRef();
  const scanLineRef = useRef();
  const particlesRef = useRef();

  const aluminaGeom = useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(1, 3);
    const position = geometry.attributes.position;
    const vector = new THREE.Vector3();
    for (let i = 0; i < position.count; i++) {
      vector.fromBufferAttribute(position, i);
      const noise = 0.95 + Math.random() * 0.1;
      vector.multiplyScalar(noise);
      position.setXYZ(i, vector.x, vector.y, vector.z);
    }
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  const particlesGeom = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    for (let i = 0; i < 50; i++) {
      positions.push((Math.random() - 0.5) * 2.5, (Math.random() - 0.5) * 2.5, (Math.random() - 0.5) * 2.5);
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.2;
    if (particlesRef.current) particlesRef.current.rotation.y += delta * 0.1;
  });

  useEffect(() => {
    if (!meshRef.current) return;

    // Estágio 3: 55-70vh (Crescimento e Deslocamento)
    const growthProgress = Math.max(0, Math.min(1, (scrollProgress - 55) / 15));
    meshRef.current.scale.setScalar(growthProgress);
    meshRef.current.position.x = 2.5 - (growthProgress * 5); // De 2.5 (pedra) para -2.5 (esquerda)
    meshRef.current.material.opacity = growthProgress;

    // Elementos de Tecnologia: 70-85vh
    const techProgress = Math.max(0, Math.min(1, (scrollProgress - 70) / 15));
    
    // Linha de Scan
    if (scanLineRef.current) {
      scanLineRef.current.position.x = meshRef.current.position.x;
      scanLineRef.current.position.y = 1.5 - (techProgress * 3); // Varre de 1.5 a -1.5
      scanLineRef.current.material.opacity = Math.sin(techProgress * Math.PI) * 0.8;
    }

    // Partículas
    if (particlesRef.current) {
      particlesRef.current.position.x = meshRef.current.position.x;
      particlesRef.current.material.opacity = techProgress * 0.5;
    }

  }, [scrollProgress]);

  return (
    <group>
      <mesh ref={meshRef} geometry={aluminaGeom} transparent>
        <meshStandardMaterial color="#E8E0D5" roughness={0.85} metalness={0.05} flatShading />
      </mesh>
      
      {/* Linha de Scan */}
      <mesh ref={scanLineRef} position={[0, 0, 0.5]} transparent>
        <planeGeometry args={[2.5, 0.02]} />
        <meshBasicMaterial color="#d8e8ff" transparent emissive="#d8e8ff" emissiveIntensity={2} />
      </mesh>

      {/* Partículas */}
      <points ref={particlesRef} geometry={particlesGeom}>
        <pointsMaterial color="#E8E0D5" size={0.05} transparent opacity={0} />
      </points>
    </group>
  );
}

// Componente Bauxita (Estágios 1 e 2)
function Bauxita({ scrollProgress }) {
  const groupRef = useRef();
  const leftHalfRef = useRef();
  const rightHalfRef = useRef();

  const { leftGeom, rightGeom } = useMemo(() => {
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
    return splitGeometryByPlane(baseGeom, 0);
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.07;
  });

  useEffect(() => {
    if (!groupRef.current || !leftHalfRef.current || !rightHalfRef.current) return;

    // Estágio 2: 20-55vh
    const stage2Progress = Math.max(0, Math.min(1, (scrollProgress - 20) / 35));
    groupRef.current.position.x = stage2Progress * 2.5;
    groupRef.current.rotation.z = stage2Progress * 0.26;

    const fractureProgress = Math.max(0, Math.min(1, (scrollProgress - 50) / 5));
    leftHalfRef.current.position.x = -fractureProgress * 0.2;
    leftHalfRef.current.rotation.y = -fractureProgress * 0.15;
    rightHalfRef.current.position.x = fractureProgress * 0.2;
    rightHalfRef.current.rotation.y = fractureProgress * 0.15;
    
    leftHalfRef.current.material.emissiveIntensity = fractureProgress * 0.6;
    rightHalfRef.current.material.emissiveIntensity = fractureProgress * 0.6;

    // Estágio 3: Fade-out da pedra (55-70vh)
    const fadeOutProgress = Math.max(0, Math.min(1, (scrollProgress - 55) / 15));
    groupRef.current.traverse((child) => {
      if (child.isMesh) {
        child.material.opacity = 1 - fadeOutProgress;
        child.material.transparent = true;
      }
    });

  }, [scrollProgress]);

  return (
    <group ref={groupRef}>
      <mesh ref={leftHalfRef} geometry={leftGeom}>
        <meshStandardMaterial color="#8B4A3C" roughness={0.9} metalness={0.1} flatShading emissive="#D2691E" emissiveIntensity={0} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={rightHalfRef} geometry={rightGeom}>
        <meshStandardMaterial color="#8B4A3C" roughness={0.9} metalness={0.1} flatShading emissive="#D2691E" emissiveIntensity={0} side={THREE.DoubleSide} />
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
      end: "+=250%", // Aumentado proporcionalmente para 85vh
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        setScrollProgress(self.progress * 85);
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full bg-black overflow-hidden">
      <div className="h-[350vh]">
        <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center">
          
          {/* Títulos */}
          <div className="absolute top-[20%] z-20 w-full text-center px-4 pointer-events-none">
            {scrollProgress < 55 && (
              <BlurTextReveal
                text="BAUXITA"
                className="text-6xl md:text-9xl font-bold tracking-[0.2em] text-white uppercase"
                stagger={0.1}
                play={scrollProgress < 50}
              />
            )}
            {scrollProgress >= 70 && (
              <div className="absolute left-[10%] top-[40%] text-left">
                <BlurTextReveal
                  text="Refinado com precisão"
                  className="text-sm md:text-base font-medium text-[#acaba9] uppercase tracking-widest"
                  stagger={0.05}
                />
              </div>
            )}
          </div>

          <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={1.5} />
              <pointLight position={[-5, -5, -5]} intensity={0.5} color="#A0522D" />

              <Bauxita scrollProgress={scrollProgress} />
              <Alumina scrollProgress={scrollProgress} />
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
