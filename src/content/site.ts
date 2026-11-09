/** Source of truth: Circle Team approved content revisions (Oct 2026). */

export const site = {
  legalName: "WAED Industrial Innovation Company W.L.L",
  displayName: "WAED Industrial",
  shortName: "WAED",
  email: "info@waediic.com",
  phoneDisplay: "+973 7793 0999",
  phoneHref: "+97377930999",
  address: {
    line1: "Warehouse no. 9, Building 2094, Road 1529",
    locality: "Al Hidd",
    region: "Kingdom of Bahrain",
    street:
      "Warehouse no. 9, Building 2094, Road 1529, Al Hidd, Kingdom of Bahrain",
  },
  mapLink: "https://maps.app.goo.gl/cq6guLB9VeXGTYkr9",
} as const;

export type NavLink = {
  label: string;
  href: string;
};

export type NavItem = NavLink;

export const nav: NavItem[] = [
  { href: "/#about", label: "About" },
  { href: "/#factory", label: "Factory" },
  { href: "/brands", label: "Our Brands" },
  { href: "/#private-label", label: "Custom Brands" },
  { href: "/#our-services", label: "Our Services" },
  { href: "/#quality", label: "Quality" },
  { href: "/#contact", label: "Contact" },
];

export const home = {
  headline: "Innovating the Future of Cleaning Manufacturing.",
  support: "Manufactured in Bahrain. Made for homes across the region.",
  ctaPrimary: "Request a Quote",
  ctaSecondary: "Explore Factory",
  highlights: [
    "Bahrain-based manufacturing",
    "Innovative cleaning and hygiene for the home",
    "Trusted household brands",
    "Flexible packs for everyday use",
    "Quality-focused product development",
  ],
} as const;

export const about = {
  eyebrow: "About WAED Industrial",
  title: "Innovative Cleaning & Hygiene Solutions",
  shortIntro: [
    "Based in Al Hidd, Kingdom of Bahrain, WAED Industrial develops and manufactures cleaning and hygiene products for homes and families.",
    "Through our own consumer brands, we bring everyday cleaning products to market with a focus on performance, consistency, and reliability.",
  ],
  profileEyebrow: "About Us",
  profileTitle: "Innovation in Manufacturing. Excellence in Every Product.",
  fullProfile: [
    "At WAED Industrial, our ambition is to set a higher standard for cleaning products made for the home.",
    "We believe exceptional products are the result of disciplined execution, purposeful innovation, and uncompromising attention to detail.",
    "This philosophy shapes the way we operate, the trust we build, and the lasting value we create for families who use our brands every day.",
    "We are building products designed not only to meet expectations, but to raise them.",
  ],
} as const;

export const pillars = [
  {
    id: "market-demand",
    eyebrow: "Made for Real Homes",
    title: "Built for Everyday Needs. Designed to Delight.",
    body: [
      "At WAED Industrial, we believe successful products begin with a deep understanding of how people clean at home.",
      "We turn everyday expectations into cleaning solutions tailored for performance, fragrance preferences, and packaging that fits family life.",
      "Our home-first approach helps our brands deliver products that feel relevant, dependable, and ready for daily use.",
    ],
  },
  {
    id: "end-to-end",
    eyebrow: "From Idea to Home Shelf",
    title: "One Team. A Complete Product Journey.",
    body: [
      "At WAED Industrial, we simplify the journey from product concept to home-ready cleaning solutions by bringing development and production together under one roof.",
      "Our integrated approach keeps quality consistent from formulation to final pack, so every bottle that reaches a household meets the same high standard.",
    ],
  },
  {
    id: "partnerships",
    eyebrow: "Built Around People",
    title: "Beyond Manufacturing. Caring for Every Home.",
    body: [
      "At WAED Industrial, we see every product as an opportunity to make daily cleaning simpler and more reliable.",
      "We listen closely to what households need, respond to evolving preferences, and keep improving the products families count on.",
      "Our approach is built on transparency, care, and a commitment to delivering on our promises — because the strongest brands grow with the people who use them.",
    ],
  },
] as const;

export const factory = {
  eyebrow: "Our Factory",
  title: "Advanced Manufacturing. Flexible Solutions.",
  lead:
    "WAED Industrial combines modern manufacturing equipment, versatile production systems, and technical expertise to deliver a wide range of cleaning and hygiene solutions.",
  body: [
    "Our manufacturing facility in Bahrain is equipped with industrial mixing systems, water treatment technology, automatic and semi-automatic filling equipment, labeling and packaging solutions, and laboratory facilities for quality control.",
    "Our integrated capabilities support product development, flexible production volumes, and multiple packaging formats for household cleaning brands people trust at home.",
  ],
  location: "Warehouse no. 9, Building 2094, Road 1529, Al Hidd, Kingdom of Bahrain",
  journey: {
    kicker: "From Concept to Shipment",
    title: "The WAED Manufacturing Journey",
    phases: [
      {
        id: "development",
        label: "Phase 01",
        title: "Product Development & Preparation",
        steps: [
          "Product Requirements & Technical Brief",
          "Formulation Development & Laboratory Sampling",
          "Sample Evaluation & Approval",
          "Production Planning & Material Sourcing",
          "Incoming Material Inspection",
        ],
      },
      {
        id: "manufacturing",
        label: "Phase 02",
        title: "Manufacturing & Quality Control",
        steps: [
          "Water Treatment & Batch Preparation",
          "Precision Dosing & Controlled Mixing",
          "In-Process Quality Control",
          "Bulk Product Verification & Approval",
        ],
      },
      {
        id: "packaging",
        label: "Phase 03",
        title: "Packaging, Release & Delivery",
        steps: [
          "Filling & Capping",
          "Labeling, Batch Coding & Packaging",
          "Final Quality Inspection & Batch Release",
          "Finished Goods Storage & Dispatch",
        ],
      },
    ],
  },
} as const;

export type ProductVariant = {
  label: string;
  image: string;
};

export type BrandProduct = {
  name: string;
  category: string;
  body: string;
  image?: string;
  variants?: readonly ProductVariant[];
};

export type BrandGalleryShot = {
  src: string;
  alt: string;
  caption: string;
};

export type BrandEntry = {
  id: string;
  name: string;
  tagline: string;
  story: string;
  focus: string[];
  logo: string;
  titleClass?: string;
  products: BrandProduct[];
  gallery: BrandGalleryShot[];
};

export const brands = {
  title: "Our Brands",
  lead:
    "WAED Industrial develops and manufactures household brands with controlled formulation, consistent quality, and a clear presence in everyday life.",
  page: {
    eyebrow: "Brand House",
    title: "Our Brands",
    heroLine: "Crafted in Bahrain. Made for home.",
    intro:
      "WAED Industrial is the company behind our household brand house. Explore each brand to discover its identity and product range for everyday cleaning.",
  },
  /**
   * Brand house catalog. Add entries here as new brands launch (designed for 3–5+).
   */
  catalog: [
    {
      id: "enaya",
      name: "ENAYA",
      tagline: "Everyday household cleaning from Bahrain.",
      story:
        "Enaya brings dependable home cleaning products from our manufacturing facility in Bahrain. Clear formulations. Family-friendly packs. Fresh results you can trust.",
      focus: ["Kitchen", "Bathroom", "Living spaces", "Everyday hygiene"],
      logo: "/img/enaya/logo.jpg",
      titleClass: "enaya-title",
      gallery: [
        {
          src: "/img/enaya/dishwashing-lemon.png",
          alt: "Enaya dishwashing liquid jerry can",
          caption: "Dishwashing Liquid",
        },
        {
          src: "/img/enaya/hand-soap-rose.png",
          alt: "Enaya hand soap jerry can",
          caption: "Hand Soap",
        },
        {
          src: "/img/enaya/multipurpose-white.png",
          alt: "Enaya multipurpose cleaner jerry can",
          caption: "Multipurpose Cleaner",
        },
        {
          src: "/img/enaya/disinfectant-rose.png",
          alt: "Enaya disinfectant jerry can",
          caption: "Disinfectant",
        },
      ],
      products: [
        {
          name: "Dishwashing Liquid",
          category: "Kitchen",
          body: "Concentrated dishwashing liquid for everyday family kitchens.",
          image: "/img/enaya/dishwashing-lemon.png",
        },
        {
          name: "Hand Soap",
          category: "Hygiene",
          body: "Liquid hand soap for everyday use at home. Other variants are available.",
          image: "/img/enaya/hand-soap-rose.png",
          variants: [
            { label: "Rose", image: "/img/enaya/hand-soap-rose.png" },
            { label: "Oud", image: "/img/enaya/hand-soap-oud.png" },
            { label: "White Floral", image: "/img/enaya/hand-soap-white-floral.png" },
            { label: "Lavender", image: "/img/enaya/hand-soap-lavender.png" },
          ],
        },
        {
          name: "Multipurpose Cleaner",
          category: "Surface",
          body: "General-purpose cleaner for routine cleaning of hard surfaces.",
          image: "/img/enaya/multipurpose-white.png",
        },
        {
          name: "Disinfectant",
          category: "Hygiene",
          body: "Disinfectant for hygiene-focused cleaning around the home. Other variants are available.",
          image: "/img/enaya/disinfectant-rose.png",
          variants: [
            { label: "Rose", image: "/img/enaya/disinfectant-rose.png" },
            { label: "French Perfume", image: "/img/enaya/disinfectant-french-perfume.png" },
            { label: "Lavender", image: "/img/enaya/disinfectant-lavender.png" },
            { label: "Pine", image: "/img/enaya/disinfectant-pine.png" },
            { label: "Al Haram", image: "/img/enaya/disinfectant-al-haram.png" },
          ],
        },
      ],
    },
    {
      id: "leen-x",
      name: "leenX",
      tagline: "A B2C home-cleaning brand for everyday consumers.",
      story:
        "leenX is a B2C product line — made for shoppers and families, not for wholesale or industrial buyers. These are ready-to-use retail bottles for the home: multipurpose, floor, bathroom, and glass cleaners in consumer pack sizes you can keep under the sink or in a cleaning cupboard.",
      focus: ["B2C retail", "Home shoppers", "Family cleaning", "Everyday use"],
      logo: "/img/leen-x/logo.svg",
      titleClass: "leenx-title",
      gallery: [
        {
          src: "/img/leen-x/multipurpose.jpg",
          alt: "leenX multipurpose cleaner retail spray bottle",
          caption: "Multipurpose Cleaner · 750 ml",
        },
        {
          src: "/img/leen-x/bathroom.jpg",
          alt: "leenX bathroom cleaner retail spray bottle",
          caption: "Bathroom Cleaner · 750 ml",
        },
        {
          src: "/img/leen-x/floor.jpg",
          alt: "leenX floor cleaner retail bottle",
          caption: "Floor Cleaner · 1 L",
        },
        {
          src: "/img/leen-x/glass.jpg",
          alt: "leenX glass and window cleaner retail spray bottle",
          caption: "Glass & Window · 750 ml",
        },
      ],
      products: [
        {
          name: "Multipurpose Cleaner",
          category: "B2C · 750 ml",
          body: "A B2C retail spray for consumers — everyday multipurpose cleaner for counters, fixtures, and hard surfaces at home.",
          image: "/img/leen-x/multipurpose.jpg",
        },
        {
          name: "Floor Cleaner",
          category: "B2C · 1 L",
          body: "A B2C household bottle for consumers — floor cleaner for tiled and hard floors in living areas and hallways.",
          image: "/img/leen-x/floor.jpg",
        },
        {
          name: "Bathroom Cleaner",
          category: "B2C · 750 ml",
          body: "A B2C retail spray for consumers — bathroom cleaner for sinks, tiles, and washroom surfaces at home.",
          image: "/img/leen-x/bathroom.jpg",
        },
        {
          name: "Glass & Window",
          category: "B2C · 750 ml",
          body: "A B2C retail spray for consumers — streak-free cleaner for home windows, mirrors, and glass.",
          image: "/img/leen-x/glass.jpg",
        },
      ],
    },
    // Add brand 3–5 here as the house grows.
  ] satisfies BrandEntry[],
} as const;

export function getBrand(id: string) {
  return brands.catalog.find((b) => b.id === id);
}

export const privateLabel = {
  eyebrow: "Custom Home Brands",
  title: "Your Vision. Our Formulation and Manufacturing Expertise.",
  lead:
    "At WAED Industrial, we help create custom household cleaning brands with a strong focus on product formulation, innovation, and packaging people love at home.",
  body: [
    "From developing new cleaning formulations to enhancing existing products, we create home-care solutions tailored to performance, fragrance preferences, and brand identity.",
    "Our services cover the journey from formulation development and laboratory sampling to manufacturing, filling, labeling, and packaging for consumer products.",
  ],
  servicesTitle: "Our Services",
  services: [
    "Custom Formulation Development & Innovation",
    "Product Research, Sampling & Evaluation",
    "Existing Formulation Enhancement",
    "Custom Household Brand Manufacturing",
    "Filling, Labeling & Packaging",
  ],
  cta: "Ask About a Custom Home Brand",
} as const;

export const quality = {
  eyebrow: "Quality & Certifications",
  title: "Quality at Every Stage. Excellence in Every Product.",
  lead:
    "At WAED Industrial, quality is at the core of our manufacturing philosophy.",
  body: [
    "From raw material selection and formulation development to production, testing, and final packaging, we focus on maintaining consistent quality, product reliability, and continuous improvement.",
    "Our commitment to quality is supported by structured manufacturing processes, laboratory testing, and applicable industry standards.",
  ],
  certifications: [
    {
      code: "ISO 9001",
      title: "Quality Management System",
      mark: "9001",
    },
    {
      code: "ISO 14001",
      title: "Environmental Management System",
      mark: "14001",
    },
    {
      code: "ISO 45001",
      title: "Occupational Health & Safety Management System",
      mark: "45001",
    },
    {
      code: "ISO 22716",
      title: "Cosmetics Good Manufacturing Practices",
      mark: "22716",
    },
  ],
  note: "Certification marks shown for reference to the standards held by WAED Industrial.",
} as const;

export const markets = {
  eyebrow: "Where Our Products Go",
  title: "Manufactured in Bahrain. Loved in Homes Across the Region.",
  lead:
    "Strategically based in the Kingdom of Bahrain, WAED Industrial is positioned to bring innovative home cleaning and hygiene products to families across the GCC and beyond.",
  body: "We aim to reach more households with dependable everyday cleaning brands, supported by flexible manufacturing and a commitment to quality people can feel at home.",
  targets: ["GCC homes", "Regional households", "International families"],
} as const;

export const contact = {
  eyebrow: "Contact Us",
  title: "Let’s Talk About Cleaner Homes.",
  lead:
    "Whether you’re looking for household cleaning products, fragrance options, pack sizes, or a custom home brand, our team is ready to help.",
  support: "Get in touch with WAED Industrial to discuss your home cleaning needs.",
  enquiryTypes: [
    "General Question",
    "Product Question",
    "Custom Home Brand",
    "Fragrance or Pack Size",
    "Request Product Details",
    "Other",
  ],
  submitLabel: "Send Message",
  successMessage:
    "Thank you. Your message is ready to send — your email client should open with the details for our team at WAED Industrial.",
} as const;
