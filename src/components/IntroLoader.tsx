import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion";
import { asset } from "../lib/asset";

type IntroLoaderProps = {
  onComplete: () => void;
};

const INTRO_DESKTOP = asset("/video/waed-intro.mp4");

/**
 * Desktop-only brand intro. Phones skip this in HomePage because iOS Safari
 * often leaves a solid navy overlay when autoplay/video decode stalls.
 */
export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();
  const [exiting, setExiting] = useState(false);
  const done = useRef(false);

  const finish = useCallback((instant = false) => {
    if (done.current) return;
    done.current = true;
    if (instant) {
      onComplete();
      return;
    }
    setExiting(true);
    window.setTimeout(() => onComplete(), 700);
  }, [onComplete]);

  useEffect(() => {
    // Safety net: if this component mounts on a phone, exit instantly (no 700ms navy).
    const phone =
      document.documentElement.classList.contains("waed-skip-intro") ||
      document.documentElement.classList.contains("waed-phone") ||
      window.matchMedia("(max-width: 768px)").matches ||
      window.matchMedia("(hover: none), (pointer: coarse)").matches ||
      /iP(hone|ad|od)/i.test(navigator.userAgent);
    if (phone) {
      finish(true);
      return;
    }
    document.documentElement.classList.add("intro-active");
    return () => document.documentElement.classList.remove("intro-active");
  }, [finish]);

  useEffect(() => {
    if (document.documentElement.classList.contains("waed-skip-intro")) return;
    if (window.matchMedia("(max-width: 768px)").matches) return;

    if (reduced) {
      finish();
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    const tryPlay = async () => {
      try {
        video.defaultMuted = true;
        video.muted = true;
        video.setAttribute("muted", "");
        video.playsInline = true;
        await video.play();
      } catch {
        finish();
      }
    };

    tryPlay();

    const stall = window.setTimeout(() => {
      const el = videoRef.current;
      if (!el || el.readyState < 2 || el.paused) finish();
    }, 2500);
    const safety = window.setTimeout(finish, 8000);
    return () => {
      window.clearTimeout(stall);
      window.clearTimeout(safety);
    };
  }, [reduced, finish]);

  return (
    <div
      className={`intro-loader${exiting ? " is-exiting" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="WAED Industrial introduction"
    >
      <video
        ref={videoRef}
        className="intro-loader__video"
        src={INTRO_DESKTOP}
        playsInline
        muted
        autoPlay
        preload="auto"
        disablePictureInPicture
        controlsList="nodownload noplaybackrate noremoteplayback"
        onEnded={() => finish()}
        onError={() => finish()}
      />
      <div className="intro-loader__veil" aria-hidden="true" />
      <div className="intro-loader__chrome">
        <p className="intro-loader__brand">WAED Industrial</p>
        <button type="button" className="intro-loader__skip" onClick={() => finish()}>
          Enter site
        </button>
      </div>
    </div>
  );
}
