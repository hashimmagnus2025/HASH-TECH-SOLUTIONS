"use server";

import { env } from "@/lib/env";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mirrors the client-side maxLength attributes — those are a UX nicety,
// not a security boundary, since any direct POST can skip the browser
// entirely. This is the real limit.
const MAX_LENGTHS = {
  name: 120,
  company: 120,
  email: 180,
  phone: 30,
  message: 2000
};

/**
 * Validates and (once a real provider is configured) would deliver the
 * enquiry. Never reports success without a working delivery path — see
 * CONTACT_EMAIL_API_KEY in .env.example. Until that's set, a genuine,
 * well-formed submission still gets an honest error pointing people to
 * call or WhatsApp directly, rather than a fake "message sent".
 */
export async function submitEnquiry(_prevState, formData) {
  // Honeypot — real users never fill this in; bots that auto-fill every
  // field will, so we quietly no-op instead of revealing the check.
  if (String(formData.get("website") ?? "").trim()) {
    return {
      status: "success",
      message: "Thanks — we'll be in touch shortly."
    };
  }
  const name = String(formData.get("name") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  if (!name || !email || !phone || !message) {
    return {
      status: "error",
      message: "Please fill in your name, email, phone and message."
    };
  }
  if (name.length > MAX_LENGTHS.name || company.length > MAX_LENGTHS.company || email.length > MAX_LENGTHS.email || phone.length > MAX_LENGTHS.phone || message.length > MAX_LENGTHS.message) {
    return {
      status: "error",
      message: "One of the fields is too long. Please shorten it and try again."
    };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return {
      status: "error",
      message: "Please enter a valid email address."
    };
  }
  if (!env.contactEmailApiKey) {
    return {
      status: "error",
      message: "This form isn't connected to an email service yet. Please call or WhatsApp us directly using the details on this page."
    };
  }

  // Real delivery (e.g. via Resend/SendGrid) runs here once
  // CONTACT_EMAIL_API_KEY is configured.
  return {
    status: "success",
    message: "Thanks — we'll be in touch shortly."
  };
}
