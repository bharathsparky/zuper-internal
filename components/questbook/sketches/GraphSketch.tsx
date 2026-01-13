'use client';

import React from 'react';

export function GraphSketch() {
  return (
    <svg width="60" height="50" viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Axes */}
      <line x1="10" y1="5" x2="10" y2="40" stroke="#2C1810" strokeWidth="2" />
      <line x1="10" y1="40" x2="55" y2="40" stroke="#2C1810" strokeWidth="2" />
      
      {/* Arrow heads */}
      <polygon points="10,5 7,10 13,10" fill="#2C1810" />
      <polygon points="55,40 50,37 50,43" fill="#2C1810" />
      
      {/* Trend line going up */}
      <path 
        d="M12 35 Q20 32 25 28 Q30 24 35 22 Q42 18 50 12" 
        stroke="#D4A574" 
        strokeWidth="2.5" 
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Data points */}
      <circle cx="12" cy="35" r="2" fill="#D4A574" />
      <circle cx="25" cy="28" r="2" fill="#D4A574" />
      <circle cx="35" cy="22" r="2" fill="#D4A574" />
      <circle cx="50" cy="12" r="2" fill="#D4A574" />
      
      {/* Upward arrow indicator */}
      <path d="M52 8 L50 12 L48 8" stroke="#4a7c59" strokeWidth="1.5" fill="none" />
      <line x1="50" y1="12" x2="50" y2="18" stroke="#4a7c59" strokeWidth="1.5" />
    </svg>
  );
}





