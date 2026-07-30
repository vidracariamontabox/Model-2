"use client";

import {Suspense, useEffect, useRef, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {Canvas, useFrame, useThree} from "@react-three/fiber";
import {PerspectiveCamera, useGLTF} from "@react-three/drei";
import * as THREE from "three";

const GRID_SCALE = 1;

function calcularDistanciaCamera(tamanhoModelo, fovGraus, aspect, margem = 1.3) {
  const fovRad = (fovGraus * Math.PI) / 180;
  const alturaNecessaria = tamanhoModelo.y * margem;
  const larguraNecessaria = tamanhoModelo.x * margem;

  const distanciaParaAltura = alturaNecessaria / (2 * Math.tan(fovRad / 2));
  const distanciaParaLargura = larguraNecessaria / (2 * Math.tan(fovRad / 2) * aspect);

  return Math.max(distanciaParaAltura, distanciaParaLargura);
}

function HeroModel({onReady, hasHoverPointer, prefersReducedMotion}) {
  const {scene} = useGLTF("/models/hero-grid.gltf");
  const cubesRef = useRef([]);
  const {pointer, clock, camera, size} = useThree();

  useEffect(() => {
    const cubes = [];

    scene.scale.setScalar(GRID_SCALE);

    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: "#d8d8d8",
          metalness: 0.6,
          roughness: 0.25,
        });
        cubes.push(child);
      }
    });

    cubesRef.current = cubes;

    scene.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(scene);
    const tamanhoModelo = new THREE.Vector3();
    box.getSize(tamanhoModelo);

    const aspect = size.width / Math.max(size.height, 1);
    const distanciaCamera = calcularDistanciaCamera(tamanhoModelo, camera.fov, aspect, 1.3);

    camera.position.set(0, 0, distanciaCamera);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();

    onReady?.();
  }, [scene, onReady, size.width, size.height, camera]);

  useFrame(() => {
    if (prefersReducedMotion) {
      return;
    }

    cubesRef.current.forEach((mesh) => {
      let targetX = 0;
      let targetY = 0;

      if (hasHoverPointer) {
        const cursorX = pointer.x;
        const cursorY = pointer.y;
        targetX = THREE.MathUtils.clamp(cursorY * 0.12 + mesh.position.y * 0.02, -0.15, 0.15);
        targetY = THREE.MathUtils.clamp(cursorX * 0.12 - mesh.position.x * 0.02, -0.15, 0.15);
      } else {
        targetX = Math.sin(clock.elapsedTime * 0.4 + mesh.position.x * 0.3) * 0.15;
        targetY = Math.cos(clock.elapsedTime * 0.4 + mesh.position.z * 0.3) * 0.15;
      }

      mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, targetX, 0.08);
      mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, targetY, 0.08);
    });
  });

  return <primitive object={scene} position={[0, -0.2, 0]} />;
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [hasHoverPointer, setHasHoverPointer] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    setHasHoverPointer(hoverQuery.matches);
    setPrefersReducedMotion(motionQuery.matches);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#121212]">
      <AnimatePresence>
        {!loaded && (
          <motion.div
            exit={{opacity: 0}}
            transition={{duration: 0.6}}
            className="absolute inset-0 z-10 flex items-center justify-center bg-[#121212]">
            <motion.div
              animate={{opacity: [0.3, 1, 0.3]}}
              transition={{duration: 1.5, repeat: Infinity, ease: "easeInOut"}}
              className="h-1 w-1 rounded-full bg-[#75706f]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Canvas className="relative z-0 h-screen w-full">
        <color attach="background" args={["#121212"]} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
        <Suspense fallback={null}>
          <HeroModel
            onReady={() => setLoaded(true)}
            hasHoverPointer={hasHoverPointer}
            prefersReducedMotion={prefersReducedMotion}
          />
        </Suspense>
      </Canvas>

      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: loaded ? 1 : 0}}
        transition={{duration: 0.8, delay: 0.3}}
        className="pointer-events-none absolute bottom-10 left-1/2 z-10 -translate-x-1/2">
        <motion.div
          animate={{y: [0, 8, 0]}}
          transition={{duration: 1.8, repeat: Infinity, ease: "easeInOut"}}
          className="h-10 w-px bg-[#75706f]/40"
        />
      </motion.div>
    </section>
  );
}
