'use client';

import React from 'react';

export function SaaSLogosSketch() {
  return (
    <svg width="180" height="50" viewBox="0 0 180 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Generic SaaS icon 1 - Cloud */}
      <g transform="translate(10, 10)">
        <path 
          d="M30 25 Q30 18 24 16 Q24 10 18 10 Q12 10 10 16 Q5 16 5 22 Q5 28 12 28 L28 28 Q32 28 32 24 Q32 20 28 20" 
          stroke="#2C1810" 
          strokeWidth="1.5" 
          fill="none"
        />
        <text x="18" y="35" textAnchor="middle" fill="#2C1810" fontSize="7" fontFamily="Caveat">Cloud</text>
      </g>
      
      {/* Generic SaaS icon 2 - Dashboard/Analytics */}
      <g transform="translate(55, 10)">
        <rect x="2" y="5" width="26" height="18" stroke="#2C1810" strokeWidth="1.5" fill="none" rx="2" />
        <rect x="5" y="12" width="4" height="8" fill="#D4A574" opacity="0.5" />
        <rect x="11" y="9" width="4" height="11" fill="#D4A574" opacity="0.7" />
        <rect x="17" y="14" width="4" height="6" fill="#D4A574" opacity="0.5" />
        <text x="15" y="35" textAnchor="middle" fill="#2C1810" fontSize="7" fontFamily="Caveat">Analytics</text>
      </g>
      
      {/* Generic SaaS icon 3 - CRM/Users */}
      <g transform="translate(100, 10)">
        <circle cx="15" cy="10" r="6" stroke="#2C1810" strokeWidth="1.5" fill="none" />
        <path d="M5 25 Q5 18 15 18 Q25 18 25 25" stroke="#2C1810" strokeWidth="1.5" fill="none" />
        <circle cx="25" cy="12" r="4" stroke="#2C1810" strokeWidth="1" fill="none" opacity="0.5" />
        <text x="15" y="35" textAnchor="middle" fill="#2C1810" fontSize="7" fontFamily="Caveat">CRM</text>
      </g>
      
      {/* Generic SaaS icon 4 - Integration/API */}
      <g transform="translate(140, 10)">
        <rect x="2" y="8" width="10" height="10" stroke="#2C1810" strokeWidth="1.5" fill="none" rx="1" />
        <rect x="18" y="8" width="10" height="10" stroke="#2C1810" strokeWidth="1.5" fill="none" rx="1" />
        <path d="M12 13 L18 13" stroke="#D4A574" strokeWidth="2" />
        <circle cx="15" cy="13" r="2" fill="#D4A574" />
        <text x="15" y="35" textAnchor="middle" fill="#2C1810" fontSize="7" fontFamily="Caveat">API</text>
      </g>
    </svg>
  );
}





