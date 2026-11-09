import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { home, site } from "../content/site";
import { asset } from "../lib/asset";

gsap.registerPlugin(ScrollTrigger);

const HERO_SLIDES = Array.from({ length: 12 }, (_, index) => {
  const n = String(index + 1).padStart(2, "0");
  return `/img/hero-slider/hero-slide-${n}.jpg`;
});

const HEADLINE_LINES = [
  ["Innovating", "the", "Future"],
  ["of", "Cleaning"],
  ["Manufacturing."],
] as const;

const LEAD_LINES = home.support
  .split(/(?<=\.)\s+/)
  .map((line) => line.trim())
  .filter(Boolean);

/**
 * Sticky hero with cinematic photo slider and a compact living type block.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const veil = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLDivElement>(null);
  const scrollCue = useRef<HTMLDivElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const stage = slider.current;
    if (!stage) return;

    const slides = Array.from(stage.querySelectorAll<HTMLImageElement>(".hero__slide"));
    if (!slides.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.set(slides, { opacity: 0, scale: 1.1, xPercent: 0, filter: "blur(0px)", clipPath: "inset(0 0 0 0)", zIndex: 1 });
    gsap.set(slides[0], { opacity: 1, scale: 1, zIndex: 3 });

    if (reduce) return;

    let active = 0;
    let kenBurns: gsap.core.Tween | null = gsap.to(slides[0], {
      scale: 1.14,
      duration: 6.2,
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
        scale: 1.22,
        xPercent: fromRight ? 10 : -10,
        filter: "blur(8px)",
        clipPath: fromRight ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
      });
      gsap.set(outgoing, { zIndex: 3 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          gsap.set(outgoing, {
            opacity: 0,
            zIndex: 1,
            scale: 1.1,
            xPercent: 0,
            filter: "blur(0px)",
            clipPath: "inset(0 0 0 0)",
          });
          gsap.set(incoming, { zIndex: 3, filter: "blur(0px)", clipPath: "inset(0 0 0 0)" });
          active = next;
          locked = false;
          kenBurns = gsap.to(incoming, {
            scale: 1.14,
            duration: 6.2,
            ease: "none",
          });
        },
      });

      tl.to(
        outgoing,
        {
          scale: 1.24,
          xPercent: fromRight ? -6 : 6,
          opacity: 0.25,
          filter: "blur(12px)",
          duration: 1.45,
        },
        0,
      );

      tl.to(
        incoming,
        {
          clipPath: "inset(0 0% 0 0%)",
          scale: 1.02,
          xPercent: 0,
          filter: "blur(0px)",
          duration: 1.55,
          ease: "power3.out",
        },
        0.08,
      );

      tl.to(outgoing, { opacity: 0, duration: 0.35 }, 1.15);
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
    if (!el || !media.current || !copy) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const phone = window.matchMedia("(max-width: 759px)").matches;
    const headlineLines = copy.querySelectorAll<HTMLElement>(".hero__hline");
    const words = copy.querySelectorAll<HTMLElement>(".hero__word");
    const chars = copy.querySelectorAll<HTMLElement>(".hero__char");
    const leadLines = copy.querySelectorAll<HTMLElement>(".hero__lead-line");
    const place = copy.querySelector<HTMLElement>(".hero__place");
    const brand = copy.querySelector<HTMLElement>(".hero__brand");
    const rule = copy.querySelector<HTMLElement>(".hero__place-rule");
    const accent = copy.querySelector<HTMLElement>(".hero__accent");
    const panel = copy.querySelector<HTMLElement>(".hero__panel");

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([place, brand, rule, words, chars, leadLines, headlineLines, accent, panel], {
          clearProps: "all",
          opacity: 1,
          y: 0,
          x: 0,
          yPercent: 0,
          filter: "none",
          clipPath: "none",
          scaleX: 1,
          scale: 1,
        });
        return;
      }

      gsap.set(panel, { opacity: 0, y: 28, scale: 0.96 });
      gsap.set(place, { opacity: 0, y: 12 });
      gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(brand, { opacity: 0, y: 16 });
      gsap.set(headlineLines, { overflow: "hidden" });
      gsap.set(words, { yPercent: 110, opacity: 0 });
      gsap.set(chars, { yPercent: 120, opacity: 0 });
      gsap.set(accent, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(leadLines, { opacity: 0, y: 14 });

      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
      intro
        .to(panel, { opacity: 1, y: 0, scale: 1, duration: 0.9 }, 0.05)
        .to(place, { opacity: 1, y: 0, duration: 0.55 }, 0.18)
        .to(rule, { scaleX: 1, duration: 0.7 }, 0.22)
        .to(brand, { opacity: 1, y: 0, duration: 0.7 }, 0.28)
        .to(chars, { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.018 }, 0.36)
        .to(words, { yPercent: 0, opacity: 1, duration: 0.75, stagger: 0.045 }, 0.42)
        .to(accent, { scaleX: 1, duration: 0.7 }, 0.95)
        .to(leadLines, { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 }, 1.0);

      // Living loop — soft float + underline pulse (Awwwards-style after entrance).
      if (!phone) {
        gsap.to(panel, {
          y: -5,
          duration: 3.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.6,
        });
        gsap.to(accent, {
          opacity: 0.45,
          duration: 1.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.7,
        });
        gsap.to(words, {
          y: "-=2",
          duration: 2.8,
          ease: "sine.inOut",
          stagger: { each: 0.08, repeat: -1, yoyo: true },
          delay: 1.8,
        });
      }

      // Cursor parallax on the compact panel.
      if (fine && panel) {
        const onMove = (event: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width - 0.5;
          const py = (event.clientY - rect.top) / rect.height - 0.5;
          gsap.to(panel, {
            x: px * 14,
            y: py * 10 - 2,
            rotateX: py * -4,
            rotateY: px * 5,
            duration: 0.7,
            ease: "power2.out",
            overwrite: "auto",
          });
        };
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", () => {
          gsap.to(panel, { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: 0.9, ease: "power3.out" });
        });
      }

      if (veil.current) {
        if (phone) {
          gsap.set(veil.current, { opacity: 1 });
        } else {
          gsap.fromTo(
            veil.current,
            { opacity: 0.45 },
            {
              opacity: 0.7,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top top",
                end: "bottom top",
                scrub: fine ? 0.25 : true,
              },
            },
          );
        }
      }

      if (phone) {
        gsap.set(copy, { yPercent: 0, opacity: 1, clearProps: "transform,opacity" });
      } else {
        gsap.to(copy, {
          yPercent: fine ? -28 : -16,
          opacity: 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: fine ? 0.2 : true,
          },
        });
      }

      if (mark.current && fine) {
        gsap.to(mark.current, {
          yPercent: 28,
          opacity: 0.2,
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

    return () => ctx.revert();
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
            <img
              src={asset("/img/waed-logo-vertical-white.svg")}
              alt=""
              width={320}
              height={295}
            />
          </div>
        </div>

        <div className="shell hero__content" ref={content}>
          <div className="hero__panel">
            <div className="hero__place-row">
              <span className="hero__place-rule" aria-hidden="true" />
              <p className="hero__place">Bahrain · Al Hidd</p>
            </div>
            <img
              className="hero__brand"
              src={asset("/img/waed-logo-horizontal-navy.svg")}
              alt={site.legalName}
              width={280}
              height={60}
            />
            <h1 className="alive-headline" ref={headline}>
              {HEADLINE_LINES.map((line, lineIndex) => (
                <span
                  className={`hero__hline${lineIndex === HEADLINE_LINES.length - 1 ? " hero__hline--accent" : ""}`}
                  key={line.join("-")}
                >
                  {line.map((word, wordIndex) =>
                    lineIndex === 0 && wordIndex === 0 ? (
                      <span className="hero__word hero__word--chars" key={`${lineIndex}-${word}`}>
                        {word.split("").map((char, charIndex) => (
                          <span className="hero__char" key={`${word}-${charIndex}`}>
                            {char}
                          </span>
                        ))}
                      </span>
                    ) : (
                      <span className="hero__word" key={`${lineIndex}-${word}`}>
                        {word}
                      </span>
                    ),
                  )}
                </span>
              ))}
              <span className="hero__accent" aria-hidden="true" />
            </h1>
            <p className="hero__lead">
              {LEAD_LINES.map((line) => (
                <span className="hero__lead-line" key={line}>
                  {line}
                </span>
              ))}
            </p>
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
