import { Parallax } from "./Parallax";

/** Full-bleed image plane — Romans-style depth between copy sections. */
export function MediaBand({
  src,
  alt,
  caption,
  speed = "fast",
  tone = "dark",
  fit = "cover",
  ratio,
}: {
  src: string;
  alt: string;
  caption?: string;
  speed?: "slow" | "medium" | "fast";
  tone?: "dark" | "light";
  /** contain keeps the whole photograph inside the band */
  fit?: "cover" | "contain";
  /** width / height, used when fit is contain */
  ratio?: string;
}) {
  const framed = fit === "contain";
  return (
    <section
      className={`media-band media-band--${tone}${framed ? " media-band--contain" : ""}`}
      style={framed && ratio ? { aspectRatio: ratio } : undefined}
      aria-label={caption ?? alt}
    >
      <div className="media-band__frame">
        <Parallax
          speed={speed}
          scale={framed ? 1 : 1.22}
          distance={framed ? 0 : undefined}
          className="media-band__layer"
        >
          <img
            src={src}
            alt={alt}
            width={framed ? 2560 : 1920}
            height={framed ? 1040 : 1080}
            loading="lazy"
          />
        </Parallax>
        <div className="media-band__veil" aria-hidden="true" />
        {caption ? <p className="media-band__caption">{caption}</p> : null}
      </div>
    </section>
  );
}
