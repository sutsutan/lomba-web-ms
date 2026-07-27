<?php
namespace App\Http\Controllers\Api;

use App\Models\Achievement;
use Illuminate\Http\Request;

class AchievementController extends BaseResourceController
{
    protected $model = Achievement::class;
    protected $searchableFields = ['holder_name', 'description'];
    protected $validationRules = [
        'image_url' => 'required|string',
        'title' => 'required|string|max:255',
        'category' => 'required|string|max:100',
        'competition' => 'required|string|max:255',
        'level' => 'nullable|string|max:100',
        'organizer' => 'nullable|string|max:255',
        'location' => 'nullable|string|max:255',
        'achievement_date' => 'nullable|date',
        'holder_name' => 'required|string|max:255',
        'description' => 'nullable|string',
        'content' => 'nullable|string',
        'year' => 'nullable|integer',
        'medal' => 'nullable|string|max:50',
        'certificate_url' => 'nullable|string',
        'news_id' => 'nullable|exists:news,id',
        'is_active' => 'boolean',
    ];

    public function index(Request $request)
    {
        if ($request->boolean('paginate', false)) {
            return parent::index($request);
        }

        return response()->json(
            Achievement::where('is_active', true)
                ->latest()
                ->get()
        );
    }

    public function summary()
{
    $total = Achievement::count();
    $international = Achievement::where('category', 'like', '%international%')->count();
    $national = Achievement::where('category', 'like', '%national%')->count();
    $categories = Achievement::distinct()->pluck('category')->filter()->count();

    return response()->json([
        'total'         => $total,
        'international' => $international,
        'national'      => $national,
        'categories'    => $categories,
    ]);
}
}