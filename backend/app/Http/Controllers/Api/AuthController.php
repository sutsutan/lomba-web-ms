<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use App\Models\Teacher;
use App\Models\News;
use App\Models\Alumni;
use App\Models\Student_Work;
use App\Models\Achievement;
use App\Models\Organization;
use App\Models\Extracurricular;
use App\Models\Partnership;
use App\Models\User;

class AuthController extends Controller 
{
    public function login(Request $request) 
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['Email atau password salah.'],
            ]);
        }

        $request->session()->regenerate();

        return response()->json(['user' => Auth::user()]);
    }

    public function logout(Request $request) 
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => 'Logged out']);
    }

    public function me(Request $request) 
    {
        return response()->json(['user' => Auth::user()]);
    }

    public function adminStats()
{
    return response()->json([
        'teachers'          => Teacher::count(),
        'news'              => News::count(),
        'alumni'            => Alumni::count(),
        'students_works'    => Student_Work::count(),
        'achievements'      => Achievement::count(),
        'organizations'     => Organization::count(),
        'extracurriculars'  => Extracurricular::count(),
        'partnerships'      => Partnership::count(),
        'users'             => User::count(),
    ]);
}
}