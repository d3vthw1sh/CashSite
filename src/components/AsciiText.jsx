import { useState, useEffect, useRef } from "react";

const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = "!@#$%^&*():{};|,.<>/?";

export default function AsciiText({ text, className, enableOnHover = true, autoStart = false }) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);

  const scramble = () => {
    let pos = 0;

    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const scrambled = text.split("")
        .map((char, index) => {
          if (index < pos) {
            return char;
          }
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplayText(scrambled);
      pos += 1 / CYCLES_PER_LETTER;

      if (pos > text.length) {
        clearInterval(intervalRef.current);
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current);
    setDisplayText(text);
  };

  useEffect(() => {
    if (autoStart) {
      scramble();
    }
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <span 
      onMouseEnter={enableOnHover ? scramble : undefined} 
      onMouseLeave={enableOnHover ? stopScramble : undefined}
      className={className}
    >
      {displayText}
    </span>
  );
}
