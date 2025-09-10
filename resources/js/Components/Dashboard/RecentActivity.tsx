// resources/js/Components/Dashboard/RecentActivity.tsx
interface ActivityItem {
  id?: number;
  user: string;
  user_id?: number;
  image?: string;
  action: string;
  type: 'job_created' | 'job_updated' | 'job_completed' | 'material_added' | 'system' | 'user_login';
  job_ref?: string;
  timestamp: string; // ISO string
}

interface Props {
  activities?: ActivityItem[];
}

// Simple relative time formatter
function timeAgo(iso: string) {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const sec = Math.floor((now - then) / 1000);
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const days = Math.floor(hr / 24);
  return `${days}d ago`;
}

// Get activity icon and color based on type
function getActivityIcon(type: ActivityItem['type']) {
  const iconMap = {
    job_created: { icon: 'fas fa-plus-circle', color: 'text-green-500' },
    job_updated: { icon: 'fas fa-edit', color: 'text-blue-500' },
    job_completed: { icon: 'fas fa-check-circle', color: 'text-green-600' },
    material_added: { icon: 'fas fa-boxes', color: 'text-orange-500' },
    system: { icon: 'fas fa-cog', color: 'text-gray-500' },
    user_login: { icon: 'fas fa-sign-in-alt', color: 'text-purple-500' },
  };
  return iconMap[type] || { icon: 'fas fa-circle', color: 'text-gray-400' };
}



const defaultActivities: ActivityItem[] = [
  { 
    id: 1,
    user: 'A. Fernando', 
    user_id: 1,
    image: 'https://ui-avatars.com/api/?name=A.+Fernando&background=0D8ABC&color=fff', 
    action: 'Created new job for Kitchen Renovation', 
    type: 'job_created',
    job_ref: 'WC-1023',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() 
  },
  { 
    id: 2,
    user: 'S. Perera', 
    user_id: 2,
    image: 'https://ui-avatars.com/api/?name=S.+Perera&background=6EE7B7&color=034D33', 
    action: 'Added 5x Portland Cement to materials list', 
    type: 'material_added',
    job_ref: 'WC-1023',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() 
  },
  { 
    id: 3,
    user: 'M. Silva', 
    user_id: 3,
    image: 'https://ui-avatars.com/api/?name=M.+Silva&background=F59E0B&color=fff', 
    action: 'Marked Bathroom Tiling project as completed', 
    type: 'job_completed',
    job_ref: 'WC-1019',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() 
  },
  { 
    id: 4,
    user: 'R. Jayawardena', 
    user_id: 4,
    image: 'https://ui-avatars.com/api/?name=R.+Jayawardena&background=8B5CF6&color=fff', 
    action: 'Updated job status to In Progress', 
    type: 'job_updated',
    job_ref: 'WC-1021',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString() 
  },
  { 
    id: 5,
    user: 'System', 
    action: 'Daily backup completed successfully', 
    type: 'system',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() 
  },
];

export default function RecentActivity({ activities = defaultActivities }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <i className="fas fa-history text-blue-500"></i>
          <h3 className="text-lg font-bold text-gray-800">Recent Activity</h3>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors">
          View all
        </button>
      </div>

      <div className="space-y-4">
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <i className="fas fa-clock text-gray-300 text-3xl mb-3"></i>
            <p className="text-gray-500">No recent activity</p>
          </div>
        ) : (
          activities.map((activity) => {
            const { icon, color } = getActivityIcon(activity.type);
            return (
              <div key={activity.id || Math.random()} className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={activity.image ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(activity.user)}&background=CBD5E1&color=111827`}
                      alt={activity.user}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white flex items-center justify-center shadow-sm`}>
                      <i className={`${icon} ${color} text-xs`}></i>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">{activity.user}</span>
                    {activity.job_ref && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                        {activity.job_ref}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm mb-2">{activity.action}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <i className="fas fa-clock"></i>
                    <span>{timeAgo(activity.timestamp)}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      
      {activities.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
            Load more activities
          </button>
        </div>
      )}
    </div>
  );
}
