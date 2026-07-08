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
        Schema::table('organizations', function (Blueprint $table) {
            if (!Schema::hasColumn('organizations', 'leader_name')) {
                $table->string('leader_name')->nullable()->after('category');
            }
            if (!Schema::hasColumn('organizations', 'advisor_name')) {
                $table->string('advisor_name')->nullable()->after('leader_name');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('organizations', function (Blueprint $table) {
            $table->dropColumn(['leader_name', 'advisor_name']);
        });
    }
};
