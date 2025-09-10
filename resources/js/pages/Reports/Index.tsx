// resources/js/Pages/Reports/Index.tsx
import DashboardLayout from '@/Layouts/DashboardLayout';
import { ReactNode } from 'react';

interface Report {
  id: number;
  title: string;
  created_at: string;
  summary: string;
}

interface Props {
  reports: Report[];
}

const ReportsPage = ({ reports = [] }: Props) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.length > 0 ? (
          reports.map((r) => (
            <div key={r.id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-800">{r.title}</h2>
              <p className="text-sm text-gray-500 mb-3">{new Date(r.created_at).toLocaleString()}</p>
              <p className="text-gray-700">{r.summary}</p>
            </div>
          ))
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-medium text-gray-700 mb-2">No reports yet</h3>
            <p className="text-gray-500">Create a new report to show data here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

ReportsPage.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default ReportsPage;
