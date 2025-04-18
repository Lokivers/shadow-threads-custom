
import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "tshirt-1",
    name: "Classic Black Tee",
    price: 29.99,
    description: "A timeless black t-shirt made with premium cotton for maximum comfort and durability.",
    category: "tshirt",
    images: ["/images/tshirt-black-1.png", "/images/tshirt-black-2.png"],
    sizes: ["S", "M", "L", "XL"],
    isCustomizable: true
  },
  {
    id: "tshirt-2",
    name: "White Minimal Tee",
    price: 29.99,
    description: "A clean white t-shirt with minimal design, perfect for everyday wear or customization.",
    category: "tshirt",
    images: ["/images/tshirt-white-1.png", "/images/tshirt-white-2.png"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    isCustomizable: true
  },
  {
    id: "tshirt-3",
    name: "Graphic Logo Tee",
    price: 34.99,
    description: "A stylish black t-shirt featuring our iconic logo in white print.",
    category: "tshirt",
    images: ["/images/tshirt-logo-1.png", "/images/tshirt-logo-2.png"],
    sizes: ["S", "M", "L", "XL"],
    isCustomizable: false
  },
  {
    id: "dress-1",
    name: "Minimalist Shift Dress",
    price: 59.99,
    description: "An elegant black shift dress with a clean silhouette and subtle details.",
    category: "dress",
    images: ["/images/dress-black-1.png", "/images/dress-black-2.png"],
    sizes: ["XS", "S", "M", "L"],
    isCustomizable: false
  },
  {
    id: "dress-2",
    name: "Structured White Dress",
    price: 69.99,
    description: "A sophisticated white dress with modern structured design for a bold statement.",
    category: "dress",
    images: ["/images/dress-white-1.png", "/images/dress-white-2.png"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isCustomizable: false
  },
  {
    id: "tshirt-4",
    name: "Premium Slim Fit Tee",
    price: 39.99,
    description: "A premium black slim-fit t-shirt crafted from high-quality materials for a perfect fit.",
    category: "tshirt",
    images: ["/images/tshirt-slim-1.png", "/images/tshirt-slim-2.png"],
    sizes: ["S", "M", "L", "XL"],
    isCustomizable: true
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

export const getFeaturedProducts = (limit: number = 3): Product[] => {
  return [...products].sort(() => 0.5 - Math.random()).slice(0, limit);
};
