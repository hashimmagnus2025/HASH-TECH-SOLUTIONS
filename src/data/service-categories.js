import { Cctv, Cpu, Network, ShieldCheck, AppWindow } from "lucide-react";
export const serviceCategories = [{
  slug: "computer-sales-services",
  name: "Computer Sales & Services",
  shortName: "Computers",
  description: "Desktops, laptops, workstations and peripherals, backed by repair, upgrade and data recovery support.",
  icon: Cpu
}, {
  slug: "it-hardware-networking",
  name: "IT Hardware & Networking",
  shortName: "Networking",
  description: "Servers, structured cabling, wireless networking and secure infrastructure built for growing teams.",
  icon: Network
}, {
  slug: "cctv-security-solutions",
  name: "CCTV & Security Solutions",
  shortName: "CCTV & Security",
  description: "Surveillance, access control and alarm systems that keep premises monitored around the clock.",
  icon: Cctv
}, {
  slug: "amc-maintenance-services",
  name: "AMC & Maintenance Services",
  shortName: "AMC & Maintenance",
  description: "Annual maintenance contracts and on-call support that keep hardware, networks and CCTV running.",
  icon: ShieldCheck
}, {
  slug: "software-it-solutions",
  name: "Software & IT Solutions",
  shortName: "Software & IT",
  description: "Operating systems, endpoint security, backups and consultancy that keep systems running smoothly.",
  icon: AppWindow
}];
export function getServiceCategory(slug) {
  return serviceCategories.find(category => category.slug === slug);
}
