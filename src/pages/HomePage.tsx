import { useCallback, useEffect, useState } from "react";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { CompanyProfile } from "../components/CompanyProfile";
import { Pillars } from "../components/Pillars";
import { Factory } from "../components/Factory";
import { Products } from "../components/Products";
import { PrivateLabel } from "../components/PrivateLabel";
import { Quality } from "../components/Quality";
import { Markets } from "../components/Markets";
import { Contact } from "../components/Contact";
import { Statement } from "../components/Statement";
import { RevealObserver } from "../components/RevealObserver";
import { MediaBand } from "../components/motion/MediaBand";
import { IntroLoader } from "../components/IntroLoader";
import { asset } from "../lib/asset";

const INTRO_KEY = "waed-intro-seen";

/** Keep desktop splash; skip on phones so Safari/Chrome never freeze on navy. */
function shouldSkipIntroOnPhone() {
  if (typeof window === "undefined") return false;
  if (document.documentElement.classList.contains("waed-skip-intro")) return true;
  if (document.documentElement.classList.contains("waed-phone")) return true;
  try {
    if (sessionStorage.getItem(INTRO_KEY) === "1") return true;
  } catch {
    /* ignore */
  }
  const narrow = window.matchMedia("(max-width: 920px)").matches;
  const touch =
    window.matchMedia("(hover: none)").matches ||
    window.matchMedia("(pointer: coarse)").matches;
  const shortSide = Math.min(screen.width || 0, screen.height || 0);
  const ios =
    /iP(hone|ad|od)/i.test(navigator.userAgent) ||
    /CriOS|FxiOS/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) ||
    (typeof navigator.maxTouchPoints === "number" && navigator.maxTouchPoints > 1) ||
    (shortSide > 0 && shortSide <= 500);
  return narrow || touch || ios;
}

export function HomePage() {
  const [introDone, setIntroDone] = useState(() => shouldSkipIntroOnPhone());

  const handleIntroComplete = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* ignore */
    }
    setIntroDone(true);
  }, []);

  // Belt + suspenders: if a phone somehow started with intro on, kill it immediately.
  useEffect(() => {
    if (shouldSkipIntroOnPhone()) setIntroDone(true);
  }, []);

  useEffect(() => {
    if (!introDone) return;
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.slice(1);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [introDone]);

  return (
    <>
      {!introDone && !shouldSkipIntroOnPhone() && (
        <IntroLoader onComplete={handleIntroComplete} />
      )}
      <main className={`page-parallax${introDone ? " is-ready" : ""}`}>
        <Hero />
        <About />
        <CompanyProfile />
        <Pillars />
        <MediaBand
          src={asset("/img/production-line.jpg")}
          alt="WAED Industrial production line in Al Hidd"
          caption="Production · Al Hidd"
          speed="fast"
          fit="contain"
          ratio="1024 / 416"
        />
        <Factory />
        <Products />
        <Statement
          tone="navy"
          eyebrow="Custom home brands"
          line="Your Vision. Our Formulation and Manufacturing Expertise."
        />
        <PrivateLabel />
        <MediaBand
          src={asset("/img/hero-facility.jpg")}
          alt="WAED Industrial facility exterior"
          speed="medium"
          fit="contain"
          ratio="3840 / 2160"
        />
        <Quality />
        <Markets />
        <Contact />
      </main>
      {introDone && <RevealObserver />}
    </>
  );
}
