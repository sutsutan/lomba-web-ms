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
       Schema::create('news', function (Blueprint $table) {
        $table->id();
        // Bahasa Indonesia
        $table->string('title_id');
        $table->text('excerpt_id');
        $table->text('content_id');
        
        // English
        $table->string('title_en');
        $table->text('excerpt_en');
        $table->text('content_en');

        $table->string('slug')->unique();
        $table->string('category');
        $table->string('thumbnail')->nullable();
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
