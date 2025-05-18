
import { useState, useRef, useEffect } from 'react';
import { Move } from 'lucide-react';

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
  isDraggingText: boolean;
  logoImage: string | null;
  logoPosition: { x: number; y: number };
  logoScale: number;
  logoRotation: number;
  isProcessing: boolean;
  onTextDragStart: (e: React.MouseEvent<HTMLDivElement>) => void;
  onTextDragEnd: () => void;
  onTextDrag: (e: React.MouseEvent<HTMLDivElement>) => void;
  onUserImageDragStart: (e: React.MouseEvent<HTMLDivElement>) => void;
  onUserImageDragEnd: () => void;
  onUserImageDrag: (e: React.MouseEvent<HTMLDivElement>) => void;
  onLogoDragStart: (e: React.MouseEvent<HTMLDivElement>) => void;
  onLogoDragEnd: () => void;
  onLogoDrag: (e: React.MouseEvent<HTMLDivElement>) => void;
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
  isDraggingText,
  logoImage,
  logoPosition,
  logoScale,
  logoRotation,
  isProcessing,
  onTextDragStart,
  onTextDragEnd,
  onTextDrag,
  onUserImageDragStart,
  onUserImageDragEnd,
  onUserImageDrag,
  onLogoDragStart,
  onLogoDragEnd,
  onLogoDrag
}: PreviewAreaProps) => {
  const [showTextDragHandle, setShowTextDragHandle] = useState(false);
  const [showUserImageDragHandle, setShowUserImageDragHandle] = useState(false);
  const [showLogoDragHandle, setShowLogoDragHandle] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Set default product image if none is provided
  const displayImage = productImage || 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?q=80&w=3087&auto=format&fit=crop';
  
  return (
    <div 
      ref={previewRef}
      className="bg-gray-100 rounded-lg aspect-square relative overflow-hidden flex items-center justify-center transition-all duration-300 h-[600px] shadow-lg"
    >
      {/* T-shirt Base Image */}
      <img 
        src={displayImage}
        alt={productName}
        className="w-full h-full object-contain animate-fade-in"
      />
      
      {/* User Image Overlay - Now Draggable */}
      {userImage && (
        <div 
          className={`absolute ${showUserImageDragHandle || isDraggingText ? 'ring-2 ring-blue-500' : ''} ${isDraggingText ? 'cursor-grabbing' : 'cursor-grab'} transition-transform duration-300 ease-out`}
          style={{
            top: `${position.y}%`,
            left: `${position.x}%`,
            width: `${scale/2}%`,
            height: `${scale/2}%`,
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
            zIndex: 20
          }}
          onMouseEnter={() => setShowUserImageDragHandle(true)}
          onMouseLeave={() => setShowUserImageDragHandle(false)}
          onMouseDown={onUserImageDragStart}
          onMouseUp={onUserImageDragEnd}
          onMouseMove={onUserImageDrag}
        >
          <img 
            src={userImage}
            alt="User uploaded image"
            className="w-full h-full object-contain animate-fade-in"
            draggable="false"
          />
          {showUserImageDragHandle && (
            <div className="absolute top-0 right-0 bg-blue-500 text-white p-1 rounded-bl-md animate-fade-in">
              <Move size={16} />
            </div>
          )}
        </div>
      )}

      {/* Logo Image Overlay - Now Draggable */}
      {logoImage && (
        <div 
          className={`absolute ${showLogoDragHandle ? 'ring-2 ring-green-500' : ''} cursor-grab transition-transform duration-300 ease-out`}
          style={{
            top: `${logoPosition.y}%`,
            left: `${logoPosition.x}%`,
            width: `${logoScale/2}%`,
            height: `${logoScale/2}%`,
            transform: `translate(-50%, -50%) rotate(${logoRotation}deg)`,
            zIndex: 30
          }}
          onMouseEnter={() => setShowLogoDragHandle(true)}
          onMouseLeave={() => setShowLogoDragHandle(false)}
          onMouseDown={onLogoDragStart}
          onMouseUp={onLogoDragEnd}
          onMouseMove={onLogoDrag}
        >
          <img 
            src={logoImage}
            alt="Logo image"
            className="w-full h-full object-contain animate-fade-in"
            draggable="false"
          />
          {showLogoDragHandle && (
            <div className="absolute top-0 right-0 bg-green-500 text-white p-1 rounded-bl-md animate-fade-in">
              <Move size={16} />
            </div>
          )}
        </div>
      )}

      {/* Custom Text Overlay - Now Draggable */}
      {customText && (
        <div 
          className={`absolute whitespace-nowrap ${showTextDragHandle ? 'ring-2 ring-purple-500 ring-offset-1' : ''} ${isDraggingText ? 'cursor-grabbing' : 'cursor-grab'} transition-transform duration-300 ease-out`}
          style={{
            top: `${textPosition.y}%`,
            left: `${textPosition.x}%`,
            transform: `translate(-50%, -50%) rotate(${textRotation}deg)`,
            fontSize: `${textScale/4}px`,
            fontFamily: textFont,
            color: textColor,
            userSelect: 'none',
            zIndex: 40,
            textShadow: '0 0 5px rgba(255,255,255,0.5)'
          }}
          onMouseEnter={() => setShowTextDragHandle(true)}
          onMouseLeave={() => setShowTextDragHandle(false)}
          onMouseDown={onTextDragStart}
          onMouseUp={onTextDragEnd}
          onMouseMove={onTextDrag}
        >
          {customText}
          {showTextDragHandle && (
            <div className="absolute top-0 right-0 bg-purple-500 text-white p-1 rounded-bl-md animate-fade-in translate-x-full -translate-y-2">
              <Move size={16} />
            </div>
          )}
        </div>
      )}
      
      {/* Processing Indicator */}
      {isProcessing && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white z-50 animate-fade-in">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mx-auto"></div>
            <p className="mt-2">Processing image...</p>
          </div>
        </div>
      )}

      {/* Draggable Indicators */}
      <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg text-xs animate-fade-in">
        Drag elements to reposition • Scroll to resize
      </div>
    </div>
  );
};

export default PreviewArea;
