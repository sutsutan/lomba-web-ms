<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('identity_number', 'like', "%{$search}%");
            });
        }

        if ($request->filled('role')) {
            $query->where('role', $request->role);
        }

        if ($request->filled('internal_type')) {
            $query->where('internal_type', $request->internal_type);
        }

        return response()->json(
            $query->latest()->paginate($request->get('per_page', 20))
        );
    }

    public function show($id)
    {
        return response()->json(User::findOrFail($id));
    }

    // UserController.php

public function store(Request $request)
{
    $data = $request->validate([
        'name'            => 'required|string|max:255',
        'email'           => 'required|email|unique:users,email',
        'password'        => 'required|string|min:6',
        'role'            => ['required', Rule::in(['admin', 'user', 'marketing'])],
        'internal_type'   => ['required', Rule::in(['student', 'teacher', 'staff', 'alumni', 'none'])],
        'identity_number' => 'nullable|string|max:100',
        'is_approved'     => 'boolean',
        'avatar_url'      => 'nullable|string',
    ]);

    if ($data['role'] !== 'user') {
        $data['internal_type'] = 'none';
        $data['identity_number'] = null;
        $data['is_approved'] = true;
    }

    // ❌ HAPUS baris ini — biarkan cast 'hashed' di model yang menangani
    // $data['password'] = Hash::make($data['password']);

    $user = User::create($data);

    return response()->json($user, 201);
}

public function update(Request $request, $id)
{
    $user = User::findOrFail($id);

    $data = $request->validate([
        'name'            => 'sometimes|required|string|max:255',
        'email'           => ['sometimes', 'required', 'email', Rule::unique('users', 'email')->ignore($user->id)],
        'password'        => 'nullable|string|min:6',
        'role'            => ['sometimes', 'required', Rule::in(['admin', 'user', 'marketing'])],
        'internal_type'   => ['sometimes', 'required', Rule::in(['student', 'teacher', 'staff', 'alumni', 'none'])],
        'identity_number' => 'nullable|string|max:100',
        'is_approved'     => 'boolean',
        'avatar_url'      => 'nullable|string',
    ]);

    // ❌ HAPUS Hash::make() manual di sini juga
    if (empty($data['password'])) {
        unset($data['password']);
    }
    // biarkan cast yang hash otomatis kalau password diisi

    $user->update($data);

    return response()->json($user);
}

    public function destroy(Request $request, $id)
    {
        $user = User::findOrFail($id);

        if ($request->user()->id === $user->id) {
            return response()->json(['message' => 'Tidak dapat menghapus akun sendiri.'], 422);
        }

        if ($user->role === 'admin' && User::where('role', 'admin')->count() <= 1) {
            return response()->json(['message' => 'Tidak dapat menghapus admin terakhir.'], 422);
        }

        $user->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }

    /**
     * Endpoint khusus admin: approve akun user internal (siswa/guru/staff/alumni).
     */
    public function approve($id)
    {
        $user = User::findOrFail($id);
        $user->update(['is_approved' => true]);

        return response()->json($user);
    }
}