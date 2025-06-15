
import SimpleNavbar from "@/components/SimpleNavbar";
import SimpleFooter from "@/components/SimpleFooter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CategoryNotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <SimpleNavbar />
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-red-600 font-arabic">القسم غير موجود</h1>
        <Button onClick={() => window.history.back()} className="mt-4 font-arabic bg-blue-600 hover:bg-blue-700">
          <ArrowLeft className="mr-2 h-4 w-4" />
          العودة
        </Button>
      </div>
      <SimpleFooter />
    </div>
  );
};

export default CategoryNotFound;
