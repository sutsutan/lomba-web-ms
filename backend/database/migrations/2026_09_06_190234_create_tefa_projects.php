<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tefa_projects', function (Blueprint $table) {
            $table->id();
            $table->string('image_url');
            $table->string('student_name');
            $table->string('class')->default('General');
            $table->string('title');
            $table->string('title_id')->nullable();
            $table->text('description');
            $table->text('description_id')->nullable();
            $table->foreignId('major_id')->constrained('majors')->cascadeOnDelete();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tefa_projects');
    }
};