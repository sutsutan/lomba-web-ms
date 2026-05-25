<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

abstract class BaseResourceController extends Controller {
    protected $model;
    protected $validationRules = [];
    protected $searchableFields = ['name'];

    public function index(Request $request) {
        $query = $this->model::query();

        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                foreach ($this->searchableFields as $field) {
                    $q->orWhere($field, 'like', "%{$search}%");
                }
            });
        }

        if ($request->has('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }

        $perPage = $request->get('per_page', 20);
        return response()->json($query->latest()->paginate($perPage));
    }

    public function show($id) {
        return response()->json($this->model::findOrFail($id));
    }

    public function store(Request $request) {
        $data = $request->validate($this->validationRules);
        $item = $this->model::create($data);
        return response()->json($item, 201);
    }

    public function update(Request $request, $id) {
        $item = $this->model::findOrFail($id);
        $rules = array_map(fn($rule) => str_replace('required', 'sometimes', $rule), $this->validationRules);
        $data = $request->validate($rules);
        $item->update($data);
        return response()->json($item);
    }

    public function destroy($id) {
        $this->model::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}