<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement("ALTER TABLE teachers MODIFY COLUMN division ENUM(
            'principal',
            'vice_principal',
            'IT',
            'Culinary',
            'Visual Communication Design',
            'Hospitality',
            'Accounting',
            'general_subject',
            'staff'
        ) NOT NULL");
    }

    public function down(): void
    {
        DB::statement("ALTER TABLE teachers MODIFY COLUMN division ENUM(
            'IT',
            'Culinary',
            'Visual Communication Design',
            'Hospitality',
            'Accounting',
            'general_subject',
            'staff'
        ) NOT NULL");
    }
};