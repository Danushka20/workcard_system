<?php

namespace App\Http\Controllers;

use App\Models\NewJob;
use App\Models\Material;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        // Get job statistics
        $totalJobs = NewJob::count();
        $pendingJobs = NewJob::where('status', 'pending')->count();
        $inProgressJobs = NewJob::where('status', 'in_progress')->count();
        $completedJobs = NewJob::where('status', 'completed')->count();
        $onHoldJobs = NewJob::where('status', 'on_hold')->count();

        // Get material statistics
        $totalMaterials = Material::count();

        // Get user statistics
        $activeUsers = User::count();

        $stats = [
            'total_jobs' => $totalJobs,
            'pending_jobs' => $pendingJobs,
            'in_progress_jobs' => $inProgressJobs,
            'completed_jobs' => $completedJobs,
            'on_hold_jobs' => $onHoldJobs,
            'total_materials' => $totalMaterials,
            'active_users' => $activeUsers,
        ];

        // Get recent activities
        $recentActivities = $this->getRecentActivities();

        return Inertia::render('Dashboard/Index', [
            'stats' => $stats,
            'recent_activities' => $recentActivities,
        ]);
    }

    private function getRecentActivities()
    {
        $activities = [];

        // Get recently created jobs
        $recentJobs = NewJob::orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        foreach ($recentJobs as $job) {
            $activities[] = [
                'id' => 'job_created_' . $job->id,
                'user' => 'System Admin',
                'user_id' => 1,
                'image' => 'https://ui-avatars.com/api/?name=System+Admin&background=0D8ABC&color=fff',
                'action' => 'Created new job: ' . ($job->name ?? 'Job #' . $job->ref_no),
                'type' => 'job_created',
                'job_ref' => $job->ref_no,
                'timestamp' => $job->created_at->toISOString(),
            ];
        }

        // Get recently updated jobs
        $updatedJobs = NewJob::where('updated_at', '>', Carbon::now()->subDays(7))
            ->where('updated_at', '!=', NewJob::raw('created_at'))
            ->orderBy('updated_at', 'desc')
            ->take(3)
            ->get();

        foreach ($updatedJobs as $job) {
            $action = 'Updated job status';
            $type = 'job_updated';
            
            if ($job->status === 'completed') {
                $action = 'Marked job as completed';
                $type = 'job_completed';
            }

            $activities[] = [
                'id' => 'job_updated_' . $job->id,
                'user' => 'Project Manager',
                'user_id' => 2,
                'image' => 'https://ui-avatars.com/api/?name=Project+Manager&background=6EE7B7&color=034D33',
                'action' => $action . ': ' . ($job->name ?? 'Job #' . $job->ref_no),
                'type' => $type,
                'job_ref' => $job->ref_no,
                'timestamp' => $job->updated_at->toISOString(),
            ];
        }

        // Add some materials activities
        $recentMaterials = Material::orderBy('created_at', 'desc')
            ->take(2)
            ->get();

        foreach ($recentMaterials as $material) {
            $activities[] = [
                'id' => 'material_added_' . $material->id,
                'user' => 'Materials Manager',
                'user_id' => 3,
                'image' => 'https://ui-avatars.com/api/?name=Materials+Manager&background=F59E0B&color=fff',
                'action' => 'Added material: ' . $material->description,
                'type' => 'material_added',
                'job_ref' => $material->item_code,
                'timestamp' => $material->created_at->toISOString(),
            ];
        }

        // Sort activities by timestamp (most recent first)
        usort($activities, function ($a, $b) {
            return strtotime($b['timestamp']) - strtotime($a['timestamp']);
        });

        // Return only the most recent 10 activities
        return array_slice($activities, 0, 10);
    }
}
