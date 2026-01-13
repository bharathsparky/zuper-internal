'use client';

import React from 'react';

export function RobotSketch() {
  return (
    <svg width="50" height="60" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Antenna */}
      <line x1="25" y1="5" x2="25" y2="12" stroke="#2C1810" strokeWidth="2" />
      <circle cx="25" cy="4" r="3" fill="#D4A574" />
      
      {/* Head */}
      <rect x="10" y="12" width="30" height="22" stroke="#2C1810" strokeWidth="2" fill="none" rx="3" />
      
      {/* Eyes */}
      <circle cx="18" cy="22" r="4" stroke="#2C1810" strokeWidth="1.5" fill="none" />
      <circle cx="18" cy="22" r="2" fill="#2C1810" />
      <circle cx="32" cy="22" r="4" stroke="#2C1810" strokeWidth="1.5" fill="none" />
      <circle cx="32" cy="22" r="2" fill="#2C1810" />
      
      {/* Smile */}
      <path d="M18 28 Q25 32 32 28" stroke="#2C1810" strokeWidth="1.5" fill="none" />
      
      {/* Body */}
      <rect x="15" y="36" width="20" height="15" stroke="#2C1810" strokeWidth="2" fill="none" rx="2" />
      
      {/* Body details */}
      <circle cx="25" cy="43" r="3" stroke="#2C1810" strokeWidth="1.5" fill="#D4A574" opacity="0.5" />
      
      {/* Arms giving thumbs up */}
      <line x1="15" y1="40" x2="8" y2="35" stroke="#2C1810" strokeWidth="2" />
      <circle cx="6" cy="33" r="3" stroke="#2C1810" strokeWidth="1.5" fill="none" />
      <line x1="6" y1="30" x2="6" y2="27" stroke="#2C1810" strokeWidth="2" />
      
      <line x1="35" y1="42" x2="42" y2="45" stroke="#2C1810" strokeWidth="2" />
      <circle cx="44" cy="46" r="3" stroke="#2C1810" strokeWidth="1.5" fill="none" />
      
      {/* Sparkle effect */}
      <text x="2" y="20" fill="#D4A574" fontSize="8">✦</text>
    </svg>
  );
}





