
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingBag } from "lucide-react";

// In a real app, this would come from a cart context/state
const cartItems = [
  {
    id: "item1",
    product: {
      id: "tshirt-1",
      name: "Classic Black Tee",
      price: 29.99,
      image: "https://placehold.co/120x120/000000/FFFFFF/png?text=Black+Tee",
    },
    size: "M",
    quantity: 1,
  },
  {
    id: "item2",
    product: {
      id: "tshirt-2",
      name: "White Minimal Tee",
      price: 29.99,
      image: "https://placehold.co/120x120/FFFFFF/000000/png?text=White+Tee",
    },
    size: "L",
    quantity: 2,
  },
];

const Cart = () => {
  const [items, setItems] = useState(cartItems);
  
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };
  
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    // Add shipping, tax, etc., as needed
    return subtotal;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow mt-16 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Your Cart</h1>
          </header>
          
          {items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="hidden sm:grid grid-cols-12 gap-4 p-4 bg-gray-50 text-sm font-medium">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-right">Total</div>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {items.map((item) => (
                      <div key={item.id} className="p-4 sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center">
                        {/* Product Info */}
                        <div className="col-span-6 flex">
                          <div className="w-20 h-20 flex-shrink-0 bg-gray-100 mr-4">
                            <img 
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{item.product.name}</h3>
                            <p className="text-sm text-gray-500">Size: {item.size}</p>
                            <button 
                              className="text-sm text-gray-500 hover:text-red-500 flex items-center sm:hidden mt-2"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 size={14} className="mr-1" />
                              Remove
                            </button>
                          </div>
                        </div>
                        
                        {/* Price */}
                        <div className="col-span-2 text-center mt-4 sm:mt-0">
                          <span className="sm:hidden text-sm text-gray-500 mr-2">Price:</span>
                          ${item.product.price.toFixed(2)}
                        </div>
                        
                        {/* Quantity */}
                        <div className="col-span-2 text-center mt-4 sm:mt-0 flex items-center sm:justify-center">
                          <span className="sm:hidden text-sm text-gray-500 mr-2">Quantity:</span>
                          <div className="flex items-center border border-gray-300">
                            <button 
                              className="px-2 py-1 hover:bg-gray-100"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </button>
                            <span className="px-2">{item.quantity}</span>
                            <button 
                              className="px-2 py-1 hover:bg-gray-100"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        
                        {/* Total */}
                        <div className="col-span-2 text-right mt-4 sm:mt-0">
                          <span className="sm:hidden text-sm text-gray-500 mr-2">Total:</span>
                          <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                          <button 
                            className="text-gray-500 hover:text-red-500 ml-4 hidden sm:inline-block"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal ({items.length} items)</span>
                      <span>${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>Free</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-black hover:bg-gray-800 py-6">
                    Proceed to Checkout
                  </Button>
                  
                  <div className="mt-4 text-center">
                    <Link to="/products" className="text-sm text-gray-500 hover:text-black">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="mx-auto w-16 h-16 mb-4 text-gray-400">
                <ShoppingBag size={64} strokeWidth={1} />
              </div>
              <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
              <Link to="/products">
                <Button className="bg-black hover:bg-gray-800">
                  Start Shopping
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
