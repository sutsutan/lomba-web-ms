<?php

namespace App\Http\Controllers\Api;

use App\Models\TefaCategoryProgram;
use Illuminate\Http\Request;

class TefaProgramController extends BaseResourceController
{
    protected $model = TefaCategoryProgram::class;

    protected $validationRules = [
        'major_code'      => 'required|string|max:100',
        'program_order'   => 'required|integer|min:1|max:3',
        'title'           => 'required|string|max:255',
        'title_id'        => 'nullable|string|max:255',
        'description'     => 'required|string',
        'description_id'  => 'nullable|string',
    ];

    public function index(Request $request)
    {
        $query = TefaCategoryProgram::with('major');

        if ($request->has('major_code')) {
            $query->whereHas('major', fn ($q) => $q->where('code', $request->major_code));
        }

        return response()->json(
            $query->orderBy('program_order')->get()
        );
    }
}