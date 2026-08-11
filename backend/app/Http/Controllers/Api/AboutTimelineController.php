<?php

namespace App\Http\Controllers\Api;

use App\Models\AboutTimeline;
use Illuminate\Http\Request;

class AboutTimelineController extends BaseResourceController
{
    protected $model = AboutTimeline::class;

    protected $searchableFields = ['year'];

    protected $validationRules = [
        'year'      => 'required|string|max:20',
        'heads'     => 'required|array',
        'heads.*'   => 'string',
        'beginning' => 'required|string',
        'growing'   => 'required|string',
        'image'     => 'nullable|string',
        'order'     => 'nullable|integer',
    ];

    public function index(Request $request)
    {
        $query = $this->model::query();

        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where('year', 'like', "%{$search}%");
        }

        return response()->json(
            $query->orderBy('order')->orderBy('year')->get()
        );
    }
}