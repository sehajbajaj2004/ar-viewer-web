import React, { useState, useCallback, useEffect, useRef, useMemo } from "react";

const Particles = React.memo(function Particles({
  particleColors = ["#ffffff", "#ffffff"],
  particleCount = 200,
  particleSpread = 10,
  speed = 0.1,
  moveParticlesOnHover = true,
  alphaParticles = false,
  disableRotation = false,
}) {
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);

  const initialParticles = useMemo(() => {
    const newParticles = [];
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: alphaParticles ? Math.random() * 0.8 + 0.2 : 1,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        moveX: (Math.random() - 0.5) * speed,
        moveY: (Math.random() - 0.5) * speed,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
      });
    }
    return newParticles;
  }, [particleCount, particleColors, speed, alphaParticles]);

  useEffect(() => {
    setParticles(initialParticles);
  }, [initialParticles]);

  const handleMouseMove = useCallback((e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    }
  }, []);

  useEffect(() => {
    if (moveParticlesOnHover) {
      document.addEventListener("mousemove", handleMouseMove);
      return () => document.removeEventListener("mousemove", handleMouseMove);
    }
  }, [moveParticlesOnHover, handleMouseMove]);

  const animateParticles = useCallback(() => {
    setParticles((prevParticles) =>
      prevParticles.map((particle) => {
        let newX = particle.x + particle.moveX;
        let newY = particle.y + particle.moveY;

        // Bounce off edges
        if (newX < 0 || newX > 100) {
          particle.moveX = -particle.moveX;
          newX = particle.x + particle.moveX;
        }
        if (newY < 0 || newY > 100) {
          particle.moveY = -particle.moveY;
          newY = particle.y + particle.moveY;
        }

        // Mouse interaction
        if (moveParticlesOnHover) {
          const distanceX = mousePosition.x - particle.x;
          const distanceY = mousePosition.y - particle.y;
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

          if (distance < particleSpread) {
            const force = (particleSpread - distance) / particleSpread;
            newX -= distanceX * force * 0.1;
            newY -= distanceY * force * 0.1;
          }
        }

        return {
          ...particle,
          x: newX,
          y: newY,
          rotation: disableRotation
            ? particle.rotation
            : particle.rotation + particle.rotationSpeed,
        };
      })
    );

    animationFrameRef.current = requestAnimationFrame(animateParticles);
  }, [mousePosition, moveParticlesOnHover, particleSpread, disableRotation]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(animateParticles);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animateParticles]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            transform: `rotate(${particle.rotation}deg) translate(-50%, -50%)`,
            transition: "all 0.1s ease-out",
          }}
        />
      ))}
    </div>
  );
});

export default Particles;