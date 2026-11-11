import { useEffect, useState } from "react";
import { asset } from "../lib/asset";
import { HERO_SLIDES, ICONS, type HeroSlide } from "./hero/heroSlides";

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
 * Phone hero foreground fix:
 * - ONE slide <img> at a time (no opacity/display stack — that blanked on her iPhone)
 * - Chrome has no will-change / backdrop-filter
 * - Section photo bg stays as safety net
 */
export function HeroMobile() {
  const [active, setActive] = useState(0);
  const slide = HERO_SLIDES[active];
  const photo = asset(slide.mobileSrc);

  useEffect(() => {
    document.documentElement.classList.add("waed-app-ready");
  }, []);

  return (
    <section
      className="hero hero--mobile"
      id="top"
      aria-label="Hero"
      style={{
        backgroundImage: `url("${photo}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "transparent",
      }}
    >
      <div className="hero-m">
        {/* Single photo layer — remount on slide change, no hidden panels */}
        <div className="hero-m__stage" aria-hidden="true">
          <img
            key={slide.id}
            className="hero-m__photo"
            src={photo}
            alt=""
            width={1080}
            height={1920}
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
        </div>

        <div className="hero-m__veil hero-m__veil--top" aria-hidden="true" />
        <div className="hero-m__veil hero-m__veil--bottom" aria-hidden="true" />

        <div className="hero-m__chrome">
          <div className="hero-m__top">
            {slide.logo !== "none" ? (
              <img
                className="hero-m__logo"
                src={asset("/img/hero-redesign/waed-hero-lockup.png")}
                alt={active === 0 ? "WAED Industrial Innovation Company" : ""}
                width={288}
                height={103}
              />
            ) : null}
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
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
