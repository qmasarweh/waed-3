import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { asset } from "../lib/asset";

gsap.registerPlugin(ScrollTrigger);

/** Manufacturer / factory photos */
const HERO_SLIDES = [
  {
    src: "/img/hero-redesign/slide-01.jpg",
    alt: "WAED stainless steel mixing tanks and production floor",
  },
  {
    src: "/img/hero-redesign/slide-02.jpg",
    alt: "Clean production floor with packaging lines",
  },
  {
    src: "/img/hero-redesign/slide-03.jpg",
    alt: "High-tech filling and packaging equipment",
  },
  {
    src: "/img/hero-redesign/slide-04.jpg",
    alt: "WAED manufacturing facility production line",
  },
] as const;

const FEATURES = [
  {
    label: ["Modern", "Manufacturing Facility"],
    icon: "factory",
  },
  {
    label: ["Quality &", "Consistency"],
    icon: "flask",
  },
  {
    label: ["Private-Label", "Manufacturing"],
    icon: "gears",
  },
  {
    label: ["Regional &", "International Supply"],
    icon: "globe",
  },
] as const;

function FeatureIcon({ name }: { name: (typeof FEATURES)[number]["icon"] }) {
  if (name === "factory") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path
          d="M6 38V22l8-4v4l8-4v4l8-4v20H6Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M10 18V10h4v6M30 38V14h12v24" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M34 20h4M34 26h4M34 32h4" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }
  if (name === "flask") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path
          d="M20 8h8v10l8 16a8 8 0 0 1-7 12H19a8 8 0 0 1-7-12l8-16V8Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M18 8h12" stroke="currentColor" strokeWidth="2" />
        <path d="M14.5 30h19" stroke="#5eb8e8" strokeWidth="8" strokeLinecap="round" opacity="0.85" />
      </svg>
    );
  }
  if (name === "gears") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="22" cy="24" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="22" cy="24" r="3" fill="#5eb8e8" />
        <path
          d="M22 12v3M22 33v3M12 24h3M29 24h3M14.5 16.5l2.1 2.1M27.4 29.4l2.1 2.1M14.5 31.5l2.1-2.1M27.4 18.6l2.1-2.1"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="34" cy="34" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="34" cy="34" r="2" fill="#5eb8e8" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="12" fill="#5eb8e8" opacity="0.35" />
      <circle cx="24" cy="24" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="24" cy="24" rx="5" ry="12" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 24h24M13 18h22M13 30h22" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

/**
 * Hero: manufacturer photos + branding text pushed up with a blue upper shade.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  const scrollCue = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const stage = slider.current;
    if (!stage) return;

    const slides = Array.from(stage.querySelectorAll<HTMLElement>(".hero__slide"));
    if (!slides.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 900px)").matches;
    const useZoom = !reduce && !mobile;

    gsap.set(slides, { opacity: 0, scale: 1, zIndex: 1, x: 0, y: 0 });
    gsap.set(slides[0], { opacity: 1, scale: 1, zIndex: 3 });

    if (reduce) return;

    let index = 0;
    let kenBurns: gsap.core.Tween | null = useZoom
      ? gsap.to(slides[0], { scale: 1.045, duration: 7, ease: "none" })
      : null;
    let locked = false;

    const goNext = () => {
      if (locked) return;
      locked = true;
      const prev = index;
      const next = (index + 1) % slides.length;
      const outgoing = slides[prev];
      const incoming = slides[next];

      kenBurns?.kill();
      gsap.set(incoming, {
        opacity: 0,
        zIndex: 4,
        scale: useZoom ? 1.03 : 1,
        x: 0,
        y: 0,
      });
      gsap.set(outgoing, { zIndex: 3 });

      gsap
        .timeline({
          defaults: { ease: "power2.inOut" },
          onComplete: () => {
            gsap.set(outgoing, { opacity: 0, zIndex: 1, scale: 1 });
            gsap.set(incoming, { zIndex: 3, scale: 1, x: 0, y: 0 });
            index = next;
            setActive(next);
            locked = false;
            kenBurns = useZoom
              ? gsap.to(incoming, { scale: 1.045, duration: 7, ease: "none" })
              : null;
          },
        })
        .to(
          outgoing,
          { opacity: 0, scale: useZoom ? 1.05 : 1, duration: mobile ? 0.9 : 1.2 },
          0,
        )
        .to(
          incoming,
          { opacity: 1, scale: 1, duration: mobile ? 0.95 : 1.25 },
          0.08,
        );
    };

    const id = window.setInterval(goNext, 6200);
    return () => {
      window.clearInterval(id);
      kenBurns?.kill();
      gsap.killTweensOf(slides);
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
    <section className="hero hero--factory" id="top" ref={root} aria-label="Hero">
      <div className="hero__sticky">
        <div className="hero__stage" aria-hidden="true">
          <div className="hero__media">
            <div className="hero__slider" ref={slider}>
              {HERO_SLIDES.map((slide, index) => (
                <div
                  key={slide.src}
                  className={`hero__slide${index === active ? " is-active" : ""}`}
                >
                  <div
                    className="hero__slide-fill"
                    style={{ backgroundImage: `url(${asset(slide.src)})` }}
                    aria-hidden="true"
                  />
                  <img
                    className="hero__slide-img"
                    src={asset(slide.src)}
                    alt=""
                    width={1920}
                    height={1080}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    loading="eager"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Above slides so crossfade never covers the blue fade */}
          <div className="hero__blue-shade" aria-hidden="true" />
          <div className="hero__dots" aria-hidden="true">
            {HERO_SLIDES.map((slide, index) => (
              <span
                key={slide.src}
                className={`hero__dot${index === active ? " is-active" : ""}`}
              />
            ))}
          </div>
        </div>

        <div className="shell hero__content is-visible">
          <div className="hero__panel hero__panel--brand">
            <img
              className="hero__logo"
              src={asset("/img/hero-redesign/waed-hero-lockup.png")}
              alt="WAED Industrial Innovation Company — Innovation Made To Perform"
              width={560}
              height={176}
            />

            <h1 className="hero__headline">
              <span className="hero__headline-line">Innovating the Future of</span>
              <span className="hero__headline-line hero__headline-line--accent">
                Cleaning Manufacturing.
              </span>
            </h1>

            <p className="hero__support">Manufactured in Bahrain. Ready to Supply Regionally.</p>
          </div>
        </div>

        <ul className="hero__features is-visible" aria-label="Capabilities">
          {FEATURES.map((feature) => (
            <li className="hero__feature" key={feature.icon}>
              <span className="hero__feature-icon">
                <FeatureIcon name={feature.icon} />
              </span>
              <span className="hero__feature-label">
                {feature.label.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </span>
            </li>
          ))}
        </ul>

        <div className="hero__scroll" aria-hidden="true" ref={scrollCue}>
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </div>
    </section>
  );
}
