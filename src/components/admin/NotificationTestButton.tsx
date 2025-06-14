
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface NotificationTestButtonProps {
  isSubscribed: boolean;
  onSendTest: () => void;
}

const NotificationTestButton = ({ isSubscribed, onSendTest }: NotificationTestButtonProps) => {
  if (!isSubscribed) return null;

  return (
    <div className="flex gap-2">
      <Button
        onClick={onSendTest}
        variant="outline"
        className="font-arabic"
      >
        <Send className="h-4 w-4 ml-2" />
        إرسال إشعار تجريبي
      </Button>
    </div>
  );
};

export default NotificationTestButton;
