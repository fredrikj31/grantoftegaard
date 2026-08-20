import { Home } from "lucide-react";
import { Link } from "react-router";
import { ProductGrid } from "../../components/ProductGrid";
import { CartSummary } from "../../components/CartSummary";
import { Button } from "@shadcn-ui/components/ui/button";
import type { Product } from "../../data/vegetables";

interface StoreRouteProps {
  title: string;
  products: Product[];
}

export const StoreRoute = ({ title, products }: StoreRouteProps) => {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="flex items-center gap-3 px-4 py-4 md:px-6 md:py-6">
          <Link to="/">
            <Button variant="outline" size="icon" aria-label="Til forsiden">
              <Home className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            {title}
          </h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto pb-24">
        <ProductGrid products={products} />
      </div>

      <CartSummary />
    </main>
  );
};
