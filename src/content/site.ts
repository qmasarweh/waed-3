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
  { href: "/#about-us", label: "About Us" },
  { href: "/#factory", label: "Factory" },
  { href: "/brands", label: "Our Brands" },
  { href: "/#private-label", label: "Private Label" },
  { href: "/#our-services", label: "Our Services" },
  { href: "/#quality", label: "Quality" },
  { href: "/#contact", label: "Contact" },
];

export const home = {
  headline: "Innovating the Future of Cleaning Manufacturing.",
  support: "Manufactured in Bahrain. Ready to Supply Regionally.",
  ctaPrimary: "Request a Quote",
  ctaSecondary: "Explore Factory",
  highlights: [
    "Bahrain-based manufacturing",
    "Innovative cleaning and hygiene solutions",
    "Private-label and contract manufacturing",
    "Flexible production and packaging",
    "Quality-focused product development",
  ],
} as const;

export const about = {
  eyebrow: "About WAED Industrial",
  title: "Innovative Cleaning & Hygiene Solutions",
  shortIntro: [
    "Based in Al Hidd, Kingdom of Bahrain, WAED Industrial develops and manufactures cleaning and hygiene products for household, commercial, and industrial markets.",
    "Through our own brands and private-label manufacturing services, we bring products to market with a focus on performance, consistency, and reliability.",
  ],
  profileEyebrow: "About Us",
  profileTitle: "Innovation in Manufacturing. Excellence in Every Product.",
  fullProfile: [
    "At WAED Industrial, our ambition is to set a higher standard for cleaning manufacturing.",
    "We believe exceptional products are the result of disciplined execution, purposeful innovation, and uncompromising attention to detail.",
    "This philosophy shapes the way we operate, the trust we build, and the lasting value we create for our customers and business partners.",
    "We are building an industrial company designed not only to meet expectations, but to raise them.",
  ],
} as const;

export const pillars = [
  {
    id: "market-demand",
    eyebrow: "Engineered for Market Demand",
    title: "Built for Real Needs. Designed to Compete.",
    body: [
      "At WAED Industrial, we believe successful products begin with a deep understanding of the markets they serve.",
      "We translate customer expectations and evolving market demands into cleaning solutions tailored for performance, functionality, fragrance preferences, and packaging requirements.",
      "Our market-driven approach enables us to develop products with a clear commercial purpose, helping our brands and business partners deliver solutions that are relevant, competitive, and aligned with their target markets.",
    ],
  },
  {
    id: "end-to-end",
    eyebrow: "End-to-End Solutions",
    title: "One Partner. A Complete Manufacturing Solution.",
    body: [
      "At WAED Industrial, we simplify the journey from product concept to market-ready solutions by bringing essential manufacturing services together under one roof.",
      "Our integrated approach ensures seamless coordination between product development, production, and final delivery, helping our partners streamline operations, maintain consistency, and bring their products to market with confidence.",
    ],
  },
  {
    id: "partnerships",
    eyebrow: "Built for Partnerships",
    title: "Beyond Manufacturing. Growing Together.",
    body: [
      "At WAED Industrial, we see every partnership as an opportunity to create lasting value and shared success.",
      "We work closely with our customers and business partners to understand their goals, respond to their evolving needs, and support their long-term growth.",
      "Our approach is built on transparency, mutual trust, and a commitment to delivering on our promises — because we believe the strongest partnerships are those that grow together.",
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
    "Our integrated capabilities support product development, flexible production volumes, multiple packaging formats, and private-label manufacturing to meet the diverse needs of our business partners.",
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
    "WAED Industrial develops and manufactures brands with controlled formulation, consistent quality, and a clear commercial presence.",
  page: {
    eyebrow: "Brand House",
    title: "Our Brands",
    heroLine: "Crafted in Bahrain. Built for the region.",
    intro:
      "WAED Industrial is the parent manufacturing company behind our brand house. Explore each brand to discover its identity and product range.",
  },
  /**
   * Brand house catalog. Add entries here as new brands launch (designed for 3–5+).
   */
  catalog: [
    {
      id: "enaya",
      name: "ENAYA",
      tagline: "Household and professional cleaning from Bahrain.",
      story:
        "Enaya brings dependable household and professional cleaning products from our manufacturing facility in Bahrain. Clear formulations. Flexible packs. Supply you can plan around.",
      focus: ["Household", "Hospitality", "Institutional", "Professional cleaning"],
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
          body: "Concentrated dishwashing liquid for household kitchens and professional food-service environments.",
          image: "/img/enaya/dishwashing-lemon.png",
        },
        {
          name: "Hand Soap",
          category: "Hygiene",
          body: "Liquid hand soap for everyday use in home and workplace settings. Other variants are available.",
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
          body: "Disinfectant for hygiene-focused cleaning in commercial settings. Other variants are available.",
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
      id: "lean-x",
      name: "LEAN X",
      tagline: "Everyday surfaces. Clear results.",
      story:
        "Lean X is built for fast, reliable surface care across homes, offices, and shared spaces. Practical formulas. Fresh finish. Easy to stock and easy to use.",
      focus: ["Household", "Offices", "Retail", "Facilities"],
      logo: "/img/lean-x/logo.svg",
      gallery: [
        {
          src: "/img/lean-x/multipurpose.jpg",
          alt: "Lean X multipurpose cleaner bottle",
          caption: "Multipurpose Cleaner",
        },
        {
          src: "/img/lean-x/bathroom.jpg",
          alt: "Lean X bathroom cleaner bottle",
          caption: "Bathroom Cleaner",
        },
        {
          src: "/img/lean-x/floor.jpg",
          alt: "Lean X floor cleaner bottle",
          caption: "Floor Cleaner",
        },
        {
          src: "/img/lean-x/kitchen.jpg",
          alt: "Lean X kitchen degreaser bottle",
          caption: "Kitchen Degreaser",
        },
        {
          src: "/img/lean-x/glass.jpg",
          alt: "Lean X glass and window cleaner bottle",
          caption: "Glass & Window",
        },
      ],
      products: [
        {
          name: "Multipurpose Cleaner",
          category: "Surface",
          body: "Everyday multipurpose cleaner for counters, fixtures, and high-touch hard surfaces.",
          image: "/img/lean-x/multipurpose.jpg",
        },
        {
          name: "Floor Cleaner",
          category: "Floor",
          body: "Floor cleaner for tiled and hard floors in homes and light commercial spaces.",
          image: "/img/lean-x/floor.jpg",
        },
        {
          name: "Bathroom Cleaner",
          category: "Bathroom",
          body: "Bathroom cleaner for sinks, tiles, and washroom surfaces that need a fresh finish.",
          image: "/img/lean-x/bathroom.jpg",
        },
        {
          name: "Kitchen Degreaser",
          category: "Kitchen",
          body: "Kitchen degreaser for cooktops, splashbacks, and grease-prone work areas.",
          image: "/img/lean-x/kitchen.jpg",
        },
        {
          name: "Glass & Window",
          category: "Surface",
          body: "Glass and window cleaner for streak-free shine on glass, mirrors, and panels.",
          image: "/img/lean-x/glass.jpg",
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
  eyebrow: "Private Label & Contract Manufacturing",
  title: "Your Vision. Our Formulation and Manufacturing Expertise.",
  lead:
    "At WAED Industrial, we provide comprehensive private-label and contract manufacturing solutions, with a strong focus on product formulation, innovation, and customization.",
  body: [
    "From developing new cleaning formulations to enhancing existing products, we work with our partners to create solutions tailored to their performance requirements, market preferences, and brand identity.",
    "Our integrated services cover the journey from formulation development and laboratory sampling to manufacturing, filling, labeling, and packaging.",
  ],
  servicesTitle: "Our Services",
  services: [
    "Custom Formulation Development & Innovation",
    "Product Research, Sampling & Evaluation",
    "Existing Formulation Enhancement",
    "Private Label & Contract Manufacturing",
    "Filling, Labeling & Packaging",
  ],
  cta: "Request a Manufacturing Consultation",
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
  eyebrow: "Markets & Export",
  title: "Manufactured in Bahrain. Connecting to Regional and Global Markets.",
  lead:
    "Strategically based in the Kingdom of Bahrain, WAED Industrial is positioned to serve the growing demand for innovative cleaning and hygiene solutions across the GCC and international markets.",
  body: "We aim to build strong, long-term partnerships with distributors, retailers, and private-label businesses, supported by flexible manufacturing capabilities and a commitment to quality and reliable supply.",
  targets: ["GCC", "Regional markets", "International partners"],
} as const;

export const contact = {
  eyebrow: "Contact Us",
  title: "Let’s Build Something Great Together.",
  lead:
    "Whether you’re looking for innovative cleaning solutions, private-label manufacturing, custom formulation development, or distribution partnerships, our team is ready to explore opportunities with you.",
  support: "Get in touch with WAED Industrial to discuss your business requirements.",
  enquiryTypes: [
    "General Enquiry",
    "Product Enquiry",
    "Private Label & Contract Manufacturing",
    "Custom Formulation Development",
    "Request a Quotation",
    "Distribution & Business Partnerships",
  ],
  submitLabel: "Submit Enquiry",
  successMessage:
    "Thank you. Your enquiry is ready to send — your email client should open with the details for our team at WAED Industrial.",
} as const;
