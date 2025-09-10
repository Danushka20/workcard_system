<?php

namespace App\Http\Controllers;

use App\Models\NewJob;
use App\Models\Material;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jobs = NewJob::with('materials')->get();
        
        return inertia('Jobs/Index', [
            'jobs' => $jobs
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Jobs/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse|RedirectResponse
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'ref_no' => 'required|string|max:100|unique:new_jobs,ref_no',
            'cost_center_no' => 'required|string|max:50',
            'department' => 'required|string|max:100',
            'details_of_job' => 'required|string',
            'status' => 'sometimes|string|in:pending,in_progress,completed,on_hold',
            'materials' => 'sometimes|array',
            'materials.*.item_code' => 'nullable|string|max:100',
            'materials.*.description' => 'required_with:materials|string',
            'materials.*.quantity' => 'required_with:materials|integer|min:1',
        ], [
            'ref_no.required' => 'Reference number is required.',
            'ref_no.unique' => 'This reference number already exists.',
            'cost_center_no.required' => 'Cost center number is required.',
            'department.required' => 'Department is required.',
            'details_of_job.required' => 'Job details are required.',
            'status.in' => 'Status must be one of: pending, in_progress, completed, on_hold.',
            'materials.*.description.required_with' => 'Material description is required.',
            'materials.*.quantity.required_with' => 'Material quantity is required.',
            'materials.*.quantity.min' => 'Material quantity must be at least 1.',
        ]);

        // If validation fails, return appropriate response
        if ($validator->fails()) {
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        try {
            DB::beginTransaction();

            // Create the new job
            $job = NewJob::create([
                'ref_no' => $request->ref_no,
                'cost_center_no' => $request->cost_center_no,
                'department' => $request->department,
                'details_of_job' => $request->details_of_job,
                'status' => $request->status ?? 'pending',
            ]);

            // Create materials if provided
            if ($request->has('materials') && is_array($request->materials)) {
                $materialsData = [];
                foreach ($request->materials as $material) {
                    if (!empty($material['description'])) {
                        $materialsData[] = new Material([
                            'item_code' => $material['item_code'] ?? null,
                            'description' => $material['description'],
                            'quantity' => $material['quantity'],
                        ]);
                    }
                }
                
                if (!empty($materialsData)) {
                    $job->materials()->saveMany($materialsData);
                }
            }

            DB::commit();

            // Load materials for response
            $job->load('materials');

            // Prepare success response
            $responseData = [
                'success' => true,
                'message' => 'Job created successfully!',
                'data' => $job
            ];

            if ($request->expectsJson()) {
                return response()->json($responseData, 201);
            }

            return redirect()->route('jobs.show', $job->id)
                ->with('success', 'Job created successfully!');

        } catch (\Exception $e) {
            DB::rollBack();

            Log::error('Job creation failed: ' . $e->getMessage(), [
                'exception' => $e,
                'request_data' => $request->all()
            ]);

            $errorMessage = 'Failed to create job. Please try again.';

            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => $errorMessage,
                    'error' => config('app.debug') ? $e->getMessage() : null
                ], 500);
            }

            return redirect()->back()
                ->with('error', $errorMessage)
                ->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(NewJob $job)
    {
        $job->load('materials');
        
        return inertia('Jobs/Show', [
            'job' => $job
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(NewJob $job)
    {
        $job->load('materials');
        
        return inertia('Jobs/Edit', [
            'job' => $job
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, NewJob $job)
    {
        // Validate the request data (similar to store but with unique ignore)
        $validator = Validator::make($request->all(), [
            'ref_no' => 'required|string|max:100|unique:new_jobs,ref_no,' . $job->id,
            'cost_center_no' => 'required|string|max:50',
            'department' => 'required|string|max:100',
            'details_of_job' => 'required|string',
            'status' => 'sometimes|string|in:pending,in_progress,completed,on_hold',
            'materials' => 'sometimes|array',
            'materials.*.id' => 'sometimes|integer|exists:materials,id',
            'materials.*.item_code' => 'nullable|string|max:100',
            'materials.*.description' => 'required_with:materials|string',
            'materials.*.quantity' => 'required_with:materials|integer|min:1',
        ], [
            'ref_no.required' => 'Reference number is required.',
            'ref_no.unique' => 'This reference number already exists.',
            'cost_center_no.required' => 'Cost center number is required.',
            'department.required' => 'Department is required.',
            'details_of_job.required' => 'Job details are required.',
            'status.in' => 'Status must be one of: pending, in_progress, completed, on_hold.',
            'materials.*.description.required_with' => 'Material description is required.',
            'materials.*.quantity.required_with' => 'Material quantity is required.',
            'materials.*.quantity.min' => 'Material quantity must be at least 1.',
        ]);

        if ($validator->fails()) {
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        try {
            DB::beginTransaction();

            // Update the job
            $job->update([
                'ref_no' => $request->ref_no,
                'cost_center_no' => $request->cost_center_no,
                'department' => $request->department,
                'details_of_job' => $request->details_of_job,
                'status' => $request->status ?? $job->status,
            ]);

            // Handle materials update
            if ($request->has('materials')) {
                $existingMaterialIds = [];
                
                foreach ($request->materials as $materialData) {
                    if (isset($materialData['id'])) {
                        // Update existing material
                        $material = Material::where('id', $materialData['id'])
                                            ->where('new_job_id', $job->id)
                                            ->first();
                        
                        if ($material) {
                            $material->update([
                                'item_code' => $materialData['item_code'] ?? null,
                                'description' => $materialData['description'],
                                'quantity' => $materialData['quantity'],
                            ]);
                            $existingMaterialIds[] = $material->id;
                        }
                    } else {
                        // Create new material
                        if (!empty($materialData['description'])) {
                            $material = $job->materials()->create([
                                'item_code' => $materialData['item_code'] ?? null,
                                'description' => $materialData['description'],
                                'quantity' => $materialData['quantity'],
                            ]);
                            $existingMaterialIds[] = $material->id;
                        }
                    }
                }
                
                // Delete materials that were removed
                $job->materials()->whereNotIn('id', $existingMaterialIds)->delete();
            }

            DB::commit();

            // Load materials for response
            $job->load('materials');

            // Prepare success response
            $responseData = [
                'success' => true,
                'message' => 'Job updated successfully!',
                'data' => $job
            ];

            if ($request->expectsJson()) {
                return response()->json($responseData, 200);
            }

            return redirect()->route('jobs.show', $job->id)
                ->with('success', 'Job updated successfully!');

        } catch (\Exception $e) {
            DB::rollBack();

            Log::error('Job update failed: ' . $e->getMessage(), [
                'exception' => $e,
                'request_data' => $request->all()
            ]);

            $errorMessage = 'Failed to update job. Please try again.';

            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => $errorMessage,
                    'error' => config('app.debug') ? $e->getMessage() : null
                ], 500);
            }

            return redirect()->back()
                ->with('error', $errorMessage)
                ->withInput();
        }
    }

    /**
     * Update job status
     */
    public function updateStatus(Request $request, NewJob $job)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|string|in:pending,in_progress,completed,on_hold',
        ]);

        if ($validator->fails()) {
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        try {
            $job->update([
                'status' => $request->status,
            ]);

            $job->load('materials');

            $responseData = [
                'success' => true,
                'message' => 'Job status updated successfully!',
                'data' => $job
            ];

            if ($request->expectsJson()) {
                return response()->json($responseData, 200);
            }

            return redirect()->back()
                ->with('success', 'Job status updated successfully!');

        } catch (\Exception $e) {
            Log::error('Job status update failed: ' . $e->getMessage());

            $errorMessage = 'Failed to update job status. Please try again.';

            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => $errorMessage,
                    'error' => config('app.debug') ? $e->getMessage() : null
                ], 500);
            }

            return redirect()->back()
                ->with('error', $errorMessage);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(NewJob $job)
    {
        try {
            DB::beginTransaction();
            
            // Delete associated materials first
            $job->materials()->delete();
            
            // Then delete the job
            $job->delete();
            
            DB::commit();
            
            if (request()->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Job deleted successfully!'
                ]);
            }

            return redirect()->route('jobs.index')
                ->with('success', 'Job deleted successfully!');
                
        } catch (\Exception $e) {
            DB::rollBack();
            
            Log::error('Job deletion failed: ' . $e->getMessage());

            if (request()->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to delete job.'
                ], 500);
            }

            return redirect()->back()
                ->with('error', 'Failed to delete job.');
        }
    }
}