// Product
export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: Category;
}

// Category
export interface Category {
  id: number;
  name: string;
  slug: string;
}

// User
export interface User {
  id: number;
  name: string;
  email: string;
}

// Order
export interface Order {
  id: number;
  user: User;
  items: OrderItem[];
  total: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  created_at: string;
}

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  price: number;
}

// Cart
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// API Response wrapper
export interface ApiResponse<T> {
  data: T;
  message: string;
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

// Filter & Sort
export type SortOption = "newest" | "oldest" | "price_asc" | "price_desc";

export interface ProductFilter {
  category?: string;
  search?: string;
  page?: number;
  sort?: SortOption;
}

// Checkout
export interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postal_code: string;
}

export interface CheckoutPayload {
  shipping_address: ShippingAddress;
  shipping_cost: number;
  total: number;
  items: {
    product_id: number;
    quantity: number;
    price: number;
  }[];
}