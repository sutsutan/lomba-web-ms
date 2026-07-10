<?php

namespace App\Http\Controllers\Api;

use App\Models\Activity_Gallery;
use App\Models\Major;
use Illuminate\Http\Request;

class ActivityGalleryController extends BaseResourceController
{
    protected $model = Activity_Gallery::class;
    
    protected $validationRules = [
        'image_url'     => 'required|string|max:2048',
        'title'         => 'required|string|max:255',
        'major_code'    => 'nullable|string|max:50',
        'activity_date' => 'nullable|date',
        'description'   => 'nullable|string',
        'is_featured'   => 'nullable|boolean',
        'is_active'     => 'nullable|boolean',
    ];

    public function index(Request $request)
    {
        $query = Activity_Gallery::with('major');

        if ($request->has('major_id')) {
            $query->where('major_id', $request->major_id);
        }

        $limit = $request->get('limit', $request->get('per_page', 20));

        return response()->json($query->latest()->paginate($limit));
    }

    /**
     * Resolve major_code to major_id and prepare data for saving.
     */
    private function prepareData(array $validated): array
    {
        // Convert major_code to major_id
        if (isset($validated['major_code'])) {
            $code = $validated['major_code'];
            $major = Major::where('code', $code)
                ->orWhere('slug', $code)
                ->first();
            $validated['major_id'] = $major?->id;
            unset($validated['major_code']);
        }

        // Default is_active to true if not set
        if (!isset($validated['is_active'])) {
            $validated['is_active'] = true;
        }

        return $validated;
    }

    public function store(Request $request)
    {
        $data = $request->validate($this->validationRules);
        $data = $this->prepareData($data);
        $item = Activity_Gallery::create($data);
        $item->load('major');
        return response()->json($item, 201);
    }

    public function update(Request $request, $id)
    {
        $item = Activity_Gallery::findOrFail($id);
        $rules = array_map(fn($rule) => str_replace('required', 'sometimes', $rule), $this->validationRules);
        $data = $request->validate($rules);
        $data = $this->prepareData($data);
        $item->update($data);
        $item->load('major');
        return response()->json($item);
    }
}