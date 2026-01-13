'use client';

import React from 'react';

// Shows Design Manager and Bharath together
export function VennDiagramSketch() {
  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
      <img 
        src="/sketches/design-manager.svg" 
        alt="Design Manager" 
        width={65} 
        height={88}
        style={{ filter: 'sepia(0.3)' }}
      />
      <img 
        src="/sketches/bharath.svg" 
        alt="Bharath" 
        width={65} 
        height={88}
        style={{ filter: 'sepia(0.3)' }}
      />
    </div>
  );
}
