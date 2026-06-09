<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth; 
use Illuminate\Http\Request;

class NewsController extends Controller
{
    // Helper untuk memformat data agar konsisten di semua method
    private function formatNews($item, $lang = 'id') {
        return [
            'id'             => $item->id,
            'title_id'       => $item->title_id,
            'category'       => $item->category,
            'published_date' => $item->published_date,
            'is_published'   => (bool)$item->is_published,
            'thumbnail'      => $item->thumbnail,
            'content_id'     => $item->content_id,
            'excerpt_id'     => $item->excerpt_id,
            'slug'           => $item->slug,
        ];
    }

    public function index(Request $request)
    {
        try {
            $lang = $request->header('Accept-Language', 'id');
            $news = News::latest()->get();

            $formattedNews = $news->map(fn($item) => $this->formatNews($item, $lang));

            return response()->json(['data' => $formattedNews]); 
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error', 'error' => $e->getMessage()], 500);
        }
    }

    public function show($identifier, Request $request)
{
    $lang = $request->header('Accept-Language', 'id');
    
    $news = News::where('slug', $identifier)
                ->orWhere('id', $identifier)
                ->first();

    if (!$news) {
        return response()->json(['message' => 'Berita tidak ditemukan'], 404);
    }

    return response()->json($news->toFormattedArray($lang));
}
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title_id'     => 'required|string',
            'category'     => 'required|string',
            'thumbnail'    => 'nullable',
            'content_id'   => 'required|string',
            'excerpt_id'   => 'nullable|string', // Pastikan ini ada di validasi
            'is_published' => 'boolean',
            'published_date' => 'nullable|date',
        ]);

        $validated['slug'] = Str::slug($validated['title_id']);
        
        if (Auth::check()) {
            $validated['user_id'] = Auth::id();
        }

        $news = News::create($validated);

        return response()->json($news, 201);
    }
}