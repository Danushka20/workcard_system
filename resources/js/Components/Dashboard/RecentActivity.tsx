// resources/js/Components/Dashboard/RecentActivity.tsx
interface ActivityItem {
  user: string;
  image: string;
  action: string;
  time: string;
}

export default function RecentActivity() {
  const activities: ActivityItem[] = [
    { 
      user: 'John Doe', 
      image: 'https://randomuser.me/api/portraits/men/1.jpg', 
      action: 'Placed new order', 
      time: '2 minutes ago' 
    },
    { 
      user: 'Sarah Smith', 
      image: 'https://randomuser.me/api/portraits/women/2.jpg', 
      action: 'Updated profile', 
      time: '10 minutes ago' 
    },
    { 
      user: 'Robert Johnson', 
      image: 'https://randomuser.me/api/portraits/men/3.jpg', 
      action: 'Completed payment', 
      time: '15 minutes ago' 
    },
    { 
      user: 'Emma Wilson', 
      image: 'https://randomuser.me/api/portraits/women/4.jpg', 
      action: 'Submitted ticket', 
      time: '25 minutes ago' 
    },
    { 
      user: 'Michael Brown', 
      image: 'https://randomuser.me/api/portraits/men/5.jpg', 
      action: 'Wrote review', 
      time: '45 minutes ago' 
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold mb-4 text-gray-800">Recent Activity</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <img 
                      src={activity.image} 
                      alt={activity.user} 
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="text-gray-700">{activity.user}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-700">{activity.action}</td>
                <td className="py-3 px-4 text-gray-500">{activity.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}