"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ShoppingCartIcon,
  UserIcon,
  CalendarIcon,
  BellIcon,
  QuestionMarkCircleIcon,
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  Squares2X2Icon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    setUserName(storedName || 'User');
    setIsLoggedIn(!!storedName);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleMouseLeave = (event: MouseEvent) => {
      const navbar = navbarRef.current;
      const dropdown = dropdownRef.current;
      
      if (!navbar || !dropdown) return;

      const navbarRect = navbar.getBoundingClientRect();
      const dropdownRect = dropdown.getBoundingClientRect();
      const mouseY = event.clientY;

      if (mouseY > dropdownRect.bottom || mouseY < navbarRect.top) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mousemove', handleMouseLeave);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousemove', handleMouseLeave);
    };
  }, [isMobileMenuOpen]);

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('userName');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavHover = () => {
    if (window.innerWidth >= 640) {
      setIsDropdownOpen(true);
    }
  };

  return (
    <div 
      ref={navbarRef}
      className="sticky top-0 bg-blue-50 text-black shadow-md z-50"
      onMouseEnter={handleNavHover}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        <div 
          className="flex items-center space-x-2"
          onMouseEnter={handleNavHover}
        >
          <button 
            ref={menuButtonRef}
            onClick={toggleMobileMenu} 
            className="sm:hidden"
          >
            <Bars3Icon className="h-6 w-6 text-navy" />
          </button>
          <ShoppingCartIcon className="h-6 w-6 text-navy" />
          <h1 className="text-lg font-bold text-navy">Laundromat</h1>
          <Link 
            href="/dashboard" 
            className="hidden sm:block hover:bg-white hover:text-black px-3 py-1 rounded transition-colors"
            onMouseEnter={handleNavHover}
          >
            Dashboard
          </Link>
          <Link 
            href="/services" 
            className="hidden sm:block hover:bg-white hover:text-black px-3 py-1 rounded transition-colors"
            onMouseEnter={handleNavHover}
          >
            Services
          </Link>
          <Link 
            href="/orders" 
            className="hidden sm:block hover:bg-white hover:text-black px-3 py-1 rounded transition-colors"
            onMouseEnter={handleNavHover}
          >
            Orders
          </Link>
          {/* <button 
            onClick={toggleDropdown} 
            onMouseEnter={handleNavHover}
            className="hidden sm:block hover:bg-white hover:text-black px-3 py-1 rounded transition-colors"
          >
            More
          </button> */}
        </div>
        <nav className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <a href="/login" className="hover:bg-white hover:text-black px-3 py-1 rounded transition-colors">
              Log In
            </a>
          ) : (
            <button onClick={handleSignOut} className="hover:bg-navy hover:text-white px-3 py-1 rounded transition-colors">
              Log Out
            </button>
          )}
          <Link href='/register'>
            <button className="bg-navy text-white px-3 py-1 rounded transition-colors">
              Sign up
            </button>
          </Link>
        </nav>
      </div>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ height: 0 }}
            animate={{ height: '25vh' }}
            exit={{ height: 0 }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="absolute inset-x-0 top-full bg-gray-500 text-white z-40 overflow-y-auto"
            onMouseEnter={() => setIsDropdownOpen(true)}
          >
            <div className="grid grid-cols-2 p-0">
              <Link href="/profile" className="hover:bg-navy p-2 lg:ml-40 rounded transition-colors">
                <UserIcon className="w-5 h-5 mr-2 inline" />
                Profile
              </Link>
              <Link href="/schedule" className="hover:bg-navy p-2 rounded transition-colors">
                <CalendarIcon className="w-5 h-5 mr-2 inline" />
                Schedule
              </Link>
              <Link href="/notifications" className="hover:bg-navy lg:ml-40 p-2 rounded transition-colors">
                <BellIcon className="w-5 h-5 mr-2 inline" />
                Notifications
              </Link>
              <Link href="/help" className="hover:bg-navy p-2 rounded transition-colors">
                <QuestionMarkCircleIcon className="w-5 h-5 mr-2 inline" />
                Help
              </Link>
              {(isLoggedIn || userName) && (
                <div className="flex items-center lg:ml-40 p-4 rounded hover:bg-navy transition-colors">
                  <div className="w-10 h-10 rounded-full bg-burgundy-700 flex items-center justify-center">
                    <span className="text-white font-medium">
                      {userName ? userName.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{userName || 'User'}</p>
                    <p className="text-sm text-white">Premium Member</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: 'tween', duration: 0.9, ease: "easeInOut" }}
            className="fixed inset-x-0 top-0 h-[50%] bg-gray-500 text-white z-40 overflow-y-auto"
          >
            <div className="flex flex-col h-full p-4">
              <button onClick={toggleMobileMenu} className="self-end mb-4">
                <XMarkIcon className="h-6 w-6 text-black" />
              </button>
              <Link href="/dashboard" className="hover:bg-gray-200 p-3 rounded transition-colors flex items-center">
                <HomeIcon className="w-5 h-5 mr-2 inline" />
                Dashboard
              </Link>
              <Link href="/services" className="hover:bg-gray-200 p-3 rounded transition-colors flex items-center">
                <Squares2X2Icon className="w-5 h-5 mr-2 inline" />
                Services
              </Link>
              <Link href="/orders" className="hover:bg-gray-200 p-3 rounded transition-colors flex items-center">
                <ShoppingCartIcon className="w-5 h-5 mr-2 inline" />
                Orders
              </Link>
              <Link href="/profile" className="hover:bg-gray-200 p-3 rounded transition-colors flex items-center">
                <UserIcon className="w-5 h-5 mr-2 inline" />
                Profile
              </Link>
              <Link href="/schedule" className="hover:bg-gray-200 p-3 rounded transition-colors flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2 inline" />
                Schedule
              </Link>
              <Link href="/notifications" className="hover:bg-gray-200 p-3 rounded transition-colors flex items-center">
                <BellIcon className="w-5 h-5 mr-2 inline" />
                Notifications
              </Link>
              <Link href="/help" className="hover:bg-gray-200 p-3 rounded transition-colors flex items-center">
                <QuestionMarkCircleIcon className="w-5 h-5 mr-2 inline" />
                Help
              </Link>
              {isLoggedIn && (
                <div className="flex items-center p-3 rounded hover:bg-gray-200 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-burgundy-700 flex items-center justify-center">
                    <span className="text-white font-medium">
                      {userName.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{userName}</p>
                    <p className="text-base text-white">Premium Member</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;