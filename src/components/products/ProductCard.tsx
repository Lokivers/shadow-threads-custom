
import { Link } from "react-router-dom";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link 
      to={`/product/${product.id}`} 
      className="group transition-all duration-300 hover:shadow-xl"
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.images[0] || 'https://placehold.co/400x400/000000/FFFFFF/png?text=Product+Image'} 
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="mt-4 px-2">
        <h3 className="text-lg font-medium">{product.name}</h3>
        <p className="mt-1 font-semibold">${product.price.toFixed(2)}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-500 capitalize">{product.category}</span>
          {product.isCustomizable && (
            <span className="text-xs bg-black text-white px-2 py-1">Customizable</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
