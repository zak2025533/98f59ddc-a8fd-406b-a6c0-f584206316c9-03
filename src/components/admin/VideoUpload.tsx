
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Video, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface VideoUploadProps {
  currentVideoUrl?: string;
  onVideoChange: (url: string | null) => void;
  label?: string;
}

const VideoUpload = ({ currentVideoUrl, onVideoChange, label = "رفع فيديو" }: VideoUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // التحقق من نوع الملف
    const allowedTypes = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "نوع الملف غير مدعوم",
        description: "يرجى رفع ملف فيديو بصيغة MP4, MPEG, MOV أو AVI",
        variant: "destructive",
      });
      return;
    }

    // التحقق من حجم الملف (100MB كحد أقصى)
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      toast({
        title: "حجم الملف كبير جداً",
        description: "يرجى رفع ملف فيديو أصغر من 100 ميجابايت",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `announcements/${fileName}`;

      const { data, error } = await supabase.storage
        .from('videos')
        .upload(filePath, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('videos')
        .getPublicUrl(filePath);

      onVideoChange(publicUrl);
      
      toast({
        title: "تم رفع الفيديو بنجاح",
        description: "تم رفع ملف الفيديو بنجاح",
      });
    } catch (error) {
      console.error('Error uploading video:', error);
      toast({
        title: "خطأ في رفع الفيديو",
        description: "حدث خطأ أثناء رفع ملف الفيديو",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveVideo = async () => {
    if (currentVideoUrl) {
      try {
        // استخراج مسار الملف من الرابط
        const urlParts = currentVideoUrl.split('/');
        const fileName = urlParts[urlParts.length - 1];
        const filePath = `announcements/${fileName}`;

        await supabase.storage
          .from('videos')
          .remove([filePath]);

        onVideoChange(null);
        
        toast({
          title: "تم حذف الفيديو",
          description: "تم حذف ملف الفيديو بنجاح",
        });
      } catch (error) {
        console.error('Error removing video:', error);
        toast({
          title: "خطأ في حذف الفيديو",
          description: "حدث خطأ أثناء حذف ملف الفيديو",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="space-y-2">
      <Label className="font-arabic">{label}</Label>
      
      {currentVideoUrl ? (
        <div className="space-y-2">
          <div className="relative">
            <video
              controls
              className="w-full h-40 object-cover rounded-lg border"
              src={currentVideoUrl}
            >
              متصفحك لا يدعم تشغيل الفيديو
            </video>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={handleRemoveVideo}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-500 font-arabic text-right">
            انقر على زر X لحذف الفيديو الحالي
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {uploading ? (
                  <Loader2 className="h-8 w-8 text-gray-400 animate-spin mb-2" />
                ) : (
                  <Video className="h-8 w-8 text-gray-400 mb-2" />
                )}
                <p className="text-sm text-gray-500 font-arabic text-center">
                  {uploading ? "جاري رفع الفيديو..." : "انقر لرفع ملف فيديو"}
                </p>
                <p className="text-xs text-gray-400 font-arabic text-center">
                  MP4, MPEG, MOV أو AVI (حد أقصى 100MB)
                </p>
              </div>
              <Input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleFileUpload}
                disabled={uploading}
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
