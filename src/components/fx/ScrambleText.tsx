/* ScrambleText — decodes text from random glyphs into the final string when it
   scrolls into view, like a game console resolving. Spaces are preserved. */
import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_/[]=+*#";

interface ScrambleTextProps {
  text: string;
  className?: string;
  /** ms between resolve steps */
  speed?: number;
}

export default function ScrambleText({
  text,
  className = "",
  speed = 28,
}: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) {
      setDisplay(text);
      return;
    }

    let timer = 0;
    let started = false;

    const run = () => {
      const queue = text.split("").map((char) => ({
        char,
        start: Math.floor(Math.random() * 12),
        end: Math.floor(Math.random() * 12) + 12,
      }));
      let frame = 0;
      const tick = () => {
        let out = "";
        let done = 0;
        for (const q of queue) {
          if (q.char === " ") {
            out += " ";
            done++;
          } else if (frame >= q.end) {
            out += q.char;
            done++;
          } else if (frame >= q.start) {
            out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }
        setDisplay(out);
        if (done === queue.length) return;
        frame++;
        timer = window.setTimeout(tick, speed);
      };
      tick();
    };

    const io = new IntersectionObserver(
      (entries, obs) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          run();
          obs.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [text, speed]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{display}</span>
    </span>
  );
}
