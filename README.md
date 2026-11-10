# WAED Industrial — Website (waed 2)

High-motion marketing site for **WAED Industrial Innovation Company W.L.L**.

## Run locally

```bash
cd site
npm install
npm run dev
```

Open http://127.0.0.1:5173/waed-industrial-site/

## Builds

### GitHub Pages style (default base `/waed-industrial-site/`)

```bash
npm run build
```

Output: `site/dist/`

### Bluehost (root domain + PHP enquiry)

```bash
npm run build:bluehost
```

Uses [`.env.bluehost`](./.env.bluehost) (`VITE_BASE=/`, `VITE_ENQUIRY_ENDPOINT=/send-enquiry.php`) and writes to `../bluehost/`, then runs `prepare-bluehost.mjs`.

Contact form posts to `send-enquiry.php` on Bluehost. Without that env var, the form falls back to `mailto:`.

## Stack

Vite + React + TypeScript, GSAP, Lenis. Brand palette: Navy `#1D2D44`, Steel `#3E5C77`, Sand `#DBD7CD`.
