
import { useState } from 'react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useImageCustomization } from '@/hooks/useImageCustomization';
import PreviewArea from './PreviewArea';
import ImageUpload from './ImageUpload';
import ImageControls from './ImageControls';
import SizeSelector from './SizeSelector';
import NeckStyleSelector from './NeckStyleSelector';
import TextCustomizer from './TextCustomizer';

interface CustomizationToolProps {
  product: Product;
}

const CustomizationTool = ({ product }: CustomizationToolProps) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedNeckStyle, setSelectedNeckStyle] = useState<string>('round');
  
  const {
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
  } = useImageCustomization();

  const addToCart = () => {
    console.log('Added to cart:', {
      product,
      size: selectedSize,
      neckStyle: selectedNeckStyle,
      customImage: userImage,
      imagePosition: position,
      imageScale: scale,
      imageRotation: rotation,
      customText,
      textPosition,
      textScale,
      textRotation,
      textFont,
      textColor
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
          neckStyle={selectedNeckStyle}
          userImage={userImage}
          position={position}
          scale={scale}
          rotation={rotation}
          customText={customText}
          textPosition={textPosition}
          textScale={textScale}
          textRotation={textRotation}
          textFont={textFont}
          textColor={textColor}
          isProcessing={isProcessing}
        />
        
        <div className="space-y-6">
          <NeckStyleSelector 
            selectedStyle={selectedNeckStyle}
            onStyleSelect={setSelectedNeckStyle}
          />
          
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
              onRotate={rotateImage}
            />
          )}
          
          <TextCustomizer 
            text={customText}
            onTextChange={setCustomText}
            onFontChange={setTextFont}
            onColorChange={setTextColor}
            onMove={moveText}
            onRotate={rotateText}
            onScale={adjustTextScale}
            onReset={resetText}
          />
          
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
