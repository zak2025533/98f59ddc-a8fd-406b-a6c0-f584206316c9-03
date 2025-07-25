import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Link } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ImageUploadProps {
  currentImageUrl?: string;
  onImageChange: (imageUrl: string | null) => void;
  label?: string;
}

const ImageUpload = ({ currentImageUrl, onImageChange, label = "الصورة" }: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // التحقق من نوع الملف
    if (!file.type.startsWith('image/')) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار ملف صورة صالح",
        variant: "destructive",
      });
      return;
    }

    // التحقق من حجم الملف (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "خطأ",
        description: "حجم الملف كبير جداً. الحد الأقصى 5 ميجابايت",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(fileName, file);

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      onImageChange(urlData.publicUrl);
      toast({
        title: "تم الرفع",
        description: "تم رفع الصورة بنجاح",
      });
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast({
        title: "خطأ في الرفع",
        description: error.message || "تعذر رفع الصورة",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onImageChange(urlInput.trim());
      setUrlInput("");
      setShowUrlInput(false);
      toast({
        title: "تم الحفظ",
        description: "تم حفظ رابط الصورة",
      });
    }
  };

  const handleRemoveImage = () => {
    onImageChange(null);
    toast({
      title: "تم الحذف",
      description: "تم حذف الصورة",
    });
  };

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg border border-gray-300">
      <Label className="text-right font-arabic text-gray-800 font-semibold">{label}</Label>
      
      {currentImageUrl && (
        <div className="relative inline-block">
          <img 
            src={currentImageUrl} 
            alt="Preview" 
            className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300"
          />
          <Button
            type="button"
            size="sm"
            variant="destructive"
            className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full bg-red-600 hover:bg-red-700"
            onClick={handleRemoveImage}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}

      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="hidden"
            id="image-upload"
          />
          <Label
            htmlFor="image-upload"
            className={`flex items-center justify-center p-3 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors bg-white ${
              isUploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Upload className="h-4 w-4 ml-2 text-blue-600" />
            <span className="font-arabic text-blue-700">
              {isUploading ? "جاري الرفع..." : "رفع صورة"}
            </span>
          </Label>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="font-arabic border-2 border-green-300 text-green-700 hover:bg-green-50"
        >
          <Link className="h-4 w-4 ml-1" />
          رابط
        </Button>
      </div>

      {showUrlInput && (
        <div className="flex gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
          <Input
            placeholder="أدخل رابط الصورة"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="text-right bg-white border-gray-300"
            dir="ltr"
          />
          <Button
            type="button"
            onClick={handleUrlSubmit}
            disabled={!urlInput.trim()}
            className="font-arabic bg-blue-600 hover:bg-blue-700 text-white"
          >
            حفظ
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
