
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DeliveryInfo {
  fullAddress: string;
  phoneNumber: string;
  recipientName: string;
}

interface DeliveryInfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (info: DeliveryInfo) => void;
}

export const DeliveryInfoDialog: React.FC<DeliveryInfoDialogProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    fullAddress: '',
    phoneNumber: '',
    recipientName: ''
  });

  const handleSubmit = () => {
    onSubmit(deliveryInfo);
    onClose();
  };

  const handleSkip = () => {
    onSubmit({
      fullAddress: '',
      phoneNumber: '',
      recipientName: ''
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-right font-arabic">معلومات التوصيل (اختيارية)</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="fullAddress" className="text-right font-arabic">🏠 العنوان الكامل</Label>
            <Input
              id="fullAddress"
              placeholder="اكتب عنوان التوصيل الكامل"
              value={deliveryInfo.fullAddress}
              onChange={(e) => setDeliveryInfo(prev => ({ ...prev, fullAddress: e.target.value }))}
              className="text-right"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-right font-arabic">📱 رقم الهاتف</Label>
            <Input
              id="phoneNumber"
              placeholder="اكتب رقم التواصل"
              value={deliveryInfo.phoneNumber}
              onChange={(e) => setDeliveryInfo(prev => ({ ...prev, phoneNumber: e.target.value }))}
              className="text-right"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="recipientName" className="text-right font-arabic">👤 اسم المستلم</Label>
            <Input
              id="recipientName"
              placeholder="اكتب اسم المستلم"
              value={deliveryInfo.recipientName}
              onChange={(e) => setDeliveryInfo(prev => ({ ...prev, recipientName: e.target.value }))}
              className="text-right"
            />
          </div>
        </div>
        
        <div className="flex gap-2 mt-6">
          <Button onClick={handleSubmit} className="flex-1 bg-blue-800 hover:bg-blue-900 font-arabic">
            إتمام الطلب
          </Button>
          <Button onClick={handleSkip} variant="outline" className="flex-1 font-arabic">
            تخطي وإتمام
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
