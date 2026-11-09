import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { home } from "../content/site";
import { asset } from "../lib/asset";

gsap.registerPlugin(ScrollTrigger);

const HERO_SLIDES = Array.from({ length: 12 }, (_, index) => {
  const n = String(index + 1).padStart(2, "0");
  return `/img/hero-slider/hero-slide-${n}.jpg`;
});

const PLACE_WORDS = ["Bahrain", "·", "Al", "Hidd"];
const HEADLINE_LINES = [
  ["Innovating", "the", "Future"],
  ["of", "Cleaning"],
  ["Manufacturing."],
] as const;
const LEAD_LINES = home.support
  .split(/(?<=\.)\s+/)
  .map((line) => line.trim())
  .filter(Boolean)
  .map((line) => line.split(/\s+/));

type MotionDir = "up" | "down" | "left" | "right";

const DIRS: MotionDir[] = ["up", "up", "right", "up", "left", "up", "down", "up", "right", "up"];

function offsetFor(dir: MotionDir, phone: boolean) {
  const d = phone ? 36 : 56;
  switch (dir) {
    case "up":
      return { x: 0, y: d };
    case "down":
      return { x: 0, y: -d };
    case "left":
      return { x: d, y: 0 };
    case "right":
      return { x: -d, y: 0 };
  }
}

/**
 * Sticky hero: photo slider + kinetic typography (AE-style word pop).
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const veil = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLDivElement>(null);
  const scrollCue = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = slider.current;
    if (!stage) return;

    const slides = Array.from(stage.querySelectorAll<HTMLImageElement>(".hero__slide"));
    if (!slides.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.set(slides, { opacity: 0, scale: 1.08, zIndex: 1 });
    gsap.set(slides[0], { opacity: 1, scale: 1, zIndex: 3 });
    if (reduce) return;

    let active = 0;
    let kenBurns: gsap.core.Tween | null = gsap.to(slides[0], {
      scale: 1.12,
      duration: 6,
      ease: "none",
    });
    let locked = false;

    const goNext = () => {
      if (locked) return;
      locked = true;
      const prev = active;
      const next = (active + 1) % slides.length;
      const outgoing = slides[prev];
      const incoming = slides[next];
      const fromRight = next % 2 === 0;

      kenBurns?.kill();
      gsap.set(incoming, {
        opacity: 1,
        zIndex: 4,
        scale: 1.18,
        xPercent: fromRight ? 8 : -8,
        filter: "blur(6px)",
        clipPath: fromRight ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
      });
      gsap.set(outgoing, { zIndex: 3 });

      gsap
        .timeline({
          defaults: { ease: "power3.inOut" },
          onComplete: () => {
            gsap.set(outgoing, {
              opacity: 0,
              zIndex: 1,
              scale: 1.08,
              xPercent: 0,
              filter: "blur(0px)",
              clipPath: "inset(0)",
            });
            gsap.set(incoming, { zIndex: 3, filter: "blur(0px)", clipPath: "inset(0)" });
            active = next;
            locked = false;
            kenBurns = gsap.to(incoming, { scale: 1.12, duration: 6, ease: "none" });
          },
        })
        .to(
          outgoing,
          {
            scale: 1.2,
            xPercent: fromRight ? -5 : 5,
            opacity: 0.2,
            filter: "blur(10px)",
            duration: 1.35,
          },
          0,
        )
        .to(
          incoming,
          {
            clipPath: "inset(0 0% 0 0%)",
            scale: 1.02,
            xPercent: 0,
            filter: "blur(0px)",
            duration: 1.45,
            ease: "power3.out",
          },
          0.05,
        )
        .to(outgoing, { opacity: 0, duration: 0.3 }, 1.05);
    };

    const id = window.setInterval(goNext, 5600);
    return () => {
      window.clearInterval(id);
      kenBurns?.kill();
      gsap.killTweensOf(slides);
    };
  }, []);

  useEffect(() => {
    const el = root.current;
    const copy = content.current;
    if (!el || !copy) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const phone = window.matchMedia("(max-width: 759px)").matches;
    const panel = copy.querySelector<HTMLElement>(".hero__panel");
    const words = Array.from(copy.querySelectorAll<HTMLElement>(".hero__word"));

    if (!panel || !words.length) return;

    let loopId = 0;
    let master: gsap.core.Timeline | null = null;

    const playKinetic = () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      words.forEach((word, index) => {
        const dir = DIRS[index % DIRS.length];
        const from = offsetFor(dir, phone);
        gsap.set(word, {
          opacity: 0,
          x: from.x,
          y: from.y,
          filter: "blur(6px)",
          force3D: true,
        });

        tl.to(
          word,
          {
            opacity: 1,
            x: 0,
            y: 0,
            filter: "blur(0px)",
            duration: 0.55,
            ease: "power4.out",
          },
          0.08 + index * 0.07,
        );
      });

      // Secondary camera motion on the whole block (AE null object).
      tl.fromTo(
        panel,
        { scale: 1.08, y: phone ? 8 : 14 },
        {
          scale: 1,
          y: 0,
          duration: 1.15,
          ease: "power2.out",
        },
        0.12,
      );

      tl.to(
        panel,
        {
          y: phone ? -3 : -6,
          duration: 2.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: 1,
        },
        ">-0.2",
      );

      return tl;
    };

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([panel, ...words], { clearProps: "all", opacity: 1 });
      } else {
        master = playKinetic();

        loopId = window.setInterval(() => {
          master?.kill();
          const exit = gsap.timeline({
            onComplete: () => {
              master = playKinetic();
            },
          });
          words.forEach((word, index) => {
            const dir = DIRS[(index + 3) % DIRS.length];
            const to = offsetFor(dir, phone);
            exit.to(
              word,
              {
                opacity: 0,
                x: to.x * 0.55,
                y: to.y * 0.55,
                filter: "blur(4px)",
                duration: 0.32,
                ease: "power2.in",
              },
              index * 0.035,
            );
          });
          exit.to(panel, { scale: 0.97, duration: 0.35, ease: "power2.in" }, 0);
        }, 6200);
      }

      if (veil.current) {
        gsap.set(veil.current, { opacity: phone ? 1 : 0.55 });
        if (!phone) {
          gsap.to(veil.current, {
            opacity: 0.8,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: "bottom top",
              scrub: fine ? 0.25 : true,
            },
          });
        }
      }

      if (!phone && fine && mark.current) {
        gsap.to(mark.current, {
          yPercent: 24,
          opacity: 0.18,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: 0.3,
          },
        });
      }

      if (scrollCue.current) {
        gsap.to(scrollCue.current, {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "15% top",
            scrub: true,
          },
        });
      }
    }, el);

    return () => {
      if (loopId) window.clearInterval(loopId);
      master?.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section className="hero" id="top" ref={root} aria-label="Hero">
      <div className="hero__sticky">
        <div className="hero__stage" aria-hidden="true">
          <div className="hero__media" ref={media}>
            <div className="hero__slider" ref={slider}>
              {HERO_SLIDES.map((src, index) => (
                <img
                  key={src}
                  className={`hero__slide${index === 0 ? " is-active" : ""}`}
                  src={asset(src)}
                  alt=""
                  width={1920}
                  height={1080}
                  fetchPriority={index === 0 ? "high" : "low"}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              ))}
            </div>
            <div className="hero__veil" ref={veil} />
          </div>
          <div className="hero__watermark" ref={mark}>
            <img src={asset("/img/waed-logo-vertical-white.svg")} alt="" width={320} height={295} />
          </div>
        </div>

        <div className="shell hero__content" ref={content}>
          <div className="hero__panel">
            <p className="hero__line hero__line--place">
              {PLACE_WORDS.map((word, index) => (
                <span className="hero__word" key={`place-${word}-${index}`}>
                  {word}
                  {index < PLACE_WORDS.length - 1 ? "\u00A0" : ""}
                </span>
              ))}
            </p>

            <h1 className="alive-headline">
              {HEADLINE_LINES.map((line) => (
                <span className="hero__line" key={line.join("-")}>
                  {line.map((word, wordIndex) => (
                    <span className="hero__word" key={`${line.join("-")}-${word}`}>
                      {word}
                      {wordIndex < line.length - 1 ? "\u00A0" : ""}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            <div className="hero__lead">
              {LEAD_LINES.map((line, lineIndex) => (
                <p className="hero__line" key={`lead-${lineIndex}`}>
                  {line.map((word, wordIndex) => (
                    <span className="hero__word" key={`lead-${lineIndex}-${word}`}>
                      {word}
                      {wordIndex < line.length - 1 ? "\u00A0" : ""}
                    </span>
                  ))}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="hero__scroll" aria-hidden="true" ref={scrollCue}>
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </div>
    </section>
  );
}
