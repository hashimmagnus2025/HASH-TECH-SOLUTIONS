"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { navItems } from "@/data/nav";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import IconBox from "@/components/ui/IconBox";
import Logo from "@/components/layout/Logo";
import { cn } from "@/lib/utils";
export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState(null);
  const [openMobileAccordion, setOpenMobileAccordion] = useState(null);
  const isActive = href => href === "/" ? pathname === "/" : pathname.startsWith(href);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);
  useEffect(() => {
    const onKeyDown = event => {
      if (event.key !== "Escape") return;
      setOpenDesktopDropdown(null);
      setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
  return <header className={cn("sticky top-0 z-50 w-full transition-all duration-300", scrolled ? "border-b border-line bg-ink/80 backdrop-blur-md" : "border-b border-transparent bg-transparent")}>
      <Container className="flex h-18 items-center justify-between py-3">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navItems.map(item => <div key={item.href} className="relative" onMouseEnter={() => item.children && setOpenDesktopDropdown(item.label)} onMouseLeave={() => item.children && setOpenDesktopDropdown(null)}>
              {item.children ? <button className={cn("group relative flex items-center gap-1 rounded-full px-4 py-2 text-sm transition-colors hover:text-fg", isActive(item.href) ? "text-fg" : "text-fg-muted")} aria-expanded={openDesktopDropdown === item.label} onClick={() => setOpenDesktopDropdown(current => current === item.label ? null : item.label)}>
                  {item.label}
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", openDesktopDropdown === item.label && "rotate-180")} aria-hidden />
                  <span aria-hidden className={cn("pointer-events-none absolute inset-x-4 -bottom-0.5 h-px origin-center scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100", isActive(item.href) && "scale-x-100")} />
                </button> : <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={cn("group relative rounded-full px-4 py-2 text-sm transition-colors hover:text-fg", isActive(item.href) ? "text-fg" : "text-fg-muted")}>
                  {item.label}
                  <span aria-hidden className={cn("pointer-events-none absolute inset-x-4 -bottom-0.5 h-px origin-center scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100", isActive(item.href) && "scale-x-100")} />
                </Link>}

              {item.children && <div className={cn("absolute left-1/2 top-full z-50 w-[22rem] -translate-x-1/2 pt-3 transition-all duration-200", openDesktopDropdown === item.label ? "visible translate-y-0 scale-100 opacity-100" : "invisible -translate-y-1 scale-95 opacity-0")} style={{
            transformOrigin: "top center"
          }}>
                  <div className="grid gap-1 rounded-2xl border border-line bg-surface p-3 shadow-[var(--shadow-elevated)]">
                    {item.children.map(child => {
                const Icon = child.icon;
                return <Link key={child.href} href={child.href} className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-surface-hover">
                          {Icon && <IconBox icon={Icon} size="sm" />}
                          <span>
                            <span className="block text-sm font-medium text-fg">{child.label}</span>
                            {child.description && <span className="mt-0.5 block text-xs leading-snug text-fg-subtle">
                                {child.description}
                              </span>}
                          </span>
                        </Link>;
              })}
                  </div>
                </div>}
            </div>)}
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact" variant="primary" size="md">
            Get a Quote
          </Button>
        </div>

        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg lg:hidden" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} onClick={() => setMobileOpen(open => !open)}>
          {mobileOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </Container>

      <div id="mobile-menu" className={cn("fixed inset-x-0 top-18 z-40 overflow-y-auto border-t border-line bg-ink transition-[max-height,opacity] duration-300 lg:hidden", mobileOpen ? "max-h-[calc(100vh-4.5rem)] opacity-100" : "pointer-events-none max-h-0 opacity-0")}>
        <Container className="flex flex-col gap-1 py-6">
          {navItems.map(item => <div key={item.href} className="border-b border-line/60 py-1 last:border-none">
              {item.children ? <>
                  <button className="flex w-full items-center justify-between py-3 text-left text-base text-fg" aria-expanded={openMobileAccordion === item.label} onClick={() => setOpenMobileAccordion(current => current === item.label ? null : item.label)}>
                    {item.label}
                    <ChevronDown className={cn("h-4 w-4 transition-transform", openMobileAccordion === item.label && "rotate-180")} aria-hidden />
                  </button>
                  <div className={cn("grid overflow-hidden transition-all duration-300", openMobileAccordion === item.label ? "grid-rows-[1fr] pb-3 opacity-100" : "grid-rows-[0fr] opacity-0")}>
                    <div className="flex flex-col gap-1 overflow-hidden pl-3">
                      {item.children.map(child => <Link key={child.href} href={child.href} className="rounded-lg py-2 text-sm text-fg-muted hover:text-fg" onClick={() => setMobileOpen(false)}>
                          {child.label}
                        </Link>)}
                    </div>
                  </div>
                </> : <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={cn("block py-3 text-base", isActive(item.href) ? "text-accent" : "text-fg")} onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>}
            </div>)}

          <Button href="/contact" variant="primary" size="lg" className="mt-4 w-full">
            Get a Quote
          </Button>
        </Container>
      </div>
    </header>;
}
