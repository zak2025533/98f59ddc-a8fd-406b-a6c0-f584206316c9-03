import { useState, useRef, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';

interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
  disabled?: boolean;
}

const PullToRefresh = ({ children, onRefresh, disabled = false }: PullToRefreshProps) => {
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const startY = useRef(0);
  const currentY = useRef(0);

  const threshold = 80; // Minimum pull distance to trigger refresh

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (disabled || isRefreshing) return;
    
    startY.current = e.touches[0].clientY;
    setIsPulling(false);
  }, [disabled, isRefreshing]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (disabled || isRefreshing) return;
    
    currentY.current = e.touches[0].clientY;
    const distance = currentY.current - startY.current;
    
    // Only allow pull down when at the top of the scroll container
    const scrollTop = (e.currentTarget as HTMLElement).scrollTop;
    
    if (scrollTop === 0 && distance > 0) {
      e.preventDefault();
      const pullDist = Math.min(distance * 0.6, 120); // Damping effect
      setPullDistance(pullDist);
      setIsPulling(pullDist > 20);
    }
  }, [disabled, isRefreshing]);

  const handleTouchEnd = useCallback(async () => {
    if (disabled || isRefreshing) return;
    
    if (pullDistance >= threshold) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }
    
    setIsPulling(false);
    setPullDistance(0);
  }, [disabled, isRefreshing, pullDistance, threshold, onRefresh]);

  const refreshIndicatorOpacity = pullDistance / threshold;
  const refreshIndicatorRotation = isRefreshing ? 360 : pullDistance * 4;

  return (
    <div 
      className="pull-to-refresh relative overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        transform: isPulling || isRefreshing ? `translateY(${Math.min(pullDistance, 60)}px)` : 'translateY(0)',
        transition: isPulling ? 'none' : 'transform 0.3s ease-out'
      }}
    >
      {/* Pull to refresh indicator */}
      <div 
        className="absolute top-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center pt-4 pb-2 z-10"
        style={{
          opacity: Math.max(refreshIndicatorOpacity, isRefreshing ? 1 : 0),
          transform: `translateX(-50%) translateY(${isPulling || isRefreshing ? '0' : '-100%'})`,
          transition: isPulling ? 'none' : 'all 0.3s ease-out'
        }}
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-gray-200/50">
          <RefreshCw 
            className={`h-5 w-5 text-blue-600 ${isRefreshing ? 'animate-spin' : ''}`}
            style={{
              transform: `rotate(${refreshIndicatorRotation}deg)`,
              transition: isRefreshing ? 'none' : 'transform 0.1s ease-out'
            }}
          />
        </div>
        <span className="text-xs text-gray-600 font-arabic mt-1">
          {isRefreshing ? 'جاري التحديث...' : pullDistance >= threshold ? 'اتركه للتحديث' : 'اسحب للتحديث'}
        </span>
      </div>

      {children}
    </div>
  );
};

export default PullToRefresh;