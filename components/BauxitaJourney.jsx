'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import BlurTextReveal from '@/components/ui/BlurTextReveal';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

function setupGltfLoader(loader, gl) {
  const ktx2Loader = new KTX2Loader()
    .setTranscoderPath('/three/basis/')
    .detectSupport(gl);
  loader.setKTX2Loader(ktx2Loader);
  loader.setMeshoptDecoder(MeshoptDecoder);
}

const RED_RGB = [0x8b / 255, 0x4a / 255, 0x3c / 255];
// Patches determinísticos: manchas minerais irregulares, nunca círculos perfeitos.
const MINERAL_PATCHES = [
  { x: -0.62, y: 0.32, z: 0.18, radius: 0.26, strength: 0.92 },
  { x: -0.28, y: -0.18, z: 0.46, radius: 0.2, strength: 0.8 },
  { x: 0.12, y: 0.5, z: -0.28, radius: 0.3, strength: 0.86 },
  { x: 0.48, y: 0.12, z: 0.36, radius: 0.24, strength: 0.9 },
  { x: 0.58, y: -0.42, z: -0.18, radius: 0.29, strength: 0.78 },
  { x: -0.42, y: -0.52, z: -0.38, radius: 0.22, strength: 0.88 },
  { x: 0.04, y: -0.12, z: -0.62, radius: 0.18, strength: 0.72 },
];

function hash01(x, y, z) {
  const value = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return value - Math.floor(value);
}

function getPatchInfluence(nx, ny, nz) {
  let influence = 0;
  MINERAL_PATCHES.forEach((patch) => {
    const dx = (nx - patch.x) * 1.15;
    const dy = (ny - patch.y) * 0.95;
    const dz = (nz - patch.z) * 1.1;
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const irregularity = 0.78 + hash01(nx * 3.1, ny * 5.7, nz * 8.9) * 0.34;
    const radius = patch.radius * irregularity;
    const local = 1 - THREE.MathUtils.smoothstep(distance, radius * 0.92, radius);
    influence = Math.max(influence, local * patch.strength);
  });
  return THREE.MathUtils.clamp(influence, 0, 1);
}

// Componente Perfil (Estágio 4 & Transição Estágio 5)
function AluminumProfile({ scrollProgress }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current && meshRef.current.visible) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  useEffect(() => {
    if (!meshRef.current) return;

    const transitionProgress = Math.max(0, Math.min(1, (scrollProgress - 85) / 15));
    const fadeOutStage5 = Math.max(0, Math.min(1, (scrollProgress - 115) / 10));

    const finalScale = transitionProgress * (1 - fadeOutStage5);
    meshRef.current.scale.setScalar(finalScale);
    meshRef.current.material.opacity = transitionProgress * (1 - fadeOutStage5);
    meshRef.current.visible = finalScale > 0.01;

    if (scrollProgress > 100) {
      const returnProgress = Math.max(0, Math.min(1, (scrollProgress - 100) / 15));
      meshRef.current.position.x = -2.5 + returnProgress * 4.5;
      meshRef.current.rotation.z = returnProgress * 0.5;
    } else {
      meshRef.current.position.x = -2.5;
      meshRef.current.rotation.z = 0;
    }
  }, [scrollProgress]);

  return (
    <mesh ref={meshRef} position={[-2.5, 0, 0]} visible={false}>
      <boxGeometry args={[0.4, 0.4, 3]} />
      <meshStandardMaterial
        color="#C4C8CC"
        metalness={0.9}
        roughness={0.2}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

// Alumina — mesmo GLB da Bauxita, clonado e desformado (massa orgânica clara)
function Alumina({ scrollProgress }) {
  const groupRef = useRef();
  const scanLineRef = useRef();
  const particlesRef = useRef();
  const { gl } = useThree();

  const gltf = useLoader(GLTFLoader, '/assets/rock1-opt.glb', (loader) => {
    setupGltfLoader(loader, gl);
  });

  const aluminaObject = useMemo(() => {
    const clone = gltf.scene.clone(true);
    const bounds = new THREE.Box3().setFromObject(clone);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();

    bounds.getCenter(center);
    bounds.getSize(size);
    clone.position.sub(center);

    const maxDimension = Math.max(size.x, size.y, size.z) || 1;
    clone.scale.setScalar(2.4 / maxDimension);

    clone.traverse((child) => {
      if (!child.isMesh || !child.geometry) return;

      child.geometry = child.geometry.clone();
      const position = child.geometry.attributes.position;
      if (!position) return;

      const vector = new THREE.Vector3();
      for (let i = 0; i < position.count; i++) {
        vector.fromBufferAttribute(position, i);
        const noise = 0.86 + Math.random() * 0.28;
        vector.multiplyScalar(noise);
        position.setXYZ(i, vector.x, vector.y, vector.z);
      }
      position.needsUpdate = true;
      child.geometry.computeVertexNormals();

      child.material = new THREE.MeshStandardMaterial({
        color: '#E8E0D5',
        roughness: 0.85,
        metalness: 0.05,
        transparent: true,
        opacity: 1,
        flatShading: false,
        depthWrite: false,
      });
    });

    return clone;
  }, [gltf]);

  const particlesGeom = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    for (let i = 0; i < 50; i++) {
      positions.push(
        (Math.random() - 0.5) * 2.5,
        (Math.random() - 0.5) * 2.5,
        (Math.random() - 0.5) * 2.5,
      );
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current && groupRef.current.visible) {
      groupRef.current.rotation.y += delta * 0.2;
    }
    if (particlesRef.current && particlesRef.current.visible) {
      particlesRef.current.rotation.y += delta * 0.1;
    }
  });

  useEffect(() => {
    if (!groupRef.current) return;

    const growthProgress = Math.max(0, Math.min(1, (scrollProgress - 68) / 17));
    const fadeOutProgress = Math.max(0, Math.min(1, (scrollProgress - 85) / 15));

    const finalScale = growthProgress * (1 - fadeOutProgress);
    const opacity = growthProgress * (1 - fadeOutProgress);
    const isVisible = finalScale > 0.02;

    groupRef.current.scale.setScalar(Math.max(finalScale, 0.001));
    groupRef.current.position.x = 2.5 - growthProgress * 5;
    groupRef.current.visible = isVisible;

    groupRef.current.traverse((child) => {
      if (!child.isMesh || !child.material) return;
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      materials.forEach((material) => {
        material.opacity = opacity;
        material.transparent = true;
        material.depthWrite = false;
      });
    });

    const techProgress = Math.max(0, Math.min(1, (scrollProgress - 70) / 15));
    const techFadeOut = Math.max(0, Math.min(1, (scrollProgress - 85) / 10));

    if (scanLineRef.current) {
      scanLineRef.current.position.x = groupRef.current.position.x;
      scanLineRef.current.position.y = 1.5 - techProgress * 3;
      scanLineRef.current.material.opacity =
        Math.sin(techProgress * Math.PI) * 0.8 * (1 - techFadeOut);
      scanLineRef.current.visible = scanLineRef.current.material.opacity > 0.02;
    }

    if (particlesRef.current) {
      particlesRef.current.position.x = groupRef.current.position.x;
      particlesRef.current.material.opacity = techProgress * 0.5 * (1 - techFadeOut);
      particlesRef.current.visible = particlesRef.current.material.opacity > 0.02;
    }
  }, [scrollProgress]);

  return (
    <group>
      <group ref={groupRef}>
        <primitive object={aluminaObject} />
      </group>

      <mesh ref={scanLineRef} position={[0, 0, 0.5]} visible={false}>
        <planeGeometry args={[2.5, 0.02]} />
        <meshBasicMaterial color="#d8e8ff" transparent depthWrite={false} />
      </mesh>

      <points ref={particlesRef} geometry={particlesGeom} visible={false}>
        <pointsMaterial color="#E8E0D5" size={0.05} transparent opacity={0} depthWrite={false} />
      </points>
    </group>
  );
}

// Extração Mineral — fluxo de partículas Bauxita → Alumina via curva Bézier
function MineralStream({ scrollProgress }) {
  const scrollRef = useRef(scrollProgress);
  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  const FLOW_COUNT = 180;
  const FOG_COUNT = 70;

  const flowRef = useRef();
  const flowGeom = useRef();
  const fogRef = useRef();
  const fogGeom = useRef();

  // Arco elegante: Bauxita (direita) → Alumina (esquerda), arqueado para cima
  const curve = useMemo(() => new THREE.CubicBezierCurve3(
    new THREE.Vector3(2.4, 0.1, 0.0),
    new THREE.Vector3(1.6, 2.0, 0.5),
    new THREE.Vector3(-1.6, 1.8, -0.3),
    new THREE.Vector3(-2.4, 0.1, 0.0),
  ), []);

  // Dados determinísticos do fluxo principal (fase, velocidade, jitter)
  const flowData = useMemo(() => Array.from({ length: FLOW_COUNT }, (_, i) => {
    const h = (s) => { const v = Math.sin(i * 13.7 + s * 31.1) * 43758.5; return v - Math.floor(v); };
    return {
      phase: i / FLOW_COUNT,
      speed: 0.10 + h(1) * 0.16,
      jx: (h(2) - 0.5) * 0.22,
      jy: (h(3) - 0.5) * 0.18,
      jz: (h(4) - 0.5) * 0.28,
      fx: 1.4 + h(5) * 2.2,
      fy: 1.1 + h(6) * 1.9,
    };
  }), []);

  // Dados determinísticos da névoa difusa (jitter maior, velocidade menor)
  const fogData = useMemo(() => Array.from({ length: FOG_COUNT }, (_, i) => {
    const h = (s) => { const v = Math.sin(i * 17.3 + s * 41.7) * 43758.5; return v - Math.floor(v); };
    return {
      phase: i / FOG_COUNT,
      speed: 0.04 + h(1) * 0.07,
      jx: (h(2) - 0.5) * 0.72,
      jy: (h(3) - 0.5) * 0.60,
      jz: (h(4) - 0.5) * 0.80,
    };
  }), []);

  // Buffers mutáveis — alocados uma vez, nunca recriados no loop
  const flowPos = useMemo(() => new Float32Array(FLOW_COUNT * 3), []);
  const flowCol = useMemo(() => new Float32Array(FLOW_COUNT * 3), []);
  const fogPos = useMemo(() => new Float32Array(FOG_COUNT * 3), []);

  // Objetos auxiliares reutilizáveis (sem alocação dentro do loop)
  const tmpVec = useMemo(() => new THREE.Vector3(), []);
  const tmpCol = useMemo(() => new THREE.Color(), []);
  const bauxCol = useMemo(() => new THREE.Color('#8B4A3C'), []);
  const alumCol = useMemo(() => new THREE.Color('#E8E0D5'), []);

  useFrame((state) => {
    const p = scrollRef.current;

    // Janela de extração: 45 → 85
    const fadeIn = THREE.MathUtils.clamp((p - 45) / 13, 0, 1);
    const fadeOut = 1 - THREE.MathUtils.clamp((p - 74) / 10, 0, 1);
    const alpha = fadeIn * fadeOut;

    const active = alpha > 0.01;

    if (flowRef.current) {
      flowRef.current.visible = active;
      if (active) flowRef.current.material.opacity = alpha * 0.90;
    }
    if (fogRef.current) {
      fogRef.current.visible = active;
      if (active) fogRef.current.material.opacity = alpha * 0.26;
    }
    if (!active) return;

    const t = state.clock.elapsedTime;

    // — Fluxo principal: posição na curva + jitter oscilatório —
    for (let i = 0; i < FLOW_COUNT; i++) {
      const d = flowData[i];
      const loopT = (t * d.speed + d.phase) % 1.0;

      curve.getPoint(loopT, tmpVec);

      flowPos[i * 3] = tmpVec.x + d.jx * Math.sin(t * d.fx + d.phase * 6.2832);
      flowPos[i * 3 + 1] = tmpVec.y + d.jy * Math.cos(t * d.fy + d.phase * 6.2832);
      flowPos[i * 3 + 2] = tmpVec.z + d.jz;

      // Gradiente terracota (bauxita) → cinza-claro (alumina) ao longo do arco
      tmpCol.lerpColors(bauxCol, alumCol, loopT);
      flowCol[i * 3] = tmpCol.r;
      flowCol[i * 3 + 1] = tmpCol.g;
      flowCol[i * 3 + 2] = tmpCol.b;
    }

    if (flowGeom.current) {
      flowGeom.current.attributes.position.needsUpdate = true;
      flowGeom.current.attributes.color.needsUpdate = true;
    }

    // — Névoa dispersa: mesmo arco, jitter amplo, velocidade lenta —
    for (let i = 0; i < FOG_COUNT; i++) {
      const d = fogData[i];
      const loopT = (t * d.speed + d.phase) % 1.0;

      curve.getPoint(loopT, tmpVec);

      fogPos[i * 3] = tmpVec.x + d.jx * Math.sin(t * 0.65 + d.phase * 6.2832);
      fogPos[i * 3 + 1] = tmpVec.y + d.jy * Math.cos(t * 0.50 + d.phase * 6.2832);
      fogPos[i * 3 + 2] = tmpVec.z + d.jz;
    }

    if (fogGeom.current) {
      fogGeom.current.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Fluxo principal com gradiente de cor bauxita → alumina */}
      <points ref={flowRef} visible={false}>
        <bufferGeometry ref={flowGeom}>
          <bufferAttribute
            attach="attributes-position"
            count={FLOW_COUNT}
            array={flowPos}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={FLOW_COUNT}
            array={flowCol}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          size={0.065}
          transparent
          opacity={0}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* Névoa etérea — partículas difusas ao redor do jato */}
      <points ref={fogRef} visible={false}>
        <bufferGeometry ref={fogGeom}>
          <bufferAttribute
            attach="attributes-position"
            count={FOG_COUNT}
            array={fogPos}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#EDE6D8"
          size={0.030}
          transparent
          opacity={0}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
// Bauxita — GLB real
function Bauxita({ scrollProgress }) {
  const groupRef = useRef();
  const { gl } = useThree();
  const gltf = useLoader(GLTFLoader, '/assets/rock1-opt.glb', (loader) => {
    setupGltfLoader(loader, gl);
  });

  const rockObject = useMemo(() => {
    const clone = gltf.scene.clone(true);
    const bounds = new THREE.Box3().setFromObject(clone);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();

    bounds.getCenter(center);
    bounds.getSize(size);
    clone.position.sub(center);

    const maxDimension = Math.max(size.x, size.y, size.z) || 1;
    clone.scale.setScalar(3.6 / maxDimension);

    clone.traverse((child) => {
      if (!child.isMesh || !child.material) return;

      const materials = Array.isArray(child.material) ? child.material : [child.material];
      const preparedMaterials = materials.map((material) => {
        const prepared = material.clone();
        if (prepared.color) prepared.color.set('#8B4A3C');
        if ('roughness' in prepared) prepared.roughness = 0.82;
        if ('metalness' in prepared) prepared.metalness = 0.08;
        prepared.transparent = true;
        prepared.needsUpdate = true;
        return prepared;
      });

      child.material = Array.isArray(child.material) ? preparedMaterials : preparedMaterials[0];
    });

    return clone;
  }, [gltf]);

  useEffect(() => {
    if (!groupRef.current) return;

    const stage2Progress = Math.max(0, Math.min(1, (scrollProgress - 20) / 35));
    groupRef.current.position.x = stage2Progress * 2.5;
    groupRef.current.rotation.z = stage2Progress * 0.26;

    const fractureProgress = Math.max(0, Math.min(1, (scrollProgress - 50) / 5));
    groupRef.current.rotation.y = fractureProgress * 0.12;
    groupRef.current.scale.x = 1 - fractureProgress * 0.06;

    const fadeOutProgress = Math.max(0, Math.min(1, (scrollProgress - 55) / 15));
    const opacity = 1 - fadeOutProgress;
    groupRef.current.visible = opacity > 0.02;
    groupRef.current.traverse((child) => {
      if (!child.isMesh || !child.material) return;
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      materials.forEach((material) => {
        material.opacity = opacity;
        material.transparent = true;
      });
    });
  }, [scrollProgress]);

  return (
    <group ref={groupRef}>
      <primitive object={rockObject} />
    </group>
  );
}

export default function BauxitaJourney() {
  const containerRef = useRef();
  const [scrollProgress, setScrollProgress] = useState(0);

  useGSAP(() => {
    if (!containerRef.current) return;

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=450%',
      pin: true,
      pinSpacing: true,
      scrub: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        setScrollProgress(self.progress * 150);
      },
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      st.kill();
    };
  }, { scope: containerRef });

  const photoProgress = Math.max(0, Math.min(1, (scrollProgress - 125) / 15));
  const photoScale = 0.95 + photoProgress * 0.05;
  const photoOpacity = photoProgress;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden"
    >
      <div className="absolute top-[20%] z-20 w-full text-center px-4 pointer-events-none">
        {scrollProgress < 55 && (
          <h1 className="block pl-[4%] text-left text-5xl md:text-8xl font-bold tracking-[0.16em] text-white uppercase">
            BAUXITA
          </h1>
        )}
        {scrollProgress >= 70 && scrollProgress < 100 && (
          <div className="absolute left-[10%] top-[40%] text-left">
            <BlurTextReveal
              text="Refinado com precisão"
              className="text-sm md:text-base font-medium text-[#acaba9] uppercase tracking-widest"
              stagger={0.05}
            />
          </div>
        )}
        {scrollProgress >= 105 && scrollProgress < 118 && (
          <div className="absolute right-[10%] top-[40%] text-right">
            <BlurTextReveal
              text="Transformado em precisão estrutural"
              className="text-sm md:text-base font-medium text-[#acaba9] uppercase tracking-widest"
              stagger={0.05}
            />
          </div>
        )}
      </div>

      <div
        className="w-full h-full"
        style={{
          opacity: 1 - Math.max(0, Math.min(1, (scrollProgress - 125) / 10)),
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{ alpha: false, antialias: true, powerPreference: 'high-performance' }}
          onCreated={({ gl }) => gl.setClearColor('#000000', 1)}
        >
          <ambientLight intensity={1.2} />
          <directionalLight position={[5, 5, 5]} intensity={2.0} />
          <directionalLight position={[-3, 3, -5]} intensity={0.8} color="#ffffff" />
          <pointLight position={[-5, -5, -5]} intensity={0.6} color="#A0522D" />

          <Bauxita scrollProgress={scrollProgress} />
          <MineralStream scrollProgress={scrollProgress} />
          <Alumina scrollProgress={scrollProgress} />
          <AluminumProfile scrollProgress={scrollProgress} />
        </Canvas>
      </div>

      {scrollProgress >= 120 && (
        <div
          className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none px-4"
          style={{ opacity: photoOpacity }}
        >
          <div
            className="relative w-full max-w-4xl aspect-video overflow-hidden rounded-lg shadow-2xl"
            style={{ transform: `scale(${photoScale})` }}
          >
            <Image
              src="/images/obra-2-porta-ripado.webp"
              alt="Residência Privada - Montabox"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {scrollProgress >= 135 && (
            <div className="mt-8">
              <BlurTextReveal
                text="Da rocha à sua porta."
                className="text-4xl md:text-6xl font-bold text-[#eaeaea] tracking-tight"
                stagger={0.08}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
