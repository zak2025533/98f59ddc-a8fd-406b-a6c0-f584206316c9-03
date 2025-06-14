
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
      <Card className="bg-white border border-gray-200">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="text-center lg:text-right">
              <h1 className="text-3xl lg:text-4xl font-bold text-blue-600 font-arabic">
                لوحة تحكم الإدارة
              </h1>
              <p className="text-gray-600 font-arabic mt-2 text-lg">
                إدارة شاملة لمتجر بلا حدود للحلويات
              </p>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline" 
              className="font-arabic hover:bg-red-50 hover:border-red-200 border-red-200 text-red-600"
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
