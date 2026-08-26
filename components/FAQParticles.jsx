"use client";

import {useEffect, useRef} from "react";

const PALETTE = ["#eaeaea", "#b7b1ab", "#8f8580", "#6f625d"];

export default function FAQParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext("2d");
    if (!context) return undefined;

    let animationFrame;
    let width = 0;
    let height = 0;
    const pointer = {x: -1000, y: -1000};
    const particles = [];
    const count = 58;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const randomParticle = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.16,
      vy: (Math.random() - 0.5) * 0.16,
      radius: 0.7 + Math.random() * 1.5,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      alpha: 0.18 + Math.random() * 0.32,
    });

    const reset = () => {
      particles.length = 0;
      for (let i = 0; i < count; i += 1) particles.push(randomParticle());
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const linkDistance = Math.min(150, width * 0.18);

      particles.forEach((particle) => {
        const dx = pointer.x - particle.x;
        const dy = pointer.y - particle.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 180 && distance > 0) {
          particle.vx -= (dx / distance) * 0.002;
          particle.vy -= (dy / distance) * 0.002;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.998;
        particle.vy *= 0.998;

        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;
      });

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.hypot(dx, dy);
          if (distance > linkDistance) continue;
          const opacity = (1 - distance / linkDistance) * 0.13;
          context.strokeStyle = `rgba(183,177,171,${opacity})`;
          context.lineWidth = 0.6;
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        }
      }

      particles.forEach((particle) => {
        context.globalAlpha = particle.alpha;
        context.fillStyle = particle.color;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      });
      context.globalAlpha = 1;
      animationFrame = requestAnimationFrame(draw);
    };

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    const onPointerLeave = () => {
      pointer.x = -1000;
      pointer.y = -1000;
    };

    resize();
    reset();
    draw();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[radial-gradient(ellipse_at_top_left,_#2a211e_0%,_#171311_42%,_#080808_100%)]"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(8,8,8,0.42)_100%)]" />
    </div>
  );
}
