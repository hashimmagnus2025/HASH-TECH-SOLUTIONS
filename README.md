# HashTech Solutions — Website

Production handover documentation for the HashTech Solutions marketing site.

## 1. Project overview

A premium, conversion-focused corporate website for HashTech Solutions — an
IT hardware, networking, CCTV & security, AMC/maintenance, and software
solutions provider. Built across eight phases (design system → architecture
→ component library → homepage → inner pages/all 42 services → motion
design → SEO/accessibility/performance → final QA), fully documented in the
project conversation history.

**Everything marked as a placeholder in the code is a placeholder, not a
real business fact.** See [§6 Environment variables](#6-environment-variables)
and `src/data/company.ts` for the full list of values that must be replaced
with confirmed information before this site represents the business
publicly (phone, email, address, social links, mission/vision statement,
business hours).

## 2. Technology stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Cache Components / Partial Prerendering) |
| Language | TypeScript (strict) |
| UI | React 19 |
| Styling | Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.js`) |
| Animation | GSAP + ScrollTrigger, Lenis (smooth scroll) |
| Icons | lucide-react, plus 5 hand-authored inline SVGs for brand/social glyphs lucide doesn't ship (Facebook, Instagram, LinkedIn, X, WhatsApp) |
| Fonts | Space Grotesk (display), Inter (body), JetBrains Mono (labels) — all self-hosted via `next/font/google`, zero runtime font requests |
| Forms | Native Server Actions (`"use server"`), `useActionState` |
| Deployment target | Vercel |

No state-management library, no CSS-in-JS, no UI component library beyond
what's built in `src/components/` — deliberately kept minimal.

## 3. Folder structure

```
src/
  app/                    Routes (App Router). One folder per URL segment.
    about/ amc-services/ contact/ industries/ privacy-policy/
    products/ projects/ services/ services/[slug]/ terms-and-conditions/
    layout.tsx            Root layout: fonts, metadata, Organization/WebSite
                           JSON-LD, Navbar/Footer/WhatsApp button, Lenis provider
    page.tsx               Homepage (composes components/sections/home/*)
    template.tsx            Page-transition wrapper (remounts per navigation)
    sitemap.ts / robots.ts
  components/
    animations/            GSAP/Lenis hooks' component wrappers — see its README.md
    business/               Domain components: ServiceCard, ProductCard, IndustryCard,
                             ProjectCard, EnquiryCta, ContactInfoCard, Testimonial*
    forms/                  FormField, Input, Textarea, Select
    layout/                 Footer, Logo, SocialLinks, WhatsAppButton
    navigation/             Navbar (mega-menu, mobile menu, active-link state)
    sections/
      home/                 Hero, TrustIntro, ServicesOverview, WhyChooseUs,
                             ProductsShowcase, IndustriesSection, AmcHighlight,
                             WorkingProcess, ProjectsShowcase, ContactCtaSection
      services/              ServiceDetail, ServicesCategoryBand
      contact/                ContactForm
    ui/                     Design-system primitives: Button, Badge, IconBox,
                             Card-adjacent pieces, Section, Container, Breadcrumbs,
                             StatBlock, SectionHeading, Divider, icons/
  data/                    Centralized content — see §5
  hooks/                   useLenis, useReducedMotion, useScrollReveal,
                             useStagger, useMagnetic
  lib/                     utils (cn), gsap, env, seo (buildMetadata), jsonLd,
                             structuredData
  types/                   All shared TypeScript interfaces
public/
  images/placeholders/      4 brand-consistent generative SVG placeholders
                             (service/product/project/industry) — swap for
                             real photography when available
  icons/ videos/ fonts/     Reserved, currently empty (fonts/ has a README
                             explaining why — next/font handles the 3 brand
                             typefaces, no files needed there)
```

Every component folder with more than a couple of files that isn't
self-explanatory has its own `README.md` (currently: `components/animations/`).

## 4. Page and route list

| Route | Notes |
|---|---|
| `/` | Homepage — 10 sections, see `app/page.tsx` |
| `/about` | Company intro, mission/vision (placeholder), values, capabilities |
| `/services` | All 5 categories, all 42 services listed in full |
| `/services/[slug]` | 42 static pages (`generateStaticParams`), reusable template |
| `/products` | 9 product categories, 18 catalogue items |
| `/amc-services` | AMC explainer + process + all 9 AMC services |
| `/industries` | All 8 segments (incl. Individual Customers) |
| `/projects` | 4 demo case studies, explicitly labeled as placeholder content |
| `/contact` | Form (Server Action), WhatsApp CTA, map placeholder |
| `/privacy-policy` | `noindex` — template content, pending legal review |
| `/terms-and-conditions` | `noindex` — template content, pending legal review |
| `/sitemap.xml`, `/robots.txt` | Auto-generated from the routes above |

## 5. Service inventory

All 42 services live in `src/data/services.ts`, organized into 5 categories
defined in `src/data/service-categories.ts`:

| Category | Count |
|---|---|
| Computer Sales & Services | 9 |
| IT Hardware & Networking | 9 |
| CCTV & Security Solutions | 8 |
| AMC & Maintenance Services | 9 |
| Software & IT Solutions | 7 |
| **Total** | **42** |

Each service has: `id`, `name`, `slug`, `category`, `shortDescription`,
`description`, `icon`, `image`, `whatsIncluded[]`, `benefits[]`,
`suitableFor[]`, `relatedServiceSlugs[]`. To add, remove, or edit a service,
**edit only `src/data/services.ts`** — every page that lists services
(`/services`, `/amc-services`, homepage, related-services blocks) reads from
this single source.

## 6. Environment variables

Copy `.env.example` to `.env.local` for local development, and set the same
keys in your hosting provider's dashboard for production (see §10).

| Variable | Required? | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | **Yes, before launch** | Canonical domain used in metadata, sitemap, canonical URLs, JSON-LD. Falls back to the placeholder in `company.ts` if unset — must be the real production URL before going live. |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` / `RECAPTCHA_SECRET_KEY` | Optional | Reserved for spam protection on the contact form. Not wired to a provider yet — the form currently uses a honeypot field only. |
| `CONTACT_EMAIL_API_KEY` | **Yes, for the contact form to deliver mail** | Until set, `src/app/contact/actions.ts` deliberately returns an honest error ("not connected yet, call/WhatsApp us directly") rather than faking success. Set this once a transactional email provider (Resend, SendGrid, etc.) is chosen, and implement the actual send call in that file. |
| `CONTACT_EMAIL_TO` | Optional | Defaults to `company.email` if unset. |

**Non-negotiable before launch — these are placeholders, not secrets, but
they are currently fake and must be replaced in `src/data/company.ts`:**
`phone`, `whatsapp`, `email`, full `address`, `mapEmbedUrl`, `businessHours`,
`socials.*`, `mission`, `vision`, `domain`.

## 7. Installation instructions

Requires Node.js 20+ and npm.

```bash
git clone <repository-url>
cd service
npm install
cp .env.example .env.local   # fill in real values before deploying
```

## 8. Development commands

```bash
npm run dev      # Next.js dev server (Turbopack), http://localhost:3000
npm run lint     # ESLint — must be clean before committing
npx tsc --noEmit # TypeScript check — must be clean before committing
```

## 9. Production build commands

```bash
npm run build    # production build — verify this succeeds with zero errors
npm run start    # serve the production build locally, for a final check
```

**Before every deploy**, run `npm run lint && npx tsc --noEmit && npm run build`
locally and confirm all three succeed. This is exactly what was run for
Phase 8 final QA (see the project history) — treat it as the standing
pre-deploy checklist, not a one-time step.

## 10. Deployment instructions — Vercel

This stack (App Router, Server Actions, Cache Components/PPR, `next/image`)
is built by and for Vercel; no extra configuration is required beyond env
vars.

### First deploy
1. Push this repository to GitHub/GitLab/Bitbucket.
2. In Vercel: **New Project → Import** the repository. Framework preset
   auto-detects as Next.js — leave build command (`next build`) and output
   settings on their defaults.
3. Add the environment variables from §6 under **Project Settings →
   Environment Variables** (set for Production, and Preview if you want
   preview deploys to behave the same way).
4. Deploy. Vercel builds and assigns a `*.vercel.app` preview URL.

### Domain configuration checklist
- [ ] Add the production domain under **Project Settings → Domains**.
- [ ] Point the domain's DNS at Vercel: an `A`/`ALIAS` record at the apex to
      Vercel's IP (shown in the dashboard) or a `CNAME` for a subdomain
      (e.g. `www`) to `cname.vercel-dns.com`.
- [ ] Decide the canonical host (`www` vs apex) and set the other as a
      redirect — Vercel's domain UI offers this directly.
- [ ] Update `NEXT_PUBLIC_SITE_URL` to match the final canonical domain
      exactly (scheme + host, no trailing slash) and redeploy — this value
      feeds the sitemap, canonical tags, and JSON-LD.

### HTTPS/SSL checklist
- [ ] Vercel provisions and renews a TLS certificate automatically once the
      domain's DNS resolves to it — no manual certificate management.
- [ ] Confirm `https://` (not `http://`) resolves correctly for both the
      apex and `www` host before announcing the domain.
- [ ] HSTS and HTTP→HTTPS redirection are handled by Vercel's edge network
      by default.

### Rollback guidance
- Every deploy is immutable and listed under **Deployments**. To roll back,
  open the previously-working deployment and choose **Promote to
  Production** — this is instant and doesn't require a new build.
- Because the app is a static-by-default build (most routes are prerendered,
  see the build output's `○`/`◐`/`ƒ` markers), a bad deploy almost always
  surfaces immediately in the Preview URL before it's promoted — always
  check the Preview deployment first for anything beyond a content edit.

### If a different platform is chosen later
The app has no Vercel-specific code — `next build` + `next start` (or any
Node 20+ host, Docker, etc.) works anywhere Next.js's standard Node runtime
is supported. The main things to replicate manually on another platform:
automatic HTTPS, the Server Actions runtime, and image optimization (or set
`images.unoptimized: true` in `next.config.ts` if the target host can't run
Next's image optimizer).

## 11. Maintenance recommendations

- **Content changes** (services, products, industries, FAQs, projects,
  company info) all live in `src/data/*.ts` — no page component should need
  editing for a content-only change.
- **Replace placeholder content as real information becomes available**, in
  this order of impact: `company.ts` contact details → real project case
  studies in `projects.ts` (replacing the demo-labeled ones) → real
  testimonials in `testimonials.ts` (the testimonials section auto-appears
  once this array is non-empty — no code change needed) → real product
  photography (replacing the SVG placeholders; add real `sizes`-aware
  `<Image>` usage is already in place) → confirmed business statistics in
  the three `StatBlock` placeholders on the homepage's Trust section.
- **Once real business details are confirmed**, add `LocalBusiness`
  structured data (see the note in `src/lib/structuredData.ts` — it's
  intentionally not implemented yet) and wire a real email provider into
  `src/app/contact/actions.ts`.
- **Re-run the Phase 7 accessibility contrast check** if the color tokens in
  `globals.css` are ever changed — two tokens were specifically tuned to
  pass WCAG AA (see the comments beside `--color-fg-subtle` and
  `--color-primary`); changing them without re-checking contrast risks
  reintroducing that failure.
- **Keep `npm audit` on your radar but don't force-fix blindly** — as of
  this handover, the only findings are moderate-severity, transitive,
  dev-dependency-only (ESLint tooling via `@typescript-eslint`), and the
  suggested automatic fix downgrades `eslint-config-next`. Wait for an
  upstream patch rather than forcing it.
- **Before any future redesign of the color/type system**, read
  `src/components/animations/README.md` and the inline comments in
  `globals.css` first — several values are load-bearing for accessibility
  or motion behavior, not arbitrary.

---

### Final QA status (Phase 8)

`npm run lint` ✅ · `npx tsc --noEmit` ✅ · `npm run build` ✅ (58 routes,
zero errors/warnings) · all 42 service pages verified live · all internal
links across every page verified resolving · Lighthouse (desktop, production
build): Performance 100 / Accessibility 100 / Best Practices 100 / SEO 100
(see caveats in the Phase 7 audit — one local unthrottled run, not a
guarantee across all conditions).
