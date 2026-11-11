import { useEffect, useState } from "react";
import { HeroDesktop } from "./HeroDesktop";
import { HeroMobile } from "./HeroMobile";

const MOBILE_MQ = "(max-width: 759px)";

function isPhoneLike() {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent || "";
  if (/iP(hone|ad|od)/i.test(ua) || /CriOS|FxiOS|Android.+Mobile/i.test(ua)) return true;
  if (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) return true;
  if (window.matchMedia("(hover: none)").matches && window.matchMedia("(pointer: coarse)").matches) {
    return true;
  }
  // iPhone “Request Desktop Website” still reports a narrow physical screen.
  if (Math.min(screen.width, screen.height) <= 500) return true;
  return window.matchMedia(MOBILE_MQ).matches;
}

function subscribeMq(mq: MediaQueryList, apply: () => void) {
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
 * Prefer the phone hero on any real phone — even if “Desktop Website” widens the layout.
 */
export function Hero() {
  const [isMobile, setIsMobile] = useState(() => isPhoneLike());

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const apply = () => setIsMobile(isPhoneLike());
    apply();
    return subscribeMq(mq, apply);
  }, []);

  return isMobile ? <HeroMobile /> : <HeroDesktop />;
}
