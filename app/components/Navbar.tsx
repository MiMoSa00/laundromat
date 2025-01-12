"use client"
import React, { useState } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline'; // Import the icon

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulating login state

  const handleSignOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="sticky top-0 bg-navy text-white shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-2">
        <div className="flex items-center space-x-2">
          <ShoppingCartIcon className="h-6 w-6 left-12 relative text-white" /> {/* Add the icon here */}
          <h1 className="text-lg font-bold lg:left-12 left-11 relative text-white">Laundromat</h1>
        </div>
        <nav className="flex flex-wrap items-center space-x-4 mt-2 sm:mt-0">
          {!isLoggedIn ? (
            <>
              <a href="/login" className="hover:underline">
                Log In
              </a>
              <a
                href="/register"
                className="bg-white text-sky-600 px-3 py-1 rounded hover:bg-gray-200"
              >
                Sign Up
              </a>
            </>
          ) : (
            <button
              onClick={handleSignOut}
              className="bg-white text-sky-600 px-3 py-1 rounded hover:bg-gray-200"
            >
              Sign Out
            </button>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;