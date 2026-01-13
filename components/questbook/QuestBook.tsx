'use client';

import React, { useRef, useCallback, useEffect, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { CoverPage } from './pages/CoverPage';
import { PageOne } from './pages/PageOne';
import { PageTwoThree } from './pages/PageTwoThree';
import { PageFourFive } from './pages/PageFourFive';
import { PageSixSeven } from './pages/PageSixSeven';
import { PageEightNine } from './pages/PageEightNine';
import { PageTen } from './pages/PageTen';
import { FinalPage } from './pages/FinalPage';
import { BackCover } from './pages/BackCover';
import { NavigationHint } from './NavigationHint';
import { MagicalParticles } from './MagicalParticles';

// Forward ref wrapper for pages
const Page = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className = '' }, ref) => (
    <div className={`page ${className}`} ref={ref}>
      {children}
    </div>
  )
);
Page.displayName = 'Page';

// Hard cover page wrapper
const HardPage = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className = '' }, ref) => (
    <div className={`page ${className}`} ref={ref} data-density="hard">
      {children}
    </div>
  )
);
HardPage.displayName = 'HardPage';

export default function QuestBook() {
  const bookRef = useRef<typeof HTMLFlipBook>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 900, height: 1100 });

  // Calculate responsive dimensions - ABSOLUTE MAXIMUM SIZE
  useEffect(() => {
    const updateDimensions = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Use a portrait aspect ratio
      const aspectRatio = 0.7; // 7:10 ratio for tall pages
      
      // Use 98% of viewport height - nearly edge to edge!
      let height = viewportHeight * 0.98;
      let width = height * aspectRatio;
      
      // Each page can take up to 49% of viewport width
      const maxWidth = viewportWidth * 0.49;
      if (width > maxWidth) {
        width = maxWidth;
        height = width / aspectRatio;
      }
      
      // Minimum dimensions
      width = Math.max(width, 500);
      height = Math.max(height, 714);
      
      setDimensions({ width: Math.floor(width), height: Math.floor(height) });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const onFlip = useCallback((e: { data: number }) => {
    setCurrentPage(e.data);
  }, []);

  const onInit = useCallback((e: { data: { pageCount: number } }) => {
    setTotalPages(e.data.pageCount);
  }, []);

  const goToNextPage = useCallback(() => {
    if (bookRef.current) {
      // @ts-expect-error - pageFlip method exists on the component
      bookRef.current.pageFlip().flipNext();
    }
  }, []);

  const goToPrevPage = useCallback(() => {
    if (bookRef.current) {
      // @ts-expect-error - pageFlip method exists on the component
      bookRef.current.pageFlip().flipPrev();
    }
  }, []);

  return (
    <div className="book-wrapper">
      {/* Magical ambient effects */}
      <MagicalParticles />
      
      {/* Mystical corner decorations */}
      <div className="mystical-corner top-left" />
      <div className="mystical-corner top-right" />
      <div className="mystical-corner bottom-left" />
      <div className="mystical-corner bottom-right" />
      
      {/* Floating candles glow */}
      <div className="candle-glow candle-1" />
      <div className="candle-glow candle-2" />
      <div className="candle-glow candle-3" />
      
      {/* Navigation hints */}
      <NavigationHint 
        direction="prev" 
        onClick={goToPrevPage} 
        disabled={currentPage === 0}
      />
      
      <HTMLFlipBook
        ref={bookRef}
        width={dimensions.width}
        height={dimensions.height}
        size="stretch"
        minWidth={500}
        maxWidth={2000}
        minHeight={714}
        maxHeight={2800}
        showCover={true}
        drawShadow={true}
        flippingTime={1200}
        usePortrait={true}
        startZIndex={0}
        autoSize={true}
        maxShadowOpacity={0.6}
        mobileScrollSupport={true}
        clickEventForward={true}
        useMouseEvents={true}
        swipeDistance={30}
        showPageCorners={true}
        disableFlipByClick={false}
        className="flip-book"
        style={{}}
        startPage={0}
        onFlip={onFlip}
        onInit={onInit}
      >
        {/* Cover Page */}
        <HardPage className="cover-page">
          <CoverPage />
        </HardPage>

        {/* Page 1: Current Status */}
        <Page>
          <PageOne />
        </Page>

        {/* Pages 2-3: Round 1 - Case Study Gauntlet (Spread) */}
        <Page className="page-left">
          <PageTwoThree side="left" />
        </Page>
        <Page className="page-right">
          <PageTwoThree side="right" />
        </Page>

        {/* Pages 4-5: Round 2 - Design Leadership (Spread) */}
        <Page className="page-left">
          <PageFourFive side="left" />
        </Page>
        <Page className="page-right">
          <PageFourFive side="right" />
        </Page>

        {/* Pages 6-7: Round 3 - Cross-Functional (Spread) */}
        <Page className="page-left">
          <PageSixSeven side="left" />
        </Page>
        <Page className="page-right">
          <PageSixSeven side="right" />
        </Page>

        {/* Pages 8-9: Round 4 - The CTO (Spread) */}
        <Page className="page-left">
          <PageEightNine side="left" />
        </Page>
        <Page className="page-right">
          <PageEightNine side="right" />
        </Page>

        {/* Page 10: Final Gate */}
        <Page>
          <PageTen />
        </Page>

        {/* Final Page: Remember... */}
        <Page>
          <FinalPage />
        </Page>

        {/* Back Cover */}
        <HardPage className="back-cover cover-page">
          <BackCover />
        </HardPage>
      </HTMLFlipBook>

      <NavigationHint 
        direction="next" 
        onClick={goToNextPage} 
        disabled={currentPage >= totalPages - 1}
      />

      {/* Page indicator */}
      <div style={{
        position: 'absolute',
        bottom: '-40px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: "'Indie Flower', cursive",
        fontSize: '1rem',
        color: 'var(--accent-gold)',
        opacity: 0.7,
      }}>
        {currentPage > 0 && currentPage < totalPages - 1 && (
          <span>Page {currentPage} of {totalPages - 2}</span>
        )}
      </div>
    </div>
  );
}

