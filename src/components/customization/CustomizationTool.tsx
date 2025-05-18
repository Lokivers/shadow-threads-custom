
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
import LogoUpload from './LogoUpload';

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
      textColor,
      logoImage,
      logoPosition,
      logoRotation,
      logoScale
    });
    
    toast.success("Added to cart!");
  };

  return (
    <div className="bg-white border border-black rounded-lg p-6 animate-fade-in">
      <h3 className="text-xl font-bold mb-4">Customize Your T-Shirt</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
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
            isDraggingText={isDraggingText}
            logoImage={logoImage}
            logoPosition={logoPosition}
            logoScale={logoScale}
            logoRotation={logoRotation}
            isProcessing={isProcessing}
            onTextDragStart={handleTextDragStart}
            onTextDragEnd={handleTextDragEnd}
            onTextDrag={handleTextDrag}
            onUserImageDragStart={handleUserImageDragStart}
            onUserImageDragEnd={handleUserImageDragEnd}
            onUserImageDrag={handleUserImageDrag}
            onLogoDragStart={handleLogoDragStart}
            onLogoDragEnd={handleLogoDragEnd}
            onLogoDrag={handleLogoDrag}
          />
          
          <div className="mt-4 text-center bg-gray-100 p-3 rounded-md animate-fade-in">
            <p className="text-sm font-medium">✨ Drag to position • Use controls to adjust • Customize to your style</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm animate-fade-in">
            <NeckStyleSelector 
              selectedStyle={selectedNeckStyle}
              onStyleSelect={setSelectedNeckStyle}
            />
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm animate-fade-in">
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
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm animate-fade-in">
            <LogoUpload
              onFileSelect={handleLogoSelect}
              onReset={resetLogo}
              onMove={moveLogo}
              onRotate={rotateLogo}
              onScale={adjustLogoScale}
              hasLogo={!!logoImage}
            />
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm animate-fade-in">
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
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm animate-fade-in">
            <SizeSelector 
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSizeSelect={setSelectedSize}
            />
          </div>
          
          <div className="pt-4 animate-fade-in">
            <Button 
              onClick={addToCart} 
              className="w-full bg-black hover:bg-gray-800 text-white text-lg py-6 hover-scale"
              disabled={isProcessing}
            >
              Add to Cart - ${product.price.toFixed(2)}
            </Button>
            
            <div className="mt-4 text-center">
              <Link to="/virtual-try-on" className="text-sm story-link text-blue-600 hover:text-blue-800">
                Try this on virtually first!
              </Link>
              <div className="mt-2">
                <Link to="/products/tshirt" className="text-sm text-gray-500 hover:text-black">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationTool;
