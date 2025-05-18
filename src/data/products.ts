
import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "tshirt-1",
    name: "Classic Black Tee",
    price: 29.99,
    description: "A timeless black t-shirt made with premium cotton for maximum comfort and durability.",
    category: "tshirt",
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=2874&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618354691438-25bc04584c23?q=80&w=2415&auto=format&fit=crop"
    ],
    sizes: ["S", "M", "L", "XL"],
    isCustomizable: true,
    isVirtualTryOn: true
  },
  {
    id: "tshirt-2",
    name: "White Minimal Tee",
    price: 29.99,
    description: "A clean white t-shirt with minimal design, perfect for everyday wear or customization.",
    category: "tshirt",
    images: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=3087&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    isCustomizable: true,
    isVirtualTryOn: true
  },
  {
    id: "tshirt-3",
    name: "Graphic Logo Tee",
    price: 34.99,
    description: "A stylish black t-shirt featuring our iconic logo in white print.",
    category: "tshirt",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=2564&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503341338985-c0477be52513?q=80&w=2487&auto=format&fit=crop"
    ],
    sizes: ["S", "M", "L", "XL"],
    isCustomizable: false,
    isVirtualTryOn: true
  },
  {
    id: "dress-1",
    name: "Minimalist Shift Dress",
    price: 59.99,
    description: "An elegant black shift dress with a clean silhouette and subtle details.",
    category: "dress",
    images: [
      "https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=2787&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=3087&auto=format&fit=crop"
    ],
    sizes: ["XS", "S", "M", "L"],
    isCustomizable: false,
    isVirtualTryOn: false
  },
  {
    id: "dress-2",
    name: "Structured White Dress",
    price: 69.99,
    description: "A sophisticated white dress with modern structured design for a bold statement.",
    category: "dress",
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=2876&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=2826&auto=format&fit=crop"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    isCustomizable: false,
    isVirtualTryOn: false
  },
  {
    id: "tshirt-4",
    name: "Premium Slim Fit Tee",
    price: 39.99,
    description: "A premium black slim-fit t-shirt crafted from high-quality materials for a perfect fit.",
    category: "tshirt",
    images: [
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?q=80&w=3087&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1564859227552-81fde4a1df0b?q=80&w=3271&auto=format&fit=crop"
    ],
    sizes: ["S", "M", "L", "XL"],
    isCustomizable: true,
    isVirtualTryOn: true
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getCustomizableProducts = (): Product[] => {
  return products.filter(product => product.isCustomizable);
};

export const getVirtualTryOnProducts = (): Product[] => {
  return products.filter(product => product.isVirtualTryOn);
};

export const getFeaturedProducts = (limit: number = 3): Product[] => {
  return [...products].sort(() => 0.5 - Math.random()).slice(0, limit);
};
