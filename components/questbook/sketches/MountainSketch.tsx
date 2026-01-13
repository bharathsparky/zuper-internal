'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import gameAnimation from '../../../public/sketches/game.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export function MountainSketch() {
  return (
    <div style={{ width: '100%', maxWidth: '450px', height: '380px' }}>
      <Lottie 
        animationData={gameAnimation}
        loop={true}
        style={{ filter: 'sepia(0.2)' }}
      />
    </div>
  );
}
