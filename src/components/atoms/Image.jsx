import { useState } from 'react';
import { Icon } from './Icon';

export function Image({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  fallback = null,
  showLoader = true,
  ...props 
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  const containerStyles = `relative overflow-hidden ${className}`;
  const imageStyles = `transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`;

  return (
    <div className={containerStyles} style={{ width, height }}>
      {loading && showLoader && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
          <Icon icon="line-md:loading-twotone-loop" size={24} color="#6b7280" />
        </div>
      )}
      
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          {fallback || (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <Icon icon="line-md:image-twotone" size={32} color="#9ca3af" />
              <span className="text-xs mt-1">Image not found</span>
            </div>
          )}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={imageStyles}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      )}
    </div>
  );
}