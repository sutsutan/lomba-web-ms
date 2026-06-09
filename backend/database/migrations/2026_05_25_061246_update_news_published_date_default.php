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
            $table->string('slug')->unique();
            $table->string('title_id');
            $table->string('title_en');
            $table->text('excerpt_id');
            $table->text('excerpt_en');
            $table->string('category')->nullable();
            $table->longText('content_id');
            $table->longText('content_en');
            $table->foreignId('user_id');
            $table->string('thumbnail')->nullable();
            $table->date('published_date');
            $table->boolean('is_published')->default(false);
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