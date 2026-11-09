import { Mail, MapPin, Phone } from "lucide-react";
import Section from "@/components/ui/Section";
import StaggerGroup from "@/components/animations/StaggerGroup";
import EnquiryCta from "@/components/business/EnquiryCta";
import ContactInfoCard from "@/components/business/ContactInfoCard";
import { WhatsAppIcon } from "@/components/ui/icons/SocialIcons";
import { company } from "@/data/company";

export default function ContactCtaSection() {
  const whatsappDigits = company.whatsapp.replace(/\D/g, "");

  return (
    <>
      <EnquiryCta
        title="Tell us what you're trying to solve."
        description="One form, one team — whether it's a single repair or a full office rollout."
      />

      <Section tone="dark" border={false} className="pt-0" id="contact">
        <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
            label="Visit"
            value={`${company.address.city}, ${company.address.state}`}
          />
        </StaggerGroup>
      </Section>
    </>
  );
}
