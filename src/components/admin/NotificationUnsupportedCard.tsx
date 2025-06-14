
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BellOff } from "lucide-react";

const NotificationUnsupportedCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-right font-arabic text-blue-800 flex items-center gap-2">
          <BellOff className="h-5 w-5" />
          إدارة الإشعارات
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground font-arabic">
          متصفحك لا يدعم الإشعارات الخارجية
        </p>
      </CardContent>
    </Card>
  );
};

export default NotificationUnsupportedCard;
