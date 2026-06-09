<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth; 
use Illuminate\Http\Request;

<<<<<<< HEAD
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

        if ($request->has('is_published')) {
            $query->where('is_published', $request->boolean('is_published'));
        }

        $perPage = $request->get('per_page', 20);
        return response()->json($query->latest()->paginate($perPage));
    }

    public function store(Request $request) {
        $data = $request->validate($this->validationRules);
        
        $data['slug'] = Str::slug($data['title_id']) . '-' . time();
        
      $data['user_id'] = Auth::id() ?? 1;
        return response()->json(News::create($data), 201);
=======
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
>>>>>>> 0a5216d368e8c7e522e29366506d05b340c3cd48
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