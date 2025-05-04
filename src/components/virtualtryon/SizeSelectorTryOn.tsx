
import React from 'react';
import { Button } from '@/components/ui/button';

interface SizeSelectorTryOnProps {
  sizes: string[];
  selectedSize: string;
  onSizeSelect: (size: string) => void;
}

const SizeSelectorTryOn: React.FC<SizeSelectorTryOnProps> = ({
  sizes,
  selectedSize,
  onSizeSelect
}) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Select Size</h4>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <Button
            key={size}
            variant={selectedSize === size ? "default" : "outline"}
            className={selectedSize === size ? "bg-black hover:bg-gray-800 text-white" : "border-black text-black"}
            onClick={() => onSizeSelect(size)}
          >
            {size}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelectorTryOn;
