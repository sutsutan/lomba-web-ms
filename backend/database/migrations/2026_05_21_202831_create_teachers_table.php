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
        Schema::create('teachers', function (Blueprint $table) {
             $table->id();
            $table->string('name');
            $table->string('nip')->nullable()->unique();
            $table->enum('division', [
                'IT', 'Culinary', 'Visual Communication Design',
                'Hospitality', 'Accounting', 'general_subject', 'staff'
            ]);
            $table->string('role');
            $table->text('quote')->nullable();
            $table->string('competencies_tags')->nullable();
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
        Schema::dropIfExists('tachers');
    }
};
