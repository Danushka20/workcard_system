// resources/js/Components/Dashboard/Header.tsx
interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarCollapsed?: boolean;
  toggleSidebarCollapse?: () => void;
}

export default function Header({ toggleSidebar, isSidebarCollapsed = false, toggleSidebarCollapse }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="flex justify-between items-center px-4 py-3 lg:px-6">
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none lg:hidden transition-colors"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Search bar - hidden on mobile */}
          <div className="relative hidden sm:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 lg:w-80 rounded-lg border border-gray-300 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-200"
            />
          </div>
        </div>
      </div>
    </header>
  );
}