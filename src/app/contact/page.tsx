import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/animations/Reveal";
import TextReveal from "@/components/animations/TextReveal";
import StaggerGroup from "@/components/animations/StaggerGroup";
import ContactInfoCard from "@/components/business/ContactInfoCard";
import ContactForm from "@/components/sections/contact/ContactForm";
import { WhatsAppIcon } from "@/components/ui/icons/SocialIcons";
import { company } from "@/data/company";
import { getServiceBySlug } from "@/data/services";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Get in touch with HashTech Solutions for computer sales, IT hardware & networking, CCTV & security, AMC and software enquiries.",
  path: "/contact",
});

interface ContactPageProps {
  searchParams: Promise<{ service?: string }>;
}

async function PreselectedContactForm({ searchParams }: ContactPageProps) {
  const { service: serviceSlug } = await searchParams;
  const preselectedService = serviceSlug ? getServiceBySlug(serviceSlug) : undefined;
  return <ContactForm defaultService={preselectedService?.slug} />;
}

export default function ContactPage({ searchParams }: ContactPageProps) {
  const whatsappDigits = company.whatsapp.replace(/\D/g, "");

  return (
    <section className="pb-24 pt-10">
      <Container className="flex flex-col gap-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

        <div className="flex flex-col gap-5">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Get in touch</span>
          </Reveal>
          <TextReveal
            as="h1"
            text="Let's talk about what you need."
            className="max-w-2xl font-display text-4xl font-medium leading-tight text-fg sm:text-5xl"
          />
          <Reveal delay={0.15}>
            <p className="max-w-xl text-lg leading-relaxed text-fg-muted">
              One form, one team — whether it&apos;s a single repair or a full office
              rollout.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <Reveal delay={0.1} className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
            <Suspense fallback={<ContactForm />}>
              <PreselectedContactForm searchParams={searchParams} />
            </Suspense>
          </Reveal>

          <StaggerGroup className="flex flex-col gap-4">
            <ContactInfoCard icon={Phone} label="Call" value={company.phoneDisplay} href={`tel:${company.phone}`} />
            <ContactInfoCard
              icon={WhatsAppIcon}
              label="WhatsApp"
              value={company.phoneDisplay}
              href={whatsappDigits ? `https://wa.me/${whatsappDigits}` : undefined}
              external
            />
            <ContactInfoCard icon={Mail} label="Email" value={company.email} href={`mailto:${company.email}`} />
            <ContactInfoCard
              icon={MapPin}
              label="Address"
              value={`${company.address.city}, ${company.address.state}, ${company.address.country}`}
            />
            <ContactInfoCard icon={Clock} label="Hours" value={company.businessHours} />

            <div className="flex aspect-video items-center justify-center rounded-2xl border border-dashed border-line-strong bg-surface text-center">
              <p className="max-w-xs px-4 text-sm text-fg-subtle">
                Map will appear here once the office location is confirmed.
              </p>
            </div>
          </StaggerGroup>
        </div>
      </Container>
    </section>
  );
}
