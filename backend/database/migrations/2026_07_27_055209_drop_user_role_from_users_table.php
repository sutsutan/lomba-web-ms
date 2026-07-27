<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('users')->where('role', 'user')->update(['role' => 'marketing']);

        DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('admin','marketing') NOT NULL DEFAULT 'marketing'");

        DB::table('users')->update([
            'internal_type' => 'none',
            'identity_number' => null,
            'is_approved' => true,
        ]);
    }

    public function down(): void
    {
        DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('admin','user','marketing') NOT NULL DEFAULT 'user'");
    }
};