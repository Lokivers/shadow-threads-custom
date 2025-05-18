
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VirtualTryOn from "@/components/virtualtryon/VirtualTryOn";
import { getProductById, getVirtualTryOnProducts } from "@/data/products";
import { Product } from "@/types";

const VirtualTryOnPage = () => {
  const location = useLocation();
  const [product, setProduct] = useState<Product | null>(null);
  const [tryOnProducts, setTryOnProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Get products that support virtual try-on
    const virtualTryOnProducts = getVirtualTryOnProducts();
    setTryOnProducts(virtualTryOnProducts);
    
    // Check if there's a product parameter in the URL
    const params = new URLSearchParams(location.search);
    const productId = params.get('product');
    
    if (productId) {
      const foundProduct = getProductById(productId);
      if (foundProduct?.isVirtualTryOn) {
        setProduct(foundProduct);
      } else if (virtualTryOnProducts.length > 0) {
        // If selected product doesn't support try-on, default to first product that does
        setProduct(virtualTryOnProducts[0]);
      }
    } else if (virtualTryOnProducts.length > 0) {
      // If no product specified, default to first t-shirt with try-on capabilities
      setProduct(virtualTryOnProducts[0]);
    }
  }, [location.search]);

  // Handle product selection
  const handleProductSelect = (selectedProduct: Product) => {
    setProduct(selectedProduct);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Navbar />
      
      <main className="flex-grow mt-16 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold tracking-tight">Virtual Try-On</h1>
            <p className="mt-2 text-lg text-gray-600">
              Try on our t-shirts virtually using your camera. See how they look on you before you buy!
            </p>
          </header>
          
          {product ? (
            <div className="animate-fade-in">
              <VirtualTryOn product={product} />
            </div>
          ) : (
            <div className="text-center py-12 animate-fade-in">
              <p className="text-gray-500">No products available for virtual try-on.</p>
            </div>
          )}
          
          {/* Showcase other t-shirts for try-on */}
          {tryOnProducts.length > 0 && (
            <div className="mt-16 animate-fade-in">
              <h2 className="text-2xl font-bold tracking-tight mb-6">More T-Shirts to Try</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {tryOnProducts.map((tryOnProduct) => (
                  <div 
                    key={tryOnProduct.id} 
                    className={`group relative cursor-pointer hover-scale ${product?.id === tryOnProduct.id ? 'ring-2 ring-black' : ''}`}
                    onClick={() => handleProductSelect(tryOnProduct)}
                  >
                    <div className="aspect-square bg-gray-100 overflow-hidden rounded-lg">
                      <img 
                        src={tryOnProduct.images[0]} 
                        alt={tryOnProduct.name}
                        className="w-full h-full object-cover object-center group-hover:opacity-75 transition-opacity"
                      />
                    </div>
                    <div className="mt-2">
                      <h3 className="text-sm font-medium">{tryOnProduct.name}</h3>
                      <p className="text-sm text-gray-500">${tryOnProduct.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VirtualTryOnPage;
