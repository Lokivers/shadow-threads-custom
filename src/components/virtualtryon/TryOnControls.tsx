
import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ZoomIn, ZoomOut } from 'lucide-react';
import { VirtualTryOnSettings } from '@/types';

interface TryOnControlsProps {
  tryOnSettings: VirtualTryOnSettings;
  cameraActive: boolean;
  onPositionChange: (direction: 'up' | 'down' | 'left' | 'right') => void;
  onScaleChange: (increase: boolean) => void;
  onRotationChange: (value: number[]) => void;
}

const TryOnControls: React.FC<TryOnControlsProps> = ({
  tryOnSettings,
  cameraActive,
  onPositionChange,
  onScaleChange,
  onRotationChange
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-medium mb-2">Position & Size</h4>
        
        {/* Position controls */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="col-start-2">
            <Button 
              onClick={() => onPositionChange('up')} 
              variant="outline"
              className="w-full border-black text-black"
              disabled={!cameraActive}
            >
              <ArrowUp size={16} />
            </Button>
          </div>
          <Button 
            onClick={() => onPositionChange('left')} 
            variant="outline"
            className="border-black text-black"
            disabled={!cameraActive}
          >
            <ArrowLeft size={16} />
          </Button>
          <Button 
            onClick={() => onPositionChange('down')} 
            variant="outline"
            className="border-black text-black"
            disabled={!cameraActive}
          >
            <ArrowDown size={16} />
          </Button>
          <Button 
            onClick={() => onPositionChange('right')} 
            variant="outline"
            className="border-black text-black"
            disabled={!cameraActive}
          >
            <ArrowRight size={16} />
          </Button>
          
          {/* Scale controls */}
          <Button 
            onClick={() => onScaleChange(true)} 
            variant="outline"
            className="border-black text-black"
            disabled={!cameraActive}
          >
            <ZoomIn size={16} />
          </Button>
          <Button 
            onClick={() => onScaleChange(false)} 
            variant="outline"
            className="border-black text-black"
            disabled={!cameraActive}
          >
            <ZoomOut size={16} />
          </Button>
        </div>
        
        {/* Rotation slider */}
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">Rotation</h4>
          <Slider
            value={[tryOnSettings.rotation]}
            min={-180}
            max={180}
            step={5}
            onValueChange={onRotationChange}
            disabled={!cameraActive}
          />
          <div className="flex justify-between text-xs mt-1">
            <span>-180°</span>
            <span>0°</span>
            <span>180°</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryOnControls;
