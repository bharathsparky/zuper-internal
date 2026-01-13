'use client';

import React from 'react';

export function MobileSketch() {
  return (
    <svg width="45" height="75" viewBox="0 0 45 75" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Phone body */}
      <rect 
        x="5" 
        y="5" 
        width="35" 
        height="65" 
        stroke="#2C1810" 
        strokeWidth="2" 
        fill="none"
        rx="5"
      />
      
      {/* Screen */}
      <rect 
        x="8" 
        y="12" 
        width="29" 
        height="48" 
        stroke="#2C1810" 
        strokeWidth="1" 
        fill="rgba(212, 165, 116, 0.1)"
        rx="2"
      />
      
      {/* Speaker */}
      <rect x="17" y="8" width="11" height="2" fill="#2C1810" rx="1" />
      
      {/* Home button */}
      <circle cx="22.5" cy="66" r="3" stroke="#2C1810" strokeWidth="1.5" fill="none" />
      
      {/* UI components on screen */}
      {/* Header */}
      <rect x="10" y="14" width="25" height="6" fill="#2C1810" opacity="0.2" rx="1" />
      
      {/* Cards/Components */}
      <rect x="10" y="22" width="25" height="10" stroke="#2C1810" strokeWidth="1" fill="none" rx="1" />
      <line x1="12" y1="25" x2="22" y2="25" stroke="#2C1810" strokeWidth="0.5" opacity="0.5" />
      <line x1="12" y1="28" x2="18" y2="28" stroke="#2C1810" strokeWidth="0.5" opacity="0.3" />
      
      <rect x="10" y="34" width="25" height="10" stroke="#2C1810" strokeWidth="1" fill="none" rx="1" />
      <line x1="12" y1="37" x2="20" y2="37" stroke="#2C1810" strokeWidth="0.5" opacity="0.5" />
      <line x1="12" y1="40" x2="16" y2="40" stroke="#2C1810" strokeWidth="0.5" opacity="0.3" />
      
      <rect x="10" y="46" width="25" height="10" stroke="#2C1810" strokeWidth="1" fill="none" rx="1" />
      
      {/* Bottom nav */}
      <rect x="10" y="57" width="6" height="2" fill="#2C1810" opacity="0.4" rx="0.5" />
      <rect x="19" y="57" width="6" height="2" fill="#D4A574" rx="0.5" />
      <rect x="28" y="57" width="6" height="2" fill="#2C1810" opacity="0.4" rx="0.5" />
    </svg>
  );
}





