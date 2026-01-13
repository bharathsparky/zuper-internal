'use client';

import React from 'react';

export function CompassSketch() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer circle with rough edges */}
      <circle 
        cx="60" 
        cy="60" 
        r="50" 
        stroke="#D4A574" 
        strokeWidth="3" 
        fill="none"
        strokeDasharray="2,4"
        opacity="0.8"
      />
      <circle 
        cx="60" 
        cy="60" 
        r="45" 
        stroke="#D4A574" 
        strokeWidth="2" 
        fill="none"
        opacity="0.5"
      />
      
      {/* Inner decorative ring */}
      <circle 
        cx="60" 
        cy="60" 
        r="35" 
        stroke="#D4A574" 
        strokeWidth="1.5" 
        fill="none"
        opacity="0.4"
      />
      
      {/* Compass needles - North */}
      <path 
        d="M60 15 L65 55 L60 60 L55 55 Z" 
        fill="#D4A574"
        opacity="0.9"
      />
      {/* South */}
      <path 
        d="M60 105 L65 65 L60 60 L55 65 Z" 
        fill="#8B4513"
        opacity="0.6"
      />
      {/* East */}
      <path 
        d="M105 60 L65 65 L60 60 L65 55 Z" 
        fill="#8B4513"
        opacity="0.5"
      />
      {/* West */}
      <path 
        d="M15 60 L55 65 L60 60 L55 55 Z" 
        fill="#8B4513"
        opacity="0.5"
      />
      
      {/* Center circle */}
      <circle 
        cx="60" 
        cy="60" 
        r="6" 
        fill="#D4A574"
      />
      <circle 
        cx="60" 
        cy="60" 
        r="3" 
        fill="#2C1810"
      />
      
      {/* Direction letters */}
      <text x="60" y="28" textAnchor="middle" fill="#D4A574" fontSize="12" fontFamily="Patrick Hand">N</text>
      <text x="60" y="100" textAnchor="middle" fill="#D4A574" fontSize="10" fontFamily="Patrick Hand" opacity="0.7">S</text>
      <text x="95" y="64" textAnchor="middle" fill="#D4A574" fontSize="10" fontFamily="Patrick Hand" opacity="0.7">E</text>
      <text x="25" y="64" textAnchor="middle" fill="#D4A574" fontSize="10" fontFamily="Patrick Hand" opacity="0.7">W</text>
      
      {/* Decorative marks */}
      <line x1="60" y1="12" x2="60" y2="18" stroke="#D4A574" strokeWidth="2" opacity="0.6" />
      <line x1="60" y1="102" x2="60" y2="108" stroke="#D4A574" strokeWidth="1.5" opacity="0.4" />
      <line x1="12" y1="60" x2="18" y2="60" stroke="#D4A574" strokeWidth="1.5" opacity="0.4" />
      <line x1="102" y1="60" x2="108" y2="60" stroke="#D4A574" strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}





