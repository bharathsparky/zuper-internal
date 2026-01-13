'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import moneyAnimation from '../../../public/sketches/money.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export function HandshakeSketch() {
  return (
    <div style={{ 
      position: 'absolute',
      top: '67%',
      left: '18%',
      transform: 'translate(-50%, -50%)',
      width: '220px', 
      height: '190px',
      zIndex: 10,
      opacity: 0.8
    }}>
      <Lottie 
        animationData={moneyAnimation}
        loop={true}
        style={{ filter: 'sepia(0.2)' }}
      />
    </div>
  );
}
