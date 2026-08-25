import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { HomeRoute } from "./routes/home/route";
import { StoreRoute } from "./routes/store/route";
import { CartRoute } from "./routes/cart/route";
import { CartProvider } from "./providers/Cart";
import { PWAInstallProvider } from "./providers/PWAInstall";
import { PWAInstallPrompt } from "./components/PWAInstallPrompt";
import { stores } from "./config/stores";

export const App = () => {
  return (
    <BrowserRouter>
      <PWAInstallProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<HomeRoute />} />
            {stores.map((store) => (
              <Route
                key={store.path}
                path={store.path}
                element={<StoreRoute title={store.title} products={store.products} />}
              />
            ))}
            <Route path="/cart" element={<CartRoute />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <PWAInstallPrompt />
        </CartProvider>
      </PWAInstallProvider>
    </BrowserRouter>
  );
};
