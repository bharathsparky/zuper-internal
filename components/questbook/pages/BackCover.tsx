'use client';

import React from 'react';

export function BackCover() {
  return (
    <div className="cover-content">
      {/* Corner decorations */}
      <div className="cover-corner top-left" />
      <div className="cover-corner top-right" />
      <div className="cover-corner bottom-left" />
      <div className="cover-corner bottom-right" />

      {/* Zuper logo placeholder */}
      <div style={{
        fontFamily: "'Amatic SC', cursive",
        fontSize: '3rem',
        fontWeight: '700',
        color: 'var(--accent-gold)',
        letterSpacing: '4px',
        marginBottom: '20px',
      }}>
        ZUPER
      </div>

      {/* Tagline */}
      <p style={{
        fontFamily: "'Indie Flower', cursive",
        fontSize: '1.1rem',
        color: 'var(--paper-aged)',
        opacity: 0.8,
        maxWidth: '250px',
        textAlign: 'center',
        lineHeight: 1.6,
      }}>
        Field Service Management
        <br />
        <span style={{ opacity: 0.6 }}>made simple</span>
      </p>

      {/* Decorative line */}
      <div style={{
        width: '80px',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, var(--accent-gold), transparent)',
        margin: '30px 0',
      }} />

      {/* Quest completed badge */}
      <div style={{
        border: '2px solid var(--accent-gold)',
        borderRadius: '50%',
        width: '80px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20px',
      }}>
        <span style={{
          fontFamily: "'Permanent Marker', cursive",
          fontSize: '0.8rem',
          color: 'var(--accent-gold)',
          textAlign: 'center',
        }}>
          QUEST
          <br />
          BOOK
        </span>
      </div>

      {/* Credits */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        fontFamily: "'Indie Flower', cursive",
        fontSize: '0.85rem',
        color: 'var(--paper-aged)',
        opacity: 0.5,
        textAlign: 'center',
      }}>
        Crafted with ❤️ for future Zuperians
        <br />
        <span style={{ fontSize: '0.75rem' }}>2024 Edition</span>
      </div>
    </div>
  );
}





