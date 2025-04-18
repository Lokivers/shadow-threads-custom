
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VirtualTryOn from "@/components/virtualtryon/VirtualTryOn";
import { getProductById } from "@/data/products";
import { Product } from "@/types";

const VirtualTryOnPage = () => {
  const location = useLocation();
  const [product, setProduct] = useState<Product | null>(null);
  
  useEffect(() => {
    // Check if there's a product parameter in the URL
    const params = new URLSearchParams(location.search);
    const productId = params.get('product');
    
    if (productId) {
      const foundProduct = getProductById(productId);
      if (foundProduct) {
        setProduct(foundProduct);
      }
    } else {
      // If no product specified, default to first t-shirt
      const defaultProduct = getProductById('tshirt1');
      if (defaultProduct) {
        setProduct(defaultProduct);
      }
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Navbar />
      
      <main className="flex-grow mt-16 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Virtual Try-On</h1>
            <p className="mt-2 text-lg text-gray-600">
              Try on our t-shirts virtually using your camera. See how they look on you before you buy!
            </p>
          </header>
          
          {product ? (
            <VirtualTryOn product={product} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Product not found. Please select a valid product.</p>
            </div>
          )}
          
          {/* Showcase other t-shirts for try-on */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight mb-6">More T-Shirts to Try</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {/* This would be populated with actual t-shirts from the data */}
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="group relative">
                  <div className="aspect-square bg-gray-100 overflow-hidden rounded-lg">
                    <img 
                      src={`https://placehold.co/400x400/000000/FFFFFF/png?text=T-Shirt+${index + 1}`} 
                      alt={`T-Shirt ${index + 1}`}
                      className="w-full h-full object-cover object-center group-hover:opacity-75 transition-opacity"
                    />
                  </div>
                  <div className="mt-2">
                    <h3 className="text-sm font-medium">Classic T-Shirt {index + 1}</h3>
                    <p className="text-sm text-gray-500">${(19.99 + index * 5).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VirtualTryOnPage;
