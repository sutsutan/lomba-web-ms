<?php

namespace App\Http\Controllers\Api;

use App\Models\AboutValue;
use Illuminate\Http\Request;

class AboutValueController extends BaseResourceController
{
    protected $model = AboutValue::class;

    protected $searchableFields = ['title'];

    protected $validationRules = [
        'image'       => 'required|string',
        'title'       => 'required|string|max:255',
        'description' => 'required|string',
        'order'       => 'nullable|integer',
    ];

    public function index(Request $request)
    {
        $query = $this->model::query();

        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where('title', 'like', "%{$search}%");
        }

        return response()->json(
            $query->orderBy('order')->orderBy('id')->get()
        );
    }
}