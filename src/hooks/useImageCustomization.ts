
import { useState } from 'react';
import { loadImage, removeBackground } from '@/utils/imageProcessor';
import { toast } from '@/components/ui/sonner';

export const useImageCustomization = () => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [position, setPosition] = useState({ x: 50, y: 25 });
  const [scale, setScale] = useState(100);

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

  const adjustScale = (increase: boolean) => {
    setScale(prev => {
      if (increase) {
        return Math.min(200, prev + 10);
      } else {
        return Math.max(50, prev - 10);
      }
    });
  };

  return {
    userImage,
    isProcessing,
    error,
    position,
    scale,
    handleFileSelect,
    resetImage,
    moveImage,
    adjustScale
  };
};
