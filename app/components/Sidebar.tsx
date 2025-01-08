// components/Sidebar.tsx
"use client"
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  HomeIcon, 
  ShoppingCartIcon, 
  UserIcon, 
  CalendarIcon,
  BellIcon,
  QuestionMarkCircleIcon,
  Squares2X2Icon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  activeMenu: string;
}

const Sidebar: FC<SidebarProps> = ({ activeMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    setUserName(storedName || 'User');
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const sidebarContent = (
    <div className="flex z-50  flex-col h-full">
      {/* Logo Section */}
      <div className="p-4 lg:pt-5 lg:border-t lg:border-burgundy-700 flex justify-between items-center">
        {/* <h1 className="text-2xl font-bold text-white">LaundroMate</h1> */}
        {/* <button 
          onClick={() => setIsOpen(false)}
          className="lg:hidden p-2 rounded-lg hover:bg-burgundy-700 text-gray-300 hover:text-white transition-colors"
        >
          <XMarkIcon className="w-6 h-6" />
        </button> */}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 lg:pt-9">
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" 
              onClick={() => setIsOpen(false)}
              className={`flex items-center p-3 rounded-lg hover:bg-burgundy-700 transition-colors
              ${activeMenu === 'dashboard' ? 'bg-burgundy-800 text-white' : 'text-gray-300'}`}>
              <HomeIcon className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/services"
              onClick={() => setIsOpen(false)} 
              className={`flex items-center p-3 rounded-lg hover:bg-burgundy-700 transition-colors
              ${activeMenu === 'services' ? 'bg-burgundy-800 text-white' : 'text-gray-300'}`}>
              <Squares2X2Icon className="w-5 h-5 mr-3" />
              Services
            </Link>
          </li>
          <li>
            <Link href="/orders"
              onClick={() => setIsOpen(false)} 
              className={`flex items-center p-3 rounded-lg hover:bg-burgundy-700 transition-colors
              ${activeMenu === 'orders' ? 'bg-burgundy-800 text-white' : 'text-gray-300'}`}>
              <ShoppingCartIcon className="w-5 h-5 mr-3" />
              Orders
            </Link>
          </li>
          <li>
            <Link href="/profile"
              onClick={() => setIsOpen(false)} 
              className={`flex items-center p-3 rounded-lg hover:bg-burgundy-700 transition-colors
              ${activeMenu === 'profile' ? 'bg-burgundy-800 text-white' : 'text-gray-300'}`}>
              <UserIcon className="w-5 h-5 mr-3" />
              Profile
            </Link>
          </li>
          <li>
            <Link href="/schedule"
              onClick={() => setIsOpen(false)} 
              className={`flex items-center p-3 rounded-lg hover:bg-burgundy-700 transition-colors
              ${activeMenu === 'schedule' ? 'bg-burgundy-800 text-white' : 'text-gray-300'}`}>
              <CalendarIcon className="w-5 h-5 mr-3" />
              Schedule
            </Link>
          </li>
          <li>
            <Link href="/notifications"
              onClick={() => setIsOpen(false)} 
              className={`flex items-center p-3 rounded-lg hover:bg-burgundy-700 transition-colors
              ${activeMenu === 'notifications' ? 'bg-burgundy-800 text-white' : 'text-gray-300'}`}>
              <BellIcon className="w-5 h-5 mr-3" />
              Notifications
            </Link>
          </li>
          <li>
            <Link href="/help"
              onClick={() => setIsOpen(false)} 
              className={`flex items-center p-3 rounded-lg hover:bg-burgundy-700 transition-colors
              ${activeMenu === 'help' ? 'bg-burgundy-800 text-white' : 'text-gray-300'}`}>
              <QuestionMarkCircleIcon className="w-5 h-5 mr-3" />
              Help
            </Link>
          </li>
        </ul>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-burgundy-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-burgundy-700 flex items-center justify-center">
              <span className="text-white font-medium">
                {userName.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
            <div className="ml-3">
              <p className="font-medium text-white">{userName}</p>
              <p className="text-sm text-gray-300">Premium Member</p>
            </div>
          </div>
          <Link href='/' onClick={() => setIsOpen(false)}>
            <button className="p-2 rounded-lg hover:bg-burgundy-700 text-gray-300 hover:text-white transition-colors">
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
          {/* Hamburger Menu Button - Only show when sidebar is closed */}
          {!isOpen && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(true)}
          className="lg:hidden fixed top-2 left-4 z-50 p-2 rounded-lg bg-burgundy-900 text-white 
                   hover:bg-burgundy-700 transition-colors shadow-lg"
          aria-label="Open menu"
        >
          <Bars3Icon className="w-6 h-6" />
        </motion.button>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 h-screen bg-burgundy-900 shadow-lg fixed left-0 top-0 z-40">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />

            {/* Sidebar Modal with Close Button */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-64 bg-burgundy-900 shadow-lg z-50 lg:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Logo Section with Close Button */}
                <div className="p-4 border-b border-burgundy-700 flex justify-between items-center">
                  <h1 className="text-2xl font-bold text-white">LaundroMate</h1>
                  <motion.button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-burgundy-700 text-gray-300 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </motion.button>
                </div>
               
              {sidebarContent}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;