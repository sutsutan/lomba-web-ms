<?php
// app/Http/Middleware/EnsureRole.php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureRole
{
    /**
     * Contoh penggunaan di route: ->middleware('role:admin,marketing')
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();

        if (!$user || !in_array($user->role, $roles, true)) {
            return response()->json([
                'message' => 'Anda tidak memiliki akses ke resource ini.'
            ], 403);
        }

        // Untuk role 'user' internal yang belum disetujui admin, tolak akses walau lolos role check.
        if (!$user->isApproved()) {
            return response()->json([
                'message' => 'Akun Anda belum disetujui oleh admin.'
            ], 403);
        }

        return $next($request);
    }
}