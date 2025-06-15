import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DeliveryInfo } from '@/hooks/useOrder';

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
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
        <DialogHeader>
          <DialogTitle className="text-right font-arabic text-orange-900">معلومات التوصيل (اختيارية)</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="fullAddress" className="text-right font-arabic text-orange-800">🏠 العنوان الكامل</Label>
            <Input
              id="fullAddress"
              placeholder="اكتب عنوان التوصيل الكامل"
              value={deliveryInfo.fullAddress}
              onChange={(e) => setDeliveryInfo(prev => ({ ...prev, fullAddress: e.target.value }))}
              className="text-right border-orange-200 focus:border-orange-400 bg-white/70"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-right font-arabic text-orange-800">📱 رقم الهاتف</Label>
            <Input
              id="phoneNumber"
              placeholder="اكتب رقم التواصل"
              value={deliveryInfo.phoneNumber}
              onChange={(e) => setDeliveryInfo(prev => ({ ...prev, phoneNumber: e.target.value }))}
              className="text-right border-orange-200 focus:border-orange-400 bg-white/70"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="recipientName" className="text-right font-arabic text-orange-800">👤 اسم المستلم</Label>
            <Input
              id="recipientName"
              placeholder="اكتب اسم المستلم"
              value={deliveryInfo.recipientName}
              onChange={(e) => setDeliveryInfo(prev => ({ ...prev, recipientName: e.target.value }))}
              className="text-right border-orange-200 focus:border-orange-400 bg-white/70"
            />
          </div>
        </div>
        
        <div className="flex gap-2 mt-6">
          <Button onClick={handleSubmit} className="flex-1 bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 text-white font-arabic shadow-lg">
            إتمام الطلب
          </Button>
          <Button onClick={handleSkip} variant="outline" className="flex-1 font-arabic border-orange-300 text-orange-700 hover:bg-orange-50">
            تخطي وإتمام
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
