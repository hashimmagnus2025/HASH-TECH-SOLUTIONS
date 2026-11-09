# Animation system

Lenis drives scroll, GSAP drives everything else, and `prefers-reduced-motion`
is respected by every single utility below — either automatically (CSS) or
via the `useReducedMotion()` hook (GSAP). Nothing here should ever need a
manual reduced-motion check bolted on at the call site.

## How Lenis + ScrollTrigger are wired

`SmoothScrollProvider` (mounted once in `app/layout.tsx`) creates the Lenis
instance, feeds it through `gsap.ticker` instead of its own `requestAnimationFrame`
loop (so GSAP and Lenis share one clock), and calls `ScrollTrigger.update` on
every Lenis scroll event. If `prefers-reduced-motion: reduce` is set, Lenis is
never created at all and the browser's native scroll takes over — every
ScrollTrigger in the app still works, just against native scroll instead of
Lenis's eased scroll.

The Lenis instance itself is exposed as a **ref**, not React state
(`useLenis()` → `{ current: Lenis | null }`), because nothing needs to
re-render when it becomes available — it's only ever called imperatively
(e.g. `useLenis().current?.scrollTo("#section")`).

## Hooks (`src/hooks/`)

| Hook | Purpose |
|---|---|
| `useReducedMotion()` | Reactive `prefers-reduced-motion` boolean. Computed synchronously on first render (no flash), updates live if the OS setting changes mid-session. |
| `useScrollReveal(options)` | Fade + rise a single element in once, on scroll-enter. Backs `<Reveal>`. |
| `useStagger(options)` | Fade + rise a container's **direct children** in with a stagger, once, on scroll-enter. Backs `<StaggerGroup>`. |
| `useMagnetic(strength)` | Pointer-follow magnetic pull within an element's own bounds, eases back on leave. Backs `<MagneticButton>`. |

All three animated hooks follow the same cleanup contract: `gsap.context()` +
`ctx.revert()`, plus an explicit `ScrollTrigger.getAll().filter(trigger-matches-this-element).kill()`
pass, so nothing leaks across route changes or remounts.

## Components (`src/components/animations/`)

| Component | Use it for |
|---|---|
| `<Reveal>` | Wrap one block that should fade + rise in on scroll. Default choice for section headings, paragraphs, sidebars. |
| `<StaggerGroup>` | Wrap a row/grid of cards. Every direct child staggers in — don't nest `<Reveal>` inside it, the children are already the animated targets. |
| `<TextReveal>` | Word-by-word mask reveal for **one headline per page at most** — it's the "thesis statement" treatment, not a general heading style. Plain word-splitting, no SplitText dependency. Available for any page that wants this treatment; the homepage H1 no longer uses it (see below). |
| `<ImageReveal>` | Clip-path wipe reveal for media. Built into `ProductCard` and `ProjectCard` directly, so it's automatic — don't wrap their images again. |
| `<MagneticButton>` | Wrap **primary CTAs only** (hero, EnquiryCta, AMC highlight). Wrapping every button dilutes the effect into noise — see Motion Design Rules below. |
| `<ScrollSpine>` | A line that grows downward (`scaleY`, transform-origin top) as its parent scrolls through the viewport. Used behind `WorkingProcess`'s numbered steps. Measures `el.parentElement` as its own trigger — just place it inside the container it should track. |
| `<PageTransition>` (via `app/template.tsx`) | Mounts fresh on every route change. **Transform-only, no opacity** — see the note below. |
| `<ScrollProgressIndicator>` | Mounted once in `app/layout.tsx`, above `<Navbar>`. A 3px bar fixed at the very top of the viewport (`z-[60]`, above the navbar's `z-50`) that fills as the page scrolls. The one ScrollTrigger-driven effect in this codebase left active under `prefers-reduced-motion` — see its own doc comment for why. |

## Why `PageTransition` never touches opacity

Early in this build it did a 0→1 opacity + y fade on every navigation. That's
a reasonable pattern in isolation, but almost every section on every page
*already* fades its own content in via `<Reveal>`/`<TextReveal>`, and those
ScrollTriggers fire immediately for anything above the fold. An outer
opacity tween running at the same time multiplies against the inner ones —
visually the page arrives looking like a slower, slightly muddier double
fade instead of one clean reveal. The fix: `PageTransition` now only does a
14px → 0 `y` settle, nothing else. Content still fades itself in exactly
once; the page transition just adds a small tactile "this is a new page"
cue on top.

**Rule of thumb:** if you're adding a new page-level or section-level entrance
animation, check whether something inside it already animates its own
opacity in. If so, make the outer one transform-only.

## The hero (`components/sections/home/Hero.tsx` + `HeroShaderField.tsx`)

Second rewrite of this hero. The first version (an SVG network diagram —
`HeroScene`/`HeroBackground`/`HeroParticles`) was rejected outright as too
close to a generic "abstract tech diagram" hero, not a minor-tweak problem.
Those three files are gone; nothing in the current version reuses them.

**Current concept — "Signal Field":** a full-bleed custom WebGL shader
(`HeroShaderField`) is the entire hero background, not a right-column
panel. No objects, no particles, no diagram — a slowly evolving,
cursor-reactive field of light in the brand's ink/primary/accent palette,
rendered by a single fragment shader (domain-warped FBM noise, built on
the standard Ashima Arts 2D simplex implementation — not experimental
math). It's raw WebGL via `<canvas>`, deliberately **not** Three.js/React
Three Fiber: a single full-screen shader plane doesn't need a scene graph,
and pulling in R3F for this would add real bundle weight and SSR surface
area for a job a canvas + two shaders already does. A dark linear-gradient
scrim sits between the shader and the text (plain CSS) so headline
contrast never depends on what the shader happens to be doing underneath
at that moment.

`Hero.tsx` owns one master `gsap.timeline()`: the shader fades in first
(the "cinematic lighting" beat), then eyebrow → headline (`SplitText`,
`{ type: "words", mask: "words" }`) → subcopy → CTAs, each at a hand-placed
offset rather than independent triggers. Two further *separate* effects in
the same file: a subtle foreground parallax (the text drifts a few px
against the field on pointer move, fine-pointer only) and a scroll-exit
recede (`scrub: true`, no pinning) that fades and scales the shader as the
user scrolls past — each targets different transform properties so they
never fight each other or the entrance timeline.

`HeroShaderField` manages its own lifecycle independently of the entrance
timeline: it pauses its `requestAnimationFrame` loop when the tab is
hidden (`visibilitychange`) or the hero scrolls out of view
(`IntersectionObserver`), caps device pixel ratio (1.25 on narrow
viewports, 2 otherwise) so it doesn't tax mobile GPUs, renders exactly one
static frame under `prefers-reduced-motion` instead of looping, and falls
back to a plain CSS gradient if `canvas.getContext("webgl")` ever returns
null. Its forwarded ref and its own internal pointer-tracking ref are
*the same DOM node* (merged manually, same pattern as `HeroParticles` used
to) — keeping the positioned box and the thing GSAP animates unambiguous.

## Motion design rules actually enforced in this codebase

- **Hover/press feedback is CSS, not GSAP.** Card lift (`hover:-translate-y-1
  hover:shadow-(--shadow-elevated)`), icon nudge (`IconBox`'s
  `group-hover:scale-110`), image zoom (`group-hover:scale-105` on
  `ProductCard`/`ProjectCard` images) and button press (`active:scale-[0.97]`)
  are all plain Tailwind transitions on `transform`/`box-shadow`/`color`.
  These run on the compositor, need no JS listener per card, and are
  automatically killed dead by the global `prefers-reduced-motion` rule in
  `globals.css` — no hook required. Reach for a GSAP hook only when the
  animation needs to be scroll-driven, scrubbed, or sequenced.
- **No scroll hijacking.** Nothing in this site pins a section or takes over
  native scroll. `ScrollSpine` and the hero parallax are both `scrub: true`
  tied directly to native scroll position — they never call `pin: true`.
- **One magnetic button family per page, at most.** Currently: the hero's
  primary CTA and `EnquiryCta`'s primary CTA. If a new section wants a
  magnetic button, ask whether the page already has one before adding a
  second.
- **`<TextReveal>` is reserved for the single most important headline on a
  page.** Every other heading uses `<Reveal>`'s plain fade + rise.
