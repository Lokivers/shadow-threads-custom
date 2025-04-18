
import React, { useState, useRef, useEffect } from 'react';
import { Product, VirtualTryOnSettings } from '@/types';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ZoomIn, ZoomOut, RotateCcw, Camera, ShoppingCart } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface VirtualTryOnProps {
  product: Product;
}

const VirtualTryOn: React.FC<VirtualTryOnProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [tryOnSettings, setTryOnSettings] = useState<VirtualTryOnSettings>({
    position: { x: 50, y: 50 },
    scale: 100,
    rotation: 0
  });
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  
  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setVideoStream(stream);
        setCameraActive(true);
        toast.success("Camera started successfully");
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error("Could not access camera. Please check permissions.");
    }
  };
  
  // Stop camera
  const stopCamera = () => {
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
      setVideoStream(null);
      setCameraActive(false);
    }
  };
  
  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [videoStream]);
  
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
  
  // Take screenshot (for future feature)
  const takeScreenshot = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        // Set canvas dimensions to match video
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        
        // Draw video frame to canvas
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        
        // You could save this or process it further
        toast.success("Screenshot taken!");
      }
    }
  };
  
  return (
    <div className="bg-white border border-black rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Virtual Try-On: {product.name}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Camera/Preview Area */}
        <div className="bg-black rounded-lg aspect-video relative overflow-hidden flex items-center justify-center">
          {/* Camera video feed */}
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="w-full h-full object-cover"
          />
          
          {/* T-shirt overlay */}
          {cameraActive && (
            <div 
              className="absolute pointer-events-none"
              style={{
                top: `${tryOnSettings.position.y}%`,
                left: `${tryOnSettings.position.x}%`,
                width: `${tryOnSettings.scale}%`,
                transform: `translate(-50%, -50%) rotate(${tryOnSettings.rotation}deg)`
              }}
            >
              <img 
                src={product.images[0]} 
                alt="T-shirt overlay"
                className="w-full h-full object-contain"
                style={{ opacity: 0.85 }}
              />
            </div>
          )}
          
          {/* Canvas for screenshots (hidden) */}
          <canvas ref={canvasRef} className="hidden" />
          
          {/* Camera control buttons */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-4">
            {!cameraActive ? (
              <Button 
                onClick={startCamera} 
                className="bg-white text-black hover:bg-gray-200 gap-2"
              >
                <Camera size={18} />
                Start Camera
              </Button>
            ) : (
              <Button 
                onClick={stopCamera} 
                variant="outline"
                className="border-white text-white hover:bg-gray-800 gap-2"
              >
                <Camera size={18} />
                Stop Camera
              </Button>
            )}
            
            {cameraActive && (
              <Button 
                onClick={takeScreenshot} 
                className="bg-white text-black hover:bg-gray-200 gap-2"
              >
                <Camera size={18} />
                Take Photo
              </Button>
            )}
          </div>
        </div>
        
        {/* Controls */}
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium mb-2">Position & Size</h4>
            
            {/* Position controls */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="col-start-2">
                <Button 
                  onClick={() => moveOverlay('up')} 
                  variant="outline"
                  className="w-full border-black text-black"
                  disabled={!cameraActive}
                >
                  <ArrowUp size={16} />
                </Button>
              </div>
              <Button 
                onClick={() => moveOverlay('left')} 
                variant="outline"
                className="border-black text-black"
                disabled={!cameraActive}
              >
                <ArrowLeft size={16} />
              </Button>
              <Button 
                onClick={() => moveOverlay('down')} 
                variant="outline"
                className="border-black text-black"
                disabled={!cameraActive}
              >
                <ArrowDown size={16} />
              </Button>
              <Button 
                onClick={() => moveOverlay('right')} 
                variant="outline"
                className="border-black text-black"
                disabled={!cameraActive}
              >
                <ArrowRight size={16} />
              </Button>
              
              {/* Scale controls */}
              <Button 
                onClick={() => adjustScale(true)} 
                variant="outline"
                className="border-black text-black"
                disabled={!cameraActive}
              >
                <ZoomIn size={16} />
              </Button>
              <Button 
                onClick={() => adjustScale(false)} 
                variant="outline"
                className="border-black text-black"
                disabled={!cameraActive}
              >
                <ZoomOut size={16} />
              </Button>
            </div>
            
            {/* Rotation slider */}
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-2">Rotation</h4>
              <Slider
                value={[tryOnSettings.rotation]}
                min={-180}
                max={180}
                step={5}
                onValueChange={adjustRotation}
                disabled={!cameraActive}
              />
              <div className="flex justify-between text-xs mt-1">
                <span>-180°</span>
                <span>0°</span>
                <span>180°</span>
              </div>
            </div>
          </div>
          
          {/* Size selection */}
          <div>
            <h4 className="text-lg font-medium mb-2">Select Size</h4>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  className={selectedSize === size ? "bg-black hover:bg-gray-800 text-white" : "border-black text-black"}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Add to cart button */}
          <div className="pt-4">
            <Button 
              onClick={addToCart} 
              className="w-full bg-black hover:bg-gray-800 text-white text-lg py-6 gap-2"
            >
              <ShoppingCart size={18} />
              Add to Cart - ${product.price.toFixed(2)}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">How to use Virtual Try-On</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Click "Start Camera" to activate your webcam</li>
          <li>Position yourself in the frame, facing forward</li>
          <li>Use the controls to position and size the t-shirt</li>
          <li>Adjust the rotation to match your body position</li>
          <li>Select your preferred size</li>
          <li>Click "Add to Cart" when you're happy with how it looks</li>
        </ol>
      </div>
    </div>
  );
};

export default VirtualTryOn;
