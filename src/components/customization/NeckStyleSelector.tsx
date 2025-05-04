
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NeckStyleOption {
  id: string;
  name: string;
  image: string;
}

interface NeckStyleSelectorProps {
  onStyleSelect: (style: string) => void;
  selectedStyle: string;
}

const neckStyles: NeckStyleOption[] = [
  {
    id: 'round',
    name: 'Round Neck',
    image: 'https://placehold.co/100x100/000000/FFFFFF/png?text=Round'
  },
  {
    id: 'vneck',
    name: 'V-Neck',
    image: 'https://placehold.co/100x100/000000/FFFFFF/png?text=V-Neck'
  },
  {
    id: 'crew',
    name: 'Crew Neck',
    image: 'https://placehold.co/100x100/000000/FFFFFF/png?text=Crew'
  },
  {
    id: 'polo',
    name: 'Polo',
    image: 'https://placehold.co/100x100/000000/FFFFFF/png?text=Polo'
  }
];

const NeckStyleSelector = ({ onStyleSelect, selectedStyle }: NeckStyleSelectorProps) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Select Neck Style</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {neckStyles.map((style) => (
          <Button
            key={style.id}
            type="button"
            variant="outline"
            className={cn(
              "p-2 h-auto flex flex-col items-center border-2",
              selectedStyle === style.id ? "border-black bg-gray-100" : "border-gray-200"
            )}
            onClick={() => onStyleSelect(style.id)}
          >
            <img 
              src={style.image} 
              alt={style.name}
              className="w-12 h-12 object-contain mb-1"
            />
            <span className="text-xs">{style.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default NeckStyleSelector;
