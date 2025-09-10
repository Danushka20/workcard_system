import { Head } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import StatCard from '@/Components/Dashboard/StatCard';
import ChartsSection from '@/Components/Dashboard/ChartsSection';
import RecentActivity from '@/Components/Dashboard/RecentActivity';
import { Users, DollarSign, ShoppingCart, TrendingUp, BarChart3, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface DashboardProps {
  // Add any props you might receive from Laravel backend
  stats?: {
    overdue: number;
    inProgress: number;
    completed: number;
    total: number;
    totalUsers?: number;
    totalRevenue?: number;
    totalOrders?: number;
    growthRate?: number;
  };
}

export default function Dashboard({ stats = {
    total: 0,
    overdue: 0,
    inProgress: 0,
    completed: 0
} }: DashboardProps) {
  const { totalUsers = 1245, totalRevenue = 45678, totalOrders = 324, growthRate = 12 } = stats;

  return (
    <DashboardLayout>
      <Head title="Dashboard">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
      </Head>
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-gray-500">Welcome to your Laravel React admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Jobs"
          value={stats.total}
          icon={BarChart3}
          color="blue"
          trend={{ value: 12, direction: 'up' }}
        />
        <StatCard
          title="Completed"
          value={stats.completed}
          icon={CheckCircle}
          color="green"
          trend={{ value: 8, direction: 'up' }}
        />
        <StatCard
          title="In Progress"
          value={stats.inProgress}
          icon={Clock}
          color="indigo"
        />
        <StatCard
          title="Overdue"
          value={stats.overdue}
          icon={AlertTriangle}
          color="red"
          trend={{ value: 3, direction: 'down' }}
        />
      </div>
      <ChartsSection />
      <RecentActivity />
    </DashboardLayout>
  );
}