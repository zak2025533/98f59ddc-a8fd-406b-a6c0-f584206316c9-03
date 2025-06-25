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
import Footer from "./components/Footer"; // ✅ تأكد من الاستيراد

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000,
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
            {/* ✅ الحاوية الزرقاء الخارجية */}
            <div
              className="min-h-[100dvh] bg-[#2563eb] pt-safe-top pb-safe-bottom font-arabic"
              style={{ display: "flex", flexDirection: "column" }}
            >
              {/* ✅ الصندوق الأبيض الكامل بدون انضغاط */}
              <div className="flex-1 w-full bg-white rounded-t-2xl shadow-lg p-4">
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
                <Footer />
              </div>
            </div>
          </BrowserRouter>
        </FavoritesProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
