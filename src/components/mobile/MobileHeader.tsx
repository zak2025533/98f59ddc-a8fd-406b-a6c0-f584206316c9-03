import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchDialog from "@/components/SearchDialog";
import { FavoritesSheet } from "@/components/FavoritesSheet";
import { CartSheet } from "@/components/CartSheet";
import AdminDialog from "@/components/AdminDialog";

interface MobileHeaderProps {
  title: string;
  showSearch?: boolean;
}

const actionItems = [
  { component: <SearchDialog />, label: "بحث" },
  { component: <FavoritesSheet />, label: "المفضلة" },
  { component: <CartSheet />, label: "السلة" },
  { component: <AdminDialog />, label: "لوحة التحكم" },
];

const MobileHeader = ({ title, showSearch = true }: MobileHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* الشريط العلوي */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white sticky top-0 z-40 pt-safe-area-inset-top rounded-t-xl rounded-b-xl shadow-md">
        <div className="flex items-center justify-between px-4 py-3">
          {/* اللوجو والعنوان */}
          <div className="flex items-center space-x-3 space-x-reverse">
            <img
              src="/lovable-uploads/420dd569-71cd-4e6b-9d6a-946abecbc0e9.png"
              alt="بلا حدود للحلويات"
              className="h-8 w-8"
            />
            <h1 className="text-lg font-bold font-arabic truncate">{title}</h1>
          </div>

          {/* أيقونات البحث + زر القائمة */}
          <div className="flex items-center space-x-2 space-x-reverse">
            {showSearch && <SearchDialog />}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="text-white hover:bg-white/20"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* القائمة الجانبية للموبايل عند فتح القائمة */}
      {isMenuOpen && (
        <div className="md:hidden h-screen py-6 px-6 bg-blue-700 border-t border-blue-500 z-30">
          <div className="flex flex-col space-y-5">
            {/* أيقونات رأسية مع تسميات */}
            {actionItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 space-x-reverse bg-white/10 p-2 rounded-lg"
              >
                {item.component}
                <span className="text-white font-arabic">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileHeader;

