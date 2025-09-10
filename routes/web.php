<?php

use App\Http\Controllers\JobController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Jobs routes - using resourceful routing but include update route
Route::resource('jobs', JobController::class)->except(['show', 'edit', 'destroy']);

// Add custom route for status updates
Route::put('/jobs/{job}/status', [JobController::class, 'updateStatus'])->name('jobs.status.update');

// If you want to define all routes manually:
/*
Route::get('/jobs', [JobController::class, 'index'])->name('jobs.index');
Route::get('/jobs/create', [JobController::class, 'create'])->name('jobs.create');
Route::post('/jobs', [JobController::class, 'store'])->name('jobs.store');
Route::put('/jobs/{job}', [JobController::class, 'update'])->name('jobs.update');
Route::put('/jobs/{job}/status', [JobController::class, 'updateStatus'])->name('jobs.status.update');
Route::delete('/jobs/{job}', [JobController::class, 'destroy'])->name('jobs.destroy');
*/