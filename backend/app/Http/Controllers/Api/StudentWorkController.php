<?php

namespace App\Http\Controllers\Api;

use App\Models\Student_Work;
use Illuminate\Http\Request;

class StudentWorkController extends BaseResourceController
{
    protected $model = Student_Work::class;
    
    protected $validationRules = [
        'preview_url'  => 'required|string',
        'title'        => 'required|string|max:255',
        'creators'     => 'required|string|max:255',
        'major_code'   => 'required|string|max:100',
        'project_url'  => 'nullable|string|max:255',
        'description'  => 'required|string',
        'is_active'    => 'nullable|boolean',
    ];

    public function index(Request $request)
    {
        $query = Student_Work::with('major');

        if ($request->has('class')) {
            $query->where('class', $request->class);
        }

        if ($request->has('major_id')) {
            $query->where('major_id', $request->major_id);
        }

        $limit = $request->get('limit', 12);

        return response()->json($query->latest()->paginate($limit));
    }
}