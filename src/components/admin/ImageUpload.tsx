
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ImageUploadProps {
  currentImageUrl?: string;
  onImageChange: (imageUrl: string | null) => void;
  label?: string;
}

const ImageUpload = ({ currentImageUrl, onImageChange, label = "الصورة" }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
  const { toast } = useToast();

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);

      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      setPreviewUrl(data.publicUrl);
      onImageChange(data.publicUrl);

      toast({
        title: "تم الرفع",
        description: "تم رفع الصورة بنجاح",
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "خطأ",
        description: "تعذر رفع الصورة",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "خطأ",
          description: "يجب أن يكون الملف صورة",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "خطأ",
          description: "حجم الصورة يجب أن يكون أقل من 5 ميجابايت",
          variant: "destructive",
        });
        return;
      }

      uploadImage(file);
    }
  };

  const removeImage = () => {
    setPreviewUrl(null);
    onImageChange(null);
  };

  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-2">
        {previewUrl ? (
          <div className="relative inline-block">
            <img
              src={previewUrl}
              alt="معاينة الصورة"
              className="w-32 h-32 object-cover rounded-lg border"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2 rounded-full p-1 h-6 w-6"
              onClick={removeImage}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center">
            <Image className="h-8 w-8 text-gray-400" />
            <span className="text-sm text-gray-500 mt-1">لا توجد صورة</span>
          </div>
        )}

        <div className="mt-4">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
            id="image-upload"
          />
          <Label htmlFor="image-upload">
            <Button
              type="button"
              variant="outline"
              disabled={uploading}
              className="cursor-pointer"
              asChild
            >
              <span>
                <Upload className="h-4 w-4 mr-2" />
                {uploading ? "جاري الرفع..." : "رفع صورة"}
              </span>
            </Button>
          </Label>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
