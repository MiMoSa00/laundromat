// pages/schedule.tsx
"use client"
import React from 'react';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Schedule: React.FC = () => {
  const schedules = [
    { time: '8:00 AM', task: 'Pickup Laundry', image: '/pickup.jpg' },
    { time: '10:00 AM', task: 'Wash & Dry', image: '/wash.jpg' },
    { time: '1:00 PM', task: 'Iron', image: '/iron.jpg' },
    { time: '2:30 PM', task: 'Fold', image: '/folding.jpg' },
    { time: '3:40 PM', task: 'Shoes', image: '/shoes.jpg' },
    { time: 'Our machines', task: 'Wash', image: '/machine.jpg' },
    { time: 'Duty', task: 'Machine', image: '/machine 2.jpg' }
  ];

  return (
    <div className="flex pb-40 min-h-screen bg-gradient-to-b from-navy  to-reddish">
      <div className="lg:block lg:w-1/4">
        <Sidebar activeMenu="schedule" />
      </div>
      <div className="flex-1 p-6 lg:p-12  flex justify-center">
        <div className="max-w-4xl w-full bg-white/5 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Schedule</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schedules.map((schedule, index) => (
              <motion.div
                key={index}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 1.5,
                  delay: index * 0.2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
                className="overflow-hidden rounded-lg bg-white/10 p-4 flex items-center space-x-4"
              >
                <Image
                  src={schedule.image}
                  alt={`Schedule ${index + 1}`}
                  width={200}
                  height={200}
                  className="w-32 h-32 rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">{schedule.time}</h3>
                  <p className="text-cyan-100">{schedule.task}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;