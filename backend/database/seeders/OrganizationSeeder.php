<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrganizationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
\App\Models\Organization::create([
        'name' => 'OSIS',
        'category' => 'leadership',
        'leader_name' => 'Budi',
        'advisor_name' => 'Pak Ahmad',
        'description' => 'Organisasi siswa intra sekolah.',
        'logo_url' => 'https://via.placeholder.com/150',
        'is_active' => true,
    ]);
    }
}
