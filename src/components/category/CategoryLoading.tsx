
import SimpleNavbar from "@/components/SimpleNavbar";
import SimpleFooter from "@/components/SimpleFooter";

const CategoryLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <SimpleNavbar />
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse text-xl text-blue-600 font-arabic">جاري التحميل...</div>
      </div>
      <SimpleFooter />
    </div>
  );
};

export default CategoryLoading;
