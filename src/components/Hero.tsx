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
 * Sticky hero with cinematic photo slider + Jitter-style Sliding Text Reveal.
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

    const masks = copy.querySelectorAll<HTMLElement>(".hero__mask");
    const slidesUp = copy.querySelectorAll<HTMLElement>(".hero__slide-up");
    const panel = copy.querySelector<HTMLElement>(".hero__panel");

    const playReveal = () => {
      gsap.killTweensOf([panel, ...masks, ...slidesUp]);
      gsap.set(panel, { opacity: 1, y: 0, scale: 1 });
      gsap.set(slidesUp, { yPercent: 110 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(slidesUp, {
        yPercent: 0,
        duration: 0.95,
        stagger: 0.08,
      });
      return tl;
    };

    let loop = 0;

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([panel, ...slidesUp], { clearProps: "all", opacity: 1, yPercent: 0, y: 0 });
        return;
      }

      playReveal();

      // Loop the sliding reveal so it keeps the Jitter template feel.
      loop = window.setInterval(() => {
        const out = gsap.timeline();
        out.to(slidesUp, {
          yPercent: -110,
          duration: 0.55,
          stagger: 0.05,
          ease: "power2.in",
        });
        out.add(() => {
          playReveal();
        });
      }, 7000);

      if (veil.current) {
        if (phone) {
          gsap.set(veil.current, { opacity: 1 });
        } else {
          gsap.fromTo(
            veil.current,
            { opacity: 0.45 },
            {
              opacity: 0.75,
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
          yPercent: fine ? -22 : -12,
          opacity: 0.7,
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

    return () => {
      window.clearInterval(loop);
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
            <div className="hero__mask">
              <p className="hero__place hero__slide-up">Bahrain · Al Hidd</p>
            </div>
            <div className="hero__mask">
              <img
                className="hero__brand hero__slide-up"
                src={asset("/img/waed-logo-horizontal-navy.svg")}
                alt={site.legalName}
                width={420}
                height={90}
              />
            </div>
            <h1 className="alive-headline">
              {HEADLINE_LINES.map((line) => (
                <span className="hero__mask" key={line.join("-")}>
                  <span className="hero__hline hero__slide-up">
                    {line.map((word) => (
                      <span className="hero__word" key={word}>
                        {word}
                      </span>
                    ))}
                  </span>
                </span>
              ))}
            </h1>
            <div className="hero__lead">
              {LEAD_LINES.map((line) => (
                <span className="hero__mask" key={line}>
                  <span className="hero__lead-line hero__slide-up">{line}</span>
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
