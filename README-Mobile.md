
# تحويل التطبيق إلى تطبيق جوال

## الخطوات المطلوبة لتشغيل التطبيق على الجوال:

### 1. نقل المشروع إلى GitHub
- اضغط على زر "Export to Github" في Lovable
- قم بعمل git pull للمشروع من مستودع GitHub الخاص بك

### 2. تثبيت التبعيات
```bash
npm install
```

### 3. إضافة المنصات
```bash
# لنظام iOS
npx cap add ios

# لنظام Android
npx cap add android
```

### 4. تحديث التبعيات
```bash
# لنظام iOS
npx cap update ios

# لنظام Android  
npx cap update android
```

### 5. بناء المشروع
```bash
npm run build
```

### 6. مزامنة المشروع
```bash
npx cap sync
```

### 7. تشغيل التطبيق
```bash
# لنظام Android
npx cap run android

# لنظام iOS (يتطلب macOS و Xcode)
npx cap run ios
```

## متطلبات النظام:

### لنظام Android:
- Android Studio مثبت
- Android SDK

### لنظام iOS:
- macOS
- Xcode مثبت
- iOS Simulator أو جهاز iOS حقيقي

## ملاحظات مهمة:
- يجب تشغيل `npx cap sync` بعد أي تغييرات في الكود
- التطبيق يدعم الآن Safe Area للشاشات الحديثة
- تم تحسين واجهة المستخدم للشاشات اللمسية
