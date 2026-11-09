import { serviceCategories } from "./service-categories";
export const navItems = [{
  label: "Home",
  href: "/"
}, {
  label: "About",
  href: "/about"
}, {
  label: "Services",
  href: "/services",
  children: serviceCategories.map(category => ({
    label: category.name,
    href: `/services#${category.slug}`,
    description: category.description,
    icon: category.icon
  }))
}, {
  label: "Products",
  href: "/products"
}, {
  label: "AMC Services",
  href: "/amc-services"
}, {
  label: "Industries",
  href: "/industries"
}, {
  label: "Projects",
  href: "/projects"
}, {
  label: "Contact",
  href: "/contact"
}];
export const footerNavGroups = [{
  title: "Company",
  links: [{
    label: "About Us",
    href: "/about"
  }, {
    label: "Industries We Serve",
    href: "/industries"
  }, {
    label: "Projects",
    href: "/projects"
  }, {
    label: "Contact",
    href: "/contact"
  }]
}, {
  title: "Services",
  links: serviceCategories.map(category => ({
    label: category.name,
    href: `/services#${category.slug}`
  }))
}, {
  title: "Resources",
  links: [{
    label: "Products Catalogue",
    href: "/products"
  }, {
    label: "AMC Services",
    href: "/amc-services"
  }, {
    label: "Privacy Policy",
    href: "/privacy-policy"
  }, {
    label: "Terms & Conditions",
    href: "/terms-and-conditions"
  }]
}];
