
import { Button } from "@/components/ui/button";

interface AnnouncementFormActionsProps {
  isLoading: boolean;
  isEditing: boolean;
  onCancel: () => void;
}

const AnnouncementFormActions = ({ isLoading, isEditing, onCancel }: AnnouncementFormActionsProps) => {
  return (
    <div className="flex gap-4 pt-4 bg-green-50 p-4 rounded-lg border border-green-200">
      <Button 
        type="submit" 
        disabled={isLoading} 
        className="flex-1 font-arabic bg-green-600 hover:bg-green-700 text-white border-0"
      >
        {isLoading ? "جاري الحفظ..." : isEditing ? "تحديث الإعلان" : "إضافة الإعلان"}
      </Button>
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel} 
        className="flex-1 font-arabic border-2 border-green-300 text-green-700 hover:bg-green-100"
      >
        إلغاء
      </Button>
    </div>
  );
};

export default AnnouncementFormActions;
