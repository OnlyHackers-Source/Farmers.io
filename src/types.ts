export type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'delayed';

export interface Order {
    id: string;
    status: OrderStatus;
    items: string[];
    total: number;
    date: string;
    estimatedDelivery: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: 'seeds' | 'tools' | 'fertilizers' | 'equipment';
    stock: number;
    image: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}