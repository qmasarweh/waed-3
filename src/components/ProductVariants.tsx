import { useEffect, useState } from "react";
import { asset } from "../lib/asset";

type Variant = {
  label: string;
  image: string;
};

export function ProductVariants({
  name,
  variants,
}: {
  name: string;
  variants: readonly Variant[];
}) {
  const [index, setIndex] = useState(0);
  const count = variants.length;
  const current = variants[index] ?? variants[0];

  useEffect(() => {
    if (count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 800);
    return () => window.clearInterval(id);
  }, [count]);

  if (!current) return null;

  const go = (next: number) => setIndex((next + count) % count);

  return (
    <div className="variant-roll">
      <div className="variant-roll__stage">
        {variants.map((variant, i) => (
          <img
            key={variant.image}
            src={asset(variant.image)}
            alt={i === index ? `${name}, ${variant.label}` : ""}
            aria-hidden={i === index ? undefined : true}
            className={i === index ? "is-on" : undefined}
          />
        ))}
      </div>
      <div className="variant-roll__controls">
        <button type="button" aria-label={`Previous ${name} variant`} onClick={() => go(index - 1)}>
          ‹
        </button>
        <p aria-live="polite">
          <span className="variant-roll__label">{current.label}</span>
          <span className="variant-roll__more">Other variants</span>
        </p>
        <button type="button" aria-label={`Next ${name} variant`} onClick={() => go(index + 1)}>
          ›
        </button>
      </div>
      <div className="variant-roll__dots" role="tablist" aria-label={`${name} variants`}>
        {variants.map((variant, i) => (
          <button
            key={variant.image}
            type="button"
            role="tab"
            aria-label={variant.label}
            aria-selected={i === index}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
