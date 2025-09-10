<?php

namespace App\Http\Controllers;

use App\Models\NewJob;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        // Sample reports data - you can expand this based on your needs
        $reports = [
            [
                'id' => 1,
                'title' => 'Monthly Job Summary',
                'created_at' => now()->subDays(5)->toISOString(),
                'summary' => 'Overview of all jobs completed this month with material usage and costs.',
            ],
            [
                'id' => 2,
                'title' => 'Material Usage Report',
                'created_at' => now()->subWeek()->toISOString(),
                'summary' => 'Detailed breakdown of materials used across all active projects.',
            ],
            [
                'id' => 3,
                'title' => 'Department Performance',
                'created_at' => now()->subWeeks(2)->toISOString(),
                'summary' => 'Performance metrics for different departments and completion rates.',
            ],
        ];

        return Inertia::render('Reports/Index', [
            'reports' => $reports,
        ]);
    }

    public function show($id)
    {
        // Individual report view
        return Inertia::render('Reports/Show', [
            'report' => [
                'id' => $id,
                'title' => 'Sample Report',
                'data' => [],
            ]
        ]);
    }
}
