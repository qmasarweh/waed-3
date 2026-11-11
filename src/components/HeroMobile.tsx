import { useEffect, useRef, useState } from "react";
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

function markAppReady() {
  // Only dismiss the HTML boot once real hero copy is painted and measurable.
  const title = document.querySelector(".hero-m__title") as HTMLElement | null;
  if (!title) return false;
  const rect = title.getBoundingClientRect();
  if (rect.width < 24 || rect.height < 12) return false;
  const style = window.getComputedStyle(title);
  if (style.opacity === "0" || style.visibility === "hidden") return false;
  document.documentElement.classList.add("waed-app-ready");
  return true;
}

/**
 * Phone hero — CSS-only crossfade (no GSAP).
 * GSAP opacity/visibility was leaving a solid navy stage on some iPhones.
 */
export function HeroMobile() {
  const goToRef = useRef<(next: number) => void>(() => {});
  const [active, setActive] = useState(0);
  const [imgReady, setImgReady] = useState(false);

  const slide = HERO_SLIDES[active];
  const stageBg = asset(HERO_SLIDES[active]?.mobileSrc ?? HERO_SLIDES[0].mobileSrc);

  useEffect(() => {
    let tries = 0;
    const tick = () => {
      if (markAppReady()) return;
      tries += 1;
      // Keep boot visible; retry until hero text is real. Hard stop at ~8s.
      if (tries < 40) window.setTimeout(tick, 200);
      else document.documentElement.classList.add("waed-app-ready");
    };
    const start = window.setTimeout(tick, 50);
    return () => window.clearTimeout(start);
  }, []);

  useEffect(() => {
    if (imgReady) markAppReady();
  }, [imgReady, active]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!HERO_AUTOPLAY || reduce) return;

    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % HERO_SLIDES.length);
    }, HERO_AUTOPLAY_MS);

    goToRef.current = (next: number) => {
      if (next < 0 || next >= HERO_SLIDES.length) return;
      setActive(next);
    };

    return () => {
      window.clearInterval(id);
      goToRef.current = () => {};
    };
  }, []);

  useEffect(() => {
    goToRef.current = (next: number) => {
      if (next < 0 || next >= HERO_SLIDES.length) return;
      setActive(next);
    };
  }, []);

  return (
    <section className="hero hero--mobile" id="top" aria-label="Hero">
      <div className="hero-m">
        <div
          className="hero-m__stage"
          aria-hidden="true"
          style={{ backgroundImage: `url("${stageBg}")` }}
        >
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
                fetchPriority={index === 0 ? "high" : "low"}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                onLoad={() => {
                  if (index === 0) setImgReady(true);
                }}
                onError={() => {
                  if (index === 0) setImgReady(true);
                }}
              />
            </div>
          ))}
        </div>

        <div className="hero-m__veil hero-m__veil--top" aria-hidden="true" />
        <div className="hero-m__veil hero-m__veil--bottom" aria-hidden="true" />

        <div className="hero-m__chrome">
          <div className="hero-m__top">
            <img
              className="hero-m__logo"
              src={asset("/img/hero-redesign/waed-hero-lockup.png")}
              alt={active === 0 ? "WAED Industrial Innovation Company" : ""}
              width={288}
              height={103}
              style={{
                opacity: slide.logo === "none" ? 0 : 1,
                visibility: "visible",
              }}
            />
            <div className="hero-m__copy">
              <MobileCopy slide={slide} />
            </div>
          </div>

          <ul className="hero-m__feats" aria-label="Capabilities">
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
