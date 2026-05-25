<?php
namespace App\Http\Controllers\Api;
use App\Models\Major;
use Illuminate\Http\Request;

class MajorController extends BaseResourceController {
    protected $model = Major::class;
    protected $validationRules = [
        'name'        => 'required|string|max:255',
        'slug'        => 'required|string|unique:majors,slug',
        'icon'        => 'nullable|string',
        'description' => 'nullable|string',
        'cover_image' => 'nullable|string',
        'is_active'   => 'nullable|boolean',
    ];

    public function show($slug) {
        $major = Major::where('slug', $slug)
            ->with(['facilities', 'activityGalleries', 'studentWorks'])
            ->firstOrFail();
        return response()->json($major);
    }
}