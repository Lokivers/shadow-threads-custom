
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Product, VirtualTryOnSettings } from '@/types';

interface AddToCartButtonProps {
  product: Product;
  selectedSize: string;
  tryOnSettings: VirtualTryOnSettings;
  onAddToCart: () => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  selectedSize,
  tryOnSettings,
  onAddToCart
}) => {
  return (
    <div className="pt-4">
      <Button 
        onClick={onAddToCart} 
        className="w-full bg-black hover:bg-gray-800 text-white text-lg py-6 gap-2"
      >
        <ShoppingCart size={18} />
        Add to Cart - ${product.price.toFixed(2)}
      </Button>
    </div>
  );
};

export default AddToCartButton;
