export type Feature = { icon: string; lines: string[] };

export type HeroSlide = {
  id: "1" | "2" | "3" | "4";
  src: string;
  mobileSrc: string;
  alt: string;
  logo: "left" | "right" | "none";
  accent?: boolean;
  skewSupport?: boolean;
  title: string[];
  keepIndex?: number;
  support: string;
  features: Feature[];
};

/** Shared slide copy for desktop + phone heroes. */
export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "1",
    src: "/img/hero-redesign/slide-01.jpg",
    mobileSrc: "/img/hero-redesign/slide-01-portrait.jpg?v=8",
    alt: "WAED manufacturing plant collage",
    logo: "left",
    title: ["Innovating the Future of", "Cleaning Manufacturing."],
    keepIndex: 1,
    support: "Manufactured in Bahrain. Ready to Supply Regionally.",
    features: [
      { icon: "factory", lines: ["Modern", "Manufacturing"] },
      { icon: "award", lines: ["Consistent", "Quality"] },
      { icon: "layers", lines: ["Flexible", "Production"] },
      { icon: "handshake", lines: ["Reliable", "Supply"] },
    ],
  },
  {
    id: "2",
    src: "/img/hero-redesign/slide-02.jpg",
    mobileSrc: "/img/hero-redesign/slide-02-portrait.jpg?v=8",
    alt: "WAED laboratory testing",
    logo: "none",
    accent: true,
    title: ["Quality You Can Rely On."],
    support: "Every Formula Checked for Performance and Consistency.",
    features: [
      { icon: "flask", lines: ["Laboratory Testing"] },
      { icon: "shield", lines: ["Quality Control"] },
      { icon: "triangle", lines: ["Formula Consistency"] },
      { icon: "chart", lines: ["Performance", "Validation"] },
    ],
  },
  {
    id: "3",
    src: "/img/hero-redesign/slide-03.jpg",
    mobileSrc: "/img/hero-redesign/slide-03-portrait.jpg?v=8",
    alt: "WAED packaging solutions",
    logo: "none",
    accent: true,
    title: ["Flexible Packaging Solutions", "for Every Market."],
    support: "From Industrial Bulk to Retail Packaging.",
    features: [
      { icon: "hex", lines: ["Bulk to Retail", "Packaging"] },
      { icon: "layers", lines: ["Multiple Packaging", "Sizes"] },
      { icon: "bottles", lines: ["Flexible Filling", "Solutions"] },
      { icon: "cart", lines: ["Market-Ready", "Presentation"] },
    ],
  },
  {
    id: "4",
    src: "/img/hero-redesign/slide-04.jpg",
    mobileSrc: "/img/hero-redesign/slide-04-portrait.jpg?v=8",
    alt: "WAED cleaning environments collage",
    logo: "none",
    accent: true,
    skewSupport: true,
    title: ["Performance You Can\u00A0See.", "Quality You Can Trust."],
    keepIndex: 0,
    support: "Cleaning Solutions Designed for Every Environment.",
    features: [
      { icon: "sparkle", lines: ["Visible Cleaning", "Performance"] },
      { icon: "shield", lines: ["Clean & Hygienic", "Results"] },
      { icon: "layers", lines: ["Solutions for Every", "Environment"] },
      { icon: "medal", lines: ["Trusted Product", "Performance"] },
    ],
  },
];

export const ICONS: Record<string, string[]> = {
  factory: ["M3 21V9l5 3V9l5 3V5h3v7h2l2 2v7z", "M7 17h2M12 17h2M17 17h1"],
  award: ["M12 9a6 6 0 1 0 0.01 0z", "m9.5 9 2 2 3-3.5", "M8.5 14 7 22l5-3 5 3-1.5-8"],
  layers: ["m12 3 9 4.5-9 4.5-9-4.5z", "m3 12 9 4.5 9-4.5", "m3 16.5 9 4.5 9-4.5"],
  handshake: [
    "m2 12 4-4 4 1 3-2 4 2 5 3",
    "m22 12-5 5-3 1-3 2-3-1-3 1-3-4",
    "m9 15 2 2m1-4 3 3",
  ],
  flask: [
    "M9 3h6M10 3v6l-5.5 9.5A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.5L14 9V3",
    "M7.5 15h9",
  ],
  shield: ["M12 3 4 6v6c0 4.5 3.2 7.8 8 9 4.8-1.2 8-4.5 8-9V6z", "m8.5 12 2.5 2.5 4.5-5"],
  triangle: [
    "M12 5a2 2 0 1 0 0.01 0z",
    "M5 19a2 2 0 1 0 0.01 0z",
    "M19 19a2 2 0 1 0 0.01 0z",
    "m11 7-5 10M13 7l5 10M7 19h10",
  ],
  chart: ["M3 3v18h18", "m6 15 4-4 3 3 6-7", "M16 7h3v3"],
  hex: [
    "m12 2 4 2.3v4.4L12 11 8 8.7V4.3z",
    "m7 11 4 2.3v4.4L7 20l-4-2.3v-4.4z",
    "m17 11 4 2.3v4.4L17 20l-4-2.3v-4.4z",
  ],
  bottles: ["M5 3h3M6.5 3v3L4 9v12h6V9L7.5 6", "M15 3h3M16.5 3v3L14 9v12h6V9l-2.5-3"],
  cart: ["M2 3h3l2.5 12h11L21 7H6", "M9 20a1.4 1.4 0 1 0 0.01 0z", "M17 20a1.4 1.4 0 1 0 0.01 0z"],
  sparkle: [
    "M10 4c.6 4 2 5.4 6 6-4 .6-5.4 2-6 6-.6-4-2-5.4-6-6 4-.6 5.4-2 6-6z",
    "M18 14c.3 2 1 2.7 3 3-2 .3-2.7 1-3 3-.3-2-1-2.7-3-3 2-.3 2.7-1 3-3z",
  ],
  medal: ["M12 9a6 6 0 1 0 0.01 0z", "m9.5 9 2 2 3-3.5", "M8.5 14 7 22l5-3 5 3-1.5-8"],
};

/** Flip to true when ready to restore auto-advance. */
export const HERO_AUTOPLAY = true;

/** Auto-advance interval for desktop + phone heroes (ms). */
export const HERO_AUTOPLAY_MS = 6000;
