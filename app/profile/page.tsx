
"use client"
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const Profile: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = () => {
    if (newPassword === confirmPassword) {
      // Implement password change logic here
      console.log('Password changed successfully');
    } else {
      console.error('Passwords do not match');
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-navy  to-reddish">
     
        <Sidebar activeMenu="profile" />
      
      <div className="flex-1 p-6 lg:p-12 lg:w-3/4">
        <div className="max-w-2xl mx-auto  bg-white/10 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Profile</h2>
          <div className="mb-6">
            <label className="block text-cyan-100">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 border-none outline-none rounded-lg mt-2"
            />
          </div>
          <div className="mb-6">
            <label className="block text-cyan-100">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border-none outline-none rounded-lg mt-2"
            />
          </div>
          <div className="mb-6">
            <label className="block text-cyan-100">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border-none outline-none rounded-lg mt-2"
            />
          </div>
          <button
            onClick={handlePasswordChange}
            className="bg-blue-950 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;