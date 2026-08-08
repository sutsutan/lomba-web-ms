<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('explore_galleries', function (Blueprint $table) {
            $table->json('documentation_urls')->nullable()->after('documentation_url');
        });

        DB::table('explore_galleries')->whereNotNull('documentation_url')->get()->each(function ($row) {
            DB::table('explore_galleries')
                ->where('id', $row->id)
                ->update(['documentation_urls' => json_encode([$row->documentation_url])]);
        });
    }

    public function down(): void
    {
        Schema::table('explore_galleries', function (Blueprint $table) {
            $table->dropColumn('documentation_urls');
        });
    }
};