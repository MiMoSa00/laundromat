// src/components/DashboardStats.tsx
'use client'

import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBagIcon, 
  ClockIcon, 
  BanknotesIcon,
  SparklesIcon 
} from '@heroicons/react/24/outline';

const DashboardStats: FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Active Orders"
        value="5"
        icon={<ShoppingBagIcon className="w-6 h-6" />}
        trend="+2 from last week"
        color="blue"
        delay={0}
      />
      <StatCard
        title="In Progress"
        value="3"
        icon={<ClockIcon className="w-6 h-6" />}
        trend="2 pending pickup"
        color="yellow"
        delay={0.1}
      />
      <StatCard
        title="Total Spent"
        value="$245"
        icon={<BanknotesIcon className="w-6 h-6" />}
        trend="This month"
        color="green"
        delay={0.2}
      />
      <StatCard
        title="Loyalty Points"
        value="350"
        icon={<SparklesIcon className="w-6 h-6" />}
        trend="Silver tier"
        color="purple"
        delay={0.3}
      />
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  color: 'blue' | 'yellow' | 'green' | 'purple';
  delay: number;
}

const StatCard: FC<StatCardProps> = ({ title, value, icon, trend, color, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ 
        y: isHovered ? 0 : [0, -10, 0],
        transition: {
          duration: 2,
          repeat: isHovered ? 0 : Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: delay
        }
      }}
      whileHover={{ 
        scale: 1.05,
        transition: { 
          duration: 0.2,
          ease: "easeInOut"
        }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow w-full"
    >
      <div className="flex items-center justify-between">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
        <span className="text-sm text-gray-500">{trend}</span>
      </div>
      <h3 className="text-2xl font-bold mt-4">{value}</h3>
      <p className="text-gray-600">{title}</p>
    </motion.div>
  );
};

export default DashboardStats;