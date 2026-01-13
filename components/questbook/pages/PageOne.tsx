'use client';

import React from 'react';
import { PersonClimbingSketch } from '../sketches/PersonClimbingSketch';
import { CalendarSketch } from '../sketches/CalendarSketch';
import { VigneshSketch } from '../sketches/VigneshSketch';

export function PageOne() {
  return (
    <div className="page-content" style={{ justifyContent: 'space-between' }}>
      {/* Coffee stain decoration */}
      <div className="coffee-stain" style={{ top: '10px', right: '30px' }} />

      {/* Top Section */}
      <div>
        {/* Personalized Welcome - Compact with Vignesh illustration */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          marginBottom: '12px',
          padding: '10px 15px',
          background: 'linear-gradient(135deg, rgba(212, 165, 116, 0.15) 0%, rgba(139, 69, 19, 0.08) 100%)',
          borderRadius: '8px',
          border: '1px dashed var(--accent-gold)',
        }}>
          <VigneshSketch />
          <p style={{
            fontFamily: "'Indie Flower', cursive",
            fontSize: 'clamp(1rem, 2vw, 1.4rem)',
            color: 'var(--ink-brown)',
            margin: 0,
            flex: 1,
          }}>
            Dear <span style={{ 
              fontFamily: "'Permanent Marker', cursive",
              color: 'var(--leather)',
            }}>Vignesh</span>, welcome to your interview adventure! ✨
          </p>
        </div>

        {/* Header */}
        <h2 className="page-header" style={{ marginBottom: '10px' }}>Current Status</h2>

        {/* Checklist */}
        <ul className="checklist" style={{ margin: '8px 0' }}>
          <li className="checked">Talked with Pooja (HR) — Done!</li>
          <li className="checked">Round 1: Design Team Review — Done! ✓</li>
        </ul>

        {/* Success section - Compact */}
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(144, 238, 144, 0.15) 0%, rgba(34, 139, 34, 0.08) 100%)', 
          padding: '12px 15px', 
          borderRadius: '4px',
          border: '1px solid rgba(34, 139, 34, 0.2)',
          margin: '12px 0',
        }}>
          <p className="body-text" style={{ margin: 0, color: '#228B22', fontWeight: '600' }}>
            🎉 Great news! You&apos;ve cleared Round 1 with the team!
          </p>
          <p className="body-text" style={{ margin: '5px 0 0 0', fontSize: '0.9em' }}>
            Now preparing for the next rounds...
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="divider dashed" style={{ margin: '15px 0' }} />

      {/* Bottom Section - Warning */}
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <p className="body-text" style={{ margin: '0 0 8px 0' }}>
            This is where it gets <span className="emphasis-text">real</span> →
          </p>
          <p className="body-text" style={{ margin: '0 0 8px 0', fontSize: '0.95em' }}>
            You need to <span style={{ textDecoration: 'underline', textDecorationStyle: 'wavy' }}>impress</span>. 
            There are other candidates who performed well...
          </p>
          <p className="emphasis-text" style={{ 
            fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', 
            margin: 0,
            color: 'var(--leather)',
          }}>
            so bring your A-game!
          </p>
        </div>
        <PersonClimbingSketch />
      </div>

      {/* Page number */}
      <span className="page-number right">1</span>
    </div>
  );
}
