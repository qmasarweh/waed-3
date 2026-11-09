import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { home, site } from "../content/site";
import { asset } from "../lib/asset";
import { ScrollType } from "./motion/ScrollType";

gsap.registerPlugin(ScrollTrigger);

const HERO_SLIDES = Array.from({ length: 12 }, (_, index) => {
  const n = String(index + 1).padStart(2, "0");
  return `/img/hero-slider/hero-slide-${n}.jpg`;
});

/**
 * Sticky hero with a cinematic cleaning-product photo slider.
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
      if (veil.current) gsap.killTweensOf(veil.current);
    };
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el || !media.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const scrub = fine ? 0.25 : true;
    const copy = content.current;
    const ctx = gsap.context(() => {
      if (veil.current) {
        const phoneVeil = window.matchMedia("(max-width: 759px)").matches;
        if (phoneVeil) {
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
                scrub,
              },
            },
          );
        }
      }

      const phone = window.matchMedia("(max-width: 759px)").matches;
      if (copy && phone) {
        gsap.set(copy, { yPercent: 0, opacity: 1, clearProps: "transform,opacity" });
      } else if (copy) {
        gsap.to(copy, {
          yPercent: fine ? -55 : -30,
          opacity: 0.35,
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
          <p className="hero__place">Bahrain · Al Hidd</p>
          <img
            className="hero__brand"
            src={asset("/img/waed-logo-horizontal-white.svg")}
            alt={site.legalName}
            width={420}
            height={90}
          />
          <ScrollType text={home.headline} as="h1" className="alive-headline" mode="hero" />
          <p className="hero__lead">{home.support}</p>
        </div>

        <div className="hero__scroll" aria-hidden="true" ref={scrollCue}>
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </div>
    </section>
  );
}
