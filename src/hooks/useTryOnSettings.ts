
import { useState } from 'react';
import { VirtualTryOnSettings } from '@/types';

export const useTryOnSettings = () => {
  const [tryOnSettings, setTryOnSettings] = useState<VirtualTryOnSettings>({
    position: { x: 50, y: 50 },
    scale: 100,
    rotation: 0
  });

  // Adjust position
  const moveOverlay = (direction: 'up' | 'down' | 'left' | 'right') => {
    const step = 5;
    setTryOnSettings(prev => {
      const newPosition = { ...prev.position };
      
      switch (direction) {
        case 'up':
          newPosition.y = Math.max(0, newPosition.y - step);
          break;
        case 'down':
          newPosition.y = Math.min(100, newPosition.y + step);
          break;
        case 'left':
          newPosition.x = Math.max(0, newPosition.x - step);
          break;
        case 'right':
          newPosition.x = Math.min(100, newPosition.x + step);
          break;
      }
      
      return { ...prev, position: newPosition };
    });
  };
  
  // Adjust scale
  const adjustScale = (increase: boolean) => {
    setTryOnSettings(prev => ({
      ...prev,
      scale: increase ? Math.min(200, prev.scale + 10) : Math.max(50, prev.scale - 10)
    }));
  };
  
  // Adjust rotation
  const adjustRotation = (value: number[]) => {
    setTryOnSettings(prev => ({
      ...prev,
      rotation: value[0]
    }));
  };

  return {
    tryOnSettings,
    moveOverlay,
    adjustScale,
    adjustRotation
  };
};
