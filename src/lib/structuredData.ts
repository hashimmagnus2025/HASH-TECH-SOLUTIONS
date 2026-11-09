import { company } from "@/data/company";
import { env } from "@/lib/env";

const siteUrl = env.siteUrl.replace(/\/$/, "");

/**
 * Organization + WebSite structured data for the root layout.
 *
 * Deliberately excludes `telephone`, `address`, `logo` and `sameAs` —
 * those still hold unconfirmed placeholder values in company.ts (see its
 * header comment). Shipping them as structured data would let a crawler
 * index fake business facts as real, which is worse than shipping no
 * structured data for those fields at all. `sameAs` is included only with
 * whatever social links are genuinely confirmed (same gating as the
 * footer's social icons) — currently none, so it's omitted entirely.
 *
 * LocalBusiness schema is intentionally not implemented anywhere in this
 * site until a real address/phone exists — see the project brief.
 */
export function getOrganizationJsonLd() {
  const sameAs = Object.values(company.socials).filter((url): url is string => Boolean(url));

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: siteUrl,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: company.name,
    url: siteUrl,
  };
}
