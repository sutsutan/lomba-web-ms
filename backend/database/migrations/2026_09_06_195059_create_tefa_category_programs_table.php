<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tefa_programs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('major_id')->constrained('majors')->cascadeOnDelete();
            $table->unsignedTinyInteger('program_order')->default(1); // 1, 2, atau 3
            $table->string('title');
            $table->string('title_id')->nullable();
            $table->text('description');
            $table->text('description_id')->nullable();
            $table->timestamps();

            $table->unique(['major_id', 'program_order']); // maksimal 3 slot per jurusan
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tefa_programs');
    }
};