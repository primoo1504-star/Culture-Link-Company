
import React, { useState } from 'react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  onAdminClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage, onAdminClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: '홈', id: 'home' },
    { label: '회사소개', id: 'about' },
    { label: '포트폴리오', id: 'portfolio' },
    { label: '소식/공지', id: 'news' },
    { label: '문의하기', id: 'contact' },
  ];

  return (
    <nav className="sticky top-0 bg-white/90 backdrop-blur-md z-40 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
            <span className="text-2xl font-black tracking-tighter text-purple-700">
              문화<span className="text-gray-900">이음</span>
            </span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-12">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  currentPage === item.id 
                    ? 'text-purple-600' 
                    : 'text-gray-500 hover:text-purple-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-purple-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-3 py-4 text-base font-medium rounded-md ${
                  currentPage === item.id 
                    ? 'text-purple-600 bg-purple-50' 
                    : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
