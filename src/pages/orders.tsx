import React, { useState } from 'react';
import { Sprout, ShoppingCart as CartIcon } from 'lucide-react';
import { OrdersList } from '../components/OrdersList';
import { AddProduct } from '../components/AddProduct';
import { ProductList } from '../components/ProductList';
import { Cart } from '../components/Cart';
import { CategoryFilter } from '../components/CategoryFilter';
import { Order, Product, CartItem } from '../types';

const initialOrders: Order[] = [
    {
        id: "ORD-2024-001",
        status: "processing",
        items: ["Organic Seeds - Tomato (500g)", "Natural Fertilizer (10kg)"],
        total: 7499,
        date: "2024-03-15",
        estimatedDelivery: "2024-03-20"
    },
    {
        id: "ORD-2024-002",
        status: "shipped",
        items: ["Garden Tools Set", "Soil pH Meter"],
        total: 12999,
        date: "2024-03-14",
        estimatedDelivery: "2024-03-18"
    }
];

const initialProducts: Product[] = [
    {
        id: "1",
        name: "John Deere 5310 Tractor",
        description: "Premium tractor with 55HP engine, perfect for medium to large farms",
        price: 850000,
        category: "equipment",
        stock: 5,
        image: "https://images.unsplash.com/photo-1605338198563-840133ce1c23?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: "2",
        name: "Rotavator Cultivator",
        description: "Heavy-duty cultivator for efficient soil preparation",
        price: 125000,
        category: "equipment",
        stock: 8,
        image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: "3",
        name: "Organic NPK Fertilizer",
        description: "Balanced nutrition for all crops, 100% organic",
        price: 1200,
        category: "fertilizers",
        stock: 100,
        image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: "4",
        name: "Premium Wheat Seeds",
        description: "High-yield wheat variety, disease resistant",
        price: 2500,
        category: "seeds",
        stock: 50,
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: "5",
        name: "Combine Harvester",
        description: "Modern harvester with advanced grain separation system",
        price: 1200000,
        category: "equipment",
        stock: 3,
        image: "https://images.unsplash.com/photo-1591086559154-a3d0ca421161?auto=format&fit=crop&q=80&w=800"
    }
];

function Orders() {
    const [orders] = useState<Order[]>(initialOrders);
    const [products] = useState<Product[]>(initialProducts);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'add-product'>('products');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isCartOpen, setIsCartOpen] = useState(false);

    const handleAddToCart = (product: Product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.product.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { product, quantity: 1 }];
        });
    };

    const handleUpdateQuantity = (productId: string, quantity: number) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.product.id === productId
                    ? { ...item, quantity: Math.max(1, Math.min(quantity, item.product.stock)) }
                    : item
            )
        );
    };

    const handleRemoveItem = (productId: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Sprout className="h-6 w-6 text-green-600" />
                            <h1 className="text-2xl font-bold text-gray-900">farmers.io</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500">Welcome back, Farmer John</span>
                            <button
                                onClick={() => setIsCartOpen(!isCartOpen)}
                                className="relative p-2 text-gray-600 hover:text-gray-900"
                            >
                                <CartIcon className="h-6 w-6" />
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {cartItems.length}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6">
                    <nav className="flex space-x-4" aria-label="Tabs">
                        <button
                            onClick={() => setActiveTab('products')}
                            className={`px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'products'
                                ? 'bg-green-100 text-green-700'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Products
                        </button>
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'orders'
                                ? 'bg-green-100 text-green-700'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Orders
                        </button>
                        <button
                            onClick={() => setActiveTab('add-product')}
                            className={`px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'add-product'
                                ? 'bg-green-100 text-green-700'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Add Product
                        </button>
                    </nav>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className={`lg:col-span-${isCartOpen ? '3' : '4'}`}>
                        <div className="bg-white rounded-lg shadow">
                            <div className="px-4 py-5 sm:p-6">
                                {activeTab === 'products' && (
                                    <>
                                        <div className="mb-6">
                                            <CategoryFilter
                                                selectedCategory={selectedCategory}
                                                onCategoryChange={setSelectedCategory}
                                            />
                                        </div>
                                        <ProductList
                                            products={products}
                                            onAddToCart={handleAddToCart}
                                            selectedCategory={selectedCategory}
                                        />
                                    </>
                                )}
                                {activeTab === 'orders' && (
                                    <>
                                        <h2 className="text-xl font-semibold text-gray-900 mb-6">My Orders</h2>
                                        <OrdersList orders={orders} />
                                    </>
                                )}
                                {activeTab === 'add-product' && (
                                    <>
                                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Add New Product</h2>
                                        <AddProduct onAddProduct={console.log} />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {isCartOpen && (
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow p-4">
                                <h2 className="text-lg font-semibold mb-4">Shopping Cart</h2>
                                <Cart
                                    items={cartItems}
                                    onUpdateQuantity={handleUpdateQuantity}
                                    onRemoveItem={handleRemoveItem}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Orders;
