// src/app/orders/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TruckIcon, 
  ClockIcon, 
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'
import Sidebar from '../components/Sidebar'

// Types
type Currency = 'USD' | 'NGN' | 'EUR' | 'GBP'

interface Order {
  id: string
  status: 'pending' | 'processing' | 'out_for_delivery' | 'delivered' | 'cancelled'
  items: OrderItem[]
  totalAmount: number
  date: string
  estimatedDelivery?: string
}

interface OrderItem {
  service: string
  quantity: number
  price: number
}

const currencyRates = {
  USD: 1,
  NGN: 815,
  EUR: 0.85,
  GBP: 0.73
}

const currencySymbols = {
  USD: '$',
  NGN: '₦',
  EUR: '€',
  GBP: '£'
}

// Mock data - Replace with actual API calls
const mockPreviousOrders: Order[] = [
  {
    id: 'ORD-2023-123',
    status: 'delivered',
    items: [
      { service: 'Iron & Press', quantity: 3, price: 15.00 }
    ],
    totalAmount: 15.00,
    date: '2023-12-15'
  }
]

export default function OrdersPage() {
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null)
  const [previousOrders, setPreviousOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('USD')

  useEffect(() => {
    // Simulate API call
    const fetchOrders = async () => {
      setIsLoading(true)
      try {
        // Retrieve current order from local storage
        const storedOrder = localStorage.getItem('currentOrder');
        if (storedOrder) {
          setCurrentOrder(JSON.parse(storedOrder));
        }
        // Replace with actual API calls
        await new Promise(resolve => setTimeout(resolve, 1000))
        setPreviousOrders(mockPreviousOrders)
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'out_for_delivery':
        return 'bg-purple-100 text-purple-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount: number) => {
    const converted = amount * currencyRates[selectedCurrency]
    
    if (selectedCurrency === 'NGN') {
      return `${currencySymbols[selectedCurrency]}${Math.round(converted).toLocaleString('en-US')}`
    }
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: selectedCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(converted)
  }

  const CurrencySelector = () => (
    <select
      value={selectedCurrency}
      onChange={(e) => setSelectedCurrency(e.target.value as Currency)}
      className="bg-white/10 backdrop-blur-sm text-white rounded-md px-3 py-1.5 text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 border border-white/20"
    >
      {Object.keys(currencyRates).map((currency) => (
        <option key={currency} value={currency} className="bg-gray-800 text-white">
          {currency}
        </option>
      ))}
    </select>
  )

  return (
    <div className="flex flex-col pb-40 lg:flex-row min-h-screen bg-gradient-to-b from-navy to-reddish">
      <Sidebar activeMenu="orders" />
      
      <div className="w-full lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-end mb-6">
            <CurrencySelector />
          </div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-6">
              Track Order
            </h2>

            {isLoading ? (
              <div className="animate-pulse bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
                <div className="h-4 bg-gray-200/20 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200/20 rounded w-1/2"></div>
              </div>
            ) : currentOrder ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white/10"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <p className="text-white/70 text-sm">Order ID</p>
                      <p className="font-medium text-white">{currentOrder.id}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(currentOrder.status)} self-start sm:self-center`}>
                      {currentOrder.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="border-t border-white/10 py-4 my-4">
                    {currentOrder.items.map((item, index) => (
                      <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 last:mb-0">
                        <div className="mb-2 sm:mb-0">
                          <p className="font-medium text-white">{item.service}</p>
                          <p className="text-sm text-white/70">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-medium text-white">{formatCurrency(item.price)}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <p className="text-white/70 text-sm">Estimated Delivery</p>
                      <p className="font-medium text-white">{formatDate(currentOrder.estimatedDelivery || '')}</p>
                    </div>
                    <p className="text-xl font-bold text-white">{formatCurrency(currentOrder.totalAmount)}</p>
                  </div>
                </div>
                
                <div className="bg-white/5 px-4 sm:px-6 py-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center">
                      <CheckCircleIcon className="w-6 h-6 text-green-400" />
                      <p className="text-xs mt-1 text-white/70 text-center">Ordered</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <CheckCircleIcon className="w-6 h-6 text-green-400" />
                      <p className="text-xs mt-1 text-white/70 text-center">Processing</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <ClockIcon className="w-6 h-6 text-white/70" />
                      <p className="text-xs mt-1 text-white/70 text-center">Out for Delivery</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <ClockIcon className="w-6 h-6 text-white/70" />
                      <p className="text-xs mt-1 text-white/70 text-center">Delivered</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6 text-center"
              >
                <TruckIcon className="w-12 h-12 mx-auto text-white/70 mb-4" />
                <p className="text-white/70">No active orders to track</p>
              </motion.div>
            )}
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-6">
              Previous Orders
            </h2>
            
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="animate-pulse bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
                    <div className="h-4 bg-gray-200/20 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200/20 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : previousOrders.length > 0 ? (
              <div className="space-y-4">
                {previousOrders.map((order) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white/10"
                  >
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div>
                          <p className="text-white/70 text-sm">Order ID</p>
                          <p className="font-medium text-white">{order.id}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)} self-start sm:self-center`}>
                          {order.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="border-t border-white/10 pt-4 mt-4">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 last:mb-0">
                            <div className="mb-2 sm:mb-0">
                              <p className="font-medium text-white">{item.service}</p>
                              <p className="text-sm text-white/70">Quantity: {item.quantity}</p>
                            </div>
                            <p className="font-medium text-white">{formatCurrency(item.price)}</p>
                          </div>
                        ))}
                        
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4 pt-4 border-t border-white/10">
                          <p className="text-sm text-white/70">{formatDate(order.date)}</p>
                          <p className="text-lg font-bold text-white">{formatCurrency(order.totalAmount)}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6 text-center"
              >
                <XCircleIcon className="w-12 h-12 mx-auto text-white/70 mb-4" />
                <p className="text-white/70">No previous orders found</p>
              </motion.div>
            )}
          </motion.section>
        </div>
      </div>
    </div>
  );
};