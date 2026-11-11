import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../../lib/usePrefersReducedMotion";

/** Soft pointer-following wash — desktop / fine-pointer only. */
export function LiveGlow() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const node = ref.current;
    if (!node) return;

    let raf = 0;
    let tx = window.innerWidth * 0.55;
    let ty = window.innerHeight * 0.35;
    let x = tx;
    let y = ty;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      node.style.transform = `translate3d(${x - 220}px, ${y - 220}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div className="live-glow" aria-hidden="true">
      <div ref={ref} className="live-glow__orb" />
    </div>
  );
}
