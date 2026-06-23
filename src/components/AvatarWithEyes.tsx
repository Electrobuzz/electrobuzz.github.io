'use client';

import { useState, useEffect, useRef } from "react";

const AvatarWithEyes = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const calculateEyeRotation = (eyeRef: React.RefObject<HTMLDivElement | null>) => {
    if (!eyeRef.current) return { x: 0, y: 0 };
    
    const eye = eyeRef.current;
    const eyeRect = eye.getBoundingClientRect();
    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;
    
    const angle = Math.atan2(mousePosition.y - eyeCenterY, mousePosition.x - eyeCenterX);
    const distance = Math.min(
      Math.sqrt(
        Math.pow(mousePosition.x - eyeCenterX, 2) + 
        Math.pow(mousePosition.y - eyeCenterY, 2)
      ) / 10,
      8
    );
    
    const pupilX = Math.cos(angle) * distance;
    const pupilY = Math.sin(angle) * distance;
    
    return { x: pupilX, y: pupilY };
  };

  const leftEyePosition = calculateEyeRotation(leftEyeRef);
  const rightEyePosition = calculateEyeRotation(rightEyeRef);

  return (
    <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
      {/* Avatar Container */}
      <div className="relative">
        {/* Face/Silhouette */}
        <div className="w-48 h-48 bg-gradient-to-b from-[#58a6ff]/20 to-[#58a6ff]/10 rounded-full border-2 border-[#58a6ff]/30 flex items-center justify-center">
          
          {/* Eyes Container */}
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-8">
            {/* Left Eye */}
            <div 
              ref={leftEyeRef}
              id="left-eye" 
              className="relative w-8 h-8 bg-gray-800 rounded-full overflow-hidden"
            >
              <div 
                className="absolute w-3 h-3 bg-black rounded-full transition-all duration-100 ease-out"
                style={{
                  left: `${16 + leftEyePosition.x}px`,
                  top: `${16 + leftEyePosition.y}px`,
                  transform: 'translate(-50%, -50%)'
                }}
              />
            </div>
            
            {/* Right Eye */}
            <div 
              ref={rightEyeRef}
              id="right-eye" 
              className="relative w-8 h-8 bg-gray-800 rounded-full overflow-hidden"
            >
              <div 
                className="absolute w-3 h-3 bg-black rounded-full transition-all duration-100 ease-out"
                style={{
                  left: `${16 + rightEyePosition.x}px`,
                  top: `${16 + rightEyePosition.y}px`,
                  transform: 'translate(-50%, -50%)'
                }}
              />
            </div>
          </div>

          {/* Simple mouth/smile */}
          <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#58a6ff]/40 rounded-full" />
          
          {/* Hair/Head shape indication */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-[#58a6ff]/10 rounded-t-full border-t border-x border-[#58a6ff]/20" />
        </div>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#58a6ff]/5 to-transparent rounded-full blur-xl" />
      </div>
    </div>
  );
};

export default AvatarWithEyes;
