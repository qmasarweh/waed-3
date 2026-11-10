import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { asset } from "../lib/asset";
import {
  HERO_AUTOPLAY,
  HERO_SLIDES,
  ICONS,
  type HeroSlide,
} from "./hero/heroSlides";

function FeatureIcon({ name }: { name: string }) {
  const paths = ICONS[name] ?? ICONS.layers;
  return (
    <svg className="hero-m__icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

function MobileCopy({ slide }: { slide: HeroSlide }) {
  return (
    <>
      {slide.accent ? <span className="hero-m__accent" aria-hidden="true" /> : null}
      <h1 className="hero-m__title">
        {slide.title.map((line, lineIndex) => {
          const isLast = lineIndex === slide.title.length - 1;
          const keep = slide.keepIndex === lineIndex;
          return (
            <span key={line} className={keep ? "hero-m__keep" : undefined}>
              {line}
              {!isLast ? <br /> : null}
            </span>
          );
        })}
      </h1>
      <p className={`hero-m__support${slide.skewSupport ? " hero-m__support--skew" : ""}`}>
        {slide.support}
      </p>
    </>
  );
}

/**
 * Phone hero: full-bleed 9:16 photo with overlay copy + 2×2 features.
 * No letterbox bands — photo owns the viewport; UI sits on soft washes.
 */
export function HeroMobile() {
  const root = useRef<HTMLElement>(null);
  const mediaStage = useRef<HTMLDivElement>(null);
  const copyEl = useRef<HTMLDivElement>(null);
  const featsEl = useRef<HTMLUListElement>(null);
  const logoEl = useRef<HTMLImageElement>(null);
  const goToRef = useRef<(next: number) => void>(() => {});
  const [active, setActive] = useState(0);

  const slide = HERO_SLIDES[active];

  useEffect(() => {
    const stage = mediaStage.current;
    const copy = copyEl.current;
    const feats = featsEl.current;
    if (!stage || !copy || !feats) return;

    const panels = Array.from(stage.querySelectorAll<HTMLElement>(".hero-m__media"));
    if (!panels.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.set(panels, { autoAlpha: 0, zIndex: 1 });
    gsap.set(panels[0], { autoAlpha: 1, zIndex: 3 });
    gsap.set([copy, feats], { opacity: 1, y: 0 });
    if (logoEl.current) gsap.set(logoEl.current, { autoAlpha: 1 });

    let index = 0;
    let locked = false;

    const goTo = (next: number) => {
      if (locked || next === index || next < 0 || next >= panels.length) return;
      locked = true;
      const prev = index;
      const outgoing = panels[prev];
      const incoming = panels[next];
      const showLogoNext = HERO_SLIDES[next].logo !== "none";
      const showLogoPrev = HERO_SLIDES[prev].logo !== "none";

      if (reduce) {
        gsap.set(outgoing, { autoAlpha: 0, zIndex: 1 });
        gsap.set(incoming, { autoAlpha: 1, zIndex: 3 });
        if (logoEl.current) gsap.set(logoEl.current, { autoAlpha: showLogoNext ? 1 : 0 });
        index = next;
        setActive(next);
        locked = false;
        return;
      }

      gsap.set(incoming, { autoAlpha: 1, zIndex: 4 });
      gsap.set(outgoing, { zIndex: 3 });
      gsap.set(incoming, { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          gsap.set(outgoing, { autoAlpha: 0, zIndex: 1, opacity: 1 });
          gsap.set(incoming, { zIndex: 3, opacity: 1 });
          gsap.set([copy, feats], { opacity: 1, y: 0 });
          index = next;
          locked = false;
        },
      });

      tl.to(copy, { opacity: 0, y: -12, duration: 0.32, ease: "power2.in" }, 0);
      tl.to(feats, { opacity: 0, y: 10, duration: 0.32, ease: "power2.in" }, 0);
      if (logoEl.current && showLogoPrev && !showLogoNext) {
        tl.to(logoEl.current, { autoAlpha: 0, duration: 0.25 }, 0);
      }

      tl.to(outgoing, { opacity: 0, duration: 0.75, ease: "power2.inOut" }, 0.08);
      tl.to(incoming, { opacity: 1, duration: 0.8, ease: "power2.inOut" }, 0.12);

      tl.add(() => {
        flushSync(() => setActive(next));
        gsap.set([copy, feats], { y: 16 });
        if (logoEl.current && showLogoNext) gsap.set(logoEl.current, { autoAlpha: 0 });
      }, 0.34);

      if (logoEl.current && showLogoNext) {
        tl.to(logoEl.current, { autoAlpha: 1, duration: 0.4 }, 0.4);
      }
      tl.to(copy, { opacity: 1, y: 0, duration: 0.48 }, 0.42);
      tl.to(feats, { opacity: 1, y: 0, duration: 0.48 }, 0.48);
    };

    goToRef.current = goTo;

    const autoId = HERO_AUTOPLAY
      ? window.setInterval(() => goTo((index + 1) % panels.length), 4000)
      : 0;

    return () => {
      if (autoId) window.clearInterval(autoId);
      goToRef.current = () => {};
      gsap.killTweensOf([panels, copy, feats, logoEl.current].filter(Boolean));
    };
  }, []);

  return (
    <section className="hero hero--mobile" id="top" ref={root} aria-label="Hero">
      <div className="hero-m">
        <div className="hero-m__stage" ref={mediaStage} aria-hidden="true">
          {HERO_SLIDES.map((item, index) => (
            <div
              key={item.id}
              className={`hero-m__media${index === active ? " is-active" : ""}`}
            >
              <img
                src={asset(item.mobileSrc)}
                alt=""
                width={1080}
                height={1920}
                fetchPriority={index === 0 ? "high" : "auto"}
                loading="eager"
                decoding="async"
              />
            </div>
          ))}
        </div>

        <div className="hero-m__veil hero-m__veil--top" aria-hidden="true" />
        <div className="hero-m__veil hero-m__veil--bottom" aria-hidden="true" />

        <div className="hero-m__chrome">
          <div className="hero-m__top">
            <img
              ref={logoEl}
              className="hero-m__logo"
              src={asset("/img/hero-redesign/waed-hero-lockup.png")}
              alt={active === 0 ? "WAED Industrial Innovation Company" : ""}
              width={288}
              height={103}
            />
            <div className="hero-m__copy" ref={copyEl}>
              <MobileCopy slide={slide} />
            </div>
          </div>

          <ul className="hero-m__feats" ref={featsEl} aria-label="Capabilities">
            {slide.features.map((feature) => (
              <li className="hero-m__feat" key={feature.lines.join("-")}>
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
        </div>

        <div className="hero-m__dots" role="tablist" aria-label="Hero slides">
          {HERO_SLIDES.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`hero-m__dot${index === active ? " is-active" : ""}`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => goToRef.current(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
