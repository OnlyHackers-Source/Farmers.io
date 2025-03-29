export interface User {
  id: string;
  email: string;
  full_name: string;
  user_type: 'farmer' | 'wholesaler';
  phone: string;
  address: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  owner_id: string;
  is_rental: boolean;
  rental_price_per_day?: number;
  created_at: string;
}

export interface Order {
  id: string;
  buyer_id: string;
  seller_id: string;
  product_id: string;
  quantity: number;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
}

export interface RentalOrder {
  id: string;
  renter_id: string;
  owner_id: string;
  product_id: string;
  start_date: string;
  end_date: string;
  total_amount: number;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  created_at: string;
}