<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    /**
     * Format data response
     */
    private function formatNews($item, $lang = 'id')
    {
        return [
            'id'             => $item->id,
            'title_id'       => $item->title_id,
            'category'       => $item->category,
            'published_date' => $item->published_date,
            'is_published'   => (bool) $item->is_published,
            'thumbnail'      => $item->thumbnail,
            'content_id'     => $item->content_id,
            'excerpt_id'     => $item->excerpt_id,
            'slug'           => $item->slug,
            'is_headline'    => (bool) $item->is_headline,
            'gallery_images' => $item->gallery_images ?? [],
        ];
    }

    /**
     * List News
     */
    public function index(Request $request)
    {
        try {

            $lang = $request->header('Accept-Language', 'id');

            $news = News::latest()->get();

            $formattedNews = $news->map(fn($item) => $this->formatNews($item, $lang));

            return response()->json([
                'data' => $formattedNews
            ]);

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Error',
                'error' => $e->getMessage()
            ], 500);

        }
    }

    /**
     * Detail News
     */
    public function show($identifier, Request $request)
    {
        $lang = $request->header('Accept-Language', 'id');

        $news = News::where('slug', $identifier)
            ->orWhere('id', $identifier)
            ->first();

        if (!$news) {
            return response()->json([
                'message' => 'Berita tidak ditemukan'
            ], 404);
        }

        return response()->json(
            $news->toFormattedArray($lang)
        );
    }

    /**
     * Create News
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title_id'       => 'required|string',
            'category'       => 'required|string',
            'thumbnail'      => 'nullable',
            'content_id'     => 'required|string',
            'excerpt_id'     => 'nullable|string',
            'is_published'   => 'boolean',
            'is_headline'    => 'boolean',
            'published_date' => 'nullable|date',
            'gallery_images' => 'nullable|array',
        ]);

        $validated['slug'] = Str::slug($validated['title_id']);

        if (Auth::check()) {
            $validated['user_id'] = Auth::id();
        }

        DB::transaction(function () use (&$news, $validated) {

            // Jika dijadikan headline,
            // nonaktifkan headline lain
            if (!empty($validated['is_headline'])) {

                News::query()->update([
                    'is_headline' => false
                ]);

            }

            $news = News::create($validated);

        });

        return response()->json($news, 201);
    }

    /**
     * Update News
     */
    public function update(Request $request, News $news)
    {
        $validated = $request->validate([
            'title_id'       => 'required|string',
            'category'       => 'required|string',
            'thumbnail'      => 'nullable',
            'content_id'     => 'required|string',
            'excerpt_id'     => 'nullable|string',
            'is_published'   => 'boolean',
            'is_headline'    => 'boolean',
            'published_date' => 'nullable|date',
            'gallery_images' => 'nullable|array',
        ]);

        $validated['slug'] = Str::slug($validated['title_id']);

        DB::transaction(function () use ($validated, $news) {

            // Jika berita ini dijadikan headline
            if (!empty($validated['is_headline'])) {

                News::where('id', '!=', $news->id)
                    ->update([
                        'is_headline' => false
                    ]);

            }

            $news->update($validated);

        });

        return response()->json($news);
    }

    /**
     * Delete News
     */
    public function destroy(News $news)
    {
        $news->delete();

        return response()->json([
            'message' => 'Berita berhasil dihapus'
        ]);
    }
}