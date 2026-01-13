'use client';

import React from 'react';

interface NavigationHintProps {
  direction: 'prev' | 'next';
  onClick: () => void;
  disabled: boolean;
}

export function NavigationHint({ direction, onClick, disabled }: NavigationHintProps) {
  if (disabled) return null;

  const isPrev = direction === 'prev';

  return (
    <button
      onClick={onClick}
      className="nav-hint-btn"
      style={{
        position: 'absolute',
        [isPrev ? 'left' : 'right']: '-140px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'radial-gradient(circle, rgba(255, 200, 100, 0.15) 0%, rgba(139, 69, 19, 0.1) 100%)',
        border: '2px solid rgba(212, 165, 116, 0.5)',
        borderRadius: '50%',
        width: '70px',
        height: '70px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Patrick Hand', cursive",
        fontSize: '2rem',
        color: '#D4A574',
        transition: 'all 0.4s ease',
        opacity: 0.7,
        boxShadow: '0 0 30px rgba(255, 200, 100, 0.1), inset 0 0 20px rgba(255, 200, 100, 0.05)',
        zIndex: 100,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '1';
        e.currentTarget.style.background = 'radial-gradient(circle, rgba(255, 200, 100, 0.3) 0%, rgba(139, 69, 19, 0.2) 100%)';
        e.currentTarget.style.boxShadow = '0 0 50px rgba(255, 200, 100, 0.3), inset 0 0 30px rgba(255, 200, 100, 0.1)';
        e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
        e.currentTarget.style.borderColor = 'rgba(255, 200, 100, 0.8)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '0.7';
        e.currentTarget.style.background = 'radial-gradient(circle, rgba(255, 200, 100, 0.15) 0%, rgba(139, 69, 19, 0.1) 100%)';
        e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 200, 100, 0.1), inset 0 0 20px rgba(255, 200, 100, 0.05)';
        e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
        e.currentTarget.style.borderColor = 'rgba(212, 165, 116, 0.5)';
      }}
      aria-label={isPrev ? 'Previous page' : 'Next page'}
    >
      <span style={{
        textShadow: '0 0 15px rgba(255, 200, 100, 0.5)',
        filter: 'drop-shadow(0 0 5px rgba(255, 200, 100, 0.3))',
      }}>
        {isPrev ? '◀' : '▶'}
      </span>
    </button>
  );
}

