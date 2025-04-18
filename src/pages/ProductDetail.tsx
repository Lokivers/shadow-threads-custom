
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getProductById } from "@/data/products";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [currentImage, setCurrentImage] = useState<string>("");

  useEffect(() => {
    if (id) {
      // Simulate fetching data
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedSize(foundProduct.sizes[0] || "");
        setCurrentImage(foundProduct.images[0] || "");
      }
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="mb-6">The product you're looking for doesn't exist.</p>
            <Link 
              to="/products" 
              className="bg-black text-white px-6 py-3 inline-block hover:bg-gray-800 transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    // In a real app, this would add the item to the cart
    console.log("Added to cart:", {
      product,
      size: selectedSize,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow mt-16 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 overflow-hidden">
                <img 
                  src={currentImage || product.images[0] || 'https://placehold.co/600x600/000000/FFFFFF/png?text=Product+Image'} 
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              
              {product.images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {product.images.map((img, index) => (
                    <button 
                      key={index}
                      className={`w-20 h-20 flex-shrink-0 bg-gray-100 ${
                        currentImage === img ? 'ring-2 ring-black' : ''
                      }`}
                      onClick={() => setCurrentImage(img)}
                    >
                      <img 
                        src={img || 'https://placehold.co/80x80/000000/FFFFFF/png?text=Thumbnail'} 
                        alt={`${product.name} thumbnail ${index+1}`}
                        className="w-full h-full object-cover object-center"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-2xl font-semibold mb-6">${product.price.toFixed(2)}</p>
              
              <div className="mb-6">
                <h2 className="text-sm font-medium mb-2">Description</h2>
                <p className="text-gray-600">{product.description}</p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-sm font-medium mb-2">Size</h2>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`px-3 py-1 border ${
                        selectedSize === size 
                          ? 'bg-black text-white border-black' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button 
                  onClick={handleAddToCart} 
                  className="bg-black hover:bg-gray-800 w-full sm:w-auto py-6"
                  disabled={!selectedSize}
                >
                  Add to Cart
                </Button>
                
                {product.isCustomizable && (
                  <Link to={`/customize?product=${product.id}`}>
                    <Button 
                      variant="outline" 
                      className="border-black text-black hover:bg-black hover:text-white w-full sm:w-auto py-6"
                    >
                      Customize This Item
                    </Button>
                  </Link>
                )}
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h2 className="text-sm font-medium mb-2">Details</h2>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  <li>100% premium cotton</li>
                  <li>Machine washable</li>
                  <li>Fits true to size</li>
                  <li>Made with sustainable materials</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Product Suggestions */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">You Might Also Like</h2>
              <Link 
                to={`/products/${product.category}`} 
                className="text-sm flex items-center hover:underline"
              >
                View All <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* This would be populated with actual suggested products in a real app */}
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gray-100"></div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
