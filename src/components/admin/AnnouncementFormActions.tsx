
import { Button } from "@/components/ui/button";

interface AnnouncementFormActionsProps {
  isLoading: boolean;
  isEditing: boolean;
  onCancel: () => void;
}

const AnnouncementFormActions = ({ isLoading, isEditing, onCancel }: AnnouncementFormActionsProps) => {
  return (
    <div className="flex gap-4 pt-4">
      <Button type="submit" disabled={isLoading} className="flex-1 font-arabic bg-blue-600 hover:bg-blue-700">
        {isLoading ? "جاري الحفظ..." : isEditing ? "تحديث الإعلان" : "إضافة الإعلان"}
      </Button>
      <Button type="button" variant="outline" onClick={onCancel} className="flex-1 font-arabic">
        إلغاء
      </Button>
    </div>
  );
};

export default AnnouncementFormActions;
