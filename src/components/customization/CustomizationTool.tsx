
import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { loadImage, removeBackground } from '@/utils/imageProcessor';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Upload, X, Shirt, Image as ImageIcon, Undo, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ZoomIn, ZoomOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';

interface CustomizationToolProps {
  product: Product;
}

const CustomizationTool = ({ product }: CustomizationToolProps) => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Image positioning state
  const [position, setPosition] = useState({ x: 50, y: 25 });
  const [scale, setScale] = useState(100);

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      setError(null);
      
      // Load the image
      const imageElement = await loadImage(file);
      
      // Process the image (remove background)
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

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const resetImage = () => {
    setUserImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    // Reset position and scale
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

  const addToCart = () => {
    // In a real app, this would add the item to the cart
    // For now, we'll just log it
    console.log('Added to cart:', {
      product,
      size: selectedSize,
      customImage: userImage,
      imagePosition: position,
      imageScale: scale
    });
    
    toast.success("Added to cart!");
  };

  return (
    <div className="bg-white border border-black rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Customize Your T-Shirt</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Preview Area */}
        <div className="bg-gray-100 rounded-lg aspect-square relative overflow-hidden flex items-center justify-center">
          {/* T-shirt Base Image */}
          <img 
            src={product.images[0] || 'https://placehold.co/400x400/000000/FFFFFF/png?text=T-Shirt'}
            alt={product.name}
            className="w-full h-full object-contain"
          />
          
          {/* User Image Overlay */}
          {userImage && (
            <div 
              className="absolute"
              style={{
                top: `${position.y}%`,
                left: `${position.x}%`,
                width: `${scale/2}%`,
                height: `${scale/2}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <img 
                src={userImage}
                alt="User uploaded image"
                className="w-full h-full object-contain"
              />
            </div>
          )}
          
          {/* Processing Indicator */}
          {isProcessing && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white">
              <div className="text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mx-auto"></div>
                <p className="mt-2">Processing image...</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Controls */}
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium mb-2">Upload Your Face</h4>
            <p className="text-sm text-gray-500 mb-4">
              We'll automatically remove the background of your photo to create a custom design.
            </p>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
            />
            
            <div className="flex flex-wrap gap-2">
              <Button 
                onClick={handleUploadClick} 
                className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white"
              >
                <Upload size={16} />
                Upload Photo
              </Button>
              
              {userImage && (
                <Button 
                  onClick={resetImage} 
                  variant="outline"
                  className="flex items-center gap-2 border-black text-black"
                >
                  <Undo size={16} />
                  Reset
                </Button>
              )}
            </div>
            
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          
          {userImage && (
            <div>
              <h4 className="text-lg font-medium mb-2">Adjust Your Image</h4>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <Button 
                  onClick={() => moveImage('up')} 
                  variant="outline"
                  className="border-black text-black"
                >
                  <ArrowUp size={16} />
                </Button>
                <Button 
                  onClick={() => moveImage('down')} 
                  variant="outline"
                  className="border-black text-black"
                >
                  <ArrowDown size={16} />
                </Button>
                <Button 
                  onClick={() => moveImage('left')} 
                  variant="outline"
                  className="border-black text-black"
                >
                  <ArrowLeft size={16} />
                </Button>
                <Button 
                  onClick={() => moveImage('right')} 
                  variant="outline"
                  className="border-black text-black"
                >
                  <ArrowRight size={16} />
                </Button>
                <Button 
                  onClick={() => adjustScale(true)} 
                  variant="outline"
                  className="border-black text-black"
                >
                  <ZoomIn size={16} />
                </Button>
                <Button 
                  onClick={() => adjustScale(false)} 
                  variant="outline"
                  className="border-black text-black"
                >
                  <ZoomOut size={16} />
                </Button>
              </div>
            </div>
          )}
          
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
          
          <div className="pt-4">
            <Button 
              onClick={addToCart} 
              className="w-full bg-black hover:bg-gray-800 text-white text-lg py-6"
              disabled={isProcessing}
            >
              Add to Cart - ${product.price.toFixed(2)}
            </Button>
            
            <div className="mt-4 text-center">
              <Link to="/products/tshirt" className="text-sm text-gray-500 hover:text-black">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationTool;
