
import { useEffect, useState } from 'react';

export const useNativeApp = () => {
  const [isNative, setIsNative] = useState(false);
  const [platform, setPlatform] = useState<string>('web');

  useEffect(() => {
    const checkPlatform = async () => {
      try {
        // Try to dynamically import Capacitor
        const { Capacitor } = await import('@capacitor/core');
        const isNativeApp = Capacitor.isNativePlatform();
        const currentPlatform = Capacitor.getPlatform();
        
        setIsNative(isNativeApp);
        setPlatform(currentPlatform);
      } catch (error) {
        // Fallback to web mode if Capacitor is not available
        console.log('Capacitor not available, running in web mode');
        setIsNative(false);
        setPlatform('web');
      }
    };

    checkPlatform();
  }, []);

  return {
    isNative,
    platform,
    isIOS: platform === 'ios',
    isAndroid: platform === 'android',
    isWeb: platform === 'web'
  };
};
