
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
    <div className="mb-6">
      <Card className="bg-white shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="text-center lg:text-right">
              <h1 className="text-2xl lg:text-3xl font-bold text-blue-800 font-arabic">
                لوحة تحكم الإدارة
              </h1>
              <p className="text-blue-600 font-arabic mt-1">
                إدارة شاملة لمتجر بلا حدود للحلويات
              </p>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline" 
              className="font-arabic hover:bg-red-50 hover:border-red-200"
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
