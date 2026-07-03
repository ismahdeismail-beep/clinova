import React, { useState, useEffect } from 'react';

interface GhostWriterTextProps {
  content: string;
  speed?: number;
  onComplete?: () => void;
}

export function GhostWriterText({ content, speed = 20, onComplete }: GhostWriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayedText("");
    
    // Short delay before starting to type
    const initialDelay = setTimeout(() => {
      const timer = setInterval(() => {
        index++;
        // Fast-forward through markdown tokens to avoid broken syntax while typing
        setDisplayedText(content.slice(0, index));
        if (index >= content.length) {
          clearInterval(timer);
          onComplete?.();
        }
      }, speed);
      
      return () => clearInterval(timer);
    }, 100);

    return () => clearTimeout(initialDelay);
  }, [content, speed, onComplete]);

  // Use the same Markdown-like splitting logic as in ClinicalAssistantScreen
  return (
    <>
      {displayedText.split('**').map((text, i) => 
        i % 2 === 1 ? <strong key={i} className="font-semibold">{text}</strong> : text
      )}
    </>
  );
}
