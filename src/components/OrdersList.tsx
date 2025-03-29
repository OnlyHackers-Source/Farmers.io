import React from 'react';
import { Package, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { formatIndianRupee } from '../utils';

interface OrdersListProps {
  orders: Order[];
}

const getStatusIcon = (status: OrderStatus) => {
  switch (status) {
    case 'processing':
      return <Package className="w-5 h-5 text-blue-500" />;
    case 'shipped':
      return <Truck className="w-5 h-5 text-purple-500" />;
    case 'delivered':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'delayed':
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    default:
      return <Clock className="w-5 h-5 text-gray-500" />;
  }
};

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case 'processing':
      return 'bg-blue-100 text-blue-800';
    case 'shipped':
      return 'bg-purple-100 text-purple-800';
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'delayed':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="border rounded-lg p-4 hover:border-gray-300 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {getStatusIcon(order.status)}
              <span className="font-medium text-gray-900">{order.id}</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            <span className="font-medium text-gray-900">{formatIndianRupee(order.total)}</span>
          </div>
          
          <div className="space-y-2">
            {order.items.map((item, index) => (
              <div key={index} className="text-sm text-gray-600">{item}</div>
            ))}
          </div>
          
          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <div>
              Order Date: <span className="font-medium">{order.date}</span>
            </div>
            <div>
              Estimated Delivery: <span className="font-medium">{order.estimatedDelivery}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};