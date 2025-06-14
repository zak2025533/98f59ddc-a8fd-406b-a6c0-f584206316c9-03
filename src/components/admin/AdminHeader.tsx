
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogOut } from "lucide-react";

interface AdminHeaderProps {
  onLogout: () => void;
}

const AdminHeader = ({ onLogout }: AdminHeaderProps) => {
  const handleLogout = () => {
    localStorage.removeItem('admin');
    onLogout();
  };

  return (
    <div className="mb-8">
      <Card className="bg-white border-2 border-blue-300">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="text-center lg:text-right">
              <h1 className="text-3xl lg:text-4xl font-bold text-blue-700 font-arabic">
                لوحة تحكم الإدارة
              </h1>
              <p className="text-gray-700 font-arabic mt-2 text-lg">
                إدارة شاملة لمتجر بلا حدود للحلويات
              </p>
            </div>
            <Button 
              onClick={handleLogout}
              className="font-arabic bg-red-600 hover:bg-red-700 text-white border-0"
            >
              <LogOut className="h-4 w-4 ml-2" />
              تسجيل الخروج
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminHeader;
