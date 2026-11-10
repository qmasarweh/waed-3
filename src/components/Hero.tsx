import { useEffect, useState } from "react";
import { HeroDesktop } from "./HeroDesktop";
import { HeroMobile } from "./HeroMobile";

const MOBILE_MQ = "(max-width: 759px)";

/**
 * Breakpoint switcher: desktop hero ≥760px, phone hero ≤759px.
 * Only one tree is mounted so GSAP + assets stay lean.
 */
export function Hero() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(MOBILE_MQ).matches : false,
  );

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return isMobile ? <HeroMobile /> : <HeroDesktop />;
}
