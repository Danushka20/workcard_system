// resources/js/Components/Dashboard/Header.tsx
interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className="bg-white shadow">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <button 
            className="text-gray-500 mr-4 focus:outline-none lg:hidden"
            onClick={toggleSidebar}
          >
            <i className="fas fa-bars"></i>
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
            <button className="text-gray-500 focus:outline-none">
              <i className="far fa-bell"></i>
            </button>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">3</span>
          </div>
          
          <div className="relative">
            <button className="flex items-center focus:outline-none">
              <img 
                src="https://randomuser.me/api/portraits/men/75.jpg" 
                alt="User" 
                className="w-10 h-10 rounded-full mr-2"
              />
              <span className="text-gray-700">John Doe</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}