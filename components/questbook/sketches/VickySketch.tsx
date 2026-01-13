'use client';

import React from 'react';

export function VickySketch() {
  return (
    <img 
      src="/sketches/vicky.svg" 
      alt="Vicky" 
      width={140} 
      height={189}
      style={{ filter: 'sepia(0.3)' }}
    />
  );
}

