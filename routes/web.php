<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
Route::get('/dashboard/stats', [DashboardController::class, 'getStats'])->name('dashboard.stats');
Route::get('/dashboard/export', [DashboardController::class, 'exportData'])->name('dashboard.export');

// Jobs routes - using resourceful routing but include update route
Route::resource('jobs', JobController::class)->except(['show', 'edit', 'destroy']);

// Add custom route for status updates
Route::put('/jobs/{job}/status', [JobController::class, 'updateStatus'])->name('jobs.status.update');

// Reports routes
Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
Route::get('/reports/{id}', [ReportController::class, 'show'])->name('reports.show');

// If you want to define all routes manually:
/*
Route::get('/jobs', [JobController::class, 'index'])->name('jobs.index');
Route::get('/jobs/create', [JobController::class, 'create'])->name('jobs.create');
Route::post('/jobs', [JobController::class, 'store'])->name('jobs.store');
Route::put('/jobs/{job}', [JobController::class, 'update'])->name('jobs.update');
Route::put('/jobs/{job}/status', [JobController::class, 'updateStatus'])->name('jobs.status.update');
Route::delete('/jobs/{job}', [JobController::class, 'destroy'])->name('jobs.destroy');
*/