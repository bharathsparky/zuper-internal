'use client';

import React from 'react';
import { GiftBoxSketch } from '../sketches/GiftBoxSketch';
import { HandshakeSketch } from '../sketches/HandshakeSketch';

export function PageTen() {
  return (
    <div className="page-content" style={{ textAlign: 'center', justifyContent: 'space-between' }}>
      {/* Header section */}
      <div>
        <span className="round-badge" style={{ 
          background: 'var(--accent-gold)',
          color: 'var(--ink-dark)',
        }}>
          FINAL ROUND
        </span>

        <h2 className="page-header" style={{ 
          textAlign: 'center',
          marginTop: '10px',
          borderBottom: 'none',
        }}>
          HR Package Discussion
        </h2>
      </div>

      {/* Gift box sketch */}
      <div style={{ margin: '0 0 10px 0' }}>
        <GiftBoxSketch />
      </div>

      {/* Success message */}
      <div className="celebration-banner" style={{ 
        padding: '12px 20px', 
        fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
        position: 'absolute',
        top: '55%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        zIndex: 5
      }}>
        If you&apos;ve cleared everything...
        <br />
        YOU&apos;RE BASICALLY IN! 🎉
      </div>

      {/* What this round covers */}
      <div style={{ 
        textAlign: 'left',
        maxWidth: '200px',
        margin: '10px auto',
      }}>
        <p className="body-text" style={{ margin: '0 0 8px 0' }}>
          This is about:
        </p>
        <ul className="arrow-list" style={{ margin: 0 }}>
          <li style={{ padding: '2px 0 2px 25px' }}>Salary package</li>
          <li style={{ padding: '2px 0 2px 25px' }}>Joining date</li>
          <li style={{ padding: '2px 0 2px 25px' }}>Final details</li>
        </ul>
      </div>

      {/* Handshake sketch */}
      <div>
        <HandshakeSketch />
      </div>

      {/* Welcome banner */}
      <div style={{
        fontFamily: "'Amatic SC', cursive",
        fontSize: 'clamp(1.6rem, 3.5vw, 2rem)',
        fontWeight: '700',
        color: 'var(--leather)',
        padding: '10px 15px',
        border: '3px double var(--leather)',
        display: 'inline-block',
      }}>
        &quot;Welcome to the team!&quot;
      </div>

      {/* Page number */}
      <span className="page-number right">10</span>
    </div>
  );
}
