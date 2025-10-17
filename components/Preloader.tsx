import React, { useState, useEffect } from 'react';
import { LogoIcon } from '../constants/icons';

interface PreloaderProps {
  isLoaded: boolean;
}

const Preloader: React.FC<PreloaderProps> = ({ isLoaded }) => {
  const [shouldUnmount, setShouldUnmount] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      // Wait for the fade-out animation to complete before unmounting
      const timer = setTimeout(() => setShouldUnmount(true), 1000); // Duration should match CSS transition
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  if (shouldUnmount) {
    return null;
  }

  return (
    <div 
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-gray-900 transition-opacity duration-1000 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
      aria-busy="true"
      aria-live="polite"
    >
      <div className="relative h-24 w-24">
        <svg className="h-full w-full" viewBox="0 0 100 100">
          <circle className="text-gray-800" strokeWidth="4" stroke="currentColor" fill="transparent" r="48" cx="50" cy="50"/>
          <circle 
            className="animate-loader-stroke text-primary" 
            strokeWidth="4" 
            strokeLinecap="round" 
            stroke="currentColor" 
            fill="transparent" 
            r="48" 
            cx="50" 
            cy="50" 
            strokeDasharray="290" 
            strokeDashoffset="217.5"
          />
        </svg>
        <LogoIcon className="absolute top-1/2 left-1/2 h-10 w-10 text-primary -translate-x-1/2 -translate-y-1/2" />
      </div>

      <LogoIcon className="mt-6 h-9 text-white" />
      <p className="mt-2 text-gray-400">Загружаем вашего помощника...</p>
    </div>
  );
};

export default Preloader;