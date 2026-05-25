<?php

namespace Database\Seeders;

use App\Models\News;
use Illuminate\Database\Seeder;

class NewsSeeder extends Seeder
{
    public function run(): void
    {
        News::updateOrCreate(
            ['slug' => 'news-achievement-1'],
            [
                'title_id'       => 'Siswa Metland Raih Juara Nasional',
                'title_en'       => 'Metland Students Win National Championship',
                'excerpt_id'     => 'Prestasi membanggakan...',
                'excerpt_en'     => 'Proud achievements...',
                'category'       => 'Achievement',
                'content_id'     => 'Konten lengkap berita...',
                'content_en'     => 'Full news content...',
                'user_id'        => 1, 
                'thumbnail'      => 'default.jpg',
                'published_date' => now(),
                'is_published'   => true,
            ]
        );
    }
}