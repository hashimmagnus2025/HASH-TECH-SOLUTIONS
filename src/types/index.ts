import type { LucideIcon } from "lucide-react";

export type ServiceCategorySlug =
  | "computer-sales-services"
  | "it-hardware-networking"
  | "cctv-security-solutions"
  | "amc-maintenance-services"
  | "software-it-solutions";

export interface ServiceCategory {
  slug: ServiceCategorySlug;
  name: string;
  shortName: string;
  description: string;
  icon: LucideIcon;
}

export interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  category: ServiceCategorySlug;
  shortDescription: string;
  description: string;
  icon: LucideIcon;
  image: string;
  /** What's actually covered when this service is carried out. */
  whatsIncluded: string[];
  benefits: string[];
  /** Short labels for who this service is typically scoped for. */
  suitableFor: string[];
  relatedServiceSlugs: string[];
}

export type ProductCategorySlug =
  | "desktop-computers"
  | "laptops"
  | "workstations"
  | "printers-scanners"
  | "servers"
  | "networking-equipment"
  | "cctv-cameras"
  | "security-equipment"
  | "computer-accessories";

export interface ProductCategory {
  slug: ProductCategorySlug;
  name: string;
  description: string;
  icon: LucideIcon;
}

export interface ProductItem {
  id: string;
  name: string;
  category: ProductCategorySlug;
  shortDescription: string;
  image: string;
}

export interface Industry {
  slug: string;
  name: string;
  description: string;
  solutions: string[];
  icon: LucideIcon;
  image: string;
}

/**
 * Demo-only portfolio entries for layout development.
 * Must remain clearly labeled as placeholder content — never presented as
 * genuine completed client work until real project data is supplied.
 */
export interface ProjectItem {
  id: string;
  title: string;
  category: ServiceCategorySlug;
  description: string;
  details: string[];
  image: string;
  isDemoContent: true;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
}

export interface NavChild {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export interface EnquiryFormData {
  name: string;
  company?: string;
  email: string;
  phone: string;
  serviceInterested: string;
  message: string;
}

export type EnquiryStatus = "idle" | "submitting" | "success" | "error";

export interface EnquiryResponse {
  status: "success" | "error";
  message: string;
}

export interface CompanyInfo {
  name: string;
  legalName: string;
  tagline: string;
  shortDescription: string;
  mission: string;
  vision: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  mapEmbedUrl: string;
  businessHours: string;
  socials: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  domain: string;
}
