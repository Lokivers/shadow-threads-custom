
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomizationTool from "@/components/customization/CustomizationTool";
import { getCustomizableProducts, getProductById } from "@/data/products";
import { Product } from "@/types";

const Customization = () => {
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  useEffect(() => {
    // Check if there's a product parameter in the URL
    const params = new URLSearchParams(location.search);
    const productId = params.get('product');
    
    if (productId) {
      const product = getProductById(productId);
      if (product && product.isCustomizable) {
        setSelectedProduct(product);
        setProducts([product, ...getCustomizableProducts().filter(p => p.id !== productId)]);
      } else {
        // If product isn't found or isn't customizable, load all customizable products
        const customizableProducts = getCustomizableProducts();
        setProducts(customizableProducts);
        if (customizableProducts.length > 0) {
          setSelectedProduct(customizableProducts[0]);
        }
      }
    } else {
      // No product specified, load all customizable products
      const customizableProducts = getCustomizableProducts();
      setProducts(customizableProducts);
      if (customizableProducts.length > 0) {
        setSelectedProduct(customizableProducts[0]);
      }
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow mt-16 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Customize Your T-Shirt</h1>
            <p className="mt-2 text-lg text-gray-600">
              Upload your photo, we'll remove the background, and see how it looks on our premium t-shirts.
            </p>
          </header>
          
          {products.length > 1 && (
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-4">Select a Product to Customize</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {products.map((product) => (
                  <button
                    key={product.id}
                    className={`text-left p-2 rounded-lg transition-all ${
                      selectedProduct?.id === product.id ? 'ring-2 ring-black' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="aspect-square bg-gray-100 mb-2">
                      <img 
                        src={product.images[0] || 'https://placehold.co/200x200/000000/FFFFFF/png?text=Product'} 
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="text-sm font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {selectedProduct ? (
            <CustomizationTool product={selectedProduct} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No customizable products available.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Customization;
