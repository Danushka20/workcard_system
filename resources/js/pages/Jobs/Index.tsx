// resources/js/Pages/Jobs/Index.tsx
import DashboardLayout from '@/Layouts/DashboardLayout';
import JobCard from '@/Components/Jobs/JobCard';
import { ReactNode, useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

interface Material {
  id: number;
  item_code: string;
  description: string;
  quantity: number;
}

interface Job {
  id: number;
  name: string;
  ref_no: string;
  department: string;
  status: 'pending' | 'in_progress' | 'completed' | 'on_hold';
  created_at: string;
  details_of_job: string;
  materials: Material[];
}

interface Props {
  jobs: Job[];
}

const JobsPage = ({ jobs: initialJobs }: Props) => {
  // Sort jobs by creation date (newest first) and use as initial state
  const sortedJobs = initialJobs.sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  const [jobs, setJobs] = useState<Job[]>(sortedJobs);
  
  // Track newly added jobs (jobs added after initial load)
  const [newlyAddedJobs, setNewlyAddedJobs] = useState<Set<number>>(new Set());
  
  // Check if we just returned from creating a job and mark the newest as "NEW"
  useEffect(() => {
    // Check if there's a new job indicator in the URL or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const newJobId = urlParams.get('newJob');
    
    if (newJobId && jobs.length > 0) {
      const jobId = parseInt(newJobId);
      setNewlyAddedJobs(prev => new Set(prev).add(jobId));
      
      // Remove the parameter from URL
      window.history.replaceState({}, '', window.location.pathname);
      
      // Auto-remove the "NEW" badge after 10 seconds
      setTimeout(() => {
        setNewlyAddedJobs(prev => {
          const updated = new Set(prev);
          updated.delete(jobId);
          return updated;
        });
      }, 10000);
    }
  }, [jobs]);
  
  // Function to manually mark a job as newly added (for testing or other scenarios)
  const markJobAsNew = (jobId: number) => {
    setNewlyAddedJobs(prev => new Set(prev).add(jobId));
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
      setNewlyAddedJobs(prev => {
        const updated = new Set(prev);
        updated.delete(jobId);
        return updated;
      });
    }, 10000);
  };

  const handleHoldJob = (jobId: number) => {
    console.log(`Holding job with ID: ${jobId}`);
    
    // Make an API request to update the job status using Inertia
    router.put(`/jobs/${jobId}/status`, {
      status: 'on_hold'
    }, {
      onSuccess: () => {
        // Update local state and maintain newest-first sorting
        const updatedJobs = jobs.map(job => 
          job.id === jobId ? { ...job, status: 'on_hold' as const } : job
        ).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        setJobs(updatedJobs);
        alert(`Job ${jobId} put on hold!`);
      },
      onError: (errors) => {
        console.error('Failed to update job status:', errors);
        alert('Failed to update job status. Please try again.');
      }
    });
  };

  const handleCompleteJob = (jobId: number) => {
    console.log(`Completing job with ID: ${jobId}`);
    
    // Make an API request to update the job status using Inertia
    router.put(`/jobs/${jobId}/status`, {
      status: 'completed'
    }, {
      onSuccess: () => {
        // Update local state and maintain newest-first sorting
        const updatedJobs = jobs.map(job => 
          job.id === jobId ? { ...job, status: 'completed' as const } : job
        ).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        setJobs(updatedJobs);
        alert(`Job ${jobId} marked as completed!`);
      },
      onError: (errors) => {
        console.error('Failed to update job status:', errors);
        alert('Failed to update job status. Please try again.');
      }
    });
  };

  const handleStartJob = (jobId: number) => {
    console.log(`Starting job with ID: ${jobId}`);
    
    // Make an API request to update the job status using Inertia
    router.put(`/jobs/${jobId}/status`, {
      status: 'in_progress'
    }, {
      onSuccess: () => {
        // Update local state and maintain newest-first sorting
        const updatedJobs = jobs.map(job => 
          job.id === jobId ? { ...job, status: 'in_progress' as const } : job
        ).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        setJobs(updatedJobs);
        alert(`Job ${jobId} started!`);
      },
      onError: (errors) => {
        console.error('Failed to update job status:', errors);
        alert('Failed to update job status. Please try again.');
      }
    });
  };

  const handleViewDetails = (jobId: number) => {
    console.log(`Viewing details for job with ID: ${jobId}`);
    // Navigate to job details page using Inertia
    router.visit(`/jobs/${jobId}`);
  };

  // Filter options with maintained sorting
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredJobs = statusFilter === 'all' 
    ? jobs 
    : jobs.filter(job => job.status === statusFilter);
    
  // Keep the filtered jobs sorted by creation date (newest first)
  const sortedFilteredJobs = filteredJobs.sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Job Management</h1>
          <p className="text-sm text-gray-600 mt-1">
            Jobs are sorted by creation date (newest first) • 
            <span className="inline-flex items-center ml-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-1 animate-pulse"></span>
              Recent jobs are highlighted
            </span>
          </p>
        </div>
        <button
          onClick={() => router.visit('/jobs/create')}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Job
        </button>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-700">Filter Jobs</h2>
          {/* Development/Testing: Uncomment to test NEW badge functionality */}
          {/* {process.env.NODE_ENV === 'development' && (
            <button
              onClick={() => sortedFilteredJobs.length > 0 && markJobAsNew(sortedFilteredJobs[0].id)}
              className="px-2 py-1 bg-orange-500 text-white text-xs rounded hover:bg-orange-600"
              title="Test: Mark first job as NEW"
            >
              Test NEW Badge
            </button>
          )} */}
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1 rounded-md text-sm ${
              statusFilter === 'all' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Jobs
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-3 py-1 rounded-md text-sm flex items-center ${
              statusFilter === 'pending' 
                ? 'bg-yellow-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></span>
            Pending
          </button>
          <button
            onClick={() => setStatusFilter('in_progress')}
            className={`px-3 py-1 rounded-md text-sm flex items-center ${
              statusFilter === 'in_progress' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
            In Progress
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-3 py-1 rounded-md text-sm flex items-center ${
              statusFilter === 'completed' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
            Completed
          </button>
          <button
            onClick={() => setStatusFilter('on_hold')}
            className={`px-3 py-1 rounded-md text-sm flex items-center ${
              statusFilter === 'on_hold' 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
            On Hold
          </button>
        </div>
      </div>

      {/* Job Count Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
          <h3 className="text-lg font-semibold text-gray-700">Pending</h3>
          <p className="text-2xl font-bold">{jobs.filter(job => job.status === 'pending').length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-gray-700">In Progress</h3>
          <p className="text-2xl font-bold">{jobs.filter(job => job.status === 'in_progress').length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-lg font-semibold text-gray-700">Completed</h3>
          <p className="text-2xl font-bold">{jobs.filter(job => job.status === 'completed').length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
          <h3 className="text-lg font-semibold text-gray-700">On Hold</h3>
          <p className="text-2xl font-bold">{jobs.filter(job => job.status === 'on_hold').length}</p>
        </div>
      </div>
      
      {/* Grid of Job Cards */}
      {sortedFilteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedFilteredJobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              name={job.name || job.ref_no} // Use ref_no if name is not available
              refNo={job.ref_no}
              department={job.department}
              status={job.status}
              createdAt={job.created_at}
              isNewlyAdded={newlyAddedJobs.has(job.id)} // Only show NEW badge for truly new jobs
              onHold={handleHoldJob}
              onComplete={handleCompleteJob}
              onStart={handleStartJob}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-700 mb-2">No jobs found</h3>
          <p className="text-gray-500">There are no jobs matching your current filter criteria.</p>
        </div>
      )}
    </div>
  );
};

// Wrap the page with the DashboardLayout
JobsPage.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default JobsPage;