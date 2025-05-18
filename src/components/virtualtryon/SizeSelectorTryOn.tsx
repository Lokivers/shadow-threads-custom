
import React from 'react';

interface SizeSelectorTryOnProps {
  sizes: string[];
  selectedSize: string;
  onSizeSelect: (size: string) => void;
  disabled?: boolean;
}

const SizeSelectorTryOn: React.FC<SizeSelectorTryOnProps> = ({ 
  sizes, 
  selectedSize, 
  onSizeSelect,
  disabled = false
}) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Select Size</h4>
      <div className="grid grid-cols-4 gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            className={`py-2 border ${
              selectedSize === size 
                ? 'bg-black text-white border-black' 
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
            } rounded-md transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover-scale'}`}
            onClick={() => !disabled && onSizeSelect(size)}
            disabled={disabled}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelectorTryOn;
