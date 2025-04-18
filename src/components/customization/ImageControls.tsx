
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ZoomIn, ZoomOut } from 'lucide-react';

interface ImageControlsProps {
  onMove: (direction: 'up' | 'down' | 'left' | 'right') => void;
  onScale: (increase: boolean) => void;
}

const ImageControls = ({ onMove, onScale }: ImageControlsProps) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Adjust Your Image</h4>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <Button 
          onClick={() => onMove('up')} 
          variant="outline"
          className="border-black text-black"
        >
          <ArrowUp size={16} />
        </Button>
        <Button 
          onClick={() => onMove('down')} 
          variant="outline"
          className="border-black text-black"
        >
          <ArrowDown size={16} />
        </Button>
        <Button 
          onClick={() => onMove('left')} 
          variant="outline"
          className="border-black text-black"
        >
          <ArrowLeft size={16} />
        </Button>
        <Button 
          onClick={() => onMove('right')} 
          variant="outline"
          className="border-black text-black"
        >
          <ArrowRight size={16} />
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
    </div>
  );
};

export default ImageControls;
