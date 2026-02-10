<?php

namespace Database\Seeders;

use App\Models\News;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class NewsSeeder extends Seeder
{
   public function run(): void
{
    $user = \App\Models\User::first() ?? \App\Models\User::factory()->create();

    $data = [
        [
            'title_id' => 'Siswa Metland Raih Juara Nasional',
            'title_en' => 'Metland Students Win National Championship',
            'excerpt_id' => 'Prestasi membanggakan kembali diraih oleh siswa kami dalam kompetisi...',
            'excerpt_en' => 'Proud achievements were again achieved by our students in the competition...',
            'category' => 'Achievement',
            'slug' => 'news-achievement-1',
        ],
        [
            'title_id' => 'Kerjasama Strategis dengan Industri IT',
            'title_en' => 'Strategic Partnership with IT Industry',
            'excerpt_id' => 'Metland memperluas jaringan kerjasama dengan perusahaan teknologi terkemuka.',
            'excerpt_en' => 'Metland expands its partnership network with leading technology companies.',
            'category' => 'Partnership',
            'slug' => 'partnership-it-2024',
        ],
        [
            'title_id' => 'Workshop Kuliner Tradisional',
            'title_en' => 'Traditional Culinary Workshop',
            'excerpt_id' => 'Mengenal lebih dalam resep nusantara bersama Chef profesional.',
            'excerpt_en' => 'Get to know more about archipelago recipes with professional Chefs.',
            'category' => 'Event',
            'slug' => 'culinary-workshop-2024',
        ]
    ];

    foreach ($data as $item) {
        \App\Models\News::create(array_merge($item, [
            'content_id' => 'Konten lengkap berita...',
            'content_en' => 'Full news content...',
            'user_id' => $user->id,
            'thumbnail' => null, // Nanti akan menggunakan gambar placeholder di frontend jika null
        ]));
    }
}
}