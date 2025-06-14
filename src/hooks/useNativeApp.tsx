
import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';

export const useNativeApp = () => {
  const [isNative, setIsNative] = useState(false);
  const [platform, setPlatform] = useState<string>('web');

  useEffect(() => {
    const checkPlatform = () => {
      const isNativeApp = Capacitor.isNativePlatform();
      const currentPlatform = Capacitor.getPlatform();
      
      setIsNative(isNativeApp);
      setPlatform(currentPlatform);
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
