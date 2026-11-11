import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "../../lib/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

type Speed = "slow" | "medium" | "fast";

const DISTANCE: Record<Speed, number> = {
  slow: 36,
  medium: 56,
  fast: 80,
};

/**
 * Romans-style scroll parallax via ScrollTrigger (works with Lenis).
 */
export function Parallax({
  children,
  distance,
  speed = "medium",
  scale = 1.12,
  className = "",
}: {
  children: ReactNode;
  distance?: number;
  speed?: Speed;
  /** Extra scale so edges never show while drifting */
  scale?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const y = distance ?? DISTANCE[speed];

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const travel = fine ? y : y * 0.45;
    const startScale = fine ? scale : Math.min(scale, 1.06);

    gsap.set(node, { yPercent: -travel / 4, scale: startScale, force3D: true });

    const tween = gsap.to(node, {
      yPercent: travel / 4,
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: node.parentElement ?? node,
        start: "top bottom",
        end: "bottom top",
        scrub: fine ? 0.3 : 0.2,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(node, { clearProps: "transform" });
    };
  }, [y, scale, reduced]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={`parallax-layer ${className}`.trim()}>
      {children}
    </div>
  );
}
