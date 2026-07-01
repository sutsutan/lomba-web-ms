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
                'thumbnail'      => 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80',
                    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
                    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
                    'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80'
                ],
                'published_date' => now(),
                'is_published'   => true,
            ]
        );
    }
}