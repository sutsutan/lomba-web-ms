<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tefa_category_contents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('major_id')->unique()->constrained('majors')->cascadeOnDelete();
            $table->text('intro');
            $table->text('intro_id')->nullable();
            $table->text('detail');
            $table->text('detail_id')->nullable();
            $table->text('closing');
            $table->text('closing_id')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tefa_category_contents');
    }
};