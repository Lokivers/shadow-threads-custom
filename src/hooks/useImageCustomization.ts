
import { useState } from 'react';
import { loadImage, removeBackground } from '@/utils/imageProcessor';
import { toast } from 'sonner';

export const useImageCustomization = () => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [position, setPosition] = useState({ x: 50, y: 25 });
  const [scale, setScale] = useState(100);
  const [rotation, setRotation] = useState(0);
  
  // New states for text customization
  const [customText, setCustomText] = useState<string>("");
  const [textPosition, setTextPosition] = useState({ x: 50, y: 60 });
  const [textRotation, setTextRotation] = useState(0);
  const [textScale, setTextScale] = useState(100);
  const [textFont, setTextFont] = useState("Arial");
  const [textColor, setTextColor] = useState("#000000");

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      setError(null);
      
      const imageElement = await loadImage(file);
      const processedImage = await removeBackground(imageElement);
      setUserImage(processedImage);
      
      toast.success("Background removed successfully!");
    } catch (err) {
      console.error('Error processing image:', err);
      setError('Failed to process the image. Please try again with a different photo.');
      toast.error("Failed to process image");
    } finally {
      setIsProcessing(false);
    }
  };

  const resetImage = () => {
    setUserImage(null);
    setPosition({ x: 50, y: 25 });
    setScale(100);
    setRotation(0);
  };

  const resetText = () => {
    setCustomText("");
    setTextPosition({ x: 50, y: 60 });
    setTextRotation(0);
    setTextScale(100);
  };

  const moveImage = (direction: 'up' | 'down' | 'left' | 'right') => {
    const step = 5;
    setPosition(prev => {
      switch (direction) {
        case 'up':
          return { ...prev, y: Math.max(0, prev.y - step) };
        case 'down':
          return { ...prev, y: Math.min(100, prev.y + step) };
        case 'left':
          return { ...prev, x: Math.max(0, prev.x - step) };
        case 'right':
          return { ...prev, x: Math.min(100, prev.x + step) };
        default:
          return prev;
      }
    });
  };

  const moveText = (direction: 'up' | 'down' | 'left' | 'right') => {
    const step = 5;
    setTextPosition(prev => {
      switch (direction) {
        case 'up':
          return { ...prev, y: Math.max(0, prev.y - step) };
        case 'down':
          return { ...prev, y: Math.min(100, prev.y + step) };
        case 'left':
          return { ...prev, x: Math.max(0, prev.x - step) };
        case 'right':
          return { ...prev, x: Math.min(100, prev.x + step) };
        default:
          return prev;
      }
    });
  };

  const adjustScale = (increase: boolean) => {
    setScale(prev => {
      if (increase) {
        return Math.min(200, prev + 10);
      } else {
        return Math.max(50, prev - 10);
      }
    });
  };

  const adjustTextScale = (increase: boolean) => {
    setTextScale(prev => {
      if (increase) {
        return Math.min(200, prev + 10);
      } else {
        return Math.max(50, prev - 10);
      }
    });
  };

  const rotateImage = (clockwise: boolean) => {
    setRotation(prev => {
      if (clockwise) {
        return (prev + 15) % 360;
      } else {
        return (prev - 15 + 360) % 360;
      }
    });
  };

  const rotateText = (clockwise: boolean) => {
    setTextRotation(prev => {
      if (clockwise) {
        return (prev + 15) % 360;
      } else {
        return (prev - 15 + 360) % 360;
      }
    });
  };

  return {
    userImage,
    isProcessing,
    error,
    position,
    scale,
    rotation,
    customText,
    textPosition,
    textRotation,
    textScale,
    textFont,
    textColor,
    handleFileSelect,
    resetImage,
    resetText,
    moveImage,
    moveText,
    adjustScale,
    adjustTextScale,
    rotateImage,
    rotateText,
    setCustomText,
    setTextFont,
    setTextColor
  };
};
