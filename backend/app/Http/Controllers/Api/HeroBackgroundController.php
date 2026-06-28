<?php

namespace App\Http\Controllers\Api;

use App\Models\HeroBackground;
use Illuminate\Http\Request;

class HeroBackgroundController extends BaseResourceController {
    protected $model = HeroBackground::class;

    protected $searchableFields = [
        'title_id', 'title_en', 'subtitle_id', 'subtitle_en', 'category'
    ];

    protected $validationRules = [
        'image_url'   => 'required',
        'title_id'    => 'nullable|string|max:255',
        'title_en'    => 'nullable|string|max:255',
        'subtitle_id' => 'nullable',
        'subtitle_en' => 'nullable',
        'description_id' => 'nullable',
        'description_en' => 'nullable',
        'category'    => 'required|string|max:100',
        'order'       => 'nullable|integer|min:0|max:4',
        'is_active'   => 'boolean',
    ];

    public function index(Request $request)
{
 $heroes = HeroBackground::all();
    return response()->json(['data' => $heroes]);
}

   public function store(Request $request)
{
    $validated = $request->validate($this->validationRules);

    $hero = HeroBackground::create($validated);

    return response()->json([
        'message' => 'Data berhasil ditambahkan',
        'data'    => $hero
    ], 201);
}

public function update(Request $request, $id)
{
    $hero = HeroBackground::findOrFail($id);
    
    $validated = $request->validate($this->validationRules);

    $hero->update($validated);

    return response()->json([
        'message' => 'Data berhasil diperbarui',
        'data'    => $hero
    ], 200);
}
}