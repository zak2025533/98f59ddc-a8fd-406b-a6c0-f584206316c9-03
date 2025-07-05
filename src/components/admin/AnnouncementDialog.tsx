import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Announcement,
  AnnouncementFormData,
  getInitialFormData,
  mapAnnouncementToFormData
} from "./AnnouncementFormData";
import AnnouncementFormFields from "./AnnouncementFormFields";
import AnnouncementFormActions from "./AnnouncementFormActions";

interface AnnouncementDialogProps {
  isOpen: boolean;
  onClose: () => void;
  announcement?: Announcement | null;
  onSuccess: () => void;
}

const AnnouncementDialog = ({ isOpen, onClose, announcement, onSuccess }: AnnouncementDialogProps) => {
  const [formData, setFormData] = useState<AnnouncementFormData>(getInitialFormData());
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      if (announcement) {
        setFormData(mapAnnouncementToFormData(announcement));
      } else {
        setFormData(getInitialFormData());
      }
    }
  }, [isOpen, announcement]);

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال عنوان الإعلان",
        variant: "destructive",
      });
      return false;
    }

    if (formData.type === 'discount' && !formData.discount_percentage && !formData.discount_amount) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال قيمة الخصم",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const announcementData = {
        title: formData.title.trim(),
        description: formData.description.trim() || null,
        type: formData.type,
        is_active: formData.is_active,
        start_date: formData.start_date?.toISOString() || null,
        end_date: formData.end_date?.toISOString() || null,
        image_url: formData.image_url || null,
        video_url: formData.video_url || null,
        product_id: formData.product_id || null,
        discount_percentage: formData.discount_percentage || null,
        discount_amount: formData.discount_amount || null,
        is_banner: formData.is_banner,
        banner_text: formData.banner_text.trim() || null,
      };

      if (announcement) {
        const { error } = await supabase
          .from('announcements')
          .update(announcementData)
          .eq('id', announcement.id);

        if (error) throw error;

        toast({ title: "تم التحديث", description: "تم تحديث الإعلان بنجاح" });
      } else {
        const { error } = await supabase
          .from('announcements')
          .insert([announcementData]);

        if (error) throw error;

        toast({ title: "تم الإضافة", description: "تم إضافة الإعلان بنجاح" });
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Error saving announcement:', error);
      toast({
        title: "خطأ",
        description: error.message || "تعذر حفظ الإعلان",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-2 border-green-300">
        <DialogHeader className="bg-green-50 -mx-6 -mt-6 px-6 py-4 border-b border-green-200">
          <DialogTitle className="text-right font-arabic text-green-800 text-xl">
            {announcement ? "تعديل إعلان" : "إضافة إعلان جديد"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <AnnouncementFormFields formData={formData} setFormData={setFormData} />
          <AnnouncementFormActions 
            isLoading={isLoading} 
            isEditing={!!announcement} 
            onCancel={onClose} 
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AnnouncementDialog;
