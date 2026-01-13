'use client';

import React from 'react';

export function BrainGearsSketch() {
  return (
    <svg width="80" height="70" viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Brain outline - left hemisphere */}
      <path 
        d="M20 35 Q10 35 10 25 Q10 15 20 15 Q25 10 35 12 Q40 8 45 12" 
        stroke="#2C1810" 
        strokeWidth="2" 
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Brain outline - right hemisphere */}
      <path 
        d="M45 12 Q55 10 60 18 Q68 20 68 30 Q70 40 60 45 Q55 52 45 50 Q35 55 25 50 Q15 48 15 40" 
        stroke="#2C1810" 
        strokeWidth="2" 
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Brain wrinkles */}
      <path d="M25 25 Q32 28 38 25" stroke="#2C1810" strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M30 35 Q40 38 50 35" stroke="#2C1810" strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M35 45 Q42 43 48 45" stroke="#2C1810" strokeWidth="1.5" fill="none" opacity="0.5" />
      
      {/* Gear 1 */}
      <g transform="translate(55, 25)">
        <circle cx="0" cy="0" r="8" stroke="#D4A574" strokeWidth="2" fill="none" />
        <circle cx="0" cy="0" r="3" fill="#D4A574" opacity="0.5" />
        {/* Gear teeth */}
        <rect x="-2" y="-12" width="4" height="4" fill="#D4A574" />
        <rect x="-2" y="8" width="4" height="4" fill="#D4A574" />
        <rect x="-12" y="-2" width="4" height="4" fill="#D4A574" />
        <rect x="8" y="-2" width="4" height="4" fill="#D4A574" />
      </g>
      
      {/* Gear 2 (smaller) */}
      <g transform="translate(42, 18)">
        <circle cx="0" cy="0" r="5" stroke="#8B4513" strokeWidth="1.5" fill="none" />
        <circle cx="0" cy="0" r="2" fill="#8B4513" opacity="0.5" />
        {/* Gear teeth */}
        <rect x="-1.5" y="-8" width="3" height="3" fill="#8B4513" />
        <rect x="-1.5" y="5" width="3" height="3" fill="#8B4513" />
        <rect x="-8" y="-1.5" width="3" height="3" fill="#8B4513" />
        <rect x="5" y="-1.5" width="3" height="3" fill="#8B4513" />
      </g>
      
      {/* Thought sparkles */}
      <text x="65" y="12" fill="#D4A574" fontSize="10" opacity="0.7">✦</text>
      <text x="70" y="45" fill="#D4A574" fontSize="8" opacity="0.5">✦</text>
    </svg>
  );
}





