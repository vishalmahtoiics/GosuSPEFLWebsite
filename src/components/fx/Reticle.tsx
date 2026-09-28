/* Reticle — replaces the pointer with an FPS-style crosshair. The center dot
   tracks the cursor exactly; the ring lerps behind it and "locks on"
   (expands + corner brackets) over anything interactive. Fine pointers only.
   Optimized: pauses rAF loop when cursor is idle and uses GPU-accelerated translate3d. */
import { useEffect, useRef } from "react";

const INTERACTIVE =
  'a, button, input, textarea, select, [role="button"], [data-reticle], .c1-btn, .fx-spot, .fx-tilt';

export default function Reticle() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    document.body.classList.add("fx-reticle-on");

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...mouse };
    let visible = false;
    let isRunning = false;
    let raf = 0;

    const tick = () => {
      const dx = mouse.x - ringPos.x;
      const dy = mouse.y - ringPos.y;

      ringPos.x += dx * 0.22;
      ringPos.y += dy * 0.22;

      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;

      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        raf = requestAnimationFrame(tick);
      } else {
        isRunning = false;
      }
    };

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!visible) {
        visible = true;
        ring.style.opacity = "1";
        dot.style.opacity = "1";
      }
      startLoop();
    };

    const onLeave = () => {
      visible = false;
      ring.style.opacity = "0";
      dot.style.opacity = "0";
    };

    const onOver = (e: Event) => {
      const t = e.target as Element;
      if (t && t.closest?.(INTERACTIVE)) ring.classList.add("is-locked");
    };

    const onOut = (e: Event) => {
      const t = e.target as Element;
      if (t && t.closest?.(INTERACTIVE)) {
        const related = (e as MouseEvent).relatedTarget as Element | null;
        if (!related || !related.closest?.(INTERACTIVE)) ring.classList.remove("is-locked");
      }
    };

    const onDown = () => ring.classList.add("is-down");
    const onUp = () => ring.classList.remove("is-down");

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });

    startLoop();

    return () => {
      document.body.classList.remove("fx-reticle-on");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="fx-reticle"
        aria-hidden
        style={{ opacity: 0, willChange: "transform" }}
      >
        <span className="fx-reticle__bracket fx-reticle__bracket--tl" />
        <span className="fx-reticle__bracket fx-reticle__bracket--tr" />
        <span className="fx-reticle__bracket fx-reticle__bracket--bl" />
        <span className="fx-reticle__bracket fx-reticle__bracket--br" />
      </div>
      <div
        ref={dotRef}
        className="fx-reticle__dot"
        aria-hidden
        style={{ opacity: 0, willChange: "transform" }}
      />
    </>
  );
}
