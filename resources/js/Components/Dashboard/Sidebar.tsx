// resources/js/Components/Dashboard/Sidebar.tsx
import { Link } from '@inertiajs/react';

interface SidebarProps {
  isOpen: boolean;
}

interface MenuItem {
  name: string;
  icon: string;
  href: string;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const menuItems: MenuItem[] = [
    { name: 'Dashboard', icon: 'fas fa-chart-pie', href: '/dashboard' },
    { name: 'Jobs', icon: 'fas fa-users', href: '/jobs' },
    { name: 'Your Jobs', icon: 'fas fa-box', href: '/products' },
    { name: 'Report', icon: 'fas fa-shopping-cart', href: '/orders' }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
          onClick={() => {/* Close sidebar logic would go here */}}
        ></div>
      )}
      
      <div className={`sidebar fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b">
          <h1 className="text-xl font-bold text-blue-600">Laravel React</h1>
          <p className="text-xs text-gray-500">Admin Dashboard</p>
        </div>
        
        <nav className="p-4">
          <div className="mb-6">
            <p className="text-gray-500 text-sm uppercase mb-3">Main</p>
            {menuItems.slice(0, 4).map((item, index) => (
              <Link 
                key={index}
                href={item.href} 
                className="flex items-center p-3 text-gray-700 hover:bg-blue-50 rounded-lg mb-2"
              >
                <i className={`${item.icon} mr-3`}></i>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}