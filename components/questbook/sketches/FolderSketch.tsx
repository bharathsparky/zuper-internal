'use client';

import React from 'react';

export function FolderSketch() {
  return (
    <svg width="50" height="45" viewBox="0 0 50 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Folder back */}
      <path 
        d="M5 12 L5 40 L45 40 L45 12 L25 12 L22 8 L5 8 Z" 
        stroke="#2C1810" 
        strokeWidth="2" 
        fill="rgba(212, 165, 116, 0.2)"
        strokeLinejoin="round"
      />
      
      {/* Folder tab */}
      <path 
        d="M5 8 L22 8 L25 12" 
        stroke="#2C1810" 
        strokeWidth="2" 
        fill="none"
        strokeLinejoin="round"
      />
      
      {/* Papers inside */}
      <rect x="10" y="18" width="15" height="18" fill="white" stroke="#2C1810" strokeWidth="1" opacity="0.8" />
      <line x1="12" y1="22" x2="23" y2="22" stroke="#2C1810" strokeWidth="0.5" opacity="0.4" />
      <line x1="12" y1="26" x2="23" y2="26" stroke="#2C1810" strokeWidth="0.5" opacity="0.4" />
      <line x1="12" y1="30" x2="20" y2="30" stroke="#2C1810" strokeWidth="0.5" opacity="0.4" />
      
      {/* Second paper peeking */}
      <rect x="28" y="20" width="12" height="16" fill="white" stroke="#2C1810" strokeWidth="1" opacity="0.6" transform="rotate(5 34 28)" />
      
      {/* Checkmark on folder */}
      <path d="M35 28 L38 32 L44 24" stroke="#4a7c59" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}





