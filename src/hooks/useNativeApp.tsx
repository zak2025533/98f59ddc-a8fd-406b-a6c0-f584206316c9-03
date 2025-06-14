
import { useEffect, useState } from 'react';

// Fallback for web mode when Capacitor is not available
const getCapacitorMock = () => ({
  isNativePlatform: () => false,
  getPlatform: () => 'web'
});

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
        const mockCapacitor = getCapacitorMock();
        setIsNative(mockCapacitor.isNativePlatform());
        setPlatform(mockCapacitor.getPlatform());
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
