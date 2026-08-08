<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
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
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($request->filled('role')) {
            $query->where('role', $request->role);
        }

        return response()->json(
            $query->latest()->paginate($request->get('per_page', 20))
        );
    }

    public function show($id)
    {
        return response()->json(User::findOrFail($id));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'       => 'required|string|max:255',
            'email'      => 'required|email|unique:users,email',
            'password'   => 'required|string|min:6',
            'role'       => ['required', Rule::in(['admin', 'marketing'])],
            'avatar_url' => 'nullable|string',
        ]);

        $data['internal_type'] = 'none';
        $data['identity_number'] = null;
        $data['is_approved'] = true;

        $user = User::create($data);

        return response()->json($user, 201);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $data = $request->validate([
            'name'       => 'sometimes|required|string|max:255',
            'email'      => ['sometimes', 'required', 'email', Rule::unique('users', 'email')->ignore($user->id)],
            'password'   => 'nullable|string|min:6',
            'role'       => ['sometimes', 'required', Rule::in(['admin', 'marketing'])],
            'avatar_url' => 'nullable|string',
        ]);

        if (empty($data['password'])) {
            unset($data['password']);
        }

        if (
            $request->user()->id === $user->id &&
            isset($data['role']) &&
            $data['role'] !== 'admin' &&
            $user->role === 'admin' &&
            User::where('role', 'admin')->count() <= 1
        ) {
            return response()->json(['message' => 'Tidak dapat mengubah role admin terakhir.'], 422);
        }

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
}