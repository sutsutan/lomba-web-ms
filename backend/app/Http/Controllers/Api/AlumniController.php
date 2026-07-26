<?php
namespace App\Http\Controllers\Api;

use App\Models\Alumni;
use Illuminate\Http\Request;

class AlumniController extends BaseResourceController {
    protected $model = Alumni::class;
    protected $searchableFields = ['name', 'role', 'tags'];
    protected $validationRules = [
        'name'            => 'required|string|max:255',
        'role'            => 'nullable|string',
        'tags'            => 'nullable|string',
        'testimony'       => 'nullable|string',
        'latitude'        => 'nullable|numeric|between:-90,90',
        'longitude'       => 'nullable|numeric|between:-180,180',
        'location_name'   => 'nullable|string',
        'grad_year'       => 'required|integer',
        'major_id'        => 'nullable|exists:majors,id',
        'profile_picture' => 'nullable|string',
        'is_active'       => 'nullable|boolean',
    ];

   public function index(Request $request) {
    $query = Alumni::with('major');

    if (!$request->user()) {
        $query->where('is_active', true);
    }

    if ($request->filled('search')) {
        $query->where('name', 'like', "%{$request->search}%");
    }
    if ($request->filled('year') && $request->year !== 'all') {
        $query->where('grad_year', $request->year);
    }

    $query->latest();

    if ($request->user()) {
        return response()->json($query->get());
    }

    return response()->json($query->paginate($request->get('per_page', 20)));
}

    public function years() {
        $years = Alumni::where('is_active', true)
            ->whereNotNull('grad_year')
            ->distinct()
            ->orderByDesc('grad_year')
            ->pluck('grad_year');

        return response()->json($years);
    }
}