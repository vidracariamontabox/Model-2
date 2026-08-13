"use client";

import {Suspense, useEffect, useMemo, useRef, useState} from "react";
import {Canvas, useFrame, useThree} from "@react-three/fiber";
import * as THREE from "three";
import GlowCursor from "@/components/GlowCursor";

const CUBE_SIZE = 1.0;
const GAP = 0.05;
const STEP = CUBE_SIZE + GAP;

const XY_OFFSET_MAX = STEP * 0.025;

const SEED = 7331;

function makeRng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const BOX_GEO = new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
const EDGE_GEO = new THREE.EdgesGeometry(BOX_GEO);

const MAT_DARK = new THREE.MeshStandardMaterial({
  color: "#000000",
  metalness: 0.92,
  roughness: 0.18,
});

const MAT_MID = new THREE.MeshStandardMaterial({
  color: "#000000",
  metalness: 0.92,
  roughness: 0.18,
});

const MAT_LIGHTER = new THREE.MeshStandardMaterial({
  color: "#000000",
  metalness: 0.92,
  roughness: 0.18,
});

const EDGE_MAT_DARK = new THREE.LineBasicMaterial({
  color: "#464443",
  transparent: true,
  opacity: 0.8,
});

const EDGE_MAT_LIGHT = new THREE.LineBasicMaterial({
  color: "#4a5568",
  transparent: true,
  opacity: 0.95,
});

function CubeGrid() {
  const {viewport} = useThree();
  const cubesRef = useRef([]);

  const cols = Math.ceil(viewport.width / STEP) + 6;
  const rows = Math.ceil(viewport.height / STEP) + 6;

  useEffect(() => {
    const shuffled = [...cubesRef.current].filter(Boolean).sort(() => Math.random() - 0.5);
    const animCount = Math.floor(shuffled.length * 0.2);

    cubesRef.current.forEach((child) => {
      if (!child) return;
      child.userData.originX = child.position.x;
      child.userData.originY = child.position.y;
      child.userData.originZ = child.position.z;
      child.userData.animated = false;
    });

    const axes = ["x", "y", "z"];

    shuffled.slice(0, animCount).forEach((child, i) => {
      child.userData.animated = true;
      child.userData.axis = axes[i % 3];
      child.userData.phase = Math.random() * Math.PI * 2;
      child.userData.speed = 0.3 + Math.random() * 0.4;
      child.userData.amplitude = 0.2 + Math.random() * 0.2;

      child.userData.originX = child.position.x;
      child.userData.originY = child.position.y;
      child.userData.originZ = child.position.z;
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    cubesRef.current.forEach((child) => {
      if (!child || !child.userData.animated) return;

      const {axis, phase, speed, amplitude} = child.userData;
      const delta = Math.sin(t * speed + phase) * amplitude;

      if (axis === "x") {
        child.position.x = child.userData.originX + delta;
      } else if (axis === "y") {
        child.position.y = child.userData.originY + delta;
      } else {
        child.position.z = child.userData.originZ + delta;
      }
    });
  });

  const cubeData = useMemo(() => {
    const rng = makeRng(SEED);
    const offsetX = ((cols - 1) * STEP) / 2;
    const offsetY = ((rows - 1) * STEP) / 2;
    const data = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const baseX = col * STEP - offsetX;
        const baseY = row * STEP - offsetY;

        const dX = (rng() - 0.5) * 2 * XY_OFFSET_MAX;
        const dY = (rng() - 0.5) * 2 * XY_OFFSET_MAX;

        const z = -0.8 + rng() * 1.6;

        const rotX = (rng() - 0.5) * 0.04;
        const rotY = (rng() - 0.5) * 0.04;
        const rotZ = 0;

        const scale = 0.95 + rng() * 0.1;

        const rm = rng();
        let mat;
        if (rm > 0.65) mat = MAT_DARK;
        else if (rm > 0.3) mat = MAT_MID;
        else mat = MAT_LIGHTER;

        const edgeMat = rng() < 0.3 ? EDGE_MAT_LIGHT : EDGE_MAT_DARK;

        data.push({x: baseX + dX, y: baseY + dY, z, rotX, rotY, rotZ, scale, mat, edgeMat});
      }
    }
    return data;
  }, [cols, rows]);

  return (
    <group>
      {cubeData.map((c, i) => (
        <group
          key={i}
          ref={(node) => {
            cubesRef.current[i] = node;
          }}
          position={[c.x, c.y, c.z]}
          rotation={[c.rotX, c.rotY, c.rotZ]}
          scale={c.scale}>
          <mesh geometry={BOX_GEO} material={c.mat} />
          <lineSegments geometry={EDGE_GEO} material={c.edgeMat} />
        </group>
      ))}
    </group>
  );
}

function CameraRig() {
  const {camera} = useThree();

  useEffect(() => {
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera]);

  return null;
}

function Scene() {
  const mainLightTarget = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    mainLightTarget.position.set(0, 0, 0);
  }, [mainLightTarget]);

  return (
    <>
      <ambientLight intensity={0.5} color="#8899bb" />

      <directionalLight position={[8, 5, 10]} intensity={1.2} color="#ffffff" target={mainLightTarget} />

      <directionalLight position={[-6, 2, -8]} intensity={0.3} color="#aabbcc" />
    </>
  );
}

export default function Hero() {
  const [mouse, setMouse] = useState({x: -999, y: -999});
  const [glow, setGlow] = useState({x: -999, y: -999});
  const glowTargetRef = useRef({x: -999, y: -999});

  useEffect(() => {
    let rafId;

    const animate = () => {
      setGlow((prev) => {
        const target = glowTargetRef.current;
        const nextX = prev.x + (target.x - prev.x) * 0.14;
        const nextY = prev.y + (target.y - prev.y) * 0.14;
        return {x: nextX, y: nextY};
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section
      id="hero"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const next = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
        setMouse(next);
        glowTargetRef.current = next;
      }}
      onMouseLeave={() => {
        const next = {x: -999, y: -999};
        setMouse(next);
        glowTargetRef.current = next;
      }}
      style={{
        position: "relative",
        width: "100%",
        height: "calc(100dvh - 4.5rem)",
        minHeight: "100dvh",
        maxHeight: "120dvh",
        overflow: "hidden",
        background: "#080808",
      }}>
      <Canvas
        orthographic
        gl={{alpha: true}}
        camera={{
          position: [0, 0, 100],
          zoom: 80,
          near: 0.1,
          far: 500,
        }}
        style={{position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1}}>
        <Suspense fallback={null}>
          <CameraRig />
          <Scene />
          <GlowCursor mousePos={mouse} />
          <CubeGrid />
        </Suspense>
      </Canvas>

      <div
        style={{
          position: "absolute",
          marginTop: "9rem",
          top: "clamp(2rem, 7vh, 4rem)",
          left: "clamp(1.5rem, 3vw, 3rem)",
          zIndex: 10,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          gap: "2.75rem",
          maxWidth: "min(42rem, 90vw)",
        }}>
        <h1
          style={{
            fontFamily: "var(--font-ivy-presto)",
            fontWeight: 600,
            fontSize: "clamp(3rem, 4.7vw + 1.4rem, 6.4rem)",
            letterSpacing: "0.03em",
            color: "#eaeaea",
            lineHeight: 0.95,
            margin: 0,
          }}>
          Seu projeto é nosso projeto
        </h1>
        <p
          style={{
            fontFamily: "var(--font-ivy-presto)",
            fontWeight: "bold",
            fontSize: "clamp(1.05rem, 1.5vw + 0.4rem, 1.1rem)",
            letterSpacing: "0.08em",
            color: "#b7b1ab",
            margin: 0,
            maxWidth: "30rem",
          }}>
          Criamos como se fosse para nossa casa !
        </p>

        <a
          href="https://wa.me/5516981984000"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            width: "fit-content",
            padding: "0.6rem 1.15rem",
            borderTopLeftRadius: 0,
            borderTopRightRadius: "99px",
            borderBottomLeftRadius: "99px",
            borderBottomRightRadius: "99px",
            background: "#f5f5f5",
            color: "#000000",
            fontFamily: "var(--font-neue-haas-grotesk)",
            fontWeight: 200,
            fontSize: "0.65rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            textDecoration: "none",
            marginTop: "0.35rem",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.12) inset",
          }}>
          <span>Solicite seu orçamento →</span>
        </a>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          background: `
            radial-gradient(ellipse 55% 60% at 50% 50%, rgba(0,0,0,0.80) 0%, transparent 100%),
            radial-gradient(ellipse 60% 80% at 0% 15%, rgba(220,230,255,0.20) 0%, transparent 70%),
            radial-gradient(ellipse 60% 90% at 100% 35%, rgba(220,230,255,0.30) 0%, transparent 70%),
            radial-gradient(ellipse 30% 40% at 50% 100%, rgba(180,200,230,0.30) 0%, transparent 70%)
          `,
        }}
      />
    </section>
  );
}
