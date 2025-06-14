import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUpload from "./ImageUpload";
import VideoUpload from "./VideoUpload";

interface Announcement {
  id: string;
  title: string;
  description: string | null;
  type: string;
  is_active: boolean;
  start_date: string | null;
  end_date: string | null;
  image_url: string | null;
  video_url: string | null;
  product_id: string | null;
  discount_percentage: number | null;
  discount_amount: number | null;
  is_banner: boolean | null;
  banner_text: string | null;
}

interface AnnouncementDialogProps {
  isOpen: boolean;
  onClose: () => void;
  announcement?: Announcement | null;
  onSuccess: () => void;
}

const AnnouncementDialog = ({ isOpen, onClose, announcement, onSuccess }: AnnouncementDialogProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "general",
    is_active: true,
    start_date: null as Date | null,
    end_date: null as Date | null,
    image_url: "",
    video_url: "",
    product_id: "",
    discount_percentage: null as number | null,
    discount_amount: null as number | null,
    is_banner: false,
    banner_text: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      if (announcement) {
        setFormData({
          title: announcement.title,
          description: announcement.description || "",
          type: announcement.type,
          is_active: announcement.is_active,
          start_date: announcement.start_date ? new Date(announcement.start_date) : null,
          end_date: announcement.end_date ? new Date(announcement.end_date) : null,
          image_url: announcement.image_url || "",
          video_url: announcement.video_url || "",
          product_id: announcement.product_id || "",
          discount_percentage: announcement.discount_percentage || null,
          discount_amount: announcement.discount_amount || null,
          is_banner: announcement.is_banner || false,
          banner_text: announcement.banner_text || "",
        });
      } else {
        setFormData({
          title: "",
          description: "",
          type: "general",
          is_active: true,
          start_date: null,
          end_date: null,
          image_url: "",
          video_url: "",
          product_id: "",
          discount_percentage: null,
          discount_amount: null,
          is_banner: false,
          banner_text: "",
        });
      }
    }
  }, [isOpen, announcement]);

  const handleImageChange = (imageUrl: string | null) => {
    setFormData(prev => ({ ...prev, image_url: imageUrl || "" }));
  };

  const handleVideoChange = (videoUrl: string | null) => {
    setFormData(prev => ({ ...prev, video_url: videoUrl || "" }));
  };

  const sendNotificationForNewAnnouncement = async (title: string) => {
    try {
      await supabase.functions.invoke('send-push-notification', {
        body: {
          title: 'إعلان جديد!',
          body: title,
          type: 'announcement',
          related_id: null
        }
      });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال عنوان الإعلان",
        variant: "destructive",
      });
      return;
    }

    if (formData.type === 'discount' && !formData.discount_percentage && !formData.discount_amount) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال قيمة الخصم",
        variant: "destructive",
      });
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
        
        // إرسال إشعار للإعلان الجديد
        await sendNotificationForNewAnnouncement(formData.title);
      }

      onSuccess();
      onClose();
    } catch (error: any) {
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-right font-arabic text-blue-800">
            {announcement ? "تعديل إعلان" : "إضافة إعلان جديد"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title" className="text-right font-arabic">عنوان الإعلان *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
                placeholder="أدخل عنوان الإعلان"
                className="text-right font-arabic"
              />
            </div>

            <div>
              <Label htmlFor="type" className="text-right font-arabic">نوع الإعلان</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger className="text-right font-arabic">
                  <SelectValue placeholder="اختر نوع الإعلان" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general" className="font-arabic">عام</SelectItem>
                  <SelectItem value="discount" className="font-arabic">خصم</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-right font-arabic">وصف الإعلان</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="أدخل وصف الإعلان"
              className="text-right font-arabic"
              rows={3}
            />
          </div>

          {formData.type === "discount" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="discount_percentage" className="text-right font-arabic">نسبة الخصم (%)</Label>
                <Input
                  id="discount_percentage"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={formData.discount_percentage || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, discount_percentage: Number(e.target.value) }))}
                  placeholder="أدخل نسبة الخصم"
                  className="text-right"
                />
              </div>

              <div>
                <Label htmlFor="discount_amount" className="text-right font-arabic">قيمة الخصم (ريال)</Label>
                <Input
                  id="discount_amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.discount_amount || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, discount_amount: Number(e.target.value) }))}
                  placeholder="أدخل قيمة الخصم"
                  className="text-right"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-right font-arabic">تاريخ البداية</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-right font-normal",
                      !formData.start_date && "text-muted-foreground"
                    )}
                  >
                    {formData.start_date ? (
                      format(formData.start_date, "d MMMM yyyy", { locale: ar })
                    ) : (
                      <span>اختر تاريخ البداية</span>
                    )}
                    <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    locale={ar}
                    selected={formData.start_date}
                    onSelect={(date) => setFormData(prev => ({ ...prev, start_date: date }))}
                    disabled={formData.end_date ? { after: formData.end_date } : undefined}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label className="text-right font-arabic">تاريخ النهاية</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-right font-normal",
                      !formData.end_date && "text-muted-foreground"
                    )}
                  >
                    {formData.end_date ? (
                      format(formData.end_date, "d MMMM yyyy", { locale: ar })
                    ) : (
                      <span>اختر تاريخ النهاية</span>
                    )}
                    <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    locale={ar}
                    selected={formData.end_date}
                    onSelect={(date) => setFormData(prev => ({ ...prev, end_date: date }))}
                    disabled={formData.start_date ? { before: formData.start_date } : undefined}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <ImageUpload
            currentImageUrl={formData.image_url}
            onImageChange={handleImageChange}
            label="صورة الإعلان"
          />

          <VideoUpload
            currentVideoUrl={formData.video_url}
            onVideoChange={handleVideoChange}
            label="فيديو الإعلان"
          />

          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                />
                <Label htmlFor="is_active" className="font-arabic">تفعيل الإعلان</Label>
              </div>

              <div className="flex items-center space-x-2 space-x-reverse">
                <Switch
                  id="is_banner"
                  checked={formData.is_banner}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_banner: checked }))}
                />
                <Label htmlFor="is_banner" className="font-arabic">إعلان بانر</Label>
              </div>

              {formData.is_banner && (
                <div>
                  <Label htmlFor="banner_text" className="text-right font-arabic">نص البانر</Label>
                  <Input
                    id="banner_text"
                    value={formData.banner_text}
                    onChange={(e) => setFormData(prev => ({ ...prev, banner_text: e.target.value }))}
                    placeholder="أدخل نص البانر"
                    className="text-right font-arabic"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1 font-arabic bg-blue-600 hover:bg-blue-700">
              {isLoading ? "جاري الحفظ..." : announcement ? "تحديث الإعلان" : "إضافة الإعلان"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 font-arabic">
              إلغاء
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AnnouncementDialog;
