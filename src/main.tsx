
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CartProvider } from "@/hooks/cart/CartProvider";
import { FavoritesProvider } from "@/hooks/useFavorites";
import App from "./App";
import "./index.css";

// تسجيل Service Worker للإشعارات
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/OneSignalSDKWorker.js')
    .then(() => console.log('OneSignal Service Worker registered'))
    .catch(err => console.log('OneSignal Service Worker registration failed:', err));
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </CartProvider>
  </StrictMode>
);
