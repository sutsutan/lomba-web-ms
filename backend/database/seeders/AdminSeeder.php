<?php
namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder {
    public function run(): void {
        
        User::where('email', 'admin@sekolah.sch.id')->delete();

        User::updateOrCreate(
            ['email' => 'admin@sekolah.sch.id'],
            [
                'name'     => 'Administrator',
                'password' => Hash::make('admin123'),
                'role'     => 'admin',
            ]
        );
    }
}