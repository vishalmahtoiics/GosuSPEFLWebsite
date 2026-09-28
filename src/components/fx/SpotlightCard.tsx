/* SpotlightCard — a radial "flashlight" follows the cursor inside the card,
   plus a border that warms up on hover. Pure pointer + CSS.
   Optimized: caches bounding box on pointerenter to avoid synchronous layout reflows. */
import { useRef, type ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotColor?: string;
}

export default function SpotlightCard({
  children,
  className = "",
  spotColor = "rgba(244, 198, 63, 0.22)",
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const onEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    rectRef.current = e.currentTarget.getBoundingClientRect();
  };

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (!rectRef.current) {
      rectRef.current = el.getBoundingClientRect();
    }
    const r = rectRef.current;
    el.style.setProperty("--sx", `${e.clientX - r.left}px`);
    el.style.setProperty("--sy", `${e.clientY - r.top}px`);
    el.style.setProperty("--spot", spotColor);
  };

  const onLeave = () => {
    rectRef.current = null;
  };

  return (
    <div
      ref={ref}
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`fx-spot ${className}`}
    >
      {children}
    </div>
  );
}
