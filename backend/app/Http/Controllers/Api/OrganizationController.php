<?php

namespace App\Http\Controllers\Api;

use App\Models\Organization;
use Illuminate\Http\Request;

class OrganizationController extends BaseResourceController
{
    protected $model = Organization::class;
    
    protected $validationRules = [
    'name'         => 'required|string|max:255',
    'category'     => 'required|in:leadership,creative,discipline,wellness',
    'leader_name'  => 'required|string|max:255',
    'advisor_name' => 'required|string|max:255',
    'description_en'  => 'nullable',
    'description_id' => 'nullable',
    'logo_url' => 'required',
    'is_active'    => 'nullable|boolean',
];

    public function index(Request $request)
    {
        $query = Organization::query();

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        return response()->json($query->latest()->get());
    }
}