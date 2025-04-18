
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import { getProductsByCategory, products } from "@/data/products";
import { Product } from "@/types";
import { Filter, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Products = () => {
  const { category } = useParams<{ category?: string }>();
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  
  useEffect(() => {
    let filteredProducts: Product[];
    
    if (category) {
      filteredProducts = getProductsByCategory(category);
    } else {
      filteredProducts = [...products];
    }
    
    // Apply size filter if any are selected
    if (selectedSizes.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        product.sizes.some(size => selectedSizes.includes(size))
      );
    }
    
    setDisplayProducts(filteredProducts);
  }, [category, selectedSizes]);
  
  const toggleSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };
  
  const clearFilters = () => {
    setSelectedSizes([]);
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow mt-16 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold tracking-tight capitalize">
                {category ? `${category}s` : 'All Products'}
              </h1>
              
              <Button 
                variant="outline" 
                className="md:hidden flex items-center gap-2"
                onClick={toggleFilters}
              >
                <Filter size={16} />
                Filters
              </Button>
            </div>
            
            {selectedSizes.length > 0 && (
              <div className="flex items-center mt-4">
                <span className="text-sm text-gray-500 mr-2">Filters:</span>
                <div className="flex flex-wrap gap-2">
                  {selectedSizes.map(size => (
                    <span 
                      key={size} 
                      className="bg-gray-100 text-xs px-2 py-1 rounded-full flex items-center"
                    >
                      Size: {size}
                      <button onClick={() => toggleSize(size)} className="ml-1">
                        <XCircle size={14} />
                      </button>
                    </span>
                  ))}
                  <button 
                    className="text-xs text-gray-500 underline"
                    onClick={clearFilters}
                  >
                    Clear all
                  </button>
                </div>
              </div>
            )}
          </header>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Filters - Desktop */}
            <aside className={`w-full md:w-64 md:block ${showFilters ? 'block' : 'hidden'}`}>
              <div className="bg-gray-50 p-4 rounded-lg sticky top-24">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-medium">Filters</h2>
                  <button 
                    className="text-sm text-gray-500 md:hidden"
                    onClick={toggleFilters}
                  >
                    Close
                  </button>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map(size => (
                      <button
                        key={size}
                        className={`px-3 py-1 text-sm border ${
                          selectedSizes.includes(size) 
                            ? 'bg-black text-white border-black' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onClick={() => toggleSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                {selectedSizes.length > 0 && (
                  <button 
                    className="text-sm text-gray-500 hover:text-black"
                    onClick={clearFilters}
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </aside>
            
            {/* Product Grid */}
            <div className="flex-grow">
              {displayProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No products found matching your filters.</p>
                  <button 
                    className="mt-4 text-black underline"
                    onClick={clearFilters}
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
