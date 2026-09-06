<?php

namespace Database\Seeders;

use App\Models\Major;
use App\Models\TefaGallery;
use App\Models\TefaProject;
use Illuminate\Database\Seeder;

class TefaSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            ['major_code' => 'it', 'student' => 'Veria Raja Tunggal', 'class' => 'XI PPLG 1', 'title' => 'School Website Redesign', 'title_id' => 'Redesain Website Sekolah', 'description' => 'Complete redesign of the school website with modern UI/UX and responsive layout.', 'description_id' => 'Redesain lengkap website sekolah dengan UI/UX modern dan layout responsif.'],
            ['major_code' => 'it', 'student' => 'Ana Malia', 'class' => 'XI PPLG 1', 'title' => 'Inventory Management App', 'title_id' => 'Aplikasi Manajemen Inventaris', 'description' => 'Web-based inventory tracking system for school laboratory equipment.', 'description_id' => 'Sistem pelacakan inventaris berbasis web untuk peralatan laboratorium sekolah.'],
            ['major_code' => 'dkv', 'student' => 'Raka Pratama', 'class' => 'XI DKV 1', 'title' => 'Brand Identity Package', 'title_id' => 'Paket Identitas Merek', 'description' => 'Complete branding for a local café including logo, menu, and social media templates.', 'description_id' => 'Branding lengkap untuk kafe lokal termasuk logo, menu, dan template media sosial.'],
            ['major_code' => 'culinary', 'student' => 'Chef Anisa', 'class' => 'XI Kuliner 1', 'title' => 'Fusion Menu Development', 'title_id' => 'Pengembangan Menu Fusi', 'description' => 'Created a 5-course fusion menu combining Indonesian and Japanese flavors.', 'description_id' => 'Membuat menu fusi 5 tahap yang menggabungkan cita rasa Indonesia dan Jepang.'],
            ['major_code' => 'hospitality', 'student' => 'Rina Permata', 'class' => 'XI APH 1', 'title' => 'Guest Service Simulation', 'title_id' => 'Simulasi Layanan Tamu', 'description' => 'Led a complete front-office simulation.', 'description_id' => 'Memimpin simulasi front-office lengkap.'],
            ['major_code' => 'accounting', 'student' => 'Kevin Wijaya', 'class' => 'XI AK 1', 'title' => 'Cooperative Financial Report', 'title_id' => 'Laporan Keuangan Koperasi', 'description' => 'Complete annual financial report for the school cooperative.', 'description_id' => 'Laporan keuangan tahunan lengkap untuk koperasi sekolah.'],
        ];

        foreach ($projects as $p) {
            $major = Major::where('code', $p['major_code'])->first();
            if (!$major) continue;

            TefaProject::create([
                'image_url'       => "/images/tefa/{$p['major_code']}-placeholder.jpg",
                'student_name'    => $p['student'],
                'class'           => $p['class'],
                'title'           => $p['title'],
                'title_id'        => $p['title_id'],
                'description'     => $p['description'],
                'description_id'  => $p['description_id'],
                'major_id'        => $major->id,
                'is_active'       => true,
            ]);
        }

        $galleries = [
            ['major_code' => 'it', 'title' => 'IoT & Robotics Lab', 'title_id' => 'Lab IoT & Robotika', 'subtitle' => 'Applied Embedded Systems', 'subtitle_id' => 'Sistem Tertanam Terapan'],
            ['major_code' => 'it', 'title' => 'Software Dev Studio', 'title_id' => 'Studio Software Dev', 'subtitle' => 'Web & Mobile Production', 'subtitle_id' => 'Produksi Web & Mobile'],
            ['major_code' => 'dkv', 'title' => 'Creative Agency', 'title_id' => 'Agensi Desain Kreatif', 'subtitle' => 'Brand Identity & Visuals', 'subtitle_id' => 'Identitas Visual & Branding'],
            ['major_code' => 'culinary', 'title' => 'Commercial Kitchen', 'title_id' => 'Dapur Komersial', 'subtitle' => 'Professional Line Cookery', 'subtitle_id' => 'Manajemen Dapur Profesional'],
            ['major_code' => 'hospitality', 'title' => 'Front Office Desk', 'title_id' => 'Resepsionis Front Office', 'subtitle' => 'Guest Services & Concierge', 'subtitle_id' => 'Layanan Tamu & Reservasi'],
            ['major_code' => 'accounting', 'title' => 'Financial Accounting', 'title_id' => 'Pusat Akuntansi Keuangan', 'subtitle' => 'Bookkeeping & Ledgers', 'subtitle_id' => 'Pembukuan & Laporan Finansial'],
        ];

        foreach ($galleries as $i => $g) {
            $major = Major::where('code', $g['major_code'])->first();
            if (!$major) continue;

            TefaGallery::create([
                'image_url'    => "/images/tefa/{$g['major_code']}-gallery-1.jpg",
                'title'        => $g['title'],
                'title_id'     => $g['title_id'],
                'subtitle'     => $g['subtitle'],
                'subtitle_id'  => $g['subtitle_id'],
                'major_id'     => $major->id,
                'sort_order'   => $i,
                'is_active'    => true,
            ]);
        }
    }
}