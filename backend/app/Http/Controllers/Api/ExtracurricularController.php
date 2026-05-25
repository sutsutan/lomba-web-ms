<?php

namespace App\Http\Controllers\Api;

use App\Models\Extracurricular;
use Illuminate\Http\Request;

class ExtracurricularController extends BaseResourceController
{
    protected $model = Extracurricular::class;
    
    protected $validationRules = [
        'name'              => 'required|string|max:255',
        'category'          => 'required|in:Sports,Arts,Specialized',
        'coach_name'        => 'nullable|string|max:255',
        'description'       => 'nullable|string',
        'schedule'          => 'nullable|string|max:255',
        'intensity'         => 'nullable|string|max:255',
        'track_record'      => 'nullable|string',
        'registration_link' => 'nullable|string|max:255',
        'image_url'         => 'nullable|string|max:255',
        'is_active'         => 'nullable|boolean',
    ];

    public function index(Request $request)
    {
        $query = Extracurricular::query();

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        return response()->json($query->latest()->get());
    }
}