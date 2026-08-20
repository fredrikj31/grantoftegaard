import { Link } from "react-router";
import { Button } from "@shadcn-ui/components/ui/button";
import { stores } from "../../config/stores";

export const HomeRoute = () => {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="flex items-center px-4 py-4 md:px-6 md:py-6">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Grantoftegaard</h1>
        </div>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center gap-6 p-6">
        <p className="text-lg text-muted-foreground">Vælg butik</p>
        <div className="flex w-full max-w-sm flex-col gap-4">
          {stores.map((store) => (
            <Link to={store.path} className="w-full">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-8 text-lg font-semibold">
                <span className="text-4xl">{store.emoji}</span>
                {store.title}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};
