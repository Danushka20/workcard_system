// resources/js/Components/Dashboard/ChartsSection.tsx
export default function ChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Revenue Overview</h3>
        <div className="h-64 flex items-end space-x-2">
          {[60, 40, 80, 30, 70, 90, 55].map((height, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="bg-blue-500 w-3/4 mb-1 rounded-t transition-all duration-500" 
                style={{ height: `${height}%` }}
              ></div>
              <p className="text-xs text-gray-500">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][index]}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold mb-4 text-gray-800">User Distribution</h3>
        <div className="h-64 flex items-center justify-center">
          <div className="relative w-40 h-40 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="absolute inset-4 bg-white rounded-full"></div>
          </div>
          <div className="ml-8">
            <div className="flex items-center mb-3">
              <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-700">New Users (35%)</span>
            </div>
            <div className="flex items-center mb-3">
              <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-700">Returning (45%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-700">Inactive (20%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}