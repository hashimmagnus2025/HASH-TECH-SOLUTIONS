import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { company } from "@/data/company";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions",
  description: `Terms and conditions for ${company.name}.`,
  path: "/terms-and-conditions",
  noIndex: true,
});

export default function TermsPage() {
  return (
    <section className="py-16">
      <Container className="flex max-w-3xl flex-col gap-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms & Conditions" }]} />

        <div className="flex flex-col gap-2">
          <h1 className="font-display text-3xl font-medium text-fg sm:text-4xl">Terms &amp; Conditions</h1>
          <p className="text-sm text-fg-subtle">Draft template — pending review by a qualified legal professional.</p>
        </div>

        <div className="flex flex-col gap-8 text-sm leading-relaxed text-fg-muted">
          <p>
            These terms govern use of this website and general enquiries submitted to{" "}
            {company.name}. They do not constitute a quotation, contract or AMC
            agreement — those are issued separately once a requirement is scoped.
          </p>

          <section className="flex flex-col gap-2">
            <h2 className="font-display text-lg font-medium text-fg">Use of this website</h2>
            <p>
              This website is provided for the purpose of describing {company.name}&apos;s
              services and products and allowing visitors to make enquiries. Content is
              provided in good faith but may be updated or corrected without notice.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-display text-lg font-medium text-fg">Products and pricing</h2>
            <p>
              Products listed on this website are illustrative of the categories we
              supply. Pricing, stock and manufacturer availability are confirmed
              directly when you enquire and are not binding until confirmed in writing.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-display text-lg font-medium text-fg">Service agreements</h2>
            <p>
              Any service, installation or AMC work is governed by the specific terms
              agreed between {company.name} and the customer at the time of
              engagement, not solely by this page.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-display text-lg font-medium text-fg">Limitation of liability</h2>
            <p>
              While we aim for accuracy, {company.name} is not liable for decisions made
              solely on the basis of general information published on this website.
              Specific commitments are made in writing as part of a quotation or
              contract.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-display text-lg font-medium text-fg">Changes to these terms</h2>
            <p>These terms may be updated from time to time. Material changes will be reflected on this page.</p>
          </section>

          <p className="text-xs text-fg-subtle">
            This page is a general-purpose template and does not constitute legal
            advice. It should be reviewed and finalized by a qualified legal
            professional before the site goes live.
          </p>
        </div>
      </Container>
    </section>
  );
}
