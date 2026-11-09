import {
  Building2,
  GraduationCap,
  HeartPulse,
  Factory,
  Store,
  Users,
  Landmark,
  User,
} from "lucide-react";
import type { Industry } from "@/types";

const PLACEHOLDER_IMAGE = "/images/placeholders/industry-placeholder.svg";

export const industries: Industry[] = [
  {
    slug: "corporate-offices",
    name: "Corporate Offices",
    description:
      "Reliable workstations, networking and support that keep office teams productive without IT interruptions getting in the way.",
    solutions: [
      "Desktop and laptop fleets with structured support",
      "Office networking, Wi-Fi and firewall setup",
      "AMC cover for predictable, planned maintenance",
      "Access control for staff and visitor areas",
    ],
    icon: Building2,
    image: PLACEHOLDER_IMAGE,
  },
  {
    slug: "education",
    name: "Schools & Colleges",
    description:
      "Computer labs, campus networking and CCTV coverage sized for institutions balancing budgets with large numbers of users.",
    solutions: [
      "Computer lab setup and ongoing maintenance",
      "Campus-wide networking and Wi-Fi coverage",
      "CCTV coverage for campus and premises security",
      "AMC support to minimize classroom downtime",
    ],
    icon: GraduationCap,
    image: PLACEHOLDER_IMAGE,
  },
  {
    slug: "healthcare",
    name: "Hospitals & Healthcare",
    description:
      "Dependable IT and security infrastructure for environments where uptime and data handling matter more than most.",
    solutions: [
      "Reliable networking across departments and wards",
      "CCTV and access control for sensitive areas",
      "Data backup and recovery planning",
      "Priority AMC support for critical systems",
    ],
    icon: HeartPulse,
    image: PLACEHOLDER_IMAGE,
  },
  {
    slug: "manufacturing",
    name: "Factories & Industries",
    description:
      "Rugged networking, surveillance and infrastructure support suited to industrial sites and production environments.",
    solutions: [
      "Structured cabling and networking across the facility",
      "CCTV coverage for production and perimeter areas",
      "Access control for restricted zones",
      "AMC cover for continuous operations",
    ],
    icon: Factory,
    image: PLACEHOLDER_IMAGE,
  },
  {
    slug: "retail",
    name: "Retail Businesses",
    description:
      "Point-of-sale support, CCTV and networking that help retail locations run smoothly and stay secure during trading hours.",
    solutions: [
      "Point-of-sale and counter hardware support",
      "CCTV coverage for sales floor and stockroom",
      "Reliable in-store networking and Wi-Fi",
      "Rapid-response AMC for trading-hour issues",
    ],
    icon: Store,
    image: PLACEHOLDER_IMAGE,
  },
  {
    slug: "smes",
    name: "Small & Medium Businesses",
    description:
      "Right-sized IT, networking and security solutions for growing businesses that need dependable support without an in-house team.",
    solutions: [
      "IT hardware and software sized to the business",
      "Business IT support in place of an in-house team",
      "CCTV and access control for premises security",
      "AMC plans that scale as the business grows",
    ],
    icon: Users,
    image: PLACEHOLDER_IMAGE,
  },
  {
    slug: "government",
    name: "Government Organizations",
    description:
      "Structured, well-documented IT and security infrastructure suited to government and public sector requirements.",
    solutions: [
      "Documented network and infrastructure setup",
      "CCTV and access control for public buildings",
      "AMC contracts for planned, accountable maintenance",
      "IT consultancy for infrastructure planning",
    ],
    icon: Landmark,
    image: PLACEHOLDER_IMAGE,
  },
  {
    slug: "individual-customers",
    name: "Individual Customers",
    description:
      "The same sales, repair and installation support offered to businesses, available for personal computers, home networks and home CCTV.",
    solutions: [
      "Personal computer and laptop sales, repair and upgrades",
      "Home Wi-Fi and networking setup",
      "Home CCTV and video door phone installation",
      "Data recovery and backup for personal devices",
    ],
    icon: User,
    image: PLACEHOLDER_IMAGE,
  },
];
