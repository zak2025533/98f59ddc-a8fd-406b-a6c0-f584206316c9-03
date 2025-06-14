
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface CategorySearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const CategorySearch = ({ searchTerm, onSearchChange }: CategorySearchProps) => {
  return (
    <div className="flex gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="البحث في الأقسام..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 font-arabic border-gray-200 focus:border-blue-300 focus:ring-blue-200"
        />
      </div>
    </div>
  );
};

export default CategorySearch;
