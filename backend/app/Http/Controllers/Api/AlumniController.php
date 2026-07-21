<?php
namespace App\Http\Controllers\Api;
use App\Models\Alumni;

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

    public function index(\Illuminate\Http\Request $request) {
        $query = Alumni::with('major');

        if ($request->has('search')) {
            $query->where('name', 'like', "%{$request->search}%");
        }

        if ($request->has('year') && $request->year !== 'all') {
            $query->where('grad_year', $request->year);
        }

        return response()->json($query->latest()->paginate($request->get('per_page', 20)));
    }
}