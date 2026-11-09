import {
  Monitor,
  Laptop,
  Cpu,
  Printer,
  Server,
  Router,
  Cctv,
  ShieldCheck,
  Mouse,
} from "lucide-react";
import type { ProductCategory, ProductItem } from "@/types";

const PLACEHOLDER_IMAGE = "/images/placeholders/product-placeholder.svg";

export const productCategories: ProductCategory[] = [
  {
    slug: "desktop-computers",
    name: "Desktop Computers",
    description: "Business and performance desktops for office and workstation use.",
    icon: Monitor,
  },
  {
    slug: "laptops",
    name: "Laptops",
    description: "Notebooks for everyday business use and mobile teams.",
    icon: Laptop,
  },
  {
    slug: "workstations",
    name: "Workstations",
    description: "Higher-spec systems for demanding and compute-heavy workloads.",
    icon: Cpu,
  },
  {
    slug: "printers-scanners",
    name: "Printers & Scanners",
    description: "Office printers, scanners and multifunction devices.",
    icon: Printer,
  },
  {
    slug: "servers",
    name: "Servers",
    description: "Server hardware for file, application and backup roles.",
    icon: Server,
  },
  {
    slug: "networking-equipment",
    name: "Networking Equipment",
    description: "Switches, routers and wireless access points.",
    icon: Router,
  },
  {
    slug: "cctv-cameras",
    name: "CCTV Cameras",
    description: "IP and HD cameras for surveillance installations.",
    icon: Cctv,
  },
  {
    slug: "security-equipment",
    name: "Security Equipment",
    description: "Access control, alarm and video door phone hardware.",
    icon: ShieldCheck,
  },
  {
    slug: "computer-accessories",
    name: "Computer Accessories",
    description: "Peripherals, storage and everyday computer accessories.",
    icon: Mouse,
  },
];

/**
 * Demo catalogue entries for layout development. Generic category
 * representatives only — no brand, pricing or stock information is
 * implied or should be added without confirmed product data.
 */
export const products: ProductItem[] = [
  { id: "p1", name: "Business Desktop Tower", category: "desktop-computers", shortDescription: "Everyday desktop configuration for office use.", image: PLACEHOLDER_IMAGE },
  { id: "p2", name: "Compact Desktop PC", category: "desktop-computers", shortDescription: "Space-saving desktop for reception and counters.", image: PLACEHOLDER_IMAGE },
  { id: "p3", name: "Business Laptop", category: "laptops", shortDescription: "Lightweight notebook for everyday work and travel.", image: PLACEHOLDER_IMAGE },
  { id: "p4", name: "Performance Laptop", category: "laptops", shortDescription: "Higher-spec notebook for demanding applications.", image: PLACEHOLDER_IMAGE },
  { id: "p5", name: "Graphics Workstation", category: "workstations", shortDescription: "Workstation configuration for design and rendering work.", image: PLACEHOLDER_IMAGE },
  { id: "p6", name: "Engineering Workstation", category: "workstations", shortDescription: "High-compute workstation for engineering applications.", image: PLACEHOLDER_IMAGE },
  { id: "p7", name: "Multifunction Printer", category: "printers-scanners", shortDescription: "Print, scan and copy device for office use.", image: PLACEHOLDER_IMAGE },
  { id: "p8", name: "Document Scanner", category: "printers-scanners", shortDescription: "High-speed scanner for document digitization.", image: PLACEHOLDER_IMAGE },
  { id: "p9", name: "Tower Server", category: "servers", shortDescription: "Server configuration for file and application hosting.", image: PLACEHOLDER_IMAGE },
  { id: "p10", name: "Rack-Mount Server", category: "servers", shortDescription: "Rack server for data-center style deployments.", image: PLACEHOLDER_IMAGE },
  { id: "p11", name: "Managed Network Switch", category: "networking-equipment", shortDescription: "Managed switch for segmented business networks.", image: PLACEHOLDER_IMAGE },
  { id: "p12", name: "Wireless Access Point", category: "networking-equipment", shortDescription: "Access point for reliable office Wi-Fi coverage.", image: PLACEHOLDER_IMAGE },
  { id: "p13", name: "IP Dome Camera", category: "cctv-cameras", shortDescription: "Indoor IP dome camera for general area coverage.", image: PLACEHOLDER_IMAGE },
  { id: "p14", name: "HD Bullet Camera", category: "cctv-cameras", shortDescription: "Outdoor HD camera for perimeter surveillance.", image: PLACEHOLDER_IMAGE },
  { id: "p15", name: "Biometric Access Terminal", category: "security-equipment", shortDescription: "Fingerprint terminal for access and attendance.", image: PLACEHOLDER_IMAGE },
  { id: "p16", name: "Video Door Phone Kit", category: "security-equipment", shortDescription: "Video door phone system for controlled entry.", image: PLACEHOLDER_IMAGE },
  { id: "p17", name: "Wireless Keyboard & Mouse Set", category: "computer-accessories", shortDescription: "Everyday wireless peripherals for desktops.", image: PLACEHOLDER_IMAGE },
  { id: "p18", name: "External Storage Drive", category: "computer-accessories", shortDescription: "Portable storage for backup and file transfer.", image: PLACEHOLDER_IMAGE },
];

export function getProductsByCategory(category: string) {
  return products.filter((product) => product.category === category);
}
