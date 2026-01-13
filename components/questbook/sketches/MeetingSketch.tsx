'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import onlineAnimation from '../../../public/sketches/online.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export function MeetingSketch() {
  return (
    <div style={{ width: '280px', height: '280px' }}>
      <Lottie 
        animationData={onlineAnimation}
        loop={true}
        style={{ filter: 'sepia(0.2)' }}
      />
    </div>
  );
}
