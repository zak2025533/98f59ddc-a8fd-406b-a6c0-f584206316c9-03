
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // التحقق من بيانات المشرف من قاعدة البيانات
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (error || !data) {
        toast({
          title: "خطأ في تسجيل الدخول",
          description: "اسم المستخدم أو كلمة المرور غير صحيحة",
          variant: "destructive",
        });
      } else {
        // حفظ معلومات المشرف في localStorage
        localStorage.setItem('admin', JSON.stringify(data));
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "مرحباً بك في لوحة التحكم",
        });
        onLogin();
      }
    } catch (error) {
      toast({
        title: "خطأ في الاتصال",
        description: "تعذر الاتصال بقاعدة البيانات",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 min-h-[400px]">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-3">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-xl font-arabic text-blue-800">
            دخول المشرف
          </CardTitle>
          <p className="text-sm text-gray-600 font-arabic">
            بلا حدود للحلويات
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="font-arabic text-sm">اسم المستخدم</Label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="أدخل اسم المستخدم"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pr-10 text-sm"
                  dir="ltr"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="font-arabic text-sm">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="أدخل كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10 text-sm"
                  dir="ltr"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 font-arabic text-sm py-2" 
              disabled={isLoading}
            >
              {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
