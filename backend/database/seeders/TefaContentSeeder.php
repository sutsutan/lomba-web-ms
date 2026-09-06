<?php

namespace Database\Seeders;

use App\Models\Major;
use App\Models\TefaCategoryContent;
use App\Models\TefaCategoryProgram;
use Illuminate\Database\Seeder;

class TefaContentSeeder extends Seeder
{
    public function run(): void
    {
        $categoryContents = [
            'it' => [
                'intro' => 'The IT Teaching Factory at Metland School empowers students to build real-world digital solutions.',
                'intro_id' => 'Teaching Factory IT di Metland School memberdayakan siswa untuk membangun solusi digital dunia nyata.',
                'detail' => 'Students work on live client projects including websites, mobile apps, and enterprise systems. They practice agile methodologies, version control, and deployment workflows used by professional software companies.',
                'detail_id' => 'Siswa mengerjakan proyek klien langsung termasuk website, aplikasi mobile, dan sistem enterprise. Mereka mempraktikkan metodologi agile, version control, dan workflow deployment yang digunakan oleh perusahaan software profesional.',
                'closing' => 'By graduation, IT students have a portfolio of shipped products and the confidence to enter the tech industry as capable junior developers.',
                'closing_id' => 'Saat lulus, siswa IT memiliki portofolio produk yang telah dirilis dan kepercayaan diri untuk masuk ke industri teknologi sebagai junior developer yang mumpuni.',
            ],
            'dkv' => [
                'intro' => 'The DKV Teaching Factory channels creative talent into professional-grade visual content.',
                'intro_id' => 'Teaching Factory DKV menyalurkan bakat kreatif menjadi konten visual berkelas profesional.',
                'detail' => 'Students handle branding projects, social media campaigns, video production, and print design for real clients. They learn creative direction, client communication, and project management alongside technical design skills.',
                'detail_id' => 'Siswa menangani proyek branding, kampanye media sosial, produksi video, dan desain cetak untuk klien nyata. Mereka belajar arahan kreatif, komunikasi klien, dan manajemen proyek bersamaan dengan keterampilan desain teknis.',
                'closing' => 'Graduates leave with a professional portfolio and industry experience that sets them apart in the competitive creative market.',
                'closing_id' => 'Lulusan meninggalkan sekolah dengan portofolio profesional dan pengalaman industri yang membedakan mereka di pasar kreatif yang kompetitif.',
            ],
            'culinary' => [
                'intro' => 'The Culinary Teaching Factory transforms students into professional kitchen operators.',
                'intro_id' => 'Teaching Factory Kuliner mengubah siswa menjadi operator dapur profesional.',
                'detail' => 'Students run a functioning restaurant and catering service, handling menu development, food preparation, quality control, and customer service under real business conditions with paying customers.',
                'detail_id' => 'Siswa menjalankan restoran dan layanan katering yang berfungsi, menangani pengembangan menu, persiapan makanan, kontrol kualitas, dan layanan pelanggan dalam kondisi bisnis nyata dengan pelanggan yang membayar.',
                'closing' => 'This hands-on production environment builds the discipline, speed, and creativity that define successful culinary professionals.',
                'closing_id' => 'Lingkungan produksi langsung ini membangun disiplin, kecepatan, dan kreativitas yang mendefinisikan profesional kuliner yang sukses.',
            ],
            'hospitality' => [
                'intro' => 'The Hospitality Teaching Factory immerses students in professional guest service operations.',
                'intro_id' => 'Teaching Factory Perhotelan membenamkan siswa dalam operasi layanan tamu profesional.',
                'detail' => 'Students manage front desk operations, housekeeping protocols, event coordination, and F&B service in simulated and real hotel environments. They learn to deliver five-star experiences with attention to every detail.',
                'detail_id' => 'Siswa mengelola operasi meja depan, protokol housekeeping, koordinasi acara, dan layanan F&B di lingkungan hotel simulasi dan nyata. Mereka belajar memberikan pengalaman bintang lima dengan perhatian pada setiap detail.',
                'closing' => 'Graduates are prepared to take on professional roles in hotels, resorts, cruise lines, and tourism enterprises worldwide.',
                'closing_id' => 'Lulusan siap untuk mengambil peran profesional di hotel, resor, kapal pesiar, dan perusahaan pariwisata di seluruh dunia.',
            ],
            'accounting' => [
                'intro' => 'The Accounting Teaching Factory gives students real-world financial management experience.',
                'intro_id' => 'Teaching Factory Akuntansi memberikan pengalaman manajemen keuangan dunia nyata kepada siswa.',
                'detail' => 'Students manage actual bookkeeping, financial reporting, tax filing, and budgeting for school cooperatives and partner businesses. They use industry-standard accounting software and follow professional workflows.',
                'detail_id' => 'Siswa mengelola pembukuan aktual, pelaporan keuangan, pengisian pajak, dan penganggaran untuk koperasi sekolah dan bisnis mitra. Mereka menggunakan perangkat lunak akuntansi standar industri dan mengikuti alur kerja profesional.',
                'closing' => 'This practical training produces graduates who are audit-ready and confident in handling real business finances from day one.',
                'closing_id' => 'Pelatihan praktis ini menghasilkan lulusan yang siap audit dan percaya diri dalam menangani keuangan bisnis nyata sejak hari pertama.',
            ],
        ];

        foreach ($categoryContents as $code => $data) {
            $major = Major::where('code', $code)->first();
            if (!$major) continue;

            TefaCategoryContent::updateOrCreate(
                ['major_id' => $major->id],
                $data
            );
        }

        $programs = [
            'it' => [
                1 => ['title' => 'Web Development Studio', 'title_id' => 'Studio Pengembangan Web', 'description' => 'Building responsive websites and web applications for real clients using modern frameworks.', 'description_id' => 'Membangun website dan aplikasi web responsif untuk klien nyata menggunakan framework modern.'],
                2 => ['title' => 'Mobile App Lab', 'title_id' => 'Lab Aplikasi Mobile', 'description' => 'Developing cross-platform mobile applications solving real-world problems.', 'description_id' => 'Mengembangkan aplikasi mobile lintas platform yang memecahkan masalah dunia nyata.'],
                3 => ['title' => 'IT Solutions Desk', 'title_id' => 'Meja Solusi IT', 'description' => 'Providing IT support, network management, and system administration services.', 'description_id' => 'Menyediakan dukungan IT, manajemen jaringan, dan layanan administrasi sistem.'],
            ],
            'dkv' => [
                1 => ['title' => 'Creative Design Agency', 'title_id' => 'Agensi Desain Kreatif', 'description' => 'Producing brand identities, marketing materials, and social media content for businesses.', 'description_id' => 'Memproduksi identitas merek, materi pemasaran, dan konten media sosial untuk bisnis.'],
                2 => ['title' => 'Video Production House', 'title_id' => 'Rumah Produksi Video', 'description' => 'Creating professional video content including commercials, documentaries, and motion graphics.', 'description_id' => 'Membuat konten video profesional termasuk iklan, dokumenter, dan motion graphics.'],
                3 => ['title' => 'Photography Studio', 'title_id' => 'Studio Fotografi', 'description' => 'Offering professional photography services for events, products, and portraits.', 'description_id' => 'Menawarkan layanan fotografi profesional untuk acara, produk, dan potret.'],
            ],
            'culinary' => [
                1 => ['title' => 'Metland Kitchen', 'title_id' => 'Dapur Metland', 'description' => 'Operating a student-run restaurant serving Indonesian and international cuisines.', 'description_id' => 'Mengoperasikan restoran yang dikelola siswa yang menyajikan masakan Indonesia dan internasional.'],
                2 => ['title' => 'Pastry & Bakery Workshop', 'title_id' => 'Workshop Pastry & Bakery', 'description' => 'Producing artisan bread, pastries, and cakes for retail and catering orders.', 'description_id' => 'Memproduksi roti artisan, pastry, dan kue untuk pesanan ritel dan katering.'],
                3 => ['title' => 'Catering Service', 'title_id' => 'Layanan Katering', 'description' => 'Managing full-scale catering operations for school and external events.', 'description_id' => 'Mengelola operasi katering berskala besar untuk acara sekolah dan eksternal.'],
            ],
            'hospitality' => [
                1 => ['title' => 'Front Office Simulation', 'title_id' => 'Simulasi Front Office', 'description' => 'Running guest check-in, reservation management, and concierge services.', 'description_id' => 'Menjalankan check-in tamu, manajemen reservasi, dan layanan concierge.'],
                2 => ['title' => 'Housekeeping Academy', 'title_id' => 'Akademi Housekeeping', 'description' => 'Maintaining room standards, laundry operations, and facility management.', 'description_id' => 'Memelihara standar kamar, operasi laundry, dan manajemen fasilitas.'],
                3 => ['title' => 'Event Management Bureau', 'title_id' => 'Biro Manajemen Acara', 'description' => 'Planning and executing conferences, banquets, and special events.', 'description_id' => 'Merencanakan dan melaksanakan konferensi, jamuan, dan acara khusus.'],
            ],
            'accounting' => [
                1 => ['title' => 'Finance & Tax Center', 'title_id' => 'Pusat Keuangan & Pajak', 'description' => 'Handling bookkeeping, tax calculation, and financial reporting for partner businesses.', 'description_id' => 'Menangani pembukuan, perhitungan pajak, dan pelaporan keuangan untuk bisnis mitra.'],
                2 => ['title' => 'School Cooperative Management', 'title_id' => 'Manajemen Koperasi Sekolah', 'description' => 'Managing the school cooperative\'s accounts, inventory, and financial statements.', 'description_id' => 'Mengelola akun koperasi sekolah, inventaris, dan laporan keuangan.'],
                3 => ['title' => 'Digital Accounting Lab', 'title_id' => 'Lab Akuntansi Digital', 'description' => 'Practicing with industry-standard software like MYOB, Accurate, and Excel advanced functions.', 'description_id' => 'Berlatih dengan perangkat lunak standar industri seperti MYOB, Accurate, dan fungsi lanjutan Excel.'],
            ],
        ];

         foreach ($programs as $code => $slots) {
            $major = Major::where('code', $code)->first();
            if (!$major) continue;

            foreach ($slots as $order => $data) {
                TefaCategoryProgram::updateOrCreate(
                    ['major_id' => $major->id, 'program_order' => $order],
                    $data
                );
            }
        }
    }
}