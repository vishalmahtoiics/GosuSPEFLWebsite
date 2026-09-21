/* TiltCard — 3D tilt toward the cursor with a glare sheen and an inner
   spotlight. Combines the "feels 3D" + "cursor is a light" interactions.
   Children can use transform: translateZ(..) for parallax depth. */
import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

const spring = { damping: 26, stiffness: 220, mass: 0.6 };

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  glareColor?: string;
}

export default function TiltCard({
  children,
  className = "",
  amplitude = 10,
  glareColor = "rgba(244,198,63,0.28)",
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  // -0.5..0.5 normalized cursor position over the card
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const hover = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [amplitude, -amplitude]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-amplitude, amplitude]), spring);
  const scale = useSpring(useTransform(hover, [0, 1], [1, 1.025]), spring);
  const glareX = useTransform(px, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(py, [-0.5, 0.5], ["0%", "100%"]);
  const glareOpacity = useSpring(hover, spring);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseEnter={() => hover.set(1)}
      onMouseLeave={() => {
        hover.set(0);
        px.set(0);
        py.set(0);
      }}
      onMouseMove={onMove}
      style={{ perspective: 900 }}
    >
      <motion.div
        className="fx-tilt__inner"
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {children}
        <motion.span
          aria-hidden
          className="fx-tilt__glare"
          style={{
            opacity: glareOpacity,
            background: useTransform(
              [glareX, glareY],
              ([x, y]) =>
                `radial-gradient(circle at ${x} ${y}, ${glareColor}, transparent 55%)`
            ),
          }}
        />
      </motion.div>
    </div>
  );
}
