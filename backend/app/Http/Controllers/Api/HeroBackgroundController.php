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
        'subtitle_id' => 'nullable|string',
        'subtitle_en' => 'nullable|string',
        'category'    => 'required|string|max:100',
        'order'       => 'nullable|integer|min:0|max:4',
        'is_active'   => 'boolean',
    ];

    public function store(Request $request) 
    {
    }
}