import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import { asset } from "../lib/asset";
import {
  HERO_AUTOPLAY,
  HERO_AUTOPLAY_MS,
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

function BrandHeader({ logoOnly = false }: { logoOnly?: boolean }) {
  return (
    <header className={`hero-m__brand${logoOnly ? " hero-m__brand--logo-only" : ""}`}>
      <img
        className="hero-m__brand-logo"
        src={asset("/img/hero-redesign/waed-hero-lockup.png?v=approved2")}
        alt="WAED"
        width={1600}
        height={414}
      />
      {logoOnly ? null : (
        <>
          <p className="hero-m__brand-name">Industrial Innovation Company</p>
          <p className="hero-m__brand-tag">Innovation Made To Perform</p>
        </>
      )}
    </header>
  );
}

function Headline({ slide }: { slide: HeroSlide }) {
  const left = slide.layout === "lab" || slide.layout === "pack";
  return (
    <div
      className={[
        "hero-m__copy",
        left ? "hero-m__copy--left" : "hero-m__copy--center",
        slide.accent ? "hero-m__copy--accent" : "",
        slide.skewSupport ? "hero-m__copy--skew" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {slide.accent && left ? <span className="hero-m__accent" aria-hidden="true" /> : null}
      <h1 className="hero-m__title">
        {slide.title.map((line, lineIndex) => {
          const isLast = lineIndex === slide.title.length - 1;
          // Factory slide: every title line must stay unbroken (no mid-phrase wrap)
          const keep = slide.keepIndex === lineIndex || slide.layout === "factory";
          return (
            <span key={`${line}-${lineIndex}`}>
              <span className={keep ? "hero-m__keep" : undefined}>{line}</span>
              {!isLast ? <br /> : null}
            </span>
          );
        })}
      </h1>
      <p className={`hero-m__support${slide.skewSupport ? " hero-m__support--skew" : ""}`}>
        {slide.support.split("\n").map((line, i, arr) => (
          <span key={`${line}-${i}`}>
            {line}
            {i < arr.length - 1 ? <br /> : null}
          </span>
        ))}
      </p>
    </div>
  );
}

function FeatureBar({ slide }: { slide: HeroSlide }) {
  const grid = slide.featGrid === "grid2";
  const light = slide.featTone === "white";
  return (
    <ul
      className={[
        "hero-m__feats",
        grid ? "hero-m__feats--grid" : "hero-m__feats--row",
        light ? "hero-m__feats--light" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Capabilities"
    >
      {slide.features.map((feature) => (
        <li className="hero-m__feat" key={feature.lines.join("-")}>
          <FeatureIcon name={feature.icon} />
          <span className="hero-m__feat-text">
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

const SWIPE_MIN_PX = 48;

/**
 * Gemini full-bleed photo + text overlay only.
 * Placement (position / size / alignment) from WhatsApp comps.
 * No GSAP slide panels — avoids iPhone visibility:hidden solid-navy failure mode.
 */
export function HeroMobile() {
  const [active, setActive] = useState(0);
  const [autoKey, setAutoKey] = useState(0);
  const slides = HERO_SLIDES;
  const slide = slides[active];
  const photoSrc = asset(slide.mobileSrc.split("?")[0]);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const goTo = useCallback(
    (next: number) => {
      const len = slides.length;
      const wrapped = ((next % len) + len) % len;
      setActive(wrapped);
      setAutoKey((k) => k + 1);
    },
    [slides.length],
  );

  useEffect(() => {
    document.documentElement.classList.add("waed-app-ready");
  }, []);

  // Warm slides 2–4 so autoplay/swipe doesn’t flash navy on slow networks
  useEffect(() => {
    slides.forEach((s, i) => {
      if (i === 0) return;
      const img = new Image();
      img.decoding = "async";
      img.src = asset(s.mobileSrc.split("?")[0]);
    });
  }, [slides]);

  useEffect(() => {
    if (!HERO_AUTOPLAY) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, HERO_AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [slides.length, autoKey]);

  const onTouchStart = (e: TouchEvent) => {
    const t = e.changedTouches[0] ?? e.touches[0];
    if (!t) return;
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    if (!t) return;
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    // Horizontal swipe only — ignore mostly-vertical scrolls
    if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) goTo(active + 1); // swipe left → next
    else goTo(active - 1); // swipe right → previous
  };

  return (
    <section
      className="hero hero--mobile hero--mobile-client"
      id="top"
      aria-label="Hero"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className={[
          "hero-m",
          "hero-m--client",
          "hero-m--gemini",
          `hero-m--${slide.layout}`,
          slide.bakedChrome ? "hero-m--baked" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <img
          key={slide.id}
          className="hero-m__gemini-photo"
          src={photoSrc}
          alt={slide.alt}
          width={1320}
          height={2868}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          draggable={false}
        />
        {!slide.bakedChrome ? (
          <div className="hero-m__overlay">
            {slide.layout === "lab" ? (
              <div className="hero-m__wash-block">
                <BrandHeader logoOnly />
                <Headline slide={slide} />
              </div>
            ) : (
              <>
                <BrandHeader
                  logoOnly={
                    slide.layout === "factory" ||
                    slide.layout === "pack" ||
                    slide.layout === "env"
                  }
                />
                <Headline slide={slide} />
              </>
            )}
            <FeatureBar slide={slide} />
          </div>
        ) : null}
      </div>

      <div className="hero-m__dots" role="tablist" aria-label="Hero slides">
        {slides.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={`hero-m__dot${index === active ? " is-active" : ""}`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === active ? "true" : undefined}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </section>
  );
}
