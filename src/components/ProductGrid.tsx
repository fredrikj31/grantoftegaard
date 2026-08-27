import { Button } from "@shadcn-ui/components/ui/button";
import { useCart } from "../providers/Cart";
import type { Product } from "../data/vegetables";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const { addItem } = useCart();

  // Sort products by index
  const sortedProducts = products.toSorted((a, b) => a.index - b.index);

  return (
    <div className="grid grid-cols-3 gap-3 p-4 md:gap-4">
      {sortedProducts.map((product) => (
        <Button
          key={product.id}
          onClick={() =>
            addItem({
              id: product.id,
              name: product.name,
              price: product.price,
              emoji: product.emoji,
            })
          }
          variant="outline"
          className="h-auto flex-col items-center justify-center gap-2 py-4"
        >
          <span className="text-3xl">{product.emoji}</span>
          <span className="text-xs font-semibold text-center line-clamp-2 whitespace-pre-line">{product.name}</span>
          <span className="text-sm font-bold">{product.price} kr</span>
        </Button>
      ))}
    </div>
  );
}
