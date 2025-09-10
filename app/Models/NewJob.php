<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class NewJob extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'new_jobs';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'ref_no',
        'cost_center_no',
        'department',
        'details_of_job',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Available status values.
     *
     * @var array
     */
    public const STATUSES = [
        'pending' => 'Pending',
        'in_progress' => 'In Progress',
        'completed' => 'Completed',
    ];

    /**
     * Get the materials for the job.
     */
    public function materials(): HasMany
    {
        return $this->hasMany(Material::class, 'new_job_id');
    }

    /**
     * Find a job by reference number.
     *
     * @param string $refNo
     * @return \App\Models\NewJob|null
     */
    public static function findByRefNo(string $refNo): ?NewJob
    {
        return static::where('ref_no', $refNo)->first();
    }

    /**
     * Get jobs by department.
     *
     * @param string $department
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public static function getByDepartment(string $department)
    {
        return static::where('department', $department)->get();
    }

    /**
     * Get jobs by cost center.
     *
     * @param string $costCenterNo
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public static function getByCostCenter(string $costCenterNo)
    {
        return static::where('cost_center_no', $costCenterNo)->get();
    }

    /**
     * Get jobs by status.
     *
     * @param string $status
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public static function getByStatus(string $status)
    {
        return static::where('status', $status)->get();
    }

    /**
     * Scope a query to filter by department.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $department
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeDepartment($query, string $department)
    {
        return $query->where('department', $department);
    }

    /**
     * Scope a query to filter by cost center.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $costCenterNo
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCostCenter($query, string $costCenterNo)
    {
        return $query->where('cost_center_no', $costCenterNo);
    }

    /**
     * Scope a query to filter by status.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $status
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeStatus($query, string $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Scope a query to search in job details.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $searchTerm
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSearch($query, string $searchTerm)
    {
        return $query->where('details_of_job', 'like', "%{$searchTerm}%")
                    ->orWhere('ref_no', 'like', "%{$searchTerm}%")
                    ->orWhere('cost_center_no', 'like', "%{$searchTerm}%");
    }

    /**
     * Check if job is pending.
     *
     * @return bool
     */
    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    /**
     * Check if job is in progress.
     *
     * @return bool
     */
    public function isInProgress(): bool
    {
        return $this->status === 'in_progress';
    }

    /**
     * Check if job is completed.
     *
     * @return bool
     */
    public function isCompleted(): bool
    {
        return $this->status === 'completed';
    }

    /**
     * Mark job as pending.
     *
     * @return bool
     */
    public function markAsPending(): bool
    {
        return $this->update(['status' => 'pending']);
    }

    /**
     * Mark job as in progress.
     *
     * @return bool
     */
    public function markAsInProgress(): bool
    {
        return $this->update(['status' => 'in_progress']);
    }

    /**
     * Mark job as completed.
     *
     * @return bool
     */
    public function markAsCompleted(): bool
    {
        return $this->update(['status' => 'completed']);
    }

    /**
     * Get the human-readable status name.
     *
     * @return string
     */
    public function getStatusNameAttribute(): string
    {
        return self::STATUSES[$this->status] ?? $this->status;
    }

    /**
     * Get jobs that are not completed.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public static function getActiveJobs()
    {
        return static::where('status', '!=', 'completed')->get();
    }

    /**
     * Get jobs that are completed.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public static function getCompletedJobs()
    {
        return static::where('status', 'completed')->get();
    }
}