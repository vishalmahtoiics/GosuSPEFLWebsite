/* Magnet — pulls its child gently toward the cursor on hover.
   Optimized with direct GPU transform manipulation and zero global window listeners. */
import { useRef, type ReactNode } from "react";

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
}

export default function Magnet({
  children,
  strength = 3.2,
  className = "",
}: MagnetProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const onPointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
    rectRef.current = e.currentTarget.getBoundingClientRect();
    if (innerRef.current) {
      innerRef.current.style.transition = "transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)";
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
    if (!rectRef.current) {
      rectRef.current = e.currentTarget.getBoundingClientRect();
    }
    const r = rectRef.current;
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;

    const max = 7;
    const clamp = (v: number) => Math.max(-max, Math.min(max, v));
    const tx = clamp(dx / strength);
    const ty = clamp(dy / strength);

    if (innerRef.current) {
      innerRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    }
  };

  const onPointerLeave = () => {
    rectRef.current = null;
    if (innerRef.current) {
      innerRef.current.style.transition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)";
      innerRef.current.style.transform = "translate3d(0, 0, 0)";
    }
  };

  return (
    <div
      className={className}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ display: "inline-flex" }}
    >
      <div
        ref={innerRef}
        style={{
          transform: "translate3d(0, 0, 0)",
          willChange: "transform",
          display: "inline-flex",
        }}
      >
        {children}
      </div>
    </div>
  );
}
