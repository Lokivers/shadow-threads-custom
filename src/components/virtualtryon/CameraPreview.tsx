
import React from 'react';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import { Product, VirtualTryOnSettings } from '@/types';
import { useCamera } from '@/hooks/useCamera';

interface CameraPreviewProps {
  product: Product;
  tryOnSettings: VirtualTryOnSettings;
  cameraActive: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  takeScreenshot: () => boolean;
}

const CameraPreview: React.FC<CameraPreviewProps> = ({
  product,
  tryOnSettings,
  cameraActive,
  videoRef,
  canvasRef,
  startCamera,
  stopCamera,
  takeScreenshot
}) => {
  return (
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
  );
};

export default CameraPreview;
