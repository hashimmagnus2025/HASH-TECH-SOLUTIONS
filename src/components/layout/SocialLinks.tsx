import { company } from "@/data/company";
import IconButton from "@/components/ui/IconButton";
import { FacebookIcon, InstagramIcon, LinkedinIcon, XIcon } from "@/components/ui/icons/SocialIcons";

const socialLinks = [
  { key: "facebook", icon: FacebookIcon, label: "Facebook", href: company.socials.facebook },
  { key: "instagram", icon: InstagramIcon, label: "Instagram", href: company.socials.instagram },
  { key: "linkedin", icon: LinkedinIcon, label: "LinkedIn", href: company.socials.linkedin },
  { key: "twitter", icon: XIcon, label: "X (Twitter)", href: company.socials.twitter },
] as const;

/** Only renders links that have a confirmed URL — empty placeholders stay hidden. */
export default function SocialLinks({ className }: { className?: string }) {
  const active = socialLinks.filter((link) => Boolean(link.href));
  if (active.length === 0) return null;

  return (
    <div className={className}>
      {active.map((link) => (
        <IconButton
          key={link.key}
          icon={link.icon}
          label={link.label}
          href={link.href as string}
          target="_blank"
          rel="noopener noreferrer"
          size="sm"
        />
      ))}
    </div>
  );
}
