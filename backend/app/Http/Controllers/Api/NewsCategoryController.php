<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NewsCategory;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class NewsCategoryController extends Controller
{
    /**
     * List semua kategori berita (publik, dipakai untuk dropdown admin & filter publik)
     */
    public function index()
    {
        $categories = NewsCategory::orderBy('name')->get(['id', 'name', 'slug']);

        return response()->json(['data' => $categories]);
    }

    /**
     * Tambah kategori baru langsung dari form admin.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => [
                'required', 'string', 'max:100',
                Rule::unique('news_categories', 'name'),
            ],
        ]);

        $category = NewsCategory::create($validated);

        return response()->json($category, 201);
    }

    /**
     * Hapus kategori (opsional, untuk kebutuhan admin di kemudian hari).
     */
    public function destroy(NewsCategory $newsCategory)
    {
        $newsCategory->delete();

        return response()->json([
            'message' => 'Kategori berhasil dihapus',
        ]);
    }
}