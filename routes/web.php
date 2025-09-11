<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Dashboard Routes
Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
Route::get('/dashboard/stats', [DashboardController::class, 'getStats'])->name('dashboard.stats');
Route::get('/dashboard/export', [DashboardController::class, 'exportData'])->name('dashboard.export');

// Test route to check if routing works
Route::get('/test', function () {
    return response()->json(['message' => 'Routes are working!']);
});

// Jobs Routes
Route::group(['prefix' => 'jobs'], function () {
    Route::get('/', [JobController::class, 'index'])->name('jobs.index');
    Route::get('/create', [JobController::class, 'create'])->name('jobs.create');
    Route::post('/', [JobController::class, 'store'])->name('jobs.store');
    Route::get('/{job}', [JobController::class, 'show'])->name('jobs.show');
    Route::get('/{job}/edit', [JobController::class, 'edit'])->name('jobs.edit');
    Route::put('/{job}', [JobController::class, 'update'])->name('jobs.update');
    Route::delete('/{job}', [JobController::class, 'destroy'])->name('jobs.destroy');
    Route::put('/{job}/status', [JobController::class, 'updateStatus'])->name('jobs.status.update');
});

// Reports Routes
Route::group(['prefix' => 'reports'], function () {
    Route::get('/', [ReportController::class, 'index'])->name('reports.index');
    Route::get('/{id}', [ReportController::class, 'show'])->name('reports.show');
});