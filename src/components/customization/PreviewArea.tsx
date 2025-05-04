
interface PreviewAreaProps {
  productImage: string;
  productName: string;
  neckStyle: string;
  userImage: string | null;
  position: { x: number; y: number };
  scale: number;
  rotation: number;
  customText: string;
  textPosition: { x: number; y: number };
  textScale: number;
  textRotation: number;
  textFont: string;
  textColor: string;
  isProcessing: boolean;
}

const PreviewArea = ({ 
  productImage, 
  productName, 
  neckStyle,
  userImage, 
  position, 
  scale,
  rotation,
  customText,
  textPosition,
  textScale,
  textRotation,
  textFont,
  textColor,
  isProcessing 
}: PreviewAreaProps) => {
  return (
    <div className="bg-gray-100 rounded-lg aspect-square relative overflow-hidden flex items-center justify-center">
      {/* T-shirt Base Image */}
      <img 
        src={productImage || 'https://placehold.co/400x400/000000/FFFFFF/png?text=T-Shirt'}
        alt={productName}
        className="w-full h-full object-contain"
      />
      
      {/* User Image Overlay */}
      {userImage && (
        <div 
          className="absolute pointer-events-none"
          style={{
            top: `${position.y}%`,
            left: `${position.x}%`,
            width: `${scale/2}%`,
            height: `${scale/2}%`,
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`
          }}
        >
          <img 
            src={userImage}
            alt="User uploaded image"
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* Custom Text Overlay */}
      {customText && (
        <div 
          className="absolute pointer-events-none whitespace-nowrap"
          style={{
            top: `${textPosition.y}%`,
            left: `${textPosition.x}%`,
            transform: `translate(-50%, -50%) rotate(${textRotation}deg)`,
            fontSize: `${textScale/4}px`,
            fontFamily: textFont,
            color: textColor
          }}
        >
          {customText}
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
  );
};

export default PreviewArea;
