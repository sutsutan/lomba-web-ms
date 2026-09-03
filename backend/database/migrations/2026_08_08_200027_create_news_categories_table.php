<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('news_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->timestamps();
        });

        // Migrasikan kategori yang sudah dipakai di data berita lama,
        // supaya berita lama tidak kehilangan kategorinya.
        if (Schema::hasTable('news')) {
            $existing = DB::table('news')
                ->select('category')
                ->whereNotNull('category')
                ->distinct()
                ->pluck('category');

            foreach ($existing as $name) {
                $name = trim((string) $name);
                if ($name === '') continue;

                DB::table('news_categories')->insertOrIgnore([
                    'name'       => $name,
                    'slug'       => Str::slug($name),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        // Beberapa kategori default supaya dropdown tidak kosong di awal.
        $defaults = ['Prestasi', 'Kegiatan', 'Pengumuman', 'Aktivitas', 'Penghargaan', 'Kelulusan'];
        foreach ($defaults as $name) {
            DB::table('news_categories')->insertOrIgnore([
                'name'       => $name,
                'slug'       => Str::slug($name),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('news_categories');
    }
};