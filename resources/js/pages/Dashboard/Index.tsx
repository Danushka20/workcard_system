// resources/js/Pages/Dashboard/Index.tsx
import DashboardLayout from '@/Layouts/DashboardLayout';
import JobStatusChart from '@/Components/Dashboard/JobStatusChart';
import JobStatusBarChart from '@/Components/Dashboard/JobStatusBarChart';
import { ReactNode } from 'react';

interface DashboardStats {
  total_jobs: number;
  pending_jobs: number;
  in_progress_jobs: number;
  completed_jobs: number;
  on_hold_jobs: number;
  total_materials: number;
  active_users: number;
}

interface Props {
  stats: DashboardStats;
}

const DashboardPage = ({ stats }: Props) => {
  // Default stats if not provided
  const dashboardStats = stats || {
    total_jobs: 25,
    pending_jobs: 8,
    in_progress_jobs: 12,
    completed_jobs: 5,
    on_hold_jobs: 0,
    total_materials: 156,
    active_users: 4
  };

  const statCards = [
    {
      title: 'Total Jobs',
      value: dashboardStats.total_jobs,
      icon: 'fas fa-briefcase',
      color: 'blue',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Pending Jobs',
      value: dashboardStats.pending_jobs,
      icon: 'fas fa-clock',
      color: 'yellow',
      change: '+3',
      changeType: 'neutral'
    },
    {
      title: 'In Progress',
      value: dashboardStats.in_progress_jobs,
      icon: 'fas fa-spinner',
      color: 'blue',
      change: '+5',
      changeType: 'positive'
    },
    {
      title: 'Completed',
      value: dashboardStats.completed_jobs,
      icon: 'fas fa-check-circle',
      color: 'green',
      change: '+2',
      changeType: 'positive'
    },
    {
      title: 'Materials',
      value: dashboardStats.total_materials,
      icon: 'fas fa-boxes',
      color: 'purple',
      change: '+18',
      changeType: 'positive'
    },
    {
      title: 'Active Users',
      value: dashboardStats.active_users,
      icon: 'fas fa-users',
      color: 'indigo',
      change: '0',
      changeType: 'neutral'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-500 text-white',
      yellow: 'bg-yellow-500 text-white',
      green: 'bg-green-500 text-white',
      purple: 'bg-purple-500 text-white',
      indigo: 'bg-indigo-500 text-white',
      red: 'bg-red-500 text-white'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-500 text-white';
  };

  const getChangeColorClass = (type: string) => {
    const typeMap = {
      positive: 'text-green-600',
      negative: 'text-red-600',
      neutral: 'text-gray-600'
    };
    return typeMap[type as keyof typeof typeMap] || 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to Work Card Management System</p>
        </div>
        <div className="flex items-center gap-3">
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.slice(0, 4).map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md border p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg ${getColorClasses(card.color)} flex items-center justify-center`}>
                <i className={card.icon}></i>
              </div>
              <span className={`text-sm font-medium ${getChangeColorClass(card.changeType)}`}>
                {card.change}
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              <p className="text-sm text-gray-600">{card.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Job Status Pie Chart */}
        <JobStatusChart 
          stats={{
            pending: dashboardStats.pending_jobs,
            in_progress: dashboardStats.in_progress_jobs,
            completed: dashboardStats.completed_jobs,
            on_hold: dashboardStats.on_hold_jobs,
          }}
        />

        {/* Job Status Bar Chart */}
        <JobStatusBarChart 
          stats={{
            pending: dashboardStats.pending_jobs,
            in_progress: dashboardStats.in_progress_jobs,
            completed: dashboardStats.completed_jobs,
            on_hold: dashboardStats.on_hold_jobs,
          }}
        />
      </div>
    </div>
  );
};

DashboardPage.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default DashboardPage;
