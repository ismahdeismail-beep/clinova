import React, { useState, useEffect } from 'react';

interface GhostWriterTextProps {
  content: string;
  speed?: number;
  onComplete?: () => void;
}

export function GhostWriterText({ content, speed = 10, onComplete }: GhostWriterTextProps) {
  const [displayedLength, setDisplayedLength] = useState(0);

  useEffect(() => {
    let index = 0;
    setDisplayedLength(0);
    
    const initialDelay = setTimeout(() => {
      const timer = setInterval(() => {
        // Advance by a few characters to make it smooth and fast
        index += 3;
        
        if (index >= content.length) {
          index = content.length;
          setDisplayedLength(index);
          clearInterval(timer);
          onComplete?.();
        } else {
          setDisplayedLength(index);
        }
      }, speed);
      
      return () => clearInterval(timer);
    }, 100);

    return () => clearTimeout(initialDelay);
  }, [content, speed, onComplete]);

  // Render text with invisible characters for the remainder to prevent layout shifts and word-wrap flickering
  const renderText = () => {
    const parts = content.split('**');
    let currentLen = 0;
    
    return parts.map((part, i) => {
      const isBold = i % 2 === 1;
      
      // Calculate how much of this part is visible
      const partStart = currentLen;
      const partEnd = currentLen + part.length;
      currentLen += part.length + 2; // +2 for the '**' which are removed in display
      
      let visiblePart = '';
      let hiddenPart = '';
      
      if (displayedLength >= partEnd) {
        visiblePart = part;
      } else if (displayedLength <= partStart) {
        hiddenPart = part;
      } else {
        const visibleChars = displayedLength - partStart;
        visiblePart = part.slice(0, visibleChars);
        hiddenPart = part.slice(visibleChars);
      }
      
      return (
        <React.Fragment key={i}>
          {isBold ? (
            <strong className="font-semibold">
              <span>{visiblePart}</span>
              {hiddenPart && <span className="opacity-0">{hiddenPart}</span>}
            </strong>
          ) : (
            <>
              <span>{visiblePart}</span>
              {hiddenPart && <span className="opacity-0">{hiddenPart}</span>}
            </>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="relative inline">
      {renderText()}
      {displayedLength < content.length && (
        <span className="inline-block w-1.5 h-3.5 ml-0.5 align-middle bg-[var(--primary)] animate-pulse" />
      )}
    </div>
  );
}
