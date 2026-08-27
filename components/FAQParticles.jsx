"use client";

import {useEffect, useRef} from "react";

const PARTICLE_COLORS = ["#00f5ff", "#00d9ff", "#0096c7"];
const LINE_COLOR = "#00d9ff";

export default function FAQParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext("2d");
    if (!context) return undefined;

    let animationFrame;
    let isActive = true;
    let width = 0;
    let height = 0;
    const pointer = {x: -1000, y: -1000};
    const particles = [];
    const count = 86;

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
      vx: (Math.random() - 0.5) * 0.58,
      vy: (Math.random() - 0.5) * 0.58,
      radius: 1.1 + Math.random() * 1.8,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      alpha: 0.48 + Math.random() * 0.34,
      baseAlpha: 0.48 + Math.random() * 0.34,
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.7 + Math.random() * 1.2,
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
        particle.vx *= 0.999;
        particle.vy *= 0.999;
        particle.phase += 0.016 * particle.pulseSpeed;
        particle.alpha = particle.baseAlpha + Math.sin(particle.phase) * 0.16;

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
          const opacity = (1 - distance / linkDistance) * 0.34;
          context.strokeStyle = `${LINE_COLOR}${Math.round(opacity * 255).toString(16).padStart(2, "0")}`;
          context.lineWidth = 0.8;
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
      if (!isActive || document.hidden) {
        animationFrame = 0;
        return;
      }
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
    const onPointerDown = () => {
      const pushed = 4;
      for (let i = 0; i < pushed; i += 1) {
        const particle = randomParticle();
        particle.x = pointer.x;
        particle.y = pointer.y;
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.2 + Math.random() * 1.2;
        particle.vx = Math.cos(angle) * speed;
        particle.vy = Math.sin(angle) * speed;
        particles.push(particle);
      }
      while (particles.length > count + pushed) particles.shift();
    };

    const updateActivity = (active) => {
      isActive = active && !document.hidden;
      if (isActive && !animationFrame) draw();
      if (!isActive && animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    const visibilityChange = () => updateActivity(!document.hidden);
    const observer = new IntersectionObserver(
      ([entry]) => updateActivity(entry.isIntersecting),
      {threshold: 0.01},
    );

    resize();
    reset();
    observer.observe(canvas);
    document.addEventListener("visibilitychange", visibilityChange);
    draw();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("pointerdown", onPointerDown);

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibilityChange);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[radial-gradient(ellipse_at_top_left,_#3a2b26_0%,_#1b1513_42%,_#080808_100%)]"
    >
      <canvas ref={canvasRef} className="pointer-events-auto absolute inset-0 h-full w-full opacity-95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(8,8,8,0.42)_100%)]" />
    </div>
  );
}
