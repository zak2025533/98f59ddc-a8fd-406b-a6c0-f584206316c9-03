
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, Edit } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import ImageUpload from "./ImageUpload";
import VideoUpload from "./VideoUpload";

interface Product {
  id: string;
  name: string;
}

interface Announcement {
  id: string;
  title: string;
  description: string | null;
  type: string;
  product_id: string | null;
  discount_percentage: number | null;
  discount_amount: number | null;
  image_url: string | null;
  video_url: string | null;
  banner_text: string | null;
  is_active: boolean;
  is_banner: boolean | null;
  start_date: string | null;
  end_date: string | null;
}

interface AnnouncementDialogProps {
  announcement?: Announcement;
  onSave: () => void;
  trigger?: React.ReactNode;
}

const AnnouncementDialog = ({ announcement, onSave, trigger }: AnnouncementDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "general",
    product_id: "",
    discount_percentage: "",
    discount_amount: "",
    image_url: "",
    video_url: "",
    banner_text: "",
    is_active: true,
    is_banner: false,
    start_date: null as Date | null,
    end_date: null as Date | null,
  });

  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      fetchProducts();
      if (announcement) {
        setFormData({
          title: announcement.title,
          description: announcement.description || "",
          type: announcement.type,
          product_id: announcement.product_id || "",
          discount_percentage: announcement.discount_percentage?.toString() || "",
          discount_amount: announcement.discount_amount?.toString() || "",
          image_url: announcement.image_url || "",
          video_url: announcement.video_url || "",
          banner_text: announcement.banner_text || "",
          is_active: announcement.is_active,
          is_banner: announcement.is_banner || false,
          start_date: announcement.start_date ? new Date(announcement.start_date) : null,
          end_date: announcement.end_date ? new Date(announcement.end_date) : null,
        });
      } else {
        setFormData({
          title: "",
          description: "",
          type: "general",
          product_id: "",
          discount_percentage: "",
          discount_amount: "",
          image_url: "",
          video_url: "",
          banner_text: "",
          is_active: true,
          is_banner: false,
          start_date: null,
          end_date: null,
        });
      }
    }
  }, [open, announcement]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, name')
        .order('name');

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
        title: formData.title,
        description: formData.description || null,
        type: formData.type,
        product_id: formData.product_id || null,
        discount_percentage: formData.discount_percentage ? parseInt(formData.discount_percentage) : null,
        discount_amount: formData.discount_amount ? parseFloat(formData.discount_amount) : null,
        image_url: formData.image_url || null,
        video_url: formData.video_url || null,
        banner_text: formData.banner_text || null,
        is_active: formData.is_active,
        is_banner: formData.is_banner,
        start_date: formData.start_date?.toISOString() || null,
        end_date: formData.end_date?.toISOString() || null,
      };

      if (announcement) {
        const { error } = await supabase
          .from('announcements')
          .update(submitData)
          .eq('id', announcement.id);

        if (error) throw error;

        toast({
          title: "تم التحديث بنجاح",
          description: "تم تحديث الإعلان بنجاح",
        });
      } else {
        const { error } = await supabase
          .from('announcements')
          .insert([submitData]);

        if (error) throw error;

        toast({
          title: "تم الحفظ بنجاح",
          description: "تم إضافة الإعلان بنجاح",
        });
      }

      setOpen(false);
      onSave();
    } catch (error) {
      console.error('Error saving announcement:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ الإعلان",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="font-arabic">
            <Plus className="h-4 w-4 ml-2" />
            إضافة إعلان جديد
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-arabic text-right">
            {announcement ? "تعديل الإعلان" : "إضافة إعلان جديد"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="font-arabic">عنوان الإعلان</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="text-right font-arabic"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type" className="font-arabic">نوع الإعلان</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger className="text-right font-arabic">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">إعلان عام</SelectItem>
                  <SelectItem value="discount">تخفيض</SelectItem>
                  <SelectItem value="promotion">عرض ترويجي</SelectItem>
                  <SelectItem value="news">أخبار</SelectItem>
                  <SelectItem value="event">إعلان مناسبة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="font-arabic">وصف الإعلان</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="text-right font-arabic"
              rows={3}
            />
          </div>

          {/* إعدادات البانر */}
          <div className="p-4 border rounded-lg bg-blue-50">
            <div className="flex items-center space-x-2 space-x-reverse mb-4">
              <Switch
                id="is_banner"
                checked={formData.is_banner}
                onCheckedChange={(checked) => setFormData({ ...formData, is_banner: checked })}
              />
              <Label htmlFor="is_banner" className="font-arabic font-semibold">عرض كبانر رئيسي</Label>
            </div>

            {formData.is_banner && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="banner_text" className="font-arabic">نص البانر الرئيسي</Label>
                  <Input
                    id="banner_text"
                    value={formData.banner_text}
                    onChange={(e) => setFormData({ ...formData, banner_text: e.target.value })}
                    className="text-right font-arabic"
                    placeholder="نص إضافي للبانر الرئيسي"
                  />
                </div>
              </div>
            )}
          </div>

          {/* قسم إعلانات المناسبات مع رفع الفيديو */}
          {formData.type === 'event' && (
            <div className="p-4 border rounded-lg bg-purple-50">
              <h3 className="font-arabic font-semibold mb-4 text-right">إعدادات إعلان المناسبة</h3>
              <VideoUpload
                currentVideoUrl={formData.video_url}
                onVideoChange={(url) => setFormData({ ...formData, video_url: url || "" })}
                label="فيديو المناسبة"
              />
            </div>
          )}

          {/* قسم التخفيضات */}
          {formData.type === 'discount' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-yellow-50">
              <div className="space-y-2">
                <Label htmlFor="product" className="font-arabic">المنتج</Label>
                <Select
                  value={formData.product_id}
                  onValueChange={(value) => setFormData({ ...formData, product_id: value })}
                >
                  <SelectTrigger className="text-right font-arabic">
                    <SelectValue placeholder="اختر المنتج" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="discount_percentage" className="font-arabic">نسبة التخفيض (%)</Label>
                <Input
                  id="discount_percentage"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.discount_percentage}
                  onChange={(e) => setFormData({ ...formData, discount_percentage: e.target.value })}
                  className="text-right font-arabic"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discount_amount" className="font-arabic">مبلغ التخفيض (ريال)</Label>
                <Input
                  id="discount_amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.discount_amount}
                  onChange={(e) => setFormData({ ...formData, discount_amount: e.target.value })}
                  className="text-right font-arabic"
                />
              </div>
            </div>
          )}

          {/* رفع الصور للإعلانات العادية */}
          {formData.type !== 'event' && (
            <div className="space-y-2">
              <ImageUpload
                currentImageUrl={formData.image_url}
                onImageChange={(url) => setFormData({ ...formData, image_url: url || "" })}
                label="صورة الإعلان"
              />
            </div>
          )}

          {/* قسم التواريخ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-arabic">تاريخ البداية</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-right font-arabic",
                      !formData.start_date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.start_date ? format(formData.start_date, "PPP") : "اختر التاريخ"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.start_date || undefined}
                    onSelect={(date) => setFormData({ ...formData, start_date: date || null })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="font-arabic">تاريخ النهاية</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-right font-arabic",
                      !formData.end_date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.end_date ? format(formData.end_date, "PPP") : "اختر التاريخ"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.end_date || undefined}
                    onSelect={(date) => setFormData({ ...formData, end_date: date || null })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex items-center space-x-2 space-x-reverse">
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
            />
            <Label htmlFor="is_active" className="font-arabic">نشط</Label>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="font-arabic"
            >
              إلغاء
            </Button>
            <Button type="submit" disabled={loading} className="font-arabic">
              {loading ? "جاري الحفظ..." : (announcement ? "تحديث" : "حفظ")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AnnouncementDialog;
