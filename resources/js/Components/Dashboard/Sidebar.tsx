// resources/js/Components/Dashboard/Sidebar.tsx
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onClose, isCollapsed, onToggle }: SidebarProps) {
  const currentUrl = window.location.pathname;
  
  // Get the base path for the application
  const basePath = '/workcard_system/public';
  
  const menu = [
    {
      name: 'Dashboard',
      icon: 'fas fa-tachometer-alt',
      href: `${basePath}/`,
      active: currentUrl === basePath + '/' || currentUrl === basePath || currentUrl.includes('/dashboard')
    },
    {
      name: 'Jobs',
      icon: 'fas fa-briefcase',
      href: `${basePath}/jobs`,
      active: currentUrl.includes('/jobs')
    },
    {
      name: 'Reports',
      icon: 'fas fa-file-alt',
      href: `${basePath}/reports`,
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
          className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`sidebar fixed inset-y-0 left-0 z-30 bg-white shadow-lg transform transition-all duration-300 ease-in-out lg:relative lg:inset-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${
          isCollapsed ? 'w-20' : 'w-64 max-w-[80vw]'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className={`p-4 border-b flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            {!isCollapsed && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-md flex items-center justify-center text-white font-bold">LR</div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-800">Work Card Management</h1>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
              </div>
            )}
            
            {isCollapsed && (
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-md flex items-center justify-center text-white font-bold">LR</div>
            )}
            
            {/* Desktop toggle button */}
            <button
              className="hidden lg:flex p-2 rounded-full hover:bg-gray-200 focus:outline-none absolute -right-3 top-5 bg-white shadow-md border"
              onClick={onToggle}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 text-gray-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                style={{ transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Mobile close button */}
            <button
              className="lg:hidden p-2 rounded-full hover:bg-gray-200 focus:outline-none"
              onClick={onClose}
              aria-label="Close sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="p-4 flex-1 overflow-y-auto">
            {!isCollapsed && (
              <p className="text-gray-500 text-sm uppercase mb-3">Main</p>
            )}
            <ul className="space-y-2">
              {menu.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={handleLinkClick}
                    className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-blue-50 transition-colors ${
                      item.active ? 'bg-blue-50 text-blue-700' : ''
                    } ${isCollapsed ? 'justify-center' : ''}`}
                    title={isCollapsed ? item.name : ''}
                  >
                    <i className={`${item.icon} ${item.active ? 'text-blue-700' : 'text-blue-500'} ${isCollapsed ? 'text-lg' : 'w-5'}`} />
                    {!isCollapsed && (
                      <>
                        <span className={`font-medium ${item.active ? 'text-blue-700' : ''}`}>{item.name}</span>
                        {item.active && (
                          <div className="ml-auto w-1.5 h-6 bg-blue-500 rounded-full" />
                        )}
                      </>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t bg-white sticky bottom-0">
            <button 
              className={`flex items-center justify-center gap-2 p-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition ${isCollapsed ? '' : 'w-full'}`}
              title={isCollapsed ? "Logout" : ""}
            >
              <i className="fas fa-sign-out-alt" />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}