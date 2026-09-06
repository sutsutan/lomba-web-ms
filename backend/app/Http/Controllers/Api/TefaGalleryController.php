<?php
// TefaGalleryController.php
namespace App\Http\Controllers\Api;

use App\Models\TefaGallery;
use Illuminate\Http\Request;

class TefaGalleryController extends BaseResourceController
{
    protected $model = TefaGallery::class;

    protected $validationRules = [
        'preview_url'   => 'required|string',
        'title'         => 'required|string|max:255',
        'title_id'      => 'nullable|string|max:255',
        'subtitle'      => 'nullable|string|max:255',
        'subtitle_id'   => 'nullable|string|max:255',
        'major_code'    => 'required|string|max:100',
        'sort_order'    => 'nullable|integer',
        'is_active'     => 'nullable|boolean',
    ];

    public function index(Request $request)
    {
        $query = TefaGallery::with('major');

        if ($request->has('major_code')) {
            $query->whereHas('major', fn ($q) => $q->where('code', $request->major_code));
        }

        if ($request->boolean('active_only')) {
            $query->where('is_active', true);
        }

        return response()->json(
            $query->orderBy('sort_order')->get()
        );
    }
}