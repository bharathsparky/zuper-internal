'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { MountainSketch } from '../sketches/MountainSketch';
import { GraphSketch } from '../sketches/GraphSketch';
import confusedAnimation from '../../../public/sketches/Confused.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface PageProps {
  side: 'left' | 'right';
}

export function PageEightNine({ side }: PageProps) {
  if (side === 'left') {
    return (
      <div className="page-content" style={{ justifyContent: 'space-between' }}>
        <div>
          {/* Round badge */}
          <span className="round-badge">ROUND 4</span>

          {/* Header */}
          <h2 className="page-header" style={{ marginBottom: '8px' }}>CTO Round</h2>

          {/* Quest marker */}
          <div className="quest-marker">The Summit</div>
        </div>

        {/* Mountain sketch */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          margin: '15px 0',
        }}>
          <MountainSketch />
        </div>

        {/* Congratulations message */}
        <div style={{
          textAlign: 'center',
          padding: '15px',
          background: 'linear-gradient(135deg, rgba(212, 165, 116, 0.1) 0%, transparent 100%)',
          borderRadius: '4px',
        }}>
          <p className="quirky-text" style={{ 
            color: 'var(--leather)',
            fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
            margin: 0,
          }}>
            You&apos;ve made it far!
          </p>
          <p className="body-text" style={{ margin: '8px 0 0 0' }}>
            This is the summit.
          </p>
        </div>

        {/* Page number */}
        <span className="page-number left">8</span>
      </div>
    );
  }

  // Right page
  return (
    <div className="page-content" style={{ justifyContent: 'space-between' }}>
      {/* Warning banner */}
      <div style={{
        background: 'rgba(255, 126, 185, 0.15)',
        border: '2px dashed var(--sticky-pink)',
        padding: '10px 12px',
        borderRadius: '4px',
      }}>
        <p className="emphasis-text" style={{ fontSize: '1em', margin: 0 }}>
          ⚠️ This round is... DYNAMIC
        </p>
        <p className="note-text" style={{ margin: '4px 0 0 0' }}>
          (We don&apos;t fully know the pattern!)
        </p>
      </div>

      {/* What to expect */}
      <div>
        <p className="body-text" style={{ margin: '0 0 8px 0' }}>
          Expect questions about:
        </p>
        <ul className="arrow-list" style={{ margin: 0 }}>
          <li style={{ padding: '2px 0 2px 25px' }}><strong>YOU</strong> — your story, journey</li>
          <li style={{ padding: '2px 0 2px 25px' }}>SaaS tools you&apos;ve used</li>
          <li style={{ padding: '2px 0 2px 25px' }}>Possibly another case study</li>
          <li style={{ padding: '2px 0 2px 25px' }}>Business-side thinking</li>
        </ul>
      </div>

      {/* Confused animation */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '15px 0' }}>
        <div style={{ width: '200px', height: '200px' }}>
          <Lottie 
            animationData={confusedAnimation}
            loop={true}
            style={{ filter: 'sepia(0.2)' }}
          />
        </div>
      </div>

      {/* Bottom - sticky note and graph */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '10px' }}>
        <div className="sticky-note orange" style={{ 
          maxWidth: '55%',
          padding: '8px 10px',
          fontSize: '0.85em',
          transform: 'rotate(-1deg)',
        }}>
          <p style={{ fontWeight: '600', margin: 0 }}>Think bigger picture.</p>
          <p style={{ margin: '5px 0 0 0' }}>
            Why does design matter for the BUSINESS?
          </p>
        </div>
        <GraphSketch />
      </div>

      {/* Page number */}
      <span className="page-number right">9</span>
    </div>
  );
}
