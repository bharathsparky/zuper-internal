'use client';

import React from 'react';
import { VickySketch } from './VickySketch';
import { MithunSketch } from './MithunSketch';

export function TeamSketch() {
  return (
    <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-end' }}>
      <VickySketch />
      <MithunSketch />
    </div>
  );
}

