'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { MeetingSketch } from '../sketches/MeetingSketch';
import { MobileSketch } from '../sketches/MobileSketch';
import catAnimation from '../../../public/sketches/cat.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface PageProps {
  side: 'left' | 'right';
}

export function PageSixSeven({ side }: PageProps) {
  if (side === 'left') {
    return (
      <div className="page-content" style={{ justifyContent: 'space-between' }}>
        <div>
          {/* Round badge */}
          <span className="round-badge">ROUND 3</span>

          {/* Header */}
          <h2 className="page-header" style={{ marginBottom: '8px' }}>PM + Engineering</h2>

          {/* Quest marker */}
          <div className="quest-marker">Cross-Functional</div>
        </div>

        {/* Meeting sketch */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          margin: '15px 0',
        }}>
          <MeetingSketch />
        </div>

        {/* Main message */}
        <div className="sketch-box" style={{ textAlign: 'center', padding: '12px' }}>
          <p className="quirky-text" style={{ 
            color: 'var(--leather)',
            margin: 0,
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
          }}>
            This is about TEAMWORK
          </p>
        </div>

        {/* Decorative doodle */}
        <div style={{ textAlign: 'center' }}>
          <p className="note-text" style={{ margin: 0 }}>
            How well do you play with others?
          </p>
        </div>

        {/* Page number */}
        <span className="page-number left">6</span>
      </div>
    );
  }

  // Right page
  return (
    <div className="page-content" style={{ justifyContent: 'space-between' }}>
      {/* PM section */}
      <div>
        <p className="body-text" style={{ 
          fontSize: '1em',
          borderBottom: '2px solid var(--ink-faded)',
          paddingBottom: '4px',
          display: 'inline-block',
          margin: '0 0 8px 0',
        }}>
          What PM will explore:
        </p>
        <ul className="arrow-list" style={{ margin: 0 }}>
          <li style={{ padding: '2px 0 2px 25px' }}>How do you collaborate?</li>
          <li style={{ padding: '2px 0 2px 25px' }}>Trade-offs you&apos;ve made</li>
          <li style={{ padding: '2px 0 2px 25px' }}>Delivery & scoping</li>
        </ul>
      </div>

      {/* Cat animation */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        margin: '10px 0',
      }}>
        <div style={{ width: '200px', height: '200px' }}>
          <Lottie 
            animationData={catAnimation}
            loop={true}
            style={{ filter: 'sepia(0.2)' }}
          />
        </div>
      </div>

      {/* Engineering section */}
      <div>
        <p className="body-text" style={{ 
          fontSize: '1em',
          borderBottom: '2px solid var(--ink-faded)',
          paddingBottom: '4px',
          display: 'inline-block',
          margin: '0 0 8px 0',
        }}>
          What Engineering will ask:
        </p>
        <ul className="arrow-list" style={{ margin: 0 }}>
          <li style={{ padding: '2px 0 2px 25px' }}>Component systems</li>
          <li style={{ padding: '2px 0 2px 25px' }}>Mobile design specifics</li>
          <li style={{ padding: '2px 0 2px 25px' }}>Technical feasibility</li>
        </ul>
      </div>

      {/* Bottom section with torn note and mobile */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '10px' }}>
        <div className="torn-paper" style={{ 
          maxWidth: '55%',
          padding: '10px 12px',
          transform: 'rotate(-2deg)',
          fontSize: '0.9em',
        }}>
          <p style={{ margin: 0 }}>&quot;Can your designs actually be BUILT?&quot;</p>
          <p style={{ margin: '5px 0 0 0', fontStyle: 'italic', fontSize: '0.9em' }}>
            Show you understand constraints!
          </p>
        </div>
        <MobileSketch />
      </div>

      {/* Page number */}
      <span className="page-number right">7</span>
    </div>
  );
}
