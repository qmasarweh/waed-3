import { useEffect, useState } from "react";
import { HeroDesktop } from "./HeroDesktop";
import { HeroMobile } from "./HeroMobile";

const MOBILE_MQ = "(max-width: 759px)";

function subscribeMq(mq: MediaQueryList, apply: () => void) {
  // Safari < 14 used addListener/removeListener
  if (typeof mq.addEventListener === "function") {
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }
  const legacy = mq as MediaQueryList & {
    addListener: (cb: () => void) => void;
    removeListener: (cb: () => void) => void;
  };
  legacy.addListener(apply);
  return () => legacy.removeListener(apply);
}

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
    return subscribeMq(mq, apply);
  }, []);

  return isMobile ? <HeroMobile /> : <HeroDesktop />;
}
