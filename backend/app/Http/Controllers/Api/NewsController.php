<?php

namespace App\Http\Controllers\Api;

use App\Models\News;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NewsController extends BaseResourceController {
    protected $model = News::class;
    
    protected $searchableFields = ['title_id', 'title_en', 'category'];

    protected $validationRules = [
        'title_id'       => 'required|string|max:255',
        'title_en'       => 'required|string|max:255',
        'excerpt_id'     => 'required|string',
        'excerpt_en'     => 'required|string',
        'content_id'     => 'required|string',
        'content_en'     => 'required|string',
        'category'       => 'nullable|string',
        'thumbnail'      => 'nullable|string',
        'published_date' => 'required|date',
        'is_published'   => 'nullable|boolean',
    ];

    public function store(Request $request) {
        $data = $request->validate($this->validationRules);
        
        $data['slug'] = Str::slug($data['title_id']) . '-' . time();
        
      $data['user_id'] = Auth::id() ?? 1;
        return response()->json(News::create($data), 201);
    }

    public function show($slug) {
        return response()->json(News::where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail());
    }
}