'use client';

import React from 'react';
import { TeamSketch } from '../sketches/TeamSketch';
import { BrainGearsSketch } from '../sketches/BrainGearsSketch';
import { RobotSketch } from '../sketches/RobotSketch';

interface PageProps {
  side: 'left' | 'right';
}

export function PageTwoThree({ side }: PageProps) {
  if (side === 'left') {
    return (
      <div className="page-content" style={{ justifyContent: 'space-between' }}>
        <div>
          {/* Round badge with completion status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span className="round-badge" style={{ 
              background: 'linear-gradient(135deg, #90EE90 0%, #228B22 100%)',
              boxShadow: '0 2px 8px rgba(34, 139, 34, 0.3)',
            }}>ROUND 1</span>
            <span style={{
              fontFamily: "'Amatic SC', cursive",
              fontSize: '1.8rem',
              fontWeight: '700',
              color: '#228B22',
              textShadow: '1px 1px 2px rgba(34, 139, 34, 0.2)',
            }}>✓ DONE!</span>
          </div>

          {/* Header with strikethrough effect */}
          <h2 className="page-header" style={{ 
            marginBottom: '8px',
            textDecoration: 'line-through',
            textDecorationColor: '#90EE90',
            textDecorationThickness: '2px',
            opacity: 0.8,
          }}>Design Team Review</h2>

          {/* Subheader */}
          <div className="quest-marker" style={{ opacity: 0.7 }}>Case Study Gauntlet</div>

          {/* Interviewers section */}
          <div style={{ marginTop: '12px' }}>
            <p className="body-text" style={{ fontSize: '0.95em', color: 'var(--ink-faded)', margin: 0 }}>
              Interviewers:
            </p>
            <p className="emphasis-text" style={{ fontSize: '1.2em', margin: '4px 0' }}>
              Vicky & Mithun
            </p>
            <p className="note-text" style={{ margin: 0 }}>
              (my teammates!)
            </p>
          </div>

          {/* Team sketch */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            margin: '15px 0',
          }}>
            <TeamSketch />
          </div>
        </div>

        {/* What they'll ask */}
        <div className="dashed-box" style={{ padding: '10px 12px' }}>
          <p className="body-text" style={{ fontWeight: '600', margin: '0 0 5px 0' }}>
            What they&apos;ll ask:
          </p>
          <ul className="arrow-list" style={{ margin: 0 }}>
            <li>Walk us through a case study</li>
          </ul>
        </div>

        {/* Page number */}
        <span className="page-number left">2</span>
      </div>
    );
  }

  // Right page
  return (
    <div className="page-content" style={{ justifyContent: 'space-between' }}>
      <div>
        {/* What they're really evaluating */}
        <p className="body-text" style={{ 
          fontSize: '1.1em', 
          marginBottom: '10px',
          color: 'var(--ink-dark)',
        }}>
          What they&apos;re <span className="emphasis-text">REALLY</span> evaluating:
        </p>

        {/* Checklist box */}
        <div className="sketch-box" style={{ padding: '10px 12px' }}>
          <ul className="checklist" style={{ margin: 0 }}>
            <li>Presentation skills</li>
            <li>Business knowledge</li>
            <li>Visual design principles</li>
            <li>Reasoning behind designs</li>
            <li>The &quot;WHY&quot; behind decisions</li>
          </ul>
        </div>
      </div>

      {/* Middle - Brain sketch and sticky note side by side */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', margin: '10px 0' }}>
        <BrainGearsSketch />
        <div className="sticky-note yellow" style={{ 
          maxWidth: '160px',
          fontSize: '0.9em',
          padding: '10px 12px',
          transform: 'rotate(-1deg)',
        }}>
          <p style={{ margin: 0 }}>It&apos;s not just about pretty pixels!</p>
          <p style={{ marginTop: '6px', fontWeight: '600' }}>
            They want your THINKING.
          </p>
        </div>
      </div>

      {/* Bonus section */}
      <div className="bonus-section" style={{ padding: '10px 12px' }}>
        <p className="label" style={{ margin: '0 0 5px 0' }}>⭐ BONUS POINTS:</p>
        <ul className="arrow-list" style={{ margin: 0 }}>
          <li style={{ padding: '3px 0 3px 25px' }}>How do you use AI in your workflow?</li>
          <li style={{ padding: '3px 0 3px 25px' }}>Have you built anything WITH AI?</li>
        </ul>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
          <p className="note-text" style={{ margin: 0 }}>(This is a BIG plus!)</p>
          <RobotSketch />
        </div>
      </div>

      {/* Page number */}
      <span className="page-number right">3</span>
    </div>
  );
}
