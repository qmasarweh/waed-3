import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { asset } from "../lib/asset";
import {
  HERO_AUTOPLAY,
  HERO_AUTOPLAY_MS,
  HERO_SLIDES,
  ICONS,
  type HeroSlide,
} from "./hero/heroSlides";

gsap.registerPlugin(ScrollTrigger);

function FeatureIcon({ name }: { name: string }) {
  const paths = ICONS[name] ?? ICONS.layers;
  return (
    <svg className="hero-hs__icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

function SlideCopy({ slide }: { slide: HeroSlide }) {
  return (
    <>
      {slide.accent ? <span className="hero-hs__accent" aria-hidden="true" /> : null}
      <h1 className="hero-hs__title">
        {slide.title.map((line, lineIndex) => {
          const isLast = lineIndex === slide.title.length - 1;
          const keep = slide.keepIndex === lineIndex;
          return (
            <span key={line} className={keep ? "hero-hs__keep" : undefined}>
              {line}
              {!isLast ? <br /> : null}
            </span>
          );
        })}
      </h1>
      <p className={`hero-hs__support${slide.skewSupport ? " hero-hs__support--skew" : ""}`}>
        {slide.support}
      </p>
    </>
  );
}

function FeatureBar({ slide, label }: { slide: HeroSlide; label?: string }) {
  return (
    <ul className="hero-hs__bar" aria-label={label ?? "Capabilities"}>
      {slide.features.map((feature) => (
        <li className="hero-hs__feat" key={feature.lines.join("-")}>
          <FeatureIcon name={feature.icon} />
          <span>
            {feature.lines.map((line, i) => (
              <span key={line}>
                {line}
                {i < feature.lines.length - 1 ? <br /> : null}
              </span>
            ))}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Desktop / laptop hero (16:9 composition). Unchanged from the current live design.
 */
export function HeroDesktop() {
  const root = useRef<HTMLElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  const scrollCue = useRef<HTMLDivElement>(null);
  const sharedRoot = useRef<HTMLDivElement>(null);
  const sharedText = useRef<HTMLDivElement>(null);
  const sharedBar = useRef<HTMLDivElement>(null);
  const goToRef = useRef<(next: number) => void>(() => {});
  const [active, setActive] = useState(0);

  const sharedSlide = HERO_SLIDES[Math.max(active, 1)];
  const showShared = active >= 1;

  useEffect(() => {
    const stage = slider.current;
    const shared = sharedRoot.current;
    const textEl = sharedText.current;
    const barEl = sharedBar.current;
    if (!stage || !shared || !textEl || !barEl) return;

    const slides = Array.from(stage.querySelectorAll<HTMLElement>(".hero-hs__slide"));
    if (!slides.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const mediaOf = (slide: HTMLElement) =>
      slide.querySelectorAll<HTMLElement>(".hero-hs__bg, .hero-hs__blue");
    const slide1Copy = () =>
      slides[0].querySelectorAll<HTMLElement>(".hero-hs__text, .hero-hs__logo, .hero-hs__bar");

    gsap.set(slides, { autoAlpha: 0, zIndex: 1 });
    gsap.set(slides[0], { autoAlpha: 1, zIndex: 3 });
    gsap.set(shared, { autoAlpha: 0 });
    gsap.set([textEl, barEl], { opacity: 1, y: 0 });
    gsap.set(slide1Copy(), { opacity: 1, y: 0 });

    let index = 0;
    let locked = false;

    const goTo = (next: number) => {
      if (locked || next === index || next < 0 || next >= slides.length) return;
      locked = true;
      const prev = index;
      const outgoing = slides[prev];
      const incoming = slides[next];
      const outMedia = mediaOf(outgoing);
      const inMedia = mediaOf(incoming);
      const fromShared = prev >= 1;
      const toShared = next >= 1;
      const sharedToShared = fromShared && toShared;

      if (reduce) {
        gsap.set(outgoing, { autoAlpha: 0, zIndex: 1 });
        gsap.set(incoming, { autoAlpha: 1, zIndex: 3 });
        gsap.set(shared, { autoAlpha: toShared ? 1 : 0 });
        gsap.set(slide1Copy(), { opacity: next === 0 ? 1 : 0, y: 0 });
        index = next;
        setActive(next);
        locked = false;
        return;
      }

      gsap.set(incoming, { autoAlpha: 1, zIndex: 4 });
      gsap.set(outgoing, { zIndex: 3 });
      gsap.set(inMedia, { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          gsap.set(outgoing, { autoAlpha: 0, zIndex: 1 });
          gsap.set(outMedia, { opacity: 1 });
          gsap.set(incoming, { zIndex: 3 });
          gsap.set(inMedia, { opacity: 1 });
          gsap.set([textEl, barEl], { opacity: 1, y: 0 });
          if (next === 0) gsap.set(slide1Copy(), { opacity: 1, y: 0 });
          index = next;
          locked = false;
        },
      });

      tl.to(outMedia, { opacity: 0, duration: 1.05, ease: "power2.inOut" }, 0.1);
      tl.to(inMedia, { opacity: 1, duration: 1.1, ease: "power2.inOut" }, 0.16);

      if (sharedToShared) {
        tl.to(textEl, { opacity: 0, y: -16, duration: 0.35, ease: "power2.in" }, 0);
        tl.to(barEl, { opacity: 0, y: 12, duration: 0.35, ease: "power2.in" }, 0);
        tl.add(() => {
          flushSync(() => setActive(next));
          gsap.set([textEl, barEl], { y: 22 });
        }, 0.36);
        tl.to(textEl, { opacity: 1, y: 0, duration: 0.5 }, 0.42);
        tl.to(barEl, { opacity: 1, y: 0, duration: 0.5 }, 0.5);
        return;
      }

      if (fromShared) {
        tl.to(textEl, { opacity: 0, y: -16, duration: 0.35, ease: "power2.in" }, 0);
        tl.to(barEl, { opacity: 0, y: 12, duration: 0.35, ease: "power2.in" }, 0);
        tl.to(shared, { autoAlpha: 0, duration: 0.25 }, 0.3);
      } else {
        tl.to(slide1Copy(), { opacity: 0, y: -16, duration: 0.4, ease: "power2.in" }, 0);
      }

      tl.add(() => {
        flushSync(() => setActive(next));
      }, 0.4);

      if (toShared) {
        tl.set(shared, { autoAlpha: 1 }, 0.42);
        tl.fromTo(textEl, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.5 }, 0.45);
        tl.fromTo(barEl, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5 }, 0.52);
      } else {
        tl.fromTo(
          slide1Copy(),
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.45,
        );
      }
    };

    goToRef.current = goTo;

    const autoId = HERO_AUTOPLAY
      ? window.setInterval(() => goTo((index + 1) % slides.length), HERO_AUTOPLAY_MS)
      : 0;

    return () => {
      if (autoId) window.clearInterval(autoId);
      goToRef.current = () => {};
      gsap.killTweensOf([slides, shared, textEl, barEl, slide1Copy()]);
    };
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el || !scrollCue.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
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
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero hero--hs hero--desktop" id="top" ref={root} aria-label="Hero">
      <div className="hero__sticky">
        <div className="hero-hs" ref={slider}>
          {HERO_SLIDES.map((slide, index) => {
            const isFirst = index === 0;
            return (
              <article
                key={slide.id}
                className={`hero-hs__slide hero-hs__slide--${slide.id}${index === active ? " is-active" : ""}`}
                aria-hidden={index !== active}
              >
                <div className="hero-hs__bg" aria-hidden="true">
                  <img
                    src={asset(slide.src)}
                    alt=""
                    width={1280}
                    height={720}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    loading="eager"
                    decoding="async"
                  />
                </div>
                <div className="hero-hs__blue" aria-hidden="true" />

                {isFirst && slide.logo !== "none" && (
                  <img
                    className={`hero-hs__logo hero-hs__logo--${slide.logo}`}
                    src={asset("/img/hero-redesign/waed-hero-lockup.png")}
                    alt={active === 0 ? "WAED Industrial Innovation Company" : ""}
                    width={560}
                    height={176}
                  />
                )}

                {isFirst && (
                  <>
                    <div className="hero-hs__text">
                      <SlideCopy slide={slide} />
                    </div>
                    <FeatureBar slide={slide} />
                  </>
                )}
              </article>
            );
          })}

          <div
            className={`hero-hs__shared${showShared ? " is-on" : ""}${active >= 2 ? ` hero-hs__shared--${active + 1}` : ""}`}
            ref={sharedRoot}
            aria-hidden={!showShared}
          >
            <div className="hero-hs__text hero-hs__text--shared" ref={sharedText}>
              <SlideCopy slide={sharedSlide} />
            </div>
            <div className="hero-hs__bar-wrap" ref={sharedBar}>
              <FeatureBar slide={sharedSlide} label={showShared ? "Capabilities" : undefined} />
            </div>
          </div>
        </div>

        <div className="hero__dots" role="tablist" aria-label="Hero slides">
          {HERO_SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={`hero__dot${index === active ? " is-active" : ""}`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => goToRef.current(index)}
            />
          ))}
        </div>

        <div className="hero__scroll" aria-hidden="true" ref={scrollCue}>
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </div>
    </section>
  );
}
