
import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, ServerCrash, ShoppingCart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useDebounce } from "@/hooks/use-debounce";

interface ProductSearchResult {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  categories: { slug: string } | null;
}

const SearchDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<ProductSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const performSearch = useCallback(async () => {
    if (debouncedSearchTerm.length < 3) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          id,
          name,
          description,
          price,
          image_url,
          categories ( slug )
        `)
        .ilike('name', `%${debouncedSearchTerm}%`)
        .limit(10);

      if (error) throw error;
      
      setResults(data || []);
    } catch (err: any) {
      setError("حدث خطأ أثناء البحث. يرجى المحاولة مرة أخرى.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    performSearch();
  }, [performSearch]);

  const handleProductClick = (product: ProductSearchResult) => {
    if (product.categories?.slug) {
      window.location.href = `/category/${product.categories.slug}`;
    }
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
          <Search className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] bg-white p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-right font-arabic">ابحث عن منتج</DialogTitle>
        </DialogHeader>
        <div className="p-6 pt-2">
          <div className="relative">
            <Input
              type="text"
              placeholder="اكتب اسم المنتج..."
              className="w-full p-2 pr-4 pl-10 font-arabic h-12 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          <div className="mt-4 max-h-[400px] overflow-y-auto">
            {loading && (
              <div className="flex justify-center items-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            )}
            {error && (
              <div className="flex flex-col items-center justify-center p-8 text-red-600">
                <ServerCrash className="h-8 w-8 mb-2" />
                <p className="font-arabic">{error}</p>
              </div>
            )}
            {!loading && !error && results.length > 0 && (
              <ul className="space-y-2">
                {results.map((product) => (
                  <li
                    key={product.id}
                    className="flex items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleProductClick(product)}
                  >
                    <img src={product.image_url} alt={product.name} className="h-16 w-16 object-cover rounded-md" />
                    <div className="mr-4">
                      <h3 className="font-semibold font-arabic">{product.name}</h3>
                      <p className="text-sm text-gray-500 font-arabic truncate w-64">{product.description}</p>
                      <p className="font-bold text-blue-700 font-arabic">{product.price.toFixed(2)} ريال</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {!loading && !error && debouncedSearchTerm.length > 2 && results.length === 0 && (
              <div className="text-center p-8 text-gray-500">
                <p className="font-arabic">لم يتم العثور على نتائج لـ "{debouncedSearchTerm}"</p>
              </div>
            )}
            {!loading && debouncedSearchTerm.length < 3 && (
               <div className="text-center p-8 text-gray-500 flex flex-col items-center">
                 <ShoppingCart className="h-12 w-12 text-gray-300 mb-4" />
                <p className="font-arabic">أدخل 3 أحرف على الأقل للبحث عن منتجاتنا</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
