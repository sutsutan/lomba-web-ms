<?php
namespace App\Http\Controllers\Api;
use App\Models\Explore_Gallery;
use Illuminate\Http\Request;

class ExploreGalleryController extends BaseResourceController {
    protected $model = Explore_Gallery::class;
    protected $validationRules = [
        'organization_id'     => 'nullable|exists:organizations,id',
        'extracurricular_id'  => 'nullable|exists:extracurriculars,id',
        'event_name'          => 'required|string|max:255',
        'traits_achievement'  => 'nullable|string',
        'news_id'             => 'nullable|exists:news,id',
        'documentation_url'   => 'nullable|string|max:500',
        'documentation_urls'  => 'nullable|array',
        'documentation_urls.*'=> 'string',
        'year'                => 'required|integer',
        'is_active'           => 'nullable|boolean',
    ];

    public function index(Request $request) {
        $query = Explore_Gallery::with(['organization', 'extracurricular', 'news']);

        if (!$request->user()) {
            $query->where('is_active', true);
        }

        if ($request->filled('organization_id')) {
            $query->where('organization_id', $request->organization_id);
        }
        if ($request->filled('extracurricular_id')) {
            $query->where('extracurricular_id', $request->extracurricular_id);
        }
        if ($request->filled('year')) {
            $query->where('year', $request->year);
        }

        return response()->json($query->latest()->get());
    }

    /**
     */
    private function prepareData(array $validated): array
    {
        if (!empty($validated['documentation_urls']) && is_array($validated['documentation_urls'])) {
            $validated['documentation_url'] = $validated['documentation_urls'][0];
        }

        return $validated;
    }

    public function store(Request $request)
    {
        $data = $request->validate($this->validationRules);

        if (empty($data['organization_id']) && empty($data['extracurricular_id'])) {
            return response()->json([
                'message' => 'Wajib memilih Organisasi atau Ekstrakurikuler terkait.',
                'errors' => ['organization_id' => ['Wajib memilih Organisasi atau Ekstrakurikuler terkait.']],
            ], 422);
        }

        if (empty($data['documentation_urls'])) {
            return response()->json([
                'message' => 'Minimal 1 foto dokumentasi wajib diunggah.',
                'errors' => ['documentation_urls' => ['Minimal 1 foto dokumentasi wajib diunggah.']],
            ], 422);
        }

        $data = $this->prepareData($data);
        $item = Explore_Gallery::create($data);
        $item->load(['organization', 'extracurricular', 'news']);
        return response()->json($item, 201);
    }

    public function update(Request $request, $id)
    {
        $item = Explore_Gallery::findOrFail($id);
        $rules = array_map(fn($rule) => str_replace('required', 'sometimes', $rule), $this->validationRules);
        $data = $request->validate($rules);
        $data = $this->prepareData($data);
        $item->update($data);
        $item->load(['organization', 'extracurricular', 'news']);
        return response()->json($item);
    }
}