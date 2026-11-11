import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { asset } from "../lib/asset";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion";
import { MarkRule } from "./MarkRule";

gsap.registerPlugin(ScrollTrigger);

/**
 * Editorial statement band — numbered rows + watermark + parallax depth.
 */
export function Statement({
  eyebrow,
  line,
  tone = "sand",
}: {
  eyebrow?: string;
  line: string;
  tone?: "sand" | "navy";
}) {
  const root = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const lines = line
    .split(/(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  useEffect(() => {
    const el = root.current;
    if (!el || reduced) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const rows = el.querySelectorAll<HTMLElement>(".statement__row");
    const mark = el.querySelector<HTMLElement>(".statement__mark");
    if (!rows.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        rows,
        { y: (i) => 48 + i * 28, opacity: 0.2 },
        {
          y: (i) => -36 - i * 22,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: fine ? 0.4 : 0.2,
          },
        },
      );

      if (mark && fine) {
        gsap.fromTo(
          mark,
          { yPercent: -12, rotate: -6 },
          {
            yPercent: 18,
            rotate: 8,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.7,
            },
          },
        );
      }
    }, el);

    return () => ctx.revert();
  }, [line, reduced]);

  return (
    <section
      ref={root}
      className={`statement statement--${tone} statement--parallax scene scene--cover`}
      aria-label={eyebrow ?? line}
    >
      <div className="statement__mark" aria-hidden="true">
        <img
          src={asset("/img/waed-logo-vertical-white.svg")}
          alt=""
          width={320}
          height={295}
        />
      </div>

      <div className="shell statement__inner">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <MarkRule className={tone === "navy" ? "mark-rule--light" : ""} />

        <ul className="statement__list">
          {lines.map((part, i) => (
            <li className="statement__row" key={part}>
              <span className="statement__index">{String(i + 1).padStart(2, "0")}</span>
              <span className="statement__text">{part.replace(/\.$/, "")}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
