<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("ALTER TABLE teachers MODIFY division ENUM(
            'IT','Culinary','Visual Communication Design','Hospitality',
            'Accounting','general_subject','staff','Leadership'
        ) NOT NULL");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("ALTER TABLE teachers MODIFY division ENUM(
            'IT','Culinary','Visual Communication Design','Hospitality',
            'Accounting','general_subject','staff'
        ) NOT NULL");
    }
};