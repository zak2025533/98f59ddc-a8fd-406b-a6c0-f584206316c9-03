interface SkeletonLoaderProps {
  type?: 'card' | 'text' | 'circle' | 'button';
  className?: string;
  count?: number;
}

const SkeletonLoader = ({ type = 'card', className = '', count = 1 }: SkeletonLoaderProps) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className={`modern-card animate-pulse ${className}`}>
            <div className="bg-gray-200 h-44 rounded-t-2xl"></div>
            <div className="p-4 space-y-3">
              <div className="bg-gray-200 h-4 rounded w-3/4"></div>
              <div className="bg-gray-200 h-3 rounded w-full"></div>
              <div className="bg-gray-200 h-3 rounded w-1/2"></div>
              <div className="flex justify-between items-center">
                <div className="bg-gray-200 h-5 rounded w-16"></div>
                <div className="bg-gray-200 h-8 rounded-lg w-20"></div>
              </div>
            </div>
          </div>
        );
      
      case 'text':
        return <div className={`bg-gray-200 h-4 rounded animate-pulse ${className}`}></div>;
      
      case 'circle':
        return <div className={`bg-gray-200 rounded-full animate-pulse ${className}`}></div>;
      
      case 'button':
        return <div className={`bg-gray-200 h-10 rounded-lg animate-pulse ${className}`}></div>;
      
      default:
        return <div className={`bg-gray-200 h-4 rounded animate-pulse ${className}`}></div>;
    }
  };

  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;