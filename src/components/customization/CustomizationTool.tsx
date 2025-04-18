
import { useState, useRef, ChangeEvent } from 'react';
import { useImageProcessor } from '@/hooks/useImageProcessor';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Upload, X, Shirt, Image as ImageIcon, Undo } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CustomizationToolProps {
  product: Product;
}

const CustomizationTool = ({ product }: CustomizationToolProps) => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { removeBackground, isProcessing, error } = useImageProcessor();

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Process the image (remove background)
      const processedImage = await removeBackground(file);
      setUserImage(processedImage);
    } catch (err) {
      console.error('Error processing image:', err);
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
  };

  const addToCart = () => {
    // In a real app, this would add the item to the cart
    // For now, we'll just log it
    console.log('Added to cart:', {
      product,
      size: selectedSize,
      customImage: userImage
    });
    
    // Navigate to cart - in a real app would use a context/state management
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
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
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2">
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
            <h4 className="text-lg font-medium mb-2">Upload Your Image</h4>
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
                className="flex items-center gap-2 bg-black hover:bg-gray-800"
              >
                <Upload size={16} />
                Upload Photo
              </Button>
              
              {userImage && (
                <Button 
                  onClick={resetImage} 
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Undo size={16} />
                  Reset
                </Button>
              )}
            </div>
            
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-2">Select Size</h4>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  className={selectedSize === size ? "bg-black hover:bg-gray-800" : ""}
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
              className="w-full bg-black hover:bg-gray-800 text-lg py-6"
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
