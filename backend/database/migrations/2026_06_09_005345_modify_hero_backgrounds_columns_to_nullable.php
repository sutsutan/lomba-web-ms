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
        Schema::table('hero_backgrounds', function (Blueprint $table) {
            if (Schema::hasColumn('hero_backgrounds', 'title_id')) $table->string('title_id')->nullable()->change();
            if (Schema::hasColumn('hero_backgrounds', 'title_en')) $table->string('title_en')->nullable()->change();
            if (Schema::hasColumn('hero_backgrounds', 'subtitle_id')) $table->string('subtitle_id')->nullable()->change();
            if (Schema::hasColumn('hero_backgrounds', 'subtitle_en')) $table->string('subtitle_en')->nullable()->change();
            if (Schema::hasColumn('hero_backgrounds', 'description_id')) $table->text('description_id')->nullable()->change();
            if (Schema::hasColumn('hero_backgrounds', 'description_en')) $table->text('description_en')->nullable()->change();
            if (Schema::hasColumn('hero_backgrounds', 'order')) $table->integer('order')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('nullable', function (Blueprint $table) {
            //
        });
    }
};
