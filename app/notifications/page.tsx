// pages/notifications.tsx
"use client"
import React from 'react';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const Notification: React.FC = () => {
  const { width, height } = useWindowSize();
  const notifications = [
    { message: "The laundromat won't open today because it's a celebration day.", type: 'info' },
    { message: "It's maintenance day in the laundromat.", type: 'warning' },
    { message: "Wishing our customers a Happy New Year!", type: 'celebration' },
    { message: "New eco-friendly detergents now available!", type: 'update' },
    { message: "Extended hours on weekends starting next month.", type: 'update' },
  ];

  return (
    <div className="flex min-h-screen pb-14 bg-gradient-to-b from-navy via-red-500 to-red-700">
      <div className="lg:block lg:w-1/4">
        <Sidebar activeMenu="notifications" />
      </div>
      <div className="flex-1 p-6 lg:p-12 lg:ml-14 flex justify-center">
        <div className="max-w-4xl w-full bg-white/10 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Notifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {notifications.map((notification, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`overflow-hidden rounded-lg bg-white/30 p-4 ${
                  notification.type === 'celebration' ? 'relative' : ''
                }`}
              >
                {notification.type === 'celebration' && (
                  <Confetti width={width} height={height} recycle={false} />
                )}
                <p className="text-lg text-white">{notification.message}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;