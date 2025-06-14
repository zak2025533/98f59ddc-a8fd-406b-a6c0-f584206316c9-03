
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// معلومات تطبيق Median
const MEDIAN_APP_CONFIG = {
  shareUrl: 'https://median.co/share/epyyqd#apk',
  packageName: 'co.median.android.epyyqd', // Package name المتوقع من Median
  appName: 'بلا حدود للحلويات',
  platform: 'median'
};

// دالة لتتبع التفاعل مع تطبيق Median
const trackMedianInteraction = async (action: 'download_click' | 'install_attempt' | 'app_opened') => {
  try {
    let sessionId = localStorage.getItem('visitor_session_id');
    if (!sessionId) {
      sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('visitor_session_id', sessionId);
    }

    const deviceInfo = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screenResolution: `${screen.width}x${screen.height}`,
      cookieEnabled: navigator.cookieEnabled,
      onlineStatus: navigator.onLine,
      medianApp: MEDIAN_APP_CONFIG
    };
    
    await supabase.from('visitor_analytics').insert({
      session_id: sessionId,
      visitor_type: action === 'download_click' ? 'download' : 
                   action === 'install_attempt' ? 'install' : 'visit',
      user_agent: navigator.userAgent,
      referrer: document.referrer || null,
      page_url: window.location.href,
      device_info: {
        ...deviceInfo,
        median_action: action,
        median_config: MEDIAN_APP_CONFIG
      },
    });

    console.log(`Median app interaction tracked: ${action}`);
  } catch (error) {
    console.error('Error tracking Median interaction:', error);
  }
};

// التحقق من وجود التطبيق أو إمكانية تثبيته
const checkAppInstallation = () => {
  // التحقق من User Agent للكشف عن التطبيق
  const userAgent = navigator.userAgent.toLowerCase();
  const isAndroid = userAgent.includes('android');
  const isIOS = userAgent.includes('iphone') || userAgent.includes('ipad');
  
  return {
    isAndroid,
    isIOS,
    canInstall: isAndroid || isIOS,
    platform: isAndroid ? 'android' : isIOS ? 'ios' : 'web'
  };
};

export const useMedianAppTracking = () => {
  useEffect(() => {
    // تتبع زيارة الصفحة مع معلومات التطبيق
    const deviceInfo = checkAppInstallation();
    
    if (deviceInfo.canInstall) {
      trackMedianInteraction('app_opened');
    }

    // تتبع الخروج من الصفحة (محتمل للتثبيت)
    const handleBeforeUnload = () => {
      trackMedianInteraction('install_attempt');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // دالة لتتبع النقر على رابط التحميل
  const trackDownloadClick = () => {
    trackMedianInteraction('download_click');
  };

  // دالة للحصول على رابط التحميل مع تتبع UTM
  const getTrackedDownloadUrl = () => {
    const baseUrl = MEDIAN_APP_CONFIG.shareUrl;
    const utmParams = new URLSearchParams({
      utm_source: 'website',
      utm_medium: 'download_button',
      utm_campaign: 'app_download',
      utm_content: 'median_app'
    });
    
    return `${baseUrl}?${utmParams.toString()}`;
  };

  return {
    trackDownloadClick,
    getTrackedDownloadUrl,
    appConfig: MEDIAN_APP_CONFIG,
    deviceInfo: checkAppInstallation()
  };
};
