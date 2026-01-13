'use client';

import React from 'react';

export function MagnifyingGlassSketch() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Glass circle */}
      <circle 
        cx="32" 
        cy="32" 
        r="25" 
        stroke="#2C1810" 
        strokeWidth="3" 
        fill="none"
      />
      
      {/* Glass shine */}
      <path 
        d="M18 22 Q22 18 28 20" 
        stroke="#D4A574" 
        strokeWidth="2" 
        fill="none"
        opacity="0.5"
      />
      
      {/* Handle */}
      <line 
        x1="50" 
        y1="50" 
        x2="72" 
        y2="72" 
        stroke="#8B4513" 
        strokeWidth="6" 
        strokeLinecap="round"
      />
      <line 
        x1="50" 
        y1="50" 
        x2="72" 
        y2="72" 
        stroke="#2C1810" 
        strokeWidth="4" 
        strokeLinecap="round"
      />
      
      {/* Document inside */}
      <rect x="22" y="22" width="18" height="22" stroke="#2C1810" strokeWidth="1.5" fill="none" rx="1" />
      <line x1="25" y1="28" x2="37" y2="28" stroke="#2C1810" strokeWidth="1" opacity="0.5" />
      <line x1="25" y1="32" x2="37" y2="32" stroke="#2C1810" strokeWidth="1" opacity="0.5" />
      <line x1="25" y1="36" x2="33" y2="36" stroke="#2C1810" strokeWidth="1" opacity="0.5" />
      <line x1="25" y1="40" x2="35" y2="40" stroke="#2C1810" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}





