
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CartProvider } from "@/hooks/cart/CartProvider";
import { FavoritesProvider } from "@/hooks/useFavorites";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </CartProvider>
  </StrictMode>
);
