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

const HEADLINE_LINES = [
  "Innovating the Future",
  "of Cleaning",
  "Manufacturing.",
];

const LEAD_LINES = home.support
  .split(/(?<=\.)\s+/)
  .map((line) => line.trim())
  .filter(Boolean);

/**
 * Sticky hero: photo slider + reliable Sliding Text Reveal on every copy line.
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
            gsap.set(outgoing, { opacity: 0, zIndex: 1, scale: 1.08, xPercent: 0, filter: "blur(0px)", clipPath: "inset(0)" });
            gsap.set(incoming, { zIndex: 3, filter: "blur(0px)", clipPath: "inset(0)" });
            active = next;
            locked = false;
            kenBurns = gsap.to(incoming, { scale: 1.12, duration: 6, ease: "none" });
          },
        })
        .to(outgoing, { scale: 1.2, xPercent: fromRight ? -5 : 5, opacity: 0.2, filter: "blur(10px)", duration: 1.35 }, 0)
        .to(incoming, { clipPath: "inset(0 0% 0 0%)", scale: 1.02, xPercent: 0, filter: "blur(0px)", duration: 1.45, ease: "power3.out" }, 0.05)
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
    if (!el || !media.current || !copy) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const phone = window.matchMedia("(max-width: 759px)").matches;
    const lines = Array.from(copy.querySelectorAll<HTMLElement>(".hero__reveal-line"));

    const showLines = () => {
      gsap.set(lines, { yPercent: 0, clearProps: "transform" });
    };

    const reveal = () => {
      if (!lines.length) return null;
      gsap.killTweensOf(lines);
      return gsap.fromTo(
        lines,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          stagger: 0.11,
          ease: "power4.out",
          overwrite: true,
        },
      );
    };

    let loopId = 0;
    const safety = window.setTimeout(showLines, 1800);

    const ctx = gsap.context(() => {
      if (reduce) {
        showLines();
        return;
      }

      // Immediate visible reveal — never leave copy stuck off-screen.
      reveal();

      loopId = window.setInterval(() => {
        gsap
          .timeline({
            onComplete: () => {
              reveal();
            },
          })
          .to(lines, {
            yPercent: -110,
            duration: 0.45,
            stagger: 0.05,
            ease: "power3.in",
          });
      }, 6500);

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
      window.clearTimeout(safety);
      window.clearInterval(loopId);
      showLines();
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
            <div className="hero__line-mask">
              <p className="hero__place hero__reveal-line">Bahrain · Al Hidd</p>
            </div>

            <h1 className="alive-headline">
              {HEADLINE_LINES.map((line) => (
                <span className="hero__line-mask" key={line}>
                  <span className="hero__reveal-line">{line}</span>
                </span>
              ))}
            </h1>

            <div className="hero__lead">
              {LEAD_LINES.map((line) => (
                <span className="hero__line-mask" key={line}>
                  <span className="hero__reveal-line hero__lead-line">{line}</span>
                </span>
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
