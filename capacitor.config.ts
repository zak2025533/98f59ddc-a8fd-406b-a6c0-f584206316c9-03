import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.1adebf2e03064e6c8dfe816ef5561330',
  appName: '98f59ddc-a8fd-406b-a6c0-f584206316c9-03',
  webDir: 'dist',
  server: {
    url: 'https://1adebf2e-0306-4e6c-8dfe-816ef5561330.lovableproject.com?forceHideBadge=true',
    cleartext: true,
    androidScheme: 'https' // ✅ ضروري لتحسين التوافق مع WebView
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true, // ✅ إخفاء تلقائي عند التحميل
      backgroundColor: '#2563eb',
      showSpinner: false,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#ffffff',
      androidScaleType: 'CENTER_CROP' // ✅ يجعل الخلفية تملأ الشاشة
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#2563eb',
      overlay: true // ✅ يعرض المحتوى خلف شريط الحالة للحصول على شاشة كاملة
    }
  },
  cordova: {},
  android: {
    allowMixedContent: true, // ✅ يسمح بتحميل محتوى http إن لزم
    captureInput: true // ✅ يحسن من تجربة الإدخال على الشاشة الكاملة
  }
};

export default config;
