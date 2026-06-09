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
        Schema::create('hero_backgrounds', function (Blueprint $table) {
            $table->id();
            $table->longText('image_url');
            $table->string('title_id');
            $table->string('title_en')->nullable();
            $table->string('subtitle_id');
            $table->string('subtitle_en')->nullable();
            $table->text('description_id')->nullable();
            $table->text('description_en')->nullable();
            $table->string('category')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hero_backgrounds');
    }
};