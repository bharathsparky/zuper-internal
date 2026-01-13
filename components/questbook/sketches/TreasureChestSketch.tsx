'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import targetAnimation from '../../../public/sketches/target.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export function TreasureChestSketch() {
  return (
    <div style={{ width: '200px', height: '200px' }}>
      <Lottie 
        animationData={targetAnimation}
        loop={true}
        style={{ filter: 'sepia(0.2)' }}
      />
    </div>
  );
}
