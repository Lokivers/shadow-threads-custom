
import React, { useState } from 'react';
import { Product } from '@/types';
import { toast } from '@/components/ui/sonner';
import { useCamera } from '@/hooks/useCamera';
import { useTryOnSettings } from '@/hooks/useTryOnSettings';
import CameraPreview from './CameraPreview';
import TryOnControls from './TryOnControls';
import SizeSelectorTryOn from './SizeSelectorTryOn';
import HowToUseGuide from './HowToUseGuide';
import AddToCartButton from './AddToCartButton';

interface VirtualTryOnProps {
  product: Product;
}

const VirtualTryOn: React.FC<VirtualTryOnProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  
  const {
    cameraActive,
    videoRef,
    canvasRef,
    startCamera,
    stopCamera,
    takeScreenshot
  } = useCamera();
  
  const {
    tryOnSettings,
    moveOverlay,
    adjustScale,
    adjustRotation
  } = useTryOnSettings();
  
  // Add to cart with the current settings
  const addToCart = () => {
    // In a real app, this would add the item to the cart with the try-on settings
    console.log('Added to cart:', {
      product,
      size: selectedSize,
      tryOnSettings
    });
    
    toast.success("Added to cart!");
  };
  
  return (
    <div className="bg-white border border-black rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Virtual Try-On: {product.name}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Camera/Preview Area */}
        <CameraPreview
          product={product}
          tryOnSettings={tryOnSettings}
          cameraActive={cameraActive}
          videoRef={videoRef}
          canvasRef={canvasRef}
          startCamera={startCamera}
          stopCamera={stopCamera}
          takeScreenshot={takeScreenshot}
        />
        
        {/* Controls */}
        <div className="space-y-6">
          <TryOnControls
            tryOnSettings={tryOnSettings}
            cameraActive={cameraActive}
            onPositionChange={moveOverlay}
            onScaleChange={adjustScale}
            onRotationChange={adjustRotation}
          />
          
          {/* Size selection */}
          <SizeSelectorTryOn
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSizeSelect={setSelectedSize}
          />
          
          {/* Add to cart button */}
          <AddToCartButton
            product={product}
            selectedSize={selectedSize}
            tryOnSettings={tryOnSettings}
            onAddToCart={addToCart}
          />
        </div>
      </div>
      
      <HowToUseGuide />
    </div>
  );
};

export default VirtualTryOn;
