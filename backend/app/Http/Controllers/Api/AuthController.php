<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

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

    $user = Auth::user();

    if ($user->role === 'user' && !$user->is_approved) {
        Auth::logout();
        throw ValidationException::withMessages([
            'email' => ['Akun Anda belum disetujui oleh admin. Silakan tunggu proses verifikasi.'],
        ]);
    }

    $request->session()->regenerate();

    return response()->json(['user' => $user]);
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
}