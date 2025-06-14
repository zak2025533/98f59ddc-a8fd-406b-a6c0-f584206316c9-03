
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUpload from "./ImageUpload";
import VideoUpload from "./VideoUpload";
import { AnnouncementFormData } from "./AnnouncementFormData";

interface AnnouncementFormFieldsProps {
  formData: AnnouncementFormData;
  setFormData: React.Dispatch<React.SetStateAction<AnnouncementFormData>>;
}

const AnnouncementFormFields = ({ formData, setFormData }: AnnouncementFormFieldsProps) => {
  const handleImageChange = (imageUrl: string | null) => {
    setFormData(prev => ({ ...prev, image_url: imageUrl || "" }));
  };

  const handleVideoChange = (videoUrl: string | null) => {
    setFormData(prev => ({ ...prev, video_url: videoUrl || "" }));
  };

  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default AnnouncementFormFields;
