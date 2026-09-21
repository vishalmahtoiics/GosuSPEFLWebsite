/* Magnet — pulls its child toward the cursor while the cursor is within a
   padding zone around it. Great on buttons. */
import { useState, useRef, useEffect, type ReactNode } from "react";

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
}

export default function Magnet({
  children,
  padding = 70,
  strength = 3.2,
  className = "",
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const { left, top, width, height } = el.getBoundingClientRect();
      const cx = left + width / 2;
      const cy = top + height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      if (Math.abs(dx) < width / 2 + padding && Math.abs(dy) < height / 2 + padding) {
        // keep the pull gentle: cap the offset so it reads as a subtle nudge
        const max = 7;
        const clamp = (v: number) => Math.max(-max, Math.min(max, v));
        setActive(true);
        setPos({ x: clamp(dx / strength), y: clamp(dy / strength) });
      } else if (active) {
        setActive(false);
        setPos({ x: 0, y: 0 });
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [padding, strength, active]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ display: "inline-flex" }}
    >
      <div
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
          transition: `transform ${active ? 0.12 : 0.45}s cubic-bezier(0.16,1,0.3,1)`,
          willChange: "transform",
          display: "inline-flex",
        }}
      >
        {children}
      </div>
    </div>
  );
}
