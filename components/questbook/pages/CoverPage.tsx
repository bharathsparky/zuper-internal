'use client';

import React from 'react';
import { CompassSketch } from '../sketches/CompassSketch';

export function CoverPage() {
  return (
    <div className="cover-content">
      {/* Corner decorations */}
      <div className="cover-corner top-left" />
      <div className="cover-corner top-right" />
      <div className="cover-corner bottom-left" />
      <div className="cover-corner bottom-right" />

      {/* Emblem/Compass */}
      <div className="cover-emblem">
        <CompassSketch />
      </div>

      {/* Title */}
      <h1 className="cover-title">The Interview Quest</h1>

      {/* Subtitle - Personalized for Vignesh */}
      <p className="cover-subtitle">
        A Guide for <span style={{ 
          color: '#ffd700', 
          fontWeight: 600,
          textShadow: '0 0 10px rgba(255, 215, 0, 0.5)'
        }}>Vignesh&apos;s</span> Journey to Zuper
      </p>

      {/* Decorative line */}
      <div style={{
        width: '120px',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, var(--accent-gold), transparent)',
        margin: '10px 0 30px',
      }} />

      {/* Quest stamp */}
      <div style={{
        fontFamily: "'Amatic SC', cursive",
        fontSize: '1.2rem',
        color: 'var(--accent-gold)',
        opacity: 0.6,
        letterSpacing: '2px',
        marginBottom: '40px',
      }}>
        ✦ FIELD SERVICE MANAGEMENT ✦
      </div>

      {/* Open prompt */}
      <p className="cover-prompt">
        ↪ Click or swipe to begin your adventure...
      </p>

      {/* Year/Edition decorative element */}
      <div style={{
        position: 'absolute',
        bottom: '30px',
        fontFamily: "'Indie Flower', cursive",
        fontSize: '0.9rem',
        color: 'var(--paper-aged)',
        opacity: 0.5,
      }}>
        Est. 2024 • UX Design Path
      </div>
    </div>
  );
}

