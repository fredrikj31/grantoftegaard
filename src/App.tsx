import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { HomeRoute } from "./routes/home/route";
import { CartRoute } from "./routes/cart/route";
import { CartProvider } from "./providers/Cart";

export const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/cart" element={<CartRoute />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
};
