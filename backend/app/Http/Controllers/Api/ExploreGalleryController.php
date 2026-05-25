<?php
namespace App\Http\Controllers\Api;
use App\Models\Explore_Gallery;
use Illuminate\Http\Request;

class ExploreGalleryController extends BaseResourceController {
    protected $model = Explore_Gallery::class;
    protected $validationRules = [
        'organization_id'     => 'nullable|exists:organizations,id',
        'event_name'          => 'required|string|max:255',
        'traits_achievement'  => 'nullable|string',
        'news_id'             => 'nullable|exists:news,id',
        'documentation_url'   => 'nullable|url',
        'year'                => 'required|integer',
        'is_active'           => 'nullable|boolean',
    ];

    public function index(Request $request) {
        return response()->json(
            Explore_Gallery::with(['organization', 'news'])->latest()->paginate(20)
        );
    }
}