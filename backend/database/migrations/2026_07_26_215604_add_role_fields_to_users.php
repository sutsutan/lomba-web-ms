<?php
// database/migrations/xxxx_xx_xx_add_role_fields_to_users_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Ubah kolom role jadi ENUM admin/user/marketing.
        // Pakai raw statement supaya tidak perlu dependency doctrine/dbal
        // hanya untuk mengubah tipe enum.
        DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('admin','user','marketing') NOT NULL DEFAULT 'user'");

        Schema::table('users', function (Blueprint $table) {
            $table->enum('internal_type', ['student', 'teacher', 'staff', 'alumni', 'none'])
                  ->default('none')
                  ->after('role');
            $table->string('identity_number')->nullable()->after('internal_type');
            $table->boolean('is_approved')->default(false)->after('identity_number');
            $table->string('avatar_url')->nullable()->after('is_approved');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['internal_type', 'identity_number', 'is_approved', 'avatar_url']);
        });

        DB::statement("ALTER TABLE users MODIFY COLUMN role VARCHAR(255) NOT NULL DEFAULT 'user'");
    }
};