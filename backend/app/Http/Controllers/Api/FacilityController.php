<?php

namespace App\Http\Controllers\Api;
use App\Models\Facility;
use Illuminate\Http\Request;


class FacilityController extends BaseResourceController
{
    protected $model = Facility::class;
    
    protected $validationRules = [
        'name'        => 'required|string|max:255',
        'description' => 'nullable|string',
        'image_url'   => 'nullable|string|max:255',
        'major_id'    => 'nullable|exists:majors,id',
        'is_active'   => 'nullable|boolean',
    ];

    public function index(Request $request)
    {
        return response()->json(
            Facility::with('major')->latest()->get()
        );
    }
}