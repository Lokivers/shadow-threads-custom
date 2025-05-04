
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeaturedProducts from "@/components/products/FeaturedProducts";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-16 mt-16">
        <div className="relative bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                Minimal Design.<br />Maximum Impact.
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8">
                Experience premium quality apparel with our black and white collection.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/products/tshirt" 
                  className="bg-white text-black px-6 py-3 font-medium hover:bg-gray-100 transition-colors"
                >
                  Shop T-Shirts
                </Link>
                <Link 
                  to="/products/dress" 
                  className="border border-white px-6 py-3 font-medium hover:bg-white hover:text-black transition-colors"
                >
                  Shop Dresses
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-full md:w-1/2 h-full z-0 opacity-30 md:opacity-80">
            <div className="w-full h-full bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <img 
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=3271&auto=format&fit=crop" 
              alt="Hero" 
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight mb-8">Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-[3/4] group overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=2787&auto=format&fit=crop" 
                alt="T-Shirts" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-2xl font-bold mb-2">T-Shirts</h3>
                <Link 
                  to="/products/tshirt" 
                  className="text-white flex items-center text-sm font-medium hover:underline"
                >
                  <span>Shop Collection</span>
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
            
            <div className="relative aspect-[3/4] group overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=1935&auto=format&fit=crop" 
                alt="Dresses" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-2xl font-bold mb-2">Dresses</h3>
                <Link 
                  to="/products/dress" 
                  className="text-white flex items-center text-sm font-medium hover:underline"
                >
                  <span>Shop Collection</span>
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <FeaturedProducts />
      
      {/* Customization CTA */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Create Your Own Design</h2>
              <p className="text-gray-300 mb-6">
                Upload your photo and we'll remove the background automatically. 
                See how it looks on our premium t-shirts before you buy.
              </p>
              <Link 
                to="/customize" 
                className="inline-block bg-white text-black px-6 py-3 font-medium hover:bg-gray-100 transition-colors"
              >
                Start Customizing
              </Link>
            </div>
            <div className="md:w-1/3">
              <img 
                src="https://images.unsplash.com/photo-1603252109360-909baaf261c7?q=80&w=2940&auto=format&fit=crop" 
                alt="Customization" 
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
