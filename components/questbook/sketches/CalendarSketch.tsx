'use client';

import React from 'react';

export function CalendarSketch() {
  return (
    <svg width="60" height="70" viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Calendar body */}
      <rect 
        x="5" y="15" 
        width="50" height="50" 
        stroke="#2C1810" 
        strokeWidth="2" 
        fill="none"
        rx="2"
        strokeLinejoin="round"
      />
      
      {/* Calendar top bar */}
      <rect 
        x="5" y="15" 
        width="50" height="12" 
        fill="#8B4513"
        opacity="0.3"
        rx="2"
      />
      
      {/* Calendar rings */}
      <rect x="15" y="10" width="4" height="10" fill="#2C1810" rx="1" />
      <rect x="41" y="10" width="4" height="10" fill="#2C1810" rx="1" />
      
      {/* Grid lines */}
      <line x1="22" y1="32" x2="22" y2="60" stroke="#2C1810" strokeWidth="1" opacity="0.3" />
      <line x1="38" y1="32" x2="38" y2="60" stroke="#2C1810" strokeWidth="1" opacity="0.3" />
      <line x1="8" y1="42" x2="52" y2="42" stroke="#2C1810" strokeWidth="1" opacity="0.3" />
      <line x1="8" y1="52" x2="52" y2="52" stroke="#2C1810" strokeWidth="1" opacity="0.3" />
      
      {/* Question mark */}
      <text 
        x="30" 
        y="52" 
        textAnchor="middle" 
        fill="#8B4513" 
        fontSize="20" 
        fontFamily="Caveat"
        fontWeight="bold"
      >
        ?
      </text>
    </svg>
  );
}





