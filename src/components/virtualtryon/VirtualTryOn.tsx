
import React, { useState, useEffect } from 'react';
import { Product } from '@/types';
import { toast } from '@/components/ui/sonner';
import { useCamera } from '@/hooks/useCamera';
import { useTryOnSettings } from '@/hooks/useTryOnSettings';
import CameraPreview from './CameraPreview';
import TryOnControls from './TryOnControls';
import SizeSelectorTryOn from './SizeSelectorTryOn';
import HowToUseGuide from './HowToUseGuide';
import AddToCartButton from './AddToCartButton';
import { Button } from '@/components/ui/button';
import { Camera, Eye } from 'lucide-react';

interface VirtualTryOnProps {
  product: Product;
}

const VirtualTryOn: React.FC<VirtualTryOnProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [tryOnResult, setTryOnResult] = useState<string | null>(null);
  
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

  // Handle capturing image for try-on
  const handleCapture = () => {
    if (takeScreenshot()) {
      // Get image from canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const imageData = canvas.toDataURL('image/png');
        setCapturedImage(imageData);
        toast.success("Image captured! Processing for try-on...");
        
        // Start try-on processing
        processTryOn(imageData);
      }
    }
  };
  
  // Process the try-on with a mock HuggingFace model
  // In a real implementation, this would use the actual HF model API
  const processTryOn = async (imageData: string) => {
    try {
      setProcessing(true);
      toast.info("Processing with AI model...");
      
      // Simulate model processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, the model would return a processed image
      // For now, we'll just overlay the product on the captured image
      generateTryOnImage(imageData);
      
      toast.success("Virtual try-on complete!");
    } catch (error) {
      console.error("Error processing try-on:", error);
      toast.error("Failed to process try-on. Please try again.");
      setTryOnResult(null);
    } finally {
      setProcessing(false);
    }
  };
  
  // Generate a simple try-on effect by overlaying the product
  const generateTryOnImage = (baseImage: string) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw the captured image
      ctx.drawImage(img, 0, 0);
      
      // Load product image
      const productImg = new Image();
      productImg.onload = () => {
        // Apply transformations based on settings
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const scale = tryOnSettings.scale / 100;
        
        ctx.globalAlpha = 0.85; // Semi-transparent
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate((tryOnSettings.rotation * Math.PI) / 180);
        ctx.scale(scale, scale);
        
        // Draw product at center with position offset
        const xOffset = ((tryOnSettings.position.x - 50) / 100) * canvas.width;
        const yOffset = ((tryOnSettings.position.y - 50) / 100) * canvas.height;
        ctx.drawImage(
          productImg, 
          -productImg.width / 2 + xOffset,
          -productImg.height / 2 + yOffset
        );
        
        ctx.restore();
        ctx.globalAlpha = 1.0;
        
        // Set the try-on result
        setTryOnResult(canvas.toDataURL('image/png'));
      };
      productImg.src = product.images[0];
    };
    img.src = baseImage;
  };
  
  // Reset try-on process
  const resetTryOn = () => {
    setCapturedImage(null);
    setTryOnResult(null);
  };
  
  // Add to cart with the current settings
  const addToCart = () => {
    // In a real app, this would add the item to the cart with the try-on settings
    console.log('Added to cart:', {
      product,
      size: selectedSize,
      tryOnSettings,
      tryOnResult
    });
    
    toast.success("Added to cart!");
  };
  
  // Update when product changes
  useEffect(() => {
    // Reset try-on when product changes
    resetTryOn();
  }, [product]);
  
  return (
    <div className="bg-white border border-black rounded-lg p-6 shadow-lg animate-fade-in">
      <h3 className="text-xl font-bold mb-4">Virtual Try-On: {product.name}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Preview Area */}
        <div className="relative">
          {!capturedImage && !tryOnResult && (
            <CameraPreview
              product={product}
              tryOnSettings={tryOnSettings}
              cameraActive={cameraActive}
              videoRef={videoRef}
              canvasRef={canvasRef}
              startCamera={startCamera}
              stopCamera={stopCamera}
              takeScreenshot={handleCapture}
            />
          )}
          
          {/* Captured Image Preview */}
          {capturedImage && !tryOnResult && !processing && (
            <div className="bg-black rounded-lg aspect-video relative overflow-hidden flex items-center justify-center animate-fade-in">
              <img 
                src={capturedImage} 
                alt="Captured"
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-3">
                <Button
                  onClick={resetTryOn}
                  variant="outline"
                  className="border-white text-white hover:bg-gray-800 gap-2"
                >
                  Retake
                </Button>
              </div>
            </div>
          )}
          
          {/* Processing Indicator */}
          {processing && (
            <div className="bg-black rounded-lg aspect-video relative overflow-hidden flex items-center justify-center animate-fade-in">
              <img 
                src={capturedImage || ''} 
                alt="Processing"
                className="w-full h-full object-contain opacity-50"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
                <p className="mt-4 text-lg font-medium">Processing try-on...</p>
                <p className="text-sm opacity-80">Using AI to fit the t-shirt to your image</p>
              </div>
            </div>
          )}
          
          {/* Try-On Result */}
          {tryOnResult && (
            <div className="bg-black rounded-lg aspect-video relative overflow-hidden flex items-center justify-center animate-fade-in">
              <img 
                src={tryOnResult} 
                alt="Virtual Try-On"
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-3">
                <Button
                  onClick={resetTryOn}
                  variant="outline"
                  className="border-white text-white hover:bg-gray-800 gap-2"
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {/* Help Text */}
          <div className="mt-4 text-center bg-gray-100 p-2 rounded-md text-sm">
            {!capturedImage ? 
              "Start camera, position yourself, and take a photo" : 
              tryOnResult ? 
                "See how the t-shirt looks on you!" : 
                "Processing your image for virtual try-on..."
            }
          </div>
        </div>
        
        {/* Controls */}
        <div className="space-y-6">
          {/* Camera controls or result actions */}
          {!capturedImage && (
            <>
              <div className="bg-gray-50 p-4 rounded-lg animate-fade-in">
                <h4 className="text-lg font-medium mb-4">Camera Controls</h4>
                <div className="grid grid-cols-2 gap-4">
                  {!cameraActive ? (
                    <Button 
                      onClick={startCamera} 
                      className="bg-black hover:bg-gray-800 text-white gap-2 hover-scale"
                      size="lg"
                    >
                      <Camera size={20} />
                      Start Camera
                    </Button>
                  ) : (
                    <>
                      <Button 
                        onClick={handleCapture} 
                        className="bg-blue-600 hover:bg-blue-700 text-white gap-2 hover-scale"
                        size="lg"
                      >
                        <Camera size={20} />
                        Take Photo
                      </Button>
                      <Button 
                        onClick={stopCamera} 
                        variant="outline"
                        className="border-black text-black hover:bg-gray-100 gap-2"
                        size="lg"
                      >
                        Stop Camera
                      </Button>
                    </>
                  )}
                </div>
              </div>
              
              {cameraActive && (
                <TryOnControls
                  tryOnSettings={tryOnSettings}
                  cameraActive={cameraActive}
                  onPositionChange={moveOverlay}
                  onScaleChange={adjustScale}
                  onRotationChange={adjustRotation}
                />
              )}
            </>
          )}
          
          {tryOnResult && (
            <div className="bg-gray-50 p-4 rounded-lg animate-fade-in">
              <h4 className="text-lg font-medium mb-2">Ready to Buy?</h4>
              <p className="text-sm text-gray-600 mb-4">
                How does it look? If you're happy with the virtual try-on, add it to your cart!
              </p>
              <div className="flex items-center gap-4">
                <Button
                  onClick={addToCart}
                  className="flex-1 bg-black hover:bg-gray-800 text-white py-6 hover-scale"
                >
                  Add to Cart - ${product.price.toFixed(2)}
                </Button>
                <Button
                  onClick={resetTryOn}
                  variant="outline"
                  className="border-black text-black hover:bg-gray-100"
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}
          
          {/* Size selection */}
          <div className={`bg-gray-50 p-4 rounded-lg animate-fade-in ${!capturedImage ? 'opacity-100' : 'opacity-70'}`}>
            <SizeSelectorTryOn
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSizeSelect={setSelectedSize}
              disabled={capturedImage !== null}
            />
          </div>
          
          {/* Add to cart button - only when not processing */}
          {!capturedImage && (
            <AddToCartButton
              product={product}
              selectedSize={selectedSize}
              tryOnSettings={tryOnSettings}
              onAddToCart={addToCart}
            />
          )}
        </div>
      </div>
      
      <HowToUseGuide />
    </div>
  );
};

export default VirtualTryOn;
