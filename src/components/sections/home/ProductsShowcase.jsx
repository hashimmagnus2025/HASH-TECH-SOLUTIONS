import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/animations/Reveal";
import StaggerGroup from "@/components/animations/StaggerGroup";
import ArrowButton from "@/components/ui/ArrowButton";
import ProductCard from "@/components/business/ProductCard";
import { products } from "@/data/products";
const featuredProductIds = ["p1", "p3", "p9", "p11", "p13", "p7", "p17"];
export default function ProductsShowcase() {
  const featured = featuredProductIds.map(id => products.find(product => product.id === id)).filter(product => Boolean(product));
  return <Section tone="dark">
      <div className="flex flex-col gap-12">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Products & technology" title="Computers, networking and security hardware" description="A catalogue and enquiry experience, not a checkout — every item routes to a direct enquiry." />
          <ArrowButton href="/products">View full catalogue</ArrowButton>
        </Reveal>

        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map(product => <ProductCard key={product.id} product={product} />)}
        </StaggerGroup>
      </div>
    </Section>;
}
