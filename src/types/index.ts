
export type ProductCategory = 'tshirt' | 'dress';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: ProductCategory;
  images: string[];
  sizes: string[];
  isCustomizable?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  customImage?: string;
}
