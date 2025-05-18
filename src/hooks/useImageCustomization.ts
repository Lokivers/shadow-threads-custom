
import { useState, useEffect } from 'react';
import { loadImage, removeBackground } from '@/utils/imageProcessor';
import { toast } from 'sonner';

export const useImageCustomization = () => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [position, setPosition] = useState({ x: 50, y: 25 });
  const [scale, setScale] = useState(100);
  const [rotation, setRotation] = useState(0);
  
  // Text customization states
  const [customText, setCustomText] = useState<string>("");
  const [textPosition, setTextPosition] = useState({ x: 50, y: 60 });
  const [textRotation, setTextRotation] = useState(0);
  const [textScale, setTextScale] = useState(100);
  const [textFont, setTextFont] = useState("Arial");
  const [textColor, setTextColor] = useState("#000000");
  const [isDraggingText, setIsDraggingText] = useState(false);
  
  // Logo states
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [logoPosition, setLogoPosition] = useState({ x: 50, y: 70 });
  const [logoRotation, setLogoRotation] = useState(0);
  const [logoScale, setLogoScale] = useState(60);
  const [isDraggingLogo, setIsDraggingLogo] = useState(false);

  // User image dragging state
  const [isDraggingUserImage, setIsDraggingUserImage] = useState(false);

  // Handle image upload and background removal
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

  // Handle logo upload
  const handleLogoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      setError(null);
      
      const imageElement = await loadImage(file);
      const processedImage = await removeBackground(imageElement);
      setLogoImage(processedImage);
      
      toast.success("Logo uploaded successfully!");
    } catch (err) {
      console.error('Error processing logo:', err);
      setError('Failed to process the logo. Please try again with a different image.');
      toast.error("Failed to process logo");
    } finally {
      setIsProcessing(false);
    }
  };

  // Reset functions
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

  const resetLogo = () => {
    setLogoImage(null);
    setLogoPosition({ x: 50, y: 70 });
    setLogoRotation(0);
    setLogoScale(60);
  };

  // Position adjustment functions
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

  const moveLogo = (direction: 'up' | 'down' | 'left' | 'right') => {
    const step = 5;
    setLogoPosition(prev => {
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

  // Scale adjustment functions
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

  const adjustLogoScale = (increase: boolean) => {
    setLogoScale(prev => {
      if (increase) {
        return Math.min(200, prev + 10);
      } else {
        return Math.max(40, prev - 10);
      }
    });
  };

  // Rotation functions
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

  const rotateLogo = (clockwise: boolean) => {
    setLogoRotation(prev => {
      if (clockwise) {
        return (prev + 15) % 360;
      } else {
        return (prev - 15 + 360) % 360;
      }
    });
  };

  // Free Dragging Functions for Text
  const handleTextDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingText(true);
  };

  const handleTextDragEnd = () => {
    setIsDraggingText(false);
  };

  const handleTextDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingText) return;

    const previewArea = (e.currentTarget.parentElement as HTMLElement);
    const rect = previewArea.getBoundingClientRect();
    
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setTextPosition({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y))
    });
  };

  // Free Dragging Functions for User Image
  const handleUserImageDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingUserImage(true);
  };

  const handleUserImageDragEnd = () => {
    setIsDraggingUserImage(false);
  };

  const handleUserImageDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingUserImage) return;

    const previewArea = (e.currentTarget.parentElement as HTMLElement);
    const rect = previewArea.getBoundingClientRect();
    
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setPosition({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y))
    });
  };

  // Free Dragging Functions for Logo
  const handleLogoDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingLogo(true);
  };

  const handleLogoDragEnd = () => {
    setIsDraggingLogo(false);
  };

  const handleLogoDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingLogo) return;

    const previewArea = (e.currentTarget.parentElement as HTMLElement);
    const rect = previewArea.getBoundingClientRect();
    
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setLogoPosition({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y))
    });
  };

  // Add event listener to handle drag ending if mouse is released outside the element
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDraggingText) {
        setIsDraggingText(false);
      }
      if (isDraggingUserImage) {
        setIsDraggingUserImage(false);
      }
      if (isDraggingLogo) {
        setIsDraggingLogo(false);
      }
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDraggingText, isDraggingUserImage, isDraggingLogo]);

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
    isDraggingText,
    logoImage,
    logoPosition,
    logoRotation,
    logoScale,
    isDraggingLogo,
    isDraggingUserImage,
    handleFileSelect,
    handleLogoSelect,
    resetImage,
    resetText,
    resetLogo,
    moveImage,
    moveText,
    moveLogo,
    adjustScale,
    adjustTextScale,
    adjustLogoScale,
    rotateImage,
    rotateText,
    rotateLogo,
    setCustomText,
    setTextFont,
    setTextColor,
    handleTextDragStart,
    handleTextDragEnd,
    handleTextDrag,
    handleUserImageDragStart,
    handleUserImageDragEnd,
    handleUserImageDrag,
    handleLogoDragStart,
    handleLogoDragEnd,
    handleLogoDrag
  };
};
