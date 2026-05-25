<?php

namespace App\Http\Controllers\Api;

use App\Models\Student_Work;
use Illuminate\Http\Request;

class StudentWorkController extends BaseResourceController
{
    protected $model = Student_Work::class;
    
    protected $validationRules = [
        'image_url'    => 'required|string|max:255',
        'student_name' => 'required|string|max:255',
        'title'        => 'required|string|max:255',
        'description'  => 'nullable|string',
        'class'        => 'required|string|max:255',
        'major_id'     => 'nullable|exists:majors,id',
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