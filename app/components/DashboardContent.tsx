// src/components/DashboardContent.tsx
'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import DashboardStats from './DashboardStats'
import RecentOrders from './RecentOrders'
import ServiceCards from './ServiceCards'

export default function DashboardContent() {

    const [userName, setUserName] = useState('');

    useEffect(() => {
        // Get user name from localStorage or your preferred storage method
        const storedName = localStorage.getItem('userName');
        setUserName(storedName || 'User'); // Fallback to 'User' if no name is found
    }, []);

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-navy to-red-500 pb-40">
            <main className="p-4 sm:p-6 w-full">
                <div className="max-w-7xl mx-auto w-full">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl sm:text-3xl font-semibold text-white mb-8 text-center"
                    >
                        Welcome back, {userName}!
                    </motion.h1>
                    <div className='w-full'>
                        <DashboardStats />
                    </div>
                    
                    {/* Responsive grid structure */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mt-8 w-full">
                        <div className="w-full">
                            <RecentOrders />
                        </div>
                        <div className="w-full">
                            <ServiceCards />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}