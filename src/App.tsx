import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/hooks/useCart";
import { FavoritesProvider } from "@/hooks/useFavorites";
import Index from "./pages/Index";
import Category from "./pages/Category";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 دقائق
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <FavoritesProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div
              className="min-h-[100dvh] pt-safe-top pb-safe-bottom flex flex-col justify-start bg-background font-arabic"
              style={{
                background: `linear-gradient(to bottom, #2563eb 0%, #2563eb 150px, transparent 300px)`,
              }}
            >
              <div className="bg-white rounded-t-xl shadow-lg p-4 mx-auto max-w-screen-lg">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/category" element={<Category />} />
                  <Route path="/category/:categorySlug" element={<Category />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/admin/*" element={<Admin />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        </FavoritesProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
