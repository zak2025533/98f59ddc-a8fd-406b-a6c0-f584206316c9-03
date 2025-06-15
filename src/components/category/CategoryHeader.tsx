
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface CategoryHeaderProps {
  name: string;
}

const CategoryHeader = ({ name }: CategoryHeaderProps) => {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-7xl mx-auto text-center text-white">
        <Button
          onClick={() => window.history.back()}
          variant="outline"
          className="mb-6 font-arabic bg-transparent text-white border-white/50 hover:bg-white/20 hover:text-white"
        >
          <ArrowLeft className="ml-2 h-4 w-4" />
          العودة للخلف
        </Button>
        <h1 className="text-5xl font-bold mb-4 font-arabic">{name}</h1>
        <p className="text-xl opacity-90 font-arabic">اكتشف أفضل المنتجات في هذا القسم</p>
      </div>
    </section>
  );
};

export default CategoryHeader;
