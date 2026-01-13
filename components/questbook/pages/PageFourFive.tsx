'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { DesignManagerSketch } from '../sketches/DesignManagerSketch';
import { BharathSketch } from '../sketches/BharathSketch';
import { FolderSketch } from '../sketches/FolderSketch';
import thinkingAnimation from '../../../public/sketches/thinking.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface PageProps {
  side: 'left' | 'right';
}

export function PageFourFive({ side }: PageProps) {
  if (side === 'left') {
    return (
      <div className="page-content" style={{ justifyContent: 'space-between' }}>
        <div>
          {/* Round badge */}
          <span className="round-badge">ROUND 2</span>

          {/* Header */}
          <h2 className="page-header" style={{ marginBottom: '8px' }}>Design Manager Round</h2>

          {/* Quest marker */}
          <div className="quest-marker">Design Leadership</div>

          {/* Interviewers */}
          <div style={{ marginTop: '12px' }}>
            <p className="body-text" style={{ fontSize: '0.95em', color: 'var(--ink-faded)', margin: 0 }}>
              Interviewers:
            </p>
            <p className="emphasis-text" style={{ fontSize: '1.2em', margin: '4px 0' }}>
              Design Manager
            </p>
            <p className="note-text" style={{ margin: 0 }}>
              (+ maybe me!)
            </p>
          </div>
        </div>

        {/* Design Manager and Bharath illustrations */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'flex-end',
          gap: '10px',
          margin: '15px 0',
        }}>
          <DesignManagerSketch />
          <BharathSketch />
        </div>

        {/* Note */}
        <div style={{
          background: 'rgba(139, 69, 19, 0.05)',
          padding: '12px 15px',
          borderRadius: '4px',
        }}>
          <p className="body-text" style={{ margin: 0, fontSize: '1.1em' }}>
            This round digs <span className="emphasis-text">DEEPER</span>...
          </p>
        </div>

        {/* Page number */}
        <span className="page-number left">4</span>
      </div>
    );
  }

  // Right page
  return (
    <div className="page-content" style={{ justifyContent: 'space-between' }}>
      {/* What they want to understand */}
      <div>
        <p className="body-text" style={{ 
          fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)', 
          margin: '0 0 15px 0',
          fontWeight: '600',
          color: 'var(--ink-brown)'
        }}>
          They want to understand:
        </p>

        {/* Key areas - More prominent */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
          <p className="body-text" style={{ margin: 0, fontSize: 'clamp(1.2rem, 2.2vw, 1.5rem)' }}>🧠 Design Thinking</p>
          <p className="body-text" style={{ margin: 0, fontSize: 'clamp(1.2rem, 2.2vw, 1.5rem)' }}>📋 Your Processes</p>
          <p className="body-text" style={{ margin: 0, fontSize: 'clamp(1.2rem, 2.2vw, 1.5rem)' }}>📊 How you use DATA</p>
          <p className="body-text" style={{ margin: 0, fontSize: 'clamp(1.2rem, 2.2vw, 1.5rem)' }}>🔍 Research methods</p>
          <p className="body-text" style={{ margin: 0, fontSize: 'clamp(1.2rem, 2.2vw, 1.5rem)' }}>📝 Documentation</p>
        </div>
      </div>

      {/* Design Process Lottie animation */}
      <div style={{ margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '220px' }}>
          <Lottie 
            animationData={thinkingAnimation}
            loop={true}
            style={{ filter: 'sepia(0.15) contrast(1.05)' }}
          />
        </div>
      </div>

      {/* Pro tip and folder */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
        <div className="sticky-note pink" style={{ 
          width: '100%',
          maxWidth: '180px',
          padding: '10px 12px',
          fontSize: 'clamp(0.9rem, 1.6vw, 1.1rem)',
          transform: 'rotate(1deg)',
          alignSelf: 'flex-end',
        }}>
          <p style={{ fontWeight: '600', margin: 0 }}>Pro tip:</p>
          <p style={{ margin: '6px 0 0 0' }}>Talk in terms of:</p>
          <p style={{ margin: '3px 0' }}>• Data points</p>
          <p style={{ margin: '3px 0' }}>• Product knowledge</p>
          <p style={{ margin: '3px 0' }}>• Clear process steps</p>
        </div>
        <FolderSketch />
      </div>

      {/* Page number */}
      <span className="page-number right">5</span>
    </div>
  );
}
