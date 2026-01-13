'use client';

import React from 'react';
import { SwissKnifeSketch } from '../sketches/SwissKnifeSketch';
import { TreasureChestSketch } from '../sketches/TreasureChestSketch';

export function FinalPage() {
  return (
    <div className="page-content" style={{ justifyContent: 'space-between' }}>
      {/* Decorative border */}
      <div style={{
        position: 'absolute',
        inset: '10px',
        border: '2px solid var(--ink-faded)',
        borderRadius: '4px',
        opacity: 0.2,
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <h2 className="page-header" style={{ textAlign: 'center', borderBottom: 'none', margin: 0 }}>
        Remember...
      </h2>

      {/* Flexibility note */}
      <div style={{ textAlign: 'center' }}>
        <p className="body-text" style={{ margin: 0 }}>
          Things change. <span className="emphasis-text">Stay flexible.</span>
        </p>
        <p className="body-text" style={{ margin: '5px 0 0 0', fontSize: '0.95em' }}>
          But come <span style={{ textDecoration: 'underline' }}>PREPARED</span> for all of this.
        </p>
      </div>

      {/* Swiss knife sketch */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <SwissKnifeSketch />
      </div>

      {/* Secret weapons - Compact */}
      <div>
        <p className="emphasis-text" style={{ fontSize: '1em', margin: '0 0 8px 0' }}>
          Your secret weapons:
        </p>
        <div className="sketch-box" style={{ padding: '8px 12px' }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3px 10px',
            fontFamily: "'Caveat', cursive",
            fontSize: '0.95em',
          }}>
            <span>✦ Deep case studies</span>
            <span>✦ Data-backed decisions</span>
            <span>✦ Structured thinking</span>
            <span>✦ Collaboration stories</span>
            <span>✦ AI workflow knowledge</span>
            <span>✦ SaaS understanding</span>
          </div>
        </div>
      </div>

      {/* Treasure chest */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TreasureChestSketch />
      </div>

      {/* Final message */}
      <div style={{ textAlign: 'center' }}>
        <p className="quirky-text" style={{ 
          color: 'var(--leather)',
          fontSize: 'clamp(1.4rem, 3vw, 2rem)',
          margin: 0,
        }}>
          You&apos;ve got this, Vignesh!
        </p>
        <p className="body-text" style={{ margin: '5px 0 0 0' }}>
          Go make it happen. 👍
        </p>
      </div>

      {/* Signature */}
      <div className="signature" style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)', marginTop: '5px' }}>
        Rooting for you! 🌟 — Bharath
      </div>

      {/* Page number */}
      <span className="page-number right">11</span>
    </div>
  );
}
