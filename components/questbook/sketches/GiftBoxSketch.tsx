'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import officeAnimation from '../../../public/sketches/office.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export function GiftBoxSketch() {
  return (
    <div style={{ 
      width: '280px', 
      height: '280px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '0 auto'
    }}>
      <Lottie 
        animationData={officeAnimation}
        loop={true}
        style={{ filter: 'sepia(0.2)' }}
      />
    </div>
  );
}
