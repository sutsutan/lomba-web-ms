<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\HeroBackground;

class HeroBackgroundSeeder extends Seeder
{
    public function run(): void
    {
        $slides = [
            [
                'image_url'     => 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&q=80',
                'title_id'      => 'Dari Sekolah ke Karir',
                'title_en'      => 'From School to Career',
                'subtitle_id'   => 'Keunggulan Vokasi',
                'subtitle_en'   => 'Vocational Excellence',
                'description_id'=> 'Kami mempersiapkan siswa dengan keterampilan siap industri untuk karir yang sukses.',
                'description_en'=> 'We prepare students with industry-ready skills for successful careers.',
                'category'      => 'home',
                'order'         => 1,
                'is_active'     => true,
            ],
            [
                'image_url'     => 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80',
                'title_id'      => 'Generasi Berprestasi',
                'title_en'      => 'Generation of Achievers',
                'subtitle_id'   => 'Pendidikan Berkualitas',
                'subtitle_en'   => 'Quality Education',
                'description_id'=> 'Membentuk karakter dan kompetensi untuk bersaing di tingkat global.',
                'description_en'=> 'Building character and competence to compete at a global level.',
                'category'      => 'home',
                'order'         => 2,
                'is_active'     => true,
            ],
            [
                'image_url'     => 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80',
                'title_id'      => 'Masa Depan Cerah',
                'title_en'      => 'A Bright Future',
                'subtitle_id'   => 'Kemitraan Industri',
                'subtitle_en'   => 'Industry Partnership',
                'description_id'=> 'Bekerjasama dengan industri terkemuka untuk membuka peluang terbaik bagi siswa.',
                'description_en'=> 'Partnering with leading industries to unlock the best opportunities for students.',
                'category'      => 'home',
                'order'         => 3,
                'is_active'     => true,
            ],
        ];

        foreach ($slides as $slide) {
            HeroBackground::firstOrCreate(
                ['image_url' => $slide['image_url'], 'category' => $slide['category']],
                $slide
            );
        }
    }
}
