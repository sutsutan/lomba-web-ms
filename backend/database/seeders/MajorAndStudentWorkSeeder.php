<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MajorAndStudentWorkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $majors = [
            [
                'name' => 'Pengembangan Perangkat Lunak dan Gim',
                'slug' => 'pplg',
                'code' => 'it',
                'head_of_major' => 'I Gusti Agung Kuswibawa',
                'total_students' => 520,
                'is_active' => true,
            ],
            [
                'name' => 'Kuliner (Tata Boga)',
                'slug' => 'culinary',
                'code' => 'culinary',
                'head_of_major' => 'Lely',
                'total_students' => 410,
                'is_active' => true,
            ],
            [
                'name' => 'Desain Komunikasi Visual',
                'slug' => 'dkv',
                'code' => 'vcd',
                'head_of_major' => 'Ade Nurcholik',
                'total_students' => 480,
                'is_active' => true,
            ],
            [
                'name' => 'Perhotelan',
                'slug' => 'hospitality',
                'code' => 'hospitality',
                'head_of_major' => 'Joyce Lantu',
                'total_students' => 450,
                'is_active' => true,
            ],
            [
                'name' => 'Akuntansi',
                'slug' => 'accounting',
                'code' => 'accounting',
                'head_of_major' => 'Dewi Lestari',
                'total_students' => 350,
                'is_active' => true,
            ]
        ];

        foreach ($majors as $m) {
            \App\Models\Major::updateOrCreate(['slug' => $m['slug']], $m);
        }

        $works = [
            [
                'title' => 'Website Metland School',
                'creators' => 'Veria Raja Tunggal',
                'major_code' => 'it',
                'description' => 'Website portal informasi sekolah Metland School yang responsif dan interaktif.',
                'preview_url' => 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070',
                'project_url' => 'https://github.com/tsukuriaI/lomba-web-ms',
                'class' => 'XI IT 1',
                'is_active' => true,
            ],
            [
                'title' => 'Metland Fusion Pastry',
                'creators' => 'Chef Budi Santoso',
                'major_code' => 'culinary',
                'description' => 'Kue pastry khas eropa dipadukan dengan cita rasa lokal nusantara.',
                'preview_url' => 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=2089',
                'project_url' => '#',
                'class' => 'XI Culinary 2',
                'is_active' => true,
            ]
        ];

        foreach ($works as $w) {
            \App\Models\student_work::updateOrCreate(['title' => $w['title']], $w);
        }
    }
}
