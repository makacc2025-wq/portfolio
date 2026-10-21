# Towker Ahmmed Joy — portfolio (React)

React 18 + Vite. No UI framework, no CSS-in-JS — the stylesheets are the
same ones from the static build, imported once in `main.jsx`.

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # → dist/
npm run preview    # serve the build
```

Deploy `dist/` to any static host. `base: "./"` in `vite.config.js` means
the build also works from a subfolder or opened off disk.

## Structure

```
src/
├── main.jsx                entry: mounts App, imports the stylesheets in order
├── App.jsx                 page composition
├── data/site.js            ALL content — profile, nav, projects, services, stack
├── components/
│   ├── Header.jsx          capsule bar, travelling pill, progress, mobile panel
│   ├── Hero.jsx            runs the Liquid field hot
│   ├── Work.jsx            maps over projects
│   ├── Services.jsx        maps over services
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx          wordmark, clock, copy button, Liquid field quiet
│   └── Icon.jsx            every SVG in one place
├── hooks/
│   ├── useLiquidField.js   the canvas effect
│   ├── useCursorGlow.js    the halo
│   ├── useReveal.js        scroll entrances
│   ├── useScrollProgress.js
│   ├── useActiveSection.js
│   ├── useWordmarkFit.js
│   ├── useWordmarkReveal.js
│   ├── useClock.js
│   ├── useCopy.js
│   └── useBodyScrollLock.js
└── styles/                 tokens → base → layout → components → sections
```

## The one rule that matters here

**Animation never touches React state.** The Liquid field writes to a canvas
at 60fps and the cursor glow writes CSS custom properties on pointer move.
Routing either through `useState` would re-render the tree on every frame or
every mouse movement. React owns the elements; the effects own the pixels.

State is used only where values change a few times per page: the active
section, whether the mobile panel is open, the clock, the copied flag.

## Editing content

Everything you will actually change lives in `src/data/site.js` — your name,
email, status, projects, services, stack. No JSX edits needed to add a
project or rename a nav item.

Still to replace: `hello@joy.dev`, the social links, `public/resume.pdf`,
and an `#experience` section (the nav link already points at it and
tolerates it being missing).

## Notes carried over from the static build

- The wordmark is measured and scaled at runtime; a fixed `clamp()` is only
  ever right for one string length.
- Its reveal watches the footer, not itself — the resting `clip-path` would
  otherwise stop it ever reporting as intersecting.
- `overflow-x: clip` sits on both `html` and `body`; on body alone the root
  still scrolls sideways.
- On phones the capsule drops `backdrop-filter`, because a filtered element
  becomes the containing block for any fixed descendant and would trap the
  menu panel inside the 62px bar.
