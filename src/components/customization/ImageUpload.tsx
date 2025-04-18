
import { Button } from '@/components/ui/button';
import { Upload, Undo } from 'lucide-react';
import { useRef, ChangeEvent } from 'react';

interface ImageUploadProps {
  onFileSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  hasImage: boolean;
  error: string | null;
}

const ImageUpload = ({ onFileSelect, onReset, hasImage, error }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Upload Your Face</h4>
      <p className="text-sm text-gray-500 mb-4">
        We'll automatically remove the background of your photo to create a custom design.
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
          Upload Photo
        </Button>
        
        {hasImage && (
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
      
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default ImageUpload;
