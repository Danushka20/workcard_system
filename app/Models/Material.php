<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Material extends Model
{
    use HasFactory;

    protected $fillable = [
        'new_job_id',
        'item_code',
        'description',
        'quantity',
    ];

    public function job(): BelongsTo
    {
        return $this->belongsTo(NewJob::class, 'new_job_id');
    }
}