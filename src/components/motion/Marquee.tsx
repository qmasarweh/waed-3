import { useEffect, useRef } from "react";

/** Continuous horizontal chip marquee — same motion as ENAYA products. */
export function Marquee({
  items,
  reverse = false,
  className = "",
}: {
  items: readonly string[];
  reverse?: boolean;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const row = reverse ? [...items].reverse() : [...items];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const group = track.querySelector<HTMLElement>(".product-track__group");
    if (!group) return;

    let distance = 0;
    let pos = 0;
    const speed = reverse ? 0.045 : 0.055;

    const measure = () => {
      distance = group.offsetWidth;
      if (!distance) return;
      if (reverse && (pos === 0 || pos < -distance || pos > 0)) pos = -distance;
      if (!reverse && (pos < -distance || pos > 0)) pos = 0;
      track.style.transform = `translate3d(${pos}px,0,0)`;
    };

    measure();
    const rem = window.setTimeout(measure, 300);
    void document.fonts?.ready.then(measure);

    let last = performance.now();
    const id = window.setInterval(() => {
      const now = performance.now();
      const dt = Math.min(50, now - last);
      last = now;
      if (distance <= 0) {
        measure();
        return;
      }
      pos += (reverse ? speed : -speed) * dt;
      if (!reverse && pos <= -distance) pos += distance;
      if (reverse && pos >= 0) pos -= distance;
      track.style.transform = `translate3d(${pos}px,0,0)`;
    }, 16);

    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    return () => {
      window.clearInterval(id);
      window.clearTimeout(rem);
      window.removeEventListener("resize", onResize);
      track.style.transform = "";
    };
  }, [reverse, items]);

  return (
    <div
      className={`product-marquee${reverse ? " product-marquee--reverse" : ""}${className ? ` ${className}` : ""}`.trim()}
      aria-hidden="true"
    >
      <div className="product-track" ref={trackRef}>
        <div className="product-track__group">
          {row.map((name) => (
            <span key={`a-${name}`}>{name}</span>
          ))}
        </div>
        <div className="product-track__group">
          {row.map((name) => (
            <span key={`b-${name}`}>{name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
