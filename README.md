# JOTECH Website

Modern, high-performance marketing site for JOTECH — a B2B web agency focused on design, narrative, and technical delivery.

Built from the original `jotech.html` prototype, split into modular CSS and vanilla JavaScript components with [Vite](https://vitejs.dev/) for fast development and optimized production builds.

## Project structure

```
├── index.html              # Entry HTML shell
├── jotech.html             # Original single-file prototype (reference)
├── src/
│   ├── main.js             # App bootstrap
│   ├── app.js              # Composes all sections
│   ├── data/               # Content & configuration
│   ├── components/         # Section render functions
│   ├── js/                 # Animation & interaction modules
│   ├── styles/             # Modular CSS
│   │   ├── base/           # Variables, reset, typography
│   │   ├── components/     # One file per UI section
│   │   └── utilities/      # Animations, responsive rules
│   └── utils/              # Shared helpers
```

## Commands

```bash
npm install
npm run dev      # Local dev server
npm run build    # Production build → dist/
npm run preview  # Preview production build
```

## Editing content

Update copy and structure in `src/data/` — no need to touch component markup unless layout changes:

- `hero.js` — headline, subtitles
- `services.js` — service offerings
- `work.js` — portfolio cards
- `metrics.js` — stats
- `navigation.js` — nav & footer links
- `site.js` — global URLs and branding

## Performance notes

- Zero framework runtime — vanilla ES modules only
- CSS split by component for maintainability; Vite bundles and minifies for production
- Passive scroll listeners, `IntersectionObserver` for reveals and counters
- Web Animations API for hero entrance (GPU-friendly transforms)
