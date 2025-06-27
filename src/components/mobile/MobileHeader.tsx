import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchDialog from "@/components/SearchDialog";

interface MobileHeaderProps {
  title: string;
  showSearch?: boolean;
  onMenuClick?: () => void;
}

const MobileHeader = ({ title, showSearch = true, onMenuClick }: MobileHeaderProps) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white sticky top-0 z-40 pt-safe-area-inset-top rounded-t-xl rounded-b-xl shadow-md">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3 space-x-reverse">
          <img 
            src="/lovable-uploads/420dd569-71cd-4e6b-9d6a-946abecbc0e9.png" 
            alt="بلا حدود للحلويات" 
            className="h-8 w-8"
          />
          <h1 className="text-lg font-bold font-arabic truncate">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-2 space-x-reverse">
          {showSearch && <SearchDialog />}
          {onMenuClick && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="text-white hover:bg-white/20"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
