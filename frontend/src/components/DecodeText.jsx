import React, { useState, useEffect, useRef } from 'react';

export default function DecodeText({ text, dur = 400, className = '' }) {
  const [displayText, setDisplayText] = useState(text);
  const isDecoding = useRef(false);

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  const triggerDecode = () => {
    if (isDecoding.current) return;
    isDecoding.current = true;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const n = text.length;
    const start = performance.now();
    let lastRoll = 0;
    const rand = new Array(n);

    const roll = () => {
      for (let i = 0; i < n; i++) {
        rand[i] = chars.charAt(Math.floor(Math.random() * 26));
      }
    };
    roll();

    const step = (now) => {
      const elapsed = now - start;
      const p = Math.min(1, elapsed / dur);
      const front = p * n;
      let out = '';

      if (now - lastRoll > 45) {
        roll();
        lastRoll = now;
      }

      for (let i = 0; i < n; i++) {
        const c = text.charAt(i);
        if (i < front) {
          out += c;
        } else if (i < front + 3.6) {
          out += c === ' ' ? ' ' : rand[i];
        } else {
          break;
        }
      }

      setDisplayText(out);

      if (p < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayText(text);
        isDecoding.current = false;
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <span className={`t ${className}`} onMouseEnter={triggerDecode}>
      {displayText}
    </span>
  );
}
