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
    Schema::create('about_pages', function (Blueprint $table) {
        $table->id();
        $table->string('know_us_title')->nullable();
        $table->text('know_us_desc1')->nullable();
        $table->text('know_us_desc2')->nullable();
        $table->string('know_us_summary', 300)->nullable();
        $table->string('know_us_image1')->nullable();
        $table->string('know_us_image2')->nullable();
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('about_pages');
    }
};
