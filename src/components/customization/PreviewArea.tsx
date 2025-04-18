
interface PreviewAreaProps {
  productImage: string;
  productName: string;
  userImage: string | null;
  position: { x: number; y: number };
  scale: number;
  isProcessing: boolean;
}

const PreviewArea = ({ 
  productImage, 
  productName, 
  userImage, 
  position, 
  scale,
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
  );
};

export default PreviewArea;
