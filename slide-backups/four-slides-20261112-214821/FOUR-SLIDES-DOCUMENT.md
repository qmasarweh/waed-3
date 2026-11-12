# WAED Four Slides — Exact Restore Document

Created: 2026-11-12 21:49:04
Purpose: Accurate restore of all 4 hero slides (not a visual screenshot — exact files + CSS values).

## Backup locations
- Folder: site/slide-backups/four-slides-LATEST/
- Also timestamped folder + zip under site/slide-backups/

## How to restore accurately
1. Copy img/* → public/img/hero-redesign/
2. Copy src/components/hero/heroSlides.ts → src/components/hero/
3. Copy src/components/Hero.tsx, HeroMobile.tsx, HeroDesktop.tsx → src/components/
4. Copy src/styles/global.css → src/styles/
5. Copy index.html → site root
6. Hard-refresh browser (clear cache if needed)

## Boot splash (index.html)
- ./img/hero-redesign/slide-01-portrait.jpg?v=10

## Slide image files (exact)
### Slide 1
- slide-01.jpg: 1280x720 sha256=18353f7727e71233 bytes=453058
- slide-01-gemini.jpg: 768x1365 sha256=55fe106795b5042b bytes=782460
- slide-01-phone.jpg: 1320x2868 sha256=f7b72fbf1ff3f3d4 bytes=634355
- slide-01-portrait.jpg: 1080x1920 sha256=3d04e924d53fefbb bytes=270030
### Slide 2
- slide-02.jpg: 1280x720 sha256=0a9dbf5751d1560c bytes=252451
- slide-02-gemini.jpg: 768x1365 sha256=585321d664f90271 bytes=667176
- slide-02-phone.jpg: 1320x2868 sha256=a1b824f87d81be6b bytes=511488
- slide-02-portrait.jpg: 1320x2868 sha256=a1b824f87d81be6b bytes=511488
### Slide 3
- slide-03.jpg: 1280x720 sha256=df754e9a064c66ae bytes=231504
- slide-03-gemini.jpg: 1536x2730 sha256=f984170bc49fd337 bytes=1637390
- slide-03-phone.jpg: 1054x2048 sha256=ac72a5a44dac93f7 bytes=151257
- slide-03-portrait.jpg: 1054x2048 sha256=ac72a5a44dac93f7 bytes=151257
- slide-03-user.jpg: 576x1024 sha256=dbb8f761001fcb6c bytes=55766
### Slide 4
- slide-04.jpg: 1280x720 sha256=bdf9d2073c706951 bytes=398003
- slide-04-gemini.jpg: 768x1365 sha256=51bc9dd405a88fb9 bytes=650852
- slide-04-phone.jpg: 1320x2868 sha256=61b418a8c2982d82 bytes=512084
- slide-04-portrait.jpg: 1080x1920 sha256=4c434e0943fa137d bytes=234592
- waed-hero-lockup.png: 563x124 sha256=d6f69ece11f84195 bytes=6011

## heroSlides.ts mobile sources
- Slide 1: /img/hero-redesign/slide-01-gemini.jpg?v=1
- Slide 2: /img/hero-redesign/slide-02-phone.jpg?v=1
- Slide 3: /img/hero-redesign/slide-03-phone.jpg?v=8
- Slide 4: /img/hero-redesign/slide-04-gemini.jpg?v=1
### Slide 1 config
- layout: ?
- featGrid: (default)
- featTone: cyan (default)
- bakedChrome: false
### Slide 1 config
- layout: factory
- featGrid: row4
- featTone: white
- bakedChrome: false
- title: ["Innovating the Future of", "Cleaning Manufacturing."]
- support: Manufactured in Bahrain. Ready to Supply Regionally.
### Slide 2 config
- layout: lab
- featGrid: grid2
- featTone: cyan (default)
- bakedChrome: false
- title: ["Quality You Can", "Rely On."]
- support: Every Formula Checked for\nPerformance and Consistency.
### Slide 3 config
- layout: pack
- featGrid: row4
- featTone: cyan (default)
- bakedChrome: false
- title: ["Flexible Packaging", "Solutions for", "Every Market."]
- support: From Industrial Bulk to Retail Packaging.
### Slide 4 config
- layout: env
- featGrid: row4
- featTone: cyan (default)
- bakedChrome: false
- title: ["Performance You Can See.", "Quality You Can Trust."]
- support: Cleaning Solutions Designed for Every Environment.

## Critical CSS blocks (exact current values)
### Slide1 photo
Selector: .hero-m--gemini.hero-m--factory .hero-m__gemini-photo
`css
top: -5%;
  bottom: auto;
  height: 105%;
  object-position: center top;
`

### Slide1 brand blur
Selector: .hero-m--gemini.hero-m--factory .hero-m__brand::before
`css
content: "";
  position: absolute;
  z-index: 0;
  left: 38%; /* bias to the left area only */
  top: 56%; /* a little more down */
  transform: translate(-50%, -50%);
  width: 130%;
  height: 170%;
  pointer-events: none;
  background: radial-gradient(
    ellipse 78% 80% at 38% 56%,
    rgba(6, 32, 78, 0.98) 0%,
    rgba(8, 40, 96, 0.92) 28%,
    rgba(10, 42, 94, 0.72) 52%,
    rgba(10, 42, 94, 0.32) 74%,
    transparent 100%
  );
  filter: blur(16px);
`

### Slide1 copy blur
Selector: .hero-m--gemini.hero-m--factory .hero-m__copy::before
`css
content: "";
  position: absolute;
  z-index: 0;
  left: 38%; /* bias to the left area only */
  top: 56%; /* a little more down */
  transform: translate(-50%, -50%);
  width: 130%;
  height: 170%;
  pointer-events: none;
  background: radial-gradient(
    ellipse 78% 80% at 38% 56%,
    rgba(6, 32, 78, 0.98) 0%,
    rgba(8, 40, 96, 0.92) 28%,
    rgba(10, 42, 94, 0.72) 52%,
    rgba(10, 42, 94, 0.32) 74%,
    transparent 100%
  );
  filter: blur(16px);
  /* Soft dissolve upward — top ~20% fades to transparent */
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.35) 12%,
    #000 28%,
    #000 100%
  );
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.35) 12%,
    #000 28%,
    #000 100%
  );
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
`

### Slide1 footer box
Selector: .hero-m--gemini.hero-m--factory .hero-m__feats
`css
/* Approved: 0 — not auto (auto stole flex space and shifted the text wash up) */
  margin-top: 0;
  flex: 0 0 auto;
  /* Tall enough to fully cover the gemini photo’s light floor strip */
  min-height: calc(230 * var(--hm-u));
  padding-top: calc(14 * var(--hm-u));
  padding-bottom: max(calc(18 * var(--hm-u)), env(safe-area-inset-bottom, 0px));
  padding-left: calc(4 * var(--hm-u));
  padding-right: calc(4 * var(--hm-u));
  background: #0b1a3c;
  border-top: 1.5px solid #00e5ff;
  z-index: 4;
  overflow: hidden;
  align-content: center;
`

### Slide1 feat cell
Selector: .hero-m--gemini.hero-m--factory .hero-m__feats--row .hero-m__feat
`css
gap: calc(8 * var(--hm-u));
  padding: calc(6 * var(--hm-u)) calc(4 * var(--hm-u));
  border-right: 1px solid rgba(255, 255, 255, 0.22);
  outline: none;
  box-shadow: none;
  overflow: hidden;
  min-width: 0;
`

### Slide1 feat text
Selector: .hero-m--gemini.hero-m--factory .hero-m__feat-text
`css
display: block;
  width: 100%;
  text-align: center;
  font-size: calc(18 * var(--hm-u));
  line-height: 1.15;
  overflow: hidden;
`

### Slide1 icon
Selector: .hero-m--gemini.hero-m--factory .hero-m__icon
`css
width: calc(48 * var(--hm-u));
  height: calc(48 * var(--hm-u));
  outline: none;
  overflow: visible;
`

### Slide1 title
Selector: .hero-m--gemini.hero-m--factory .hero-m__title
`css
position: relative;
  z-index: 1;
`

### Slide1 support
Selector: .hero-m--gemini.hero-m--factory .hero-m__support
`css
position: relative;
  z-index: 1;
`

### Slide2 wash
Selector: .hero-m--gemini.hero-m--lab .hero-m__wash-block::before
`css
content: "";
  position: absolute;
  z-index: 0;
  left: 50%;
  top: 42%;
  transform: translate(-50%, -50%);
  width: 130%;
  height: 170%;
  pointer-events: none;
  background: radial-gradient(
    ellipse 78% 80% at 50% 42%,
    rgba(10, 39, 86, 0.96) 0%,
    rgba(10, 39, 86, 0.88) 28%,
    rgba(10, 39, 86, 0.62) 52%,
    rgba(10, 39, 86, 0.28) 74%,
    transparent 100%
  );
  filter: blur(26px);
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.35) 12%,
    #000 28%,
    #000 100%
  );
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.35) 12%,
    #000 28%,
    #000 100%
  );
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
`

### Slide2 footer
Selector: .hero-m--gemini.hero-m--lab .hero-m__feats
`css
margin-top: auto;
  flex: 0 0 auto;
  /* Same navy as slides 1/3/4 — was mismatched #062a6b */
  min-height: calc(220 * var(--hm-u));
  width: 100%;
  padding-top: calc(10 * var(--hm-u));
  padding-bottom: max(calc(14 * var(--hm-u)), env(safe-area-inset-bottom, 0px));
  background: #0a2756;
  border-top: 1.5px solid rgba(34, 211, 245, 0.7);
  z-index: 4;
  box-sizing: border-box;
`

### Slide2 grid feat
Selector: .hero-m--gemini.hero-m--lab .hero-m__feats--grid .hero-m__feat
`css
gap: calc(14 * var(--hm-u));
  padding: calc(16 * var(--hm-u)) calc(22 * var(--hm-u));
  font-size: calc(24 * var(--hm-u));
  line-height: 1.15;
`

### Slide2 grid icon
Selector: .hero-m--gemini.hero-m--lab .hero-m__feats--grid .hero-m__icon
`css
width: calc(56 * var(--hm-u)); /* was shared grid 38 */
  height: calc(56 * var(--hm-u));
  stroke-width: 1.85;
`

### Slide2 title
Selector: .hero-m--gemini.hero-m--lab .hero-m__title
`css
position: relative;
  z-index: 1;
`

### Slide2 support
Selector: .hero-m--gemini.hero-m--lab .hero-m__support
`css
position: relative;
  z-index: 1;
`

### Slide3 pack root
Selector: .hero-m--gemini.hero-m--pack
`css
background: #003062; /* exact upper photo blue */
`

### Slide3 photo
Selector: .hero-m--gemini.hero-m--pack .hero-m__gemini-photo
`css
object-fit: contain;
  object-position: center center;
`

### Slide3 logo blend
Selector: .hero-m--gemini.hero-m--pack .hero-m__brand::before
`css
content: "";
  position: absolute;
  z-index: 0;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  width: 140%;
  height: 180%;
  pointer-events: none;
  background: radial-gradient(
    ellipse 80% 75% at 50% 40%,
    rgba(0, 48, 98, 0.55) 0%,
    rgba(0, 48, 98, 0.35) 35%,
    rgba(0, 47, 93, 0.18) 60%,
    transparent 100%
  );
  filter: blur(22px);
`

### Slide3 footer
Selector: .hero-m--gemini.hero-m--pack .hero-m__feats
`css
margin-top: auto;
  flex: 0 0 auto;
  height: auto;
  min-height: calc(295 * var(--hm-u));
  max-height: none;
  padding-top: calc(20 * var(--hm-u));
  padding-bottom: max(calc(24 * var(--hm-u)), env(safe-area-inset-bottom, 0px));
  padding-left: calc(6 * var(--hm-u));
  padding-right: calc(6 * var(--hm-u));
  box-sizing: border-box;
  align-content: center;
  overflow: hidden;
  background: #0a2756; /* same as slide 4 */
  border-top: 1.5px solid rgba(34, 211, 245, 0.7);
  z-index: 4;
`

### Slide3 feat cell
Selector: .hero-m--gemini.hero-m--pack .hero-m__feats--row .hero-m__feat
`css
gap: calc(3 * var(--hm-u));
  padding: 0 calc(4 * var(--hm-u));
  font-size: calc(15 * var(--hm-u));
  line-height: 1.12;
  border-right: 1px solid rgba(255, 255, 255, 0.25);
  outline: none;
  box-shadow: none;
  overflow: hidden;
  min-width: 0;
  justify-content: center;
  transform: none;
`

### Slide3 feat text
Selector: .hero-m--gemini.hero-m--pack .hero-m__feat-text
`css
display: block;
  width: 100%;
  text-align: center;
  font-size: calc(15 * var(--hm-u));
  line-height: 1.12;
  overflow: hidden;
`

### Slide3 icon
Selector: .hero-m--gemini.hero-m--pack .hero-m__icon
`css
width: calc(48 * var(--hm-u));
  height: calc(48 * var(--hm-u));
`

### Slide3 title
Selector: .hero-m--gemini.hero-m--pack .hero-m__title
`css
/* Phone-fit: smaller so 3 lines stay inside the frame */
  font-size: calc(44 * var(--hm-u));
  line-height: 1.12;
  max-width: none;
  width: max-content;
`

### Slide3 support
Selector: .hero-m--gemini.hero-m--pack .hero-m__support
`css
font-size: calc(19 * var(--hm-u));
  /* Keep "Retail Packaging" on one line */
  max-width: none;
  width: max-content;
  white-space: nowrap;
`

### Slide4 photo
Selector: .hero-m--gemini.hero-m--env .hero-m__gemini-photo
`css
object-position: center top;
`

### Slide4 footer
Selector: .hero-m--gemini.hero-m--env .hero-m__feats
`css
/* Slightly taller than slide 1 blue box */
  margin-top: auto;
  flex: 0 0 auto;
  height: auto;
  min-height: calc(218 * var(--hm-u));
  max-height: none;
  padding-top: calc(14 * var(--hm-u));
  padding-bottom: max(calc(18 * var(--hm-u)), env(safe-area-inset-bottom, 0px));
  padding-left: calc(6 * var(--hm-u));
  padding-right: calc(6 * var(--hm-u));
  box-sizing: border-box;
  align-content: center;
  overflow: hidden;
  background: #0a2756;
  border-top: 1.5px solid rgba(34, 211, 245, 0.7);
  z-index: 4;
`

### Slide4 feat
Selector: .hero-m--gemini.hero-m--env .hero-m__feat
`css
/* Slightly taller than slide 1 blue box */
  margin-top: auto;
  flex: 0 0 auto;
  height: auto;
  min-height: calc(218 * var(--hm-u));
  max-height: none;
  padding-top: calc(14 * var(--hm-u));
  padding-bottom: max(calc(18 * var(--hm-u)), env(safe-area-inset-bottom, 0px));
  padding-left: calc(6 * var(--hm-u));
  padding-right: calc(6 * var(--hm-u));
  box-sizing: border-box;
  align-content: center;
  overflow: hidden;
  background: #0a2756;
  border-top: 1.5px solid rgba(34, 211, 245, 0.7);
  z-index: 4;
`

### Slide4 icon
Selector: .hero-m--gemini.hero-m--env .hero-m__icon
`css
width: calc(48 * var(--hm-u));
  height: calc(48 * var(--hm-u));
`

### Slide4 title
Selector: .hero-m--gemini.hero-m--env .hero-m__title
`css
font-size: calc(42 * var(--hm-u));
  line-height: 1.14;
  text-align: center;
`

### Slide4 support
Selector: .hero-m--gemini.hero-m--env .hero-m__support
`css
font-size: calc(22 * var(--hm-u));
  text-align: center;
`

### Shared gemini photo
Selector: .hero-m__gemini-photo
`css
position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  /* Assets are pre-cropped to iPhone 16 Pro Max / Pixel-tall ratio (1320×2868) */
  object-fit: cover;
  object-position: center center;
  display: block;
  z-index: 1;
`

### Slide3 logo blend (logo-only variant)
`css
content: "";
  position: absolute;
  z-index: 0;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  width: 140%;
  height: 180%;
  pointer-events: none;
  background: radial-gradient(
    ellipse 80% 75% at 50% 40%,
    rgba(0, 48, 98, 0.55) 0%,
    rgba(0, 48, 98, 0.35) 35%,
    rgba(0, 47, 93, 0.18) 60%,
    transparent 100%
  );
  filter: blur(22px);
`