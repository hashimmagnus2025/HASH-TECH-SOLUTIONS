import { company } from "@/data/company";

/**
 * Centralized, typed access to environment variables. Nothing here is a
 * confirmed secret or endpoint — see .env.example for what must be supplied
 * before the contact form (Phase 4) can send real email.
 */
export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? company.domain,
  recaptchaSiteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "",
  recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY ?? "",
  contactEmailApiKey: process.env.CONTACT_EMAIL_API_KEY ?? "",
  contactEmailTo: process.env.CONTACT_EMAIL_TO ?? company.email,
};
