// resources/js/Components/Dashboard/ChartsSection.tsx
export default function ChartsSection() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {/* Revenue Overview Chart */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-800">Revenue Overview</h3>
        <div className="h-48 sm:h-56 md:h-64 flex items-end space-x-1 sm:space-x-2 px-1 sm:px-2">
          {[60, 40, 80, 30, 70, 90, 55].map((height, index) => (
            <div key={index} className="flex-1 flex flex-col items-center group">
              <div 
                className="bg-gradient-to-t from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 
                         w-full max-w-8 sm:w-3/4 mb-1 sm:mb-2 rounded-t transition-all duration-500 
                         group-hover:scale-105 shadow-sm hover:shadow-md relative"
                style={{ height: `${height}%` }}
              >
                {/* Tooltip on hover */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white 
                              text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity 
                              duration-300 pointer-events-none whitespace-nowrap">
                  ${(height * 10).toLocaleString()}
                </div>
              </div>
              <p className="text-xs sm:text-xs text-gray-500 text-center font-medium">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][index]}
              </p>
            </div>
          ))}
        </div>
        {/* Legend for Revenue Chart */}
        <div className="mt-4 flex justify-center">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-blue-400 rounded"></div>
            <span>Monthly Revenue ($K)</span>
          </div>
        </div>
      </div>
      
      {/* User Distribution Chart */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-800">User Distribution</h3>
        <div className="h-48 sm:h-56 md:h-64 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0">
          {/* Pie Chart */}
          <div className="relative flex-shrink-0">
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full 
                          bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 
                          hover:scale-105 transition-transform duration-300 shadow-lg">
              <div className="absolute inset-3 sm:inset-4 bg-white rounded-full shadow-inner"></div>
              {/* Center Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-lg sm:text-xl font-bold text-gray-800">100%</p>
                  <p className="text-xs text-gray-500">Total Users</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="w-full sm:w-auto sm:ml-6 md:ml-8 space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between sm:justify-start group hover:bg-blue-50 
                          p-2 rounded-lg transition-colors duration-200">
              <div className="flex items-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full mr-2 sm:mr-3 
                              group-hover:scale-110 transition-transform duration-200"></div>
                <span className="text-sm sm:text-sm text-gray-700 font-medium">New Users</span>
              </div>
              <span className="text-sm font-bold text-blue-600 ml-auto sm:ml-4">35%</span>
            </div>
            
            <div className="flex items-center justify-between sm:justify-start group hover:bg-purple-50 
                          p-2 rounded-lg transition-colors duration-200">
              <div className="flex items-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-purple-500 rounded-full mr-2 sm:mr-3 
                              group-hover:scale-110 transition-transform duration-200"></div>
                <span className="text-sm sm:text-sm text-gray-700 font-medium">Returning</span>
              </div>
              <span className="text-sm font-bold text-purple-600 ml-auto sm:ml-4">45%</span>
            </div>
            
            <div className="flex items-center justify-between sm:justify-start group hover:bg-green-50 
                          p-2 rounded-lg transition-colors duration-200">
              <div className="flex items-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full mr-2 sm:mr-3 
                              group-hover:scale-110 transition-transform duration-200"></div>
                <span className="text-sm sm:text-sm text-gray-700 font-medium">Inactive</span>
              </div>
              <span className="text-sm font-bold text-green-600 ml-auto sm:ml-4">20%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}