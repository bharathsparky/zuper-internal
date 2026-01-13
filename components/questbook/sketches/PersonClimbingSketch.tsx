'use client';

import React from 'react';

export function PersonClimbingSketch() {
  return (
    <svg width="80" height="100" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Stairs */}
      <path 
        d="M10 90 L10 70 L30 70 L30 50 L50 50 L50 30 L70 30 L70 10" 
        stroke="#2C1810" 
        strokeWidth="2" 
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Step surfaces */}
      <line x1="10" y1="70" x2="30" y2="70" stroke="#2C1810" strokeWidth="2" />
      <line x1="30" y1="50" x2="50" y2="50" stroke="#2C1810" strokeWidth="2" />
      <line x1="50" y1="30" x2="70" y2="30" stroke="#2C1810" strokeWidth="2" />
      
      {/* Stick figure on stairs */}
      {/* Head */}
      <circle cx="40" cy="38" r="5" stroke="#2C1810" strokeWidth="2" fill="none" />
      
      {/* Body */}
      <line x1="40" y1="43" x2="40" y2="55" stroke="#2C1810" strokeWidth="2" />
      
      {/* Arms - reaching up */}
      <line x1="40" y1="47" x2="32" y2="42" stroke="#2C1810" strokeWidth="2" />
      <line x1="40" y1="47" x2="50" y2="38" stroke="#2C1810" strokeWidth="2" />
      
      {/* Legs - climbing pose */}
      <line x1="40" y1="55" x2="35" y2="65" stroke="#2C1810" strokeWidth="2" />
      <line x1="40" y1="55" x2="48" y2="58" stroke="#2C1810" strokeWidth="2" />
      
      {/* Star at the top */}
      <text x="70" y="15" fill="#D4A574" fontSize="14">★</text>
      
      {/* Motion lines */}
      <line x1="25" y1="40" x2="20" y2="40" stroke="#2C1810" strokeWidth="1" opacity="0.4" />
      <line x1="25" y1="45" x2="18" y2="45" stroke="#2C1810" strokeWidth="1" opacity="0.3" />
    </svg>
  );
}





