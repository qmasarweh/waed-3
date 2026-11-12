export type Feature = { icon: string; lines: string[] };

export type HeroLayout = "lab" | "factory" | "env" | "pack";

export type HeroSlide = {
  id: "1" | "2" | "3" | "4";
  layout: HeroLayout;
  src: string;
  mobileSrc: string;
  alt: string;
  logo: "left" | "right" | "none";
  accent?: boolean;
  skewSupport?: boolean;
  /** Mobile portrait already includes logo/title/features — hide HTML chrome. */
  bakedChrome?: boolean;
  title: string[];
  keepIndex?: number;
  support: string;
  features: Feature[];
  /** Icon stroke: cyan (default) or white (factory slide). */
  featTone?: "cyan" | "white";
  /** Feature grid: 2×2 (lab) or 4-col row. */
  featGrid?: "grid2" | "row4";
};

/**
 * Slide order (desktop + phone):
 * 1) Innovating the Future of Cleaning Manufacturing
 * 2) Quality You Can Rely On
 * 3) Flexible Packaging Solutions for Every Market
 * 4) Performance You Can See. Quality You Can Trust.
 */
export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "1",
    layout: "factory",
    src: "/img/hero-redesign/slide-01.jpg",
    mobileSrc: "/img/hero-redesign/slide-01-phone.jpg?v=2",
    alt: "WAED manufacturing plant",
    logo: "left",
    title: ["Innovating the Future of", "Cleaning Manufacturing."],
    keepIndex: 1,
    support: "Manufactured in Bahrain. Ready to Supply Regionally.",
    featGrid: "row4",
    featTone: "white",
    features: [
      { icon: "factory", lines: ["Modern", "Manufacturing"] },
      { icon: "badgeCheck", lines: ["Consistent", "Quality"] },
      { icon: "layers", lines: ["Flexible", "Production"] },
      { icon: "handshake", lines: ["Reliable", "Supply"] },
    ],
  },
  {
    id: "2",
    layout: "lab",
    src: "/img/hero-redesign/slide-02.jpg",
    mobileSrc: "/img/hero-redesign/slide-02-phone.jpg?v=1",
    alt: "WAED laboratory testing",
    logo: "none",
    accent: true,
    title: ["Quality You Can", "Rely On."],
    support: "Every Formula Checked for\nPerformance and Consistency.",
    featGrid: "grid2",
    features: [
      { icon: "flask", lines: ["Laboratory", "Testing"] },
      { icon: "shield", lines: ["Quality", "Control"] },
      { icon: "molecule", lines: ["Formula", "Consistency"] },
      { icon: "chart", lines: ["Performance", "Validation"] },
    ],
  },
  {
    id: "3",
    layout: "pack",
    src: "/img/hero-redesign/slide-03.jpg",
    mobileSrc: "/img/hero-redesign/slide-03-phone.jpg?v=2",
    alt: "WAED packaging solutions",
    logo: "none",
    accent: true,
    title: ["Flexible Packaging", "Solutions for", "Every Market."],
    support: "From Industrial Bulk to Retail Packaging.",
    featGrid: "row4",
    features: [
      { icon: "hex", lines: ["Bulk to", "Retail", "Packaging"] },
      { icon: "layers", lines: ["Multiple", "Packaging", "Sizes"] },
      { icon: "bottles", lines: ["Flexible", "Filling", "Solutions"] },
      { icon: "cart", lines: ["Market-Ready", "Presentation"] },
    ],
  },
  {
    id: "4",
    layout: "env",
    src: "/img/hero-redesign/slide-04.jpg",
    mobileSrc: "/img/hero-redesign/slide-04-phone.jpg?v=1",
    alt: "WAED cleaning environments",
    logo: "none",
    accent: true,
    skewSupport: true,
    title: ["Performance You Can See.", "Quality You Can Trust."],
    keepIndex: 0,
    support: "Cleaning Solutions Designed for Every Environment.",
    featGrid: "row4",
    features: [
      { icon: "sparkle", lines: ["Visible", "Cleaning", "Performance"] },
      { icon: "shield", lines: ["Clean &", "Hygienic", "Results"] },
      { icon: "layers", lines: ["Solutions", "for Every", "Environment"] },
      { icon: "medal", lines: ["Trusted", "Product", "Performance"] },
    ],
  },
];

/** Lucide-style stroke icons matched to the client ChatGPT slide comps. */
export const ICONS: Record<string, string[]> = {
  // Slide 1 — factory / badge-check / layers / handshake
  factory: [
    "M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
    "M17 18h1",
    "M12 18h1",
    "M7 18h1",
  ],
  badgeCheck: [
    "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
    "m9 12 2 2 4-4",
  ],
  layers: [
    "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
    "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
    "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
  ],
  handshake: [
    "m11 17 2 2a1 1 0 1 0 3-3",
    "m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4",
    "m21 3 1 11h-2",
    "M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3",
    "M3 4h8",
  ],
  // Slide 2 — flask-conical / shield-check / share-2 nodes / chart bars+line
  flask: [
    "M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2",
    "M6.453 15h11.094",
    "M8.5 2h7",
  ],
  shield: [
    "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
    "m9 12 2 2 4-4",
  ],
  molecule: [
    "M18 5a3 3 0 1 0 0.01 0z",
    "M6 12a3 3 0 1 0 0.01 0z",
    "M18 19a3 3 0 1 0 0.01 0z",
    "M8.59 13.51 15.42 17.49",
    "M15.41 6.51 8.59 10.49",
  ],
  chart: [
    "M12 16v5",
    "M16 14v7",
    "M20 10v11",
    "m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15",
    "M4 18v3",
    "M8 14v7",
  ],
  // Slide 3 — hex cluster / layers / two bottles / cart
  hex: [
    "m12 2 4 2.3v4.4L12 11 8 8.7V4.3z",
    "m7 11 4 2.3v4.4L7 20l-4-2.3v-4.4z",
    "m17 11 4 2.3v4.4L17 20l-4-2.3v-4.4z",
  ],
  bottles: [
    "M5 3h3M6.5 3v3L4 9v12h6V9L7.5 6",
    "M15 3h3M16.5 3v3L14 9v12h6V9l-2.5-3",
  ],
  cart: [
    "M8 21a1 1 0 1 0 0.01 0z",
    "M19 21a1 1 0 1 0 0.01 0z",
    "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",
  ],
  // Slide 4 — sparkles / shield / layers / award medal with check
  sparkle: [
    "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
    "M20 3v4",
    "M22 5h-4",
    "M4 17v2",
    "M5 18H3",
  ],
  medal: [
    "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
    "M12 2a6 6 0 1 0 0.01 0z",
    "m9.5 8 2 2 3.5-3.5",
  ],
};

/** Auto-advance hero slides on desktop + phone. */
export const HERO_AUTOPLAY = true;

/** Auto-advance interval for desktop + phone heroes (ms). */
export const HERO_AUTOPLAY_MS = 6000;
