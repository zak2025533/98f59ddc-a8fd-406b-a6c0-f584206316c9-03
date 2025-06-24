import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNativeApp } from "@/hooks/useNativeApp";
import SearchDialog from "@/components/SearchDialog";

interface MobileHeaderProps {
  title: string;
  showSearch?: boolean;
  onMenuClick?: () => void;
}

const MobileHeader = ({ title, showSearch = true, onMenuClick }: MobileHeaderProps) => {
  const { isNative } = useNativeApp();

  return (
    <header
      className={`bg-gradient-to-r from-blue-600 to-blue-800 text-white sticky top-0 z-50 ${
        isNative ? 'pt-safe-area-inset-top' : ''
      } shadow-md`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <img
            src="/lovable-uploads/420dd569-71cd-4e6b-9d6a-946abecbc0e9.png"
            alt="بلا حدود للحلويات"
            className="h-9 w-9 rounded-full object-cover"
          />
          <h1 className="text-base sm:text-lg font-bold font-arabic truncate max-w-[60vw]">
            {title}
          </h1>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          {showSearch && <SearchDialog />}
          {onMenuClick && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="text-white hover:bg-white/20 rounded-full"
            >
              <Menu className="h-6 w-6" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
