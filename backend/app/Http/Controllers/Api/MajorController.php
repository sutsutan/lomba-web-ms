<?php
namespace App\Http\Controllers\Api;
use App\Models\Major;
use Illuminate\Http\Request;

class MajorController extends BaseResourceController {
    protected $model = Major::class;
    protected $validationRules = [
        'name'          => 'required|string|max:255',
        'code'          => 'required|string|max:100',
        'head_of_major' => 'required|string|max:255',
        'description'   => 'required|string',
        'total_students'=> 'nullable|integer',
        'is_active'     => 'nullable|boolean',
    ];

    public function store(Request $request) {
        $request->merge(['slug' => \Illuminate\Support\Str::slug($request->name)]);
        $this->validationRules['slug'] = 'required|string|unique:majors,slug';
        return parent::store($request);
    }

    public function update(Request $request, $id) {
        if ($request->has('name')) {
            $request->merge(['slug' => \Illuminate\Support\Str::slug($request->name)]);
        }
        $this->validationRules['slug'] = 'required|string|unique:majors,slug,' . $id;
        return parent::update($request, $id);
    }

    public function show($slug) {
        $major = Major::where('slug', $slug)
            ->orWhere('code', $slug)
            ->with(['facilities', 'activityGalleries', 'studentWorks'])
            ->firstOrFail();
        return response()->json($major);
    }
}