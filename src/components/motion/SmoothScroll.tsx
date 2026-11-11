import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Agency-smooth scroll (Romans-style inertia) wired to ScrollTrigger. */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const fine = window.matchMedia("(pointer: fine)").matches;

    const lenis = new Lenis({
      lerp: fine ? 0.16 : 0.22,
      wheelMultiplier: fine ? 1.15 : 1.2,
      touchMultiplier: 1.25,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: false,
    });

    document.documentElement.classList.add("lenis", "lenis-smooth");
    lenis.on("scroll", ScrollTrigger.update);
    window.addEventListener("scroll", ScrollTrigger.update, { passive: true });

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const scrollToHash = (hash: string, instant = false) => {
      if (!hash || hash === "#") return;
      const id = decodeURIComponent(hash.replace(/^#/, ""));
      const el = document.getElementById(id);
      if (!el) return;
      lenis.scrollTo(el, {
        offset: -72,
        duration: instant ? 0 : 0.85,
        easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      });
    };

    if (window.location.hash) {
      requestAnimationFrame(() => scrollToHash(window.location.hash));
    }

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const raw = anchor.getAttribute("href");
      if (!raw || !raw.startsWith("#")) return;
      e.preventDefault();
      history.pushState(null, "", raw);
      scrollToHash(raw);
    };

    const onHash = () => scrollToHash(window.location.hash);
    const onResize = () => ScrollTrigger.refresh();

    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHash);
    window.addEventListener("resize", onResize);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", ScrollTrigger.update);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, []);

  return null;
}
