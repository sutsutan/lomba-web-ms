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
      // Di dalam file migrasi (method up)
Schema::create('organizations', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->enum('category', ['leadership', 'creative', 'discipline', 'wellness']);
    $table->string('leader_name')->nullable();
    $table->string('advisor_name')->nullable();
    $table->text('description_id')->nullable();
    $table->text('description_en')->nullable();
    $table->longText('logo_url'); 
    $table->boolean('is_active')->default(true);
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('organizations');
    }
};