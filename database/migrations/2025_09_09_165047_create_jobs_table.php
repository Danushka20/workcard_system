<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('new_jobs', function (Blueprint $table) {
            $table->id();
            $table->string('ref_no')->unique();
            $table->string('cost_center_no');
            $table->string('department');
            $table->text('details_of_job');
            $table->enum('status', ['pending', 'in_progress', 'on_hold', 'completed'])->default('pending');
            $table->timestamps();
            
            // Index for better performance
            $table->index('ref_no');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('new_jobs');
    }
};
