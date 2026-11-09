import type { Metadata } from "next";
import { company } from "@/data/company";
import { env } from "@/lib/env";

interface BuildMetadataOptions {
  title?: string;
  description?: string;
  /** Path starting with "/", e.g. "/about". Defaults to the homepage. */
  path?: string;
  noIndex?: boolean;
}

const defaultTitle = `${company.name} — IT Hardware, Networking, CCTV & AMC Services`;

/**
 * Builds consistent per-route metadata (title, description, canonical,
 * Open Graph, Twitter) so every page follows the same SEO defaults
 * instead of repeating boilerplate. Pass only what differs from the
 * site-wide defaults.
 */
export function buildMetadata({
  title,
  description = company.shortDescription,
  path = "/",
  noIndex = false,
}: BuildMetadataOptions = {}): Metadata {
  const resolvedTitle = title ? `${title} — ${company.name}` : defaultTitle;
  const canonical = new URL(path, env.siteUrl).toString();

  return {
    title: resolvedTitle,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      siteName: company.name,
      title: resolvedTitle,
      description,
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
