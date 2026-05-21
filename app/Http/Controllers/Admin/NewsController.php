<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
    try {
            $lang = $request->header('Accept-Language', 'id');

            $news = News::latest()->get();

            if ($news->isEmpty()) {
                return response()->json([]);
            }

            $formattedNews = $news->map(function ($item) use ($lang) {
                return [
                    'id'       => $item->id,
                    'title'    => $lang === 'en' ? ($item->title_en ?? $item->title_id) : $item->title_id,
                    'excerpt'  => $lang === 'en' ? ($item->excerpt_en ?? $item->excerpt_id) : $item->excerpt_id,
                    'category' => $item->category,
                    'date'     => $item->created_at->toISOString(),
                    'image'    => $item->thumbnail ? asset('storage/' . $item->thumbnail) : null,
                    'slug'     => $item->slug,
                ];
            });

            return response()->json($formattedNews);

        } catch (\Exception $e) {
            Log::error("News API Error: " . $e->getMessage());

            return response()->json([
                'message' => 'Internal Server Error',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($slug, Request $request)
    {
        $lang = $request->header('Accept-Language', 'id');
        $news = News::where('slug', $slug)->firstOrFail();

        return response()->json($news->toFormattedArray($lang));
    
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(news $news)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, news $news)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(news $news)
    {
        //
    }
}
