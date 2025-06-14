
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// دالة لإنشاء معرف جلسة فريد
const generateSessionId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// دالة للحصول على معلومات الجهاز
const getDeviceInfo = () => {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  const language = navigator.language;
  const screenResolution = `${screen.width}x${screen.height}`;
  
  return {
    userAgent,
    platform,
    language,
    screenResolution,
    cookieEnabled: navigator.cookieEnabled,
    onlineStatus: navigator.onLine
  };
};

// دالة لتتبع الزيارة
const trackVisit = async (type: 'visit' | 'download' | 'install' | 'pwa_install') => {
  try {
    let sessionId = localStorage.getItem('visitor_session_id');
    if (!sessionId) {
      sessionId = generateSessionId();
      localStorage.setItem('visitor_session_id', sessionId);
    }

    const deviceInfo = getDeviceInfo();
    
    await supabase.from('visitor_analytics').insert({
      session_id: sessionId,
      visitor_type: type,
      user_agent: navigator.userAgent,
      referrer: document.referrer || null,
      page_url: window.location.href,
      device_info: deviceInfo,
    });
  } catch (error) {
    console.error('Error tracking visit:', error);
  }
};

export const useVisitorTracking = () => {
  useEffect(() => {
    // تتبع الزيارة عند تحميل الصفحة
    trackVisit('visit');

    // تتبع تثبيت PWA
    window.addEventListener('beforeinstallprompt', () => {
      trackVisit('pwa_install');
    });

    // تتبع إذا تم تثبيت التطبيق كـ PWA
    window.addEventListener('appinstalled', () => {
      trackVisit('install');
    });

    // تنظيف المستمعين عند إلغاء التحميل
    return () => {
      window.removeEventListener('beforeinstallprompt', () => {});
      window.removeEventListener('appinstalled', () => {});
    };
  }, []);

  // دالة لتتبع التحميل يدوياً
  const trackDownload = () => {
    trackVisit('download');
  };

  // دالة لتتبع التثبيت يدوياً
  const trackInstall = () => {
    trackVisit('install');
  };

  return {
    trackDownload,
    trackInstall
  };
};
