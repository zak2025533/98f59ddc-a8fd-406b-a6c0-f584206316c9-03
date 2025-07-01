
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/hooks/cart/CartProvider";
import { FavoritesProvider } from "@/hooks/useFavorites";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <FavoritesProvider>
          <BrowserRouter>
            <App />
            <Toaster />
          </BrowserRouter>
        </FavoritesProvider>
      </CartProvider>
    </QueryClientProvider>
  </StrictMode>
);
