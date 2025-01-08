// src/app/services/page.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CurrencyDollarIcon, ClockIcon, TruckIcon } from '@heroicons/react/24/outline'
import Sidebar from '../components/Sidebar'
import { useRouter } from 'next/navigation'

// Define service types and currencies
type Currency = 'USD' | 'NGN' | 'EUR' | 'GBP'
type ServiceCategory = 'regular' | 'express' | 'premium'

interface Service {
  id: string
  name: string
  description: string
  basePrice: number
  category: ServiceCategory
  estimatedTime: string
  icon: string
}

const services: Service[] = [
  {
    id: 'wash-fold',
    name: 'Wash & Fold',
    description: 'Professional washing and folding service for your everyday clothes',
    basePrice: 2.50, // Price per lb/kg
    category: 'regular',
    estimatedTime: '24 hours',
    icon: '🧺'
  },
  {
    id: 'dry-clean',
    name: 'Dry Cleaning',
    description: 'Premium dry cleaning for delicate garments and formal wear',
    basePrice: 15.00,
    category: 'premium',
    estimatedTime: '48 hours',
    icon: '👔'
  },
  {
    id: 'iron-press',
    name: 'Iron & Press',
    description: 'Professional pressing service for wrinkle-free garments',
    basePrice: 5.00,
    category: 'regular',
    estimatedTime: '24 hours',
    icon: '👕'
  },
  {
    id: 'stain-removal',
    name: 'Stain Removal',
    description: 'Specialized stain removal treatment for tough spots',
    basePrice: 10.00,
    category: 'premium',
    estimatedTime: '72 hours',
    icon: '✨'
  },
  {
    id: 'starching',
    name: 'Starching',
    description: 'Professional starching for crisp, sharp-looking clothes',
    basePrice: 3.00,
    category: 'regular',
    estimatedTime: '24 hours',
    icon: '👚'
  },
  {
    id: 'duvet-clean',
    name: 'Duvet Cleaning',
    description: 'Deep cleaning for duvets, blankets, and comforters',
    basePrice: 25.00,
    category: 'premium',
    estimatedTime: '72 hours',
    icon: '🛏️'
  },
  {
    id: 'curtain-clean',
    name: 'Curtain Cleaning',
    description: 'Professional curtain cleaning and pressing',
    basePrice: 20.00,
    category: 'premium',
    estimatedTime: '72 hours',
    icon: '🪟'
  },
  {
    id: 'shoe-clean',
    name: 'Shoe Cleaning',
    description: 'Specialized cleaning for all types of footwear',
    basePrice: 15.00,
    category: 'premium',
    estimatedTime: '48 hours',
    icon: '👞'
  }
]

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


const formatNumberWithCommas = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
export default function ServicesPage() {

    const router = useRouter()


const handleBookService = (serviceId: string) => {
  // Here you would typically handle the booking logic
  // For now, we'll just redirect to the orders page
  router.push('/orders')
}

    
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('USD')
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all')

  const convertPrice = (price: number, currency: Currency) => {
    const converted = price * currencyRates[currency];
    
    // Format based on currency
    if (currency === 'NGN') {
      // Round to whole numbers for NGN
      return `${currencySymbols[currency]}${formatNumberWithCommas(Math.round(converted))}`;
    }
    
    // For other currencies, keep 2 decimal places
    const formattedPrice = Number(converted.toFixed(2));
    return `${currencySymbols[currency]}${formatNumberWithCommas(formattedPrice)}`;
  }

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory)

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }
    
      const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.5
          }
        },
        hover: {
          y: -15, // Move up on hover
          transition: {
            duration: 0.3,
            ease: "easeOut"
          }
        }
      }
    
      return (
        <div className="flex flex-col lg:flex-row min-h-screen">
        <Sidebar activeMenu="services" />
        
        {/* Updated width and margin classes */}
        <div className="w-full lg:ml-64"> {/* Removed default margin on small/medium screens */}
          <div className="min-h-screen pb-20 bg-gradient-to-b from-navy to-reddish">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
              {/* Header Section */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8 sm:mb-12 mt-12 lg:mt-0" // Added top margin for small screens to account for hamburger menu
              >
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                  Our Services
                </h1>
                <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto px-4">
                  Professional laundry services tailored to your needs
                </p>
              </motion.div>
  
              {/* Filters Section - Updated padding */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center px-4 sm:px-0">
              <select
  value={selectedCurrency}
  onChange={(e) => setSelectedCurrency(e.target.value as Currency)}
  className="bg-white rounded-md px-2 py-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:px-3 sm:py-2 md:px-4 md:py-2"
>
  {Object.keys(currencyRates).map((currency) => (
    <option key={currency} value={currency}>
      {currency}
    </option>
  ))}
</select>

<select
  value={selectedCategory}
  onChange={(e) => setSelectedCategory(e.target.value as ServiceCategory | 'all')}
  className="bg-white rounded-md px-2 py-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:px-3  sm:py-2 md:px-4 md:py-2"
>
  <option value="all">All Services</option>
  <option value="regular">Regular</option>
  <option value="express">Express</option>
  <option value="premium">Premium</option>
</select>
        </div>

        <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-0"
            >
              {filteredServices.map((service) => (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  whileHover="hover"
                  className="bg-white rounded-xl shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-2xl"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl">{service.icon}</span>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        service.category === 'premium' ? 'bg-purple-100 text-purple-800' :
                        service.category === 'express' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {service.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        {service.estimatedTime}
                      </div>
                      <div className="text-lg font-semibold text-blue-600">
                        {convertPrice(service.basePrice, selectedCurrency)}
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-gray-50 border-t">
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Book Now
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 sm:mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0 text-white"
        >
          <div className="text-center">
            <TruckIcon className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Free Pickup & Delivery</h3>
            <p className="text-gray-300">Available for orders above $50</p>
          </div>
          <div className="text-center">
            <ClockIcon className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Express Service</h3>
            <p className="text-gray-300">Same day service available</p>
          </div>
          <div className="text-center">
            <CurrencyDollarIcon className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Best Price Guarantee</h3>
            <p className="text-gray-300">We match any competitor's price</p>
          </div>
        </motion.div>
      </div>
    </div>
    </div>
    </div>
  )
}