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
        Schema::create('alumnis', function (Blueprint $table) {
             $table->id();
            $table->string('name');
            $table->string('role')->nullable();
            $table->string('tags')->nullable(); //
            $table->text('testimony')->nullable();
            $table->decimal('latitude', 10, 7)->nullable();  // untuk smart globe
            $table->decimal('longitude', 10, 7)->nullable();
            $table->string('location_name')->nullable();
            $table->year('grad_year');
            $table->foreignId('major_id')->nullable()->constrained()->nullOnDelete();
            $table->string('profile_picture')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alumnis');
    }
};
