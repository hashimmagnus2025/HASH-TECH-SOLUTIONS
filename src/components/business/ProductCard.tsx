import Image from "next/image";
import type { ProductItem } from "@/types";
import { productCategories } from "@/data/products";
import Button from "@/components/ui/Button";
import ImageReveal from "@/components/animations/ImageReveal";

export default function ProductCard({ product }: { product: ProductItem }) {
  const category = productCategories.find((c) => c.slug === product.category);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-(--shadow-elevated)">
      <ImageReveal className="relative aspect-4/3 bg-surface-raised">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </ImageReveal>
      <div className="flex flex-1 flex-col gap-3 p-5">
        {category && (
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.15em] text-fg-subtle">
            {category.name}
          </span>
        )}
        <h3 className="font-display text-base font-medium text-fg">{product.name}</h3>
        <p className="text-sm leading-relaxed text-fg-muted">{product.shortDescription}</p>
        <Button href="/contact" variant="outline" size="md" className="mt-auto w-fit">
          Enquire
        </Button>
      </div>
    </div>
  );
}
