"use client";

import {Suspense, useEffect, useRef} from "react";
import {Canvas, useFrame, useThree} from "@react-three/fiber";
import {PerspectiveCamera, useGLTF} from "@react-three/drei";
import * as THREE from "three";

const GRID_SCALE = 1;

function HeroModel() {
  const {scene} = useGLTF("/models/hero-grid.gltf");
  const cubesRef = useRef([]);
  const {pointer} = useThree();

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
  }, [scene]);

  useFrame(() => {
    const cursorX = pointer.x;
    const cursorY = pointer.y;

    cubesRef.current.forEach((mesh) => {
      const targetX = THREE.MathUtils.clamp(cursorY * 0.12 + mesh.position.y * 0.02, -0.15, 0.15);
      const targetY = THREE.MathUtils.clamp(cursorX * 0.12 - mesh.position.x * 0.02, -0.15, 0.15);

      mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, targetX, 0.08);
      mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, targetY, 0.08);
    });
  });

  return <primitive object={scene} position={[0, -0.2, 0]} />;
}

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#121212]">
      <Canvas className="h-screen w-full">
        <color attach="background" args={["#121212"]} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
        <Suspense fallback={null}>
          <HeroModel />
        </Suspense>
      </Canvas>
    </section>
  );
}
