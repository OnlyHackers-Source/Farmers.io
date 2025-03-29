import React from 'react';
import { Trash2 } from 'lucide-react';
import { CartItem } from '../types';
import { formatIndianRupee } from '../utils';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

export const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onRemoveItem }) => {
  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.product.id} className="flex items-center space-x-4 border-b pb-4">
          <img
            src={item.product.image}
            alt={item.product.name}
            className="w-16 h-16 object-cover rounded"
          />
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{item.product.name}</h4>
            <p className="text-sm text-gray-500">{formatIndianRupee(item.product.price)}</p>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              min="1"
              max={item.product.stock}
              value={item.quantity}
              onChange={(e) => onUpdateQuantity(item.product.id, parseInt(e.target.value, 10))}
              className="w-16 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
            <button
              onClick={() => onRemoveItem(item.product.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
      <div className="pt-4 border-t">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium">Total:</span>
          <span className="text-xl font-bold text-gray-900">{formatIndianRupee(total)}</span>
        </div>
        <button
          className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};