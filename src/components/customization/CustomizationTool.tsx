
import { useState } from 'react';
import { loadImage, removeBackground } from '@/utils/imageProcessor';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import PreviewArea from './PreviewArea';
import ImageUpload from './ImageUpload';
import ImageControls from './ImageControls';
import SizeSelector from './SizeSelector';

interface CustomizationToolProps {
  product: Product;
}

const CustomizationTool = ({ product }: CustomizationToolProps) => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
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

  const addToCart = () => {
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
        <PreviewArea 
          productImage={product.images[0]}
          productName={product.name}
          userImage={userImage}
          position={position}
          scale={scale}
          isProcessing={isProcessing}
        />
        
        <div className="space-y-6">
          <ImageUpload 
            onFileSelect={handleFileSelect}
            onReset={resetImage}
            hasImage={!!userImage}
            error={error}
          />
          
          {userImage && (
            <ImageControls 
              onMove={moveImage}
              onScale={adjustScale}
            />
          )}
          
          <SizeSelector 
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSizeSelect={setSelectedSize}
          />
          
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
