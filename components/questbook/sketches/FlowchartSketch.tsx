'use client';

import React from 'react';

export function FlowchartSketch() {
  return (
    <svg width="220" height="50" viewBox="0 0 220 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Research box */}
      <rect x="5" y="15" width="35" height="20" stroke="#2C1810" strokeWidth="1.5" fill="none" rx="2" />
      <text x="22" y="28" textAnchor="middle" fill="#2C1810" fontSize="8" fontFamily="Caveat">Research</text>
      
      {/* Arrow 1 */}
      <path d="M42 25 L52 25" stroke="#2C1810" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
      <polygon points="52,22 58,25 52,28" fill="#2C1810" />
      
      {/* Insights box */}
      <rect x="60" y="15" width="35" height="20" stroke="#2C1810" strokeWidth="1.5" fill="none" rx="2" />
      <text x="77" y="28" textAnchor="middle" fill="#2C1810" fontSize="8" fontFamily="Caveat">Insights</text>
      
      {/* Arrow 2 */}
      <path d="M97 25 L107 25" stroke="#2C1810" strokeWidth="1.5" />
      <polygon points="107,22 113,25 107,28" fill="#2C1810" />
      
      {/* Design box */}
      <rect x="115" y="15" width="30" height="20" stroke="#D4A574" strokeWidth="2" fill="rgba(212, 165, 116, 0.1)" rx="2" />
      <text x="130" y="28" textAnchor="middle" fill="#2C1810" fontSize="8" fontFamily="Caveat">Design</text>
      
      {/* Arrow 3 */}
      <path d="M147 25 L157 25" stroke="#2C1810" strokeWidth="1.5" />
      <polygon points="157,22 163,25 157,28" fill="#2C1810" />
      
      {/* Test box */}
      <rect x="165" y="15" width="25" height="20" stroke="#2C1810" strokeWidth="1.5" fill="none" rx="2" />
      <text x="177" y="28" textAnchor="middle" fill="#2C1810" fontSize="8" fontFamily="Caveat">Test</text>
      
      {/* Arrow 4 */}
      <path d="M192 25 L202 25" stroke="#2C1810" strokeWidth="1.5" />
      <polygon points="202,22 208,25 202,28" fill="#2C1810" />
      
      {/* Iterate - circular arrow */}
      <circle cx="215" cy="25" r="8" stroke="#2C1810" strokeWidth="1.5" fill="none" strokeDasharray="3,2" />
      <text x="215" y="28" textAnchor="middle" fill="#2C1810" fontSize="6" fontFamily="Caveat">↻</text>
      
      {/* Feedback loop arrow going back */}
      <path 
        d="M215 35 Q215 45 130 45 Q45 45 22 35" 
        stroke="#D4A574" 
        strokeWidth="1" 
        fill="none"
        strokeDasharray="4,3"
        opacity="0.6"
      />
      <polygon points="22,32 18,37 25,37" fill="#D4A574" opacity="0.6" />
    </svg>
  );
}





