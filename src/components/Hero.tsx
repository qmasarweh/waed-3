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
 * Sticky hero with cinematic photo slider and living typography.
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
    const leadLines = copy.querySelectorAll<HTMLElement>(".hero__lead-line");
    const place = copy.querySelector<HTMLElement>(".hero__place");
    const brand = copy.querySelector<HTMLElement>(".hero__brand");
    const rule = copy.querySelector<HTMLElement>(".hero__place-rule");
    const accent = copy.querySelector<HTMLElement>(".hero__accent");
    const rail = copy.querySelector<HTMLElement>(".hero__lead-rail");

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([place, brand, rule, words, leadLines, headlineLines, accent, rail], {
          clearProps: "all",
          opacity: 1,
          y: 0,
          x: 0,
          filter: "none",
          clipPath: "none",
          scaleX: 1,
        });
        return;
      }

      gsap.set(place, { opacity: 0, y: 16, letterSpacing: "0.42em" });
      gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(brand, { opacity: 0, y: 28, filter: "blur(10px)" });
      gsap.set(headlineLines, { clipPath: "inset(0 0 100% 0)" });
      gsap.set(words, { y: "110%", opacity: 0 });
      gsap.set(accent, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(leadLines, { opacity: 0, x: -24 });
      gsap.set(rail, { scaleY: 0, transformOrigin: "top center" });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .to(place, { opacity: 1, y: 0, letterSpacing: "0.2em", duration: 0.85 }, 0.1)
        .to(rule, { scaleX: 1, duration: 0.9 }, 0.18)
        .to(brand, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.95 }, 0.28)
        .to(headlineLines, { clipPath: "inset(0 0 0% 0)", duration: 0.95, stagger: 0.16 }, 0.42)
        .to(words, { y: "0%", opacity: 1, duration: 0.95, stagger: 0.055 }, 0.48)
        .to(accent, { scaleX: 1, duration: 0.85 }, 1.15)
        .to(rail, { scaleY: 1, duration: 0.8 }, 1.2)
        .to(leadLines, { opacity: 1, x: 0, duration: 0.75, stagger: 0.16 }, 1.22);

      if (!phone) {
        gsap.to(headlineLines, {
          x: 6,
          duration: 4.8,
          ease: "sine.inOut",
          stagger: { each: 0.35, repeat: -1, yoyo: true },
          delay: 2.1,
        });
        gsap.to(accent, {
          opacity: 0.55,
          duration: 2.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 2.2,
        });
      }

      if (veil.current) {
        if (phone) {
          gsap.set(veil.current, { opacity: 1 });
        } else {
          gsap.fromTo(
            veil.current,
            { opacity: 0.55 },
            {
              opacity: 0.85,
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
          yPercent: fine ? -40 : -24,
          opacity: 0.4,
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
          <div className="hero__place-row">
            <span className="hero__place-rule" aria-hidden="true" />
            <p className="hero__place">Bahrain · Al Hidd</p>
          </div>
          <img
            className="hero__brand"
            src={asset("/img/waed-logo-horizontal-white.svg")}
            alt={site.legalName}
            width={420}
            height={90}
          />
          <h1 className="alive-headline" ref={headline}>
            {HEADLINE_LINES.map((line, lineIndex) => (
              <span
                className={`hero__hline${lineIndex === HEADLINE_LINES.length - 1 ? " hero__hline--accent" : ""}`}
                key={line.join("-")}
              >
                {line.map((word) => (
                  <span className="hero__word" key={`${lineIndex}-${word}`}>
                    {word}
                  </span>
                ))}
              </span>
            ))}
            <span className="hero__accent" aria-hidden="true" />
          </h1>
          <div className="hero__lead-wrap">
            <span className="hero__lead-rail" aria-hidden="true" />
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
