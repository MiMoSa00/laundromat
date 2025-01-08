// src/components/ServiceCards.tsx
'use client'

import { FC } from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'Wash & Fold',
    icon: '🧺',
  },
  {
    title: 'Dry Cleaning',
    icon: '👔',
  },
  {
    title: 'Iron & Press',
    icon: '👕',
  },
  {
    title: 'Stain Removal',
    icon: '✨',
  },
  {
    title: 'Starching',
    icon: '👚',
  },
  {
    title: 'Duvet Cleaning',
    icon: '🛏️',
  },
  {
    title: 'Curtain Cleaning',
    icon: '🪟',
  },
  {
    title: 'Shoe Cleaning',
    icon: '👞',
  }
];

const ServiceCards: FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 w-full lg:w-full ">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">Our Services</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2">
        {services.map((service) => (
          <motion.div
            key={service.title}
            whileHover={{ 
              y: -5,
              transition: { duration: 0.2 }
            }}
            className="p-2 rounded-lg bg-gray-50 border border-gray-100 cursor-pointer"
          >
            <div className="flex flex-col items-center space-y-1">
              <span className="text-xl">{service.icon}</span>
              <h3 className="font-medium text-sm text-gray-800 text-center">{service.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
      >
        Book Service
      </motion.button>
    </div>
  );
};

export default ServiceCards;