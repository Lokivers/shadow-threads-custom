
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed w-full top-0 z-50 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold tracking-tighter">
              MONOCHROME
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-gray-300 font-medium">Home</Link>
            <Link to="/products/tshirt" className="hover:text-gray-300 font-medium">T-Shirts</Link>
            <Link to="/products/dress" className="hover:text-gray-300 font-medium">Dresses</Link>
            <Link to="/customize" className="hover:text-gray-300 font-medium">Customize</Link>
          </div>
          
          {/* Desktop Cart Icon */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-white hover:text-gray-300">
              <Search size={20} />
            </button>
            <Link to="/cart" className="text-white hover:text-gray-300">
              <ShoppingBag size={20} />
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Link to="/cart" className="mr-4 text-white">
              <ShoppingBag size={20} />
            </Link>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden bg-black text-white absolute w-full",
        isMenuOpen ? "block" : "hidden"
      )}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            to="/" 
            className="block px-3 py-2 hover:bg-gray-900 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/products/tshirt" 
            className="block px-3 py-2 hover:bg-gray-900 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            T-Shirts
          </Link>
          <Link 
            to="/products/dress" 
            className="block px-3 py-2 hover:bg-gray-900 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Dresses
          </Link>
          <Link 
            to="/customize" 
            className="block px-3 py-2 hover:bg-gray-900 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Customize
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
