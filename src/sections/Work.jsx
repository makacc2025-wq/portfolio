/* ══════════════════════════════════════════════════════════════════════════
   Work.jsx

   Two card fans — Shopify, then WordPress. Each is a header row (label on
   the left, controls on the right) over a stack of cards that sweeps
   sideways. Drag, arrows, or wait for the auto-advance.

   In this file, top to bottom:
     1. content (projects)
     2. injected CSS
     3. ProjectCard
     4. Fan
     5. Work section (main export)
   ══════════════════════════════════════════════════════════════════════════ */

import { useEffect, useRef, useState } from 'react';
import { Icon, Reveal, SplitHeading, Accent, injectCss } from '../shared';

/* ═══ Content ═══════════════════════════════════════════════════════════
   Keep `blurb` to one line — it sits on a 350px card. Anything longer
   wraps to three lines and pushes the tags out of the card.              */

const shopifyProjects = [
  {
    title: 'Custom Theme Design',
    blurb: 'Crafted a custom Shopify theme with personalized T-shirt designs and an integrated music system, delivering a unique brand experience.',
    result: 'Custom Shopify Experience',
    image: '/MIRΛI.png',
    type: 'SHOPIFY · CUSTOM DESIGN',
    icon: 'shopify',
    tags: ['Shopify', 'T-Shirt Design', 'Music System', 'Responsive'],
    href: 'https://mirailabstore.com',
  },
  {
    title: 'Prestige Theme Design',
    blurb: 'Built a luxury Shopify storefront using the Prestige theme, featuring premium product presentation and a seamless shopping experience. Developed a complex custom bundle system using Liquid code to deliver tailored bundle functionality.',
    image: '/Prestige_Theme_Design_Showcase.png',
    type: 'SHOPIFY · PREMIUM THEME',
    icon: 'shopify',
    tags: ['Prestige Theme', 'Custom Liquid', 'Bundle System', 'Subscriptions', 'Responsive Design'],
    href: 'https://riosense.com',
  },
  {
    title: 'Storefronts built around the brand, not the template.',
    blurb: 'An animated entrance for a luxury weaves label — a wardrobe that opens on tap to reveal its contents only as shadows. Turns Shopify’s password page into a first-access waitlist.',
    image: '/Luxury-E-Commerce-Showcase.png',
    type: 'SHOPIFY · LUXURY',
    tags: ['Shopify Liquid', 'Motion Design', 'Email Capture', 'Luxury UX'],
    href: '#',
  },
  {
    title: 'Cafe order-ahead menu',
    blurb: 'A coffee menu rebuilt as a storefront. Size, hot or iced, and nine tea add-ins chosen without leaving the grid.',
    result: 'Custom Product Add-ons',
    image: '/The_Honeypot_Coffee_Shop_Showcase.png',
    type: 'Shopify · Custom Design',
    tags: ['Shopify', 'Liquid', 'Metafields', 'Add-ons', 'Pickup'],
    href: 'https://cq3kjk-w4.myshopify.com',
  },
];

const wordpressProjects = [
  {
    title: 'Modern business website',
    blurb: 'Custom blocks for team, case studies and testimonials, put together so the client can add a page without calling anyone.',
    result: 'First page for eight target terms',
    image: '/wordpress-business-preview.svg',
    type: 'WordPress · Business',
    tags: ['Gutenberg', 'Schema', 'SEO', 'ACF'],
    href: '#',
  },
  {
    title: 'WooCommerce store',
    blurb: 'Multi-vendor marketplace with custom payment gateways, bulk import tooling and subscription products.',
    result: '500+ products across 15k customers',
    image: '/woocommerce-store-preview.svg',
    type: 'WordPress · WooCommerce',
    tags: ['WooCommerce', 'PHP', 'Gateways', 'Subs'],
    href: '#',
  },
  {
    title: 'Creative portfolio',
    blurb: 'Filterable case studies and animated galleries on a custom child theme, built to survive the client adding work to it.',
    result: 'Enquiries up 156%',
    image: '/wordpress-portfolio-preview.svg',
    type: 'WordPress · Portfolio',
    tags: ['Child theme', 'Filters', 'Motion', 'CPT'],
    href: '#',
  },
  {
    title: 'Custom plugin platform',
    blurb: 'Four plugins handling team workflow, client records and automated reporting, wired to the CRM they already used.',
    result: 'Saves 20+ hours a month per client',
    image: '/wordpress-plugin-preview.svg',
    type: 'WordPress · Custom Plugin',
    tags: ['PHP', 'REST API', 'CRM', 'Cron'],
    href: '#',
  },
];

/* ═══ CSS ═══════════════════════════════════════════════════════════════
   Every size the fan depends on is a custom property on the container, so
   the breakpoints at the bottom retune the whole thing without touching JS.
   Do not use backticks in these comments — they close the template literal. */

injectCss('work-fan', `
  @layer components {
    .work-block + .work-block { margin-top: clamp(56px, 7vw, 96px); }

    .work-head {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 20px 32px;
      flex-wrap: wrap;
      margin-bottom: clamp(22px, 3vw, 34px);
    }

    .work-head__desc {
      margin: 10px 0 0;
      max-width: 46ch;
      font-size: 15px;
      line-height: 1.7;
      color: var(--c-text-secondary);
    }

    .work-fan {
      --card-w: 330px;   /* fixed card footprint */
      --card-h: 450px;
      --fan-x: 175px;    /* horizontal offset per card behind the front */
      --fan-z: -35px;    /* depth offset per card */
      position: relative;
      width: calc(var(--card-w) + (var(--fan-x) * 3));
      max-width: 100%;
      height: var(--card-h);
      margin-inline: auto;
      perspective: 1200px;
    }

    .work-stage {
      cursor: grab;
      overflow-x: clip;
      overflow-y: visible;
    }
    .work-stage:active { cursor: grabbing; }

    .work-card {
      position: absolute;
      left: 0; top: 0;
      width: var(--card-w);
      max-width: 100%;
      height: var(--card-h);
      display: flex;
      flex-direction: column;
      border-radius: 24px;
      background: var(--c-paper);
      color: var(--c-paper-ink);
      padding: 12px;
      box-shadow: 0 25px 55px rgba(0, 0, 0, .28);
      transform-origin: 50% 85%;
      overflow: hidden;
      user-select: none;
      transition: transform var(--dur-4) var(--ease-out-expo),
                  opacity .65s ease,
                  filter .65s ease;
    }

    /* fan positions, driven by the vars above rather than hard-coded px */
    .work-card.pos-0 { transform: translate3d(0, 0, 0) scale(1); z-index: 5; }
    .work-card.pos-1 { transform: translate3d(var(--fan-x), 0, var(--fan-z)) scale(.98); z-index: 4; filter: saturate(.9); }
    .work-card.pos-2 { transform: translate3d(calc(var(--fan-x) * 2), 0, calc(var(--fan-z) * 2)) scale(.96); z-index: 3; filter: saturate(.82); }
    .work-card.pos-3 { transform: translate3d(calc(var(--fan-x) * 3), 0, calc(var(--fan-z) * 3)) scale(.94); z-index: 2; filter: saturate(.75); }
    .work-card.pos-hidden {
      transform: translate3d(calc(var(--fan-x) * 4), 0, calc(var(--fan-z) * 4)) scale(.9);
      z-index: 1; opacity: 0; pointer-events: none;
    }

    .work-card.exit {
      z-index: 10;
      opacity: 0;
      transform: translate3d(-115%, 45px, 60px) rotate(-17deg) scale(.9);
      transition: transform var(--dur-4) var(--ease-exit), opacity var(--dur-3) ease;
    }

    /* ratio, not a fixed height — a px height flattens the crop as the
       card narrows. 350 x 220 is the desktop proportion. */
    .work-card__img {
      flex: none;
      aspect-ratio: 330 / 196;
      border-radius: 18px;
      overflow: hidden;
      position: relative;
      background: var(--c-paper-media);
    }
    .work-card__img img {
      height: 100%; width: 100%;
      object-fit: cover;
      display: block;
      transition: transform var(--dur-4);
    }
    .work-card:hover .work-card__img img { transform: scale(1.06); }

    .work-card__type {
      position: absolute;
      z-index: 1;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      left: 14px; top: 14px;
      border-radius: 999px;
      padding: 8px 11px;
      background: rgba(6, 61, 45, .92);
      color: var(--c-paper-badge);
      font-size: 10px;
      letter-spacing: .12em;
      font-weight: 800;
      text-transform: uppercase;
      backdrop-filter: blur(8px);
    }

    .work-card__body {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 14px 12px 10px;
      min-height: 0;
    }

    .work-card__title {
      font-size: clamp(17px, 1.6vw, 22px);
      letter-spacing: -.02em;
      margin: 0;
      font-weight: 700;
      color: var(--c-paper-ink);
      line-height: 1.3;
    }

    .work-card__blurb {
      font-size: 13px;
      line-height: 1.5;
      color: var(--c-paper-ink-2);
      margin: 7px 0 0;
      /* 2-3 lines; anything longer is clipped rather than pushing the
         foot out of a fixed-height card */
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* the outcome reads as data, not prose: mono, accent, set off by a rule */
    .work-card__result {
      margin: 10px 0 0;
      padding-top: 10px;
      border-top: 1px solid rgba(6, 61, 45, .12);
      font-family: var(--font-mono);
      font-size: 12px;
      letter-spacing: .01em;
      line-height: 1.5;
      color: var(--c-paper-link);
    }

    /* margin-top auto pins this to the bottom whatever the copy does */
    .work-card__foot {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 10px;
      margin-top: auto;
      padding-top: 12px;
    }

    /* 3-4 keywords, sized to sit two per row on a 330px card */
    .work-card__tags { display: flex; gap: 6px; flex-wrap: wrap; }
    .work-card__tags span {
      font-size: 11px;
      color: var(--c-paper-ink);
      background: rgba(91, 228, 155, .2);
      border-radius: 6px;
      padding: 5px 9px;
      font-weight: 600;
      white-space: nowrap;
    }

    .work-card__link {
      color: var(--c-paper-link);
      text-decoration: none;
      font-size: 13px;
      font-weight: 700;
      white-space: nowrap;
    }
    .work-card__link:hover { text-decoration: underline; }

    .work-nav { display: flex; align-items: center; gap: 14px; }
    .work-nav button { transition: border-color var(--dur-2) ease, color var(--dur-2) ease, transform var(--dur-2) ease; }
    .work-nav button:hover { transform: translateY(-2px); }

    .work-progress {
      width: 72px;
      height: 3px;
      overflow: hidden;
      border-radius: 999px;
      background: var(--c-line);
    }
    .work-progress__fill {
      display: block;
      width: 100%;
      height: 100%;
      transform: scaleX(0);
      transform-origin: left center;
      background: var(--c-accent-soft);
      animation: work-progress var(--work-delay) linear forwards;
    }
    .work-block[data-paused="true"] .work-progress__fill { animation-play-state: paused; }
    @keyframes work-progress { to { transform: scaleX(1); } }

    /* ── responsive ────────────────────────────────────────────────── */

    @media (max-width: 1100px) {
      .work-fan { --fan-x: 130px; }
    }

    @media (max-width: 860px) {
      .work-fan { --fan-x: 64px; --fan-z: -26px; }
    }

    @media (max-width: 640px) {
      .work-fan {
        /* card + 3 fan steps must stay inside the gutter, capped so a
           640px device does not get a 520px card */
        --card-w: min(330px, calc(100% - (var(--fan-x) * 3)));
        --fan-x: 18px;
        --fan-z: -16px;
        --card-h: 444px;
      }
      .work-card { border-radius: 18px; padding: 9px; }
      .work-card__img { border-radius: 13px; }
      .work-card__type { font-size: 9px; padding: 6px 9px; left: 10px; top: 10px; }
      .work-card__body { padding: 13px 10px 10px; }
      .work-head { gap: 16px; align-items: flex-start; }
      .work-head__desc { font-size: 14px; max-width: none; }
    }

    /* below 480 the blurb goes and the result stays — the number is the
       part worth reading on a 300px card */
    @media (max-width: 480px) {
      /* the card only starts shrinking below ~432px, so the height tracks
         the viewport from there down */
      .work-fan { --card-h: clamp(316px, 98vw, 376px); }
      .work-card__blurb { display: none; }
      .work-card__result { margin-top: 11px; }
    }

    @media (max-width: 380px) {
      .work-fan { --fan-x: 13px; }
      .work-card__tags span { font-size: 11px; padding: 5px 9px; }
    }

    @media (prefers-reduced-motion: reduce) {
      .work-card { transition: none; }
      .work-card.exit { transition: opacity var(--dur-2) ease; }
      .work-progress__fill { animation: none; transform: scaleX(1); }
    }
  }
`);

/* ═══ ProjectCard ═══════════════════════════════════════════════════════ */

const ProjectCard = ({ project, position, isExiting, onBringToFront }) => (
  <article
    className={`work-card pos-${position} ${isExiting ? 'exit' : ''}`}
    tabIndex={0}
    aria-label={`${project.title}. Select to bring this project to the front.`}
    onClick={event => {
      if (!event.target.closest('a, button')) onBringToFront();
    }}
    onKeyDown={event => {
      if (event.target !== event.currentTarget) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onBringToFront();
      }
    }}
  >
    <div className="work-card__img">
      <span className="work-card__type">
        {project.icon && <Icon name={project.icon} className="size-[14px] flex-none" />}
        {project.type}
      </span>
      <img
        src={project.image}
        alt=""
        loading={project.image.startsWith('/') ? 'eager' : 'lazy'}
      />
    </div>

    <div className="work-card__body">
      <h3 className="work-card__title">{project.title}</h3>
      <p className="work-card__blurb">{project.blurb}</p>

      {project.result && (
        <p className="work-card__result">{project.result}</p>
      )}

      <div className="work-card__foot">
        <div className="work-card__tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <a
          className="work-card__link"
          href={project.href}
          target={project.href.startsWith('https://') ? '_blank' : undefined}
          rel={project.href.startsWith('https://') ? 'noreferrer' : undefined}
        >
          View &#8599;
        </a>
      </div>
    </div>
  </article>
);

/* ═══ Fan ═══════════════════════════════════════════════════════════════ */

const Fan = ({ projects, label, description, delay = 3000 }) => {
  const [order, setOrder] = useState(() => projects.map((_, i) => i));
  const orderRef = useRef(order);
  const [exiting, setExiting] = useState(-1);
  const [progressRun, setProgressRun] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);
  const advanceTimer = useRef(null);
  const remaining = useRef(delay);
  const deadline = useRef(0);
  const drag = useRef(null);
  const suppressClick = useRef(false);
  const suppressClickTimer = useRef(null);
  const hovered = useRef(false);
  const reduceMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const position = (i) => {
    const slot = order.indexOf(i);
    return slot < 4 ? slot : 'hidden';
  };

  const changeOrder = (update) => {
    const nextOrder = update(orderRef.current);
    orderRef.current = nextOrder;
    setOrder(nextOrder);
  };

  const next = (onComplete) => {
    if (advanceTimer.current) return;
    setExiting(orderRef.current[0]);
    advanceTimer.current = setTimeout(() => {
      changeOrder((current) => [...current.slice(1), current[0]]);
      setExiting(-1);
      advanceTimer.current = null;
      onComplete?.();
    }, 700);
  };

  const prev = () => changeOrder((current) => [current[current.length - 1], ...current.slice(0, -1)]);

  const play = () => {
    clearTimeout(timer.current);
    if (hovered.current || drag.current !== null || reduceMotion.current) return;
    setPaused(false);
    deadline.current = Date.now() + remaining.current;
    timer.current = setTimeout(() => {
      timer.current = null;
      next(() => {
        remaining.current = delay;
        setProgressRun((run) => run + 1);
        play();
      });
    }, remaining.current);
  };
  const pause = () => {
    if (timer.current !== null) {
      remaining.current = Math.max(0, deadline.current - Date.now());
    }
    clearTimeout(timer.current);
    timer.current = null;
    setPaused(true);
  };

  useEffect(() => {
    remaining.current = delay;
    if (reduceMotion.current) return;
    play();
    return () => {
      clearTimeout(timer.current);
      clearTimeout(advanceTimer.current);
      clearTimeout(suppressClickTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);

  /* Pointer input shares one swipe threshold across mouse and touch. */
  const DRAG_MIN = 50;
  const start = (x) => {
    clearTimeout(suppressClickTimer.current);
    suppressClick.current = false;
    drag.current = x;
    pause();
  };
  const cancelDrag = () => {
    drag.current = null;
    remaining.current = delay;
    setProgressRun((run) => run + 1);
    play();
  };
  const end = (x) => {
    if (drag.current === null) return;
    const moved = drag.current - x;
    drag.current = null;
    if (Math.abs(moved) > DRAG_MIN && moved > 0) {
      suppressClick.current = true;
      clearTimeout(suppressClickTimer.current);
      suppressClickTimer.current = setTimeout(() => { suppressClick.current = false; }, 500);
      remaining.current = delay;
      next(() => {
        setProgressRun((run) => run + 1);
        play();
      });
      return;
    }
    if (Math.abs(moved) > DRAG_MIN) {
      suppressClick.current = true;
      clearTimeout(suppressClickTimer.current);
      suppressClickTimer.current = setTimeout(() => { suppressClick.current = false; }, 500);
      prev();
    }
    remaining.current = delay;
    setProgressRun((run) => run + 1);
    play();
  };

  const stepNext = () => {
    pause();
    remaining.current = delay;
    next(() => {
      setProgressRun((run) => run + 1);
      play();
    });
  };
  const stepPrev = () => {
    pause();
    prev();
    remaining.current = delay;
    setProgressRun((run) => run + 1);
    play();
  };
  const bringToFront = (index) => {
    if (suppressClick.current) {
      suppressClick.current = false;
      clearTimeout(suppressClickTimer.current);
      return;
    }
    pause();
    clearTimeout(advanceTimer.current);
    advanceTimer.current = null;
    setExiting(-1);
    changeOrder((current) => [index, ...current.filter((item) => item !== index)]);
    remaining.current = delay;
    setProgressRun((run) => run + 1);
    play();
  };
  const shown = order[0] + 1;

  return (
    <div
      className="work-block"
      data-paused={paused ? 'true' : undefined}
      style={{ '--work-delay': `${delay}ms` }}
    >
      <div className="work-head">
        <div>
          <p className="label flex items-center gap-3">
            <span style={{ width: 28, height: 1, background: 'var(--c-accent-soft)' }} />
            {label}
          </p>
          {description && <p className="work-head__desc">{description}</p>}
        </div>

        <div className="work-nav">
          <button
            type="button"
            onClick={stepPrev}
            aria-label="Previous project"
            className="grid size-10 place-items-center rounded-full border border-line text-muted"
          >
            &#8592;
          </button>
          <button
            type="button"
            onClick={stepNext}
            aria-label="Next project"
            className="grid size-10 place-items-center rounded-full border border-line text-muted"
          >
            &#8594;
          </button>

          <div className="work-progress" aria-hidden="true">
            <span key={progressRun} className="work-progress__fill" />
          </div>

          <span className="font-mono text-[12px] text-faint">
            {String(shown).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      <div
        className="work-stage"
        onMouseEnter={() => {
          hovered.current = true;
          pause();
        }}
        onMouseLeave={() => {
          hovered.current = false;
          play();
        }}
        onPointerDown={(e) => {
          if (e.pointerType === 'mouse' && e.button !== 0) return;
          start(e.clientX);
        }}
        onPointerUp={(e) => end(e.clientX)}
        onPointerCancel={cancelDrag}
        style={{ userSelect: 'none', touchAction: 'pan-y' }}
      >
        <div className="work-fan">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              position={position(i)}
              isExiting={exiting === i}
              onBringToFront={() => bringToFront(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ═══ Work ══════════════════════════════════════════════════════════════ */

export function Work() {
  return (
    <section id="work" className="relative bg-surface py-section">
      <div className="mx-auto w-full max-w-site px-gutter">
        <Reveal className="mb-[clamp(36px,5vw,68px)]">
          <SplitHeading className="text-step-3">
            <Accent className="text-link">Shopify</Accent> &amp; WordPress work
          </SplitHeading>

          <p className="mt-6 max-w-[54ch] text-[16px] leading-[1.8] text-secondary">
            Storefronts that had to sell, and sites that had to keep working long
            after launch. Here is a selection from both platforms, with the
            problem each one was built to solve.
          </p>
        </Reveal>

        <Fan
          projects={shopifyProjects}
          label="Shopify · 200+ live stores"
          description="Custom themes, speed work and private apps, built on Liquid and OS 2.0."
        />

        <Fan
          projects={wordpressProjects}
          label="WordPress · 200+ custom sites"
          description="Bespoke plugins, WooCommerce builds and design systems a client can run themselves."
        />
      </div>
    </section>
  );
}

export default Work;