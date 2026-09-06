<?php
// TefaProjectController.php
namespace App\Http\Controllers\Api;

use App\Models\TefaProject;
use Illuminate\Http\Request;

class TefaProjectController extends BaseResourceController
{
    protected $model = TefaProject::class;

    protected $validationRules = [
        'preview_url'     => 'required|string',
        'student'         => 'required|string|max:255',
        'class'           => 'nullable|string|max:255',
        'title'           => 'required|string|max:255',
        'title_id'        => 'nullable|string|max:255',
        'description'     => 'required|string',
        'description_id'  => 'nullable|string',
        'major_code'      => 'required|string|max:100',
        'is_active'       => 'nullable|boolean',
        'sort_order'      => 'nullable|integer',
    ];

    public function index(Request $request)
    {
        $query = TefaProject::with('major');

        if ($request->has('major_code')) {
            $query->whereHas('major', fn ($q) => $q->where('code', $request->major_code));
        }

        if ($request->boolean('active_only')) {
            $query->where('is_active', true);
        }

        $limit = $request->get('limit', 50);

        return response()->json(
            $query->orderBy('sort_order')->latest()->paginate($limit)
        );
    }
}