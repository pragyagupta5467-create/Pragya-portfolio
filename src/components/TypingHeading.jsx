import React, { useState, useEffect } from 'react';

/**
 * Natural human typing animation component for opening heading reveal
 * Features shining purple-blue gradient color text effect.
 * @param {Object} props
 * @param {string} props.text - Text to type (default: "Hi, Pragya Gupta")
 * @param {Function} props.onComplete - Callback triggered when typing completes
 */
export function TypingHeading({ text = "Hi, Pragya Gupta", onComplete }) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      // Smooth natural typing speed (~70ms per character, ~1.2s total duration)
      const randomDelay = Math.floor(Math.random() * 30) + 60;
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, randomDelay);

      return () => clearTimeout(timeout);
    } else if (!isDone) {
      setIsDone(true);
      if (onComplete) {
        onComplete();
      }
    }
  }, [currentIndex, text, isDone, onComplete]);

  return (
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-3 leading-tight inline-flex items-center justify-center gap-1 min-h-[1.2em]">
      <span className="shining-purple-blue-text font-black">
        {displayText}
      </span>
      <span
        className={`inline-block w-1.5 h-[0.85em] bg-purple-400 ml-0.5 transition-opacity duration-500 ${
          isDone ? 'opacity-40 animate-pulse' : 'opacity-100 animate-pulse'
        }`}
      />
    </h1>
  );
}

export default TypingHeading;
