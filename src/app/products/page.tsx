import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Section from "@/components/ui/Section";
import IconBox from "@/components/ui/IconBox";
import Badge from "@/components/ui/Badge";
import Reveal from "@/components/animations/Reveal";
import TextReveal from "@/components/animations/TextReveal";
import StaggerGroup from "@/components/animations/StaggerGroup";
import ProductCard from "@/components/business/ProductCard";
import { productCategories, getProductsByCategory } from "@/data/products";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Products",
  description:
    "A product catalogue and enquiry experience covering computers, laptops, workstations, servers, networking equipment, CCTV cameras, security equipment and computer accessories.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <section className="border-b border-line pb-16 pt-10">
        <Container className="flex flex-col gap-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Products" }]} />
          <div className="flex flex-col gap-5">
            <Reveal>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                Product catalogue
              </span>
            </Reveal>
            <TextReveal
              as="h1"
              text="Computers, networking and security hardware"
              className="max-w-3xl font-display text-4xl font-medium leading-tight text-fg sm:text-5xl"
            />
            <Reveal delay={0.15}>
              <p className="max-w-2xl text-lg leading-relaxed text-fg-muted">
                A catalogue and enquiry experience, not a checkout. Pricing, stock and
                manufacturer details are confirmed directly when you enquire.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.25} className="flex flex-wrap gap-2">
            {productCategories.map((category) => (
              <Link
                key={category.slug}
                href={`#${category.slug}`}
                className="rounded-full border border-line-strong px-4 py-2 text-sm text-fg-muted transition-colors hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                {category.name}
              </Link>
            ))}
          </Reveal>
        </Container>
      </section>

      {productCategories.map((category, index) => {
        const Icon = category.icon;
        const items = getProductsByCategory(category.slug);

        return (
          <Section key={category.slug} id={category.slug} tone={index % 2 === 0 ? "dark" : "raised"}>
            <div className="flex flex-col gap-10">
              <Reveal className="flex flex-wrap items-start justify-between gap-6">
                <div className="flex items-start gap-4">
                  <IconBox icon={Icon} size="lg" />
                  <div className="flex flex-col gap-2">
                    <h2 className="font-display text-2xl font-medium text-fg">{category.name}</h2>
                    <p className="max-w-xl text-sm leading-relaxed text-fg-muted">{category.description}</p>
                  </div>
                </div>
                <Badge tone="muted">{items.length} items</Badge>
              </Reveal>

              <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </StaggerGroup>
            </div>
          </Section>
        );
      })}
    </>
  );
}
