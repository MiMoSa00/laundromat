import React from 'react';

const Page = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-navy to-reddish animate-gradient-flow text-white">
      <main className="flex flex-col items-center justify-center h-full pt-28 px-6">
        {/* Video Wrapper */}
        <div className="relative w-full max-w-full">
          <video
            src="/new.mp4"
            controls
            autoPlay
            muted
            loop
            className="w-full lg:w-[100%] h-[300px] object-cover rounded-lg shadow"
          >
            Your browser does not support the video tag.
          </video>

          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 text-white">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Welcome to Laundry Services</h1>
            <p className="text-base max-w-md text-center ">
              Your trusted partner for professional laundry and dry-cleaning
              services. Convenient, fast, and reliable!
            </p>
          </div>
        </div>

        {/* Get Started Button */}
        <a
          href="/register"
          className="mt-6 bg-white text-navy px-6 py-2 rounded-lg shadow hover:bg-gray-200"
        >
          Get Started
        </a>
      </main>
    </div>
  );
};

export default Page;
