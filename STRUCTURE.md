# Project structure

33 source files became 13. Everything for one section now lives in one file.

```
src/
  main.jsx        entry point, the page order, smooth scrolling
  index.css       colours and tokens (edit colours here) + the few styles shared by all sections
  content.js      your name, email, links, menu: the facts used in more than one place
  shared.jsx      Icon, Reveal, SplitHeading, useMediaQuery, injectCss
  sections/
    Header.jsx  Hero.jsx  Work.jsx  Services.jsx  About.jsx  Contact.jsx  Footer.jsx
  vendor/
    Lanyard.jsx  FolderFloat.jsx      <- React Bits code. Paste updates here, do not restyle.
```

## How a section file is laid out (top to bottom)

1. a table of contents
2. imports
3. **content**: the words for that section (edit text here)
4. **the component**: the markup you see on the page
5. helper components
6. **behaviour**: hooks (animations, physics, canvas). Rarely edited.
7. **styles**: that section's own CSS

## Where do I edit...

| I want to change | Open |
|---|---|
| my name, email, social links, the menu | `content.js` |
| the hero stats and the folder tags | `sections/Hero.jsx` (content block at the top) |
| the hero headline and paragraph | `sections/Hero.jsx`, in the Hero component (search for the words) |
| the role line, tagline, "Team lead" badge, quote | `content.js` (`profile`) |
| a service card or its bullets | `sections/Services.jsx` (content at the top) |
| a project in Work | `sections/Work.jsx` (content at the top) |
| a colour in either theme | `index.css` |
| how the Services cards look | bottom of `sections/Services.jsx` |
| how fast the cards hover | `MOVE_K` in the `useCardFan` block of `sections/Services.jsx` |

## Old file to new file

| Old | New |
|---|---|
| `components/Icon.jsx` | `shared.jsx` |
| `components/Reveal.jsx` | `shared.jsx` |
| `components/SplitHeading.jsx` | `shared.jsx` |
| `hooks/useMediaQuery.js` | `shared.jsx` |
| `hooks/useTheme.js` | `sections/Header.jsx` |
| `components/ThemeToggle.jsx` | `sections/Header.jsx` |
| `hooks/useActiveSection.js` | `sections/Header.jsx` |
| `hooks/useBodyScrollLock.js` | `sections/Header.jsx` |
| `components/Header.jsx` | `sections/Header.jsx` |
| `components/Counter.jsx` | `sections/Hero.jsx` |
| `hooks/useAurora.js` | `sections/Hero.jsx` |
| `components/Hero.jsx` | `sections/Hero.jsx` |
| `data/site.js → stats` | `sections/Hero.jsx (top of file)` |
| `data/site.js → heroPlatforms` | `sections/Hero.jsx (top of file)` |
| `components/Work.jsx` | `sections/Work.jsx` |
| `data/site.js → projects` | `sections/Work.jsx (top of file)` |
| `hooks/useCardFan.js` | `sections/Services.jsx` |
| `components/Services.jsx` | `sections/Services.jsx` |
| `data/site.js → servicesIntro` | `sections/Services.jsx (top of file)` |
| `data/site.js → serviceScenes` | `sections/Services.jsx (top of file)` |
| `components/About.jsx` | `sections/About.jsx` |
| `components/Contact.jsx` | `sections/Contact.jsx` |
| `hooks/useClock.js` | `sections/Footer.jsx` |
| `hooks/useCopy.js` | `sections/Footer.jsx` |
| `hooks/useCursorGlow.js` | `sections/Footer.jsx` |
| `hooks/useLiquidField.js` | `sections/Footer.jsx` |
| `hooks/useWordmarkFit.js` | `sections/Footer.jsx` |
| `hooks/useWordmarkReveal.js` | `sections/Footer.jsx` |
| `components/Footer.jsx` | `sections/Footer.jsx` |
| `components/Lanyard.jsx` | `vendor/Lanyard.jsx` |
| `components/FolderFloat.jsx` | `vendor/FolderFloat.jsx` |
| `data/site.js → profile, nav` | `content.js` |
| `App.jsx, main.jsx, hooks/useLenis.js` | `main.jsx` |
| `styles/theme.css + shared part of styles/app.css` | `index.css` |
| `styles/app.css → hero / header / services / footer rules` | `inside each section file (bottom)` |
| `hooks/useScrollProgress.js` | `DELETED — nothing used it` |
| `data/site.js → platforms, aboutPoints, stack` | `DELETED — nothing used them` |

## Applying it to your project

1. **Back up first** (copy the project folder, or `git commit`).
2. Delete your `src/` folder and put this `src/` in its place. Do not touch `public/`, `index.html`, `package.json` or `vite.config.js`.
3. Open `content.js` and put your real email, links and resume path into `profile`. It holds placeholders.
4. `npm install` then `npm run dev`.

## Things worth knowing

- **Section CSS is plain CSS inside the JS file.** A tiny helper (`injectCss` in `shared.jsx`) puts it in the page head, in the same cascade layer as before. To use a normal `.css` file instead: cut the text out of the backticks, save it as `Hero.css`, and `import "./Hero.css"` at the top of the section.
- **Keyframe names must not match Tailwind's built-ins** (`ping`, `spin`, `pulse`, `bounce`). Tailwind injects its own over yours. The status dot's keyframes are called `dot-ping` for this reason.
- **Adding a section:** create `sections/Name.jsx` exporting `Name`, then add it to the list in `main.jsx`.
- **Delivery going forward:** a change to one section means replacing one file.
