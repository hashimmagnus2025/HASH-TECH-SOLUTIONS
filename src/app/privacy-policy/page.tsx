import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/animations/Reveal";
import TextReveal from "@/components/animations/TextReveal";
import { company } from "@/data/company";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for ${company.name}.`,
  path: "/privacy-policy",
  noIndex: true,
});

export default function PrivacyPolicyPage() {
  return (
    <section className="py-16">
      <Container className="flex max-w-3xl flex-col gap-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />

        <div className="flex flex-col gap-2">
          <TextReveal as="h1" text="Privacy Policy" className="font-display text-3xl font-medium text-fg sm:text-4xl" />
          <Reveal delay={0.1}>
            <p className="text-sm text-fg-subtle">
              Draft template — pending review by a qualified legal professional.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-8 text-sm leading-relaxed text-fg-muted">
          <p>
            This Privacy Policy explains how {company.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses
            and protects information submitted through this website, including the
            contact and enquiry forms.
          </p>

          <section className="flex flex-col gap-2">
            <h2 className="font-display text-lg font-medium text-fg">Information we collect</h2>
            <p>
              When you submit an enquiry, we collect the details you provide — name, company
              name, email address, phone number, the service you&apos;re interested in, and
              your message. We do not knowingly collect information beyond what you choose
              to submit.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-display text-lg font-medium text-fg">How we use it</h2>
            <p>
              Information submitted through this site is used solely to respond to your
              enquiry and, where relevant, to provide a quotation or deliver the service
              requested. We do not sell or rent your information to third parties.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-display text-lg font-medium text-fg">Data retention</h2>
            <p>
              We retain enquiry information for as long as reasonably necessary to respond
              to it and maintain business records. Specific retention periods will be
              confirmed here once finalized.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-display text-lg font-medium text-fg">Your choices</h2>
            <p>
              You can request details of the information we hold about you, or ask us to
              delete it, by contacting us using the details on our{" "}
              <a href="/contact" className="text-accent underline">
                contact page
              </a>
              .
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-display text-lg font-medium text-fg">Changes to this policy</h2>
            <p>
              This policy may be updated from time to time. Material changes will be
              reflected on this page.
            </p>
          </section>

          <p className="text-xs text-fg-subtle">
            This page is a general-purpose template and does not constitute legal advice.
            It should be reviewed and finalized by a qualified legal professional before
            the site goes live, particularly regarding applicable data protection law.
          </p>
        </div>
      </Container>
    </section>
  );
}
