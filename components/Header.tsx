import React from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-primary-700 to-secondary-700 text-white">
      <div className="container-custom py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-white mb-6">
              Shape the Future of RNBW
            </h1>
            <p className="text-white text-lg mb-8">
              We're developing a revolutionary new device that will transform how you interact with technology. 
              Your feedback is crucial in helping us create something truly special.
            </p>
            <a href="#survey-form" className="btn-primary bg-white text-primary-700 hover:bg-gray-100">
              Take the Survey
            </a>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="relative h-80 w-80 md:h-96 md:w-96">
              {/* Placeholder for the device image - replace with actual image path when available */}
              <div className="bg-white/20 rounded-2xl shadow-lg absolute inset-0 backdrop-blur-sm flex items-center justify-center">
                <span className="text-white text-xl font-bold">RNBW Device</span>
                {/* Uncomment when you have an actual image */}
                {/* <Image 
                  src="/images/rnbw-device.jpg" 
                  alt="RNBW Device"
                  fill
                  className="object-contain p-4"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 