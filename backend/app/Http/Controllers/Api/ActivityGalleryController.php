<?php

namespace App\Http\Controllers\Api;

use App\Models\Activity_Gallery;
use Illuminate\Http\Request;

class ActivityGalleryController extends BaseResourceController
{
    protected $model = Activity_Gallery::class;
    
    protected $validationRules = [
        'image_url'     => 'required|string|max:255',
        'caption'       => 'nullable|string|max:255',
        'major_id'      => 'nullable|exists:majors,id',
        'activity_date' => 'nullable|date',
        'is_active'     => 'nullable|boolean',
    ];

    public function index(Request $request)
    {
        $query = Activity_Gallery::with('major');

        if ($request->has('major_id')) {
            $query->where('major_id', $request->major_id);
        }

        $limit = $request->get('limit', 12);

        return response()->json($query->latest()->paginate($limit));
    }
}