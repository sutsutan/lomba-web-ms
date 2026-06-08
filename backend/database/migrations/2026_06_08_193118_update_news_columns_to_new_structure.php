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
        Schema::table('news', function (Blueprint $table) {
            // Rename 'title' ke 'title_id'
            if (Schema::hasColumn('news', 'title')) {
                $table->renameColumn('title', 'title_id');
            }

            // Rename 'content' ke 'content_id'
            if (Schema::hasColumn('news', 'content')) {
                $table->renameColumn('content', 'content_id');
            }

            // Rename 'cover_image' ke 'thumbnail'
            if (Schema::hasColumn('news', 'cover_image')) {
                $table->renameColumn('cover_image', 'thumbnail');
            }

            // Tambahkan 'excerpt_id' jika belum ada
            if (!Schema::hasColumn('news', 'excerpt_id')) {
                $table->string('excerpt_id')->nullable()->after('content_id');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('news', function (Blueprint $table) {
            // Mengembalikan 'title_id' ke 'title'
            if (Schema::hasColumn('news', 'title_id')) {
                $table->renameColumn('title_id', 'title');
            }

            // Mengembalikan 'content_id' ke 'content'
            if (Schema::hasColumn('news', 'content_id')) {
                $table->renameColumn('content_id', 'content');
            }

            // Mengembalikan 'thumbnail' ke 'cover_image'
            if (Schema::hasColumn('news', 'thumbnail')) {
                $table->renameColumn('thumbnail', 'cover_image');
            }

            // Menghapus 'excerpt_id'
            if (Schema::hasColumn('news', 'excerpt_id')) {
                $table->dropColumn('excerpt_id');
            }
        });
    }
};