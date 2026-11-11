import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveal whole sections at once — no staggered one-by-one delays.
 */
export function RevealObserver() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main section, .site-footer"),
    );
    if (!sections.length) return;

    const showSection = (section: HTMLElement) => {
      section.querySelectorAll<HTMLElement>(".reveal").forEach((node) => {
        node.classList.remove("reveal-pending");
        node.classList.add("is-in", "is-visible");
        node.style.transitionDelay = "0s";
      });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sections.forEach(showSection);
      return;
    }

    sections.forEach((section) => {
      section.querySelectorAll<HTMLElement>(".reveal").forEach((node) => {
        if (!node.classList.contains("is-visible")) {
          node.classList.add("reveal-pending");
        }
      });
    });

    const inView = (section: HTMLElement) => {
      const rect = section.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.88 && rect.bottom > 80;
    };

    const revealVisible = () => {
      sections.forEach((section) => {
        if (inView(section)) showSection(section);
      });
    };

    const triggers = sections.map((section) =>
      ScrollTrigger.create({
        trigger: section,
        start: "top 88%",
        once: true,
        onEnter: () => showSection(section),
        onRefresh: () => {
          if (inView(section)) showSection(section);
        },
      }),
    );

    revealVisible();
    ScrollTrigger.addEventListener("refresh", revealVisible);
    window.addEventListener("scroll", revealVisible, { passive: true });
    window.addEventListener("resize", revealVisible);
    gsap.ticker.add(revealVisible);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      revealVisible();
    });

    const safety = window.setTimeout(() => sections.forEach(showSection), 1200);

    return () => {
      window.clearTimeout(safety);
      ScrollTrigger.removeEventListener("refresh", revealVisible);
      window.removeEventListener("scroll", revealVisible);
      window.removeEventListener("resize", revealVisible);
      gsap.ticker.remove(revealVisible);
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return null;
}
