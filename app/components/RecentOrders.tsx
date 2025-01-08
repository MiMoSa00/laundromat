// src/components/RecentOrders.tsx
'use client'

import { FC } from 'react';
import { motion } from 'framer-motion';

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'completed' | 'delivered';
  items: number;
  total: number;
}

const RecentOrders: FC = () => {
  // Mock data - replace with actual data fetching
  const orders: Order[] = [
    {
      id: 'ORD-001',
      date: '2024-01-20',
      status: 'processing',
      items: 3,
      total: 45.99
    },
    // Add more orders as needed
  ];

  if (orders.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-8 shadow-sm text-center"
      >
        <img 
          src="/empty-orders.svg" 
          alt="No orders" 
          className="w-48 h-48 mx-auto mb-4"
        />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No Recent Orders
        </h3>
        <p className="text-gray-600 mb-4">
          Start your laundry journey by placing your first order!
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Place Order
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl shadow-sm"
    >
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold">Recent Orders</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {orders.map((order) => (
          <motion.div
            key={order.id}
            whileHover={{ scale: 1.02 }}
            className="p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Order #{order.id}</h3>
                <p className="text-sm text-gray-500">{order.date}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">${order.total.toFixed(2)}</p>
                <span className={`text-sm px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'processing':
      return 'bg-blue-100 text-blue-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'delivered':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default RecentOrders;