'use client';

import React from 'react';

export function SwissKnifeSketch() {
  return (
    <svg width="100" height="60" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main body */}
      <rect 
        x="25" 
        y="20" 
        width="50" 
        height="25" 
        stroke="#8B4513" 
        strokeWidth="2" 
        fill="rgba(139, 69, 19, 0.3)"
        rx="4"
      />
      
      {/* Cross emblem */}
      <rect x="47" y="27" width="6" height="12" fill="white" />
      <rect x="44" y="30" width="12" height="6" fill="white" />
      
      {/* Knife blade - extended */}
      <path 
        d="M75 32 L95 28 L96 30 L75 35 Z" 
        stroke="#2C1810" 
        strokeWidth="1.5" 
        fill="rgba(200, 200, 200, 0.5)"
      />
      
      {/* Scissors - extended top */}
      <path 
        d="M25 28 L8 15" 
        stroke="#2C1810" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      <circle cx="8" cy="15" r="4" stroke="#2C1810" strokeWidth="1.5" fill="none" />
      
      {/* Scissors - extended bottom */}
      <path 
        d="M25 37 L8 50" 
        stroke="#2C1810" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      <circle cx="8" cy="50" r="4" stroke="#2C1810" strokeWidth="1.5" fill="none" />
      
      {/* Pivot point */}
      <circle cx="25" cy="32" r="3" fill="#2C1810" />
      
      {/* Screwdriver - extended upward */}
      <path 
        d="M50 20 L50 8 L48 5 L52 5 L50 8" 
        stroke="#2C1810" 
        strokeWidth="1.5" 
        fill="none"
      />
      
      {/* Bottle opener */}
      <path 
        d="M60 45 L70 55" 
        stroke="#2C1810" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      <circle cx="70" cy="55" r="3" stroke="#2C1810" strokeWidth="1.5" fill="none" />
      
      {/* Sparkle indicating usefulness */}
      <text x="85" y="20" fill="#D4A574" fontSize="10" opacity="0.7">✦</text>
    </svg>
  );
}





