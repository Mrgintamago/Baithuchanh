import React, { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-[67px] border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-full items-center justify-between px-4">
        <div className="text-2xl font-bold">
          <Link href="/" className="text-gray-800 flex items-center gap-3">
            <img 
              src="/icons/logo.png" 
              alt="wjbu-shop" 
              height="40" 
              width="40" 
              className="h-[40px]"
            />
            <span className="text-2xl font-bold text-gray-800">Wjbu</span>
          </Link>
        </div>
        
        <nav className="flex items-center space-x-6">
          <Link 
            href="/about" 
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
          >
            Về chúng tôi
          </Link>
          
          <div className="flex cursor-pointer items-center gap-2 rounded-md p-2 px-3 text-gray-800">
            <div className="rounded-lg border p-[3px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" viewBox="0 0 24 24">
                <path fill="#1a1a1a" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"></path>
              </svg>
            </div>
            
            <div 
              className="ml-3 cursor-pointer md:hidden" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg 
                className="h-6 w-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;