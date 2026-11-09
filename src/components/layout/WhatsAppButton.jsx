import { company } from "@/data/company";
import { WhatsAppIcon } from "@/components/ui/icons/SocialIcons";
const PREFILLED_MESSAGE = "Hi HashTech Solutions, I'd like to ask about";

/**
 * Persistent floating entry point across every page. Uses the configured
 * WhatsApp number the same way the footer already shows phone/email as
 * placeholders — replace company.whatsapp with the confirmed number.
 */
export default function WhatsAppButton() {
  const digits = company.whatsapp.replace(/\D/g, "");
  if (!digits) return null;
  const href = `https://wa.me/${digits}?text=${encodeURIComponent(PREFILLED_MESSAGE)}`;
  return <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Chat with HashTech Solutions on WhatsApp" className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-ink-fg shadow-[var(--shadow-glow-accent)] transition-transform hover:scale-105">
      <WhatsAppIcon className="h-6 w-6" />
    </a>;
}
