<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('activity_galleries', function (Blueprint $table) {
            $table->json('images')->nullable()->after('image_url');
        });

        DB::table('activity_galleries')->whereNotNull('image_url')->get()->each(function ($row) {
            DB::table('activity_galleries')
                ->where('id', $row->id)
                ->update(['images' => json_encode([$row->image_url])]);
        });
    }

    public function down(): void
    {
        Schema::table('activity_galleries', function (Blueprint $table) {
            $table->dropColumn('images');
        });
    }
};