<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('tefa_programs') && !Schema::hasTable('tefa_category_programs')) {
            Schema::rename('tefa_programs', 'tefa_category_programs');
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('tefa_category_programs') && !Schema::hasTable('tefa_programs')) {
            Schema::rename('tefa_category_programs', 'tefa_programs');
        }
    }
};