import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'motion/react';

interface TypewriterTextProps {
  text: string;
  speed?: number; // ms per character
  delay?: number; // ms delay before typing begins
  className?: string;
  cursor?: boolean;
  as?: 'p' | 'span' | 'h2' | 'h3' | 'h4' | 'div';
  onComplete?: () => void;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 22,
  delay = 200,
  className = '',
  cursor = true,
  as: Component = 'p',
  onComplete
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-20px' });
  const [displayedCount, setDisplayedCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!isInView || hasStarted) return;

    const startTimeout = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [isInView, hasStarted, delay]);

  useEffect(() => {
    if (!hasStarted || isFinished) return;

    if (displayedCount < text.length) {
      const charTimer = setTimeout(() => {
        setDisplayedCount(prev => prev + 1);
      }, speed);
      return () => clearTimeout(charTimer);
    } else {
      setIsFinished(true);
      if (onComplete) onComplete();
    }
  }, [hasStarted, displayedCount, text.length, speed, isFinished, onComplete]);

  const visibleText = text.slice(0, displayedCount);

  // Hidden text for accessible SEO & layout height preservation (prevents jumpiness)
  return (
    <Component
      ref={containerRef as any}
      className={`relative inline-block ${className}`}
      aria-label={text}
    >
      <span aria-hidden="true">
        {visibleText}
        {cursor && !isFinished && (
          <span className="inline-block w-0.5 h-[1.1em] bg-slate-300 align-middle ml-0.5 animate-pulse" />
        )}
      </span>
      {/* Invisible ghost text to reserve exact height and prevent content jumping during typing */}
      {!hasStarted && (
        <span className="sr-only">{text}</span>
      )}
    </Component>
  );
};
