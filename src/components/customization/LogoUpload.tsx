
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Undo, Move, RotateCw, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

interface LogoUploadProps {
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  onMove: (direction: 'up' | 'down' | 'left' | 'right') => void;
  onRotate: (clockwise: boolean) => void;
  onScale: (increase: boolean) => void;
  hasLogo: boolean;
}

const LogoUpload: React.FC<LogoUploadProps> = ({ 
  onFileSelect, 
  onReset, 
  onMove, 
  onRotate, 
  onScale, 
  hasLogo 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-medium mb-2">Add Your Logo</h4>
      <p className="text-sm text-gray-500 mb-4">
        Upload your logo or brand image to add to your custom t-shirt.
      </p>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileSelect}
        accept="image/*"
        className="hidden"
      />
      
      <div className="flex flex-wrap gap-2">
        <Button 
          onClick={handleUploadClick} 
          className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white"
        >
          <Upload size={16} />
          Upload Logo
        </Button>
        
        {hasLogo && (
          <Button 
            onClick={onReset} 
            variant="outline"
            className="flex items-center gap-2 border-black text-black"
          >
            <Undo size={16} />
            Reset
          </Button>
        )}
      </div>
      
      {hasLogo && (
        <>
          <h5 className="font-medium mt-4">Adjust Logo Position</h5>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="col-start-2">
              <Button 
                onClick={() => onMove('up')} 
                variant="outline"
                className="w-full border-black text-black"
              >
                <Move size={16} />
                Up
              </Button>
            </div>
            
            <Button 
              onClick={() => onMove('left')} 
              variant="outline"
              className="border-black text-black"
            >
              <Move size={16} />
              Left
            </Button>
            
            <Button 
              onClick={() => onMove('down')} 
              variant="outline"
              className="border-black text-black"
            >
              <Move size={16} />
              Down
            </Button>
            
            <Button 
              onClick={() => onMove('right')} 
              variant="outline"
              className="border-black text-black"
            >
              <Move size={16} />
              Right
            </Button>
            
            <Button 
              onClick={() => onRotate(true)} 
              variant="outline"
              className="border-black text-black"
            >
              <RotateCw size={16} />
            </Button>
            
            <Button 
              onClick={() => onRotate(false)} 
              variant="outline"
              className="border-black text-black"
            >
              <RotateCcw size={16} />
            </Button>
            
            <Button 
              onClick={() => onScale(true)} 
              variant="outline"
              className="border-black text-black"
            >
              <ZoomIn size={16} />
            </Button>
            
            <Button 
              onClick={() => onScale(false)} 
              variant="outline"
              className="border-black text-black"
            >
              <ZoomOut size={16} />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default LogoUpload;
