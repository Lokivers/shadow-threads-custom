
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCw, RotateCcw, ZoomIn, ZoomOut, Move, Text } from 'lucide-react';

interface TextCustomizerProps {
  text: string;
  onTextChange: (text: string) => void;
  onFontChange: (font: string) => void;
  onColorChange: (color: string) => void;
  onMove: (direction: 'up' | 'down' | 'left' | 'right') => void;
  onRotate: (clockwise: boolean) => void;
  onScale: (increase: boolean) => void;
  onReset: () => void;
}

const fontOptions = [
  { value: 'Arial', label: 'Arial' },
  { value: 'Verdana', label: 'Verdana' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Courier New', label: 'Courier New' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Tahoma', label: 'Tahoma' },
  { value: 'Impact', label: 'Impact' },
  { value: 'Comic Sans MS', label: 'Comic Sans MS' }
];

const colorOptions = [
  { value: '#000000', label: 'Black' },
  { value: '#FFFFFF', label: 'White' },
  { value: '#FF0000', label: 'Red' },
  { value: '#00FF00', label: 'Green' },
  { value: '#0000FF', label: 'Blue' },
  { value: '#FFFF00', label: 'Yellow' },
  { value: '#FF00FF', label: 'Pink' },
  { value: '#00FFFF', label: 'Cyan' },
  { value: '#FFA500', label: 'Orange' },
  { value: '#800080', label: 'Purple' }
];

const TextCustomizer = ({
  text,
  onTextChange,
  onFontChange,
  onColorChange,
  onMove,
  onRotate,
  onScale,
  onReset
}: TextCustomizerProps) => {
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-medium mb-2">Add Custom Text</h4>
      
      <div>
        <Label htmlFor="custom-text">Your Text</Label>
        <div className="flex gap-2">
          <div className="flex-grow">
            <Input 
              id="custom-text"
              value={text}
              onChange={(e) => onTextChange(e.target.value)}
              placeholder="Enter your text here"
              className="w-full"
            />
          </div>
          <Button 
            variant="outline" 
            onClick={onReset}
            className="border-black text-black"
          >
            Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="font-select">Font Style</Label>
          <select
            id="font-select"
            className="w-full border border-gray-300 rounded px-3 py-2"
            onChange={(e) => onFontChange(e.target.value)}
          >
            {fontOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="color-select">Text Color</Label>
          <select
            id="color-select"
            className="w-full border border-gray-300 rounded px-3 py-2"
            onChange={(e) => onColorChange(e.target.value)}
          >
            {colorOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
      
      {text && (
        <>
          <div className="bg-blue-50 p-3 rounded-md border border-blue-200 mb-2">
            <p className="text-sm text-blue-700">
              <strong>Tip:</strong> You can freely drag the text on the preview area to position it exactly where you want.
            </p>
          </div>
          
          <h5 className="font-medium">Fine-Tune Text Position</h5>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="col-start-2">
              <Button 
                onClick={() => onMove('up')} 
                variant="outline"
                className="w-full border-black text-black"
              >
                <ArrowUp size={16} />
              </Button>
            </div>
            <Button 
              onClick={() => onMove('left')} 
              variant="outline"
              className="border-black text-black"
            >
              <ArrowLeft size={16} />
            </Button>
            <Button 
              onClick={() => onMove('down')} 
              variant="outline"
              className="border-black text-black"
            >
              <ArrowDown size={16} />
            </Button>
            <Button 
              onClick={() => onMove('right')} 
              variant="outline"
              className="border-black text-black"
            >
              <ArrowRight size={16} />
            </Button>
            
            <Button 
              onClick={() => onRotate(true)} 
              variant="outline"
              className="border-black text-black"
              title="Rotate Clockwise"
            >
              <RotateCw size={16} />
            </Button>
            <Button 
              onClick={() => onRotate(false)} 
              variant="outline"
              className="border-black text-black"
              title="Rotate Counter-Clockwise"
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

export default TextCustomizer;
