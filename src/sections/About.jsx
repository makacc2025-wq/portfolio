/* ══════════════════════════════════════════════════════════════════════════
   About.jsx

   Everything for this section: the story, the Maktech panel and the 3D lanyard card.

   In this file, top to bottom:
     1. About
   ══════════════════════════════════════════════════════════════════════════ */

import { Icon, Reveal, RevealItem, SplitHeading, useMediaQuery } from "../shared";
import Lanyard from "../vendor/Lanyard";

/* ═══ About — the section  ·  was components/About.jsx ═════════════════════ */
/* Move this into data/site.js if you like. */
const company = {
  name: "Maktech",
  url: "https://www.maktechgroup.com",
  duration: "2 years",
  summary: "Web apps, mobile apps, SaaS and e-commerce for ambitious businesses."
};

/* Deliberately not repeating the role or department — those are already
   stated in the panel above. These add what the panel does not. */
const facts = [
  { label: "Experience", value: "3 years on the web" },
  { label: "Platforms", value: "Shopify · WordPress" },
  { label: "Stack", value: "Liquid · PHP · React" },
  { label: "Based in", value: "Dhaka, Bangladesh" }
];

/* Highlighted phrase inside a paragraph. */
const Hl = ({ children }) => (
  <strong className="font-semibold text-link">{children}</strong>
);

export function About() {
  /* Not a visibility switch — the card needs different framing on a phone.
     It hangs from the right and overlaps the copy on desktop; on a narrow
     screen it sits centred below the text at a smaller size. */
  const wide = useMediaQuery("(min-width: 1024px)");

  return (
    <section id="about" className="relative overflow-hidden bg-surface py-section">
      <div className="mx-auto grid w-full max-w-site grid-cols-1 items-center gap-[clamp(8px,2vw,32px)]
                      px-gutter lg:grid-cols-[minmax(0,1.08fr)_minmax(0,.92fr)]">

        {/* ---------------- left: the copy ----------------
             The employer is the loudest thing in this column on purpose.
             A spine runs down the left edge and the Maktech panel sits on
             it as a lit node, so it reads as a current, stated position
             rather than a line buried in a bio. */}
        <div>
          <Reveal as="p" className="label">About</Reveal>

          <SplitHeading
            delay={.06}
            className="mt-3 max-w-[22ch] font-display text-[clamp(30px,5vw,64px)] font-semibold
                       leading-[1.05] tracking-[-0.03em] text-primary">
            Shopify and WordPress, built properly.
          </SplitHeading>

          <Reveal as="p" delay={.16}
            className="mt-5 max-w-[52ch] text-[13.5px] leading-[1.7] text-muted sm:text-[14.5px] sm:leading-[1.75]">
            I’m a <Hl>Shopify and WordPress developer</Hl> and team lead, building
            custom, high-performing websites from concept to launch — tailored
            Shopify themes and advanced animation, <Hl>WooCommerce</Hl> and custom
            plugins. Solutions that fit the project, not projects forced into templates.
          </Reveal>

          {/* the spine */}
          <div className="relative mt-7 pl-5 sm:pl-7">
            <span aria-hidden="true"
              className="absolute left-0 top-2 bottom-2 w-px
                         bg-linear-to-b from-accent/70 via-line-strong to-transparent" />

            {/* ---- node 1: the employer ---- */}
            <Reveal delay={.24} className="relative">
              <span aria-hidden="true"
                className="absolute -left-5 top-5 size-[11px] -translate-x-[5px] rounded-full sm:-left-7 sm:top-6
                           border-2 border-accent bg-surface
                           shadow-[0_0_0_4px_var(--color-surface-sunken),0_0_18px_2px] shadow-accent/40" />

              <article className="overflow-hidden rounded-2xl border border-line-strong bg-surface-raised">
                {/* status strip */}
                <div className="flex flex-wrap items-center justify-between gap-3
                                border-b border-line bg-accent/[.07] px-4 py-2.5 sm:px-5 sm:py-3">
                  <p className="flex items-center gap-2.5 font-mono text-[12px]
                                uppercase tracking-[.18em] text-accent-hi">
                    <i className="dot" />Currently · Full-time
                  </p>
                  <p className="font-mono text-[12px] tracking-[.14em] text-muted">
                    {company.duration.toUpperCase()}
                  </p>
                </div>

                <div className="px-4 py-4 sm:px-5 sm:py-5">
                  <a href={company.url} target="_blank" rel="noreferrer"
                     className="group inline-flex items-baseline gap-2.5 font-display
                                text-[clamp(24px,3vw,38px)] font-semibold leading-none
                                tracking-[-0.03em] text-primary transition-colors duration-300
                                hover:text-accent-hi">
                    {company.name}
                    <Icon name="arrow"
                      className="size-3.5 text-link transition-transform duration-500 ease-out-expo
                                 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>

                  <p className="mt-2.5 text-[13.5px] font-medium leading-snug text-body sm:mt-3 sm:text-[14.5px]">
                    Team Leader &amp; Project Coordinator
                    <span className="text-muted"> — Web Development</span>
                  </p>

                  <p className="mt-2 max-w-[46ch] text-[12.5px] leading-relaxed text-muted sm:mt-2.5 sm:text-[13.5px]">
                    {company.summary}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {["Brief to launch", "Leading the web team", "Client-facing"].map(t => (
                      <span key={t}
                        className="rounded-pill border border-line px-2.5 py-1 font-mono
                                   text-[11.5px] tracking-[.06em] text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>

            {/* ---- node 2: the spec sheet ---- */}
            <Reveal stagger delay={.32} className="relative mt-4 grid gap-px overflow-hidden sm:mt-5
                                                   rounded-2xl border border-line bg-line sm:grid-cols-2">
              <span aria-hidden="true"
                className="absolute -left-5 top-6 size-[7px] -translate-x-[3px] rounded-full bg-line-strong sm:-left-7 sm:top-7" />
              {facts.map(f => (
                <RevealItem key={f.label} y={14}
                  className="bg-surface-sunken px-4 py-3.5 transition-colors duration-500 hover:bg-surface-raised sm:px-5 sm:py-4">
                  <p className="font-mono text-[11.5px] uppercase tracking-[.16em] text-muted">
                    {f.label}
                  </p>
                  <p className="mt-1 text-[13px] font-semibold leading-snug text-primary sm:mt-1.5 sm:text-[14px]">
                    {f.value}
                  </p>
                </RevealItem>
              ))}
            </Reveal>
          </div>
        </div>

        {/* ---------------- right: the card on a lanyard ----------------
             The canvas is the clipping box, so on desktop it is pulled wide
             of its column to let the card swing over the copy. On a phone
             there is nothing to overlap, so it simply fills its own row. */}
        <div className="relative mt-8 h-[330px] w-full self-center sm:mt-10 sm:h-[420px] lg:mt-0 lg:h-[700px]">
          <div className="absolute inset-0 z-20
                          lg:-left-[140px] lg:-right-[40px] lg:top-1/2 lg:h-[700px] lg:-translate-y-1/2">
            <Lanyard
              frontImage="/card-front.png"
              backImage="/card-back.png"
              strapImage="/band.svg"
              cardColor="var(--n-850)"
              finish="metallic"
              metal="graphite"
              /* a phone has no room for the overlap, so the card is smaller
                 and hangs from the middle */
              size={wide ? 0.71 : 0.8}
              anchor={wide ? "right" : "center"}
              strapLength={wide ? 0.2 : 0.08}
              strapWidth={0.8}
              cornerRadius={0.34}
              gravity={0.9}
              damping={0.55}
              elasticity={0.45}
              breeze={0.35}
              intro={wide}
            />
          </div>
        </div>

      </div>
    </section>
  );
}