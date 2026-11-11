import { useEffect, useRef, type ElementType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "../../lib/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

type Mode = "rise" | "drift" | "hero";

/**
 * Section headlines — whole line appears together (no word-by-word lag).
 */
export function ScrollType({
  text,
  as: Tag = "h2",
  className = "",
  mode = "rise",
}: {
  text: string;
  as?: ElementType;
  className?: string;
  mode?: Mode;
}) {
  const root = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = root.current;
    if (!el || reduced) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const showNow = () => {
      gsap.set(el, { y: 0, opacity: 1, clearProps: "transform" });
    };

    const ctx = gsap.context(() => {
      if (mode === "hero") {
        const phone = window.matchMedia("(max-width: 759px)").matches;
        if (phone) {
          gsap.set(el, { y: 0, opacity: 1, clearProps: "transform" });
          return;
        }

        gsap.fromTo(
          el,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: 0.1,
          },
        );

        if (fine) {
          gsap.to(el, {
            y: -48,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest("section") ?? el,
              start: "top top",
              end: "bottom top",
              scrub: 0.2,
            },
          });
        }
        return;
      }

      gsap.set(el, { y: 24, opacity: 0 });

      ScrollTrigger.create({
        trigger: el.closest("section") ?? el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(el, {
            y: 0,
            opacity: 1,
            duration: 0.45,
            ease: "power2.out",
            overwrite: "auto",
          });
        },
        onRefresh(self) {
          if (self.progress > 0 || ScrollTrigger.isInViewport(el, 0.02)) {
            showNow();
          }
        },
      });

      if (ScrollTrigger.isInViewport(el.closest("section") ?? el, 0.02)) {
        showNow();
      }

      gsap.delayedCall(0.9, () => {
        if (Number(gsap.getProperty(el, "opacity")) < 0.5) showNow();
      });
    }, el);

    return () => ctx.revert();
  }, [text, mode, reduced]);

  return (
    <Tag ref={root} className={`scroll-type ${className}`.trim()}>
      {text}
    </Tag>
  );
}
