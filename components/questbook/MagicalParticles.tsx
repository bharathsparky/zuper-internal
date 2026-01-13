'use client';

import React, { useEffect, useRef } from 'react';

export function MagicalParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating particles
    const particleCount = 50;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'magical-particle';
      
      // Random properties
      const size = Math.random() * 4 + 2;
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const duration = Math.random() * 15 + 10;
      const delay = Math.random() * 10;
      const drift = (Math.random() - 0.5) * 100;
      
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${startX}%;
        top: ${startY}%;
        background: radial-gradient(circle, rgba(255, 215, 100, 0.9) 0%, rgba(255, 180, 50, 0.4) 50%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
        --drift: ${drift}px;
        box-shadow: 0 0 ${size * 2}px rgba(255, 200, 100, 0.6);
        filter: blur(${size > 4 ? 1 : 0}px);
      `;
      
      container.appendChild(particle);
      particles.push(particle);
    }

    // Create some larger dust motes
    for (let i = 0; i < 15; i++) {
      const mote = document.createElement('div');
      mote.className = 'dust-mote';
      
      const size = Math.random() * 3 + 1;
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const duration = Math.random() * 20 + 15;
      const delay = Math.random() * 8;
      
      mote.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${startX}%;
        top: ${startY}%;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        pointer-events: none;
        animation: driftMote ${duration}s linear ${delay}s infinite;
      `;
      
      container.appendChild(mote);
      particles.push(mote);
    }

    return () => {
      particles.forEach(p => p.remove());
    };
  }, []);

  return <div ref={containerRef} className="magical-particles-container" />;
}





