'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamic import to avoid SSR issues with page-flip
const QuestBook = dynamic(() => import('@/components/questbook/QuestBook'), {
  ssr: false,
  loading: () => (
    <div className="questbook-loading">
      <div className="loading-book">
        <div className="loading-cover">
          <span>Opening your quest journal...</span>
        </div>
      </div>
    </div>
  ),
});

export default function QuestBookPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="questbook-loading">
        <div className="loading-book">
          <div className="loading-cover">
            <span>Preparing your adventure...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="questbook-container">
      <QuestBook />
    </main>
  );
}





