"use client";

import { useActionState } from "react";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import FormField from "@/components/forms/FormField";
import Input from "@/components/forms/Input";
import Textarea from "@/components/forms/Textarea";
import Select from "@/components/forms/Select";
import Button from "@/components/ui/Button";
import { submitEnquiry } from "@/app/contact/actions";
import { serviceCategories } from "@/data/service-categories";
import { getServicesByCategory } from "@/data/services";

export default function ContactForm({ defaultService }: { defaultService?: string }) {
  const [state, formAction, isPending] = useActionState(submitEnquiry, null);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {/* Honeypot — hidden from real users, left open for bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Name" htmlFor="name" required>
          <Input id="name" name="name" autoComplete="name" maxLength={120} required />
        </FormField>
        <FormField label="Company" htmlFor="company">
          <Input id="company" name="company" autoComplete="organization" maxLength={120} />
        </FormField>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Email" htmlFor="email" required>
          <Input id="email" name="email" type="email" autoComplete="email" maxLength={180} required />
        </FormField>
        <FormField label="Phone" htmlFor="phone" required>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={30} required />
        </FormField>
      </div>

      <FormField label="Service interested in" htmlFor="serviceInterested">
        <Select id="serviceInterested" name="serviceInterested" defaultValue={defaultService ?? ""}>
          <option value="">Not sure / general enquiry</option>
          {serviceCategories.map((category) => (
            <optgroup key={category.slug} label={category.name}>
              {getServicesByCategory(category.slug).map((service) => (
                <option key={service.slug} value={service.slug}>
                  {service.name}
                </option>
              ))}
            </optgroup>
          ))}
        </Select>
      </FormField>

      <FormField label="Message" htmlFor="message" required>
        <Textarea
          id="message"
          name="message"
          maxLength={2000}
          required
          placeholder="Tell us what you need help with."
        />
      </FormField>

      <Button type="submit" variant="primary" size="lg" disabled={isPending} className="w-fit">
        {isPending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        {isPending ? "Sending..." : "Send Enquiry"}
      </Button>

      {state && (
        <div
          role="status"
          className={
            state.status === "success"
              ? "animate-status-in flex items-start gap-3 rounded-xl border border-accent/30 bg-surface p-4 text-sm text-fg"
              : "animate-status-in flex items-start gap-3 rounded-xl border border-danger/30 bg-surface p-4 text-sm text-fg"
          }
        >
          {state.status === "success" ? (
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
          ) : (
            <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-danger" aria-hidden />
          )}
          {state.message}
        </div>
      )}
    </form>
  );
}
