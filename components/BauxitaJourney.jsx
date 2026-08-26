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

// Alumina — agregado mineral facetado, formado por fragmentos instanciados.
// A forma final é composta por massas assimétricas para não parecer uma esfera
// ou uma cópia clara da Bauxita. Os dados são determinísticos e os buffers
// permanecem reutilizados durante toda a animação.
const ALUMINA_MAIN_FRAGMENTS = [
  { target: [0.00, 0.02, 0.02], origin: [-0.72, 1.10, 0.42], scale: [0.92, 0.72, 0.84], rotation: [0.10, 0.25, -0.08], phase: 0.10 },
  { target: [-0.56, 0.18, 0.04], origin: [-1.50, 0.72, 0.72], scale: [0.68, 0.58, 0.78], rotation: [-0.22, 0.48, 0.14], phase: 1.30 },
  { target: [0.52, -0.16, 0.14], origin: [1.44, 0.96, 0.48], scale: [0.74, 0.52, 0.64], rotation: [0.16, -0.42, 0.20], phase: 2.10 },
  { target: [-0.28, -0.48, -0.12], origin: [-1.10, -1.10, -0.56], scale: [0.78, 0.48, 0.62], rotation: [0.34, 0.16, -0.26], phase: 2.80 },
  { target: [0.34, 0.40, -0.18], origin: [0.80, 1.62, -0.44], scale: [0.62, 0.44, 0.68], rotation: [-0.28, 0.34, 0.12], phase: 3.70 },
  { target: [0.78, 0.10, 0.18], origin: [1.80, -0.42, 0.88], scale: [0.52, 0.42, 0.58], rotation: [0.22, -0.28, 0.36], phase: 4.60 },
  { target: [-0.74, -0.12, -0.22], origin: [-1.82, -0.34, -0.86], scale: [0.50, 0.38, 0.54], rotation: [0.18, 0.52, -0.18], phase: 5.20 },
  { target: [0.02, 0.54, 0.24], origin: [0.10, 1.86, 0.96], scale: [0.44, 0.34, 0.48], rotation: [-0.34, -0.18, 0.28], phase: 5.90 },
  { target: [0.00, -0.12, -0.48], origin: [0.72, -1.60, -1.10], scale: [0.46, 0.36, 0.40], rotation: [0.42, 0.26, -0.30], phase: 6.50 },
];

const ALUMINA_ACCENT_FRAGMENTS = [
  { target: [-0.92, 0.30, 0.12], origin: [-1.80, 1.26, 0.70], scale: [0.24, 0.18, 0.22], rotation: [0.20, 0.40, 0.12], phase: 0.50 },
  { target: [-0.36, 0.62, 0.05], origin: [-0.86, 1.86, 0.42], scale: [0.20, 0.16, 0.24], rotation: [-0.18, 0.32, -0.22], phase: 1.50 },
  { target: [0.62, 0.44, 0.02], origin: [1.62, 1.48, 0.34], scale: [0.22, 0.15, 0.20], rotation: [0.14, -0.30, 0.28], phase: 2.40 },
  { target: [0.98, -0.22, 0.08], origin: [1.94, -0.64, 0.66], scale: [0.18, 0.14, 0.22], rotation: [0.34, -0.16, 0.18], phase: 3.10 },
  { target: [-0.80, -0.44, -0.06], origin: [-1.72, -1.12, -0.22], scale: [0.20, 0.14, 0.18], rotation: [-0.22, 0.28, 0.34], phase: 4.20 },
  { target: [-0.12, -0.68, -0.20], origin: [-0.28, -1.86, -0.54], scale: [0.18, 0.13, 0.20], rotation: [0.28, 0.18, -0.26], phase: 5.00 },
  { target: [0.48, -0.56, -0.18], origin: [1.00, -1.74, -0.66], scale: [0.18, 0.12, 0.16], rotation: [0.18, -0.24, 0.30], phase: 5.80 },
];

function Alumina({ scrollProgress }) {
  const groupRef = useRef();
  const mainRef = useRef();
  const accentRef = useRef();
  const scrollRef = useRef(scrollProgress);
  const matrix = useMemo(() => new THREE.Matrix4(), []);
  const position = useMemo(() => new THREE.Vector3(), []);
  const quaternion = useMemo(() => new THREE.Quaternion(), []);
  const rotation = useMemo(() => new THREE.Euler(), []);
  const scale = useMemo(() => new THREE.Vector3(), []);
  const mainGeometry = useMemo(() => new THREE.DodecahedronGeometry(0.58, 0), []);
  const accentGeometry = useMemo(() => new THREE.IcosahedronGeometry(0.32, 0), []);
  const mainMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#E8E0D5',
    roughness: 0.42,
    metalness: 0.08,
    flatShading: true,
    transparent: true,
    depthWrite: false,
    opacity: 0,
  }), []);
  const accentMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#BFC4C7',
    roughness: 0.34,
    metalness: 0.16,
    flatShading: true,
    transparent: true,
    depthWrite: false,
    opacity: 0,
  }), []);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => () => {
    mainGeometry.dispose();
    accentGeometry.dispose();
    mainMaterial.dispose();
    accentMaterial.dispose();
  }, [accentGeometry, accentMaterial, mainGeometry, mainMaterial]);

  useFrame((state, delta) => {
    const p = scrollRef.current;
    const growth = THREE.MathUtils.clamp((p - 68) / 17, 0, 1);
    const fade = 1 - THREE.MathUtils.clamp((p - 85) / 15, 0, 1);
    const reveal = 1 - Math.pow(1 - growth, 3);
    const alpha = reveal * fade;
    const visible = alpha > 0.01;
    const time = state.clock.elapsedTime;

    if (!groupRef.current) return;
    groupRef.current.visible = visible;
    groupRef.current.position.x = 2.5 - growth * 5;
    groupRef.current.rotation.y = time * 0.12 + growth * 0.10;
    groupRef.current.rotation.z = -0.04 + growth * 0.08;
    mainMaterial.opacity = alpha * 0.96;
    accentMaterial.opacity = alpha * 0.78;

    const updateInstances = (ref, data, isAccent = false) => {
      if (!ref.current) return;
      data.forEach((fragment, index) => {
        const wobble = (1 - reveal) * 0.08;
        position.set(
          THREE.MathUtils.lerp(fragment.origin[0], fragment.target[0], reveal) + Math.sin(time * 0.72 + fragment.phase) * wobble,
          THREE.MathUtils.lerp(fragment.origin[1], fragment.target[1], reveal) + Math.cos(time * 0.58 + fragment.phase) * wobble,
          THREE.MathUtils.lerp(fragment.origin[2], fragment.target[2], reveal) + Math.sin(time * 0.64 + fragment.phase * 1.3) * wobble,
        );
        rotation.set(
          fragment.rotation[0] + Math.sin(time * 0.35 + fragment.phase) * 0.04 * (1 - reveal),
          fragment.rotation[1] + Math.cos(time * 0.28 + fragment.phase) * 0.04 * (1 - reveal),
          fragment.rotation[2],
        );
        quaternion.setFromEuler(rotation);
        const growthScale = (isAccent ? 0.24 : 0.18) + reveal * (isAccent ? 0.76 : 0.82);
        scale.set(
          fragment.scale[0] * growthScale,
          fragment.scale[1] * growthScale,
          fragment.scale[2] * growthScale,
        );
        matrix.compose(position, quaternion, scale);
        ref.current.setMatrixAt(index, matrix);
      });
      ref.current.instanceMatrix.needsUpdate = true;
    };

    updateInstances(mainRef, ALUMINA_MAIN_FRAGMENTS);
    updateInstances(accentRef, ALUMINA_ACCENT_FRAGMENTS, true);
  });

  return (
    <group ref={groupRef} visible={false}>
      <instancedMesh ref={mainRef} args={[mainGeometry, mainMaterial, ALUMINA_MAIN_FRAGMENTS.length]} frustumCulled={false} />
      <instancedMesh ref={accentRef} args={[accentGeometry, accentMaterial, ALUMINA_ACCENT_FRAGMENTS.length]} frustumCulled={false} />
    </group>
  );
}

// Metamorfose mineral — dissolução radial, vazio e convergência.
// A transição evita um jato contínuo: a matéria se desfaz ao redor da Bauxita,
// desaparece por um instante e retorna como luz mineral na Alumina.
const DISSOLUTION_COUNT = 92;
const CONVERGENCE_COUNT = 72;

function MineralStream({ scrollProgress }) {
  const scrollRef = useRef(scrollProgress);
  const dissolutionRef = useRef();
  const dissolutionGeom = useRef();
  const convergenceRef = useRef();
  const convergenceGeom = useRef();

  const dissolutionData = useMemo(() => Array.from({ length: DISSOLUTION_COUNT }, (_, i) => {
    const hash = (salt) => {
      const value = Math.sin((i + 1) * 17.13 + salt * 43.71) * 43758.5453;
      return value - Math.floor(value);
    };
    const angle = hash(1) * Math.PI * 2;
    const elevation = (hash(2) - 0.5) * 1.55;
    const radial = 0.22 + hash(3) * 0.48;
    return {
      origin: [2.20 + (hash(4) - 0.5) * 0.74, (hash(5) - 0.5) * 1.08, (hash(6) - 0.5) * 0.80],
      direction: [Math.cos(angle) * radial, elevation, Math.sin(angle) * radial],
      speed: 0.78 + hash(7) * 0.44,
      curl: (hash(8) - 0.5) * 0.26,
      phase: hash(9) * Math.PI * 2,
      colorMix: hash(10),
    };
  }), []);

  const convergenceData = useMemo(() => Array.from({ length: CONVERGENCE_COUNT }, (_, i) => {
    const hash = (salt) => {
      const value = Math.sin((i + 3) * 19.37 + salt * 37.91) * 43758.5453;
      return value - Math.floor(value);
    };
    const targetAngle = hash(1) * Math.PI * 2;
    const targetRadius = 0.18 + hash(2) * 1.04;
    const target = [
      2.5 + Math.cos(targetAngle) * targetRadius * 0.94,
      (hash(3) - 0.5) * 1.42,
      Math.sin(targetAngle) * targetRadius * 0.70,
    ];
    return {
      origin: [
        -0.2 + (hash(4) - 0.5) * 4.3,
        0.15 + (hash(5) - 0.5) * 2.6,
        (hash(6) - 0.5) * 1.9,
      ],
      target,
      bend: (hash(7) - 0.5) * 0.42,
      phase: hash(8) * Math.PI * 2,
      speed: 0.72 + hash(9) * 0.38,
      colorMix: hash(10),
    };
  }), []);

  const dissolutionPos = useMemo(() => new Float32Array(DISSOLUTION_COUNT * 3), []);
  const dissolutionCol = useMemo(() => new Float32Array(DISSOLUTION_COUNT * 3), []);
  const convergencePos = useMemo(() => new Float32Array(CONVERGENCE_COUNT * 3), []);
  const convergenceCol = useMemo(() => new Float32Array(CONVERGENCE_COUNT * 3), []);
  const position = useMemo(() => new THREE.Vector3(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const terracotta = useMemo(() => new THREE.Color('#8B4A3C'), []);
  const warmTerracotta = useMemo(() => new THREE.Color('#C58E73'), []);
  const pearl = useMemo(() => new THREE.Color('#F2EEE6'), []);
  const mineralGrey = useMemo(() => new THREE.Color('#BFC4C7'), []);
  const tempColor = useMemo(() => new THREE.Color(), []);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useFrame((state) => {
    const p = scrollRef.current;
    const time = state.clock.elapsedTime;

    const dissolveIn = THREE.MathUtils.smoothstep(p, 46, 51);
    const dissolveProgress = THREE.MathUtils.clamp((p - 48) / 19, 0, 1);
    const dissolveOut = 1 - THREE.MathUtils.smoothstep(dissolveProgress, 0.55, 1);
    const dissolveAlpha = dissolveIn * dissolveOut;

    if (dissolutionRef.current) {
      dissolutionRef.current.visible = dissolveAlpha > 0.008;
      dissolutionRef.current.material.opacity = dissolveAlpha * 0.42;
    }

    for (let i = 0; i < DISSOLUTION_COUNT; i += 1) {
      const d = dissolutionData[i];
      const travel = Math.min(1.2, dissolveProgress * d.speed);
      const eased = 1 - Math.pow(1 - travel, 2.2);
      const shimmer = Math.sin(time * 0.85 + d.phase) * 0.026 * dissolveAlpha;
      dissolutionPos[i * 3] = d.origin[0] + d.direction[0] * eased + shimmer + d.curl * Math.sin(eased * Math.PI);
      dissolutionPos[i * 3 + 1] = d.origin[1] + d.direction[1] * eased + Math.cos(time * 0.70 + d.phase) * 0.026 * dissolveAlpha;
      dissolutionPos[i * 3 + 2] = d.origin[2] + d.direction[2] * eased;
      tempColor.lerpColors(terracotta, warmTerracotta, d.colorMix * 0.58);
      dissolutionCol[i * 3] = tempColor.r;
      dissolutionCol[i * 3 + 1] = tempColor.g;
      dissolutionCol[i * 3 + 2] = tempColor.b;
    }

    if (dissolutionGeom.current) {
      dissolutionGeom.current.attributes.position.needsUpdate = true;
      dissolutionGeom.current.attributes.color.needsUpdate = true;
    }

    const convergenceProgress = THREE.MathUtils.clamp((p - 67) / 18, 0, 1);
    const convergenceReveal = 1 - Math.pow(1 - convergenceProgress, 3);
    const convergenceIn = THREE.MathUtils.smoothstep(p, 68, 72);
    const convergenceOut = 1 - THREE.MathUtils.smoothstep(p, 84, 88);
    const convergenceAlpha = convergenceIn * convergenceOut;

    if (convergenceRef.current) {
      convergenceRef.current.visible = convergenceAlpha > 0.008;
      convergenceRef.current.material.opacity = convergenceAlpha * 0.62;
    }

    for (let i = 0; i < CONVERGENCE_COUNT; i += 1) {
      const d = convergenceData[i];
      target.set(
        d.target[0] - convergenceProgress * 5,
        d.target[1],
        d.target[2],
      );
      const arc = Math.sin(convergenceReveal * Math.PI) * d.bend;
      position.set(
        THREE.MathUtils.lerp(d.origin[0], target.x, convergenceReveal),
        THREE.MathUtils.lerp(d.origin[1], target.y, convergenceReveal) + arc,
        THREE.MathUtils.lerp(d.origin[2], target.z, convergenceReveal),
      );
      position.x += Math.sin(time * d.speed + d.phase) * 0.022 * (1 - convergenceReveal);
      position.y += Math.cos(time * d.speed * 0.8 + d.phase) * 0.020 * (1 - convergenceReveal);
      convergencePos[i * 3] = position.x;
      convergencePos[i * 3 + 1] = position.y;
      convergencePos[i * 3 + 2] = position.z;
      tempColor.lerpColors(pearl, mineralGrey, d.colorMix * 0.52);
      convergenceCol[i * 3] = tempColor.r;
      convergenceCol[i * 3 + 1] = tempColor.g;
      convergenceCol[i * 3 + 2] = tempColor.b;
    }

    if (convergenceGeom.current) {
      convergenceGeom.current.attributes.position.needsUpdate = true;
      convergenceGeom.current.attributes.color.needsUpdate = true;
    }
  });

  return (
    <group>
      <points ref={dissolutionRef} visible={false}>
        <bufferGeometry ref={dissolutionGeom}>
          <bufferAttribute attach="attributes-position" count={DISSOLUTION_COUNT} array={dissolutionPos} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={DISSOLUTION_COUNT} array={dissolutionCol} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial vertexColors size={0.045} transparent opacity={0} depthWrite={false} sizeAttenuation blending={THREE.AdditiveBlending} />
      </points>
      <points ref={convergenceRef} visible={false}>
        <bufferGeometry ref={convergenceGeom}>
          <bufferAttribute attach="attributes-position" count={CONVERGENCE_COUNT} array={convergencePos} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={CONVERGENCE_COUNT} array={convergenceCol} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial vertexColors size={0.052} transparent opacity={0} depthWrite={false} sizeAttenuation blending={THREE.AdditiveBlending} />
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
