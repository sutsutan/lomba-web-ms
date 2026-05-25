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
        Schema::create('extracurriculars', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('category', ['Sports', 'Arts', 'Specialized']);
            $table->string('coach_name')->nullable();
            $table->text('description')->nullable();
            $table->string('schedule')->nullable();
            $table->string('intensity')->nullable();
            $table->text('track_record')->nullable();
            $table->string('registration_link')->nullable();
            $table->string('image_url')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('extracurriculars');
    }
};
