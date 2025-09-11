// resources/js/Components/Dashboard/Sidebar.tsx
import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export default function Sidebar({ isOpen, onClose, isCollapsed = false, onToggle }: SidebarProps) {
  const currentUrl = window.location.pathname;
  
  // Use relative paths since Laravel dev server handles routing
  const menu = [
    {
      name: 'Dashboard',
      icon: 'fas fa-tachometer-alt',
      href: '/',
      active: currentUrl === '/' || currentUrl.includes('/dashboard')
    },
    {
      name: 'Jobs',
      icon: 'fas fa-briefcase',
      href: '/jobs',
      active: currentUrl.includes('/jobs')
    },
    {
      name: 'Reports',
      icon: 'fas fa-file-alt',
      href: '/reports',
      active: currentUrl.includes('/reports')
    }
  ];

  // Close sidebar on mobile when clicking a link
  const handleLinkClick = () => {
    if (window.innerWidth < 1024 && onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 bg-white shadow-xl
          transform transition-all duration-300 ease-in-out
          lg:relative lg:z-0 lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isCollapsed ? 'lg:w-16' : 'lg:w-64'}
          w-64
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={`
            p-4 border-b border-gray-200 
            flex items-center 
            ${isCollapsed ? 'lg:justify-center' : 'justify-between'}
          `}>
            {/* Logo and Title */}
            <div className={`
              flex items-center gap-3
              ${isCollapsed ? 'lg:justify-center' : ''}
            `}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                WC
              </div>
              {!isCollapsed && (
                <div className="lg:block">
                  <h1 className="text-lg font-bold text-gray-800 leading-tight">Work Card</h1>
                  <p className="text-xs text-gray-500">Management System</p>
                </div>
              )}
            </div>
            
            {/* Desktop collapse button */}
            {onToggle && (
              <button
                className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100 focus:outline-none transition-colors"
                onClick={onToggle}
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 text-gray-600 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            
            {/* Mobile close button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none transition-colors"
              onClick={onClose}
              aria-label="Close sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            {!isCollapsed && (
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-4 font-semibold">
                Navigation
              </p>
            )}
            
            <ul className="space-y-2">
              {menu.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={handleLinkClick}
                    className={`
                      group flex items-center px-3 py-3 rounded-lg 
                      text-sm font-medium transition-all duration-200
                      ${item.active 
                        ? 'bg-blue-50 text-blue-700 shadow-sm border-l-4 border-blue-500' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }
                      ${isCollapsed ? 'lg:justify-center lg:px-2' : ''}
                    `}
                    title={isCollapsed ? item.name : ''}
                  >
                    <i className={`
                      ${item.icon} 
                      ${item.active ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'} 
                      ${isCollapsed ? 'text-lg' : 'w-5 text-center mr-3'}
                      transition-colors duration-200
                    `} />
                    
                    {!isCollapsed && (
                      <span className="truncate">{item.name}</span>
                    )}
                    
                    {!isCollapsed && item.active && (
                      <div className="ml-auto">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <button 
              className={`
                group flex items-center px-3 py-3 rounded-lg
                text-sm font-medium text-red-600 
                bg-red-50 hover:bg-red-100
                transition-all duration-200 w-full
                ${isCollapsed ? 'lg:justify-center lg:px-2' : ''}
              `}
              title={isCollapsed ? "Logout" : ""}
            >
              <i className={`
                fas fa-sign-out-alt text-red-500
                ${isCollapsed ? 'text-lg' : 'w-5 text-center mr-3'}
              `} />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>

        {/* Resize handle for desktop */}
        {onToggle && (
          <div 
            className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2"
          >
            <button
              onClick={onToggle}
              className="w-6 h-12 bg-white border border-gray-200 rounded-r-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center justify-center"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-3 w-3 text-gray-400 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}