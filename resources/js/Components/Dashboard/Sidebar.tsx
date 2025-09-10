// resources/js/Components/Dashboard/Sidebar.tsx
import { Link } from '@inertiajs/react';

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const menu = [
    { name: 'Dashboard', icon: 'fas fa-tachometer-alt', href: '/' },
    { name: 'Jobs', icon: 'fas fa-briefcase', href: '/jobs' },
    { name: 'Report', icon: 'fas fa-file-alt', href: '/reports' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
          onClick={() => { /* close handled by parent */ }}
        />
      )}

      <aside className={`sidebar fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-5 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-md flex items-center justify-center text-white font-bold">LR</div>
              <div>
                <h1 className="text-lg font-semibold text-gray-800">Work Card Management</h1>
                <p className="text-xs text-gray-500">Admin Dashboard</p>
              </div>
            </div>
          </div>

          <nav className="p-4 flex-1 overflow-y-auto">
            <p className="text-gray-500 text-sm uppercase mb-3">Main</p>
            <ul className="space-y-2">
              {menu.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-blue-50">
                    <i className={`${item.icon} w-5 text-blue-500`} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t bg-white sticky bottom-0">
            <button className="w-full flex items-center justify-center gap-2 p-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition">
              <i className="fas fa-sign-out-alt" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}