<?php

namespace App\Http\Controllers\Api;

use App\Models\Organization;
use Illuminate\Http\Request;

class OrganizationController extends BaseResourceController
{
    protected $model = Organization::class;
    
    protected $validationRules = [
        'name'         => 'required|string|max:255',
        'category'     => 'required|in:leadership,arts,performance,character',
        'role'         => 'nullable|string|max:255',
        'description'  => 'nullable|string',
        'logo_url'     => 'nullable|string|max:255',
        'competencies' => 'nullable|string|max:255',
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