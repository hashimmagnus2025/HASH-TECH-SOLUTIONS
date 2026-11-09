import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { company } from "@/data/company";
import { footerNavGroups } from "@/data/nav";
import Container from "@/components/ui/Container";
import Logo from "@/components/layout/Logo";
import CurrentYear from "@/components/ui/CurrentYear";
import SocialLinks from "@/components/layout/SocialLinks";
import Reveal from "@/components/animations/Reveal";
import StaggerGroup from "@/components/animations/StaggerGroup";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink-soft">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.2fr_2fr]">
        <Reveal className="flex flex-col gap-5">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-fg-muted">
            {company.shortDescription}
          </p>
          <div className="flex flex-col gap-3 text-sm text-fg-muted">
            <a
              href={`tel:${company.phone}`}
              className="group flex items-center gap-2 transition-colors hover:text-fg"
            >
              <Phone className="h-4 w-4 text-accent transition-transform duration-300 group-hover:scale-110" aria-hidden />
              {company.phoneDisplay}
            </a>
            <a
              href={`mailto:${company.email}`}
              className="group flex items-center gap-2 transition-colors hover:text-fg"
            >
              <Mail className="h-4 w-4 text-accent transition-transform duration-300 group-hover:scale-110" aria-hidden />
              {company.email}
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" aria-hidden />
              {company.address.city}, {company.address.state}
            </span>
          </div>
          <SocialLinks className="flex gap-3" />
        </Reveal>

        <StaggerGroup className="grid gap-10 sm:grid-cols-3" y={20} stagger={0.12}>
          {footerNavGroups.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group relative inline-block text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      {link.label}
                      <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </StaggerGroup>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-line py-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          © <CurrentYear /> {company.legalName}. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="/privacy-policy" className="group relative inline-block transition-colors hover:text-fg">
            Privacy Policy
            <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
          <Link
            href="/terms-and-conditions"
            className="group relative inline-block transition-colors hover:text-fg"
          >
            Terms & Conditions
            <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
        </div>
      </Container>
    </footer>
  );
}
