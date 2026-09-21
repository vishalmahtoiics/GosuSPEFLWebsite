/* SpotlightCard — a radial "flashlight" follows the cursor inside the card,
   plus a border that warms up on hover. Pure pointer + CSS. */
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

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${e.clientX - r.left}px`);
    el.style.setProperty("--sy", `${e.clientY - r.top}px`);
    el.style.setProperty("--spot", spotColor);
  };

  return (
    <div ref={ref} onMouseMove={onMove} className={`fx-spot ${className}`}>
      {children}
    </div>
  );
}
