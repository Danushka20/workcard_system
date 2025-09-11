// resources/js/Components/Dashboard/Header.tsx
interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarCollapsed: boolean;
  toggleSidebarCollapse: () => void;
}

export default function Header({ toggleSidebar, isSidebarCollapsed, toggleSidebarCollapse }: HeaderProps) {
  return (
    <header className="bg-white shadow">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <button
            className="text-gray-500 mr-4 focus:outline-none lg:hidden"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <i className="fas fa-bars"></i>
          </button>
          
          {/* Desktop toggle button for collapsed sidebar */}
          <button
            className="text-gray-500 mr-4 focus:outline-none hidden lg:block"
            onClick={toggleSidebarCollapse}
            aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <i className={`fas ${isSidebarCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
          </button>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
        </div>

        <div className="flex items-center">
          <div className="relative mr-4">
            {/* Notification bell */}
            <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
              <i className="fas fa-bell"></i>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">3</span>
            </button>
          </div>

          <div className="relative">
          </div>
        </div>
      </div>
    </header>
  );
}