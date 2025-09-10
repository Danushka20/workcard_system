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
        Schema::create('materials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('new_job_id')->constrained('new_jobs')->onDelete('cascade');
            $table->string('item_code')->nullable();
            $table->text('description');
            $table->integer('quantity')->default(1);
            $table->timestamps();
            
            // Index for better performance
            $table->index('new_job_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('materials');
    }
};