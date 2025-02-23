import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Track window size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsOpen(true); // Always show on desktop
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobile && isOpen && 
          !e.target.closest('.sidebar') && 
          !e.target.closest('.hamburger')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isOpen]);

  return (
    <>
      {/* Hamburger Menu Button */}
      <button
        className={`hamburger fixed top-3 left-4 z-50 p-2 bg-gray-800 rounded-md text-white md:hidden ${
          isOpen ? 'hidden' : 'block'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-8 cursor-pointer "
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
      </button>

      {/* Sidebar */}
      <div
        className={`sidebar fixed md:relative z-40 w-64 bg-gray-800 text-white h-screen p-4 transform transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Close Button for Mobile */}
        <button
          className="md:hidden absolute top-0 right-4 p-1 cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <nav>
          <ul className="space-y-2 mt-8">
            <li>
              <Link
                to="/admin/organization"
                className={`block p-2 hover:bg-gray-700 rounded ${
                  location.pathname.startsWith('/admin/organization')
                    ? 'bg-gray-600 text-white'
                    : ''
                }`}
              >
                Organization
              </Link>
            </li>
            <li>
              <Link
                to="/admin/students"
                className={`block p-2 hover:bg-gray-700 rounded ${
                  location.pathname.startsWith('/admin/students') ? 'bg-gray-600 text-white' : ''
                  }`}
              >
                Students
              </Link>
            </li>
            <li>
              <Link
                to="/admin/teachers"
                className={`block p-2 hover:bg-gray-700 rounded ${
                  location.pathname.startsWith('/admin/teachers') ? 'bg-gray-600 text-white' : ''
                  }`}
              >
                Teachers
              </Link>
            </li>
            <li>
              <Link
                to="/admin/leave-days"
                className={`block p-2 hover:bg-gray-700 rounded ${
                  location.pathname.startsWith('/admin/leave-days') ? 'bg-gray-600 text-white' : ''
                  }`}
              >
                Leave days
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;